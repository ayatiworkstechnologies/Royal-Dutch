"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import api from '@/lib/api';
import { useAlert } from '@/context/AlertContext';
import { Save, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Plus, Trash2 } from 'lucide-react';

interface ClinicSettings {
  clinic_name: string;
  clinic_email: string;
  clinic_email_cc: string;
  clinic_email_bcc: string;
  clinic_phone: string;
  clinic_address: string;
  invoice_footer: string;
  invoice_terms: string;
  tax_registration_number: string;
  default_currency: string;
}

function EmailListInput({
  label,
  value,
  onChange
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
}) {
  const parse = (v: string) => v ? v.split(',').map(e => e.trim()).filter(Boolean) : [];

  // Local items array allows empty strings (rows being typed into)
  const [items, setItems] = useState<string[]>(() => parse(value));

  // Sync from parent only when the committed (non-empty) value changes
  const prevValue = useRef(value);
  useEffect(() => {
    if (prevValue.current !== value) {
      prevValue.current = value;
      setItems(parse(value));
    }
  }, [value]);

  const commit = (next: string[]) => {
    onChange(next.filter(Boolean).join(','));
  };

  const handleAdd = () => {
    setItems(prev => [...prev, '']);
  };

  const handleRemove = (i: number) => {
    const next = items.filter((_, idx) => idx !== i);
    setItems(next);
    commit(next);
  };

  const handleChange = (i: number, val: string) => {
    const next = items.map((item, idx) => idx === i ? val : item);
    setItems(next);
    commit(next);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-slate-700 font-secondary">{label}</label>
      {items.length === 0 && (
        <p className="text-xs text-slate-400 italic">No emails added yet.</p>
      )}
      {items.map((email, i) => (
        <div key={i} className="flex items-center gap-2">
          <Input
            id={`${label}-${i}`}
            type="email"
            value={email}
            onChange={(e) => handleChange(i, e.target.value)}
            placeholder="email@example.com"
          />
          <button
            type="button"
            onClick={() => handleRemove(i)}
            className="shrink-0 p-2 text-red-500 hover:bg-red-50 rounded-xl transition"
            aria-label="Remove email"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAdd}
        className="flex items-center gap-1.5 text-sm font-semibold text-(--primary-plum) hover:text-(--primary-gold) transition-colors"
      >
        <Plus className="w-4 h-4" /> Add Email
      </button>
    </div>
  );
}

export default function AdminSettingsPage() {
  const { user } = useAdminAuth();
  const { success: toastSuccess, error: toastError, warning: toastWarning, info: toastInfo, confirm: confirmDialog } = useAlert();
  const [settings, setSettings] = useState<ClinicSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/settings');
      setSettings(response.data);
    } catch (error) {
      console.error('Failed to fetch settings', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchSettings();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    
    // Clean up empty emails before saving
    const cleanedSettings = { ...settings };
    if (cleanedSettings.clinic_email_cc) {
      cleanedSettings.clinic_email_cc = cleanedSettings.clinic_email_cc.split(',').map(e => e.trim()).filter(e => e).join(',');
    }
    if (cleanedSettings.clinic_email_bcc) {
      cleanedSettings.clinic_email_bcc = cleanedSettings.clinic_email_bcc.split(',').map(e => e.trim()).filter(e => e).join(',');
    }
    
    setSaving(true);
    try {
      const response = await api.patch('/api/settings', cleanedSettings);
      setSettings(response.data);
      toastSuccess('Settings Saved', 'Settings have been updated successfully.');
    } catch (error: any) {
      console.error('Failed to save settings', error);
      toastError('Error', error.response?.data?.detail || 'An error occurred');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings((prev) => prev ? { ...prev, [name]: value } : null);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12 text-slate-500">
        <RefreshCcw className="w-6 h-6 animate-spin mr-2" /> Loading settings...
      </div>
    );
  }

  if (!settings) return <div className="text-red-500">Failed to load settings.</div>;

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-slate-900 font-primary tracking-tight mb-2">Clinic Settings</h1>
      </div>

      <form onSubmit={handleSubmit} className="glass-panel p-6 rounded-3xl shadow-soft space-y-8">
        
        <div>
          <h2 className="text-lg font-medium text-slate-800 border-b pb-2 mb-4">General Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              id="clinic_name"
              name="clinic_name"
              label="Clinic Name"
              value={settings.clinic_name}
              onChange={handleChange}
              required
            />
            <Input
              id="tax_registration_number"
              name="tax_registration_number"
              label="Tax Registration Number (TRN)"
              value={settings.tax_registration_number}
              onChange={handleChange}
            />
            <Input
              id="clinic_phone"
              name="clinic_phone"
              label="Clinic Phone"
              value={settings.clinic_phone}
              onChange={handleChange}
              required
            />
            <div className="md:col-span-2">
              <Input
                id="clinic_email"
                name="clinic_email"
                type="email"
                label="Primary Clinic Email"
                value={settings.clinic_email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              <EmailListInput
                label="CC Emails"
                value={settings.clinic_email_cc || ''}
                onChange={(val) => setSettings(prev => prev ? { ...prev, clinic_email_cc: val } : null)}
              />
              <EmailListInput
                label="BCC Emails"
                value={settings.clinic_email_bcc || ''}
                onChange={(val) => setSettings(prev => prev ? { ...prev, clinic_email_bcc: val } : null)}
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Clinic Address</label>
            <textarea
              name="clinic_address"
              title="Clinic Address"
              placeholder="Enter clinic address..."
              className="w-full rounded-md border-slate-200/50 bg-white/40 shadow-sm focus:border-(--primary-gold) focus:ring-(--primary-gold) sm:text-sm"
              rows={3}
              value={settings.clinic_address}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-medium text-slate-800 border-b pb-2 mb-4">Billing & Invoicing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <Input
              id="default_currency"
              name="default_currency"
              label="Default Currency"
              value={settings.default_currency}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Terms & Conditions</label>
              <textarea
                name="invoice_terms"
                className="w-full rounded-md border-slate-200/50 bg-white/40 shadow-sm focus:border-(--primary-gold) focus:ring-(--primary-gold) sm:text-sm"
                rows={4}
                value={settings.invoice_terms}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Footer Text</label>
              <textarea
                name="invoice_footer"
                className="w-full rounded-md border-slate-200/50 bg-white/40 shadow-sm focus:border-(--primary-gold) focus:ring-(--primary-gold) sm:text-sm"
                rows={4}
                value={settings.invoice_footer}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <Button type="submit" disabled={saving} className="flex items-center gap-2">
            <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>
      </form>
    </div>
  );
}
