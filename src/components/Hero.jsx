import { motion } from "framer-motion";
import { fadeUp, staggerGroup } from "./motionConfig";
import { eyebrowClass, pillClass, sectionClass } from "./styles";

export default function Hero({ hero }) {
  return (
    <motion.section
      className={`${sectionClass} grid min-h-[calc(100vh-78px)] grid-cols-1 items-center pt-70 sm:pt-105 lg:pt-44`}
      id="home"
      variants={staggerGroup}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="relative grid min-h-[640px] items-start overflow-hidden pt-26 sm:min-h-[620px] sm:items-center sm:overflow-visible sm:pt-0 lg:col-span-2"
        variants={fadeUp}
      >
        <motion.img
          className="pointer-events-none absolute bottom-[-46px] right-[-30%] z-[1] h-[clamp(360px,95vw,520px)] max-w-none object-contain opacity-35 sm:bottom-[-86px] sm:right-[-8%] sm:z-[4] sm:h-[clamp(440px,60vw,820px)] sm:opacity-100"
          src={hero.image}
          alt={hero.imageAlt}
          initial={{ opacity: 0, x: 42 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        />
        <motion.div
          className="absolute right-[2%] top-[2%] z-[3] hidden w-[190px] gap-7 lg:grid"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.28 }}
        >
          {hero.stats.map((stat) => (
            <div
              className={`${stat.className} rounded-nav border border-carbon ${stat.color} px-11 py-7 text-right`}
              key={stat.label}
            >
              <span className="block text-[9px] uppercase tracking-[0.13em] text-ash-gray">
                {stat.label}
              </span>
              <strong className="block text-[18px] font-medium leading-[1.1] text-carbon">
                {stat.value}
              </strong>
            </div>
          ))}
        </motion.div>
        <div className="relative z-[2] max-w-[760px]">
          <p className={eyebrowClass}>{hero.eyebrow}</p>
          <h1 className="mb-22 max-w-[780px] text-[clamp(58px,20vw,176px)] font-semibold leading-[0.82] tracking-[-0.06em] sm:mb-26 sm:leading-[0.77]">
            {hero.titlePrefix}{" "}
            <span className="text-acid-lime [-webkit-text-stroke:1px_#0f0f0f]">
              {hero.titleAccent}
            </span>
          </h1>
          <p className="mb-0 max-w-[650px] text-[clamp(22px,7vw,35px)] font-medium leading-[1.13] text-carbon">
            {hero.description}
          </p>
          <div className="mt-28 flex flex-col gap-11 sm:mt-35 sm:flex-row sm:flex-wrap sm:gap-13">
            <a
              className="inline-flex min-h-[52px] items-center justify-center gap-11 rounded-buttons border border-carbon bg-acid-lime px-22 text-base font-medium text-pure-white no-underline transition-opacity hover:opacity-80 sm:min-h-[58px] sm:gap-13 sm:px-35 sm:text-body-lg"
              href={hero.cvHref}
              download
            >
              <span className="flex gap-4">
                <span className="h-11 w-11 rounded-full border border-carbon bg-sticker-yellow" />
                <span className="h-11 w-11 rounded-full border border-carbon bg-cotton-pink" />
                <span className="h-11 w-11 rounded-full border border-carbon bg-powder-blue" />
              </span>
              Download CV
            </a>
            <a className={`${pillClass} bg-pure-white`} href="#proyek">
              Lihat Proyek
            </a>
            <a
              className={`${pillClass} bg-bone text-ash-gray`}
              href={hero.whatsappHref}
              target="_blank"
              rel="noreferrer"
            >
              Hubungi Saya
            </a>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
