"use client";

import BlogSection from "@/components/Homepage/BlogSection";
import ResultsSection from "@/components/Homepage/ResultsSection";
import ServiceLegacySection from "@/components/Homepage/ServiceLegacySection";
import TestimonialSection from "@/components/Homepage/TestimonialSection";
import TreatmentCarousel from "@/components/Homepage/TreatmentCarousel";
import WhatWeDoSection from "@/components/Homepage/WhatWeDoSection";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-white">
      {/* Banner Section */}
      <motion.section
        className="relative w-full overflow-hidden bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
      >
        <motion.div
          initial={{ scale: 1.03 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 1.5,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {/* Mobile Banner */}
          <Image
            src="/images/mobile-banner-1.png"
            alt="Royal Dutch Medical Centre Mobile Banner"
            width={768}
            height={900}
            priority
            sizes="100vw"
            className="block h-auto w-full object-contain md:hidden"
          />

          {/* Tablet / Laptop / Desktop Banner */}
          <Image
            src="/images/desktop-banner-2.png"
            alt="Royal Dutch Medical Centre Banner"
            width={1920}
            height={800}
            priority
            sizes="100vw"
            className="hidden h-auto w-full object-contain md:block"
          />
        </motion.div>
      </motion.section>

      {/* What We Do Section */}
      <WhatWeDoSection />

      {/* Treatment Carousel Section */}
      <TreatmentCarousel />

      {/* Service Section */}
      <ServiceLegacySection />

      {/* Result Section */}
      <ResultsSection />

      {/* Testimonial Section */}
      <TestimonialSection />

      {/* Blog Section */}
      <BlogSection />


    </main>
  );
}