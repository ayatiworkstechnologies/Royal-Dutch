"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/lib/api";

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const EMPTY = { full_name: "", email: "", phone: "", message: "" };

export default function ContactFormMapSection() {
  const [form, setForm] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const f = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.full_name.trim() || !form.phone.trim()) {
      setError("Name and phone number are required.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      await api.post("/api/contacts", {
        full_name: form.full_name.trim(),
        phone:     form.phone.trim(),
        email:     form.email.trim() || null,
        message:   form.message.trim() || null,
        source:    "website",
        status:    "new",
      });
      setSuccess(true);
      setForm(EMPTY);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#fbfaf8] px-4 py-14 sm:px-6 md:py-16 lg:px-8 lg:py-20">
      {/* Soft paper texture background */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.025)_1px,transparent_1px),linear-gradient(0deg,rgba(0,0,0,0.018)_1px,transparent_1px)] bg-[size:18px_18px] opacity-[0.25]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.94),rgba(251,250,248,0.78))]" />

      <motion.div
        className="relative z-10 mx-auto grid max-w-[1180px] grid-cols-1 items-stretch gap-8 rounded-[6px] bg-white/92 p-5 shadow-[0_15px_45px_rgba(0,0,0,0.05)] backdrop-blur-sm md:grid-cols-[0.75fr_1.25fr] md:p-7 lg:gap-10 lg:p-8"
        initial={{ opacity: 0, y: 42 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: smoothEase }}
        viewport={{ once: true, amount: 0.25 }}
      >
        {/* Left Form */}
        <motion.div
          className="flex flex-col justify-center px-1 py-2 md:px-3 lg:px-4"
          initial={{ opacity: 0, x: -45 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.15, delay: 0.18, ease: smoothEase }}
          viewport={{ once: true, amount: 0.35 }}
        >
          <h2 className="font-primary text-[24px] font-medium uppercase leading-tight tracking-[1.5px] text-[#111] sm:text-[28px] md:text-[30px] lg:text-[32px]">
            Connect With Us
          </h2>

          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-8 rounded-[6px] border border-[#c9e8c3] bg-[#f2fbf0] px-5 py-6 text-center"
              >
                <p className="font-primary text-[18px] font-semibold text-[#2a7a22]">Thank you!</p>
                <p className="mt-1 font-secondary text-[13px] tracking-[0.8px] text-[#4a7a44]">
                  We have received your message and will be in touch shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSuccess(false)}
                  className="mt-5 font-primary text-[12px] uppercase tracking-[2px] text-[#9a1b79] underline underline-offset-2"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="mt-7 space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div>
                  <label className="mb-2 block font-primary text-[14px] font-semibold uppercase tracking-[1px] text-[#222] sm:text-[15px]">
                    Name <span className="text-[#9a1b79]">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.full_name}
                    onChange={f("full_name")}
                    placeholder="Enter Your Name"
                    className="w-full border-0 border-b border-[#ded8d2] bg-transparent px-0 pb-2 font-secondary text-[14px] tracking-[1.4px] text-[#222] outline-none placeholder:text-[#a9a9a9] focus:border-[#8b1d72]"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-primary text-[14px] font-semibold uppercase tracking-[1px] text-[#222] sm:text-[15px]">
                    Email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={f("email")}
                    placeholder="Enter Your Email"
                    className="w-full border-0 border-b border-[#ded8d2] bg-transparent px-0 pb-2 font-secondary text-[14px] tracking-[1.4px] text-[#222] outline-none placeholder:text-[#a9a9a9] focus:border-[#8b1d72]"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-primary text-[14px] font-semibold uppercase tracking-[1px] text-[#222] sm:text-[15px]">
                    Phone Number <span className="text-[#9a1b79]">*</span>
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={f("phone")}
                    placeholder="Enter Your Phone Number"
                    className="w-full border-0 border-b border-[#ded8d2] bg-transparent px-0 pb-2 font-secondary text-[14px] tracking-[1.4px] text-[#222] outline-none placeholder:text-[#a9a9a9] focus:border-[#8b1d72]"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-primary text-[14px] font-semibold uppercase tracking-[1px] text-[#222] sm:text-[15px]">
                    Message
                  </label>
                  <input
                    type="text"
                    value={form.message}
                    onChange={f("message")}
                    placeholder="Enter Your Message"
                    className="w-full border-0 border-b border-[#ded8d2] bg-transparent px-0 pb-2 font-secondary text-[14px] tracking-[1.4px] text-[#222] outline-none placeholder:text-[#a9a9a9] focus:border-[#8b1d72]"
                  />
                </div>

                {error && (
                  <p className="font-secondary text-[12px] tracking-[0.6px] text-red-500">{error}</p>
                )}

                <motion.button
                  type="submit"
                  disabled={submitting}
                  className="mt-3 rounded-full bg-[#9a1b79] px-7 py-3 font-primary text-[13px] font-semibold uppercase tracking-[3px] text-white transition duration-300 hover:bg-[#D6B981] hover:text-[#200020] disabled:opacity-60 disabled:cursor-not-allowed"
                  whileHover={{ scale: submitting ? 1 : 1.04 }}
                  whileTap={{ scale: submitting ? 1 : 0.97 }}
                >
                  {submitting ? "Sending..." : "Know More"}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Right Map */}
        <motion.div
          className="relative min-h-[300px] overflow-hidden rounded-[6px] bg-[#f1ede8] md:min-h-[380px] lg:min-h-[430px]"
          initial={{ opacity: 0, x: 45 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{
            duration: 1.15,
            delay: 0.28,
            ease: smoothEase,
          }}
          viewport={{ once: true, amount: 0.35 }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3592.3648755739478!2d55.9685669!3d25.791533899999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ef6775518dd0ed9%3A0x9143971a2cb06457!2sRoyal%20Dutch%20Clinic!5e0!3m2!1sen!2sin!4v1780646595444!5m2!1sen!2sin"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full min-h-[300px] w-full md:min-h-[380px] lg:min-h-[430px]"
          />

          {/* Small white map control style box like reference */}
          <div className="pointer-events-none absolute bottom-5 left-1/2 h-16 w-9 -translate-x-1/2 rounded-[4px] bg-white shadow-[0_8px_20px_rgba(0,0,0,0.12)]" />
        </motion.div>
      </motion.div>
    </section>
  );
}