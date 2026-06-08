"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type FAQItem = {
  question: string;
  answer: string;
};

type FaqSectionProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  faqs: FAQItem[];
  defaultOpenIndex?: number | null;
};

const smoothEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function FaqSection({
  eyebrow,
  title = "FAQs",
  description = "Find answers to common questions about this treatment, process, and expected results.",
  faqs,
  defaultOpenIndex = 0,
}: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  return (
    <section className="relative overflow-hidden bg-white px-4 py-14 sm:px-6 md:py-20 lg:px-8 lg:py-24">
      {/* Soft Background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,29,114,0.035),transparent_42%)]" />

      <div className="relative z-10 mx-auto max-w-[920px]">
        {/* Heading */}
        <motion.div
          className="mx-auto max-w-[760px] text-center"
          initial={{ opacity: 0, y: 36, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: smoothEase }}
          viewport={{ once: true, amount: 0.35 }}
        >
          {eyebrow && (
            <p className="mb-4 font-secondary text-[11px] font-semibold uppercase tracking-[4px] text-[#b657a2] sm:text-[12px]">
              {eyebrow}
            </p>
          )}

          <h2 className="font-primary text-[42px] font-semibold uppercase leading-none tracking-[1px] text-[#111] sm:text-[54px] md:text-[66px]">
            {title}
          </h2>

          {description && (
            <p className="mx-auto mt-7 max-w-[720px] font-secondary text-[14px] font-medium leading-[1.8] tracking-[0.4px] text-[#333] sm:text-[15px] md:text-[17px]">
              {description}
            </p>
          )}
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          className="mt-10 space-y-4 sm:mt-12"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.13,
                delayChildren: 0.2,
              },
            },
          }}
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={`${faq.question}-${index}`}
                className={`overflow-hidden rounded-[8px] bg-white transition-shadow duration-500 ${
                  isOpen
                    ? "shadow-[0_18px_55px_rgba(0,0,0,0.07)]"
                    : "shadow-[0_12px_36px_rgba(0,0,0,0.045)]"
                }`}
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 34,
                    scale: 0.98,
                    filter: "blur(6px)",
                  },
                  show: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: "blur(0px)",
                    transition: {
                      duration: 0.95,
                      ease: smoothEase,
                    },
                  },
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-7 sm:py-6"
                >
                  <span className="font-primary text-[17px] font-semibold uppercase leading-[1.35] tracking-[0.4px] text-[#151515] sm:text-[19px] md:text-[21px]">
                    {faq.question}
                  </span>

                  <span className="flex h-8 w-8 shrink-0 items-center justify-center text-[#111]">
                    <AnimatePresence mode="wait" initial={false}>
                      {isOpen ? (
                        <motion.svg
                          key="close"
                          viewBox="0 0 24 24"
                          className="h-5 w-5"
                          fill="none"
                          initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                          animate={{ opacity: 1, rotate: 0, scale: 1 }}
                          exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                          transition={{ duration: 0.35, ease: "easeOut" }}
                          aria-hidden="true"
                        >
                          <path
                            d="M6 6L18 18M18 6L6 18"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                          />
                        </motion.svg>
                      ) : (
                        <motion.svg
                          key="arrow"
                          viewBox="0 0 24 24"
                          className="h-5 w-5"
                          fill="none"
                          initial={{ opacity: 0, y: -4, scale: 0.8 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 4, scale: 0.8 }}
                          transition={{ duration: 0.35, ease: "easeOut" }}
                          aria-hidden="true"
                        >
                          <path
                            d="M6 9L12 15L18 9"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </motion.svg>
                      )}
                    </AnimatePresence>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        height: {
                          duration: 0.75,
                          ease: smoothEase,
                        },
                        opacity: {
                          duration: 0.45,
                          ease: "easeOut",
                        },
                      }}
                    >
                      <motion.div
                        className="px-5 pb-6 sm:px-7 sm:pb-7"
                        initial={{ y: -18, filter: "blur(5px)" }}
                        animate={{ y: 0, filter: "blur(0px)" }}
                        exit={{ y: -10, filter: "blur(5px)" }}
                        transition={{
                          duration: 0.6,
                          ease: smoothEase,
                        }}
                      >
                        <p className="max-w-[780px] font-secondary text-[14px] font-medium leading-[1.9] tracking-[0.3px] text-[#333] sm:text-[15px] md:text-[16px]">
                          {faq.answer}
                        </p>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}