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
      const pathSegments = href.split("/").filter(Boolean);
      const finalSlug = pathSegments[pathSegments.length - 1] || "";
      let serviceData: { id: number; category_id: number };
      let subServiceId: number | undefined;

      try {
        const { data } = await api.get<{ id: number; category_id: number }>(
          `/api/services/${encodeURIComponent(finalSlug)}`,
        );
        serviceData = data;
      } catch (serviceError) {
        if (pathSegments.length <= 3) throw serviceError;
        const parentServiceSlug = pathSegments[pathSegments.length - 2];
        const { data } = await api.get<{ id: number; category_id: number }>(
          `/api/services/${encodeURIComponent(parentServiceSlug)}`,
        );
        serviceData = data;
        const { data: subServices } = await api.get<Array<{ id: number; slug: string }>>(
          `/api/services/${serviceData.id}/sub-services`,
        );
        subServiceId = subServices.find((item) => item.slug === finalSlug)?.id;
        if (subServiceId == null) throw new Error("Subservice unavailable");
      }
      onClick?.();
      openModal(serviceData.category_id, String(serviceData.id), subServiceId);
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
