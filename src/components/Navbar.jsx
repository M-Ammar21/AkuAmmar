import { motion } from 'framer-motion';

export default function Navbar({ items }) {
  return (
    <div className="sticky top-18 z-10 mx-auto mt-18 flex w-full justify-center px-18">
      <motion.header
        className="inline-grid w-fit max-w-full grid-cols-1 justify-items-center rounded-nav bg-bone px-11 py-7"
        aria-label="Navigasi utama"
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav aria-label="Portfolio navigation">
          <ul className="flex items-center justify-center p-0 text-sm font-medium text-obsidian">
            {items.map((item) => (
              <li className="flex items-center before:mx-11 before:text-slate-gray before:content-['|'] first:before:hidden" key={item.href}>
                <motion.a
                  className="inline-flex min-h-[34px] items-center justify-center rounded-nav px-11 text-obsidian no-underline transition-colors hover:bg-pure-white"
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