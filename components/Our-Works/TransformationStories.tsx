"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

type TransformationItem = {
  id: number;
  title: string;
  subtitle: string;
  beforeImage: string;
  afterImage: string;
};

type TransformationStoriesProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  items?: TransformationItem[];
};

const defaultTransformations: TransformationItem[] = [
  {
    id: 1,
    title: "Tone Balance",
    subtitle: "Slide to reveal transformation",
    beforeImage: "/images/result-before-1.jpg",
    afterImage: "/images/result-after-1.jpg",
  },
  {
    id: 2,
    title: "Tone Balance",
    subtitle: "Slide to reveal transformation",
    beforeImage: "/images/result-before-1.jpg",
    afterImage: "/images/result-after-1.jpg",
  },
  {
    id: 3,
    title: "Tone Balance",
    subtitle: "Slide to reveal transformation",
    beforeImage: "/images/result-before-1.jpg",
    afterImage: "/images/result-after-1.jpg",
  },
  {
    id: 4,
    title: "Tone Balance",
    subtitle: "Slide to reveal transformation",
    beforeImage: "/images/result-before-1.jpg",
    afterImage: "/images/result-after-1.jpg",
  },
  {
    id: 5,
    title: "Tone Balance",
    subtitle: "Slide to reveal transformation",
    beforeImage: "/images/result-before-1.jpg",
    afterImage: "/images/result-after-1.jpg",
  },
  {
    id: 6,
    title: "Tone Balance",
    subtitle: "Slide to reveal transformation",
    beforeImage: "/images/result-before-1.jpg",
    afterImage: "/images/result-after-1.jpg",
  },
  {
    id: 7,
    title: "Tone Balance",
    subtitle: "Slide to reveal transformation",
    beforeImage: "/images/result-before-1.jpg",
    afterImage: "/images/result-after-1.jpg",
  },
  {
    id: 8,
    title: "Tone Balance",
    subtitle: "Slide to reveal transformation",
    beforeImage: "/images/result-before-1.jpg",
    afterImage: "/images/result-after-1.jpg",
  },
];

const smoothEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function TransformationStories({
  eyebrow = "Our Works",
  title = "Transformation Stories",
  description = "Witness the remarkable outcomes achieved through expert care and personalized treatment plans. Explore real before-and-after results that showcase our commitment to excellence and patient satisfaction.",
  items = defaultTransformations,
}: TransformationStoriesProps) {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          className="mx-auto mb-14 max-w-4xl text-center"
          initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 1,
            ease: smoothEase,
          }}
          viewport={{
            once: true,
            amount: 0.2,
            margin: "0px 0px -80px 0px",
          }}
        >
          <p className="font-secondary text-[11px] font-semibold tracking-[2px] text-[#b657a2]">
            {eyebrow}
          </p>

          <h2 className="mt-4 font-primary text-[24px] font-medium uppercase leading-[1.2] tracking-[7px] text-[#171717] sm:text-[32px] md:text-[40px]">
            {title}
          </h2>

          <p className="mx-auto mt-5 max-w-[720px] font-secondary text-[12px] font-medium leading-[1.75] tracking-[1.3px] text-[#999] sm:text-[13px]">
            {description}
          </p>
        </motion.div>

        {/* Compact Grid */}
        <div className="mx-auto grid max-w-[1120px] grid-cols-1 gap-x-9 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <TransformationCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TransformationCard({
  item,
  index,
}: {
  item: TransformationItem;
  index: number;
}) {
  const [position, setPosition] = useState(50);

  const showBeforeLabel = position > 12;
  const showAfterLabel = position < 88;

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 38,
        scale: 0.96,
        filter: "blur(8px)",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      }}
      transition={{
        duration: 0.9,
        delay: index % 4 * 0.06,
        ease: smoothEase,
      }}
      viewport={{
        once: true,
        amount: 0.18,
        margin: "0px 0px -70px 0px",
      }}
      className="group"
    >
      <div className="overflow-hidden rounded-[14px] border border-[#ead9e6] bg-white transition duration-500 hover:-translate-y-2 hover:border-[#8b1d72]/45">
        {/* Image Area */}
        <div className="relative h-[285px] overflow-hidden bg-[#f4edf3] sm:h-[305px] lg:h-[315px]">
          {/* Before image */}
          <Image
            src={item.beforeImage}
            alt={`${item.title} before`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover object-center"
          />

          {/* After image */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              clipPath: `inset(0 0 0 ${position}%)`,
            }}
          >
            <Image
              src={item.afterImage}
              alt={`${item.title} after`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover object-center"
            />
          </div>

          {/* Inner border */}
          <div className="pointer-events-none absolute inset-2 rounded-[13px] border border-white/70" />

          {/* Labels */}
          <div
            className={`pointer-events-none absolute left-3 top-3 rounded-full bg-white px-3.5 py-1.5 transition-all duration-300 ${
              showBeforeLabel
                ? "translate-y-0 opacity-100"
                : "-translate-y-1 opacity-0"
            }`}
          >
            <span className="font-secondary text-[8px] font-bold uppercase tracking-[2px] text-[#b657a2]">
              Before
            </span>
          </div>

          <div
            className={`pointer-events-none absolute right-3 top-3 rounded-full bg-white px-3.5 py-1.5 transition-all duration-300 ${
              showAfterLabel
                ? "translate-y-0 opacity-100"
                : "-translate-y-1 opacity-0"
            }`}
          >
            <span className="font-secondary text-[8px] font-bold uppercase tracking-[2px] text-[#b657a2]">
              After
            </span>
          </div>

          {/* Divider */}
          <div
            className="pointer-events-none absolute top-0 z-20 h-full w-px bg-white/90"
            style={{ left: `${position}%` }}
          />

          {/* Center Icon */}
          <div
            className="pointer-events-none absolute top-[55%] z-30 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#8b1d72] text-white ring-[4px] ring-white/70 transition duration-500 group-hover:scale-110 group-hover:bg-[#D6B981] group-hover:text-[#330027]"
            style={{
              left: `clamp(24px, ${position}%, calc(100% - 24px))`,
            }}
          >
            <span className="font-secondary text-[13px] font-bold leading-none">
              ↔
            </span>
          </div>

          {/* Functional slider */}
          <input
            type="range"
            min="5"
            max="95"
            value={position}
            onChange={(event) => setPosition(Number(event.target.value))}
            aria-label={`${item.title} before and after slider`}
            className="absolute inset-0 z-40 h-full w-full cursor-ew-resize opacity-0"
          />
        </div>

        {/* Bottom Panel */}
        <div className="bg-gradient-to-br from-[#982086] via-[#861876] to-[#5a064d] px-4 py-3.5">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <h3 className="font-primary text-[11px] font-semibold uppercase leading-[1.25] tracking-[2.4px] text-white">
                {item.title}
              </h3>

              <p className="mt-1 font-secondary text-[9px] leading-[1.45] text-white/75">
                {item.subtitle}
              </p>
            </div>

            <div className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/35 text-[#D6B981] transition duration-500 group-hover:bg-white group-hover:text-[#8b1d72]">
              <span className="absolute inset-0 rounded-full bg-[#D6B981]/15 blur-sm" />
              <span className="relative text-[13px] leading-none">✦</span>
            </div>
          </div>

          {/* <div className="mt-3 h-px w-full bg-white/25" /> */}

          <div className="mt-2.5 h-[2px] w-full rounded-full bg-white/20">
            <div
              className="h-full rounded-full bg-[#D6B981] transition-all duration-200"
              style={{ width: `${100 - position}%` }}
            />
          </div>
        </div>
      </div>
    </motion.article>
  );
}