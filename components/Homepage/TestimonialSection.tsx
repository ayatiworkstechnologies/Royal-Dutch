"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

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

function QuoteIcon() {
  return (
    <img src="./icons/quote.png" alt="Quote" className="mx-auto w-5" />
  );
}

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
    }, 5000);

    return () => clearInterval(timer);
  }, [activeIndex, isPaused]);

  return (
    <motion.section
      className="relative w-full overflow-hidden bg-white px-4 py-10 md:px-6 md:py-12 lg:py-14"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1.5,
        ease: smoothEase,
      }}
      viewport={{ once: true, amount: 0.25 }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.55]"
        style={{
          backgroundImage: "url('/images/testimonial-bg.png')",
        }}
        initial={{ opacity: 0, scale: 1.06 }}
        whileInView={{ opacity: 0.55, scale: 1 }}
        transition={{
          duration: 1.8,
          ease: smoothEase,
        }}
        viewport={{ once: true }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="relative mx-auto flex min-h-[360px] items-center justify-center">
          <motion.button
            type="button"
            onClick={prevSlide}
            aria-label="Previous testimonial"
            className="absolute cursor-pointer left-0 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black shadow-[0_8px_28px_rgba(0,0,0,0.08)] transition hover:bg-[#8b1d72] hover:text-white md:flex"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 1.1,
              delay: 0.35,
              ease: smoothEase,
            }}
            viewport={{ once: true }}
          >
            <span className="flex h-full w-full items-center justify-center pb-[3px] text-[34px] leading-none">
              ‹
            </span>
          </motion.button>

          <div className="mx-auto max-w-[720px] text-center">
            <motion.div
              className="mb-8 md:mb-10"
              initial={{ opacity: 0, y: -28, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 1.2,
                delay: 0.15,
                ease: smoothEase,
              }}
              viewport={{ once: true }}
            >
              <QuoteIcon />
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -22, filter: "blur(6px)" }}
                transition={{
                  duration: 0.9,
                  ease: smoothEase,
                }}
              >
                <p className="mx-auto max-w-[720px] font-secondary text-[15px] font-light leading-[1.8] tracking-[3px] text-[#8d8d8d] md:text-[16px]">
                  {active.text}
                </p>

                <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full border border-[#d6b981]/50 bg-white p-[2px]">
                    <Image
                      src={active.image}
                      alt={active.name}
                      fill
                      sizes="40px"
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
              </motion.div>
            </AnimatePresence>

            <motion.div
              className="mt-10  flex items-center justify-center gap-4 md:mt-12"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.45,
                ease: smoothEase,
              }}
              viewport={{ once: true }}
            >
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                  className={`h-[2px] rounded-full transition-all duration-500 ${
                    index === activeIndex
                      ? "w-9 bg-[#8b1d72]"
                      : "w-6 bg-[#eeeeee]"
                  }`}
                />
              ))}
            </motion.div>
          </div>

          <motion.button
            type="button"
            onClick={nextSlide}
            aria-label="Next testimonial"
            className="absolute cursor-pointer right-0 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black shadow-[0_8px_28px_rgba(0,0,0,0.08)] transition hover:bg-[#8b1d72] hover:text-white md:flex"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 1.1,
              delay: 0.35,
              ease: smoothEase,
            }}
            viewport={{ once: true }}
          >
            <span className="flex h-full w-full items-center justify-center pb-[3px] text-[34px] leading-none">
              ›
            </span>
          </motion.button>
        </div>

        <motion.div
          className="mt-6 flex justify-center gap-4 md:hidden"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.35,
            ease: smoothEase,
          }}
          viewport={{ once: true }}
        >
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous testimonial"
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white text-black shadow-[0_8px_28px_rgba(0,0,0,0.08)] transition hover:bg-[#8b1d72] hover:text-white"
          >
            <span className="flex h-full w-full items-center justify-center pb-[3px] text-[34px] leading-none">
              ‹
            </span>
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next testimonial"
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white text-black shadow-[0_8px_28px_rgba(0,0,0,0.08)] transition hover:bg-[#8b1d72] hover:text-white"
          >
            <span className="flex h-full w-full items-center justify-center pb-[3px] text-[34px] leading-none">
              ›
            </span>
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
}