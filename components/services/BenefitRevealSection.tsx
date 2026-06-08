"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type BenefitItem = {
  text: string;
};

type BenefitRevealSectionProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  sectionTitle?: string;
  image: string;
  imageAlt?: string;
  benefits: BenefitItem[];
};

const smoothEase: [number, number, number, number] = [0.12, 1, 0.22, 1];

export default function BenefitRevealSection({
  eyebrow,
  title,
  subtitle,
  sectionTitle = "It’s ideal for those who",
  image,
  imageAlt = "Treatment benefit image",
  benefits,
}: BenefitRevealSectionProps) {
  const leftBenefits = benefits.filter((_, index) => index % 2 === 0);
  const rightBenefits = benefits.filter((_, index) => index % 2 !== 0);

  return (
    <section className="relative overflow-hidden bg-white px-4 py-14 sm:px-6 md:py-20 lg:px-8 lg:py-24">
      {/* Soft Background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,29,114,0.045),transparent_38%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.018)_1px,transparent_1px),linear-gradient(0deg,rgba(0,0,0,0.012)_1px,transparent_1px)] bg-[size:28px_28px] opacity-[0.12]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          className="mx-auto max-w-5xl text-center"
          initial={{ opacity: 0, y: 46, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 1.55,
            ease: smoothEase,
          }}
          viewport={{ once: true, amount: 0.35 }}
        >
          {eyebrow && (
            <motion.p
              className="mb-4 font-secondary text-[11px] font-semibold uppercase tracking-[4px] text-[#b657a2] sm:text-[12px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.2,
                delay: 0.12,
                ease: smoothEase,
              }}
              viewport={{ once: true }}
            >
              {eyebrow}
            </motion.p>
          )}

          <motion.h2
            className="font-primary text-[24px] font-medium uppercase leading-[1.35] tracking-[5px] text-[#111] sm:text-[30px] md:text-[36px] lg:text-[42px]"
            initial={{ opacity: 0, y: 34, letterSpacing: "14px" }}
            whileInView={{ opacity: 1, y: 0, letterSpacing: "5px" }}
            transition={{
              duration: 1.65,
              delay: 0.18,
              ease: smoothEase,
            }}
            viewport={{ once: true }}
          >
            {title}
          </motion.h2>

          {subtitle && (
            <motion.p
              className="mx-auto mt-5 max-w-[760px] font-secondary text-[13px] font-medium leading-[1.8] tracking-[1.4px] text-[#9a9a9a] sm:text-[14px] md:text-[15px]"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.35,
                delay: 0.35,
                ease: smoothEase,
              }}
              viewport={{ once: true }}
            >
              {subtitle}
            </motion.p>
          )}

          {sectionTitle && (
            <motion.h3
              className="mt-7 font-primary text-[15px] font-semibold uppercase tracking-[3px] text-[#333] sm:text-[17px] sm:tracking-[4px]"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.35,
                delay: 0.5,
                ease: smoothEase,
              }}
              viewport={{ once: true, amount: 0.35 }}
            >
              {sectionTitle}
            </motion.h3>
          )}
        </motion.div>

        {/* Desktop / Tablet Layout */}
        <div className="mt-14 hidden items-center justify-center gap-8 md:grid md:grid-cols-[1fr_auto_1fr] lg:gap-16">
          {/* Left Benefits */}
          <div className="space-y-16 lg:space-y-24">
            {leftBenefits.map((item, index) => (
              <BenefitText
                key={`left-${item.text}-${index}`}
                text={item.text}
                direction="left"
                delay={0.75 + index * 0.38}
              />
            ))}
          </div>

          {/* Center Image */}
          <motion.div
            className="relative mx-auto w-[230px] rounded-[18px] bg-gradient-to-br from-[#8b1d72] via-[#b657a2] to-[#d6b981] p-[2px] shadow-[0_26px_75px_rgba(139,29,114,0.2)] lg:w-[275px]"
            initial={{
              opacity: 0,
              y: 80,
              scale: 0.78,
              rotate: -4,
              filter: "blur(10px)",
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
              rotate: 0,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 1.75,
              delay: 0.62,
              ease: smoothEase,
            }}
            viewport={{ once: true, amount: 0.35 }}
            whileHover={{
              y: -8,
              rotate: 1,
              scale: 1.025,
              transition: { duration: 0.55, ease: "easeOut" },
            }}
          >
            <div className="relative overflow-hidden rounded-[16px] bg-white p-[6px]">
              <motion.div
                className="relative h-[320px] overflow-hidden rounded-[12px] lg:h-[370px]"
                initial={{ scale: 1.18 }}
                whileInView={{ scale: 1 }}
                transition={{
                  duration: 2.3,
                  delay: 0.75,
                  ease: smoothEase,
                }}
                viewport={{ once: true }}
              >
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 1024px) 230px, 275px"
                  className="object-cover object-center"
                />
              </motion.div>

              <div className="pointer-events-none absolute inset-[12px] rounded-[12px] border border-white/80" />
            </div>
          </motion.div>

          {/* Right Benefits */}
          <div className="space-y-16 lg:space-y-24">
            {rightBenefits.map((item, index) => (
              <BenefitText
                key={`right-${item.text}-${index}`}
                text={item.text}
                direction="right"
                delay={0.95 + index * 0.38}
              />
            ))}
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="mt-12 block md:hidden">
          <motion.div
            className="mx-auto w-full max-w-[260px] rounded-[18px] bg-gradient-to-br from-[#8b1d72] via-[#b657a2] to-[#d6b981] p-[2px] shadow-[0_20px_55px_rgba(139,29,114,0.18)]"
            initial={{
              opacity: 0,
              y: 55,
              scale: 0.86,
              filter: "blur(8px)",
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
            }}
            transition={{ duration: 1.45, ease: smoothEase }}
            viewport={{ once: true, amount: 0.35 }}
          >
            <div className="relative overflow-hidden rounded-[16px] bg-white p-[6px]">
              <motion.div
                className="relative h-[330px] overflow-hidden rounded-[12px]"
                initial={{ scale: 1.14 }}
                whileInView={{ scale: 1 }}
                transition={{
                  duration: 2,
                  ease: smoothEase,
                }}
                viewport={{ once: true }}
              >
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  sizes="90vw"
                  className="object-cover object-center"
                />
              </motion.div>
            </div>
          </motion.div>

          <div className="mt-10 space-y-5">
            {benefits.map((item, index) => (
              <motion.div
                key={`mobile-${item.text}-${index}`}
                className="rounded-[18px] border border-[#eadfe7] bg-[linear-gradient(145deg,#ffffff_0%,#fff8fd_55%,#fffaf2_100%)] px-5 py-5 shadow-[0_12px_36px_rgba(139,29,114,0.07)]"
                initial={{
                  opacity: 0,
                  x: 52,
                  y: 22,
                  scale: 0.94,
                  filter: "blur(6px)",
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                transition={{
                  duration: 1.15,
                  delay: index * 0.18,
                  ease: smoothEase,
                }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="flex gap-3">
                  <CheckIcon />

                  <p className="font-secondary text-[15px] font-medium leading-[1.7] tracking-[1.2px] text-[#8f8f8f]">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BenefitText({
  text,
  direction,
  delay,
}: {
  text: string;
  direction: "left" | "right";
  delay: number;
}) {
  return (
    <motion.div
      className={`flex items-start gap-3 ${
        direction === "left"
          ? "justify-end text-right"
          : "justify-start text-left"
      }`}
      initial={{
        opacity: 0,
        x: direction === "left" ? -95 : 95,
        y: 30,
        scale: 0.9,
        filter: "blur(8px)",
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      }}
      transition={{
        duration: 1.45,
        delay,
        ease: smoothEase,
      }}
      viewport={{ once: true, amount: 0.45 }}
    >
      {direction === "right" && <CheckIcon />}

      <p className="max-w-[330px] font-secondary text-[17px] font-medium leading-[1.6] tracking-[2px] text-[#a0a0a0] lg:text-[19px]">
        {text}
      </p>

      {direction === "left" && <CheckIcon />}
    </motion.div>
  );
}

function CheckIcon() {
  return (
    <span className="mt-[7px] flex h-[13px] w-[13px] shrink-0 items-center justify-center rounded-full bg-[#8b1d72] text-white shadow-[0_8px_18px_rgba(139,29,114,0.22)]">
      <svg
        viewBox="0 0 24 24"
        className="h-[8px] w-[8px]"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M6 12.5 10.2 16.5 18 7.5"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}