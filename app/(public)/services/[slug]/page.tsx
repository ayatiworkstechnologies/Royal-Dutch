"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { Button } from '@/components/ui/Button';

interface ServiceDetail {
  id: string;
  slug: string;
  name: string;
  short_description: string;
  full_description: string;
  category_id: string;
  image_url?: string;
  price?: number;
  duration_minutes?: number;
}

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [service, setService] = useState<ServiceDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await api.get(`/api/v1/services/${slug}`);
        setService(res.data);
      } catch (err: any) {
        setError('Service not found');
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchService();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B48F57]"></div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 font-cinzel">Service Not Found</h1>
        <p className="text-gray-600 mb-8">The service you are looking for does not exist or has been removed.</p>
        <Link href="/services">
          <Button variant="outline">Back to Services</Button>
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/services" className="inline-flex items-center text-[#B48F57] hover:text-[#8e6e3c] mb-8 font-medium">
          &larr; Back to all services
        </Link>
        
        {service.image_url && (
          <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-12 shadow-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={service.image_url} 
              alt={service.name} 
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <h1 className="text-4xl md:text-5xl font-bold text-[#171717] font-cinzel mb-6">
          {service.name}
        </h1>
        
        <div className="flex flex-wrap gap-4 mb-8">
          {service.duration_minutes && (
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-sm font-medium text-gray-800">
              <svg className="mr-1.5 h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {service.duration_minutes} Minutes
            </span>
          )}
          {service.price && (
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-sm font-medium text-gray-800">
              <svg className="mr-1.5 h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              ${service.price}
            </span>
          )}
        </div>

        <div className="prose prose-lg prose-[#B48F57] max-w-none mb-12 text-gray-700">
          <p className="text-xl leading-relaxed font-medium mb-6">{service.short_description}</p>
          
          <div dangerouslySetInnerHTML={{ __html: service.full_description || '' }} />
        </div>

        <div className="bg-[#FDF8F3] rounded-2xl p-8 text-center border border-[#E8DCC8]">
          <h3 className="text-2xl font-bold text-[#171717] font-cinzel mb-4">Ready to schedule an appointment?</h3>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">Book your session online today. Choose your preferred date and time.</p>
          <Link href={`/booking?service=${service.id}`}>
            <Button variant="primary" size="lg" className="px-8">
              Book Now
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
