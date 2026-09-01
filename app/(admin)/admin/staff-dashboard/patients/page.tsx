"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAdminAuth, CLINICAL_ROLES } from '@/hooks/useAdminAuth';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { Search, Users, RefreshCw, ChevronRight, Link2 } from 'lucide-react';

interface Patient {
  id: number;
  full_name: string;
  email: string | null;
  phone: string;
  gender: string | null;
  age: number | null;
}

export default function MyPatientsPage() {
  const { user, loading } = useAdminAuth();
  const router = useRouter();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [fetching, setFetching] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!loading && user) {
      if (!CLINICAL_ROLES.includes(user.role)) {
        router.push('/admin/dashboard');
        return;
      }
      if (!user.staff_id) {
        setFetching(false);
        return;
      }
      (async () => {
        setFetching(true);
        try {
          const res = await api.get('/api/staff/me/patients');
          setPatients(res.data);
        } catch {
          setPatients([]);
        } finally {
          setFetching(false);
        }
      })();
    }
  }, [user, loading, router]);

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

  const filtered = patients.filter(p =>
    p.full_name.toLowerCase().includes(search.toLowerCase()) ||
    p.phone.includes(search) ||
    (p.email && p.email.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 font-primary tracking-tight">My Patients</h1>
          <p className="text-slate-500 font-secondary mt-1">Patients you have treated or have upcoming appointments with</p>
        </div>
        <div className="glass-panel p-2 rounded-2xl shadow-sm flex items-center gap-2 w-full sm:w-72 border-0">
          <Search className="w-4 h-4 text-slate-400 ml-2" />
          <input
            type="text"
            placeholder="Search name, phone, email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-transparent border-none focus:ring-0 outline-none text-sm text-slate-700"
          />
        </div>
      </div>

      <div className="glass-panel rounded-3xl overflow-hidden shadow-soft">
        {fetching ? (
          <div className="p-8 space-y-3">
            {[1, 2, 3].map(i => <div key={i} className="h-16 bg-slate-100/60 rounded-xl animate-pulse" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <Users className="w-14 h-14 text-slate-200 mb-4" />
            <p className="text-lg font-semibold text-slate-700 font-primary">No patients found</p>
            <p className="text-sm text-slate-400 font-secondary mt-1">Patients from your appointments will appear here.</p>
          </div>
        ) : (
          <ul className="divide-y divide-slate-100/70">
            {filtered.map(p => (
              <li key={p.id}>
                <Link
                  href={`/admin/staff-dashboard/patients/${p.id}`}
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
    </div>
  );
}
