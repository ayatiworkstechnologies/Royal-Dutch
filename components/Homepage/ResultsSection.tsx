"use client";

import { useEffect, useRef, useState } from "react";

const resultSlides = [
  {
    title: "Skin Clarity",
    before: "/images/result-before-1.jpg",
    after: "/images/result-after-1.jpg",
  },
  {
    title: "Facial Glow",
    before: "/images/result-before-1.jpg",
    after: "/images/result-after-1.jpg",
  },
  {
    title: "Tone Balance",
    before: "/images/result-before-1.jpg",
    after: "/images/result-after-1.jpg",
  },
  {
    title: "Texture Renewal",
    before: "/images/result-before-1.jpg",
    after: "/images/result-after-1.jpg",
  },
  {
    title: "Radiance Boost",
    before: "/images/result-before-1.jpg",
    after: "/images/result-after-1.jpg",
  },
  {
    title: "Visible Results",
    before: "/images/result-before-1.jpg",
    after: "/images/result-after-1.jpg",
  },
];

export default function BeforeAfterPremiumCarousel() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const getScrollAmount = () => {
    const el = scrollRef.current;
    if (!el) return 320;

    const card = el.querySelector("[data-result-card]") as HTMLElement | null;
    return card ? card.offsetWidth + 28 : el.clientWidth;
  };

  const scrollNext = () => {
    const el = scrollRef.current;
    if (!el) return;

    const isEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 30;

    if (isEnd) {
      el.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      el.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
    }
  };

  const scrollPrev = () => {
    const el = scrollRef.current;
    if (!el) return;

    el.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
  };

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      scrollNext();
    }, 3500);

    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section className="relative w-full overflow-hidden bg-[#fbfaf8] px-4 py-8 md:px-6 md:py-10 lg:px-8 lg:py-12">
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-10 flex items-end justify-between gap-8">
          <div>
            <p className="mb-3 font-secondary text-[10px] font-semibold uppercase tracking-[3px] text-[#8b1d72]">
              Results
            </p>

            <h2 className="font-primary text-[24px] font-medium uppercase leading-[1.35] tracking-[6px] text-black md:text-[32px]">
              Visible Transformation
            </h2>

            <p className="mt-4 max-w-4xl font-secondary text-[12px] leading-6 tracking-[1.6px] text-[#858585] md:text-[13px]">
              Experience visible improvements through advanced aesthetic
              treatments crafted to enhance clarity, texture, and natural skin
              radiance.
            </p>
          </div>

          {/* Desktop / Tablet Arrows */}
          <div className="hidden items-center gap-3 md:flex">
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Previous results"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#8b1d72]/15 bg-white text-[#8b1d72] transition hover:bg-[#8b1d72] hover:text-white"
            >
              <span className="flex h-full w-full items-center justify-center pb-[3px] text-[30px] leading-none">
                ‹
              </span>
            </button>

            <button
              type="button"
              onClick={scrollNext}
              aria-label="Next results"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#8b1d72]/15 bg-white text-[#8b1d72] transition hover:bg-[#8b1d72] hover:text-white"
            >
              <span className="flex h-full w-full items-center justify-center pb-[3px] text-[30px] leading-none">
                ›
              </span>
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-8 md:gap-7 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {resultSlides.map((item, index) => (
            <BeforeAfterCard
              key={index}
              title={item.title}
              beforeImage={item.before}
              afterImage={item.after}
            />
          ))}
        </div>

        {/* Mobile Arrows */}
        <div className="mt-2 flex justify-center gap-4 md:hidden">
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Previous results"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#8b1d72]/15 bg-white text-[#8b1d72] transition hover:bg-[#8b1d72] hover:text-white"
          >
            <span className="flex h-full w-full items-center justify-center pb-[3px] text-[31px] leading-none">
              ‹
            </span>
          </button>

          <button
            type="button"
            onClick={scrollNext}
            aria-label="Next results"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#8b1d72]/15 bg-white text-[#8b1d72] transition hover:bg-[#8b1d72] hover:text-white"
          >
            <span className="flex h-full w-full items-center justify-center pb-[3px] text-[31px] leading-none">
              ›
            </span>
          </button>
        </div>
      </div>
    </section>
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
  /*
    100 = full BEFORE image
    0   = full AFTER image
    65  = split view
  */
  const [position, setPosition] = useState(65);

  const beforeLabelVisible = position > 12;
  const afterLabelVisible = position < 88;

  return (
    <article
      data-result-card
      className="snap-start shrink-0 basis-full md:basis-[calc((100%-28px)/2)] lg:basis-[calc((100%-56px)/3)]"
    >
      <div className="relative overflow-hidden rounded-[22px] border border-[#eadde4] bg-white p-[7px]">
        <div className="group relative h-[430px] overflow-hidden rounded-[17px] border border-[#d4bdc8] bg-white sm:h-[480px] md:h-[530px]">
          {/* Image Area */}
          <div className="absolute inset-x-0 top-0 bottom-[118px] overflow-hidden">
            {/* BEFORE image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage: `url("${beforeImage}")`,
              }}
            />

            {/* AFTER image - reveals from right side */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage: `url("${afterImage}")`,
                clipPath: `inset(0 0 0 ${position}%)`,
              }}
            />

            {/* Soft overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/10" />

            {/* BEFORE Label - left top */}
            <div
              className={`absolute left-5 top-5 z-20 rounded-full border border-white/60 bg-white/90 px-6 py-2 font-secondary text-[10px] font-bold uppercase tracking-[3px] text-[#8b1d72] transition-all duration-500 ${
                beforeLabelVisible
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-2 opacity-0"
              }`}
            >
              Before
            </div>

            {/* AFTER Label - right top */}
            <div
              className={`absolute right-5 top-5 z-20 rounded-full border border-white/60 bg-white/90 px-6 py-2 font-secondary text-[10px] font-bold uppercase tracking-[3px] text-[#8b1d72] transition-all duration-500 ${
                afterLabelVisible
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-2 opacity-0"
              }`}
            >
              After
            </div>

            {/* Divider Line */}
            <div
              className="absolute top-0 z-20 h-full w-[2px] bg-white"
              style={{ left: `${position}%` }}
            >
              <span className="absolute left-1/2 top-0 h-full w-[1px] -translate-x-1/2 bg-[#d6b981]/80" />
            </div>

            {/* Drag Handle */}
            <div
              className="absolute top-1/2 z-30 flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-[#8b1d72] text-white"
              style={{
                left: `clamp(28px, ${position}%, calc(100% - 28px))`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <span className="text-[20px] leading-none">↔</span>
            </div>

            {/* Range Input */}
            <input
              type="range"
              min="0"
              max="100"
              value={position}
              onChange={(e) => setPosition(Number(e.target.value))}
              aria-label="Before and after comparison slider"
              className="absolute inset-0 z-40 h-full w-full cursor-ew-resize opacity-0"
            />
          </div>

          {/* Bottom Content */}
          <div className="absolute bottom-0 left-0 right-0 z-20 h-[118px] bg-[#8b1d72] px-5 py-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="font-primary text-[14px] uppercase tracking-[3px] text-white">
                  {title}
                </h3>

                <p className="mt-2 font-secondary text-[12px] tracking-[1px] text-white/85">
                  Slide to reveal transformation
                </p>
              </div>

              <div className="hidden h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full border border-[#d6b981]/70 text-[#d6b981] sm:flex">
                ✦
              </div>
            </div>

            <div className="mt-4 h-[3px] overflow-hidden rounded-full bg-white/25">
              <div
                className="h-full rounded-full bg-[#d6b981] transition-all duration-150"
                style={{ width: `${100 - position}%` }}
              />
            </div>
          </div>

          {/* Inner Border */}
          <div className="pointer-events-none absolute inset-[8px] rounded-[14px] border border-white/65" />
        </div>
      </div>
    </article>
  );
}