"use client";

import ContactExpertsSection from "@/components/Contactpage/ContactExpertsSection";
import ContactFormMapSection from "@/components/Contactpage/ContactFormMapSection";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-white">
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

      {/* {Section 1 : contact Expert section} */}
      <ContactExpertsSection />

      {/* {Section2 : contact form+map section} */}
      <ContactFormMapSection />


      
    </main>
  );
}