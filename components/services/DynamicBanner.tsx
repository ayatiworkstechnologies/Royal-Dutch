"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type DynamicBannerProps = {
  desktopImage: string;
  mobileImage: string;
  imageAlt?: string;
  priority?: boolean;
};

export default function DynamicBanner({
  desktopImage,
  mobileImage,
  imageAlt = "Royal Dutch Medical Centre Banner",
  priority = true,
}: DynamicBannerProps) {
  return (
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
          src={mobileImage}
          alt={imageAlt}
          width={768}
          height={900}
          priority={priority}
          sizes="100vw"
          className="block h-auto w-full object-contain md:hidden"
        />

        {/* Tablet / Laptop / Desktop Banner */}
        <Image
          src={desktopImage}
          alt={imageAlt}
          width={1920}
          height={800}
          priority={priority}
          sizes="100vw"
          className="hidden h-auto w-full object-contain md:block"
        />
      </motion.div>
    </motion.section>
  );
}