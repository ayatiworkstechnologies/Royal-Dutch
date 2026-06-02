"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const resultSlides = [
  {
    id: 1,
    before: "/images/result-before-1.jpg",
    after: "/images/result-after-1.jpg",
  },
  {
    id: 2,
    before: "/images/result-before-2.jpg",
    after: "/images/result-after-2.jpg",
  },
  {
    id: 3,
    before: "/images/result-before-3.jpg",
    after: "/images/result-after-3.jpg",
  },
];

export default function BeforeAfterCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activeSlide = resultSlides[activeIndex];

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % resultSlides.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) =>
      prev === 0 ? resultSlides.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(timer);
  }, [activeIndex, isPaused]);

  return (
    <section
      className="w-full overflow-hidden bg-[#f8f7f7] px-4 py-14 sm:px-6 lg:px-8 lg:py-20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="mb-3 font-secondary text-[11px] font-medium tracking-[2.5px] text-[#9b2a84]">
              Results
            </p>

            <h2 className="font-primary text-[24px] font-medium uppercase tracking-[6px] text-black sm:text-[28px] md:text-[32px]">
              Visible Transformation
            </h2>

            <p className="mt-4 max-w-4xl font-secondary text-[12px] leading-6 tracking-[1.8px] text-[#8a8a8a] md:text-[13px]">
              Experience noticeable improvements with treatments designed to
              enhance skin health, clarity, and natural radiance over time.
            </p>
          </div>

          {/* Desktop Arrows */}
          <div className="hidden items-center gap-3 md:flex">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous result"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#8b1d72] shadow-[0_8px_25px_rgba(0,0,0,0.10)] transition hover:bg-[#8b1d72] hover:text-white"
            >
              <span className="flex h-full w-full items-center justify-center pb-[3px] text-[30px] leading-none">
                ‹
              </span>
            </button>

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next result"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#8b1d72] shadow-[0_8px_25px_rgba(0,0,0,0.10)] transition hover:bg-[#8b1d72] hover:text-white"
            >
              <span className="flex h-full w-full items-center justify-center pb-[3px] text-[30px] leading-none">
                ›
              </span>
            </button>
          </div>
        </div>

        {/* Carousel Cards */}
        <div className="grid grid-cols-1 gap-7 transition-all duration-500 md:grid-cols-2 lg:gap-10">
          {/* BEFORE */}
          <ResultCard image={activeSlide.before} label="Before" />

          {/* AFTER */}
          <ResultCard image={activeSlide.after} label="After" />
        </div>

        {/* Indicators */}
        <div className="mt-8 flex items-center justify-center gap-3">
          {resultSlides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to result slide ${index + 1}`}
              className={`h-[3px] rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-10 bg-[#8b1d72]"
                  : "w-6 bg-[#d8cbd2]"
              }`}
            />
          ))}
        </div>

        {/* Mobile Arrows */}
        <div className="mt-7 flex justify-center gap-4 md:hidden">
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous result"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#8b1d72] shadow-[0_8px_25px_rgba(0,0,0,0.12)] transition hover:bg-[#8b1d72] hover:text-white"
          >
            <span className="flex h-full w-full items-center justify-center pb-[3px] text-[30px] leading-none">
              ‹
            </span>
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next result"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#8b1d72] shadow-[0_8px_25px_rgba(0,0,0,0.12)] transition hover:bg-[#8b1d72] hover:text-white"
          >
            <span className="flex h-full w-full items-center justify-center pb-[3px] text-[30px] leading-none">
              ›
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

function ResultCard({ image, label }: { image: string; label: string }) {
  return (
    <div className="group rounded-[12px] bg-white p-[6px] shadow-[0_18px_45px_rgba(0,0,0,0.10)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(91,31,70,0.16)]">
      <div className="relative overflow-hidden rounded-[9px] border border-[#c9aeb9] bg-[#f3f0f1]">
        <div className="relative h-[360px] w-full overflow-hidden sm:h-[430px] md:h-[500px] lg:h-[600px]">
          <Image
            src={image}
            alt={`${label} treatment result`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center transition duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/5" />
        </div>

        {/* Bottom Label */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#8b6478]/95 py-4 text-center backdrop-blur-sm">
          <p className="font-primary text-[13px] font-medium uppercase tracking-[7px] text-white">
            {label}
          </p>
        </div>

        {/* Inner border */}
        <div className="pointer-events-none absolute inset-[7px] rounded-[7px] border border-white/70" />
      </div>
    </div>
  );
}