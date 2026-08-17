import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cardIn, fadeUp, staggerGroup } from "./motionConfig";
import {
  cardClass,
  eyebrowClass,
  headingClass,
  pillClass,
  sectionClass,
  tagClass,
} from "./styles";

const sliderColors = ["bg-sticker-yellow", "bg-powder-blue", "bg-cotton-pink"];

const coloredCardClass = cardClass.replace(" bg-pure-white", "");

function getPrimaryMedia(project) {
  if (Array.isArray(project?.media) && project.media.length > 0) {
    return project.media[0];
  }

  if (project?.video) {
    return {
      type: "video",
      src: project.video,
      alt: project.imageAlt,
    };
  }

  return {
    type: "image",
    src: project?.image,
    alt: project?.imageAlt,
  };
}

function isVideoMedia(media) {
  return media?.type === "video" || media?.src?.toLowerCase().endsWith(".mp4");
}

function getYoutubeEmbedSrc(src) {
  if (!src) {
    return null;
  }

  try {
    const url = new URL(src);
    const hostname = url.hostname.replace(/^www\./, "");

    if (hostname === "youtu.be") {
      return `https://www.youtube.com/embed/${url.pathname.slice(1)}`;
    }

    if (hostname === "youtube.com" || hostname === "m.youtube.com") {
      const videoId = url.searchParams.get("v");

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }

      if (url.pathname.startsWith("/embed/")) {
        return src;
      }
    }
  } catch {
    return null;
  }

  return null;
}

function getYoutubePlayerSrc(src) {
  try {
    const url = new URL(src);

    url.searchParams.set("enablejsapi", "1");

    if (typeof window !== "undefined") {
      url.searchParams.set("origin", window.location.origin);
    }

    return url.toString();
  } catch {
    return src;
  }
}

function ProjectMedia({ className, controls = false, media, placeholder, title }) {
  const [hasError, setHasError] = useState(false);
  const iframeRef = useRef(null);
  const youtubeEmbedSrc = getYoutubeEmbedSrc(media?.src);

  useEffect(() => {
    setHasError(false);
  }, [media?.src]);

  useEffect(() => {
    if (!youtubeEmbedSrc || !media?.playbackRate) {
      return undefined;
    }

    const setPlaybackRate = () => {
      iframeRef.current?.contentWindow?.postMessage(
        JSON.stringify({
          event: "command",
          func: "setPlaybackRate",
          args: [media.playbackRate],
        }),
        "https://www.youtube.com",
      );
    };

    setPlaybackRate();
    const intervalId = window.setInterval(setPlaybackRate, 700);
    const timeoutId = window.setTimeout(() => window.clearInterval(intervalId), 5000);

    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(timeoutId);
    };
  }, [media?.playbackRate, youtubeEmbedSrc]);

  if (!media?.src || hasError) {
    return (
      <div className={`${className} grid place-content-center gap-7 p-18 text-center text-sm text-ash-gray`}>
        <span>Preview project</span>
        <strong className="text-carbon">{placeholder ?? title}</strong>
      </div>
    );
  }

  if (youtubeEmbedSrc) {
    return (
      <iframe
        className={className}
        ref={iframeRef}
        src={getYoutubePlayerSrc(youtubeEmbedSrc)}
        title={media.alt ?? title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
      />
    );
  }

  if (isVideoMedia(media)) {
    return (
      <video
        className={className}
        src={media.src}
        aria-label={media.alt ?? title}
        autoPlay={!controls}
        controls={controls}
        loop={!controls}
        muted
        playsInline
        preload="metadata"
        onError={() => setHasError(true)}
      />
    );
  }

  return (
    <img
      className={className}
      src={media.src}
      alt={media.alt ?? title}
      onError={() => setHasError(true)}
    />
  );
}

function normalizeProjects(project) {
  if (Array.isArray(project?.items) && project.items.length > 0) {
    return project.items;
  }

  if (Array.isArray(project) && project.length > 0) {
    return project;
  }

  if (project?.title) {
    return [project];
  }

  return [];
}

function getWrappedOffset(index, activeIndex, total) {
  const rawOffset = index - activeIndex;
  const half = Math.floor(total / 2);

  if (rawOffset > half) {
    return rawOffset - total;
  }

  if (rawOffset < -half) {
    return rawOffset + total;
  }

  return rawOffset;
}

export default function ProjectSection({ project }) {
  const projects = useMemo(() => normalizeProjects(project), [project]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
  const modalContentRef = useRef(null);
  const activeProject = projects[activeIndex];
  const selectedMediaList = selectedProject?.media?.length
    ? selectedProject.media
    : [getPrimaryMedia(selectedProject)];
  const selectedModalMedia =
    selectedMediaList[selectedMediaIndex] ?? selectedMediaList[0];

  useEffect(() => {
    if (!selectedProject) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedProject(null);
      }
    };

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject]);

  useEffect(() => {
    setSelectedMediaIndex(0);
  }, [selectedProject?.title]);

  if (!activeProject) {
    return null;
  }

  const goToProject = (direction) => {
    setActiveIndex(
      (currentIndex) =>
        (currentIndex + direction + projects.length) % projects.length,
    );
  };

  return (
    <>
      <motion.section
        className={`${sectionClass} overflow-hidden`}
        id="proyek"
        variants={staggerGroup}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div
          className="mb-35 flex flex-col gap-18 lg:flex-row lg:items-end lg:justify-between"
          variants={fadeUp}
        >
          <div>
            <p className={eyebrowClass}>{project?.eyebrow ?? activeProject.eyebrow}</p>
            <h2 className={headingClass}>{project?.heading ?? "Project Playground"}</h2>
          </div>
          <p className="max-w-[420px] text-body-lg leading-[1.5] text-ash-gray">
            {project?.description ??
              "Geser project dengan alur melengkung, seperti kartu yang bergerak mengitari spotlight utama."}
          </p>
        </motion.div>

        <motion.div
          className={`${coloredCardClass} overflow-hidden bg-bone/60 p-18 lg:p-26 `}
          variants={cardIn}
        >
          <div className="grid min-h-[640px] grid-cols-1 gap-35 xl:grid-cols-[minmax(0,0.72fr)_minmax(520px,1fr)] xl:items-center">
            <div className="order-2 min-w-0 max-w-[560px] xl:order-1">
              <motion.p
                className="mb-13 text-caption uppercase tracking-[0.13em] text-ash-gray"
                key={activeProject.eyebrow}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
              >
                {activeProject.eyebrow}
              </motion.p>
              <motion.h3
                className="mb-18 max-w-[520px] break-words text-[clamp(38px,5vw,70px)] font-semibold leading-[0.92] tracking-[-0.05em] text-carbon"
                key={activeProject.title}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
              >
                {activeProject.title}
              </motion.h3>
              <motion.p
                className="max-w-[500px] text-body-lg leading-[1.5] text-ash-gray"
                key={activeProject.description}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.05 }}
              >
                {activeProject.description}
              </motion.p>

              <div className="mt-26 flex flex-wrap gap-9">
                {activeProject.tags.map((tag) => (
                  <motion.span
                    className={tagClass}
                    key={`${activeProject.title}-${tag}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>

              <div className="mt-31 flex flex-wrap gap-13">
                <button
                  className={`${pillClass} bg-pure-white`}
                  type="button"
                  onClick={() => setSelectedProject(activeProject)}
                >
                  Lihat Detail
                </button>
                <a
                  className={`${pillClass} bg-pure-white`}
                  href={activeProject.githubHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
                <a
                  className={`${pillClass} bg-sticker-yellow text-carbon`}
                  href="#kontak"
                >
                  Live Demo
                </a>
              </div>
            </div>

            <div className="relative order-1 min-h-[430px] overflow-hidden rounded-[42px] border border-carbon bg-powder-blue xl:order-2 xl:min-h-[560px]">
              <div className="pointer-events-none absolute left-1/2 top-[58%] h-[540px] w-[760px] -translate-x-1/2 rounded-[50%] border border-carbon/40" />
              <div className="pointer-events-none absolute left-1/2 top-[66%] h-[360px] w-[540px] -translate-x-1/2 rounded-[50%] border border-carbon/25" />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(180deg,transparent_0%,rgba(255,255,255,0.5)_100%)]" />

              {projects.map((item, index) => {
                const offset = getWrappedOffset(
                  index,
                  activeIndex,
                  projects.length,
                );
                const isActive = offset === 0;
                const arcX = offset * 190;
                const arcY = Math.abs(offset) * 58 + (isActive ? 0 : 30);
                const rotate = offset * 12;
                const scale = isActive ? 1 : 0.76;
                const zIndex = 20 - Math.abs(offset);

                return (
                  <motion.button
                    className={`absolute left-1/2 top-[47%] w-[min(78%,360px)] -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-[28px] border border-carbon ${sliderColors[index % sliderColors.length]} p-11 text-left shadow-[8px_8px_0_0_var(--carbon)]`}
                    key={item.title}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    onDoubleClick={() => setSelectedProject(item)}
                    animate={{
                      x: arcX,
                      y: arcY,
                      rotate,
                      scale,
                      opacity: Math.abs(offset) > 1 ? 0.42 : 1,
                      zIndex,
                    }}
                    transition={{ type: "spring", stiffness: 180, damping: 24 }}
                    whileHover={{ y: arcY - 10, rotate: rotate * 0.8 }}
                  >
                    <div className="overflow-hidden rounded-[20px] border border-carbon bg-pure-white">
                      <ProjectMedia
                        className="aspect-[4/3] w-full object-cover"
                        media={getPrimaryMedia(item)}
                        placeholder={item.placeholder}
                        title={item.title}
                      />
                    </div>
                    <div className="mt-11 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-7">
                      <strong className="min-w-0 max-w-[210px] overflow-hidden text-ellipsis text-[clamp(18px,2vw,22px)] font-semibold leading-[1.05] tracking-[-0.04em] text-carbon [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
                        {item.title}
                      </strong>
                      <span className="shrink-0 rounded-full border border-carbon bg-pure-white px-11 py-4 text-caption uppercase tracking-[0.13em] text-ash-gray">
                        0{index + 1}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div className="mt-18 flex flex-col gap-13 border-t border-carbon pt-18 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-9">
              {projects.map((item, index) => (
                <button
                  className={`h-11 rounded-full border border-carbon transition-all ${index === activeIndex ? "w-35 bg-carbon" : "w-11 bg-pure-white"}`}
                  key={`${item.title}-dot`}
                  type="button"
                  aria-label={`Lihat project ${item.title}`}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
            <div className="flex gap-13">
              <button
                className={`${pillClass} bg-pure-white`}
                type="button"
                onClick={() => goToProject(-1)}
              >
                Prev
              </button>
              <button
                className={`${pillClass} bg-carbon text-pure-white`}
                type="button"
                onClick={() => goToProject(1)}
              >
                Next
              </button>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {selectedProject ? (
        <div
          className="fixed inset-0 z-50 grid place-items-center overflow-y-auto overscroll-contain bg-carbon/55 px-16 py-35 backdrop-blur-sm"
          data-lenis-prevent
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          onMouseDown={() => setSelectedProject(null)}
          onTouchMove={(event) => event.stopPropagation()}
          >
          <motion.article
            className={`${cardClass} h-[min(860px,calc(100vh_-_70px))] w-[min(1180px,100%)] overflow-y-auto overscroll-contain scroll-smooth bg-pure-white p-18 shadow-[10px_10px_0_0_var(--carbon)] md:p-26`}
            ref={modalContentRef}
            initial={{ opacity: 0, y: 42, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onMouseDown={(event) => event.stopPropagation()}
            onTouchMove={(event) => event.stopPropagation()}
            data-lenis-prevent
          >
            <div className="mb-22 flex items-start justify-between gap-18">
              <div>
                <p className={eyebrowClass}>{selectedProject.eyebrow}</p>
                <h3
                  className="max-w-[850px] text-[clamp(40px,6vw,76px)] font-semibold leading-[0.9] tracking-[-0.05em] text-carbon"
                  id="project-modal-title"
                >
                  {selectedProject.title}
                </h3>
              </div>
              <button
                className="grid h-42 w-42 shrink-0 place-items-center rounded-full border border-carbon bg-sticker-yellow text-subheading leading-none"
                type="button"
                aria-label="Tutup detail project"
                onClick={() => setSelectedProject(null)}
              >
                ×
              </button>
            </div>

            <div className="grid gap-22 xl:grid-cols-[minmax(0,1fr)_360px]">
              <div className="min-w-0">
                <div className="overflow-hidden rounded-cards border border-carbon bg-powder-blue p-11">
                  <ProjectMedia
                    className="aspect-video w-full rounded-[12px] border border-carbon bg-carbon object-contain"
                    controls
                    media={selectedModalMedia}
                    placeholder={selectedProject.placeholder}
                    title={selectedProject.title}
                  />
                </div>

                {selectedMediaList.length > 1 ? (
                  <div className="mt-13 flex gap-11 overflow-x-auto pb-6">
                    {selectedMediaList.map((media, index) => (
                      <button
                        className={`w-[150px] shrink-0 overflow-hidden rounded-[16px] border bg-pure-white p-5 transition ${index === selectedMediaIndex ? "border-carbon shadow-[4px_4px_0_0_var(--carbon)]" : "border-carbon/35 opacity-70 hover:opacity-100"}`}
                        key={media.src}
                        type="button"
                        aria-label={`Lihat media ${index + 1} ${selectedProject.title}`}
                        onClick={() => setSelectedMediaIndex(index)}
                      >
                        <ProjectMedia
                          className="aspect-video w-full rounded-[10px] object-cover"
                          media={media}
                          placeholder={selectedProject.placeholder}
                          title={selectedProject.title}
                        />
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>

              <aside className="rounded-cards border border-carbon bg-bone p-18 xl:sticky xl:top-0 xl:self-start">
                <p className="text-body-lg leading-[1.5] text-ash-gray">
                  {selectedProject.description}
                </p>

                <div className="mt-18 flex flex-wrap gap-9">
                  {selectedProject.tags.map((tag) => (
                    <span
                      className={tagClass}
                      key={`${selectedProject.title}-modal-${tag}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-22 border-t border-carbon pt-18">
                  <p className="mb-13 text-caption uppercase tracking-[0.13em] text-ash-gray">
                    Yang Dikerjakan
                  </p>
                  <ul className="m-0 grid list-none gap-11 p-0">
                    {(
                      selectedProject.details ?? [selectedProject.videoHint]
                    ).map((detail) => (
                      <li
                        className="flex gap-9 text-sm leading-[1.5] text-carbon"
                        key={detail}
                      >
                        <span className="mt-[7px] h-9 w-9 shrink-0 rounded-full border border-carbon bg-acid-lime" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-22 flex flex-wrap gap-13">
                  <a
                    className={`${pillClass} bg-sticker-yellow text-carbon`}
                    href={selectedProject.githubHref}
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
                  <a
                    className={`${pillClass} bg-pure-white text-ash-gray`}
                    href="#kontak"
                    onClick={() => setSelectedProject(null)}
                  >
                    Tanya Project
                  </a>
                </div>
              </aside>
            </div>
          </motion.article>
        </div>
      ) : null}
    </>
  );
}
