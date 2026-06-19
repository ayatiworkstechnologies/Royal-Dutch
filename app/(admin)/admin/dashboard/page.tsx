"use client";

import React, { useEffect, useState } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import api from '@/lib/api';
import { format, parseISO } from 'date-fns';
import {
  Calendar,
  CheckCircle,
  Clock,
  CheckSquare,
  DollarSign,
  TrendingUp,
  CreditCard,
  RefreshCcw,
  XCircle,
  UserX,
  Sun,
  Star,
} from 'lucide-react';

interface RecentBooking {
  id: number;
  booking_code: string;
  booking_date: string;
  booking_time: string;
  status: string;
  price: number;
  currency: string;
  patient_name: string;
  service_name: string;
  staff_name: string | null;
}

interface TopService {
  service: string;
  count: number;
}

interface DashboardData {
  todays_bookings: number;
  pending_bookings: number;
  confirmed_bookings: number;
  completed_bookings: number;
  cancelled_bookings: number;
  no_show_bookings: number;
  total_patients: number;
  invoice_revenue: number;
  collected_revenue: number;
  refunded_revenue: number;
  net_revenue: number;
  most_booked_services: TopService[];
  recent_bookings: RecentBooking[];
}

const STATUS_STYLES: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  rescheduled: 'bg-purple-100 text-purple-800',
  no_show: 'bg-gray-100 text-gray-800',
};

export default function AdminDashboardPage() {
  const { user } = useAdminAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDashboard = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/api/dashboard');
      setData(response.data);
    } catch {
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchDashboard();
  }, [user]);

  if (!user) return null;

  const fmt = (n: number) =>
    `AED ${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-primary tracking-tight">Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1 font-secondary">
            {format(new Date(), 'EEEE, MMMM d, yyyy')}
          </p>
        </div>
        <button
          type="button"
          onClick={fetchDashboard}
          className="p-2.5 text-slate-500 hover:text-(--primary-gold) hover:bg-(--primary-gold)/10 rounded-full transition-all"
          title="Refresh"
        >
          <RefreshCcw className={`h-5 w-5 ${loading ? 'animate-spin text-(--primary-gold)' : ''}`} />
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 font-secondary text-sm">
          {error}
        </div>
      )}

      {loading && !data && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-28 bg-slate-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      )}

      {data && (
        <>
          {/* Today highlight */}
          <div className="rounded-2xl bg-linear-to-r from-(--primary-plum) to-[#38072e] p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Sun className="h-5 w-5 text-(--primary-gold)" />
                  <span className="text-sm font-medium text-white/70 uppercase tracking-widest font-secondary">Today</span>
                </div>
                <p className="text-5xl font-bold font-primary">{data.todays_bookings}</p>
                <p className="text-white/60 text-sm mt-1 font-secondary">Appointments scheduled today</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <MiniStat label="Pending" value={data.pending_bookings} color="text-yellow-300" />
                <MiniStat label="Confirmed" value={data.confirmed_bookings} color="text-blue-300" />
                <MiniStat label="Completed" value={data.completed_bookings} color="text-green-300" />
                <MiniStat label="Patients" value={data.total_patients} color="text-purple-300" />
              </div>
            </div>
          </div>

          {/* Booking status grid */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3 font-secondary">Booking Overview</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <StatCard title="Today" value={data.todays_bookings} icon={<Sun className="h-5 w-5 text-orange-500" />} />
              <StatCard title="Pending" value={data.pending_bookings} icon={<Clock className="h-5 w-5 text-yellow-500" />} />
              <StatCard title="Confirmed" value={data.confirmed_bookings} icon={<CheckCircle className="h-5 w-5 text-blue-500" />} />
              <StatCard title="Completed" value={data.completed_bookings} icon={<CheckSquare className="h-5 w-5 text-green-500" />} />
              <StatCard title="Cancelled" value={data.cancelled_bookings} icon={<XCircle className="h-5 w-5 text-red-500" />} />
              <StatCard title="No-Show" value={data.no_show_bookings} icon={<UserX className="h-5 w-5 text-gray-500" />} />
            </div>
          </div>

          {/* Revenue grid */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3 font-secondary">Revenue</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard title="Invoice Total" value={fmt(data.invoice_revenue)} icon={<FileTextIcon className="h-5 w-5 text-purple-600" />} wide />
              <StatCard title="Collected" value={fmt(data.collected_revenue)} icon={<DollarSign className="h-5 w-5 text-emerald-600" />} wide />
              <StatCard title="Refunded" value={fmt(data.refunded_revenue)} icon={<CreditCard className="h-5 w-5 text-red-600" />} wide />
              <StatCard title="Net Revenue" value={fmt(data.net_revenue)} icon={<TrendingUp className="h-5 w-5 text-[#B48F57]" />} highlight wide />
            </div>
          </div>

          {/* Bottom row: Recent bookings + Top services */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Bookings */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-soft ring-1 ring-slate-900/5 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-(--primary-plum)" />
                  <h3 className="text-sm font-semibold text-slate-800 font-primary">Recent Bookings</h3>
                </div>
                <a href="/admin/bookings" className="text-xs text-(--primary-plum) hover:underline font-secondary">
                  View all →
                </a>
              </div>
              <div className="overflow-x-auto">
                {data.recent_bookings.length === 0 ? (
                  <p className="text-center text-slate-400 text-sm py-8 font-secondary">No bookings yet</p>
                ) : (
                  <table className="min-w-full divide-y divide-slate-100">
                    <thead className="bg-slate-50">
                      <tr>
                        {['Code', 'Patient', 'Service', 'Date', 'Status'].map(h => (
                          <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider font-secondary">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {data.recent_bookings.map(b => (
                        <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-3 text-xs font-mono text-(--primary-plum) font-bold whitespace-nowrap">{b.booking_code}</td>
                          <td className="px-4 py-3 text-xs text-slate-800 font-medium whitespace-nowrap">{b.patient_name}</td>
                          <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap max-w-32 truncate">{b.service_name}</td>
                          <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">
                            {b.booking_date ? format(parseISO(b.booking_date), 'MMM d') : '—'}&nbsp;
                            <span className="text-slate-400">{b.booking_time?.slice(0, 5)}</span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${STATUS_STYLES[b.status] ?? 'bg-gray-100 text-gray-700'}`}>
                              {b.status.replace('_', ' ')}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            {/* Top Services */}
            <div className="bg-white rounded-2xl shadow-soft ring-1 ring-slate-900/5 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
                <Star className="h-4 w-4 text-(--primary-gold)" />
                <h3 className="text-sm font-semibold text-slate-800 font-primary">Top Services</h3>
              </div>
              <div className="p-4 space-y-3">
                {data.most_booked_services.length === 0 ? (
                  <p className="text-center text-slate-400 text-sm py-4 font-secondary">No data yet</p>
                ) : (
                  data.most_booked_services.map((s, i) => {
                    const max = data.most_booked_services[0].count;
                    const pct = max > 0 ? Math.round((s.count / max) * 100) : 0;
                    return (
                      <ProgressRow key={i} label={s.service} count={s.count} pct={pct} />
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function ProgressRow({ label, count, pct }: { label: string; count: number; pct: number }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-medium text-slate-700 truncate max-w-35">{label}</span>
        <span className="text-xs font-bold text-slate-500 ml-2">{count}</span>
      </div>
      <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
        <div
          className={`h-full rounded-full bg-linear-to-r from-(--primary-plum) to-(--primary-gold) transition-all duration-500 [--pct:${pct}%] w-(--pct)`}
        />
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  highlight = false,
  wide = false,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  highlight?: boolean;
  wide?: boolean;
}) {
  return (
    <div className={`overflow-hidden rounded-2xl bg-white shadow-soft ring-1 transition-all ${highlight ? 'ring-(--primary-gold)/30' : 'ring-slate-900/5'}`}>
      <div className="p-5">
        <div className="flex items-center gap-3">
          <div className="shrink-0 bg-slate-50 rounded-xl p-2.5 border border-slate-100">
            {icon}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-slate-500 font-secondary truncate">{title}</p>
            <p className={`font-bold font-primary truncate ${wide ? 'text-base mt-0.5' : 'text-2xl mt-1'} ${highlight ? 'text-[#B48F57]' : 'text-slate-900'}`}>
              {value}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniStat({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="bg-white/10 rounded-xl px-3 py-2 text-center">
      <p className={`text-xl font-bold ${color}`}>{value}</p>
      <p className="text-white/50 text-[10px] uppercase tracking-wider font-secondary">{label}</p>
    </div>
  );
}

function FileTextIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <line x1="10" x2="8" y1="9" y2="9" />
    </svg>
  );
}
