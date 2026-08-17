import { motion } from 'framer-motion';

export default function Navbar({ items }) {
  return (
    <div className="sticky top-11 z-10 mx-auto mt-11 flex w-full justify-center px-11 sm:top-18 sm:mt-18 sm:px-18">
      <motion.header
        className="inline-grid w-fit max-w-full grid-cols-1 justify-items-center rounded-nav bg-bone px-7 py-7 sm:px-11"
        aria-label="Navigasi utama"
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav aria-label="Portfolio navigation">
          <ul className="m-0 flex flex-wrap items-center justify-center gap-y-4 p-0 text-[13px] font-medium text-obsidian sm:text-sm">
            {items.map((item) => (
              <li className="flex items-center before:mx-6 before:text-slate-gray before:content-['|'] first:before:hidden sm:before:mx-11" key={item.href}>
                <motion.a
                  className="inline-flex min-h-[32px] items-center justify-center rounded-nav px-8 text-obsidian no-underline transition-colors hover:bg-pure-white sm:min-h-[34px] sm:px-11"
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