"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import api from '@/lib/api';
import { useAlert } from '@/context/AlertContext';
import { format, parseISO } from 'date-fns';
import {
  Plus, Search, Phone, Mail, MessageSquare,
  User, RefreshCw, X,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';

interface Contact {
  id: number;
  full_name: string;
  phone: string;
  email: string | null;
  message: string | null;
  source: string;
  status: string;
  notes: string | null;
  created_at: string;
}

const SOURCES = [
  { value: 'walk_in',  label: 'Walk-in' },
  { value: 'phone',    label: 'Phone Call' },
  { value: 'website',  label: 'Website' },
  { value: 'referral', label: 'Referral' },
  { value: 'social',   label: 'Social Media' },
  { value: 'other',    label: 'Other' },
];

const STATUSES = [
  { value: 'new',            label: 'New',            classes: 'bg-blue-100 text-blue-700 border-blue-200' },
  { value: 'contacted',      label: 'Contacted',      classes: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  { value: 'converted',      label: 'Converted',      classes: 'bg-green-100 text-green-700 border-green-200' },
  { value: 'not_interested', label: 'Not Interested', classes: 'bg-gray-100 text-gray-500 border-gray-200' },
];

const statusCfg = (v: string) => STATUSES.find(s => s.value === v) ?? STATUSES[0];
const sourceCfg = (v: string) => SOURCES.find(s => s.value === v)?.label ?? v;

const EMPTY_FORM = { full_name: '', phone: '', email: '', message: '', source: 'walk_in', notes: '' };

export default function ContactsPage() {
  useAdminAuth(['super_admin', 'admin', 'receptionist']);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const { error: toastError, success: toastSuccess } = useAlert();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [saving, setSaving] = useState(false);

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    try {
      const params: Record<string, string> = {};
      if (filterStatus) params.status = filterStatus;
      if (search)       params.search  = search;
      const res = await api.get('/api/contacts', { params });
      setContacts(res.data);
    } catch {
      setContacts([]);
    } finally {
      setLoading(false);
    }
  }, [filterStatus, search]);

  useEffect(() => { fetchContacts(); }, [fetchContacts]);

  const openAdd = () => {
    setForm({ ...EMPTY_FORM });
    setIsOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        status: 'new',
        email:   form.email   || null,
        message: form.message || null,
        notes:   form.notes   || null,
      };
      await api.post('/api/contacts', payload);
      toastSuccess('Contact Added', 'Contact has been saved successfully.');
      setIsOpen(false);
      fetchContacts();
    } catch (err: any) {
      toastError('Error', err.response?.data?.detail || 'Failed to save contact');
    } finally {
      setSaving(false);
    }
  };

  const f = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(prev => ({ ...prev, [k]: e.target.value }));

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-4xl font-bold text-slate-900 font-primary tracking-tight">Contacts</h1>
        <Button onClick={openAdd} className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Contact
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 flex items-center gap-2 glass-panel rounded-2xl px-4 py-2.5">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search by name, phone or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-sm text-slate-700 placeholder-slate-400"
          />
          {search && (
            <button type="button" onClick={() => setSearch('')} className="text-slate-400 hover:text-slate-600">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <select
          title="Filter by status"
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          className="rounded-2xl border border-slate-200 px-4 py-2.5 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-(--primary-plum)/30"
        >
          <option value="">All Statuses</option>
          {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>

        <button
          type="button"
          onClick={fetchContacts}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Table */}
      <div className="glass-panel rounded-3xl shadow-soft overflow-hidden">
        <table className="min-w-full divide-y divide-slate-100">
          <thead className="bg-slate-50/60">
            <tr>
              {['Contact', 'Source', 'Message', 'Status', 'Added'].map(h => (
                <th key={h} className="px-5 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider font-secondary">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/60 bg-white/20">
            {loading ? (
              <tr><td colSpan={5} className="py-16 text-center text-slate-400 font-secondary">Loading...</td></tr>
            ) : contacts.length === 0 ? (
              <tr><td colSpan={5} className="py-16 text-center text-slate-400 font-secondary">No contacts found</td></tr>
            ) : contacts.map(c => {
              const st = statusCfg(c.status);
              return (
                <tr key={c.id} className="hover:bg-white/60 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-(--primary-plum)/8 flex items-center justify-center shrink-0">
                        <User className="h-4 w-4 text-(--primary-plum)" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{c.full_name}</p>
                        <div className="flex flex-col gap-0.5 mt-0.5">
                          <span className="flex items-center gap-1 text-xs text-slate-500">
                            <Phone className="w-3 h-3" /> {c.phone}
                          </span>
                          {c.email && (
                            <span className="flex items-center gap-1 text-xs text-slate-400">
                              <Mail className="w-3 h-3" /> {c.email}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-600 font-secondary">{sourceCfg(c.source)}</td>
                  <td className="px-5 py-4 max-w-xs">
                    {c.message ? (
                      <p className="text-sm text-slate-600 font-secondary line-clamp-2">{c.message}</p>
                    ) : (
                      <span className="text-slate-300 text-sm">—</span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold border ${st.classes}`}>
                      {st.label}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-xs text-slate-400 font-secondary whitespace-nowrap">
                    {format(parseISO(c.created_at), 'MMM d, yyyy')}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add Contact Modal */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Add New Contact" maxWidth="md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Full Name *" required value={form.full_name} onChange={f('full_name')} />

          <div className="grid grid-cols-2 gap-4">
            <Input label="Phone *" required value={form.phone} onChange={f('phone')} />
            <Input label="Email" type="email" value={form.email} onChange={f('email')} />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1 font-secondary">Source</label>
            <select
              title="Source"
              value={form.source}
              onChange={f('source')}
              className="w-full rounded-lg border border-slate-200/60 bg-white/40 px-3 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-(--primary-plum)/30"
            >
              {SOURCES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1 font-secondary">
              <MessageSquare className="w-3.5 h-3.5 inline mr-1" /> Message / Inquiry
            </label>
            <textarea
              rows={3}
              value={form.message}
              onChange={f('message')}
              placeholder="What is the patient enquiring about?"
              className="w-full rounded-lg border border-slate-200/60 bg-white/40 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-(--primary-plum)/30 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1 font-secondary">Internal Notes</label>
            <textarea
              rows={2}
              value={form.notes}
              onChange={f('notes')}
              placeholder="Follow-up notes (internal only)"
              className="w-full rounded-lg border border-slate-200/60 bg-white/40 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-(--primary-plum)/30 resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={saving}>
              {saving ? 'Saving...' : 'Add Contact'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
