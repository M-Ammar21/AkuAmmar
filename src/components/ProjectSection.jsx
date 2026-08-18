import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cardIn, fadeUp, staggerGroup } from "./motionConfig";
import {
  cardClass,
  eyebrowClass,
  headingClass,
  sectionClass,
  tagClass,
} from "./styles";

const sliderColors = ["bg-sticker-yellow", "bg-powder-blue", "bg-cotton-pink"];

const coloredCardClass = cardClass.replace(" bg-pure-white", "");
const compactPillClass =
  "inline-flex min-h-[42px] items-center justify-center rounded-buttons border border-carbon px-[16px] text-[13px] font-medium no-underline transition-colors sm:min-h-[46px] sm:px-[20px] sm:text-sm";
const projectCardPillClass =
  "inline-flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full border border-carbon text-[12px] font-medium no-underline transition-colors sm:h-auto sm:w-auto sm:min-h-[42px] sm:rounded-buttons sm:px-[16px] sm:text-[13px]";

function ProjectActionIcon({ type }) {
  const iconClass = "h-[15px] w-[15px] sm:hidden";

  if (type === "detail") {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3 12s3.4-6 9-6 9 6 9 6-3.4 6-9 6-9-6-9-6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }

  if (type === "github") {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.59 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49v-1.9c-2.78.62-3.37-1.22-3.37-1.22-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.56 2.35 1.11 2.92.85.09-.67.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.08 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.3.1-2.72 0 0 .85-.28 2.75 1.05A9.29 9.29 0 0 1 12 6.93c.85 0 1.7.12 2.5.34 1.9-1.33 2.74-1.05 2.74-1.05.56 1.42.21 2.46.11 2.72.64.72 1.03 1.64 1.03 2.76 0 3.95-2.34 4.82-4.57 5.08.36.32.68.95.68 1.92v2.79c0 .27.18.59.69.49A10.23 10.23 0 0 0 22 12.25C22 6.59 17.52 2 12 2Z" />
      </svg>
    );
  }

  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 17 17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M9 7h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

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

  const liveDemoHref = activeProject.liveDemoHref ?? activeProject.demoHref;
  const hasMultipleModalMedia = selectedMediaList.length > 1;
  const goToModalMedia = (direction) => {
    if (!hasMultipleModalMedia) {
      return;
    }

    setSelectedMediaIndex(
      (currentIndex) =>
        (currentIndex + direction + selectedMediaList.length) % selectedMediaList.length,
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

              <div className="mt-26 flex flex-nowrap items-center gap-[8px] sm:mt-31 sm:flex-wrap sm:gap-9">
                <button
                  className={`${projectCardPillClass} bg-pure-white`}
                  type="button"
                  aria-label={`Lihat detail ${activeProject.title}`}
                  onClick={() => setSelectedProject(activeProject)}
                >
                  <ProjectActionIcon type="detail" />
                  <span className="sr-only sm:not-sr-only">Lihat Detail</span>
                </button>
                <a
                  className={`${projectCardPillClass} bg-pure-white`}
                  href={activeProject.githubHref}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Buka GitHub ${activeProject.title}`}
                >
                  <ProjectActionIcon type="github" />
                  <span className="sr-only sm:not-sr-only">GitHub</span>
                </a>
                {liveDemoHref ? (
                  <a
                    className={`${projectCardPillClass} bg-sticker-yellow text-carbon`}
                    href={liveDemoHref}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Buka live demo ${activeProject.title}`}
                  >
                    <ProjectActionIcon type="demo" />
                    <span className="sr-only sm:not-sr-only">Live Demo</span>
                  </a>
                ) : null}
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
            <div className="flex justify-center gap-9 sm:justify-start">
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
            <div className="grid w-full grid-cols-2 gap-11 sm:flex sm:w-auto sm:gap-13">
              <button
                className={`${compactPillClass} w-full bg-pure-white sm:w-auto`}
                type="button"
                onClick={() => goToProject(-1)}
              >
                Prev
              </button>
              <button
                className={`${compactPillClass} w-full bg-carbon text-pure-white sm:w-auto`}
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
          className="fixed inset-0 z-50 grid items-start justify-items-center overflow-y-auto overscroll-contain bg-carbon/55 px-4 py-7 backdrop-blur-sm sm:place-items-center sm:px-16 sm:py-35"
          data-lenis-prevent
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          onMouseDown={() => setSelectedProject(null)}
          onTouchMove={(event) => event.stopPropagation()}
          >
          <motion.article
            className={`${cardClass} max-h-[calc(100dvh_-_14px)] w-[min(1180px,calc(100%_-_6px))] overflow-y-auto overscroll-contain scroll-smooth bg-pure-white p-9 shadow-[4px_4px_0_0_var(--carbon)] sm:max-h-[calc(100dvh_-_70px)] sm:p-18 sm:shadow-[10px_10px_0_0_var(--carbon)] md:p-26`}
            ref={modalContentRef}
            initial={{ opacity: 0, y: 42, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onMouseDown={(event) => event.stopPropagation()}
            onTouchMove={(event) => event.stopPropagation()}
            data-lenis-prevent
          >
            <div className="mb-13 flex items-start justify-between gap-9 sm:mb-22 sm:gap-18">
              <div className="min-w-0">
                <p className={`${eyebrowClass} mb-9 text-[10px] sm:mb-18 sm:text-caption`}>{selectedProject.eyebrow}</p>
                <h3
                  className="max-w-[850px] break-words text-[clamp(28px,9vw,76px)] font-semibold leading-[0.94] tracking-[-0.05em] text-carbon sm:leading-[0.9]"
                  id="project-modal-title"
                >
                  {selectedProject.title}
                </h3>
              </div>
              <button
                className="grid h-31 w-31 shrink-0 place-items-center rounded-full border border-carbon bg-sticker-yellow text-[22px] leading-none sm:h-42 sm:w-42 sm:text-subheading"
                type="button"
                aria-label="Tutup detail project"
                onClick={() => setSelectedProject(null)}
              >
                ×
              </button>
            </div>

            <div className="grid gap-13 sm:gap-22 xl:grid-cols-[minmax(0,1fr)_360px]">
              <div className="min-w-0">
                <div className="relative overflow-visible rounded-[12px] border border-carbon bg-powder-blue p-4 sm:rounded-cards sm:p-11">
                  <ProjectMedia
                    className="aspect-video w-full rounded-[8px] border border-carbon bg-carbon object-contain sm:rounded-[12px]"
                    controls
                    media={selectedModalMedia}
                    placeholder={selectedProject.placeholder}
                    title={selectedProject.title}
                  />

                  {hasMultipleModalMedia ? (
                    <>
                      <button
                        className="absolute left-[-6px] top-1/2 z-[30] grid h-[36px] w-[36px] -translate-y-1/2 place-items-center rounded-full bg-pure-white/35 text-[18px] font-semibold leading-none text-carbon backdrop-blur-sm transition hover:bg-pure-white/60 sm:left-[-10px] sm:h-[44px] sm:w-[44px] sm:text-[22px]"
                        type="button"
                        aria-label={`Media sebelumnya ${selectedProject.title}`}
                        onClick={() => goToModalMedia(-1)}
                      >
                        {"<"}
                      </button>
                      <button
                        className="absolute right-[-6px] top-1/2 z-[30] grid h-[36px] w-[36px] -translate-y-1/2 place-items-center rounded-full bg-pure-white/35 text-[18px] font-semibold leading-none text-carbon backdrop-blur-sm transition hover:bg-pure-white/60 sm:right-[-10px] sm:h-[44px] sm:w-[44px] sm:text-[22px]"
                        type="button"
                        aria-label={`Media berikutnya ${selectedProject.title}`}
                        onClick={() => goToModalMedia(1)}
                      >
                        {">"}
                      </button>
                    </>
                  ) : null}
                </div>

                {hasMultipleModalMedia ? (
                  <div className="mt-9 flex snap-x gap-7 overflow-x-auto pb-6 sm:mt-13 sm:gap-11">
                    {selectedMediaList.map((media, index) => (
                      <button
                        className={`w-[clamp(92px,32vw,150px)] shrink-0 snap-start overflow-hidden rounded-[12px] border bg-pure-white p-4 transition sm:rounded-[16px] sm:p-5 ${index === selectedMediaIndex ? "border-carbon shadow-[3px_3px_0_0_var(--carbon)] sm:shadow-[4px_4px_0_0_var(--carbon)]" : "border-carbon/35 opacity-70 hover:opacity-100"}`}
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

              <aside className="rounded-[12px] border border-carbon bg-bone p-11 sm:rounded-cards sm:p-18 xl:sticky xl:top-0 xl:self-start">
                <p className="text-sm leading-[1.45] text-ash-gray sm:text-body-lg sm:leading-[1.5]">
                  {selectedProject.description}
                </p>

                <div className="mt-13 flex flex-wrap gap-7 sm:mt-18 sm:gap-9">
                  {selectedProject.tags.map((tag) => (
                    <span
                      className={tagClass}
                      key={`${selectedProject.title}-modal-${tag}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-16 border-t border-carbon pt-13 sm:mt-22 sm:pt-18">
                  <p className="mb-9 text-[10px] uppercase tracking-[0.13em] text-ash-gray sm:mb-13 sm:text-caption">
                    Yang Dikerjakan
                  </p>
                  <ul className="m-0 grid list-none gap-9 p-0 sm:gap-11">
                    {(
                      selectedProject.details ?? [selectedProject.videoHint]
                    ).map((detail) => (
                      <li
                        className="flex gap-7 text-[13px] leading-[1.45] text-carbon sm:gap-9 sm:text-sm sm:leading-[1.5]"
                        key={detail}
                      >
                        <span className="mt-[6px] h-7 w-7 shrink-0 rounded-full border border-carbon bg-acid-lime sm:mt-[7px] sm:h-9 sm:w-9" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-16 grid grid-cols-1 gap-9 sm:mt-22 sm:flex sm:flex-wrap sm:gap-13">
                  <a
                    className={`${compactPillClass} w-full bg-sticker-yellow text-carbon sm:w-auto`}
                    href={selectedProject.githubHref}
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
                  <a
                    className={`${compactPillClass} w-full bg-pure-white text-ash-gray sm:w-auto`}
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
