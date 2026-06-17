"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type TimelineStep = {
  title: string;
  description: string;
};

type TimelineStepsProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  steps: TimelineStep[];
};

export default function TimelineSteps({
  eyebrow = "Treatment Steps",
  title,
  description,
  steps,
}: TimelineStepsProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const lineFillRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const lineFill = lineFillRef.current;

    if (!section || !track || !lineFill) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".timeline-card");
      const dots = gsap.utils.toArray<HTMLElement>(".timeline-dot");
      const titles = gsap.utils.toArray<HTMLElement>(".timeline-title");
      const texts = gsap.utils.toArray<HTMLElement>(".timeline-text");
      const numbers = gsap.utils.toArray<HTMLElement>(".timeline-number");

      const getScrollAmount = () => {
        const amount = track.scrollWidth - window.innerWidth + 160;
        return amount > 0 ? -amount : 0;
      };

      const premiumGradient =
        "radial-gradient(circle at 82% 42%, rgba(206, 58, 156, 0.48) 0%, transparent 42%), radial-gradient(circle at 10% 100%, rgba(58, 8, 53, 0.95) 0%, transparent 45%), linear-gradient(135deg, #4A0A42 0%, #73135F 32%, #A22582 62%, #5A104E 100%)";

      const setActive = (index: number, active: boolean) => {
        if (!cards[index]) return;

        gsap.to(cards[index], {
          background: active ? premiumGradient : "#ffffff",
          borderColor: active ? "#B83B9D" : "#f0e2ed",
          boxShadow: "none",
          duration: 0.35,
          overwrite: true,
        });

        gsap.to(titles[index], {
          color: active ? "#ffffff" : "#222222",
          duration: 0.35,
          overwrite: true,
        });

        gsap.to(texts[index], {
          color: active ? "#ffffff" : "#9a9a9a",
          duration: 0.35,
          overwrite: true,
        });

        gsap.to(numbers[index], {
          scale: active ? 1.1 : 1,
          opacity: active ? 1 : 0.82,
          filter: active
            ? "drop-shadow(0 10px 20px rgba(74,10,66,0.35))"
            : "drop-shadow(0 6px 12px rgba(74,10,66,0.18))",
          duration: 0.35,
          overwrite: true,
        });

        gsap.to(dots[index], {
          scale: active ? 1.25 : 1,
          backgroundColor: active ? "#C94BA8" : "#8b1d72",
          duration: 0.35,
          overwrite: true,
        });
      };

      gsap.set(lineFill, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      gsap.set(".timeline-step", {
        opacity: 0,
        x: 90,
      });

      cards.forEach((_, index) => setActive(index, false));

      gsap.to(".timeline-step", {
        opacity: 1,
        x: 0,
        duration: 1.15,
        ease: "power3.out",
        stagger: {
          each: 0.12,
          from: "end",
        },
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          once: true,
        },
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${Math.abs(getScrollAmount()) + 900}`,
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: () => {
            const fillRect = lineFill.getBoundingClientRect();
            const fillEnd = fillRect.left + fillRect.width;

            dots.forEach((dot, index) => {
              const dotRect = dot.getBoundingClientRect();
              const dotCenter = dotRect.left + dotRect.width / 2;
              setActive(index, fillEnd >= dotCenter);
            });
          },
        },
      });

      timeline
        .to(track, { x: getScrollAmount, ease: "none" }, 0)
        .to(lineFill, { scaleX: 1, ease: "none" }, 0);

      ScrollTrigger.refresh();
    }, section);

    return () => ctx.revert();
  }, [steps.length]);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative hidden h-screen overflow-hidden bg-white md:block"
      >
        <div className="flex h-full items-center overflow-hidden">
          <div className="w-full">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="max-w-[720px]">
                {eyebrow && (
                  <p className="mb-4 font-secondary text-[12px] font-semibold uppercase tracking-[2.8px] text-[#b657a2]">
                    {eyebrow}
                  </p>
                )}

                <h2 className="font-primary text-[30px] font-medium uppercase leading-[1.35] tracking-[6px] text-[#111] lg:text-[38px]">
                  {title}
                </h2>

                {description && (
                  <p className="mt-5 max-w-[620px] font-secondary text-[14px] font-medium leading-[1.75] tracking-[1.5px] text-[#9a9a9a] lg:text-[15px]">
                    {description}
                  </p>
                )}
              </div>
            </div>

            <div className="relative mt-16 overflow-hidden">
              <div
                ref={trackRef}
                className="relative flex w-max gap-20 pl-[24px] pr-[140px] will-change-transform lg:gap-24 xl:pl-[calc((100vw-1280px)/2+24px)]"
              >
                <div className="absolute left-[31px] right-0 top-[72px] h-px bg-[#eee7df] xl:left-[calc((100vw-1280px)/2+31px)]" />

                <div
                  ref={lineFillRef}
                  className="absolute left-[31px] right-0 top-[72px] h-px bg-gradient-to-r from-[#4A0A42] via-[#B83B9D] to-[#8B1D72] xl:left-[calc((100vw-1280px)/2+31px)]"
                />

                {steps.map((step, index) => {
                  const number = String(index + 1).padStart(2, "0");

                  return (
                    <article
                      key={`${step.title}-${index}`}
                      className="timeline-step relative w-[330px] shrink-0 lg:w-[380px]"
                    >
                      <p className="timeline-number bg-[linear-gradient(180deg,#FFD8F6_0%,#D86FC0_18%,#B83B9D_42%,#8B1D72_68%,#4A0A42_100%)] bg-clip-text font-primary text-[52px] font-semibold leading-none tracking-[2px] text-transparent drop-shadow-[0_6px_12px_rgba(74,10,66,0.18)] lg:text-[62px]">
                        {number}
                      </p>

                      <div className="relative mt-4">
                        <span className="timeline-dot relative z-10 flex h-[15px] w-[15px] items-center justify-center rounded-full bg-[#8b1d72] ring-[8px] ring-white">
                          <span className="h-[5px] w-[5px] rounded-full bg-white/90" />
                        </span>
                      </div>

                      <div className="timeline-card relative mt-7 flex min-h-[260px] flex-col overflow-hidden rounded-[24px] border border-[#f0e2ed] bg-white p-7 pr-6 shadow-none">
                        <div className="relative z-10">
                          <h3 className="timeline-title font-primary text-[18px] font-semibold uppercase leading-[1.35] tracking-[1.5px] text-[#222] lg:text-[19px]">
                            {step.title}
                          </h3>

                          <p className="timeline-text mt-5 font-secondary text-[14px] font-medium leading-[1.75] tracking-[1.15px] text-[#9a9a9a] lg:text-[15px]">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative block overflow-hidden bg-white px-4 py-14 sm:px-6 md:hidden">
        <div className="mx-auto max-w-xl">
          {eyebrow && (
            <p className="mb-4 font-secondary text-[12px] font-semibold uppercase tracking-[2.8px] text-[#b657a2]">
              {eyebrow}
            </p>
          )}

          <h2 className="font-primary text-[25px] font-medium uppercase leading-[1.35] tracking-[5px] text-[#111]">
            {title}
          </h2>

          {description && (
            <p className="mt-5 font-secondary text-[14px] font-medium leading-[1.75] tracking-[1.2px] text-[#9a9a9a]">
              {description}
            </p>
          )}

          <div className="relative mt-12 space-y-10">
            <div className="absolute left-[20px] top-[48px] h-[calc(100%-48px)] w-px bg-[#eee7df]" />

            {steps.map((step, index) => {
              const number = String(index + 1).padStart(2, "0");

              return (
                <div key={`${step.title}-${index}`} className="relative pl-14">
                  <span className="absolute left-[13px] top-[48px] z-10 flex h-[15px] w-[15px] items-center justify-center rounded-full bg-[#8b1d72] ring-[7px] ring-white">
                    <span className="h-[5px] w-[5px] rounded-full bg-white/90" />
                  </span>

                  <p className="bg-[linear-gradient(180deg,#FFD8F6_0%,#D86FC0_18%,#B83B9D_42%,#8B1D72_68%,#4A0A42_100%)] bg-clip-text font-primary text-[46px] font-semibold leading-none tracking-[2px] text-transparent drop-shadow-[0_6px_12px_rgba(74,10,66,0.18)]">
                    {number}
                  </p>

                  <div className="relative mt-5 flex min-h-[230px] flex-col overflow-hidden rounded-[22px] border border-[#B83B9D] bg-[radial-gradient(circle_at_82%_42%,rgba(206,58,156,0.48)_0%,transparent_42%),radial-gradient(circle_at_10%_100%,rgba(58,8,53,0.95)_0%,transparent_45%),linear-gradient(135deg,#4A0A42_0%,#73135F_32%,#A22582_62%,#5A104E_100%)] p-6 shadow-none">
                    <div className="relative z-10">
                      <h3 className="font-primary text-[17px] font-semibold uppercase leading-[1.35] tracking-[1.3px] text-white">
                        {step.title}
                      </h3>

                      <p className="mt-4 font-secondary text-[14px] font-medium leading-[1.75] tracking-[1.1px] text-white">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}