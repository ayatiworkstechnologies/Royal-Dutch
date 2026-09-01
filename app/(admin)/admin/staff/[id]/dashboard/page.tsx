"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import api from '@/lib/api';
import { format, isToday, parseISO } from 'date-fns';
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  User,
  Stethoscope,
  RefreshCw,
  CalendarCheck,
  AlertCircle,
  CheckCircle2,
  Users,
  ChevronRight,
} from 'lucide-react';

interface Booking {
  id: number;
  booking_code: string;
  booking_date: string;
  booking_time: string;
  status: string;
  service_name: string | null;
  staff_name: string | null;
  notes: string | null;
  patient: {
    id: number;
    full_name: string;
    phone: string;
    email: string | null;
  };
}

interface Patient {
  id: number;
  full_name: string;
  email: string | null;
  phone: string;
  gender: string | null;
  age: number | null;
}

const STATUS_CFG: Record<string, { label: string; classes: string }> = {
  pending:     { label: 'Pending',     classes: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  confirmed:   { label: 'Confirmed',   classes: 'bg-blue-100 text-blue-800 border-blue-200' },
  completed:   { label: 'Completed',   classes: 'bg-green-100 text-green-800 border-green-200' },
  cancelled:   { label: 'Cancelled',   classes: 'bg-red-100 text-red-800 border-red-200' },
  no_show:     { label: 'No Show',     classes: 'bg-gray-100 text-gray-700 border-gray-200' },
  rescheduled: { label: 'Rescheduled', classes: 'bg-purple-100 text-purple-800 border-purple-200' },
};

type Tab = 'schedule' | 'patients';

export default function StaffAdminDashboardPage() {
  const { user, loading } = useAdminAuth();
  const router = useRouter();
  const params = useParams();
  const staffId = params?.id as string;

  const [tab, setTab] = useState<Tab>('schedule');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [fetching, setFetching] = useState(true);
  const [staffName, setStaffName] = useState<string>('');

  const fetchAll = useCallback(async () => {
    setFetching(true);
    try {
      const [bookingsRes, patientsRes, staffRes] = await Promise.all([
        api.get(`/api/staff/${staffId}/bookings`),
        api.get(`/api/staff/${staffId}/patients`),
        api.get('/api/staff'),
      ]);
      setBookings(bookingsRes.data);
      setPatients(patientsRes.data);
      const match = staffRes.data.find((s: { id: number; name: string }) => String(s.id) === staffId);
      setStaffName(match?.name ?? '');
    } catch {
      setBookings([]);
      setPatients([]);
    } finally {
      setFetching(false);
    }
  }, [staffId]);

  useEffect(() => {
    if (!loading && user) {
      fetchAll();
    }
  }, [user, loading, fetchAll]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-400">
        <RefreshCw className="w-6 h-6 animate-spin mr-2" /> Loading...
      </div>
    );
  }

  const todayCount = bookings.filter(b => isToday(parseISO(b.booking_date))).length;
  const pendingCount = bookings.filter(b => b.status === 'pending').length;
  const doneCount = bookings.filter(b => b.status === 'completed').length;

  return (
    <div className="space-y-6 pb-10">
      <Link href="/admin/staff" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 font-secondary">
        <ArrowLeft className="w-4 h-4" /> Back to Staff Management
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 font-primary tracking-tight">
            {staffName || 'Staff'}&apos;s Dashboard
          </h1>
          <p className="text-slate-500 font-secondary mt-1">Schedule and patients for this staff member</p>
        </div>
        <button
          onClick={fetchAll}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-medium transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${fetching ? 'animate-spin' : ''}`} /> Refresh
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Today's Appointments", value: todayCount, color: 'text-(--primary-plum)', icon: CalendarCheck },
          { label: 'Pending Action',        value: pendingCount, color: 'text-yellow-600', icon: AlertCircle },
          { label: 'Completed',             value: doneCount,    color: 'text-green-600',  icon: CheckCircle2 },
        ].map(s => (
          <div key={s.label} className="glass-panel rounded-2xl p-5 flex items-center gap-4">
            <div className={`p-2.5 rounded-xl bg-slate-50 ${s.color}`}>
              <s.icon className="w-5 h-5" />
            </div>
            <div>
              <p className={`text-2xl font-bold font-primary ${s.color}`}>{fetching ? '—' : s.value}</p>
              <p className="text-xs text-slate-500 font-secondary">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex rounded-xl border border-slate-200 overflow-hidden text-sm font-medium w-fit">
        {(['schedule', 'patients'] as Tab[]).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 transition-colors capitalize ${tab === t ? 'bg-(--primary-plum) text-white' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'schedule' ? (
        <div className="glass-panel rounded-3xl overflow-hidden shadow-soft">
          {fetching ? (
            <div className="p-8 space-y-3">
              {[1, 2, 3].map(i => <div key={i} className="h-24 bg-slate-100/60 rounded-xl animate-pulse" />)}
            </div>
          ) : bookings.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center text-center">
              <CalendarDays className="w-14 h-14 text-slate-200 mb-4" />
              <p className="text-lg font-semibold text-slate-700 font-primary">No appointments found</p>
            </div>
          ) : (
            <ul className="divide-y divide-slate-100/70">
              {bookings.map(b => {
                const cfg = STATUS_CFG[b.status] ?? STATUS_CFG.pending;
                return (
                  <li key={b.id} className="p-5 md:p-6 hover:bg-white/60 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      <div className="shrink-0 w-20 text-center">
                        <div className="bg-(--primary-plum)/8 rounded-xl p-2">
                          <p className="text-lg font-bold text-(--primary-plum) font-primary leading-tight">
                            {b.booking_time?.slice(0, 5)}
                          </p>
                          <p className="text-[10px] text-slate-400 font-secondary mt-0.5">
                            {format(parseISO(b.booking_date), 'MMM d')}
                          </p>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <Link
                            href={`/admin/staff/${staffId}/dashboard/patients/${b.patient.id}`}
                            className="text-base font-bold text-slate-800 font-primary hover:text-(--primary-plum) hover:underline"
                          >
                            {b.patient.full_name}
                          </Link>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${cfg.classes}`}>
                            {cfg.label}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500 font-secondary">
                          <span className="flex items-center gap-1.5">
                            <Stethoscope className="w-3.5 h-3.5 text-slate-400" />
                            {b.service_name ?? '—'}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-slate-400" />
                            {b.patient.phone}
                          </span>
                          <span className="flex items-center gap-1.5 text-slate-400 text-xs">
                            <Clock className="w-3 h-3" />
                            #{b.booking_code}
                          </span>
                        </div>
                        {b.notes && (
                          <p className="mt-1.5 text-xs text-slate-400 italic font-secondary line-clamp-1">
                            Note: {b.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      ) : (
        <div className="glass-panel rounded-3xl overflow-hidden shadow-soft">
          {fetching ? (
            <div className="p-8 space-y-3">
              {[1, 2, 3].map(i => <div key={i} className="h-16 bg-slate-100/60 rounded-xl animate-pulse" />)}
            </div>
          ) : patients.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center text-center">
              <Users className="w-14 h-14 text-slate-200 mb-4" />
              <p className="text-lg font-semibold text-slate-700 font-primary">No patients found</p>
            </div>
          ) : (
            <ul className="divide-y divide-slate-100/70">
              {patients.map(p => (
                <li key={p.id}>
                  <Link
                    href={`/admin/staff/${staffId}/dashboard/patients/${p.id}`}
                    className="flex items-center justify-between gap-4 p-5 md:p-6 hover:bg-white/60 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-10 w-10 shrink-0 rounded-full bg-(--primary-plum)/10 flex items-center justify-center font-bold text-(--primary-plum)">
                        {p.full_name.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-slate-800 truncate">{p.full_name}</p>
                        <p className="text-xs text-slate-500 font-secondary">
                          {p.phone}{p.gender ? ` · ${p.gender}` : ''}{p.age ? ` · ${p.age} yrs` : ''}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
