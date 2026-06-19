"use client";

import React, { useEffect, useState } from 'react';
import { useCustomerAuth } from '@/hooks/useCustomerAuth';
import api from '@/lib/api';
import Link from 'next/link';
import { format, parseISO, isPast } from 'date-fns';
import {
  CalendarCheck,
  UserCircle,
  Receipt,
  Clock,
  CheckCircle,
  XCircle,
  ChevronRight,
  AlertCircle,
  ArrowRight,
  Calendar,
} from 'lucide-react';

interface Booking {
  id: number;
  booking_code: string;
  booking_date: string;
  booking_time: string;
  status: string;
  service_name: string;
  staff_name: string | null;
  price: number;
  currency: string;
}

interface Invoice {
  id: number;
  invoice_number: string;
  status: string;
  total_amount: number;
  currency: string;
}

const STATUS_BADGE: Record<string, string> = {
  confirmed: 'bg-blue-100/80 text-blue-800 border border-blue-200',
  pending: 'bg-yellow-100/80 text-yellow-800 border border-yellow-200',
  completed: 'bg-green-100/80 text-green-800 border border-green-200',
  cancelled: 'bg-red-100/80 text-red-800 border border-red-200',
  no_show: 'bg-gray-100/80 text-gray-700 border border-gray-200',
  rescheduled: 'bg-purple-100/80 text-purple-800 border border-purple-200',
};

export default function CustomerDashboardPage() {
  const { user } = useCustomerAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    Promise.all([
      api.get('/api/bookings/me').then(r => r.data).catch(() => []),
      api.get('/api/billing/me').then(r => r.data).catch(() => []),
    ]).then(([b, inv]) => {
      setBookings(b);
      setInvoices(inv);
    }).finally(() => setLoading(false));
  }, [user]);

  if (!user) return null;

  const upcoming = bookings.filter(b =>
    ['pending', 'confirmed', 'rescheduled'].includes(b.status) &&
    !isPast(parseISO(b.booking_date + 'T' + (b.booking_time || '00:00')))
  ).slice(0, 3);

  const totalBookings = bookings.length;
  const completedCount = bookings.filter(b => b.status === 'completed').length;
  const unpaidInvoices = invoices.filter(inv => ['draft', 'issued', 'partially_paid'].includes(inv.status)).length;

  return (
    <div className="space-y-8 pb-10 max-w-6xl mx-auto">
      {/* Welcome */}
      <div className="relative rounded-3xl bg-linear-to-br from-(--primary-plum) via-[#632052] to-[#38072e] px-8 py-10 text-white shadow-soft overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 group-hover:bg-white/10 transition-all duration-700" />
        <div className="absolute bottom-0 left-10 w-48 h-48 bg-(--primary-gold)/10 rounded-full blur-2xl translate-y-1/2" />
        
        <div className="relative z-10">
          <p className="text-(--primary-gold) text-xs font-bold uppercase tracking-widest mb-3 font-secondary flex items-center gap-2">
            <span className="w-6 h-px bg-(--primary-gold)"></span> Patient Portal
          </p>
          <h1 className="text-4xl md:text-5xl font-bold font-primary tracking-tight mb-2">
            Welcome back, {user.full_name?.split(' ')[0] || user.first_name || 'Patient'}
          </h1>
          <p className="text-white/70 text-base max-w-xl font-secondary">Manage your appointments, access your invoices, and keep your personal information up to date.</p>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="glass-panel rounded-2xl p-6 text-center hover-lift transition-all flex flex-col items-center justify-center min-h-[140px]">
          <p className="text-4xl font-bold font-primary text-slate-800 mb-2">{loading ? '—' : totalBookings}</p>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest font-secondary">Total Bookings</p>
        </div>
        <div className="glass-panel rounded-2xl p-6 text-center hover-lift transition-all flex flex-col items-center justify-center min-h-[140px]">
          <p className="text-4xl font-bold font-primary text-green-600 mb-2">{loading ? '—' : completedCount}</p>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest font-secondary">Completed Visits</p>
        </div>
        <div className="glass-panel rounded-2xl p-6 text-center hover-lift transition-all flex flex-col items-center justify-center min-h-[140px]">
          <p className={`text-4xl font-bold font-primary mb-2 ${unpaidInvoices > 0 ? 'text-(--primary-gold-dark)' : 'text-slate-400'}`}>
            {loading ? '—' : unpaidInvoices}
          </p>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest font-secondary">Unpaid Invoices</p>
        </div>
      </div>

      {/* Upcoming appointments */}
      <div className="glass-panel rounded-3xl shadow-soft overflow-hidden">
        <div className="flex items-center justify-between px-6 md:px-8 py-5 border-b border-slate-200/50 bg-white/40">
          <div className="flex items-center gap-3">
            <div className="bg-(--primary-gold)/10 p-2 rounded-lg text-(--primary-gold-dark)">
              <CalendarCheck className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-800 font-primary">Upcoming Appointments</h2>
          </div>
          <Link href="/customer/bookings" className="text-sm font-semibold text-(--primary-plum) hover:text-(--primary-plum-light) hover:underline flex items-center gap-1 font-secondary transition-colors">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {loading ? (
          <div className="p-6 md:px-8 space-y-4">
            {[1, 2].map(i => <div key={i} className="h-20 bg-slate-100/50 rounded-xl animate-pulse" />)}
          </div>
        ) : upcoming.length === 0 ? (
          <div className="py-16 px-6 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <Calendar className="h-8 w-8 text-slate-300" />
            </div>
            <p className="text-lg font-semibold text-slate-700 font-primary mb-1">No upcoming appointments</p>
            <p className="text-sm text-slate-500 font-secondary mb-6 max-w-sm">Use the AI assistant below or contact the clinic to schedule your next visit.</p>
          </div>
        ) : (
          <ul className="divide-y divide-slate-100/60 bg-white/20">
            {upcoming.map(b => (
              <li key={b.id} className="px-6 md:px-8 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/60 transition-colors">
                <div>
                  <p className="text-base font-bold text-slate-800 font-primary">{b.service_name}</p>
                  <div className="flex flex-wrap items-center gap-3 mt-1.5 text-sm text-slate-500 font-secondary">
                    <span className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                      <Clock className="h-4 w-4 text-(--primary-plum)" />
                      <span className="font-medium text-slate-700">{format(parseISO(b.booking_date), 'MMMM d, yyyy')}</span> at <span className="font-medium text-slate-700">{b.booking_time?.slice(0, 5)}</span>
                    </span>
                    {b.staff_name && (
                      <span className="flex items-center gap-1">
                        <UserCircle className="h-4 w-4 text-slate-400" />
                        Dr. {b.staff_name}
                      </span>
                    )}
                  </div>
                </div>
                <div className="self-start md:self-auto shrink-0">
                  <span className={`px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${STATUS_BADGE[b.status] ?? 'bg-gray-100 text-gray-700'}`}>
                    {b.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Quick links */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 font-secondary flex items-center gap-2">
           <span className="w-8 h-px bg-slate-300"></span> Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <QuickLink 
            href="/customer/profile" 
            icon={<UserCircle className="h-8 w-8" />} 
            title="My Profile" 
            desc="Update your personal details, medical history, and contact information." 
          />
          <QuickLink 
            href="/customer/bookings" 
            icon={<CalendarCheck className="h-8 w-8" />} 
            title="My Bookings" 
            desc="View your upcoming appointments and complete booking history." 
          />
          <QuickLink 
            href="/customer/invoices" 
            icon={<Receipt className="h-8 w-8" />} 
            title="My Invoices" 
            desc="Access your billing statements and download PDF receipts for your visits." 
            badge={unpaidInvoices > 0 ? unpaidInvoices : undefined} 
          />
        </div>
      </div>
    </div>
  );
}

function QuickLink({
  href,
  icon,
  title,
  desc,
  badge,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  badge?: number;
}) {
  return (
    <Link href={href} className="block group relative h-full">
      <div className="glass-panel p-7 rounded-3xl hover-lift transition-all duration-300 h-full flex flex-col group-hover:bg-white/90 group-hover:border-(--primary-gold)/30">
        <div className="mb-5 bg-(--primary-plum)/5 p-3 rounded-2xl inline-flex text-(--primary-plum) group-hover:bg-(--primary-plum) group-hover:text-white transition-colors duration-300">
          {icon}
        </div>
        <h2 className="text-lg font-bold text-slate-800 font-primary mb-2 group-hover:text-(--primary-plum) transition-colors">{title}</h2>
        <p className="text-sm text-slate-500 font-secondary leading-relaxed flex-grow">{desc}</p>
        
        <div className="mt-6 flex items-center text-sm font-semibold text-(--primary-gold) opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          Access now <ArrowRight className="h-4 w-4 ml-1" />
        </div>

        {badge !== undefined && (
          <span className="absolute top-6 right-6 flex h-6 w-6 items-center justify-center rounded-full bg-(--primary-gold) text-xs font-bold text-white shadow-md shadow-(--primary-gold)/20">
            {badge}
          </span>
        )}
      </div>
    </Link>
  );
}
