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
        className="relative w-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
      >
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 1.5,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Image
            src="/images/contact-banner.png"
            alt="Royal Dutch Medical Centre Banner"
            width={1920}
            height={800}
            priority
            sizes="100vw"
            className="block h-[600px] w-full object-cover"
          />
        </motion.div>
      </motion.section>

      {/* Our Works Section */}
      <TransformationStories />
      
    </main>
  );
}