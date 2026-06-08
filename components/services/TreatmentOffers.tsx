"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type OfferItem = {
  label: string;
  description: string;
};

type TreatmentOffersProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  sectionTitle?: string;
  image: string;
  imageAlt?: string;
  offers: OfferItem[];
  reverse?: boolean;
};

const smoothEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function TreatmentOffers({
  eyebrow = "Treatment Steps",
  title,
  description,
  sectionTitle = "It Offers:",
  image,
  imageAlt = "Treatment image",
  offers,
  reverse = false,
}: TreatmentOffersProps) {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-12 sm:px-6 md:py-16 lg:px-8 lg:py-20">
      {/* Soft premium background line */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[86%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#d6b981]/45 to-transparent" />

      <div
        className={`mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 md:gap-12 lg:gap-16 ${
          reverse
            ? "lg:grid-cols-[1.35fr_0.85fr]"
            : "lg:grid-cols-[0.85fr_1.35fr]"
        }`}
      >
        {/* Image */}
        <motion.div
          className={`flex justify-center ${
            reverse ? "lg:order-2" : "lg:order-1"
          }`}
          initial={{
            opacity: 0,
            y: 70,
            rotate: reverse ? 2 : -2,
            scale: 0.92,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            rotate: 0,
            scale: 1,
          }}
          transition={{
            duration: 1.45,
            ease: smoothEase,
          }}
          viewport={{ once: true, amount: 0.25 }}
        >
          <motion.div
            className="relative w-full max-w-[300px] rounded-[16px] bg-white p-[7px] shadow-[0_18px_55px_rgba(0,0,0,0.14)] sm:max-w-[340px] md:max-w-[360px]"
            whileHover={{
              y: -8,
              rotate: reverse ? -1.2 : 1.2,
              transition: { duration: 0.45, ease: "easeOut" },
            }}
          >
            {/* Gold glow border */}
            <div className="pointer-events-none absolute -inset-[1px] rounded-[17px] bg-gradient-to-br from-[#d6b981]/70 via-white to-[#8b1d72]/20" />

            <div className="relative overflow-hidden rounded-[11px] border border-[#d6b981]/80 bg-[#f7f1f5]">
              <motion.div
                initial={{ scale: 1.12 }}
                whileInView={{ scale: 1 }}
                transition={{
                  duration: 2.2,
                  ease: smoothEase,
                }}
                viewport={{ once: true, amount: 0.3 }}
                className="relative h-[390px] w-full sm:h-[440px] md:h-[470px] lg:h-[455px]"
              >
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 360px"
                  className="object-cover object-center"
                />
              </motion.div>

              <div className="pointer-events-none absolute inset-[7px] rounded-[8px] border border-white/85" />
            </div>
          </motion.div>
        </motion.div>

        {/* Content */}
        <motion.div
          className={`text-center lg:text-left ${
            reverse ? "lg:order-1" : "lg:order-2"
          }`}
          initial={{
            opacity: 0,
            y: 65,
            scale: 0.98,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 1.35,
            delay: 0.12,
            ease: smoothEase,
          }}
          viewport={{ once: true, amount: 0.25 }}
        >
          {eyebrow && (
            <motion.p
              className="mb-4 font-secondary text-[11px] font-semibold uppercase tracking-[2.8px] text-[#b657a2] sm:text-[12px]"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.95,
                delay: 0.2,
                ease: smoothEase,
              }}
              viewport={{ once: true }}
            >
              {eyebrow}
            </motion.p>
          )}

          <motion.h2
            className="font-primary text-[23px] font-medium uppercase leading-[1.35] tracking-[4px] text-[#111] sm:text-[28px] sm:tracking-[5px] md:text-[33px] lg:text-[38px] lg:tracking-[6px]"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.05,
              delay: 0.32,
              ease: smoothEase,
            }}
            viewport={{ once: true }}
          >
            {title}
          </motion.h2>

          {description && (
            <motion.p
              className="mx-auto mt-5 max-w-[900px] font-secondary text-[13.5px] font-medium leading-[1.75] tracking-[1.2px] text-[#9a9a9a] sm:text-[14px] md:text-[15px] lg:mx-0 lg:tracking-[1.6px]"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.05,
                delay: 0.46,
                ease: smoothEase,
              }}
              viewport={{ once: true }}
            >
              {description}
            </motion.p>
          )}

          <motion.div
            className="mt-7 flex items-center justify-center gap-4 lg:justify-start"
            initial={{ opacity: 0, scaleX: 0.6 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{
              duration: 1,
              delay: 0.56,
              ease: smoothEase,
            }}
            viewport={{ once: true }}
          >
            <span className="h-px w-14 bg-[#d6b981] sm:w-20" />
            <span className="h-2 w-2 rotate-45 bg-[#d6b981]" />
            <span className="h-px w-14 bg-[#d6b981] sm:w-20" />
          </motion.div>

          <motion.h3
            className="mt-8 font-primary text-[16px] font-semibold uppercase tracking-[3px] text-[#222] sm:text-[18px] sm:tracking-[4px]"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.95,
              delay: 0.66,
              ease: smoothEase,
            }}
            viewport={{ once: true }}
          >
            {sectionTitle}
          </motion.h3>

          {/* Dynamic offer rows */}
          <motion.div
            className="mx-auto mt-5 max-w-[900px] border-t border-[#eee7df] lg:mx-0"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.16,
                  delayChildren: 0.78,
                },
              },
            }}
          >
            {offers.map((offer, index) => (
              <motion.div
                key={`${offer.label}-${index}`}
                className="group grid grid-cols-1 gap-2 border-b border-[#eee7df] py-4 text-left sm:grid-cols-[190px_1fr] sm:gap-5 md:grid-cols-[220px_1fr] md:py-4.5"
                variants={{
                  hidden: {
                    opacity: 0,
                    x: index % 2 === 0 ? -35 : 35,
                    y: 18,
                  },
                  show: {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    transition: {
                      duration: 0.9,
                      ease: smoothEase,
                    },
                  },
                }}
              >
                <h4 className="flex items-start gap-3 font-primary text-[12.5px] font-semibold uppercase leading-[1.55] tracking-[0.5px] text-[#4c4c4c] transition duration-300 group-hover:text-[#8b1d72] sm:text-[13px] md:text-[14px]">
                  <span className="mt-[7px] h-[7px] w-[7px] shrink-0 rotate-45 bg-[#8b1d72] sm:hidden" />
                  {offer.label}
                </h4>

                <p className="font-secondary text-[13px] font-medium leading-[1.75] tracking-[1px] text-[#969696] transition duration-300 group-hover:text-[#666] sm:text-[13.5px] md:text-[14px] md:tracking-[1.2px]">
                  {offer.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}