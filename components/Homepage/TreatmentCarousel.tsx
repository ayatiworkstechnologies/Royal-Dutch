"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const smoothEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const slides = [
  {
    number: "01",
    title: "Dermatology & Aesthetic Medicine",
    points: [
      "Medical dermatology",
      "Cosmetic injectables",
      "Laser and device based treatments",
      "Anti-aging and preventive skin programs",
    ],
    bgImage: "/images/treatment-bg-1.png",
  },
  {
    number: "02",
    title: "Dentistry Department",
    points: [
      "Preventive and general dentistry",
      "Cosmetic smile design and rehabilitation",
      "Restorative dentistry",
      "Pediatric dentistry",
    ],
    bgImage: "/images/treatment-bg-2.png",
  },
  {
    number: "03",
    title: "General Medicine (GP Services)",
    points: [
      "Diagnosis and treatment of acute conditions",
      "Chronic disease management",
      "Preventive health screenings and check-ups",
      "Family medicine and wellness care",
    ],
    bgImage: "/images/treatment-bg-3.png",
  },
  {
    number: "04",
    title: "Physiotherapy & Rehabilitation",
    points: [
      "Musculoskeletal and pain management therapy",
      "Post-injury and post-operative rehabilitation",
      "Neurological physiotherapy",
      "Home-based physiotherapy programs",
    ],
    bgImage: "/images/treatment-bg-4.png",
  },
  {
    number: "05",
    title: "Home Healthcare Division",
    points: [
      "Doctor home consultations",
      "Skilled nursing care",
      "Elderly and assisted care services",
      "Chronic condition monitoring",
    ],
    bgImage: "/images/treatment-bg-5.png",
  },
  {
    number: "06",
    title: "Post-Surgical Care Programs",
    points: [
      "Wound care and infection prevention",
      "Pain management protocols",
      "Rehabilitation and mobility restoration",
      "Long-term recovery and follow-up care",
    ],
    bgImage: "/images/treatment-bg-6.png",
  },
  {
    number: "07",
    title: "Integrated Care Model",
    points: [
      "Seamless coordination between departments",
      "Continuity of care from consultation to recovery",
      "Personalized treatment pathways",
      "Improved clinical outcomes and patient satisfaction",
    ],
    bgImage: "/images/treatment-bg-7.png",
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

    const timer = setInterval(nextSlide, 3500);
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
      {/* Desktop Background */}
      <motion.div
        className="absolute inset-0 hidden overflow-hidden lg:block"
        initial={{ opacity: 0, scale: 1.08 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: smoothEase }}
        viewport={{ once: true, amount: 0.25 }}
      >
        <Image
          src={activeSlide.bgImage}
          alt={activeSlide.title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center transition-all duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-black/5" />
      </motion.div>

      {/* Desktop Layout */}
      <div className="relative z-10 hidden min-h-[450px] items-center justify-center px-4 py-8 lg:flex xl:min-h-[600px]">
        <div className="relative w-full max-w-[1320px]">
          <motion.div
            className="mx-auto grid w-full max-w-[850px] overflow-hidden rounded-[5px] border-[6px] border-white shadow-[0_15px_45px_rgba(0,0,0,0.16)] md:grid-cols-[230px_1fr]"
            initial={{ opacity: 0, y: 70, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.45, delay: 0.2, ease: smoothEase }}
            viewport={{ once: true, amount: 0.35 }}
          >
            <motion.div
              className="relative z-10 flex min-h-[425px] flex-col justify-center bg-white px-5 py-7"
              initial={{ opacity: 0, x: -45 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.35, delay: 0.45, ease: smoothEase }}
              viewport={{ once: true }}
            >
              <h3 className="font-primary text-[62px] font-semibold leading-none text-[#8b1d72]">
                {activeSlide.number}
              </h3>

              <h4 className="mt-7 max-w-[170px] font-primary text-[14px] font-semibold uppercase leading-[1.4] tracking-[3.5px] text-black">
                {activeSlide.title}
              </h4>

              <ul className="mt-5 max-w-[180px] space-y-2 font-secondary text-[11px] font-medium leading-[1.45] tracking-[0.7px] text-[#8f8f8f]">
                {activeSlide.points.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <span className="mt-[7px] h-[4px] w-[4px] shrink-0 rounded-full bg-[#8b1d72]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex items-center gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    className={`h-[2px] transition-all duration-500 ${index === activeIndex
                      ? "w-7 bg-[#8b1d72]"
                      : "w-5 bg-[#e8e8e8]"
                      }`}
                  />
                ))}
              </div>
            </motion.div>

            <motion.div
              className="relative min-h-[285px] bg-transparent p-[6px]"
              initial={{ opacity: 0, x: 45 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.35, delay: 0.55, ease: smoothEase }}
              viewport={{ once: true }}
            >
              <div className="h-full w-full rounded-[3px] border border-white/90 bg-transparent" />
            </motion.div>
          </motion.div>

          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous slide"
            className="absolute left-1/2 top-1/2 hidden h-[47px] w-[47px] -translate-x-[470px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/50 bg-white/10 backdrop-blur-[2px] transition duration-300 hover:border-[#8b1d72]/40 hover:bg-[#8b1d72]/10 lg:flex xl:-translate-x-[580px]"
          >
            <span className="flex h-[25px] w-[25px] items-center justify-center rounded-full bg-white text-black transition duration-300 group-hover:bg-[#8b1d72] group-hover:text-white">
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M15 5L8 12L15 19"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="absolute left-1/2 top-1/2 hidden h-[47px] w-[47px] translate-x-[470px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/50 bg-white/10 backdrop-blur-[2px] transition duration-300 hover:border-[#8b1d72]/40 hover:bg-[#8b1d72]/10 lg:flex xl:translate-x-[540px]"
          >
            <span className="flex h-[25px] w-[25px] items-center justify-center rounded-full bg-white text-black transition duration-300 group-hover:bg-[#8b1d72] group-hover:text-white">
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M9 5L16 12L9 19"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>

      {/* Tablet + Mobile */}
      <div className="relative z-10 bg-white px-5 py-14 lg:hidden">
        <motion.div
          className="relative mx-auto max-w-[680px] overflow-hidden rounded-[14px] border border-[#eadce6] bg-white shadow-[0_14px_40px_rgba(0,0,0,0.10)]"
          initial={{ opacity: 0, y: 60, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: smoothEase }}
          viewport={{ once: true, amount: 0.25 }}
        >
          <div className="relative h-[280px] sm:h-[360px]">
            <Image
              src={activeSlide.bgImage}
              alt={activeSlide.title}
              fill
              sizes="100vw"
              className="object-cover object-center"
            />

            <div className="absolute inset-0 bg-black/20" />

            <div className="absolute right-4 top-4 z-20 flex items-center gap-3">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous slide"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#8b1d72]"
              >
                ‹
              </button>

              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next slide"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#8b1d72]"
              >
                ›
              </button>
            </div>
          </div>

          <div className="bg-white px-6 py-7">
            <h3 className="font-primary text-[46px] font-semibold leading-none text-[#8b1d72]">
              {activeSlide.number}
            </h3>

            <h4 className="mt-5 font-primary text-[18px] font-semibold uppercase leading-[1.4] tracking-[3px] text-black">
              {activeSlide.title}
            </h4>

            <ul className="mt-5 space-y-3 font-secondary text-[14px] font-medium leading-[1.6] tracking-[0.6px] text-[#777]">
              {activeSlide.points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-[9px] h-[5px] w-[5px] shrink-0 rounded-full bg-[#8b1d72]" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex items-center gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`h-[3px] transition-all duration-500 ${index === activeIndex
                    ? "w-8 bg-[#8b1d72]"
                    : "w-5 bg-[#e8e8e8]"
                    }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}