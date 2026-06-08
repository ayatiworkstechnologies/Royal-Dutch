"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type DynamicBannerProps = {
  image: string;
  imageAlt?: string;
  heightClass?: string;
  priority?: boolean;
};

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function DynamicBanner({
  image,
  imageAlt = "Royal Dutch Medical Centre Banner",
  heightClass = "h-[420px] sm:h-[500px] lg:h-[600px]",
  priority = true,
}: DynamicBannerProps) {
  return (
    <section className={`relative w-full overflow-hidden ${heightClass}`}>
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 1.4,
          ease: smoothEase,
        }}
      >
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority={priority}
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>
    </section>
  );
}