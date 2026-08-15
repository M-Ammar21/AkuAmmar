import { motion } from 'framer-motion';

export default function Marquee({ items }) {
  const runningItems = [...items, ...items, ...items];

  return (
    <section className="relative z-[1] mx-auto w-[min(1200px,calc(100%_-_32px))] overflow-hidden rounded-cards border border-carbon bg-bone py-13" aria-label="Tech stack utama">
      <motion.div
        className="flex w-max items-center gap-13 px-13 will-change-transform"
        animate={{ x: ['0%', '-33.333%'] }}
        transition={{ duration: 24, ease: 'linear', repeat: Infinity }}
      >
        {runningItems.map((item, index) => (
          <article
            className="flex min-w-[190px] items-center gap-11 rounded-nav border border-carbon bg-pure-white px-18 py-11"
            key={`${item.label}-${index}`}
          >
            <span className="grid h-35 w-35 place-items-center rounded-nav bg-plaster">
              <img className="h-26 w-26 object-contain" src={item.logo} alt="" loading="lazy" />
            </span>
            <span className="text-sm font-medium text-carbon">{item.label}</span>
          </article>
        ))}
      </motion.div>
    </section>
  );
}