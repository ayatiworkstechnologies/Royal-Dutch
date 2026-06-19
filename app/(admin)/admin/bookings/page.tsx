"use client";

import React, { useEffect, useState } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import api from '@/lib/api';
import { useAlert } from '@/context/AlertContext';
import { format } from 'date-fns';
import { Eye, Check, X, Calendar as CalendarIcon, MessageSquare, CalendarCheck, Clock, CheckSquare, List, User, Phone, FileText, Activity, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { WhatsAppModal } from './WhatsAppModal';

interface Booking {
  id: string;
  booking_code: string;
  patient: {
    full_name: string;
    phone: string;
    email: string;
  };
  service_name: string;
  staff_name?: string;
  staff_id?: number;
  booking_date: string;
  booking_time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'rescheduled';
  notes?: string;
}

export default function AdminBookingsPage() {
  const { user } = useAdminAuth();
  const { success: toastSuccess, error: toastError, warning: toastWarning, info: toastInfo, confirm: confirmDialog } = useAlert();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  
  // Modal state
  const [whatsappModalBooking, setWhatsappModalBooking] = useState<Booking | null>(null);
  const [viewModalBooking, setViewModalBooking] = useState<Booking | null>(null);
  const [assignModalBooking, setAssignModalBooking] = useState<Booking | null>(null);
  const [assignMode, setAssignMode] = useState<'confirm' | 'reassign'>('confirm');
  
  // Staff list for assignment
  const [staffList, setStaffList] = useState<any[]>([]);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.append('status', statusFilter);
      if (dateFilter) params.append('date', dateFilter);

      const response = await api.get(`/api/bookings?${params.toString()}`);
      setBookings(response.data);
    } catch (error) {
      console.error('Failed to fetch bookings', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStaff = async () => {
    try {
      const response = await api.get('/api/staff');
      // Only keep active staff and those who handle services (doctors/nurses)
      setStaffList(response.data.filter((s: any) => s.status !== 'inactive'));
    } catch (error) {
      console.error('Failed to fetch staff', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchBookings();
      setCurrentPage(1); // Reset page on filter change
    }
  }, [user, statusFilter, dateFilter]);

  useEffect(() => {
    if (user) {
      fetchStaff();
    }
  }, [user]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await api.patch(`/api/bookings/${id}/status`, { status: newStatus });
      fetchBookings();
    } catch (error) {
      console.error('Failed to update status', error);
      toastError('Error', 'Failed to update booking status.');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100/80 text-yellow-800 border border-yellow-200';
      case 'confirmed': return 'bg-blue-100/80 text-blue-800 border border-blue-200';
      case 'completed': return 'bg-green-100/80 text-green-800 border border-green-200';
      case 'cancelled': return 'bg-red-100/80 text-red-800 border border-red-200';
      case 'rescheduled': return 'bg-purple-100/80 text-purple-800 border border-purple-200';
      default: return 'bg-gray-100/80 text-gray-800 border border-gray-200';
    }
  };

  const totalPages = Math.ceil(bookings.length / itemsPerPage);
  const paginatedBookings = bookings.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Dashboard Stats
  const totalBookings = bookings.length;
  const pendingCount = bookings.filter(b => b.status === 'pending').length;
  const confirmedCount = bookings.filter(b => b.status === 'confirmed').length;
  const completedCount = bookings.filter(b => b.status === 'completed').length;

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 font-primary tracking-tight">Bookings Manager</h1>
          <p className="text-slate-500 text-sm mt-1.5 font-secondary flex items-center gap-2">
            <CalendarIcon className="h-4 w-4" />
            {format(new Date(), 'EEEE, MMMM d, yyyy')}
          </p>
        </div>
      </div>

      {/* Hero Overview Block */}
      <div className="relative rounded-3xl bg-linear-to-br from-(--primary-plum) via-[#632052] to-[#38072e] p-8 text-white shadow-soft overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 group-hover:bg-white/10 transition-all duration-700" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-(--primary-gold)/10 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CalendarCheck className="h-5 w-5 text-(--primary-gold)" />
              <span className="text-xs font-semibold text-(--primary-gold) uppercase tracking-widest font-secondary">Bookings Overview</span>
            </div>
            <p className="text-6xl font-bold font-primary mb-2 tracking-tight">{loading ? '—' : totalBookings}</p>
            <p className="text-white/70 text-sm font-secondary">Total recorded appointments</p>
          </div>
          <div className="grid grid-cols-3 gap-3 md:gap-4 w-full md:w-auto">
            <MiniStat label="Pending" value={pendingCount} color="text-yellow-400" />
            <MiniStat label="Confirmed" value={confirmedCount} color="text-blue-400" />
            <MiniStat label="Completed" value={completedCount} color="text-green-400" />
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
        <StatCard title="Total" value={loading ? '—' : totalBookings} icon={<List className="h-5 w-5 text-slate-500" />} />
        <StatCard title="Action Required" value={loading ? '—' : pendingCount} icon={<Clock className="h-5 w-5 text-yellow-500" />} highlight={pendingCount > 0} />
        <StatCard title="Ready" value={loading ? '—' : confirmedCount} icon={<Check className="h-5 w-5 text-blue-500" />} />
        <StatCard title="Finished" value={loading ? '—' : completedCount} icon={<CheckSquare className="h-5 w-5 text-green-500" />} />
      </div>

      {/* Filters and List */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 font-secondary flex items-center gap-2">
            <span className="w-8 h-px bg-slate-300"></span> Appointment Database
          </h2>
          
          <div className="flex flex-wrap gap-3">
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="glass-panel border-slate-200/50 bg-white/60 px-4 py-2 rounded-xl shadow-sm focus:ring-1 focus:ring-(--primary-gold) outline-none text-sm transition-all"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="glass-panel border-slate-200/50 bg-white/60 px-4 py-2 rounded-xl shadow-sm focus:ring-1 focus:ring-(--primary-gold) outline-none text-sm transition-all"
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

        <div className="glass-panel shadow-soft rounded-3xl overflow-hidden hover-lift transition-all">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50/50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider font-secondary">#</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider font-secondary">Patient</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider font-secondary">Service</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider font-secondary">Date & Time</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider font-secondary">Doctor / Staff</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider font-secondary">Status</th>
                  <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider font-secondary">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white/20 divide-y divide-slate-100/60">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-slate-500 font-secondary">Loading bookings...</td>
                  </tr>
                ) : bookings.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-slate-500 font-secondary">No bookings found</td>
                  </tr>
                ) : (
                  paginatedBookings.map((booking, index) => (
                    <tr key={booking.id} className="hover:bg-white/60 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-800">{booking.patient?.full_name || 'Unknown'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-(--primary-plum) bg-(--primary-plum)/5 rounded-md px-3">{booking.service_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-secondary">
                        {booking.booking_date} <span className="mx-1 text-slate-300">•</span> <span className="font-medium text-slate-700">{booking.booking_time}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {booking.staff_name ? (
                          <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                            <UserCheck className="w-3.5 h-3.5 text-green-500 shrink-0" />
                            {booking.staff_name}
                          </span>
                        ) : (
                          <span className="text-xs text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full font-semibold">
                            Unassigned
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full capitalize ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => setWhatsappModalBooking(booking as any)}
                            className="text-emerald-600 hover:text-white hover:bg-emerald-500 bg-emerald-50 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm"
                            title="Send WhatsApp"
                          >
                            <MessageSquare className="h-4 w-4" />
                          </button>

                          {booking.status === 'pending' && (
                            <>
                              <button
                                onClick={() => { setAssignMode('confirm'); setAssignModalBooking(booking); }}
                                className="text-blue-600 hover:text-white hover:bg-blue-500 bg-blue-50 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm"
                                title="Assign Doctor & Confirm"
                              >
                                <Check className="h-4 w-4" />
                              </button>
                              <button onClick={() => handleStatusChange(booking.id, 'cancelled')} className="text-red-600 hover:text-white hover:bg-red-500 bg-red-50 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm" title="Cancel">
                                <X className="h-4 w-4" />
                              </button>
                            </>
                          )}
                          {booking.status === 'confirmed' && (
                            <>
                              <button
                                onClick={() => { setAssignMode('reassign'); setAssignModalBooking(booking); }}
                                className="text-purple-600 hover:text-white hover:bg-purple-500 bg-purple-50 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm"
                                title="Reassign Doctor"
                              >
                                <UserCheck className="h-4 w-4" />
                              </button>
                              <button onClick={() => handleStatusChange(booking.id, 'completed')} className="text-green-600 hover:text-white hover:bg-green-500 bg-green-50 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm" title="Mark Completed">
                                <Check className="h-4 w-4" />
                              </button>
                              <button onClick={() => handleStatusChange(booking.id, 'no_show')} className="text-slate-500 hover:text-white hover:bg-slate-500 bg-slate-100 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm" title="Mark No Show">
                                <span className="text-[9px] font-bold">NS</span>
                              </button>
                              <button onClick={() => handleStatusChange(booking.id, 'cancelled')} className="text-red-600 hover:text-white hover:bg-red-500 bg-red-50 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm" title="Cancel">
                                <X className="h-4 w-4" />
                              </button>
                            </>
                          )}
                          <div className="w-px h-4 bg-slate-200 mx-1"></div>
                          <button onClick={() => setViewModalBooking(booking as any)} className="text-slate-400 hover:text-white hover:bg-(--primary-gold) bg-slate-50 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm" title="View Details">
                            <Eye className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="bg-white/40 px-4 py-3 border-t border-slate-200/50 flex items-center justify-between sm:px-6">
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-slate-700 font-secondary">
                    Showing <span className="font-bold text-slate-900">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-bold text-slate-900">{Math.min(currentPage * itemsPerPage, bookings.length)}</span> of <span className="font-bold text-slate-900">{bookings.length}</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-xl shadow-sm -space-x-px overflow-hidden" aria-label="Pagination">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-3 py-2 border border-slate-200/60 bg-white/60 text-sm font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Previous
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-bold transition-colors ${
                          currentPage === i + 1
                            ? 'z-10 bg-(--primary-plum) border-(--primary-plum) text-white shadow-sm'
                            : 'bg-white/60 border-slate-200/60 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center px-3 py-2 border border-slate-200/60 bg-white/60 text-sm font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Next
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <WhatsAppModal 
        isOpen={!!whatsappModalBooking}
        onClose={() => setWhatsappModalBooking(null)}
        booking={whatsappModalBooking as any}
      />

      {/* View Booking Modal */}
      {viewModalBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-xl font-bold font-primary text-slate-900">Booking Details</h3>
              <button onClick={() => setViewModalBooking(null)} className="text-slate-400 hover:text-slate-600 bg-white hover:bg-slate-100 w-8 h-8 rounded-full flex items-center justify-center transition-colors border border-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 md:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-(--primary-plum)/10 flex items-center justify-center shrink-0">
                      <User className="w-5 h-5 text-(--primary-plum)" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest font-secondary">Patient</p>
                      <p className="text-sm font-semibold text-slate-900">{viewModalBooking.patient?.full_name}</p>
                      <p className="text-sm text-slate-500">{viewModalBooking.patient?.phone || 'No phone'}</p>
                      <p className="text-sm text-slate-500">{viewModalBooking.patient?.email || 'No email'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                      <Activity className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest font-secondary">Service</p>
                      <p className="text-sm font-semibold text-slate-900">{viewModalBooking.service_name}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-(--primary-gold)/10 flex items-center justify-center shrink-0">
                      <CalendarIcon className="w-5 h-5 text-(--primary-gold)" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest font-secondary">Schedule</p>
                      <p className="text-sm font-semibold text-slate-900">{viewModalBooking.booking_date}</p>
                      <p className="text-sm text-slate-500">{viewModalBooking.booking_time}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                      <CheckSquare className="w-5 h-5 text-slate-500" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest font-secondary">Status & Staff</p>
                      <span className={`px-2 py-0.5 mt-1 inline-flex text-xs font-bold rounded-md capitalize ${getStatusColor(viewModalBooking.status)}`}>
                        {viewModalBooking.status}
                      </span>
                      <p className="text-sm text-slate-600 mt-1">Assigned to: <span className="font-semibold">{viewModalBooking.staff_name || 'Unassigned'}</span></p>
                    </div>
                  </div>
                </div>
              </div>

              {viewModalBooking.notes && (
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest font-secondary">Patient Notes</p>
                      <p className="text-sm text-slate-700 mt-1 bg-slate-50 p-3 rounded-xl border border-slate-100">{viewModalBooking.notes}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
              <Button onClick={() => setViewModalBooking(null)} className="px-6 rounded-xl font-secondary tracking-wide shadow-sm">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Assign / Reassign Staff Modal */}
      {assignModalBooking && (
        <AssignStaffModal
          booking={assignModalBooking}
          staffList={staffList}
          mode={assignMode}
          onClose={() => setAssignModalBooking(null)}
          onConfirm={async (staffId) => {
            try {
              if (staffId) {
                await api.patch(`/api/bookings/${assignModalBooking.id}`, { staff_id: parseInt(staffId) });
              }
              if (assignMode === 'confirm') {
                await api.patch(`/api/bookings/${assignModalBooking.id}/status`, { status: 'confirmed' });
              }
              toastSuccess('Done', assignMode === 'confirm' ? 'Booking confirmed and doctor assigned.' : 'Doctor reassigned successfully.');
              fetchBookings();
              setAssignModalBooking(null);
            } catch (error) {
              console.error('Failed to assign staff', error);
              toastError('Error', 'Failed to assign doctor to booking.');
            }
          }}
        />
      )}
    </div>
  );
}

function AssignStaffModal({
  booking, staffList, mode, onClose, onConfirm,
}: {
  booking: Booking;
  staffList: any[];
  mode: 'confirm' | 'reassign';
  onClose: () => void;
  onConfirm: (staffId: string) => void;
}) {
  const [selectedStaff, setSelectedStaff] = useState(booking.staff_id ? String(booking.staff_id) : '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isConfirm = mode === 'confirm';

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await onConfirm(selectedStaff);
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
          <h3 className="text-xl font-bold font-primary text-slate-900">
            {isConfirm ? 'Confirm & Assign Doctor' : 'Reassign Doctor'}
          </h3>
          <button onClick={onClose} disabled={isSubmitting} className="text-slate-400 hover:text-slate-600 bg-white hover:bg-slate-100 w-8 h-8 rounded-full flex items-center justify-center transition-colors border border-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 md:p-8 space-y-6">
          <div className="bg-(--primary-plum)/5 border border-(--primary-plum)/10 rounded-2xl p-4">
            <p className="text-xs font-bold text-(--primary-plum) uppercase tracking-widest font-secondary mb-1">
              {isConfirm ? 'Booking Request' : 'Booking'}
            </p>
            <p className="text-sm font-semibold text-slate-900">{booking.patient?.full_name}</p>
            <p className="text-sm text-slate-600">{booking.service_name}</p>
            <p className="text-sm text-slate-500 mt-2 font-secondary">{booking.booking_date} at {booking.booking_time}</p>
            {booking.staff_name && (
              <p className="text-xs text-slate-400 mt-1">Currently: <span className="font-semibold text-slate-600">{booking.staff_name}</span></p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest font-secondary">
              {isConfirm ? 'Assign Doctor / Specialist' : 'Reassign to Doctor / Specialist'}
            </label>
            <select
              title="Select staff"
              value={selectedStaff}
              onChange={(e) => setSelectedStaff(e.target.value)}
              className="w-full glass-panel border-slate-200 bg-white px-4 py-3 rounded-xl shadow-sm focus:ring-2 focus:ring-(--primary-gold) focus:border-transparent outline-none text-sm font-medium transition-all"
            >
              <option value="">{isConfirm ? 'Auto-assign (system picks best available)' : '— Remove assignment —'}</option>
              {staffList.map((staff) => (
                <option key={staff.id} value={staff.id}>{staff.name} — {staff.role}</option>
              ))}
            </select>
            {isConfirm && (
              <p className="text-xs text-slate-400">If no doctor is selected, the system will auto-assign the most available specialist for this service.</p>
            )}
          </div>
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
          <Button onClick={onClose} variant="outline" disabled={isSubmitting} className="px-6 rounded-xl font-secondary tracking-wide bg-white">
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting} className="px-6 rounded-xl font-secondary tracking-wide bg-(--primary-plum) hover:bg-[#632052] text-white shadow-md">
            {isSubmitting ? 'Saving...' : isConfirm ? 'Confirm Booking' : 'Save Assignment'}
          </Button>
        </div>
      </div>
    </div>
  );
}

function MiniStat({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-center hover:bg-white/15 transition-colors">
      <p className={`text-2xl md:text-3xl font-bold font-primary ${color} mb-1 drop-shadow-sm`}>{value}</p>
      <p className="text-white/70 text-[10px] md:text-xs uppercase tracking-widest font-secondary font-semibold">{label}</p>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  highlight = false,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div className={`glass-panel rounded-2xl hover-lift transition-all duration-300 relative overflow-hidden ${highlight ? 'border-(--primary-gold)/30 bg-white/90 shadow-md' : 'bg-white/80'}`}>
      {highlight && <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-(--primary-gold) to-(--primary-plum)"></div>}
      <div className="p-5">
        <div className="flex items-center gap-4">
          <div className={`shrink-0 rounded-xl p-3 border shadow-sm transition-colors ${highlight ? 'bg-(--primary-gold)/10 border-(--primary-gold)/20' : 'bg-slate-50 border-slate-100'}`}>
            {icon}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-slate-400 font-secondary uppercase tracking-widest truncate mb-1">{title}</p>
            <p className={`font-bold font-primary truncate text-2xl ${highlight ? 'text-(--primary-gold) drop-shadow-sm' : 'text-slate-800'}`}>
              {value}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
