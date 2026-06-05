"use client";

import { motion, type Variants } from "framer-motion";

const highlightItems = ["Natural Care", "Clinical Precision", "Safe Results"];

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const cardWrapperVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.85,
    },
  },
};

const cardItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 42,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: smoothEase,
    },
  },
};

const topRings = [120, 138, 156, 174, 192, 210, 228, 246, 264, 282];
const leftRings = [170, 190, 210, 230, 250, 270, 290, 310, 330];
const bottomRings = [90, 108, 126, 144, 162, 180, 198];
const rightOffsets = [0, 16, 32, 48, 64, 80, 96, 112, 128];

const sparkleDots = [
  { cx: 185, cy: 580, delay: "0s" },
  { cx: 245, cy: 640, delay: "1.5s" },
  { cx: 530, cy: 105, delay: "2.2s" },
  { cx: 720, cy: 140, delay: "0.8s" },
  { cx: 985, cy: 210, delay: "1.2s" },
  { cx: 1030, cy: 470, delay: "2.8s" },
  { cx: 865, cy: 520, delay: "1.8s" },
  { cx: 620, cy: 620, delay: "3s" },
];

function buildRightLoopPath(offset: number) {
  const x = 835 + offset;
  const y = 25 + offset;
  const w = 380;
  const h = 455;
  const r = 125;

  return `
    M ${x} ${y}
    H ${x + w - r}
    Q ${x + w} ${y} ${x + w} ${y + r}
    V ${y + h - r}
    Q ${x + w} ${y + h} ${x + w - r} ${y + h}
    H ${x}
  `;
}

function SectionLineBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
     

      {/* Very light overlay only */}
      <div className="absolute inset-0 bg-[#fbfaf8]/18" />
    </div>
  );
}

export default function WhatWeDoSection() {
  return (
    <section className="relative overflow-hidden bg-[#fbfaf8] px-4 py-10 md:px-6 md:py-12 lg:px-8 lg:py-14">
      <SectionLineBackground />

      {/* Soft pink glow blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute left-[-100px] top-[-90px] h-[280px] w-[280px] rounded-full bg-[#e467e4]/8 blur-[85px]"
          animate={{
            x: [0, 18, 0],
            y: [0, 12, 0],
            scale: [1, 1.04, 1],
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-[-120px] right-[-110px] h-[340px] w-[340px] rounded-full bg-[#e467e4]/10 blur-[95px]"
          animate={{
            x: [0, -18, 0],
            y: [0, -10, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <motion.div
        className="relative z-10 mx-auto max-w-6xl"
        initial={{ opacity: 0, y: 38 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.35,
          ease: smoothEase,
        }}
        viewport={{ once: true, amount: 0.22 }}
      >
        <div className="relative overflow-hidden rounded-[24px] border border-[#eadde4] bg-white/86 px-4 py-9 text-center backdrop-blur-md sm:px-6 sm:py-11 md:px-10 md:py-12 lg:px-16 lg:py-14">
          {/* Card shine */}
          <motion.div
            className="pointer-events-none absolute inset-y-0 -left-[70%] w-[38%] rotate-12 bg-gradient-to-r from-transparent via-white/55 to-transparent"
            initial={{ x: "-120%" }}
            whileInView={{ x: "460%" }}
            transition={{
              duration: 3.1,
              delay: 0.6,
              ease: smoothEase,
            }}
            viewport={{ once: true }}
          />

          {/* Corner lines */}
          <div className="pointer-events-none absolute left-5 top-5 h-10 w-10 border-l border-t border-[#d6b981] sm:left-6 sm:top-6 sm:h-12 sm:w-12" />
          <div className="pointer-events-none absolute right-5 top-5 h-10 w-10 border-r border-t border-[#d6b981] sm:right-6 sm:top-6 sm:h-12 sm:w-12" />
          <div className="pointer-events-none absolute bottom-6 left-6 hidden h-12 w-12 border-b border-l border-[#d6b981] sm:block" />
          <div className="pointer-events-none absolute bottom-6 right-6 hidden h-12 w-12 border-b border-r border-[#d6b981] sm:block" />

          {/* Badge */}
          <motion.div
            className="mb-5 flex justify-center md:mb-6"
            initial={{ opacity: 0, y: -16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.15,
              ease: smoothEase,
            }}
            viewport={{ once: true }}
          >
            <span className="rounded-full border border-[#b567a1]/15 bg-[#b567a1]/5 px-5 py-2 font-secondary text-[10px] font-semibold uppercase tracking-[3px] text-[#b567a1] md:text-[11px]">
              What We Do
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            className="mx-auto max-w-4xl font-primary text-[22px] font-medium uppercase leading-[1.45] tracking-[4px] text-black sm:text-[25px] md:text-[30px] md:tracking-[6px] lg:text-[32px]"
            initial={{ opacity: 0, x: -65 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 1.5,
              delay: 0.3,
              ease: smoothEase,
            }}
            viewport={{ once: true }}
          >
            We Provide Natural Treatments
          </motion.h2>

          {/* Divider */}
          <motion.div
            className="mx-auto mt-5 flex items-center justify-center gap-3 md:mt-6 md:gap-4"
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{
              duration: 1.15,
              delay: 0.6,
              ease: smoothEase,
            }}
            viewport={{ once: true }}
          >
            <span className="h-px w-12 bg-[#d6b981] md:w-16" />
            <motion.span
              className="h-2 w-2 rotate-45 bg-[#d6b981]"
              animate={{ rotate: [45, 135, 45] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <span className="h-px w-12 bg-[#d6b981] md:w-16" />
          </motion.div>

          {/* Paragraph */}
          <motion.p
            className="mx-auto mt-7 max-w-[980px] font-secondary text-[16px] font-light leading-[1.75] tracking-[1.2px] text-[#777] sm:text-[18px] md:mt-8 md:text-[21px] md:leading-[1.65] md:tracking-[1.4px] lg:text-[24px]"
            initial={{ opacity: 0, x: 65 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 1.5,
              delay: 0.72,
              ease: smoothEase,
            }}
            viewport={{ once: true }}
          >
            We provide{" "}
            <span className="font-semibold text-black">
              natural and clinical treatments
            </span>{" "}
            focused on precision-driven care for long-lasting skin health. Our
            approach is{" "}
            <span className="font-semibold text-black">toxin-free</span> and
            uses organic, nature-powered products with proven{" "}
            <span className="font-semibold text-black">
              effectiveness, ensuring safe,
            </span>{" "}
            balanced treatments with no side effects.
          </motion.p>

          {/* Cards */}
          <motion.div
            className="mx-auto mt-7 grid max-w-4xl grid-cols-1 gap-3 sm:mt-9 sm:grid-cols-3 sm:gap-4"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardWrapperVariants}
          >
            {highlightItems.map((item) => (
              <motion.div
                key={item}
                className="rounded-[14px] border border-[#eadde4] bg-white/72 px-4 py-3 sm:px-5 sm:py-4"
                variants={cardItemVariants}
                whileHover={{
                  y: -4,
                  borderColor: "#d6b981",
                  backgroundColor: "#fbfaf8",
                }}
                transition={{
                  duration: 0.35,
                  ease: smoothEase,
                }}
              >
                <p className="font-primary text-[11px] uppercase tracking-[3px] text-[#b567a1] sm:text-[12px]">
                  {item}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}