"use client";

import React, { useEffect, useState } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import api from '@/lib/api';
import { format } from 'date-fns';
import { Eye, Check, X, Calendar as CalendarIcon, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { WhatsAppModal } from './WhatsAppModal';

interface Booking {
  id: string;
  patient: {
    full_name: string;
  };
  service_name: string;
  booking_date: string;
  booking_time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'rescheduled';
}

export default function AdminBookingsPage() {
  const { user } = useAdminAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  
  // Modal state
  const [whatsappModalBooking, setWhatsappModalBooking] = useState<Booking | null>(null);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.append('status', statusFilter);
      if (dateFilter) params.append('date', dateFilter);

      const response = await api.get(`/api/v1/bookings?${params.toString()}`);
      setBookings(response.data);
    } catch (error) {
      console.error('Failed to fetch bookings', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchBookings();
      setCurrentPage(1); // Reset page on filter change
    }
  }, [user, statusFilter, dateFilter]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await api.patch(`/api/v1/bookings/${id}/status`, { status: newStatus });
      fetchBookings();
    } catch (error) {
      console.error('Failed to update status', error);
      alert('Failed to update status');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'rescheduled': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalPages = Math.ceil(bookings.length / itemsPerPage);
  const paginatedBookings = bookings.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h1 className="text-3xl font-bold text-slate-900 font-primary tracking-tight">Bookings</h1>
        
        <div className="flex space-x-4">
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="border-gray-300 rounded-md shadow-sm focus:ring-[var(--primary-plum)] focus:border-[var(--primary-plum)] sm:text-sm"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border-gray-300 rounded-md shadow-sm focus:ring-[var(--primary-plum)] focus:border-[var(--primary-plum)] sm:text-sm"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="rescheduled">Rescheduled</option>
          </select>
        </div>
      </div>

      <div className="bg-white shadow-soft ring-1 ring-slate-900/5 rounded-2xl overflow-hidden hover-lift transition-all">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider font-secondary">#</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider font-secondary">Patient</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider font-secondary">Service</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider font-secondary">Date & Time</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider font-secondary">Status</th>
                <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider font-secondary">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500 font-secondary">Loading bookings...</td>
                </tr>
              ) : bookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500 font-secondary">No bookings found</td>
                </tr>
              ) : (
                paginatedBookings.map((booking, index) => (
                  <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.patient?.full_name || 'Unknown'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.service_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {booking.booking_date} at {booking.booking_time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full capitalize ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <button 
                        onClick={() => setWhatsappModalBooking(booking as any)} 
                        className="text-emerald-500 hover:text-emerald-700 mr-2" 
                        title="Send WhatsApp"
                      >
                        <MessageSquare className="h-4 w-4 inline-block" />
                      </button>
                      
                      {booking.status === 'pending' && (
                        <>
                          <button onClick={() => handleStatusChange(booking.id, 'confirmed')} className="text-green-600 hover:text-green-900" title="Confirm">
                            <Check className="h-5 w-5" />
                          </button>
                          <button onClick={() => handleStatusChange(booking.id, 'cancelled')} className="text-red-600 hover:text-red-900" title="Cancel">
                            <X className="h-5 w-5" />
                          </button>
                        </>
                      )}
                      {booking.status === 'confirmed' && (
                        <>
                          <button onClick={() => handleStatusChange(booking.id, 'completed')} className="text-blue-600 hover:text-blue-900" title="Mark Completed">
                            <Check className="h-5 w-5" />
                          </button>
                          <button onClick={() => handleStatusChange(booking.id, 'no_show')} className="text-gray-500 hover:text-gray-700" title="Mark No Show">
                            <span className="text-xs font-bold px-1 border border-current rounded">NS</span>
                          </button>
                          <button onClick={() => handleStatusChange(booking.id, 'cancelled')} className="text-red-600 hover:text-red-900" title="Cancel">
                            <X className="h-5 w-5" />
                          </button>
                        </>
                      )}
                      <button className="text-gray-400 hover:text-gray-600 ml-2" title="View Details">
                        <Eye className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="bg-white px-4 py-3 border-t border-slate-200 flex items-center justify-between sm:px-6">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-slate-700">
                  Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium">{Math.min(currentPage * itemsPerPage, bookings.length)}</span> of <span className="font-medium">{bookings.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === i + 1
                          ? 'z-10 bg-[var(--primary-plum)]/10 border-[var(--primary-plum)] text-[var(--primary-plum)]'
                          : 'bg-white border-slate-300 text-slate-500 hover:bg-slate-50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      <WhatsAppModal 
        isOpen={!!whatsappModalBooking}
        onClose={() => setWhatsappModalBooking(null)}
        booking={whatsappModalBooking as any}
      />
    </div>
  );
}
