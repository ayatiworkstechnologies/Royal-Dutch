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
  pending: 'bg-yellow-100/80 text-yellow-800 border border-yellow-200',
  confirmed: 'bg-blue-100/80 text-blue-800 border border-blue-200',
  completed: 'bg-green-100/80 text-green-800 border border-green-200',
  cancelled: 'bg-red-100/80 text-red-800 border border-red-200',
  rescheduled: 'bg-purple-100/80 text-purple-800 border border-purple-200',
  no_show: 'bg-gray-100/80 text-gray-800 border border-gray-200',
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
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 font-primary tracking-tight">Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1.5 font-secondary flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {format(new Date(), 'EEEE, MMMM d, yyyy')}
          </p>
        </div>
        <button
          type="button"
          onClick={fetchDashboard}
          className="p-3 text-(--primary-plum) hover:text-white bg-white hover:bg-(--primary-plum) shadow-sm hover:shadow-md rounded-full transition-all hover-lift"
          title="Refresh Dashboard"
        >
          <RefreshCcw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {error && (
        <div className="bg-red-50/80 backdrop-blur-md text-red-600 p-4 rounded-xl border border-red-100 font-secondary text-sm flex items-center gap-3">
          <XCircle className="h-5 w-5" /> {error}
        </div>
      )}

      {loading && !data && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-28 bg-slate-100/50 rounded-2xl animate-pulse" />
          ))}
        </div>
      )}

      {data && (
        <>
          {/* Today highlight */}
          <div className="relative rounded-3xl bg-linear-to-br from-(--primary-plum) via-[#632052] to-[#38072e] p-8 text-white shadow-soft overflow-hidden group">
            {/* Abstract background shapes */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 group-hover:bg-white/10 transition-all duration-700" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-(--primary-gold)/10 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4" />
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sun className="h-5 w-5 text-(--primary-gold) animate-pulse-slow" />
                  <span className="text-xs font-semibold text-(--primary-gold) uppercase tracking-widest font-secondary">Today's Overview</span>
                </div>
                <p className="text-6xl font-bold font-primary mb-2 tracking-tight">{data.todays_bookings}</p>
                <p className="text-white/70 text-sm font-secondary">Appointments scheduled for today</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full md:w-auto">
                <MiniStat label="Pending" value={data.pending_bookings} color="text-yellow-400" />
                <MiniStat label="Confirmed" value={data.confirmed_bookings} color="text-blue-400" />
                <MiniStat label="Completed" value={data.completed_bookings} color="text-green-400" />
                <MiniStat label="Total Patients" value={data.total_patients} color="text-white" />
              </div>
            </div>
          </div>

          {/* Booking status grid */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 font-secondary flex items-center gap-2">
              <span className="w-8 h-px bg-slate-300"></span> Booking Status
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
              <StatCard title="Today" value={data.todays_bookings} icon={<Sun className="h-5 w-5 text-orange-500" />} />
              <StatCard title="Pending" value={data.pending_bookings} icon={<Clock className="h-5 w-5 text-yellow-500" />} />
              <StatCard title="Confirmed" value={data.confirmed_bookings} icon={<CheckCircle className="h-5 w-5 text-blue-500" />} />
              <StatCard title="Completed" value={data.completed_bookings} icon={<CheckSquare className="h-5 w-5 text-green-500" />} />
              <StatCard title="Cancelled" value={data.cancelled_bookings} icon={<XCircle className="h-5 w-5 text-red-500" />} />
              <StatCard title="No-Show" value={data.no_show_bookings} icon={<UserX className="h-5 w-5 text-slate-500" />} />
            </div>
          </div>

          {/* Revenue grid */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 font-secondary flex items-center gap-2">
              <span className="w-8 h-px bg-slate-300"></span> Financial Summary
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <StatCard title="Invoice Total" value={fmt(data.invoice_revenue)} icon={<FileTextIcon className="h-5 w-5 text-purple-600" />} wide />
              <StatCard title="Collected" value={fmt(data.collected_revenue)} icon={<DollarSign className="h-5 w-5 text-emerald-600" />} wide />
              <StatCard title="Refunded" value={fmt(data.refunded_revenue)} icon={<CreditCard className="h-5 w-5 text-red-600" />} wide />
              <StatCard title="Net Revenue" value={fmt(data.net_revenue)} icon={<TrendingUp className="h-5 w-5 text-(--primary-gold)" />} highlight wide />
            </div>
          </div>

          {/* Bottom row: Recent bookings + Top services */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Bookings */}
            <div className="lg:col-span-2 glass-panel rounded-3xl shadow-soft overflow-hidden flex flex-col">
              <div className="px-6 py-5 border-b border-slate-200/50 flex items-center justify-between bg-white/40">
                <div className="flex items-center gap-3">
                  <div className="bg-(--primary-plum)/10 p-2 rounded-lg text-(--primary-plum)">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 font-primary">Recent Bookings</h3>
                </div>
                <a href="/admin/bookings" className="text-sm font-medium text-(--primary-plum) hover:text-(--primary-plum-light) hover:underline transition-colors font-secondary">
                  View all →
                </a>
              </div>
              <div className="overflow-x-auto grow">
                {data.recent_bookings.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full py-12 text-slate-400 font-secondary">
                    <Calendar className="h-10 w-10 mb-3 opacity-20" />
                    <p className="text-sm">No recent bookings found.</p>
                  </div>
                ) : (
                  <table className="min-w-full divide-y divide-slate-100/60">
                    <thead className="bg-slate-50/50">
                      <tr>
                        {['Code', 'Patient', 'Service', 'Date & Time', 'Status'].map(h => (
                          <th key={h} className="px-6 py-4 text-left text-[11px] font-bold text-slate-400 uppercase tracking-widest font-secondary">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100/60 bg-white/20">
                      {data.recent_bookings.map(b => (
                        <tr key={b.id} className="hover:bg-white/60 transition-colors">
                          <td className="px-6 py-4 text-xs font-mono text-(--primary-plum) font-bold whitespace-nowrap">{b.booking_code}</td>
                          <td className="px-6 py-4 text-sm text-slate-800 font-semibold whitespace-nowrap">{b.patient_name}</td>
                          <td className="px-6 py-4 text-sm text-slate-500 whitespace-nowrap max-w-[200px] truncate">{b.service_name}</td>
                          <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">
                            {b.booking_date ? format(parseISO(b.booking_date), 'MMM d, yyyy') : '—'}
                            <span className="text-slate-400 ml-2 text-xs">{b.booking_time?.slice(0, 5)}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${STATUS_STYLES[b.status] ?? 'bg-gray-100 text-gray-700'}`}>
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
            <div className="glass-panel rounded-3xl shadow-soft overflow-hidden flex flex-col">
              <div className="px-6 py-5 border-b border-slate-200/50 flex items-center gap-3 bg-white/40">
                <div className="bg-(--primary-gold)/10 p-2 rounded-lg text-(--primary-gold-dark)">
                  <Star className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 font-primary">Top Services</h3>
              </div>
              <div className="p-6 space-y-5 grow flex flex-col justify-center">
                {data.most_booked_services.length === 0 ? (
                  <div className="text-center text-slate-400 py-8">
                    <Star className="h-10 w-10 mx-auto mb-3 opacity-20" />
                    <p className="text-sm font-secondary">No service data yet.</p>
                  </div>
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
    <div className="group">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-slate-700 truncate max-w-[80%] transition-colors group-hover:text-(--primary-plum)">{label}</span>
        <span className="text-sm font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">{count}</span>
      </div>
      <div className="h-2 rounded-full bg-slate-100 overflow-hidden shadow-inner">
        <div
          className="h-full rounded-full bg-linear-to-r from-(--primary-plum) to-(--primary-gold) transition-all duration-1000 ease-out"
          style={{ width: `${pct}%` }}
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
    <div className={`glass-panel rounded-2xl hover-lift transition-all duration-300 relative overflow-hidden ${highlight ? 'border-(--primary-gold)/30 bg-white/90' : 'bg-white/80'}`}>
      {highlight && <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-(--primary-gold) to-(--primary-plum)"></div>}
      <div className="p-5 md:p-6">
        <div className="flex items-center gap-4">
          <div className={`shrink-0 rounded-2xl p-3 border shadow-sm ${highlight ? 'bg-(--primary-gold)/10 border-(--primary-gold)/20' : 'bg-white border-slate-100'}`}>
            {icon}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-500 font-secondary uppercase tracking-wider truncate mb-1">{title}</p>
            <p className={`font-bold font-primary truncate ${wide ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl'} ${highlight ? 'text-[#B48F57]' : 'text-slate-900'}`}>
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
    <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-center hover:bg-white/15 transition-colors">
      <p className={`text-2xl md:text-3xl font-bold font-primary ${color} mb-1 drop-shadow-sm`}>{value}</p>
      <p className="text-white/70 text-[10px] md:text-xs uppercase tracking-widest font-secondary font-semibold">{label}</p>
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
