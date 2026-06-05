"use client";

import { motion } from "framer-motion";

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const leaders = [
  {
    name: "K. Ramasubramanian",
    role: "Founder & CEO",
    points: [
      "34+ years in power, energy, and infrastructure.",
      "Former leadership at Voltas (TATA), Kirloskar, FKI plc, and PRANSA International.",
      "Expertise in global business strategy and infrastructure development.",
      "Leads long-term vision and sustainability.",
    ],
  },
  {
    name: "Sabnivise Gopinath",
    role: "Managing Director",
    points: [
      "Seasoned healthcare leader with over 30 years of experience in healthcare strategy, operations, and digital transformation.",
      "Proven track record in driving innovation, operational excellence, and sustainable growth.",
      "Held Board and Group-level leadership roles across globally recognized healthcare networks including Apollo Hospitals Group, Fortis Healthcare, Aster DM Healthcare, VPS Healthcare, NMC Healthcare, and Canadian Specialist Hospital.",
      "Honored with multiple distinctions including an Honorary Doctorate from a reputed American university, CEO of the Year Award (2020–2024), and recipient of the UAE Golden Visa.",
      "Guided by a passion for quality care, digital health, and organizational transformation.",
    ],
  },
];

export default function LeadershipSection() {
  return (
    <section className="relative overflow-hidden bg-[#fbfaf8] px-4 py-12 sm:px-6 md:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          className="mx-auto mb-10 max-w-3xl text-center md:mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: smoothEase }}
          viewport={{ once: true, amount: 0.35 }}
        >
          <p className="font-secondary text-[11px] font-semibold uppercase tracking-[4px] text-[#8b1d72] sm:text-[12px]">
            Executive Leadership
          </p>

          <h2 className="mt-4 font-primary text-[26px] font-medium uppercase leading-[1.25] tracking-[5px] text-[#111] sm:text-[34px] md:text-[40px]">
            Meet Our Leaders
          </h2>

          <div className="mx-auto mt-6 flex max-w-[360px] items-center justify-center gap-4">
            <span className="h-px flex-1 bg-[#d6b981]" />
            <span className="h-2 w-2 rotate-45 bg-[#d6b981]" />
            <span className="h-px flex-1 bg-[#d6b981]" />
          </div>
        </motion.div>

        {/* 3D Panels */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          {leaders.map((leader, index) => (
            <motion.article
              key={leader.name}
              initial={{
                opacity: 0,
                y: 45,
                rotateX: 8,
                rotateY: index === 0 ? -6 : 6,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                rotateX: 0,
                rotateY: 0,
              }}
              transition={{
                duration: 0.9,
                delay: index * 0.15,
                ease: smoothEase,
              }}
              viewport={{ once: true, amount: 0.25 }}
              whileHover={{
                y: -8,
                rotateX: 2,
                rotateY: index === 0 ? -3 : 3,
                transition: { duration: 0.35, ease: "easeOut" },
              }}
              className="group relative [perspective:1200px]"
            >
              <div className="relative h-full overflow-hidden rounded-[28px] border border-[#eadfd8] bg-white px-6 py-7 shadow-[0_18px_45px_rgba(0,0,0,0.08)] transition duration-500 group-hover:shadow-[0_28px_75px_rgba(139,29,114,0.13)] sm:px-7 md:px-8">
                {/* 3D top depth line */}
                <div className="pointer-events-none absolute inset-x-5 top-0 h-[5px] rounded-b-full bg-gradient-to-r from-[#8b1d72] via-[#d6b981] to-[#8b1d72]" />

                {/* Side depth accent */}
                {/* <div className="pointer-events-none absolute bottom-5 right-5 top-5 w-[5px] rounded-full bg-gradient-to-b from-[#d6b981] via-[#8b1d72]/50 to-transparent opacity-70" /> */}

                {/* Header row */}
                <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <span className="inline-flex rounded-full border border-[#eadfd8] bg-[#fbfaf8] px-4 py-2 font-secondary text-[10px] font-semibold uppercase tracking-[3px] text-[#b765a2]">
                      {leader.role}
                    </span>

                    <h3 className="mt-5 break-words font-primary text-[20cdpx] font-medium uppercase leading-[1.18] tracking-[4px] text-[#111] sm:text-[21px] md:text-[23px] lg:text-[25px] xl:text-[30px]">
                      {leader.name}
                    </h3>
                  </div>

                  <div className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-full border border-[#d6b981]/60 bg-[#fffaf3] font-primary text-[24px] uppercase text-[#8b1d72] shadow-[inset_0_0_18px_rgba(214,185,129,0.25)] sm:flex">
                    {leader.name
                      .split(" ")
                      .map((word) => word[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                </div>

                {/* Divider */}
                <div className="my-6 flex items-center gap-3">
                  <span className="h-px w-14 bg-[#d6b981]" />
                  <span className="h-2 w-2 rotate-45 bg-[#d6b981]" />
                  <span className="h-px flex-1 bg-[#eadfd8]" />
                </div>

                {/* Points */}
                <ul className="space-y-3.5">
                  {leader.points.map((point, pointIndex) => (
                    <motion.li
                      key={point}
                      initial={{ opacity: 0, x: -18 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.55,
                        delay: 0.35 + index * 0.1 + pointIndex * 0.055,
                        ease: smoothEase,
                      }}
                      viewport={{ once: true }}
                      className="flex gap-3"
                    >
                      <span className="mt-[9px] h-[7px] w-[7px] shrink-0 rotate-45 bg-[#8b1d72] shadow-[0_0_0_4px_rgba(139,29,114,0.08)]" />

                      <p className="font-secondary text-[13.5px] font-medium leading-[1.7] tracking-[0.9px] text-[#707070] sm:text-[14px] md:text-[15px]">
                        {point}
                      </p>
                    </motion.li>
                  ))}
                </ul>

                {/* Bottom depth shadow */}
                <div className="pointer-events-none absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#d6b981]/70 to-transparent" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}