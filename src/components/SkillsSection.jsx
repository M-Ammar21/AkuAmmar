import { motion } from 'framer-motion';
import { cardIn, fadeUp, staggerGroup } from './motionConfig';
import { cardClass, eyebrowClass, headingClass, sectionClass } from './styles';

const skillTagClass =
  'inline-flex min-h-[24px] items-center rounded-buttons border border-carbon bg-pure-white px-7 text-[10px] font-medium leading-none sm:min-h-[28px] sm:px-9 sm:text-[12px]';

const levelColorClass = {
  'Back-End': 'bg-acid-lime',
  'Front-End': 'bg-sticker-yellow',
  'Cloud & Tools': 'bg-powder-blue',
  Support: 'bg-cotton-pink',
};

function getLevelPercent(level) {
  return `${Math.min(Math.max(level, 0), 10) * 10}%`;
}

export default function SkillsSection({ intro, skills }) {
  return (
    <motion.section
      className={sectionClass}
      id="keahlian"
      variants={staggerGroup}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div
        className="mb-18 grid grid-cols-1 items-end gap-13 sm:mb-35 sm:gap-26 lg:grid-cols-[1fr_minmax(240px,380px)]"
        variants={fadeUp}
      >
        <div>
          <p className={eyebrowClass}>{intro.eyebrow}</p>
          <h2 className={headingClass}>{intro.title}</h2>
        </div>
        <p className="text-sm leading-[1.5] text-ash-gray sm:text-body-lg">
          {intro.description}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-9 sm:gap-13">
        {skills.map((group) => {
          const level = group.level ?? 0;
          const levelPercent = getLevelPercent(level);
          const levelColor = levelColorClass[group.title] ?? 'bg-acid-lime';

          return (
            <motion.article
              className={`${cardClass} flex min-h-[168px] flex-col gap-11 p-13 sm:min-h-[210px] sm:gap-13 sm:p-18 ${group.color}`}
              key={group.title}
              variants={cardIn}
              whileHover={{ y: -6, rotate: 0.5 }}
            >
              <div>
                <p className="mb-5 text-[9px] uppercase tracking-[0.13em] text-ash-gray sm:text-caption">
                  Skill Level
                </p>
                <h3 className="text-[clamp(24px,7vw,35px)] font-semibold leading-[1] tracking-[-0.04em]">
                  {group.title}
                </h3>
              </div>

              <div className="mt-auto">
                <div className="mb-7 flex items-center justify-between text-[9px] uppercase tracking-[0.13em] text-ash-gray sm:text-caption">
                  <span>0</span>
                  <span>{level}/10</span>
                  <span>10</span>
                </div>
                <div className="h-11 overflow-hidden rounded-full border border-carbon bg-pure-white sm:h-[13px]">
                  <div
                    className={`h-full rounded-full border-r border-carbon ${levelColor}`}
                    style={{ width: levelPercent }}
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-4 sm:gap-5">
                {group.items.map((item) => (
                  <span className={skillTagClass} key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </motion.article>
          );
        })}
      </div>
    </motion.section>
  );
}





