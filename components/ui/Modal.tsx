"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "5xl";
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "md",
}: ModalProps) {
  // ============================================================
  // LOCK BACKGROUND SCROLL
  // ============================================================

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // ============================================================
  // MODAL WIDTH
  // ============================================================

  const maxWidthClass = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "5xl": "max-w-5xl",
  }[maxWidth];

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="
            fixed
            inset-0
            z-[99999]
            flex
            items-center
            justify-center
            p-4
            sm:p-5
          "
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* =====================================================
              BACKDROP
          ===================================================== */}

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
            }}
            onClick={onClose}
            className="
              absolute
              inset-0
              bg-black/50
              backdrop-blur-sm
            "
          />

          {/* =====================================================
              MODAL CONTAINER
          ===================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.96,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.96,
              y: 20,
            }}
            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}
            onClick={(e) => e.stopPropagation()}
            className={`
              relative
              z-10
              flex
              w-full
              ${maxWidthClass}
              max-h-[calc(100dvh-40px)]
              flex-col
              overflow-hidden
              rounded-xl
              bg-white
              shadow-2xl
            `}
          >
            {/* =====================================================
                HEADER
            ===================================================== */}

            <div
              className="
                relative
                flex
                min-h-[68px]
                shrink-0
                items-center
                border-b
                border-gray-100
                bg-white
                px-6
                py-4
              "
            >
              {/* TITLE */}

              <h3
                id="modal-title"
                className="
                  pr-16
                  text-lg
                  font-semibold
                  text-gray-900
                  font-cinzel
                "
              >
                {title}
              </h3>

              {/* =================================================
                  CLOSE BUTTON
              ================================================= */}

              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="
                  absolute
                  right-4
                  top-1/2
                  z-50
                  flex
                  h-10
                  w-10
                  -translate-y-1/2
                  cursor-pointer
                  items-center
                  justify-center
                  rounded-full
                  text-gray-400
                  transition-all
                  duration-200

                  hover:bg-gray-100
                  hover:text-gray-700

                  focus:outline-none
                  focus:ring-2
                  focus:ring-[#8b2872]/20

                  sm:right-5
                "
              >
                <X
                  className="
                    block
                    h-5
                    w-5
                    shrink-0
                  "
                  strokeWidth={2}
                />
              </button>
            </div>

            {/* =====================================================
                SCROLLABLE CONTENT
            ===================================================== */}

            <div
              className="
                min-h-0
                flex-1
                overflow-x-hidden
                overflow-y-auto
                overscroll-contain
                px-6
                py-4
              "
            >
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}