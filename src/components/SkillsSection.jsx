import { motion } from 'framer-motion';
import { cardIn, fadeUp, staggerGroup } from './motionConfig';
import { cardClass, eyebrowClass, headingClass, sectionClass, tagClass } from './styles';

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
      <motion.div className="mb-35 grid grid-cols-1 items-end gap-26 lg:grid-cols-[1fr_minmax(240px,380px)]" variants={fadeUp}>
        <div>
          <p className={eyebrowClass}>{intro.eyebrow}</p>
          <h2 className={headingClass}>{intro.title}</h2>
        </div>
        <p className="text-body-lg leading-[1.5] text-ash-gray">{intro.description}</p>
      </motion.div>
      <div className="grid grid-cols-1 gap-18 md:grid-cols-2 lg:grid-cols-4">
        {skills.map((group) => (
          <motion.article className={`${cardClass} p-26 ${group.color}`} key={group.title} variants={cardIn} whileHover={{ y: -6, rotate: 0.5 }}>
            <h3 className="mb-9 text-[clamp(25px,3vw,35px)] font-semibold leading-[1.06] tracking-[-0.04em]">{group.title}</h3>
            <div className="flex flex-wrap gap-9">
              {group.items.map((item) => <span className={tagClass} key={item}>{item}</span>)}
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}