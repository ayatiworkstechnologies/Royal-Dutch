"use client";

import { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Edit2, ListTree, Plus, Search, Trash2 } from 'lucide-react';
import api from '@/lib/api';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useAlert } from '@/context/AlertContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { StatusToggle } from '@/components/ui/StatusToggle';
import { TablePagination } from '@/components/ui/TablePagination';

const PAGE_SIZE = 10;

interface Service {
  id: number;
  display_id?: number | null;
  name: string;
  status: string;
}

interface SubService {
  id: number;
  service_id: number;
  service_name: string | null;
  name: string;
  slug: string;
  description: string | null;
  duration_minutes: number | null;
  price: number | null;
  currency: string;
  image: string | null;
  status: string;
}

const emptyForm = {
  service_id: '', name: '', slug: '', description: '', duration_minutes: '',
  price: '', currency: 'AED', image: '', status: 'active'
};

function apiError(error: unknown, fallback: string) {
  if (axios.isAxiosError(error)) return error.response?.data?.detail || fallback;
  return fallback;
}

export default function AdminSubServicesPage() {
  const { user } = useAdminAuth(['super_admin', 'admin']);
  const { success, error: showError, confirm } = useAlert();
  const [services, setServices] = useState<Service[]>([]);
  const [items, setItems] = useState<SubService[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState<SubService | null>(null);
  const [saving, setSaving] = useState(false);
  const [togglingId, setTogglingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [servicesResponse, subServicesResponse] = await Promise.all([
        api.get<Service[]>('/api/services?include_inactive=true'),
        api.get<SubService[]>('/api/sub-services?include_inactive=true')
      ]);
      setServices(servicesResponse.data);
      setItems(subServicesResponse.data);
    } catch (requestError) {
      showError('Unable to load sub-services', apiError(requestError, 'Please try again.'));
    } finally {
      setLoading(false);
    }
  }, [showError]);

  useEffect(() => {
    if (!user) return;
    const timer = window.setTimeout(() => void fetchData(), 0);
    return () => window.clearTimeout(timer);
  }, [user, fetchData]);

  const activeServices = services.filter(service => service.status === 'active');

  const openForm = (item?: SubService) => {
    if (item) {
      setEditing(item);
      setForm({
        service_id: String(item.service_id), name: item.name, slug: item.slug,
        description: item.description || '', duration_minutes: item.duration_minutes?.toString() || '',
        price: item.price?.toString() || '', currency: item.currency || 'AED',
        image: item.image || '', status: item.status
      });
    } else {
      setEditing(null);
      setForm({ ...emptyForm, service_id: activeServices[0]?.id.toString() || '' });
    }
    setIsOpen(true);
  };

  const handleNameChange = (name: string) => {
    setForm(current => ({
      ...current,
      name,
      slug: editing ? current.slug : name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    }));
  };

  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    const serviceId = Number(form.service_id);
    const payload = {
      name: form.name, slug: form.slug, description: form.description || null,
      duration_minutes: form.duration_minutes ? Number(form.duration_minutes) : null,
      price: form.price ? Number(form.price) : null, currency: form.currency,
      image: form.image || null, status: form.status
    };
    try {
      if (editing) {
        await api.patch(`/api/services/${editing.service_id}/sub-services/${editing.id}`, payload);
      } else {
        await api.post(`/api/services/${serviceId}/sub-services`, payload);
      }
      setIsOpen(false);
      success('Sub-service saved', `${payload.name} was saved successfully.`);
      await fetchData();
    } catch (requestError) {
      showError('Unable to save sub-service', apiError(requestError, 'Please check the form and try again.'));
    } finally {
      setSaving(false);
    }
  };

  const remove = async (item: SubService) => {
    if (!(await confirm({ title: 'Delete Sub-service', message: `Delete ${item.name}?`, danger: true, confirmLabel: 'Delete' }))) return;
    try {
      await api.delete(`/api/services/${item.service_id}/sub-services/${item.id}`);
      setItems(current => current.filter(row => row.id !== item.id));
      success('Sub-service deleted', `${item.name} was deleted.`);
    } catch (requestError) {
      showError('Unable to delete sub-service', apiError(requestError, 'Please try again.'));
    }
  };

  const toggleStatus = async (item: SubService) => {
    setTogglingId(item.id);
    try {
      const response = await api.patch(`/api/services/${item.service_id}/sub-services/${item.id}`, {
        status: item.status === 'active' ? 'inactive' : 'active'
      });
      setItems(current => current.map(row => row.id === item.id ? { ...response.data, service_name: item.service_name } : row));
    } catch (requestError) {
      showError('Unable to update status', apiError(requestError, 'Please try again.'));
    } finally {
      setTogglingId(null);
    }
  };

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    const ascending = [...items].sort((a, b) => a.id - b.id);
    if (!query) return ascending;
    return ascending.filter(item => item.name.toLowerCase().includes(query) || item.slug.toLowerCase().includes(query) || item.service_name?.toLowerCase().includes(query));
  }, [items, search]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const effectivePage = Math.min(currentPage, totalPages);
  const paginatedItems = filtered.slice((effectivePage - 1) * PAGE_SIZE, effectivePage * PAGE_SIZE);

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-primary text-4xl font-bold tracking-tight text-slate-900">Sub Services</h1>
          <p className="mt-1 text-sm text-slate-500">Manage the options available inside each service.</p>
        </div>
        <Button onClick={() => openForm()} className="flex items-center gap-2"><Plus className="h-4 w-4" /> Add Sub Service</Button>
      </div>

      <div className="glass-panel flex items-center gap-2 rounded-3xl p-6 shadow-soft">
        <Search className="h-5 w-5 text-gray-400" />
        <input className="w-full bg-transparent text-sm outline-none" placeholder="Search by sub-service or parent service..." value={search} onChange={event => { setSearch(event.target.value); setCurrentPage(1); }} />
      </div>

      <div className="glass-panel overflow-hidden rounded-3xl shadow-soft">
        <div className="overflow-x-auto">
          <table className="min-w-[920px] w-full divide-y divide-gray-200">
            <thead className="bg-slate-50/50"><tr>
              {['ID', 'Sub Service', 'Parent Service', 'Duration / Price', 'Status', 'Actions'].map(label => <th key={label} className={`${label === 'Actions' ? 'text-right' : 'text-left'} ${label === 'ID' ? 'w-20' : ''} px-6 py-3 text-xs font-medium uppercase tracking-wider text-slate-500`}>{label}</th>)}
            </tr></thead>
            <tbody className="divide-y divide-slate-100/60 bg-white/20">
              {loading ? <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-500">Loading sub-services...</td></tr>
                : filtered.length === 0 ? <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-500"><ListTree className="mx-auto mb-2 h-7 w-7" />No sub-services found</td></tr>
                : paginatedItems.map(item => <tr key={item.id} className="transition-colors hover:bg-white/60">
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-mono text-slate-500">#{item.id}</td>
                  <td className="px-6 py-4"><p className="text-sm font-medium text-slate-800">{item.name}</p><p className="mt-1 text-xs font-mono text-slate-500">{item.slug}</p></td>
                  <td className="px-6 py-4 text-sm text-slate-600">{item.service_name || services.find(service => service.id === item.service_id)?.name || '-'}</td>
                  <td className="px-6 py-4"><p className="text-sm text-slate-800">{item.duration_minutes ? `${item.duration_minutes} mins` : '-'}</p><p className="text-sm text-slate-500">{item.price != null ? `${item.price} ${item.currency}` : '-'}</p></td>
                  <td className="px-6 py-4"><StatusToggle active={item.status === 'active'} label={item.name} disabled={togglingId === item.id} onChange={() => toggleStatus(item)} /></td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm space-x-3">
                    <button onClick={() => openForm(item)} className="inline-flex items-center text-(--primary-plum)"><Edit2 className="mr-1 h-4 w-4" /> Edit</button>
                    <button onClick={() => remove(item)} className="inline-flex items-center text-red-600"><Trash2 className="mr-1 h-4 w-4" /> Delete</button>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
        <TablePagination page={effectivePage} pageSize={PAGE_SIZE} totalItems={filtered.length} onPageChange={setCurrentPage} />
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={editing ? 'Edit Sub Service' : 'Add Sub Service'} maxWidth="lg">
        <form onSubmit={save} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Parent Service *</label>
            <select required disabled={Boolean(editing)} className="block w-full appearance-none rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-slate-800 shadow-sm outline-none transition focus:border-(--primary-gold) focus:ring-2 focus:ring-(--primary-gold)/20 disabled:bg-slate-100" value={form.service_id} onChange={event => setForm({ ...form, service_id: event.target.value })}>
              <option value="">Select an active service</option>
              {(editing ? services.filter(service => service.id === editing.service_id) : activeServices).map(service => <option key={service.id} value={service.id}>{service.display_id ? `#${service.display_id} — ` : ''}{service.name}</option>)}
            </select>
            {!editing && activeServices.length === 0 && <p className="mt-1 text-xs text-red-600">Create or activate a service before adding a sub-service.</p>}
          </div>
          <div className="grid gap-4 sm:grid-cols-2"><Input label="Sub Service Name *" required value={form.name} onChange={event => handleNameChange(event.target.value)} /><Input label="Slug *" required value={form.slug} onChange={event => setForm({ ...form, slug: event.target.value })} /></div>
          <div className="grid gap-4 sm:grid-cols-2"><Input type="number" min="1" label="Duration (minutes)" value={form.duration_minutes} onChange={event => setForm({ ...form, duration_minutes: event.target.value })} /><Input type="number" min="0" step="0.01" label={`Price (${form.currency})`} value={form.price} onChange={event => setForm({ ...form, price: event.target.value })} /></div>
          <Input label="Image URL" value={form.image} onChange={event => setForm({ ...form, image: event.target.value })} />
          <div><label className="mb-1 block text-sm font-medium text-gray-700">Description</label><textarea rows={3} className="w-full rounded-lg border border-gray-200 bg-white/50 px-4 py-2.5 text-sm" value={form.description} onChange={event => setForm({ ...form, description: event.target.value })} /></div>
          <div><label className="mb-1 block text-sm font-medium text-gray-700">Status</label><select className="w-full rounded-lg border border-gray-200 bg-white/50 px-4 py-2.5 text-sm" value={form.status} onChange={event => setForm({ ...form, status: event.target.value })}><option value="active">Active</option><option value="inactive">Inactive</option></select></div>
          <div className="flex justify-end gap-3 pt-4"><Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button><Button type="submit" disabled={saving}>{saving ? 'Saving...' : editing ? 'Save Changes' : 'Create Sub Service'}</Button></div>
        </form>
      </Modal>
    </div>
  );
}
