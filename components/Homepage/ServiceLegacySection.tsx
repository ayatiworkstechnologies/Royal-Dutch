"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const smoothEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function ServiceLegacySection() {
  return (
    <section className="w-full overflow-hidden bg-white py-8 md:py-10 lg:py-12">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-[0.9fr_1.4fr] md:px-6 lg:gap-16">
        {/* Left Image */}
        <motion.div
          className="flex justify-center md:justify-start"
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{
            duration: 1.35,
            ease: smoothEase,
          }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            className="relative w-full max-w-[285px] rounded-[12px] bg-white p-[7px] shadow-[0_10px_35px_rgba(0,0,0,0.16)] sm:max-w-[310px]"
            animate={{
              y: [0, -14, 0],
            }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="relative overflow-hidden rounded-[8px] border border-[#d6b981]/70">
              <Image
                src="/images/service-home.png"
                alt="Royal Dutch Dermatology and Aesthetics Service"
                width={500}
                height={680}
                priority
                className="h-[410px] w-full object-cover object-center sm:h-[440px] md:h-[420px]"
              />

              {/* Inner Border */}
              {/* <div className="pointer-events-none absolute inset-[6px] rounded-[7px] border border-white/80" /> */}

              {/* Soft Shine */}
              <motion.div
                className="pointer-events-none absolute inset-y-0 -left-[60%] w-[40%] rotate-12 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                initial={{ x: "-120%" }}
                whileInView={{ x: "430%" }}
                transition={{
                  duration: 2.2,
                  delay: 0.6,
                  ease: smoothEase,
                }}
                viewport={{ once: true }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Right Content */}
        <div className="text-center md:text-left">
          {/* Subtitle - fade down */}
          <motion.p
            className="mb-6 font-secondary text-[12px] font-medium tracking-[3px] text-[#a73d8f]"
            initial={{ opacity: 0, y: -28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.15,
              ease: smoothEase,
            }}
            viewport={{ once: true }}
          >
            Our service
          </motion.p>

          {/* Heading - fade right */}
          <motion.h2
            className="font-primary text-[25px] font-medium uppercase leading-[1.35] tracking-[5px] text-black sm:text-[28px] md:text-[30px] lg:text-[32px]"
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 1.25,
              delay: 0.25,
              ease: smoothEase,
            }}
            viewport={{ once: true }}
          >
            A Legacy Of Excellence In
            <br className="hidden sm:block" />
            Dermatology &amp; Aesthetics
          </motion.h2>

          {/* Paragraph - fade up */}
          <motion.p
            className="mt-7 max-w-[820px] font-secondary text-[13px] font-normal leading-[1.45] tracking-[2.2px] text-[#8c8c8c] md:text-[14px]"
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.25,
              delay: 0.38,
              ease: smoothEase,
            }}
            viewport={{ once: true }}
          >
            Established in Ras Al-Khaimah, United Arab Emirates, Royal Dutch
            Medical Centre has earned a reputation as a premier destination for
            advanced dermatology and aesthetic medicine. Founded by seasoned
            Dutch professionals with a vision to redefine clinical care through
            European precision and innovation, Royal Dutch Clinic has grown into
            a trusted brand that delivers personalized beauty and wellness
            solutions with uncompromising quality.
          </motion.p>

          {/* Button - fade bottom */}
          <motion.div
            className="mt-7 flex justify-center md:justify-start"
            initial={{ opacity: 0, y: 55 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.1,
              delay: 0.5,
              ease: smoothEase,
            }}
            viewport={{ once: true }}
          >
            <Link
              href="/medical-specialities/dermatology-aesthetic-medicine"
              className="rounded-full bg-[#b765a2] px-5 py-2 font-primary text-[12px] font-semibold uppercase tracking-[1px] text-white transition duration-300 hover:bg-[#D6B981] hover:text-[#200020]"
            >
              Know More
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}