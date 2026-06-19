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
  confirmed: 'bg-blue-100 text-blue-800',
  pending: 'bg-yellow-100 text-yellow-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  no_show: 'bg-gray-100 text-gray-700',
  rescheduled: 'bg-purple-100 text-purple-800',
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
    <div className="space-y-8">
      {/* Welcome */}
      <div className="rounded-2xl bg-[#171717] px-8 py-7 text-white">
        <p className="text-[#B48F57] text-xs font-semibold uppercase tracking-widest mb-1 font-cinzel">Patient Portal</p>
        <h1 className="text-2xl font-bold font-cinzel tracking-wide">
          Welcome back, {user.first_name || 'Patient'}
        </h1>
        <p className="text-white/50 text-sm mt-1">Manage your appointments, invoices, and personal information.</p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 p-5 text-center shadow-sm">
          <p className="text-3xl font-bold text-[#171717]">{loading ? '—' : totalBookings}</p>
          <p className="text-xs text-gray-500 mt-1 uppercase tracking-wide">Total Bookings</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5 text-center shadow-sm">
          <p className="text-3xl font-bold text-green-600">{loading ? '—' : completedCount}</p>
          <p className="text-xs text-gray-500 mt-1 uppercase tracking-wide">Completed</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5 text-center shadow-sm">
          <p className={`text-3xl font-bold ${unpaidInvoices > 0 ? 'text-amber-600' : 'text-gray-400'}`}>
            {loading ? '—' : unpaidInvoices}
          </p>
          <p className="text-xs text-gray-500 mt-1 uppercase tracking-wide">Unpaid Invoices</p>
        </div>
      </div>

      {/* Upcoming appointments */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <CalendarCheck className="h-4 w-4 text-[#B48F57]" />
            <h2 className="text-sm font-semibold text-gray-900">Upcoming Appointments</h2>
          </div>
          <Link href="/customer/bookings" className="text-xs text-[#B48F57] hover:underline flex items-center gap-1">
            View all <ChevronRight className="h-3 w-3" />
          </Link>
        </div>

        {loading ? (
          <div className="p-6 space-y-3">
            {[1, 2].map(i => <div key={i} className="h-14 bg-gray-100 rounded-lg animate-pulse" />)}
          </div>
        ) : upcoming.length === 0 ? (
          <div className="py-10 text-center">
            <AlertCircle className="mx-auto h-8 w-8 text-gray-200 mb-2" />
            <p className="text-sm text-gray-400">No upcoming appointments</p>
            <p className="text-xs text-gray-300 mt-1">Use the AI assistant below to book one</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-50">
            {upcoming.map(b => (
              <li key={b.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{b.service_name}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {format(parseISO(b.booking_date), 'MMM d, yyyy')} · {b.booking_time?.slice(0, 5)}
                    </span>
                    {b.staff_name && <span>Dr. {b.staff_name}</span>}
                  </div>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${STATUS_BADGE[b.status] ?? 'bg-gray-100 text-gray-700'}`}>
                  {b.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <QuickLink href="/customer/profile" icon={<UserCircle className="h-9 w-9 text-[#B48F57]" />} title="My Profile" desc="Update your personal details and contact information." />
        <QuickLink href="/customer/bookings" icon={<CalendarCheck className="h-9 w-9 text-[#B48F57]" />} title="My Bookings" desc="View upcoming appointments and your full booking history." />
        <QuickLink href="/customer/invoices" icon={<Receipt className="h-9 w-9 text-[#B48F57]" />} title="My Invoices" desc="Access billing statements and download PDF receipts." badge={unpaidInvoices > 0 ? unpaidInvoices : undefined} />
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
    <Link href={href} className="block group relative">
      <div className="bg-white p-6 rounded-xl border border-gray-200 hover:border-[#B48F57] hover:shadow-md transition-all h-full">
        <div className="mb-4 group-hover:scale-110 transition-transform inline-block">{icon}</div>
        <h2 className="text-base font-semibold text-gray-900 mb-1">{title}</h2>
        <p className="text-sm text-gray-500">{desc}</p>
        {badge !== undefined && (
          <span className="absolute top-4 right-4 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white">
            {badge}
          </span>
        )}
      </div>
    </Link>
  );
}
