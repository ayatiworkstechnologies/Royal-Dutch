"use client";

import React from 'react';
import { useCustomerAuth } from '@/hooks/useCustomerAuth';
import Link from 'next/link';
import { CalendarCheck, UserCircle, Receipt } from 'lucide-react';

export default function CustomerDashboardPage() {
  const { user } = useCustomerAuth();

  if (!user) return null;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 font-cinzel">
        Welcome, {user.first_name || 'Patient'}
      </h1>
      
      <p className="text-gray-600 text-lg">
        Manage your appointments, view your medical history, and update your personal information securely.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Link href="/customer/profile" className="block group">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-[#B48F57] hover:shadow-md transition-all h-full">
            <UserCircle className="h-10 w-10 text-[#B48F57] mb-4 group-hover:scale-110 transition-transform" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">My Profile</h2>
            <p className="text-gray-500">Update your personal details and contact information.</p>
          </div>
        </Link>
        
        <Link href="/customer/bookings" className="block group">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-[#B48F57] hover:shadow-md transition-all h-full">
            <CalendarCheck className="h-10 w-10 text-[#B48F57] mb-4 group-hover:scale-110 transition-transform" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">My Bookings</h2>
            <p className="text-gray-500">View upcoming appointments and your booking history.</p>
          </div>
        </Link>
        
        <Link href="/customer/invoices" className="block group">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-[#B48F57] hover:shadow-md transition-all h-full">
            <Receipt className="h-10 w-10 text-[#B48F57] mb-4 group-hover:scale-110 transition-transform" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">My Invoices</h2>
            <p className="text-gray-500">Access your billing statements and download PDFs.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
