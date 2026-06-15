"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import { motion } from 'framer-motion';

interface Category {
  id: string;
  name: string;
  description: string;
}

interface Service {
  id: string;
  slug: string;
  name: string;
  short_description: string;
  category_id: string;
  image_url?: string;
}

export default function ServicesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catsRes, servsRes] = await Promise.all([
          api.get('/api/v1/categories'),
          api.get('/api/v1/services')
        ]);
        setCategories(catsRes.data);
        setServices(servsRes.data);
      } catch (error) {
        console.error('Failed to fetch services', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#171717] font-cinzel mb-4">
            Our Medical Services
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive, world-class healthcare tailored to your unique needs.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B48F57]"></div>
          </div>
        ) : (
          <div className="space-y-16">
            {categories.map((category) => {
              const categoryServices = services.filter(s => s.category_id === category.id);
              if (categoryServices.length === 0) return null;

              return (
                <div key={category.id} className="space-y-8">
                  <div className="border-b border-gray-200 pb-4">
                    <h2 className="text-3xl font-semibold text-[#171717] font-cinzel">{category.name}</h2>
                    {category.description && (
                      <p className="mt-2 text-gray-600">{category.description}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categoryServices.map((service, index) => (
                      <motion.div 
                        key={service.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="group flex flex-col bg-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                      >
                        {service.image_url && (
                          <div className="h-48 overflow-hidden bg-gray-200">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                              src={service.image_url} 
                              alt={service.name} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        )}
                        <div className="p-6 flex flex-col flex-1">
                          <h3 className="text-xl font-bold text-[#171717] mb-2 font-cinzel group-hover:text-[#B48F57] transition-colors">
                            {service.name}
                          </h3>
                          <p className="text-gray-600 mb-6 flex-1 line-clamp-3">
                            {service.short_description}
                          </p>
                          <Link 
                            href={`/services/${service.slug}`}
                            className="inline-flex items-center text-[#B48F57] font-medium hover:text-[#8e6e3c] transition-colors"
                          >
                            Learn more
                            <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
