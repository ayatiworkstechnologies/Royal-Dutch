"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const resultSlides = [
  { title: "Acne", before: "/images/result-before-acne.png", after: "/images/result-after-acne.png" },
  { title: "Pigmentation", before: "/images/result-before-pigmentation.png", after: "/images/result-after-pigmentation.png" },
  { title: "Anti-aging", before: "/images/result-before-anti-aging.png", after: "/images/result-after-anti-aging.png" },
  { title: "Cosmetic smile design", before: "/images/result-before-smile-design.png", after: "/images/result-after-smile-design.png" },
];

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function BeforeAfterPremiumCarousel() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const getScrollAmount = useCallback(() => {
    const carousel = scrollRef.current;
    if (!carousel) return 320;
    const card = carousel.querySelector("[data-result-card]") as HTMLElement | null;
    const gap = window.innerWidth >= 768 ? 24 : 16;
    return card ? card.offsetWidth + gap : carousel.clientWidth;
  }, []);

  const scrollNext = useCallback(() => {
    const carousel = scrollRef.current;
    if (!carousel) return;
    const isEnd = carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 8;
    carousel.scrollTo({
      left: isEnd ? 0 : carousel.scrollLeft + getScrollAmount(),
      behavior: "smooth",
    });
  }, [getScrollAmount]);

  const scrollPrev = useCallback(() => {
    const carousel = scrollRef.current;
    if (!carousel) return;
    const isStart = carousel.scrollLeft <= 8;
    carousel.scrollTo({
      left: isStart ? carousel.scrollWidth : carousel.scrollLeft - getScrollAmount(),
      behavior: "smooth",
    });
  }, [getScrollAmount]);

  useEffect(() => {
    if (isPaused || resultSlides.length <= 3) return;
    const timer = window.setInterval(scrollNext, 4200);
    return () => window.clearInterval(timer);
  }, [isPaused, scrollNext]);

  return (
    <section className="w-full overflow-hidden bg-[#fbfaf8] px-5 py-9 sm:px-6 md:px-8 md:py-12 lg:px-10 lg:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="mb-7 flex items-end justify-between gap-6 sm:mb-8 md:mb-10">
          <div className="min-w-0">
            <motion.p
              className="mb-2 font-secondary text-[9px] font-semibold uppercase tracking-[3px] text-[#9b1d78] sm:text-[10px]"
              initial={{ opacity: 0, y: -12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: smoothEase }}
              viewport={{ once: true, amount: 0.3 }}
            >
              Results
            </motion.p>
            <motion.h2
              className="font-primary text-[23px] font-medium uppercase leading-[1.15] tracking-[4px] text-[#161616] sm:text-[27px] md:text-[31px] md:tracking-[5px]"
              initial={{ opacity: 0, x: -35 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: smoothEase }}
              viewport={{ once: true, amount: 0.3 }}
            >
              Visible Transformation
            </motion.h2>
            <motion.p
              className="mt-3 max-w-2xl font-secondary text-[9px] leading-[1.8] tracking-[1.2px] text-[#878281] sm:text-[10px] md:text-[11px]"
              initial={{ opacity: 0, x: 35 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.22, ease: smoothEase }}
              viewport={{ once: true, amount: 0.3 }}
            >
              Experience visible improvements through advanced aesthetic treatments crafted to enhance clarity, texture, and natural skin radiance.
            </motion.p>
          </div>
          <ArrowControls onPrevious={scrollPrev} onNext={scrollNext} desktop />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.28, ease: smoothEase }}
          viewport={{ once: true, amount: 0.18 }}
        >
          <div
            ref={scrollRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:gap-6"
          >
            {resultSlides.map((item) => (
              <BeforeAfterCard
                key={item.title}
                title={item.title}
                beforeImage={item.before}
                afterImage={item.after}
              />
            ))}
          </div>
        </motion.div>

        <ArrowControls onPrevious={scrollPrev} onNext={scrollNext} mobile />
      </div>
    </section>
  );
}

function ArrowControls({
  onPrevious,
  onNext,
  desktop = false,
  mobile = false,
}: {
  onPrevious: () => void;
  onNext: () => void;
  desktop?: boolean;
  mobile?: boolean;
}) {
  return (
    <div className={`${desktop ? "hidden md:flex" : "mt-6 flex md:hidden"} items-center gap-2 ${mobile ? "justify-center" : ""}`}>
      <button
        type="button"
        onClick={onPrevious}
        aria-label="Previous results"
        className="flex h-8 w-8 items-center justify-center rounded-full border border-[#9b1d78]/15 bg-white text-[#9b1d78] shadow-sm transition duration-300 hover:bg-[#9b1d78] hover:text-white"
      >
        <span className="-mt-0.5 text-[17px] leading-none">‹</span>
      </button>
      <button
        type="button"
        onClick={onNext}
        aria-label="Next results"
        className="flex h-8 w-8 items-center justify-center rounded-full border border-[#9b1d78]/15 bg-white text-[#9b1d78] shadow-sm transition duration-300 hover:bg-[#9b1d78] hover:text-white"
      >
        <span className="-mt-0.5 text-[17px] leading-none">›</span>
      </button>
    </div>
  );
}

function BeforeAfterCard({
  title,
  beforeImage,
  afterImage,
}: {
  title: string;
  beforeImage: string;
  afterImage: string;
}) {
  const [position, setPosition] = useState(50);

  return (
    <article
      data-result-card
      className="w-[calc(100vw-40px)] shrink-0 snap-start sm:w-[calc((100%_-_16px)/2)] lg:w-[calc((100%_-_48px)/3)]"
    >
      <div className="overflow-hidden rounded-[10px] bg-white shadow-[0_6px_22px_rgba(35,20,25,0.05)]">
        <div className="group relative aspect-[0.96] overflow-hidden rounded-t-[10px] bg-[#e8ddd2]">
          <img
            src={beforeImage}
            alt={`${title} before treatment`}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
          />
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 0 0 ${position}%)` }}
          >
            <img
              src={afterImage}
              alt={`${title} after treatment`}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
            />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/[0.04] via-transparent to-black/[0.08]" />
          <span className="absolute left-2.5 top-2.5 z-20 rounded-full bg-white/95 px-3 py-1 font-secondary text-[7px] font-bold uppercase tracking-[2px] text-[#9b1d78] shadow-sm sm:left-3 sm:top-3 sm:px-3.5 sm:py-1.5 sm:text-[8px]">
            Before
          </span>
          <span className="absolute right-2.5 top-2.5 z-20 rounded-full bg-white/95 px-3 py-1 font-secondary text-[7px] font-bold uppercase tracking-[2px] text-[#9b1d78] shadow-sm sm:right-3 sm:top-3 sm:px-3.5 sm:py-1.5 sm:text-[8px]">
            After
          </span>
          <div
            className="pointer-events-none absolute inset-y-0 z-20 w-px bg-white shadow-[0_0_3px_rgba(0,0,0,0.15)]"
            style={{ left: `${position}%` }}
          >
            <span className="absolute left-1/2 top-1/2 flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#9b1d78] text-[11px] font-medium text-white shadow-md">
              ↔
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={position}
            onChange={(event) => setPosition(Number(event.target.value))}
            aria-label={`Compare before and after ${title} result`}
            className="absolute inset-0 z-30 h-full w-full cursor-ew-resize opacity-0"
          />
        </div>
        <div className="px-3.5 pb-3.5 pt-2.5 sm:px-4 sm:pb-4 sm:pt-3">
          <h3 className="font-primary text-[8px] font-semibold uppercase tracking-[2px] text-[#242021] sm:text-[9px]">
            {title}
          </h3>
          <p className="mt-1 font-secondary text-[8px] leading-4 tracking-[0.5px] text-[#6f6969] sm:text-[9px]">
            Slide to reveal transformation
          </p>
          <div className="mt-2 h-px w-full bg-[#d9d4d2]">
            <div
              className="h-full bg-[#9b1d78] transition-[width] duration-150"
              style={{ width: `${position}%` }}
            />
          </div>
        </div>
      </div>
    </article>
  );
}

