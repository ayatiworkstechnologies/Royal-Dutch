"use client";

import { useEffect, useState } from "react";

export default function FloatingButtons() {
    const [showTop, setShowTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowTop(window.scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div className="fixed bottom-6 right-5 z-[999] flex flex-col items-center gap-3">

            {/* WhatsApp - floating effect */}
            <a
                href="https://wa.me/971509479001"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="group relative flex h-[52px] w-[52px] animate-bounce items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_14px_35px_rgba(37,211,102,0.35)] transition duration-300 hover:scale-105"
            >
                {/* Pulse ring */}
                <span className="absolute inset-0 rounded-full border border-[#25D366]/50 animate-ping" />

                <svg
                    width="27"
                    height="27"
                    viewBox="0 0 32 32"
                    fill="currentColor"
                    aria-hidden="true"
                    className="relative z-10 transition duration-300 group-hover:scale-110"
                >
                    <path d="M16.04 3C8.88 3 3.06 8.82 3.06 15.98c0 2.29.6 4.52 1.74 6.48L3 29l6.7-1.75a12.9 12.9 0 0 0 6.34 1.62h.01c7.16 0 12.98-5.82 12.98-12.98C29.03 8.82 23.2 3 16.04 3Zm0 23.67h-.01c-1.93 0-3.82-.52-5.47-1.5l-.39-.23-3.97 1.04 1.06-3.87-.25-.4a10.7 10.7 0 0 1-1.64-5.73c0-5.88 4.79-10.67 10.68-10.67 2.85 0 5.53 1.11 7.55 3.13a10.6 10.6 0 0 1 3.12 7.55c0 5.89-4.79 10.68-10.68 10.68Zm5.86-7.99c-.32-.16-1.9-.94-2.2-1.05-.29-.11-.51-.16-.72.16-.21.32-.83 1.05-1.02 1.26-.19.21-.38.24-.7.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.89-1.78-2.21-.19-.32-.02-.49.14-.65.15-.14.32-.38.48-.57.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.74-.99-2.38-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66s1.15 3.09 1.31 3.3c.16.21 2.26 3.45 5.48 4.84.77.33 1.37.53 1.83.68.77.24 1.47.21 2.03.13.62-.09 1.9-.78 2.17-1.53.27-.75.27-1.39.19-1.53-.08-.14-.29-.22-.61-.38Z" />
                </svg>
            </a>
            {/* Arrow Up - no float */}
            <button
                type="button"
                onClick={scrollToTop}
                aria-label="Scroll to top"
                className={`flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-[#8b1d72] text-white shadow-[0_10px_25px_rgba(139,29,114,0.28)] transition-all duration-300 hover:bg-[#D6B981] hover:text-[#200020] ${showTop
                        ? "translate-y-0 opacity-100"
                        : "pointer-events-none translate-y-3 opacity-0"
                    }`}
            >
                <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                >
                    <path
                        d="M12 20V5"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                    />
                    <path
                        d="M6 11L12 5L18 11"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>


        </div>
    );
}