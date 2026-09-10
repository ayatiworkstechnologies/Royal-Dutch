"use client";

import { useState, type ReactNode } from "react";
import api from "@/lib/api";
import { useBookingModal } from "@/context/BookingModalContext";
import { useAlert } from "@/context/AlertContext";

export default function ServiceBookingButton({ href, onClick, className, children }: {
  href: string;
  onClick?: () => void;
  className?: string;
  children: ReactNode;
}) {
  const [loading, setLoading] = useState(false);
  const { openModal } = useBookingModal();
  const { error } = useAlert();

  const bookService = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const slug = href.split("/").filter(Boolean).pop();
      const { data } = await api.get<{ id: number; category_id: number }>(
        `/api/services/${encodeURIComponent(slug || "")}`,
      );
      onClick?.();
      openModal(data.category_id, String(data.id));
    } catch {
      error("Service unavailable", "Unable to load this service. Please try again or choose another service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button type="button" onClick={bookService} disabled={loading} aria-busy={loading}
      className={`${className || ""} w-full text-left disabled:opacity-50`}>
      {children}
    </button>
  );
}
