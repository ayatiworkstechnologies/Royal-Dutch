"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import TransformationStories from "@/components/Our-Works/TransformationStories";



const smoothEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function OurWorksPage() {
  return (
    <main className="min-h-screen bg-white">
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
                  src="/images/our-works-banner-mobile.png"
                  alt="Royal Dutch Medical Centre Mobile Banner"
                  width={768}
                  height={900}
                  priority
                  sizes="100vw"
                  className="block h-auto w-full object-contain md:hidden"
                />
      
                {/* Tablet / Laptop / Desktop Banner */}
                <Image
                  src="/images/our-works-banner-desktop.png"
                  alt="Royal Dutch Medical Centre Banner"
                  width={1920}
                  height={800}
                  priority
                  sizes="100vw"
                  className="hidden h-auto w-full object-contain md:block"
                />
              </motion.div>
            </motion.section>

      {/* Our Works Section */}
      <TransformationStories />
      
    </main>
  );
}