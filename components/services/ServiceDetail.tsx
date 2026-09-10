"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";
import ServiceBookingButton from "@/components/ui/ServiceBookingButton";

interface Service {
  id: number;
  category_id: number;
  name: string;
  description: string | null;
  duration_minutes: number | null;
  price: string | number | null;
  currency: string;
}

export default function ServiceDetail({ categorySlug, slug }: { categorySlug: string; slug: string }) {
  const [service, setService] = useState<Service | null>(null);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");
    setService(null);
    Promise.all([
      api.get<Service>(`/api/services/${encodeURIComponent(slug)}`),
      api.get<{ id: number; slug: string; name: string }[]>("/api/categories"),
    ]).then(([serviceResponse, categoriesResponse]) => {
      if (cancelled) return;
      const category = categoriesResponse.data.find(item => item.slug === categorySlug);
      if (!category || category.id !== serviceResponse.data.category_id) {
        setError("This service is not available in this category.");
        return;
      }
      setCategoryName(category.name);
      setService(serviceResponse.data);
    }).catch(() => {
      if (!cancelled) setError("Unable to load this service. Please try again later.");
    }).finally(() => {
      if (!cancelled) setLoading(false);
    });
    return () => { cancelled = true; };
  }, [categorySlug, slug]);

  return (
    <main className="min-h-screen bg-[#fffdfb] px-6 py-16 sm:py-24">
      <section className="mx-auto max-w-3xl rounded-2xl border border-[#eadfd8] bg-white p-8 sm:p-12">
        <Link href={`/services/${categorySlug}`} className="text-sm text-[#8b1d72] hover:underline">
          Back to {categoryName || "treatments"}
        </Link>
        {loading && <p role="status" className="mt-8 text-slate-500">Loading service...</p>}
        {error && <p role="alert" className="mt-8 text-red-700">{error}</p>}
        {service && !loading && !error && (
          <>
            <p className="mt-8 text-xs font-semibold uppercase tracking-widest text-[#8b1d72]">{categoryName}</p>
            <h1 className="mt-4 font-primary text-4xl text-slate-900">{service.name}</h1>
            {service.description && <p className="mt-6 whitespace-pre-line leading-8 text-slate-600">{service.description}</p>}
            <div className="mt-6 flex flex-wrap gap-6 text-slate-700">
              {service.duration_minutes != null && <span>{service.duration_minutes} minutes</span>}
              {service.price != null && <span>{service.currency} {service.price}</span>}
            </div>
            <div className="mt-8 inline-block">
              <ServiceBookingButton href={`/services/${categorySlug}/${slug}`}
                className="rounded-lg bg-[#8b1d72] px-8 py-3 font-semibold text-white hover:bg-[#73175e]">
                Book Now
              </ServiceBookingButton>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
