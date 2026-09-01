"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { useAdminAuth, CLINICAL_ROLES } from '@/hooks/useAdminAuth';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { format, isToday, parseISO } from 'date-fns';
import {
  CalendarDays,
  Clock,
  User,
  Stethoscope,
  CheckCircle2,
  XCircle,
  AlertCircle,
  RefreshCw,
  CalendarCheck,
  Link2,
  Pill,
  Plus,
  X,
} from 'lucide-react';
import Link from 'next/link';

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

interface Prescription {
  id: number;
  booking_id: number;
  drug_name: string;
  dosage: string;
  frequency: string;
  duration: string;
  notes: string | null;
}

const EMPTY_PRESCRIPTION_FORM = { drug_name: '', dosage: '', frequency: '', duration: '', notes: '' };

const STATUS_CFG: Record<string, { label: string; classes: string }> = {
  pending:     { label: 'Pending',     classes: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  confirmed:   { label: 'Confirmed',   classes: 'bg-blue-100 text-blue-800 border-blue-200' },
  completed:   { label: 'Completed',   classes: 'bg-green-100 text-green-800 border-green-200' },
  cancelled:   { label: 'Cancelled',   classes: 'bg-red-100 text-red-800 border-red-200' },
  no_show:     { label: 'No Show',     classes: 'bg-gray-100 text-gray-700 border-gray-200' },
  rescheduled: { label: 'Rescheduled', classes: 'bg-purple-100 text-purple-800 border-purple-200' },
};

const NEXT_ACTIONS: Record<string, { status: string; label: string; icon: React.ElementType; classes: string }[]> = {
  pending:   [
    { status: 'confirmed', label: 'Confirm',  icon: CheckCircle2, classes: 'bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200' },
    { status: 'cancelled', label: 'Cancel',   icon: XCircle,      classes: 'bg-red-50 text-red-600 hover:bg-red-100 border-red-200' },
  ],
  confirmed: [
    { status: 'completed', label: 'Complete', icon: CheckCircle2, classes: 'bg-green-50 text-green-700 hover:bg-green-100 border-green-200' },
    { status: 'no_show',   label: 'No Show',  icon: AlertCircle,  classes: 'bg-gray-50 text-gray-600 hover:bg-gray-100 border-gray-200' },
    { status: 'cancelled', label: 'Cancel',   icon: XCircle,      classes: 'bg-red-50 text-red-600 hover:bg-red-100 border-red-200' },
  ],
  rescheduled: [
    { status: 'confirmed', label: 'Confirm',  icon: CheckCircle2, classes: 'bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200' },
    { status: 'cancelled', label: 'Cancel',   icon: XCircle,      classes: 'bg-red-50 text-red-600 hover:bg-red-100 border-red-200' },
  ],
};

type FilterDate = 'today' | 'all';
type FilterStatus = 'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no_show' | 'rescheduled';

export default function StaffDashboardPage() {
  const { user, loading } = useAdminAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [fetching, setFetching] = useState(true);
  const [dateFilter, setDateFilter] = useState<FilterDate>('today');
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('all');
  const [updating, setUpdating] = useState<number | null>(null);
  const [prescriptionBooking, setPrescriptionBooking] = useState<Booking | null>(null);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [prescriptionForm, setPrescriptionForm] = useState(EMPTY_PRESCRIPTION_FORM);
  const [prescriptionsLoading, setPrescriptionsLoading] = useState(false);
  const [savingPrescription, setSavingPrescription] = useState(false);

  const fetchBookings = useCallback(async () => {
    setFetching(true);
    try {
      const params: Record<string, string> = {};
      if (dateFilter === 'today') params.booking_date = format(new Date(), 'yyyy-MM-dd');
      if (statusFilter !== 'all') params.status = statusFilter;
      const res = await api.get('/api/staff/me/bookings', { params });
      setBookings(res.data);
    } catch {
      setBookings([]);
    } finally {
      setFetching(false);
    }
  }, [dateFilter, statusFilter]);

  useEffect(() => {
    if (!loading && user) {
      if (!CLINICAL_ROLES.includes(user.role)) {
        router.push('/admin/dashboard');
        return;
      }
      if (!user.staff_id) return;
      fetchBookings();
    }
  }, [user, loading, fetchBookings, router]);

  const updateStatus = async (bookingId: number, status: string) => {
    const note = window.prompt('Add a note for this status change (optional):', '');
    if (note === null) return; // cancelled
    setUpdating(bookingId);
    try {
      await api.patch(`/api/staff/me/bookings/${bookingId}/status`, { status, notes: note || undefined });
      await fetchBookings();
    } finally {
      setUpdating(null);
    }
  };

  const openPrescriptions = async (booking: Booking) => {
    setPrescriptionBooking(booking);
    setPrescriptionForm(EMPTY_PRESCRIPTION_FORM);
    setPrescriptionsLoading(true);
    try {
      const res = await api.get(`/api/staff/me/bookings/${booking.id}/prescriptions`);
      setPrescriptions(res.data);
    } catch {
      setPrescriptions([]);
    } finally {
      setPrescriptionsLoading(false);
    }
  };

  const closePrescriptions = () => {
    setPrescriptionBooking(null);
    setPrescriptions([]);
    setPrescriptionForm(EMPTY_PRESCRIPTION_FORM);
  };

  const submitPrescription = async () => {
    if (!prescriptionBooking) return;
    if (!prescriptionForm.drug_name || !prescriptionForm.dosage || !prescriptionForm.frequency || !prescriptionForm.duration) return;
    setSavingPrescription(true);
    try {
      const res = await api.post(`/api/staff/me/bookings/${prescriptionBooking.id}/prescriptions`, prescriptionForm);
      setPrescriptions(prev => [res.data, ...prev]);
      setPrescriptionForm(EMPTY_PRESCRIPTION_FORM);
    } finally {
      setSavingPrescription(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-400">
        <RefreshCw className="w-6 h-6 animate-spin mr-2" /> Loading...
      </div>
    );
  }

  if (!user?.staff_id) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-12 text-center">
        <Link2 className="w-16 h-16 text-slate-300 mb-4" />
        <h2 className="text-2xl font-bold text-slate-900 font-primary">No Staff Profile Linked</h2>
        <p className="text-slate-500 mt-2 max-w-md font-secondary">
          Your account is not linked to a staff record yet. Ask the admin to link your account in Staff Management.
        </p>
      </div>
    );
  }

  const todayCount   = bookings.filter(b => isToday(parseISO(b.booking_date))).length;
  const pendingCount = bookings.filter(b => b.status === 'pending').length;
  const doneCount    = bookings.filter(b => b.status === 'completed').length;

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 font-primary tracking-tight">My Schedule</h1>
          <p className="text-slate-500 font-secondary mt-1">
            {user.full_name || user.first_name} — {format(new Date(), 'EEEE, MMMM d yyyy')}
          </p>
        </div>
        <button
          onClick={fetchBookings}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-medium transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${fetching ? 'animate-spin' : ''}`} /> Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Today's Appointments", value: todayCount, color: 'text-(--primary-plum)', icon: CalendarCheck },
          { label: 'Pending Action',        value: pendingCount, color: 'text-yellow-600', icon: AlertCircle },
          { label: 'Completed Today',       value: doneCount,    color: 'text-green-600',  icon: CheckCircle2 },
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

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex rounded-xl border border-slate-200 overflow-hidden text-sm font-medium">
          {(['today', 'all'] as FilterDate[]).map(d => (
            <button
              key={d}
              onClick={() => setDateFilter(d)}
              className={`px-4 py-2 transition-colors ${dateFilter === d ? 'bg-(--primary-plum) text-white' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              {d === 'today' ? 'Today' : 'All Dates'}
            </button>
          ))}
        </div>

        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value as FilterStatus)}
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-(--primary-plum)/30"
        >
          <option value="all">All Statuses</option>
          {Object.entries(STATUS_CFG).map(([v, c]) => (
            <option key={v} value={v}>{c.label}</option>
          ))}
        </select>
      </div>

      {/* Bookings list */}
      <div className="glass-panel rounded-3xl overflow-hidden shadow-soft">
        {fetching ? (
          <div className="p-8 space-y-3">
            {[1, 2, 3].map(i => <div key={i} className="h-24 bg-slate-100/60 rounded-xl animate-pulse" />)}
          </div>
        ) : bookings.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <CalendarDays className="w-14 h-14 text-slate-200 mb-4" />
            <p className="text-lg font-semibold text-slate-700 font-primary">No appointments found</p>
            <p className="text-sm text-slate-400 font-secondary mt-1">Try changing the date or status filter.</p>
          </div>
        ) : (
          <ul className="divide-y divide-slate-100/70">
            {bookings.map(b => {
              const cfg = STATUS_CFG[b.status] ?? STATUS_CFG.pending;
              const actions = NEXT_ACTIONS[b.status] ?? [];
              const isUpdating = updating === b.id;
              return (
                <li key={b.id} className="p-5 md:p-6 hover:bg-white/60 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    {/* Time column */}
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

                    {/* Main info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <Link
                          href={`/admin/staff-dashboard/patients/${b.patient.id}`}
                          className="text-base font-bold text-slate-800 font-primary hover:text-(--primary-plum) hover:underline"
                        >
                          {b.patient.full_name}
                        </Link>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${cfg.classes}`}>
                          {cfg.label}
                        </span>
                        {isToday(parseISO(b.booking_date)) && (
                          <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-(--primary-gold)/15 text-(--primary-gold-dark) border border-(--primary-gold)/30">
                            Today
                          </span>
                        )}
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

                    {/* Actions */}
                    <div className="shrink-0 flex flex-wrap gap-2">
                      {actions.map(a => (
                        <button
                          key={a.status}
                          disabled={isUpdating}
                          onClick={() => updateStatus(b.id, a.status)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors disabled:opacity-50 ${a.classes}`}
                        >
                          {isUpdating ? (
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <a.icon className="w-3.5 h-3.5" />
                          )}
                          {a.label}
                        </button>
                      ))}
                      <button
                        onClick={() => openPrescriptions(b)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors bg-(--primary-plum)/8 text-(--primary-plum) hover:bg-(--primary-plum)/15 border-(--primary-plum)/20"
                      >
                        <Pill className="w-3.5 h-3.5" />
                        Medicines
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Prescriptions modal */}
      {prescriptionBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={closePrescriptions}>
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[85vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-primary">Medicines</h3>
                <p className="text-xs text-slate-500 font-secondary">
                  {prescriptionBooking.patient.full_name} — #{prescriptionBooking.booking_code}
                </p>
              </div>
              <button onClick={closePrescriptions} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              {/* Existing prescriptions */}
              {prescriptionsLoading ? (
                <div className="space-y-2">
                  {[1, 2].map(i => <div key={i} className="h-14 bg-slate-100/60 rounded-xl animate-pulse" />)}
                </div>
              ) : prescriptions.length === 0 ? (
                <p className="text-sm text-slate-400 font-secondary">No medicines added yet.</p>
              ) : (
                <ul className="space-y-2">
                  {prescriptions.map(p => (
                    <li key={p.id} className="border border-slate-100 rounded-xl p-3">
                      <p className="text-sm font-semibold text-slate-800 font-primary">{p.drug_name}</p>
                      <p className="text-xs text-slate-500 font-secondary mt-0.5">
                        {p.dosage} · {p.frequency} · {p.duration}
                      </p>
                      {p.notes && <p className="text-xs text-slate-400 font-secondary mt-1 italic">{p.notes}</p>}
                    </li>
                  ))}
                </ul>
              )}

              {/* Add new */}
              <div className="border-t border-slate-100 pt-4 space-y-3">
                <p className="text-sm font-semibold text-slate-700 font-primary">Add medicine</p>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    placeholder="Drug name"
                    value={prescriptionForm.drug_name}
                    onChange={e => setPrescriptionForm(f => ({ ...f, drug_name: e.target.value }))}
                    className="col-span-2 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-(--primary-plum)/30"
                  />
                  <input
                    placeholder="Dosage (e.g. 500mg)"
                    value={prescriptionForm.dosage}
                    onChange={e => setPrescriptionForm(f => ({ ...f, dosage: e.target.value }))}
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-(--primary-plum)/30"
                  />
                  <input
                    placeholder="Frequency (e.g. 2x/day)"
                    value={prescriptionForm.frequency}
                    onChange={e => setPrescriptionForm(f => ({ ...f, frequency: e.target.value }))}
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-(--primary-plum)/30"
                  />
                  <input
                    placeholder="Duration (e.g. 5 days)"
                    value={prescriptionForm.duration}
                    onChange={e => setPrescriptionForm(f => ({ ...f, duration: e.target.value }))}
                    className="col-span-2 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-(--primary-plum)/30"
                  />
                  <input
                    placeholder="Notes (optional)"
                    value={prescriptionForm.notes}
                    onChange={e => setPrescriptionForm(f => ({ ...f, notes: e.target.value }))}
                    className="col-span-2 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-(--primary-plum)/30"
                  />
                </div>
                <button
                  onClick={submitPrescription}
                  disabled={savingPrescription || !prescriptionForm.drug_name || !prescriptionForm.dosage || !prescriptionForm.frequency || !prescriptionForm.duration}
                  className="flex items-center justify-center gap-1.5 w-full px-4 py-2 rounded-lg bg-(--primary-plum) text-white text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {savingPrescription ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                  Add medicine
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
