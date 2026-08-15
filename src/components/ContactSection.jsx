import { motion } from 'framer-motion';
import { fadeUp, staggerGroup } from './motionConfig';
import { cardClass, eyebrowClass, headingClass, sectionClass } from './styles';

export default function ContactSection({ intro, contacts }) {
  return (
    <motion.section
      className={`${sectionClass} grid grid-cols-1 items-start gap-[clamp(28px,6vw,72px)] lg:grid-cols-[0.9fr_1.1fr]`}
      id="kontak"
      variants={staggerGroup}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      <div>
        <p className={eyebrowClass}>{intro.eyebrow}</p>
        <h2 className={headingClass}>{intro.title}</h2>
        <p className="mt-26 text-body-lg leading-[1.5] text-ash-gray">{intro.description}</p>
      </div>
      <motion.div className={`${cardClass} overflow-hidden`} variants={fadeUp}>
        {contacts.map((contact) => (
          <a
            className="grid gap-7 border-t border-carbon p-26 no-underline first:border-t-0 hover:bg-bone"
            key={contact.label}
            href={contact.href}
            target={contact.label === 'Email' || contact.label === 'Telepon' ? undefined : '_blank'}
            rel="noreferrer"
          >
            <span className="text-[13px] font-medium uppercase text-ash-gray">{contact.label}</span>
            <strong className="break-words text-[clamp(25px,3vw,35px)] font-medium">{contact.value}</strong>
          </a>
        ))}
      </motion.div>
    </motion.section>
  );
}