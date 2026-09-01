"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import api from '@/lib/api';
import { format, parseISO } from 'date-fns';
import {
  ArrowLeft,
  RefreshCw,
  User,
  Phone,
  Mail,
  CalendarDays,
  Pill,
  FileArchive,
  StickyNote,
} from 'lucide-react';

interface PatientDetail {
  id: number;
  full_name: string;
  email: string | null;
  phone: string;
  gender: string | null;
  age: number | null;
  notes: string | null;
  bookings: {
    id: number;
    booking_code: string;
    booking_date: string;
    booking_time: string;
    status: string;
    notes: string | null;
  }[];
  prescriptions: {
    id: number;
    drug_name: string;
    dosage: string;
    frequency: string;
    duration: string;
    notes: string | null;
  }[];
  patient_documents: {
    id: number;
    title: string;
    document_type: string | null;
    file_name: string;
    created_at: string;
  }[];
}

export default function StaffAdminPatientDetailPage() {
  const { user, loading } = useAdminAuth();
  const params = useParams();
  const staffId = params?.id as string;
  const patientId = params?.patientId as string;
  const [patient, setPatient] = useState<PatientDetail | null>(null);
  const [fetching, setFetching] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      (async () => {
        setFetching(true);
        try {
          const res = await api.get(`/api/staff/${staffId}/patients/${patientId}`);
          setPatient(res.data);
        } catch {
          setNotFound(true);
        } finally {
          setFetching(false);
        }
      })();
    }
  }, [user, loading, staffId, patientId]);

  if (loading || fetching) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-400">
        <RefreshCw className="w-6 h-6 animate-spin mr-2" /> Loading...
      </div>
    );
  }

  if (notFound || !patient) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-12 text-center">
        <User className="w-16 h-16 text-slate-300 mb-4" />
        <h2 className="text-2xl font-bold text-slate-900 font-primary">Patient Not Found</h2>
        <p className="text-slate-500 mt-2 max-w-md font-secondary">
          This patient isn&apos;t linked to any appointment with this staff member.
        </p>
        <Link href={`/admin/staff/${staffId}/dashboard`} className="mt-4 text-sm font-semibold text-(--primary-plum) hover:underline">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-10">
      <Link href={`/admin/staff/${staffId}/dashboard`} className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 font-secondary">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </Link>

      <div className="glass-panel rounded-3xl p-6 md:p-8 shadow-soft flex flex-col md:flex-row md:items-center gap-6">
        <div className="h-16 w-16 shrink-0 rounded-full bg-(--primary-plum)/10 flex items-center justify-center text-2xl font-bold text-(--primary-plum)">
          {patient.full_name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold text-slate-900 font-primary">{patient.full_name}</h1>
          <div className="flex flex-wrap gap-x-5 gap-y-1 mt-2 text-sm text-slate-500 font-secondary">
            <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> {patient.phone}</span>
            {patient.email && <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> {patient.email}</span>}
            {(patient.gender || patient.age) && (
              <span>{patient.gender ?? ''}{patient.gender && patient.age ? ' · ' : ''}{patient.age ? `${patient.age} yrs` : ''}</span>
            )}
          </div>
          {patient.notes && (
            <p className="mt-3 text-sm text-slate-600 font-secondary flex items-start gap-1.5">
              <StickyNote className="w-3.5 h-3.5 mt-0.5 shrink-0 text-slate-400" /> {patient.notes}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="glass-panel rounded-3xl shadow-soft overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-(--primary-plum)" />
            <h2 className="text-sm font-bold text-slate-800 font-primary">Visit History</h2>
          </div>
          {patient.bookings.length === 0 ? (
            <p className="p-6 text-sm text-slate-400 font-secondary">No visits recorded.</p>
          ) : (
            <ul className="divide-y divide-slate-100/70 max-h-96 overflow-y-auto">
              {patient.bookings.map(b => (
                <li key={b.id} className="p-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      {format(parseISO(b.booking_date), 'MMM d, yyyy')} · {b.booking_time?.slice(0, 5)}
                    </p>
                    <p className="text-xs text-slate-400 font-secondary">#{b.booking_code}</p>
                    {b.notes && <p className="text-xs text-slate-500 font-secondary mt-1 italic">{b.notes}</p>}
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 capitalize shrink-0">
                    {b.status.replace('_', ' ')}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="glass-panel rounded-3xl shadow-soft overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center gap-2">
            <Pill className="w-4 h-4 text-(--primary-plum)" />
            <h2 className="text-sm font-bold text-slate-800 font-primary">Prescriptions</h2>
          </div>
          {patient.prescriptions.length === 0 ? (
            <p className="p-6 text-sm text-slate-400 font-secondary">No medicines recorded.</p>
          ) : (
            <ul className="divide-y divide-slate-100/70 max-h-96 overflow-y-auto">
              {patient.prescriptions.map(p => (
                <li key={p.id} className="p-4">
                  <p className="text-sm font-semibold text-slate-800">{p.drug_name}</p>
                  <p className="text-xs text-slate-500 font-secondary mt-0.5">{p.dosage} · {p.frequency} · {p.duration}</p>
                  {p.notes && <p className="text-xs text-slate-400 font-secondary mt-1 italic">{p.notes}</p>}
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="glass-panel rounded-3xl shadow-soft overflow-hidden lg:col-span-2">
          <div className="p-5 border-b border-slate-100 flex items-center gap-2">
            <FileArchive className="w-4 h-4 text-(--primary-plum)" />
            <h2 className="text-sm font-bold text-slate-800 font-primary">Documents</h2>
          </div>
          {patient.patient_documents.length === 0 ? (
            <p className="p-6 text-sm text-slate-400 font-secondary">No documents uploaded.</p>
          ) : (
            <ul className="divide-y divide-slate-100/70">
              {patient.patient_documents.map(d => (
                <li key={d.id} className="p-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{d.title}</p>
                    <p className="text-xs text-slate-400 font-secondary">{d.document_type ?? d.file_name}</p>
                  </div>
                  <span className="text-xs text-slate-400 font-secondary shrink-0">
                    {format(parseISO(d.created_at), 'MMM d, yyyy')}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
