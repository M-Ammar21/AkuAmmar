import { motion } from 'framer-motion';
import { cardIn, staggerGroup } from './motionConfig';
import { cardClass, eyebrowClass, headingClass } from './styles';

export default function EducationSection({ items }) {
  return (
    <motion.section
      className="relative z-[1] mx-auto grid w-[min(1200px,calc(100%_-_32px))] grid-cols-1 gap-18 pb-[clamp(68px,9vw,120px)] md:grid-cols-2"
      variants={staggerGroup}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {items.map((item) => (
        <motion.article className={`${cardClass} ${item.color} p-[clamp(28px,4vw,44px)]`} variants={cardIn} key={item.title}>
          <p className={eyebrowClass}>{item.eyebrow}</p>
          <h2 className={headingClass}>{item.title}</h2>
          <p className="text-body-lg leading-[1.5] text-ash-gray">{item.description}</p>
          <strong className="mt-9 inline-flex text-body-lg font-medium">{item.highlight}</strong>
        </motion.article>
      ))}
    </motion.section>
  );
}
