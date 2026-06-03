export default function WhatWeDoSection() {
  return (
    <section className="relative overflow-hidden bg-[#fbfaf8] px-4 py-10 md:px-6 md:py-12 lg:px-8 lg:py-14">
      {/* Premium Background Effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-120px] top-[-120px] h-[300px] w-[300px] rounded-full bg-[#8b1d72]/10 blur-[90px]" />
        <div className="absolute bottom-[-130px] right-[-120px] h-[340px] w-[340px] rounded-full bg-[#d6b981]/22 blur-[100px]" />
        <div className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70 blur-[80px]" />
      </div>

      {/* Subtle Pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(139,29,114,0.07)_1px,transparent_0)] [background-size:26px_26px] opacity-40" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[24px] border border-[#eadde4] bg-white/85 px-4 py-9 text-center backdrop-blur-md sm:px-6 sm:py-11 md:px-10 md:py-13 lg:px-16 lg:py-14">
          {/* Decorative Corner Lines */}
          <div className="pointer-events-none absolute left-5 top-5 h-10 w-10 border-l border-t border-[#d6b981] sm:left-6 sm:top-6 sm:h-12 sm:w-12" />
          <div className="pointer-events-none absolute right-5 top-5 h-10 w-10 border-r border-t border-[#d6b981] sm:right-6 sm:top-6 sm:h-12 sm:w-12" />

          {/* Hide bottom corners on mobile to avoid collision */}
          <div className="pointer-events-none absolute bottom-6 left-6 hidden h-12 w-12 border-b border-l border-[#d6b981] sm:block" />
          <div className="pointer-events-none absolute bottom-6 right-6 hidden h-12 w-12 border-b border-r border-[#d6b981] sm:block" />

          {/* Top Badge */}
          <div className="mb-5 flex justify-center md:mb-6">
            <span className="rounded-full border border-[#8b1d72]/15 bg-[#8b1d72]/5 px-5 py-2 font-secondary text-[10px] font-semibold uppercase tracking-[3px] text-[#8b1d72] md:text-[11px]">
              What We Do
            </span>
          </div>

          {/* Heading */}
          <h2 className="mx-auto max-w-4xl font-primary text-[22px] font-medium uppercase leading-[1.45] tracking-[4px] text-black sm:text-[25px] md:text-[30px] md:tracking-[6px] lg:text-[32px]">
            We Provide Natural Treatments
          </h2>

          {/* Gold Divider */}
          <div className="mx-auto mt-5 flex items-center justify-center gap-3 md:mt-6 md:gap-4">
            <span className="h-px w-12 bg-[#d6b981] md:w-16" />
            <span className="h-2 w-2 rotate-45 bg-[#d6b981]" />
            <span className="h-px w-12 bg-[#d6b981] md:w-16" />
          </div>

          {/* Description */}
          <p className="mx-auto mt-7 max-w-[980px] font-secondary text-[16px] font-light leading-[1.75] tracking-[1.2px] text-[#777] sm:text-[18px] md:mt-8 md:text-[21px] md:leading-[1.65] md:tracking-[1.4px] lg:text-[24px]">
            We provide{" "}
            <span className="font-semibold text-black">
              natural and clinical treatments
            </span>{" "}
            focused on precision-driven care for long-lasting skin health. Our
            approach is{" "}
            <span className="font-semibold text-black">toxin-free</span>{" "}
            and uses organic, nature-powered products with proven{" "}
            <span className="font-semibold text-black">
              effectiveness, ensuring safe,
            </span>{" "}
            balanced treatments with no side effects.
          </p>

          {/* Bottom Highlight */}
          <div className="mx-auto mt-7 grid max-w-4xl grid-cols-1 gap-3 sm:mt-9 sm:grid-cols-3 sm:gap-4">
            <div className="rounded-[14px] border border-[#eadde4] bg-white/70 px-4 py-3 transition duration-300 hover:border-[#d6b981] hover:bg-[#fbfaf8] sm:px-5 sm:py-4">
              <p className="font-primary text-[11px] uppercase tracking-[3px] text-[#8b1d72] sm:text-[12px]">
                Natural Care
              </p>
            </div>

            <div className="rounded-[14px] border border-[#eadde4] bg-white/70 px-4 py-3 transition duration-300 hover:border-[#d6b981] hover:bg-[#fbfaf8] sm:px-5 sm:py-4">
              <p className="font-primary text-[11px] uppercase tracking-[3px] text-[#8b1d72] sm:text-[12px]">
                Clinical Precision
              </p>
            </div>

            <div className="rounded-[14px] border border-[#eadde4] bg-white/70 px-4 py-3 transition duration-300 hover:border-[#d6b981] hover:bg-[#fbfaf8] sm:px-5 sm:py-4">
              <p className="font-primary text-[11px] uppercase tracking-[3px] text-[#8b1d72] sm:text-[12px]">
                Safe Results
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}