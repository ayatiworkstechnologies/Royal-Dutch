"use client";

import React, { useEffect, useState } from 'react';
import { useCustomerAuth } from '@/hooks/useCustomerAuth';
import api from '@/lib/api';
import { CalendarCheck, Clock, FileText } from 'lucide-react';
import { format, parseISO } from 'date-fns';

export default function CustomerBookingsPage() {
  const { user } = useCustomerAuth();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get('/api/bookings/me');
        setBookings(res.data);
      } catch (err) {
        console.error("Failed to load bookings", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Confirmed</span>;
      case 'completed':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Completed</span>;
      case 'cancelled':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Cancelled</span>;
      case 'no_show':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">No-Show</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">{status}</span>;
    }
  };

  if (loading) {
    return <div className="text-gray-500">Loading bookings...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#171717] font-cinzel tracking-wider uppercase mb-2">My Bookings</h1>
        <p className="text-gray-600">View your upcoming and past appointments.</p>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-xl shadow-sm border border-gray-100">
          <CalendarCheck className="mx-auto h-12 w-12 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No bookings found</h3>
          <p className="text-gray-500">You haven't scheduled any appointments yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <ul className="divide-y divide-gray-100">
            {bookings.map((booking) => (
              <li key={booking.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="mb-4 sm:mb-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {booking.service_name || 'Medical Consultation'}
                      </h3>
                      {getStatusBadge(booking.status)}
                    </div>
                    
                    <div className="mt-2 flex flex-col sm:flex-row sm:flex-wrap gap-y-2 gap-x-6 text-sm text-gray-500">
                      <div className="flex items-center">
                        <CalendarCheck className="mr-2 h-4 w-4 text-[#B48F57]" />
                        {format(parseISO(booking.booking_date), 'MMMM d, yyyy')}
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-[#B48F57]" />
                        {booking.booking_time}
                      </div>
                      {booking.booking_code && (
                        <div className="flex items-center font-mono text-xs">
                          <FileText className="mr-2 h-4 w-4 text-[#B48F57]" />
                          Ref: {booking.booking_code}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    {booking.staff_name && (
                      <p className="text-sm font-medium text-gray-900 mb-1">
                        Dr. {booking.staff_name}
                      </p>
                    )}
                    {booking.price && (
                      <p className="text-sm text-gray-500">
                        {booking.currency} {parseFloat(booking.price).toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
