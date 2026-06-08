"use client";

import { motion } from "framer-motion";

type HighlightText = {
  text: string;
  bold?: boolean;
};

type Paragraph = {
  parts: HighlightText[];
};

type IntroSectionProps = {
  title: string;
  paragraphs: Paragraph[];
  eyebrow?: string;
  background?: "white" | "soft";
  maxWidthClass?: string;
};

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function IntroSection({
  title,
  eyebrow,
  paragraphs,
  background = "white",
  maxWidthClass = "max-w-[1050px]",
}: IntroSectionProps) {
  return (
    <section
      className={`relative overflow-hidden px-4 py-14 sm:px-6 md:py-16 lg:px-8 lg:py-20 ${
        background === "soft" ? "bg-[#fbfaf8]" : "bg-white"
      }`}
    >
      {/* Soft wave pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.28]">
        <div className="absolute inset-0 bg-[repeating-radial-gradient(ellipse_at_center,rgba(139,29,114,0.08)_0px,rgba(139,29,114,0.08)_1px,transparent_1px,transparent_12px)]" />
      </div>

      <div className={`relative z-10 mx-auto ${maxWidthClass} text-center`}>
        {eyebrow && (
          <motion.p
            className="mb-5 font-secondary text-[11px] font-semibold uppercase tracking-[4px] text-[#8b1d72] sm:text-[12px]"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: smoothEase }}
            viewport={{ once: true, amount: 0.35 }}
          >
            {eyebrow}
          </motion.p>
        )}

        <motion.h2
          className="font-primary text-[24px] font-medium uppercase leading-[1.3] tracking-[7px] text-[#111] sm:text-[28px] md:text-[34px]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, ease: smoothEase }}
          viewport={{ once: true, amount: 0.35 }}
        >
          {title}
        </motion.h2>

        <motion.div
          className="mx-auto mt-10 space-y-7"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.18,
                delayChildren: 0.18,
              },
            },
          }}
        >
          {paragraphs.map((paragraph, index) => (
            <motion.p
              key={index}
              className="mx-auto max-w-[980px] font-secondary text-[14px] font-medium leading-[1.75] tracking-[2px] text-[#9a9a9a] sm:text-[15px] md:text-[16px]"
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.85,
                    ease: smoothEase,
                  },
                },
              }}
            >
              {paragraph.parts.map((part, partIndex) => (
                <span
                  key={`${part.text}-${partIndex}`}
                  className={part.bold ? "font-bold text-[#222]" : ""}
                >
                  {part.text}
                </span>
              ))}
            </motion.p>
          ))}
        </motion.div>
      </div>
    </section>
  );
}