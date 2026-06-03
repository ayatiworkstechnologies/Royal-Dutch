"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const blogs = [
  {
    title:
      "Your Skin At 35 Isn’t Aging Overnight, It’s Asking For Better Care",
    desc: "Anti-Aging Without Injectables: Can Luxe Facials Delay Fine Lines in...",
    image: "/images/blog-1.jpg",
    href: "#",
  },
  {
    title:
      "Your Skin At 35 Isn’t Aging Overnight, It’s Asking For Better Care",
    desc: "Anti-Aging Without Injectables: Can Luxe Facials Delay Fine Lines in...",
    image: "/images/blog-1.jpg",
    href: "#",
  },
  {
    title:
      "Your Skin At 35 Isn’t Aging Overnight, It’s Asking For Better Care",
    desc: "Anti-Aging Without Injectables: Can Luxe Facials Delay Fine Lines in...",
    image: "/images/blog-1.jpg",
    href: "#",
  },
  {
    title:
      "Your Skin At 35 Isn’t Aging Overnight, It’s Asking For Better Care",
    desc: "Anti-Aging Without Injectables: Can Luxe Facials Delay Fine Lines in...",
    image: "/images/blog-1.jpg",
    href: "#",
  },
];

const cardsWrapperVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.45,
    },
  },
};

export default function BlogSection() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const scrollNext = () => {
    const el = scrollRef.current;
    if (!el) return;

    const card = el.querySelector("[data-blog-card]") as HTMLElement | null;
    const gap = 24;
    const scrollAmount = card ? card.offsetWidth + gap : el.clientWidth;

    const isEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 20;

    if (isEnd) {
      el.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      el.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const scrollPrev = () => {
    const el = scrollRef.current;
    if (!el) return;

    const card = el.querySelector("[data-blog-card]") as HTMLElement | null;
    const gap = 24;
    const scrollAmount = card ? card.offsetWidth + gap : el.clientWidth;

    el.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  };

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      scrollNext();
    }, 3000);

    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section className="w-full overflow-hidden bg-white px-4 py-8 md:px-6 md:py-10 lg:px-8 lg:py-12">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-9">
          <motion.p
            className="mb-4 font-secondary text-[11px] font-medium tracking-[2.5px] text-[#8b1d72]"
            initial={{ opacity: 0, y: -18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              ease: smoothEase,
            }}
            viewport={{ once: true, amount: 0.3 }}
          >
            Our Blogs
          </motion.p>

          <motion.h2
            className="max-w-5xl font-primary text-[24px] font-medium uppercase leading-[1.35] tracking-[6px] text-black md:text-[30px]"
            initial={{ opacity: 0, x: -70 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 1.45,
              delay: 0.15,
              ease: smoothEase,
            }}
            viewport={{ once: true, amount: 0.3 }}
          >
            Expert Insights For Healthy, Radiant Skin
          </motion.h2>

          <motion.p
            className="mt-5 max-w-6xl font-secondary text-[13px] leading-[1.65] tracking-[2px] text-[#8b8b8b] md:text-[14px]"
            initial={{ opacity: 0, x: 70 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 1.45,
              delay: 0.3,
              ease: smoothEase,
            }}
            viewport={{ once: true, amount: 0.3 }}
          >
            Stay updated with expert skincare tips, beauty treatments, and
            wellness insights from Royal Dutch Clinic. Explore helpful articles
            on advanced aesthetic care, skin health, laser treatments, facial
            therapies, and self-care guidance to help you feel confident inside
            and out.
          </motion.p>
        </div>

        {/* Blog Cards Carousel */}
        <motion.div
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          variants={cardsWrapperVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {blogs.map((blog, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.article
                key={index}
                data-blog-card
                className="snap-start shrink-0 basis-full sm:basis-[calc((100%-24px)/2)] lg:basis-[calc((100%-72px)/4)]"
                variants={{
                  hidden: {
                    opacity: 0,
                    y: isEven ? 65 : -65,
                    scale: 0.96,
                  },
                  show: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      duration: 1.2,
                      ease: smoothEase,
                    },
                  },
                }}
              >
                <Link href={blog.href} className="group block">
                  {/* Image */}
                  <div className="relative h-[230px] w-full overflow-hidden rounded-[6px] bg-[#f2eeee] sm:h-[210px] lg:h-[190px]">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-center transition duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="pt-4">
                    <h3 className="font-primary text-[15px] font-semibold uppercase leading-[1.35] tracking-[0.7px] text-black transition group-hover:text-[#8b1d72]">
                      {blog.title}
                    </h3>

                    <p className="mt-4 font-secondary text-[13px] leading-[1.55] tracking-[1.6px] text-[#aaa]">
                      {blog.desc}
                    </p>

                    <span className="mt-6 inline-block font-primary text-[13px] font-semibold uppercase tracking-[2px] text-black transition group-hover:text-[#8b1d72]">
                      Learn More
                    </span>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Mobile + Tablet Arrows */}
        <motion.div
          className="mt-6 flex justify-center gap-4 lg:hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.4,
            ease: smoothEase,
          }}
          viewport={{ once: true }}
        >
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Previous blog"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#8b1d72]/15 bg-white text-[#8b1d72] transition hover:bg-[#8b1d72] hover:text-white"
          >
            <span className="flex h-full w-full items-center justify-center pb-[3px] text-[30px] leading-none">
              ‹
            </span>
          </button>

          <button
            type="button"
            onClick={scrollNext}
            aria-label="Next blog"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#8b1d72]/15 bg-white text-[#8b1d72] transition hover:bg-[#8b1d72] hover:text-white"
          >
            <span className="flex h-full w-full items-center justify-center pb-[3px] text-[30px] leading-none">
              ›
            </span>
          </button>
        </motion.div>

        {/* More Blogs Button */}
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.55,
            ease: smoothEase,
          }}
          viewport={{ once: true }}
        >
          <Link
            href="#"
            className="rounded-full bg-[#b567a1] px-7 py-3 font-primary text-[12px] font-semibold uppercase tracking-[3px] text-white transition hover:bg-[#8b1d72]"
          >
            More Blogs
          </Link>
        </motion.div>
      </div>
    </section>
  );
}