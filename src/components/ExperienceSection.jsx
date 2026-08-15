import { motion } from "framer-motion";
import { fadeUp, staggerGroup } from "./motionConfig";
import { cardClass, eyebrowClass, headingClass, sectionClass } from "./styles";

const experienceCard = {
  hidden: { opacity: 0, y: 72, rotateX: 8, rotateZ: -2, scale: 0.94 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    rotateZ: 0,
    scale: 1,
    transition: {
      delay: index * 0.12,
      duration: 0.72,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.08,
      delayChildren: 0.18,
    },
  }),
};

const revealItem = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

const coloredCardClass = cardClass.replace(" bg-pure-white", "");
const pointColors = ["bg-sticker-yellow", "bg-cotton-pink", "bg-powder-blue"];

const bulletItem = {
  hidden: { opacity: 0, x: -18 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ExperienceSection({ experiences }) {
  return (
    <motion.section
      className={sectionClass}
      id="pengalaman"
      variants={staggerGroup}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
    >
      <motion.div
        className="mb-35 grid grid-cols-1 items-end gap-18 lg:grid-cols-[minmax(0,850px)_1fr]"
        variants={fadeUp}
      >
        <div>
          <p className={eyebrowClass}>Pengalaman</p>
          <h2 className={headingClass}>
            Berpengalaman di web, cloud, dan dukungan pengguna.
          </h2>
        </div>
        <p className="mb-0 max-w-[360px] text-body-lg leading-[1.5] text-ash-gray lg:justify-self-end">
          Dari membangun fitur sampai mendengar kendala pengguna langsung,
          setiap peran membentuk cara saya bekerja.
        </p>
      </motion.div>

      <div className="relative">
        <div className="pointer-events-none absolute left-18 top-0 hidden h-full w-px bg-carbon/25 lg:block" />
        <div className="grid grid-cols-1 gap-18 lg:grid-cols-3">
          {experiences.map((experience, index) => (
            <motion.article
              className={`${coloredCardClass} ${experience.color} group relative flex min-h-full flex-col gap-18 overflow-hidden p-[28px]`}
              custom={index}
              key={experience.role}
              variants={experienceCard}
              whileHover={{
                y: -10,
                rotate: index % 2 === 0 ? -0.7 : 0.7,
                scale: 1.015,
              }}
            >
              <motion.div
                className="absolute -right-18 -top-18 grid h-105 w-105 place-items-center rounded-full border border-carbon bg-pure-white text-[42px] font-semibold leading-none tracking-[-0.05em] text-carbon transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105"
                variants={revealItem}
              >
                0{index + 1}
              </motion.div>

              <motion.div className="relative z-[1]" variants={revealItem}>
                <span className="mb-13 inline-flex rounded-nav border border-carbon bg-pure-white px-13 py-7 text-[13px] font-medium uppercase tracking-[0.13em] text-ash-gray">
                  {experience.period}
                </span>
                <h3 className="mb-9 max-w-[260px] text-[clamp(25px,3vw,35px)] font-semibold leading-[1.06] tracking-[-0.04em] text-carbon">
                  {experience.role}
                </h3>
                <p className="mb-0 text-body-lg font-medium text-carbon">
                  {experience.company}
                </p>
              </motion.div>

              <motion.p
                className="relative z-[1] text-body-lg leading-[1.5] text-ash-gray"
                variants={revealItem}
              >
                {experience.description}
              </motion.p>

              <motion.ul
                className="relative z-[1] mt-auto grid w-full list-none gap-11 p-0"
                variants={staggerGroup}
              >
                {experience.points.map((point, pointIndex) => (
                  <motion.li
                    className="flex w-full items-center justify-between gap-11 rounded-buttons border border-carbon bg-pure-white px-13 py-9 text-left text-sm leading-[1.45] text-carbon shadow-[2px_2px_0_0_var(--carbon)] transition-transform group-hover:-translate-y-1"
                    key={point}
                    variants={bulletItem}
                  >
                    <span className={`h-11 w-11 shrink-0 rounded-full border border-carbon ${pointColors[pointIndex % pointColors.length]}`} />
                    <span className="flex-1">{point}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
