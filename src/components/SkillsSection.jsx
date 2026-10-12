import { motion } from 'framer-motion';
import { cardIn, fadeUp, staggerGroup } from './motionConfig';
import { cardClass, headingClass, sectionClass } from './styles';

const cardColorClass = {
  'Back-End': 'bg-acid-lime',
  'Front-End': 'bg-sticker-yellow',
  'DevOps & Infra': 'bg-powder-blue',
  Support: 'bg-cotton-pink',
};

const compactNotes = {
  'Back-End': 'API, database, dan logic sistem.',
  'Front-End': 'UI responsif dan interaksi web.',
  'DevOps & Infra': 'Server, deployment, dan network infra.',
  Support: 'Support user dan troubleshooting.',
};

const skillIcons = {
  'Back-End': (
    <svg className="h-full w-full" viewBox="0 0 640 640" aria-hidden="true">
      <path
        d="M381.8 82.7C395 82.7 380.4 80.5 544.6 139.7C545.3 140.1 545.7 140.1 546.4 140.5C564 147.8 576 165 576 184.7L576 451.7C576 471.4 563.9 488.6 546.4 495.9C546 495.9 545.3 496.3 543.5 497L399 548.6C393.5 550.8 387.7 551.9 381.8 551.9C365 551.9 350 543.1 341.6 529.9C341.1 529.4 335.4 519.6 331.4 513.8C330.3 512.3 329.6 510.9 328.5 509.4L156.5 219.5C145.9 201.2 128 189.8 108.2 186.9L200.4 141.9L200.8 141.5C207 138.6 214.3 136.7 221.6 136.7C237.7 136.7 251.9 144.7 260.7 156.8L260.7 157.2L429.7 395.3L429.7 229.3L393.1 280.9L308.2 161.3L340 106.4C340.7 105.7 341.1 105 341.4 104.6C349.8 91.4 364.8 82.7 381.6 82.7zM264.8 473.6L260.8 479.1L260.8 479.4C252 491.5 237.8 499.5 221.7 499.5C214.4 499.5 207.1 497.7 200.9 494.8L200.5 494.4L107.6 449.4C127.7 446.5 145.6 435.5 156.6 416.8L173.8 388.3L194.3 353.9L264.9 473.5zM88.1 223.1C99.8 220.2 115.9 222.4 125 238.1L172.9 318.2L125 398.3C118.1 410.4 107.5 414.8 97.6 414.8C94.3 414.8 91 414.1 88.1 413.3C76.4 410 64 400.1 64 381.5L64 254.9C64 236.3 76.4 226.4 88.1 223.1z"
        fill="currentColor"
      />
    </svg>
  ),
  'Front-End': (
    <svg className="h-full w-full" viewBox="0 0 120 120" aria-hidden="true">
      <path d="M48 34 22 60l26 26" fill="none" stroke="currentColor" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M72 34 98 60 72 86" fill="none" stroke="currentColor" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M66 24 54 96" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
    </svg>
  ),
  'DevOps & Infra': (
    <svg className="h-full w-full" viewBox="0 0 640 640" aria-hidden="true">
      <path
        d="M112 256C112 167.6 183.6 96 272 96C319.1 96 361.4 116.4 390.7 148.7C401.3 145.6 412.5 144 424 144C490.3 144 544 197.7 544 264C544 277.2 541.9 289.9 537.9 301.8C579.5 322.9 608 366.1 608 416C608 486.7 550.7 544 480 544L176 544C96.5 544 32 479.5 32 400C32 343.2 64.9 294.1 112.7 270.6C112.3 265.8 112 260.9 112 256zM272 144C210.1 144 160 194.1 160 256C160 264.4 160.9 272.6 162.7 280.5C165.4 292.6 158.4 304.8 146.6 308.6C107.9 321 80 357.3 80 400C80 453 123 496 176 496L480 496C524.2 496 560 460.2 560 416C560 378.6 534.3 347.1 499.5 338.4C492 336.5 485.9 331.2 483 324.1C480.1 317 480.9 308.9 485 302.4C492 291.3 496 278.2 496 264.1C496 224.3 463.8 192.1 424 192.1C412.9 192.1 402.5 194.6 393.2 199C382.7 204 370.1 200.7 363.4 191.2C343.1 162.6 309.7 144.1 272.1 144.1z"
        fill="currentColor"
      />
    </svg>
  ),
  Support: (
    <svg className="h-full w-full" viewBox="0 0 640 640" aria-hidden="true">
      <path
        d="M102.8 57.3C108.2 51.9 116.6 51.1 123 55.3L241.9 134.5C250.8 140.4 256.1 150.4 256.1 161.1L256.1 210.7L346.9 301.5C380.2 286.5 420.8 292.6 448.1 320L574.2 446.1C592.9 464.8 592.9 495.2 574.2 514L514.1 574.1C495.4 592.8 465 592.8 446.2 574.1L320.1 448C292.7 420.6 286.6 380.1 301.6 346.8L210.8 256L161.2 256C150.5 256 140.5 250.7 134.6 241.8L55.4 122.9C51.2 116.6 52 108.1 57.4 102.7L102.8 57.3zM247.8 360.8C241.5 397.7 250.1 436.7 274 468L179.1 563C151 591.1 105.4 591.1 77.3 563C49.2 534.9 49.2 489.3 77.3 461.2L212.7 325.7L247.9 360.8zM416.1 64C436.2 64 455.5 67.7 473.2 74.5C483.2 78.3 485 91 477.5 98.6L420.8 155.3C417.8 158.3 416.1 162.4 416.1 166.6L416.1 208C416.1 216.8 423.3 224 432.1 224L473.5 224C477.7 224 481.8 222.3 484.8 219.3L541.5 162.6C549.1 155.1 561.8 156.9 565.6 166.9C572.4 184.6 576.1 203.9 576.1 224C576.1 267.2 558.9 306.3 531.1 335.1L482 286C448.9 253 403.5 240.3 360.9 247.6L304.1 190.8L304.1 161.1L303.9 156.1C303.1 143.7 299.5 131.8 293.4 121.2C322.8 86.2 366.8 64 416.1 63.9z"
        fill="currentColor"
      />
    </svg>
  ),
};

function normalizeLevel(level) {
  return Math.min(Math.max(level ?? 0, 0), 10);
}

export default function SkillsSection({ intro, skills }) {
  return (
    <motion.section
      className={`${sectionClass} py-[clamp(48px,7vw,92px)]`}
      id="keahlian"
      variants={staggerGroup}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      <motion.div
        className="mb-22 grid grid-cols-1 gap-13 lg:grid-cols-[minmax(0,620px)_minmax(260px,390px)] lg:items-end lg:justify-between"
        variants={fadeUp}
      >
        <div>
          <p className="mb-11 text-caption font-medium uppercase tracking-[0.13em] text-carbon/70">
            {intro.eyebrow}
          </p>
          <h2 className={`${headingClass} max-w-[620px]`}>
            {intro.title}
          </h2>
        </div>
        <p className="mb-0 text-sm leading-[1.5] text-carbon/70 sm:text-body-lg">
          {intro.description}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 sm:gap-13">
          {skills.map((group) => {
            const level = normalizeLevel(group.level);
            const cardColor = cardColorClass[group.title] ?? 'bg-bone';

            return (
              <motion.article
                className={`${cardClass} group relative grid min-h-[178px] grid-cols-1 gap-14 overflow-hidden p-16 transition-transform sm:grid-cols-[150px_1fr] sm:gap-18 sm:p-22 ${cardColor}`}
                key={group.title}
                variants={cardIn}
                whileHover={{ y: -5, rotate: -0.35 }}
              >
                <div className="pointer-events-none absolute -right-31 -top-26 flex h-[220px] w-[220px] items-center justify-center text-carbon opacity-[0.16] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 sm:-right-42 sm:-top-35 sm:h-[290px] sm:w-[290px]">
                  {skillIcons[group.title]}
                </div>
                <div className="pointer-events-none absolute -bottom-26 right-16 h-105 w-105 rounded-full border border-carbon/15 bg-pure-white/25" />
                <div className="relative z-[1] flex flex-col justify-between gap-18">
                  <div>
                    <span className="mb-9 block h-11 w-42 rounded-buttons border border-carbon bg-pure-white" />
                    <h3 className="text-[clamp(28px,5vw,42px)] font-semibold leading-[0.92] tracking-[-0.04em]">
                      {group.title}
                    </h3>
                    <p className="mt-7 mb-0 text-sm leading-[1.35] text-carbon/70">
                      {compactNotes[group.title]}
                    </p>
                  </div>
                  <strong className="text-[35px] font-semibold leading-none tracking-[-0.04em]">
                    {level}<span className="text-[18px] text-carbon/70">/10</span>
                  </strong>
                </div>

                <div className="relative z-[1] flex min-w-0 flex-col justify-between gap-14">
                  <div className="h-13 overflow-hidden rounded-buttons border border-carbon bg-pure-white p-4">
                    <div
                      className="h-full rounded-buttons border border-carbon bg-carbon"
                      style={{ width: `${level * 10}%` }}
                    />
                  </div>

                  <div className="flex flex-wrap gap-5">
                    {group.items.map((item) => (
                      <span
                        className="inline-flex min-h-[28px] items-center rounded-tags border border-carbon bg-pure-white/85 px-9 text-[12px] font-medium leading-none text-carbon transition-transform group-hover:-translate-y-0.5"
                        key={item}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
      </div>
    </motion.section>
  );
}
