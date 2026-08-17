import { useRef } from "react";
import { motion } from "framer-motion";
import { cardIn, fadeUp, staggerGroup } from "./motionConfig";
import { cardClass, eyebrowClass, headingClass, sectionClass } from "./styles";

const universityLogo = "assets/photos/UB_Logo.png";

function getItemLogo(item) {
  if (item.logo) {
    return item.logo;
  }

  if (item.title.toLowerCase().includes("brawijaya")) {
    return universityLogo;
  }

  return null;
}

function InfoCard({ index, item }) {
  const logo = getItemLogo(item);

  return (
    <motion.article
      className={`${cardClass} ${item.color || "bg-pure-white"} relative isolate h-full min-h-[220px] overflow-hidden p-[clamp(16px,2.1vw,22px)] shadow-[6px_6px_0_0_var(--carbon)] sm:min-h-[250px] sm:shadow-[8px_8px_0_0_var(--carbon)]`}
      variants={cardIn}
    >
      {logo ? (
        <img
          className="pointer-events-none absolute -right-10 -top-2 z-0 h-[clamp(110px,32vw,180px)] w-[clamp(110px,32vw,180px)] object-contain opacity-15 sm:right-18"
          src={logo}
          alt=""
          aria-hidden="true"
        />
      ) : null}

      <div className="relative z-[1] flex h-full flex-col justify-center gap-16">
        <div className="flex items-start justify-between gap-14">
          <div className="min-w-0 pr-2">
            <p className="mb-8 text-[11px] font-medium uppercase leading-none tracking-[0.13em] text-ash-gray sm:text-caption">
              {item.eyebrow}
            </p>
            <h3 className="text-[clamp(24px,2.6vw,34px)] font-semibold leading-[1] tracking-[-0.04em] text-carbon">
              {item.title}
            </h3>
          </div>
        </div>

        <div className="rounded-[20px] border border-carbon bg-pure-white/80 p-13 backdrop-blur-sm">
          <p className="text-[clamp(13px,1.25vw,15px)] leading-[1.45] text-ash-gray">
            {item.description}
          </p>
          <strong className="mt-9 inline-flex rounded-buttons border border-carbon bg-carbon px-13 py-7 text-[12px] font-medium leading-none text-pure-white sm:text-[13px]">
            {item.highlight}
          </strong>
        </div>
      </div>

      <span className="pointer-events-none absolute -bottom-48 -right-44 h-120 w-120 rounded-full border border-carbon/15 bg-pure-white/35" />
    </motion.article>
  );
}

function PhotoStrip({ media }) {
  const stripRef = useRef(null);
  const isPausedRef = useRef(false);

  if (!media.length) {
    return null;
  }

  const togglePhotoStrip = () => {
    isPausedRef.current = !isPausedRef.current;

    if (stripRef.current) {
      stripRef.current.style.animationPlayState = isPausedRef.current
        ? "paused"
        : "running";
    }
  };

  return (
    <motion.aside
      className="relative h-[360px] cursor-pointer overflow-hidden rounded-[28px] sm:h-[460px] sm:rounded-[34px] xl:h-[620px]"
      variants={cardIn}
      role="button"
      tabIndex={0}
      aria-label="Pause atau lanjutkan photo strip organisasi"
      onClick={togglePhotoStrip}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          togglePhotoStrip();
        }
      }}
    >
      <style>
        {`
          @keyframes education-photo-strip {
            from { transform: translateY(0); }
            to { transform: translateY(-50%); }
          }
        `}
      </style>
      <div
        className="flex flex-col will-change-transform"
        ref={stripRef}
        style={{ animation: "education-photo-strip 18s linear infinite" }}
      >
        {[0, 1].map((groupIndex) => (
          <div className="flex flex-col gap-13 pb-13" key={groupIndex}>
            {media.map((item) => (
              <figure
                className="group m-0 h-[170px] overflow-hidden rounded-[22px] border border-carbon bg-bone shadow-[5px_5px_0_0_var(--carbon)] sm:h-[220px] sm:rounded-[28px] sm:shadow-[7px_7px_0_0_var(--carbon)] xl:h-[300px]"
                key={`${item.src}-${groupIndex}`}
              >
                <img
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src={item.src}
                  alt={item.alt}
                />
              </figure>
            ))}
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-70 bg-gradient-to-b from-bone to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-70 bg-gradient-to-t from-bone to-transparent" />
    </motion.aside>
  );
}

export default function EducationSection({ items }) {
  const organization = items.find((item) => item.media?.length);
  const stripMedia = organization?.media ?? [];

  return (
    <motion.section
      className={`${sectionClass} pt-0`}
      variants={staggerGroup}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div
        className="mb-28 grid grid-cols-1 items-end gap-18 sm:mb-35 lg:grid-cols-[minmax(0,720px)_1fr]"
        variants={fadeUp}
      >
        <div>
          <p className={eyebrowClass}>Education & Organization</p>
          <h2 className={headingClass}>
            Learning path yang membentuk cara kerja.
          </h2>
        </div>
        <p className="text-body-lg leading-[1.5] text-ash-gray">
          Kombinasi latar akademik Teknik Informatika dan pengalaman organisasi
          kreatif yang melatih problem solving, komunikasi, dan delivery.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-18 xl:grid-cols-[minmax(0,0.88fr)_minmax(420px,1.12fr)] xl:items-stretch">
        <div className="grid content-stretch gap-18 xl:h-[620px]">
          {items.map((item, index) => (
            <InfoCard index={index} item={item} key={item.title} />
          ))}
        </div>

        <PhotoStrip media={stripMedia} />
      </div>
    </motion.section>
  );
}
