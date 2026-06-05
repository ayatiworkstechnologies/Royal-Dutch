"use client";

import { motion } from "framer-motion";

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const contactItems = [
  {
    title: "Email",
    value: "info@royaldutchclinic.ae",
    href: "mailto:info@royaldutchclinic.ae",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
        <path
          d="M4 6.5h16v11H4v-11Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M4.5 7l7.5 6 7.5-6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Location",
    value:
      "Royal Dutch Clinic LLC Al Naeem Tower - 504 Bin Daher St - Al Nakheel - Ras Al Khaimah - United Arab Emirates",
    href: "https://maps.app.goo.gl/Z1Jk291XWtEadC949",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
        <path
          d="M12 21s6-5.1 6-11a6 6 0 1 0-12 0c0 5.9 6 11 6 11Z"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M12 12.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Z"
          stroke="currentColor"
          strokeWidth="1.8"
        />
      </svg>
    ),
  },
  {
    title: "Phone",
    value: "+971 50 947 9001",
    href: "tel:+971509479001",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
        <path
          d="M7.2 4.5 9.4 8c.4.6.3 1.4-.2 1.9l-1 1c1.3 2.4 3.2 4.3 5.7 5.6l1-1c.5-.5 1.3-.6 1.9-.2l3.4 2.2c.7.4.9 1.3.5 2-.5.9-1.5 1.5-2.6 1.5C10.7 21 3 13.3 3 5.9c0-1.1.6-2.1 1.5-2.6.7-.4 1.6-.2 2 .5Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function ContactExpertsSection() {
  return (
    <section className="relative overflow-hidden bg-[#fbfaf8] px-4 py-14 sm:px-6 md:py-16 lg:px-8 lg:py-20">
      {/* Soft paper-like background */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.025)_1px,transparent_1px),linear-gradient(0deg,rgba(0,0,0,0.018)_1px,transparent_1px)] bg-[size:18px_18px] opacity-[0.28]" />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.9),rgba(251,250,248,0.72))]" />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: smoothEase }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <p className="font-primary text-[22px] font-medium uppercase leading-tight tracking-[7px] text-[#1f1f1f] sm:text-[25px] md:text-[28px]">
            Contact Our Experts
          </p>

          <p className="mx-auto mt-5 max-w-[700px] font-secondary text-[14px] font-normal leading-[1.6] tracking-[1.5px] text-[#9a9a9a] sm:text-[15px]">
            Have questions or need guidance? Our dermatology team is ready to
            assist you with expert advice and advanced treatment solutions.
          </p>
        </motion.div>

        {/* Contact Items */}
        <motion.div
          className="mx-auto mt-14 grid max-w-[980px] grid-cols-1 gap-0 overflow-hidden md:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.18,
                delayChildren: 0.25,
              },
            },
          }}
        >
          {contactItems.map((item, index) => (
            <motion.div
              key={item.title}
              className={`relative px-6 py-8 md:px-8 md:py-5 ${
                index !== contactItems.length - 1
                  ? "border-b border-[#dedede] md:border-b-0 md:border-r"
                  : ""
              }`}
              variants={{
                hidden: { opacity: 0, y: 28 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.95,
                    ease: smoothEase,
                  },
                },
              }}
            >
              <a
                href={item.href}
                target={item.title === "Location" ? "_blank" : undefined}
                rel={
                  item.title === "Location" ? "noopener noreferrer" : undefined
                }
                className="group block"
              >
                <div className="mb-5 flex items-center justify-center gap-2.5 text-[#222]">
                  <span className="transition duration-300 group-hover:text-[#8b1d72]">
                    {item.icon}
                  </span>

                  <h3 className="font-primary text-[15px] font-semibold uppercase tracking-[4px] text-[#333] transition duration-300 group-hover:text-[#8b1d72] sm:text-[16px]">
                    {item.title}
                  </h3>
                </div>

                <p className="mx-auto max-w-[260px] font-secondary text-[13px] font-medium leading-[1.6] tracking-[1.3px] text-[#9f9f9f] transition duration-300 group-hover:text-[#777] sm:text-[14px]">
                  {item.value}
                </p>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}