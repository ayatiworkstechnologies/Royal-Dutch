"use client";

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Edit2, Package, Plus, Search, Trash2 } from 'lucide-react';
import api, { apiErrorMessage } from '@/lib/api';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useAlert } from '@/context/AlertContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { StatusToggle } from '@/components/ui/StatusToggle';
import { TablePagination } from '@/components/ui/TablePagination';
import { isValidPrice, normalizePrice } from '@/lib/priceRange';

const PAGE_SIZE = 10;
interface SubService { id: number; name: string; service_name?: string | null; status: string }
interface ServicePackage { id: number; sub_service_id: number; sub_service_name: string | null; name: string; slug: string; description: string | null; sessions: number | null; price: string | number | null; currency: string; status: string }
const emptyForm = { sub_service_id: '', name: '', slug: '', description: '', sessions: '', price: '', currency: 'AED', status: 'active' };

export default function AdminPackagesPage() {
  const { user } = useAdminAuth(['super_admin', 'admin']);
  const { success, error: showError, confirm } = useAlert();
  const [subServices, setSubServices] = useState<SubService[]>([]);
  const [items, setItems] = useState<ServicePackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(''); const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false); const [editing, setEditing] = useState<ServicePackage | null>(null);
  const [saving, setSaving] = useState(false); const [togglingId, setTogglingId] = useState<number | null>(null); const [form, setForm] = useState(emptyForm);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // Keep the parent selector available even if packages have not been
      // migrated yet or their list request temporarily fails.
      const subServicesResponse = await api.get<SubService[]>('/api/sub-services?include_inactive=true');
      setSubServices(subServicesResponse.data);
      try {
        const packagesResponse = await api.get<ServicePackage[]>('/api/packages?include_inactive=true');
        setItems(packagesResponse.data);
      } catch (err) {
        showError('Unable to load packages', apiErrorMessage(err, 'Run the package database migration, then refresh this page.'));
      }
    } catch (err) { showError('Unable to load sub-services', apiErrorMessage(err, 'Please try again.')); } finally { setLoading(false); }
  }, [showError]);
  useEffect(() => {
    if (!user) return;
    const timer = window.setTimeout(() => void fetchData(), 0);
    return () => window.clearTimeout(timer);
  }, [user, fetchData]);
  const activeSubServices = subServices.filter(item => item.status === 'active');
  const openForm = (item?: ServicePackage) => {
    setEditing(item ?? null);
    setForm(item ? { sub_service_id: String(item.sub_service_id), name: item.name, slug: item.slug, description: item.description || '', sessions: item.sessions?.toString() || '', price: item.price?.toString() || '', currency: item.currency || 'AED', status: item.status } : { ...emptyForm, sub_service_id: String(activeSubServices[0]?.id || '') });
    setIsOpen(true);
  };
  const save = async (event: React.FormEvent) => {
    event.preventDefault(); if (!isValidPrice(form.price)) { showError('Invalid price', 'Enter one amount (for example 200) or a range (for example 200-500).'); return; }
    const subServiceId = Number(form.sub_service_id); const payload = { name: form.name, slug: form.slug, description: form.description || null, sessions: form.sessions ? Number(form.sessions) : null, price: form.price ? normalizePrice(form.price) : null, currency: form.currency, status: form.status };
    setSaving(true);
    try { if (editing) await api.patch(`/api/sub-services/${editing.sub_service_id}/packages/${editing.id}`, payload); else await api.post(`/api/sub-services/${subServiceId}/packages`, payload); setIsOpen(false); success('Package saved', `${payload.name} was saved successfully.`); await fetchData(); }
    catch (err) { showError('Unable to save package', apiErrorMessage(err, 'Please check the form and try again.')); } finally { setSaving(false); }
  };
  const remove = async (item: ServicePackage) => { if (!(await confirm({ title: 'Delete Package', message: `Delete ${item.name}?`, danger: true, confirmLabel: 'Delete' }))) return; try { await api.delete(`/api/sub-services/${item.sub_service_id}/packages/${item.id}`); setItems(current => current.filter(row => row.id !== item.id)); success('Package deleted', `${item.name} was deleted.`); } catch (err) { showError('Unable to delete package', apiErrorMessage(err, 'Please try again.')); } };
  const toggleStatus = async (item: ServicePackage) => { setTogglingId(item.id); try { const response = await api.patch(`/api/sub-services/${item.sub_service_id}/packages/${item.id}`, { status: item.status === 'active' ? 'inactive' : 'active' }); setItems(current => current.map(row => row.id === item.id ? response.data : row)); } catch (err) { showError('Unable to update status', apiErrorMessage(err, 'Please try again.')); } finally { setTogglingId(null); } };
  const filtered = useMemo(() => { const query = search.trim().toLowerCase(); return [...items].sort((a, b) => a.id - b.id).filter(item => !query || [item.name, item.slug, item.sub_service_name || ''].some(value => value.toLowerCase().includes(query))); }, [items, search]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE)); const effectivePage = Math.min(page, totalPages); const rows = filtered.slice((effectivePage - 1) * PAGE_SIZE, effectivePage * PAGE_SIZE);

  return <div className="space-y-6"><div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"><div><h1 className="font-primary text-4xl font-bold tracking-tight text-slate-900">Packages</h1><p className="mt-1 text-sm text-slate-500">Create packages and connect each one to a sub-service.</p></div><Button onClick={() => openForm()} className="flex items-center gap-2"><Plus className="h-4 w-4" /> Add Package</Button></div>
    <div className="glass-panel flex items-center gap-2 rounded-3xl p-6 shadow-soft"><Search className="h-5 w-5 text-gray-400" /><input className="w-full bg-transparent text-sm outline-none" placeholder="Search by package or sub-service..." value={search} onChange={event => { setSearch(event.target.value); setPage(1); }} /></div>
    <div className="glass-panel overflow-hidden rounded-3xl shadow-soft"><div className="overflow-x-auto"><table className="min-w-[850px] w-full divide-y divide-gray-200"><thead className="bg-slate-50/50"><tr>{['ID', 'Package', 'Sub Service', 'Sessions / Price', 'Status', 'Actions'].map(label => <th key={label} className={`${label === 'Actions' ? 'text-right' : 'text-left'} px-6 py-3 text-xs font-medium uppercase tracking-wider text-slate-500`}>{label}</th>)}</tr></thead><tbody className="divide-y divide-slate-100/60 bg-white/20">{loading ? <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-500">Loading packages...</td></tr> : filtered.length === 0 ? <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-500"><Package className="mx-auto mb-2 h-7 w-7" />No packages found</td></tr> : rows.map(item => <tr key={item.id} className="transition-colors hover:bg-white/60"><td className="px-6 py-4 text-sm font-mono text-slate-500">#{item.id}</td><td className="px-6 py-4"><p className="text-sm font-medium text-slate-800">{item.name}</p><p className="mt-1 text-xs font-mono text-slate-500">{item.slug}</p></td><td className="px-6 py-4 text-sm text-slate-600">{item.sub_service_name || subServices.find(child => child.id === item.sub_service_id)?.name || '-'}</td><td className="px-6 py-4 text-sm text-slate-600"><p>{item.sessions ? `${item.sessions} sessions` : '-'}</p><p>{item.price != null ? `${item.price} ${item.currency}` : '-'}</p></td><td className="px-6 py-4"><StatusToggle active={item.status === 'active'} label={item.name} disabled={togglingId === item.id} onChange={() => toggleStatus(item)} /></td><td className="whitespace-nowrap px-6 py-4 text-right text-sm space-x-3"><button onClick={() => openForm(item)} className="inline-flex items-center text-(--primary-plum)"><Edit2 className="mr-1 h-4 w-4" /> Edit</button><button onClick={() => remove(item)} className="inline-flex items-center text-red-600"><Trash2 className="mr-1 h-4 w-4" /> Delete</button></td></tr>)}</tbody></table></div><TablePagination page={effectivePage} pageSize={PAGE_SIZE} totalItems={filtered.length} onPageChange={setPage} /></div>
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={editing ? 'Edit Package' : 'Add Package'} maxWidth="lg"><form onSubmit={save} className="space-y-4"><div><label className="mb-1 block text-sm font-medium text-gray-700">Sub Service *</label><select required disabled={Boolean(editing)} className="block w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm disabled:bg-slate-100" value={form.sub_service_id} onChange={event => setForm({ ...form, sub_service_id: event.target.value })}><option value="">Select an active sub-service</option>{(editing ? subServices.filter(item => item.id === editing.sub_service_id) : activeSubServices).map(item => <option key={item.id} value={item.id}>{item.name}</option>)}</select>{!editing && activeSubServices.length === 0 && <p className="mt-1 text-xs text-red-600">Create or activate a sub-service before adding a package.</p>}</div><div className="grid gap-4 sm:grid-cols-2"><Input label="Package Name *" required value={form.name} onChange={event => { const name = event.target.value; setForm(current => ({ ...current, name, slug: editing ? current.slug : name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') })); }} /><Input label="Slug *" required value={form.slug} onChange={event => setForm({ ...form, slug: event.target.value })} /></div><div className="grid gap-4 sm:grid-cols-2"><Input type="number" min="1" label="Number of sessions" value={form.sessions} onChange={event => setForm({ ...form, sessions: event.target.value })} /><Input type="text" inputMode="decimal" label={`Package Price (${form.currency})`} value={form.price} onChange={event => setForm({ ...form, price: event.target.value })} onBlur={() => setForm(current => ({ ...current, price: normalizePrice(current.price) }))} /></div><div><label className="mb-1 block text-sm font-medium text-gray-700">Description</label><textarea rows={3} className="w-full rounded-lg border border-gray-200 bg-white/50 px-4 py-2.5 text-sm" value={form.description} onChange={event => setForm({ ...form, description: event.target.value })} /></div><div><label className="mb-1 block text-sm font-medium text-gray-700">Status</label><select className="w-full rounded-lg border border-gray-200 bg-white/50 px-4 py-2.5 text-sm" value={form.status} onChange={event => setForm({ ...form, status: event.target.value })}><option value="active">Active</option><option value="inactive">Inactive</option></select></div><div className="flex justify-end gap-3 pt-4"><Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button><Button type="submit" disabled={saving}>{saving ? 'Saving...' : editing ? 'Save Changes' : 'Create Package'}</Button></div></form></Modal>
  </div>;
}
