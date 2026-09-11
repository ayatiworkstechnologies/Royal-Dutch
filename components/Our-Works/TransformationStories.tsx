"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

type TransformationItem = {
  id: number;
  title: string;
  subtitle: string;
  beforeImage: string;
  afterImage: string;
};

type TransformationStoriesProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  items?: TransformationItem[];
};

const defaultTransformations: TransformationItem[] = [
  {
    id: 1,
    title: "Hydra Facial",
    subtitle: "Slide to reveal transformation",
    beforeImage: "/images/result-before-hydrafacial.png",
    afterImage: "/images/result-after-hydrafacial.png",
  },
  {
    id: 2,
    title: "Acne Control Facial",
    subtitle: "Slide to reveal transformation",
    beforeImage: "/images/result-before-acne-control-facial.png",
    afterImage: "/images/result-after-acne-control-facial.png",
  },
  {
    id: 3,
    title: "EXOSOME DERMAPEN",
    subtitle: "Slide to reveal transformation",
    beforeImage: "/images/result-before-exosome-dermapen.png",
    afterImage: "/images/result-after-exosome-dermapen.png",
  },
  {
    id: 4,
    title: "PEELING PEARL FACIAL",
    subtitle: "Slide to reveal transformation",
    beforeImage: "/images/result-before-peeling-pearl-facial.png",
    afterImage: "/images/result-after-peeling-pearl-facial.png",
  },
  {
    id: 5,
    title: "GLOWING DERMAPEN",
    subtitle: "Slide to reveal transformation",
    beforeImage: "/images/result-before-glowing-dermapen.png",
    afterImage: "/images/result-after-glowing-dermapen.png",
  },
  {
    id: 6,
    title: "VITAMIN C HYDRAFACIAL",
    subtitle: "Slide to reveal transformation",
    beforeImage: "/images/result-before-vitamin-c-hydrafacial.png",
    afterImage: "/images/result-after-vitamin-c-hydrafacial.png",
  },
  {
    id: 7,
    title: "CHEMICAL PEEL WITH BRIGHTENING SERUM",
    subtitle: "Slide to reveal transformation",
    beforeImage: "/images/result-before-chemical-peel.png",
    afterImage: "/images/result-after-chemical-peel.png",
  },
  {
    id: 8,
    title: "ROYAL DUTCH FACIAL",
    subtitle: "Slide to reveal transformation",
    beforeImage: "/images/result-before-royal-dutch-facial.png",
    afterImage: "/images/result-after-royal-dutch-facial.png",
  },
];

const smoothEase: [number, number, number, number] = [
  0.16, 1, 0.3, 1,
];

export default function TransformationStories({
  eyebrow = "Our Works",
  title = "Transformation Stories",
  description = "Witness the remarkable outcomes achieved through expert care and personalized treatment plans. Explore real before-and-after results that showcase our commitment to excellence and patient satisfaction.",
  items = defaultTransformations,
}: TransformationStoriesProps) {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)");

    const updateScreenSize = () => {
      setIsSmallScreen(mediaQuery.matches);
    };

    updateScreenSize();
    mediaQuery.addEventListener("change", updateScreenSize);

    return () => {
      mediaQuery.removeEventListener("change", updateScreenSize);
    };
  }, []);

  const getScrollAmount = useCallback(() => {
    const carousel = carouselRef.current;

    if (!carousel) {
      return 320;
    }

    const card = carousel.querySelector(
      "[data-transformation-card]"
    ) as HTMLElement | null;

    const gap = window.innerWidth >= 768 ? 24 : 16;

    return card ? card.offsetWidth + gap : carousel.clientWidth;
  }, []);

  const scrollNext = useCallback(() => {
    const carousel = carouselRef.current;

    if (!carousel) return;

    const isAtEnd =
      carousel.scrollLeft + carousel.clientWidth >=
      carousel.scrollWidth - 8;

    carousel.scrollTo({
      left: isAtEnd
        ? 0
        : carousel.scrollLeft + getScrollAmount(),
      behavior: "smooth",
    });
  }, [getScrollAmount]);

  const scrollPrevious = useCallback(() => {
    const carousel = carouselRef.current;

    if (!carousel) return;

    const isAtStart = carousel.scrollLeft <= 8;
    const lastScrollPosition =
      carousel.scrollWidth - carousel.clientWidth;

    carousel.scrollTo({
      left: isAtStart
        ? lastScrollPosition
        : carousel.scrollLeft - getScrollAmount(),
      behavior: "smooth",
    });
  }, [getScrollAmount]);

  useEffect(() => {
    if (!isSmallScreen || isPaused || items.length <= 1) return;

    const timer = window.setInterval(() => {
      scrollNext();
    }, 4200);

    return () => window.clearInterval(timer);
  }, [isPaused, isSmallScreen, items.length, scrollNext]);

  return (
    <section className="relative w-full overflow-hidden bg-[#fbfaf8] px-5 py-10 sm:px-6 md:px-8 md:py-12 lg:px-10 lg:py-14">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <motion.div
          className="mb-7 flex items-end justify-between gap-6 sm:mb-8 md:mb-10"
          initial={{
            opacity: 0,
            y: 25,
            filter: "blur(8px)",
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 1,
            ease: smoothEase,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
        >
          <div className="min-w-0">
            <p className="mb-2 font-secondary text-[9px] font-semibold uppercase tracking-[3px] text-[#b657a2] sm:text-[10px]">
              {eyebrow}
            </p>

            <h2 className="font-primary text-[23px] font-medium uppercase leading-[1.15] tracking-[4px] text-[#171717] sm:text-[27px] md:text-[31px] md:tracking-[5px]">
              {title}
            </h2>

            <p className="mt-3 max-w-2xl font-secondary text-[9px] leading-[1.8] tracking-[1.2px] text-[#878281] sm:text-[10px] md:text-[11px]">
              {description}
            </p>
          </div>

          {/* Desktop arrows */}
          <div className="hidden items-center gap-2 md:flex lg:hidden">
            <CarouselButton
              direction="previous"
              onClick={scrollPrevious}
            />

            <CarouselButton
              direction="next"
              onClick={scrollNext}
            />
          </div>
        </motion.div>

        {/* Transformation carousel */}
        <motion.div
          initial={{
            opacity: 0,
            y: 35,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            delay: 0.2,
            ease: smoothEase,
          }}
          viewport={{
            once: true,
            amount: 0.18,
          }}
        >
          <div
            ref={carouselRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
            className="mx-auto flex max-w-[1020px] snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:gap-6 lg:grid lg:grid-cols-4 lg:gap-x-8 lg:gap-y-9 lg:overflow-visible"
          >
            {items.map((item, index) => (
              <TransformationCard
                key={item.id}
                item={item}
                index={index}
              />
            ))}
          </div>
        </motion.div>

        {/* Mobile arrows */}
        <div className="mt-6 flex justify-center gap-2 md:hidden">
          <CarouselButton
            direction="previous"
            onClick={scrollPrevious}
          />

          <CarouselButton
            direction="next"
            onClick={scrollNext}
          />
        </div>
      </div>
    </section>
  );
}

function CarouselButton({
  direction,
  onClick,
}: {
  direction: "previous" | "next";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={
        direction === "previous"
          ? "Previous transformation"
          : "Next transformation"
      }
      className="flex h-8 w-8 items-center justify-center rounded-full border border-[#b657a2]/20 bg-white text-[#b657a2] shadow-sm transition-all duration-300 hover:bg-[#8b1d72] hover:text-white"
    >
      <span className="-mt-0.5 text-[18px] leading-none">
        {direction === "previous" ? "‹" : "›"}
      </span>
    </button>
  );
}

function TransformationCard({
  item,
  index,
}: {
  item: TransformationItem;
  index: number;
}) {
  const [position, setPosition] = useState(80);

  const showBeforeLabel = position > 12;
  const showAfterLabel = position < 88;

  return (
    <motion.article
      data-transformation-card
      initial={{
        opacity: 0,
        y: 35,
        scale: 0.97,
        filter: "blur(7px)",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      }}
      transition={{
        duration: 0.8,
        delay: (index % 3) * 0.08,
        ease: smoothEase,
      }}
      viewport={{
        once: true,
        amount: 0.18,
      }}
      className="w-[calc(100vw-40px)] shrink-0 snap-start sm:w-[calc((100%_-_16px)/2)] lg:w-full"
    >
      <div className="overflow-hidden rounded-[10px] bg-white shadow-[0_6px_24px_rgba(35,20,25,0.06)] transition-all duration-500 hover:-translate-y-1">
        {/* Image area */}
        <div className="group relative aspect-[0.96] overflow-hidden rounded-t-[10px] bg-[#f2e8ed]">
          {/* Before image */}
          <Image
            src={item.beforeImage}
            alt={`${item.title} before`}
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 31vw"
            className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.025]"
          />

          {/* After image */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              clipPath: `inset(0 0 0 ${position}%)`,
            }}
          >
            <Image
              src={item.afterImage}
              alt={`${item.title} after`}
              fill
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 31vw"
              className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.025]"
            />
          </div>

          {/* Image overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/[0.04] via-transparent to-black/[0.08]" />

          {/* Before label */}
          <div
            className={`pointer-events-none absolute left-2.5 top-2.5 z-20 rounded-full bg-white/95 px-3 py-1 font-secondary text-[7px] font-bold uppercase tracking-[2px] text-[#b657a2] shadow-sm transition-all duration-300 sm:left-3 sm:top-3 sm:px-3.5 sm:py-1.5 sm:text-[8px] ${
              showBeforeLabel
                ? "translate-y-0 opacity-100"
                : "-translate-y-1 opacity-0"
            }`}
          >
            Before
          </div>

          {/* After label */}
          <div
            className={`pointer-events-none absolute right-2.5 top-2.5 z-20 rounded-full bg-white/95 px-3 py-1 font-secondary text-[7px] font-bold uppercase tracking-[2px] text-[#b657a2] shadow-sm transition-all duration-300 sm:right-3 sm:top-3 sm:px-3.5 sm:py-1.5 sm:text-[8px] ${
              showAfterLabel
                ? "translate-y-0 opacity-100"
                : "-translate-y-1 opacity-0"
            }`}
          >
            After
          </div>

          {/* Divider */}
          <div
            className="pointer-events-none absolute inset-y-0 z-20 w-px bg-white shadow-[0_0_3px_rgba(0,0,0,0.16)]"
            style={{
              left: `${position}%`,
            }}
          >
            <span className="absolute left-1/2 top-1/2 flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#8b1d72] text-[11px] font-medium text-white shadow-md transition-all duration-300 group-hover:scale-110">
              ↔
            </span>
          </div>

          {/* Functional slider */}
          <input
            type="range"
            min="5"
            max="95"
            value={position}
            onChange={(event) =>
              setPosition(Number(event.target.value))
            }
            aria-label={`${item.title} before and after slider`}
            className="absolute inset-0 z-40 h-full w-full cursor-ew-resize opacity-0"
          />
        </div>

        {/* Bottom information panel */}
        <div className="px-3.5 pb-3.5 pt-2.5 sm:px-4 sm:pb-4 sm:pt-3">
          <h3 className="font-primary text-[8px] font-semibold uppercase tracking-[2px] text-[#242021] sm:text-[9px]">
            {item.title}
          </h3>

          <p className="mt-1 font-secondary text-[8px] leading-4 tracking-[0.5px] text-[#6f6969] sm:text-[9px]">
            {item.subtitle}
          </p>

          {/* Progress line */}
          <div className="mt-2 h-px w-full bg-[#d9d4d2]">
            <div
              className="h-full bg-[#8b1d72] transition-[width] duration-150"
              style={{
                width: `${position}%`,
              }}
            />
          </div>
        </div>
      </div>
    </motion.article> 
  );
}
