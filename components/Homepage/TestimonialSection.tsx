"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const testimonials = [
  {
    name: "Aisha Mohammed",
    service: "General Consultation",
    image: "/images/testimonial-user-1.png",
    text: (
      <>
        I had a <strong>Hydra Facial</strong> at Royal Dutch Clinic, and my skin
        felt <strong>fresh, clean</strong>, and deeply hydrated after the
        session. The treatment was <strong>relaxing</strong>, and the team
        explained each step clearly.
      </>
    ),
  },
  {
    name: "Sara Ahmed",
    service: "Laser Rejuvenation",
    image: "/images/testimonial-user-1.png",
    text: (
      <>
        The experience was very <strong>professional</strong> and comfortable.
        My skin texture looks <strong>smoother</strong>, brighter, and more
        refreshed after the treatment.
      </>
    ),
  },
  {
    name: "Mariam Ali",
    service: "Skin Care Treatment",
    image: "/images/testimonial-user-1.png",
    text: (
      <>
        I loved the calm environment and the detailed care. The result was
        <strong> natural</strong>, clean, and exactly what I expected from a
        premium clinic.
      </>
    ),
  },
];

export default function TestimonialSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const active = testimonials[activeIndex];

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 4500);

    return () => clearInterval(timer);
  }, [activeIndex, isPaused]);

  return (
    <section
      className="relative w-full overflow-hidden bg-white px-4 py-8 md:px-6 lg:py-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Background image */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.55]"
        style={{
          backgroundImage: "url('/images/testimonial-bg.png')",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="relative mx-auto flex min-h-[360px] items-center justify-center">
          {/* Left Arrow */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous testimonial"
            className="absolute left-0 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black shadow-[0_8px_28px_rgba(0,0,0,0.08)] transition hover:bg-[#8b1d72] hover:text-white md:flex"
          >
            <span className="flex h-full w-full items-center justify-center pb-[3px] text-[34px] leading-none">
              ‹
            </span>
          </button>

          {/* Content */}
          <div className="mx-auto max-w-[720px] text-center">
            <div className="mb-9 font-primary text-[76px] font-semibold leading-none text-black">
              “
            </div>

            <p className="mx-auto max-w-[720px] font-secondary text-[15px] font-light leading-[1.8] tracking-[3px] text-[#8d8d8d] md:text-[16px]">
              {active.text}
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <div className="relative h-9 w-9 overflow-hidden rounded-full">
                <Image
                  src={active.image}
                  alt={active.name}
                  fill
                  sizes="36px"
                  className="object-cover object-center"
                />
              </div>

              <div className="flex flex-col items-center gap-3 sm:flex-row">
                <h3 className="font-primary text-[17px] font-semibold uppercase tracking-[5px] text-black">
                  {active.name}
                </h3>

                <span className="hidden h-9 w-px bg-[#777] sm:block" />

                <p className="font-primary text-[16px] font-light uppercase tracking-[5px] text-[#9a9a9a]">
                  {active.service}
                </p>
              </div>
            </div>

            {/* Indicators */}
            <div className="mt-12 flex items-center justify-center gap-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                  className={`h-[2px] rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? "w-8 bg-black"
                      : "w-6 bg-[#eeeeee]"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next testimonial"
            className="absolute right-0 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black shadow-[0_8px_28px_rgba(0,0,0,0.08)] transition hover:bg-[#8b1d72] hover:text-white md:flex"
          >
            <span className="flex h-full w-full items-center justify-center pb-[3px] text-[34px] leading-none">
              ›
            </span>
          </button>
        </div>

        {/* Mobile arrows */}
        <div className="mt-6 flex justify-center gap-4 md:hidden">
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous testimonial"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black shadow-[0_8px_28px_rgba(0,0,0,0.08)] transition hover:bg-[#8b1d72] hover:text-white"
          >
            <span className="flex h-full w-full items-center justify-center pb-[3px] text-[34px] leading-none">
              ‹
            </span>
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next testimonial"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black shadow-[0_8px_28px_rgba(0,0,0,0.08)] transition hover:bg-[#8b1d72] hover:text-white"
          >
            <span className="flex h-full w-full items-center justify-center pb-[3px] text-[34px] leading-none">
              ›
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}