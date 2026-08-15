import { useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cardClass, eyebrowClass, headingClass, sectionClass } from "./styles";

gsap.registerPlugin(ScrollTrigger);

const aboutFacts = [
  {
    label: "Education",
    value: "Universitas Brawijaya",
    detail: "Teknik Informatika",
    color: "bg-pure-white",
    accent: "bg-bone",
    logo: "assets/photos/UB_Logo.png",
    logoAlt: "Logo Universitas Brawijaya",
  },
  {
    label: "GPA",
    value: "3,61",
    detail: "dari 4,00",
    color: "bg-sticker-yellow",
    accent: "bg-pure-white",
  },
  {
    label: "Mode",
    value: "Build",
    detail: "Laravel + React",
    color: "bg-cotton-pink",
    accent: "bg-powder-blue",
  },
];

const coloredCardClass = cardClass.replace(" bg-pure-white", "");

const focusItems = [
  "Payroll & HRD",
  "Patient Registration",
  "Doctor Reports",
  "User Support",
];

export default function AboutSection({ about }) {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const shouldReduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (shouldReduceMotion) {
      return undefined;
    }

    const context = gsap.context(() => {
      const introItems = gsap.utils.toArray("[data-about-intro]");
      const cards = gsap.utils.toArray("[data-about-card]");
      const cardContents = gsap.utils.toArray("[data-about-card-content]");
      const accents = gsap.utils.toArray("[data-about-accent]");
      const chips = gsap.utils.toArray("[data-about-chip]");

      gsap.set(introItems, { autoAlpha: 0, y: 42 });
      gsap.set(cards, {
        autoAlpha: 0,
        y: 90,
        rotateX: 8,
        rotateZ: -2.5,
        scale: 0.92,
        transformOrigin: "50% 100%",
        filter: "blur(10px)",
      });
      gsap.set(cardContents, { autoAlpha: 0, y: 20 });
      gsap.set(accents, { autoAlpha: 0, scale: 0.7, rotate: -10 });
      gsap.set(chips, { autoAlpha: 0, y: 18, scale: 0.9 });

      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          end: "bottom 35%",
          toggleActions: "play none none reverse",
        },
      });

      timeline
        .to(introItems, { autoAlpha: 1, y: 0, duration: 0.85, stagger: 0.12 })
        .to(
          cards,
          {
            autoAlpha: 1,
            y: 0,
            rotateX: 0,
            rotateZ: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.95,
            stagger: 0.12,
          },
          "-=0.35",
        )
        .to(
          cardContents,
          { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.045 },
          "-=0.55",
        )
        .to(
          accents,
          {
            autoAlpha: 1,
            scale: 1,
            rotate: 0,
            duration: 0.55,
            ease: "back.out(1.9)",
            stagger: 0.06,
          },
          "-=0.45",
        )
        .to(
          chips,
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.06 },
          "-=0.35",
        );

      gsap.to("[data-about-float]", {
        yPercent: -10,
        rotate: 1.4,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section className={sectionClass} id="tentang" ref={sectionRef}>
      <div className="mb-35 grid grid-cols-1 items-end gap-26 lg:grid-cols-[1fr_420px]">
        <div data-about-intro>
          <p className={eyebrowClass}>{about.eyebrow}</p>
          <h2 className={headingClass}>{about.title}</h2>
        </div>
        <p
          className="mb-0 text-body-lg leading-[1.5] text-ash-gray"
          data-about-intro
        >
          Saya senang membuat aplikasi web yang terasa dekat dengan cara orang
          bekerja sehari-hari.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-18 lg:grid-cols-12">
        <motion.article
          className={`${coloredCardClass} bg-powder-blue p-26 lg:col-span-5`}
          data-about-card
          data-about-float
          whileHover={{ y: -6, rotate: -0.4 }}
        >
          <span
            className="mb-18 inline-flex rounded-nav border border-carbon bg-pure-white px-13 py-7 text-caption uppercase tracking-[0.13em] text-ash-gray"
            data-about-card-content
          >
            Practical Developer
          </span>
          <p
            className="mb-0 text-[clamp(25px,3.6vw,53px)] font-semibold leading-[1.02] tracking-[-0.04em] text-carbon"
            data-about-card-content
          >
            Mulai dari ngobrol kebutuhan, lalu pelan-pelan jadi fitur yang
            benar-benar dipakai.
          </p>
        </motion.article>

        <motion.article
          className={`${cardClass} p-26 lg:col-span-4`}
          data-about-card
          whileHover={{ y: -6, rotate: 0.35 }}
        >
          <p
            className="mb-18 text-body-lg leading-[1.5] text-ash-gray"
            data-about-card-content
          >
            {about.paragraphs[0]}
          </p>
          <p
            className="mb-0 text-body-lg leading-[1.5] text-ash-gray"
            data-about-card-content
          >
            {about.paragraphs[1]}
          </p>
        </motion.article>

        <div className="grid grid-cols-1 gap-18 sm:grid-cols-3 lg:col-span-3 lg:grid-cols-1">
          {aboutFacts.map((fact) => (
            <motion.article
              className={`${coloredCardClass} ${fact.color} p-18 transition-colors`}
              key={fact.label}
              data-about-card
              whileHover={{ y: -5, rotate: 0.5 }}
            >
              <div className="flex items-start justify-between gap-10">
                <span
                  className="text-caption uppercase tracking-[0.13em] text-ash-gray"
                  data-about-card-content
                >
                  {fact.label}
                </span>
                {fact.logo ? (
                  <span
                    className={`flex h-70 w-70 shrink-0 items-center justify-center rounded-[18px] border border-carbon ${fact.accent} p-7 shadow-[3px_3px_0_0_var(--carbon)]`}
                    data-about-accent
                  >
                    <img
                      className="h-full w-full object-contain"
                      src={fact.logo}
                      alt={fact.logoAlt}
                      loading="lazy"
                    />
                  </span>
                ) : (
                  <span
                    className={`h-26 w-26 shrink-0 rounded-full border border-carbon ${fact.accent} shadow-[2px_2px_0_0_var(--carbon)]`}
                    data-about-accent
                  />
                )}
              </div>
              <strong
                className="mt-7 block text-[clamp(25px,3vw,42px)] font-semibold leading-[0.95] tracking-[-0.04em] text-carbon"
                data-about-card-content
              >
                {fact.value}
              </strong>
              <p
                className="mb-0 mt-4 text-sm leading-[1.4] text-carbon"
                data-about-card-content
              >
                {fact.detail}
              </p>
            </motion.article>
          ))}
        </div>

        <motion.article
          className={`${coloredCardClass} bg-acid-lime p-18 lg:col-span-12`}
          data-about-card
          whileHover={{ y: -5, rotate: -0.2 }}
        >
          <div className="flex flex-col gap-13 lg:flex-row lg:items-center lg:justify-between">
            <span
              className="text-caption uppercase tracking-[0.13em] text-ash-gray"
              data-about-card-content
            >
              Built Around
            </span>
            <div className="flex flex-wrap gap-9 lg:justify-end">
              {focusItems.map((item) => (
                <span
                  className="inline-flex rounded-buttons border border-carbon bg-pure-white px-13 py-7 text-sm font-medium text-carbon shadow-[2px_2px_0_0_var(--carbon)]"
                  data-about-chip
                  key={item}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
