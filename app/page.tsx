import FloatingButtons from "@/components/FloatingButtons";
import BlogSection from "@/components/Homepage/BlogSection";
import ResultsSection from "@/components/Homepage/ResultsSection";
import ServiceLegacySection from "@/components/Homepage/ServiceLegacySection";
import TestimonialSection from "@/components/Homepage/TestimonialSection";
import TreatmentCarousel from "@/components/Homepage/TreatmentCarousel";
import WhatWeDoSection from "@/components/Homepage/WhatWeDoSection";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Banner Section */}
      <section className="relative w-full overflow-hidden">
        <Image
          src="/images/homepage-banner.jpg"
          alt="Royal Dutch Medical Centre Banner"
          width={1920}
          height={800}
          priority
          className="h-auto w-full object-cover"
        />
      </section>
      {/* {What We Do Section} */}
      <WhatWeDoSection />
      {/* {Treatement Carousel section} */}
      <TreatmentCarousel />
      {/* {Service section} */}
      <ServiceLegacySection />
      {/* {Result Section} */}
      <ResultsSection />
      {/* {testimonial section} */}
      <TestimonialSection />
      {/* {Blog section} */}
      <BlogSection />
      {/* {Floating icons} */}
      <FloatingButtons />
    </main>
  );
}