"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  {
    number: "01",
    title: "Laser Rejuvenation",
    description:
      "A non-invasive treatment that revitalizes the skin by stimulating collagen production and improving texture. It helps reduce fine lines, pigmentation, and dullness for a smoother, youthful glow.",
    bgImage: "/images/treatment-bg-1.jpg",
  },
  {
    number: "02",
    title: "Hydrafacial",
    description:
      "A deep-cleansing and hydrating treatment that refreshes the skin, removes impurities, and improves glow with gentle, effective care.",
    bgImage: "/images/treatment-bg-1.jpg",
  },
  {
    number: "03",
    title: "Chemical Peeling",
    description:
      "A clinical skin renewal treatment that improves pigmentation, acne marks, dullness, uneven tone, and rough skin texture.",
    bgImage: "/images/treatment-bg-1.jpg",
  },
];

export default function TreatmentCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activeSlide = slides[activeIndex];

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 2500);

    return () => clearInterval(timer);
  }, [activeIndex, isPaused]);

  return (
    <section
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Desktop / Laptop Background Image */}
      <div className="absolute inset-0 hidden lg:block">
        <Image
          key={activeSlide.bgImage}
          src={activeSlide.bgImage}
          alt={activeSlide.title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center transition-all duration-700"
        />
        <div className="absolute inset-0 bg-black/5" />
      </div>

      {/* Desktop / Laptop Layout */}
      <div className="relative z-10 hidden min-h-[450px] xl:min-h-[600px] items-center justify-center px-5 py-10 lg:flex">
        <div className="relative w-full max-w-[1120px]">
          {/* Main Card */}
          <div className="mx-auto grid w-full max-w-[780px] overflow-hidden rounded-[5px] border-[6px] border-white shadow-[0_15px_45px_rgba(0,0,0,0.16)] md:grid-cols-[185px_1fr]">
            {/* Left Content */}
            <div className="relative z-10 flex min-h-[285px] flex-col justify-center bg-white px-5 py-7">
              <h3 className="font-primary text-[62px] font-semibold leading-none text-[#8b1d72]">
                {activeSlide.number}
              </h3>

              <h4 className="mt-7 max-w-[140px] font-primary text-[13px] font-semibold uppercase leading-[1.4] tracking-[3.5px] text-black">
                {activeSlide.title}
              </h4>

              <p className="mt-5 max-w-[155px] font-secondary text-[10px] font-medium leading-[1.45] tracking-[1px] text-[#9a9a9a]">
                {activeSlide.description}
              </p>

              {/* Indicators */}
              <div className="mt-7 flex items-center gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    className={`h-[2px] transition-all duration-300 ${
                      index === activeIndex
                        ? "w-7 bg-[#8b1d72]"
                        : "w-5 bg-[#e8e8e8]"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Right Transparent Box */}
            <div className="relative min-h-[285px] bg-transparent p-[6px]">
              <div className="h-full w-full rounded-[3px] border border-white/90 bg-transparent" />
            </div>
          </div>

          {/* Desktop Arrows - equally aligned */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous slide"
            className="absolute left-1/2 top-1/2 hidden h-9 w-9 -translate-x-[470px] -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/85 text-[#8b1d72] shadow-[0_8px_22px_rgba(0,0,0,0.16)] transition hover:bg-[#8b1d72] hover:text-white lg:flex"
          >
            <span className="flex h-full w-full items-center justify-center pb-[3px] text-[27px] leading-none">
              ‹
            </span>
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="absolute left-1/2 top-1/2 hidden h-9 w-9 translate-x-[470px] -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/85 text-[#8b1d72] shadow-[0_8px_22px_rgba(0,0,0,0.16)] transition hover:bg-[#8b1d72] hover:text-white lg:flex"
          >
            <span className="flex h-full w-full items-center justify-center pb-[3px] text-[27px] leading-none">
              ›
            </span>
          </button>
        </div>
      </div>

      {/* Tablet + Mobile Normal Carousel */}
      <div className="relative z-10 bg-white px-5 py-14 lg:hidden">
        <div className="relative mx-auto max-w-[680px] overflow-hidden rounded-[14px] border border-[#eadce6] bg-white shadow-[0_14px_40px_rgba(0,0,0,0.10)]">
          {/* Top-right buttons */}
          <div className="absolute right-4 top-4 z-20 flex items-center gap-3">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous slide"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#8b1d72]/20 bg-white/90 text-[#8b1d72] shadow-[0_8px_22px_rgba(0,0,0,0.12)] transition hover:bg-[#8b1d72] hover:text-white"
            >
              <span className="flex h-full w-full items-center justify-center pb-[3px] text-[32px] leading-none">
                ‹
              </span>
            </button>

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next slide"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#8b1d72]/20 bg-white/90 text-[#8b1d72] shadow-[0_8px_22px_rgba(0,0,0,0.12)] transition hover:bg-[#8b1d72] hover:text-white"
            >
              <span className="flex h-full w-full items-center justify-center pb-[3px] text-[32px] leading-none">
                ›
              </span>
            </button>
          </div>

          {/* Content */}
          <div className="px-6 pb-8 pt-20 text-center sm:px-10">
            <h3 className="font-primary text-[58px] font-semibold leading-none text-[#8b1d72] sm:text-[66px]">
              {activeSlide.number}
            </h3>

            <h4 className="mx-auto mt-5 max-w-[320px] font-primary text-[18px] font-semibold uppercase leading-[1.45] tracking-[4px] text-black">
              {activeSlide.title}
            </h4>

            <p className="mx-auto mt-5 max-w-[520px] font-secondary text-[14px] font-medium leading-[1.7] tracking-[1px] text-[#8a8a8a]">
              {activeSlide.description}
            </p>

            {/* Indicators */}
            <div className="mt-7 flex items-center justify-center gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`h-[2px] transition-all duration-300 ${
                    index === activeIndex
                      ? "w-8 bg-[#8b1d72]"
                      : "w-6 bg-[#dedede]"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Image below content */}
          <div className="relative h-[260px] w-full overflow-hidden sm:h-[360px] md:h-[430px]">
            <Image
              key={activeSlide.bgImage}
              src={activeSlide.bgImage}
              alt={activeSlide.title}
              fill
              sizes="100vw"
              className="object-cover object-center transition-all duration-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
}