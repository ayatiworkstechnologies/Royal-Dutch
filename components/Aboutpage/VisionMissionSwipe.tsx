"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    title: "Our Vision",
    text: "To be the leading multi-center dermatology and aesthetic brand in the UAE, known for innovation, integrity, and international clinical standards.",
    image: "/images/our-vision.png",
  },
  {
    title: "Our Mission",
    text: "To empower individuals by enhancing their confidence and wellness through world-class skin, hair, and body treatments — guided by medical expertise and fueled by passion for care.",
    image: "/images/our-mission.png",
  },
];

export default function VisionMissionStack() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const cardItems = gsap.utils.toArray<HTMLElement>(".vm-card");
      const firstCard = cardItems[0];
      const secondCard = cardItems[1];

      const firstContent = firstCard.querySelector(".vm-content");
      const firstImage = firstCard.querySelector(".vm-image");
      const secondContent = secondCard.querySelector(".vm-content");
      const secondImage = secondCard.querySelector(".vm-image");

      gsap.set(firstCard, {
        yPercent: 0,
        scale: 1,
        opacity: 1,
        zIndex: 1,
      });

      gsap.set(secondCard, {
        yPercent: 105,
        scale: 0.98,
        opacity: 1,
        zIndex: 2,
      });

      gsap.set(firstContent, {
        y: 0,
        opacity: 1,
      });

      gsap.set(secondContent, {
        y: 80,
        opacity: 0,
      });

      gsap.set(firstImage, {
        scale: 1.08,
      });

      gsap.set(secondImage, {
        scale: 1.12,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=1200",
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        firstCard,
        {
          scale: 0.94,
          opacity: 0.55,
          ease: "none",
        },
        0
      )
        .to(
          firstContent,
          {
            y: -45,
            opacity: 0.35,
            ease: "none",
          },
          0
        )
        .to(
          firstImage,
          {
            scale: 1,
            ease: "none",
          },
          0
        )
        .to(
          secondCard,
          {
            yPercent: 0,
            scale: 1,
            ease: "none",
          },
          0
        )
        .to(
          secondContent,
          {
            y: 0,
            opacity: 1,
            ease: "none",
          },
          0.2
        )
        .to(
          secondImage,
          {
            scale: 1,
            ease: "none",
          },
          0
        );

      ScrollTrigger.refresh();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-white"
    >
      {cards.map((item, index) => (
        <article
          key={item.title}
          className="vm-card absolute inset-0 grid h-screen w-full grid-cols-1 overflow-hidden bg-white md:grid-cols-2"
        >
          {/* Left Content */}
          <div className="vm-content flex flex-col justify-center bg-white px-6 py-12 text-center md:px-16 md:text-left lg:px-24 xl:px-28">
            <div className="mx-auto max-w-[560px] md:mx-0">
              <div className="mb-8 flex items-center justify-center gap-4 md:justify-start">
                <span className="h-px w-14 bg-[#d6b981]" />
                <span className="font-secondary text-[11px] font-semibold uppercase tracking-[4px] text-[#9b1b7a]">
                  {index === 0 ? "Vision" : "Mission"}
                </span>
              </div>

              <h2 className="font-primary text-[28px] font-medium uppercase leading-[1.25] tracking-[7px] text-[#111] sm:text-[34px] md:text-[40px] lg:text-[46px]">
                {item.title}
              </h2>

              <p className="mt-7 font-secondary text-[14px] font-medium leading-[1.85] tracking-[1.4px] text-[#7d7d7d] sm:text-[15px] md:text-[16px]">
                {item.text}
              </p>

              <div className="mt-9 flex items-center justify-center gap-3 md:justify-start">
                <span className="h-px w-20 bg-[#d6b981]" />
                <span className="h-2 w-2 rotate-45 bg-[#d6b981]" />
                <span className="h-px w-20 bg-[#d6b981]" />
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative h-[360px] w-full overflow-hidden md:h-screen">
            <Image
              src={item.image}
              alt={item.title}
              fill
              priority={index === 0}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="vm-image object-cover object-center"
            />

            <div className="pointer-events-none absolute inset-0 bg-black/5" />
          </div>
        </article>
      ))}
    </section>
  );
}