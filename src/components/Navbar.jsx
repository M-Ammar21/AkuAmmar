import { motion } from 'framer-motion';

export default function Navbar({ items }) {
  return (
    <div className="sticky top-7 z-10 mx-auto mt-7 flex w-full justify-center px-7 sm:top-18 sm:mt-18 sm:px-18">
      <motion.header
        className="inline-grid w-fit max-w-full grid-cols-1 justify-items-center rounded-nav bg-bone/95 px-4 py-4 shadow-[0_8px_28px_rgba(15,15,15,0.08)] backdrop-blur sm:px-11 sm:py-7"
        aria-label="Navigasi utama"
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav aria-label="Portfolio navigation">
          <ul className="m-0 flex max-w-[calc(100vw_-_28px)] flex-nowrap items-center justify-start gap-4 overflow-x-auto p-0 text-[11px] font-medium text-obsidian [-ms-overflow-style:none] [scrollbar-width:none] sm:max-w-none sm:flex-wrap sm:justify-center sm:gap-x-0 sm:gap-y-4 sm:overflow-visible sm:text-sm [&::-webkit-scrollbar]:hidden">
            {items.map((item) => (
              <li className="flex shrink-0 items-center before:hidden sm:before:mx-11 sm:before:block sm:before:text-slate-gray sm:before:content-['|'] first:before:hidden" key={item.href}>
                <motion.a
                  className="inline-flex min-h-[28px] items-center justify-center rounded-nav px-7 text-obsidian no-underline transition-colors hover:bg-pure-white sm:min-h-[34px] sm:px-11"
                  href={item.href}
                  title={item.title}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span>{item.label}</span>
                </motion.a>
              </li>
            ))}
          </ul>
        </nav>
      </motion.header>
    </div>
  );
}
