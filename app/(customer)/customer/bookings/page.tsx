"use client";

import React, { useEffect, useState } from 'react';
import { useCustomerAuth } from '@/hooks/useCustomerAuth';
import api from '@/lib/api';
import { CalendarCheck, Clock, FileText, Calendar, CheckSquare, CalendarDays } from 'lucide-react';
import { format, parseISO, isPast } from 'date-fns';

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
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100/80 text-green-800 border border-green-200">Confirmed</span>;
      case 'completed':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100/80 text-blue-800 border border-blue-200">Completed</span>;
      case 'cancelled':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100/80 text-red-800 border border-red-200">Cancelled</span>;
      case 'no_show':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100/80 text-gray-700 border border-gray-200">No-Show</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100/80 text-yellow-800 border border-yellow-200">{status}</span>;
    }
  };

  if (!user) return null;

  const totalBookings = bookings.length;
  const completedCount = bookings.filter(b => b.status === 'completed').length;
  const upcomingCount = bookings.filter(b => 
    ['pending', 'confirmed', 'rescheduled'].includes(b.status) &&
    !isPast(parseISO(b.booking_date + 'T' + (b.booking_time || '00:00')))
  ).length;

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-10">
      {/* Header aligned with dashboard */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 font-primary tracking-tight">Bookings</h1>
          <p className="text-slate-500 text-sm mt-1.5 font-secondary flex items-center gap-2">
            <Calendar className="h-4 w-4" />
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
            <p className="text-white/70 text-sm font-secondary">Total lifetime appointments</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 w-full md:w-auto">
            <MiniStat label="Upcoming" value={upcomingCount} color="text-yellow-400" />
            <MiniStat label="Completed" value={completedCount} color="text-green-400" />
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard title="Total Appointments" value={loading ? '—' : totalBookings} icon={<CalendarDays className="h-5 w-5 text-slate-500" />} />
        <StatCard title="Upcoming" value={loading ? '—' : upcomingCount} icon={<Clock className="h-5 w-5 text-yellow-500" />} />
        <StatCard title="Completed" value={loading ? '—' : completedCount} icon={<CheckSquare className="h-5 w-5 text-green-500" />} highlight={true} />
      </div>

      {/* List */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 font-secondary flex items-center gap-2">
           <span className="w-8 h-px bg-slate-300"></span> Appointment History
        </h2>
        {bookings.length === 0 && !loading ? (
          <div className="glass-panel p-12 text-center rounded-3xl shadow-soft">
            <CalendarCheck className="mx-auto h-12 w-12 text-slate-300 mb-4" />
            <h3 className="text-lg font-medium text-slate-800 mb-1">No bookings found</h3>
            <p className="text-slate-500">You haven't scheduled any appointments yet.</p>
          </div>
        ) : (
          <div className="glass-panel rounded-3xl shadow-soft overflow-hidden">
            <ul className="divide-y divide-slate-100/60 bg-white/20">
              {loading ? (
                <div className="p-12 text-center text-slate-500">Loading bookings...</div>
              ) : (
                bookings.map((booking) => (
                  <li key={booking.id} className="p-6 md:p-8 hover:bg-white/60 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div className="mb-4 sm:mb-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-slate-800 font-primary">
                            {booking.service_name || 'Medical Consultation'}
                          </h3>
                          {getStatusBadge(booking.status)}
                        </div>
                        
                        <div className="mt-2 flex flex-col sm:flex-row sm:flex-wrap gap-y-2 gap-x-6 text-sm text-slate-500 font-secondary">
                          <div className="flex items-center bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                            <CalendarCheck className="mr-2 h-4 w-4 text-(--primary-plum)" />
                            {format(parseISO(booking.booking_date), 'MMMM d, yyyy')}
                          </div>
                          <div className="flex items-center bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                            <Clock className="mr-2 h-4 w-4 text-(--primary-plum)" />
                            {booking.booking_time?.slice(0, 5)}
                          </div>
                          {booking.booking_code && (
                            <div className="flex items-center font-mono text-xs bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                              <FileText className="mr-2 h-4 w-4 text-(--primary-plum)" />
                              Ref: {booking.booking_code}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-start sm:items-end mt-2 sm:mt-0">
                        {booking.staff_name && (
                          <p className="text-sm font-semibold text-slate-700 mb-1">
                            Dr. {booking.staff_name}
                          </p>
                        )}
                        {booking.price && (
                          <p className="text-sm font-medium text-(--primary-gold-dark) bg-(--primary-gold)/10 px-2 py-0.5 rounded-md">
                            {booking.currency} {parseFloat(booking.price).toFixed(2)}
                          </p>
                        )}
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
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
    <div className={`glass-panel rounded-2xl hover-lift transition-all duration-300 relative overflow-hidden ${highlight ? 'border-(--primary-gold)/30 bg-white/90' : 'bg-white/80'}`}>
      {highlight && <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-(--primary-gold) to-(--primary-plum)"></div>}
      <div className="p-5 md:p-6">
        <div className="flex items-center gap-4">
          <div className={`shrink-0 rounded-2xl p-3 border shadow-sm ${highlight ? 'bg-(--primary-gold)/10 border-(--primary-gold)/20' : 'bg-white border-slate-100'}`}>
            {icon}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-500 font-secondary uppercase tracking-wider truncate mb-1">{title}</p>
            <p className={`font-bold font-primary truncate text-2xl md:text-3xl ${highlight ? 'text-[#B48F57]' : 'text-slate-900'}`}>
              {value}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
