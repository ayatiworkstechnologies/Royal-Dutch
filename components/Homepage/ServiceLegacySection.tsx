import Image from "next/image";
import Link from "next/link";

export default function ServiceLegacySection() {
  return (
    <section className="w-full bg-white py-16 md:py-20 lg:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-[0.9fr_1.4fr] md:px-8 lg:gap-16">
        {/* Left Image */}
        <div className="flex justify-center md:justify-start">
          <div className="relative w-full max-w-[285px] rounded-[12px] bg-white p-[7px] shadow-[0_10px_35px_rgba(0,0,0,0.16)] sm:max-w-[310px]">
            <div className="relative overflow-hidden rounded-[8px] border border-[#d6b981]/70">
              <Image
                src="/images/service-legacy.jpg"
                alt="Royal Dutch Dermatology and Aesthetics Service"
                width={500}
                height={680}
                priority
                className="h-[410px] w-full object-cover object-center sm:h-[440px] md:h-[420px]"
              />

              {/* Inner Border */}
              <div className="pointer-events-none absolute inset-[6px] rounded-[7px] border border-white/80" />
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="text-center md:text-left">
          <p className="mb-6 font-secondary text-[12px] font-medium tracking-[3px] text-[#a73d8f]">
            Our service
          </p>

          <h2 className="font-primary text-[25px] font-medium uppercase leading-[1.35] tracking-[5px] text-black sm:text-[28px] md:text-[30px] lg:text-[32px]">
            A Legacy Of Excellence In
            <br className="hidden sm:block" />
            Dermatology &amp; Aesthetics
          </h2>

          <p className="mt-7 max-w-[820px] font-secondary text-[13px] font-normal leading-[1.45] tracking-[2.2px] text-[#8c8c8c] md:text-[14px]">
            Established in Ras Al-Khaimah, United Arab Emirates, Royal Dutch
            Medical Centre has earned a reputation as a premier destination for
            advanced dermatology and aesthetic medicine. Founded by seasoned
            Dutch professionals with a vision to redefine clinical care through
            European precision and innovation, Royal Dutch Clinic has grown into
            a trusted brand that delivers personalized beauty and wellness
            solutions with uncompromising quality.
          </p>

          <div className="mt-7 flex justify-center md:justify-start">
            <Link
              href="/#"
              className="rounded-full bg-[#b765a2] px-5 py-2 font-primary text-[12px] font-semibold uppercase tracking-[1px] text-white transition duration-300 hover:bg-[#D6B981] hover:text-[#200020]"
            >
              Know More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}