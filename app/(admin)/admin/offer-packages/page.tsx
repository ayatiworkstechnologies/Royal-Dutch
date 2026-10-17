"use client";

import { useCallback, useEffect, useMemo, useState } from 'react';
import { BadgePercent, Edit2, ImagePlus, Loader2, Plus, Search, Trash2 } from 'lucide-react';
import api, { apiErrorMessage } from '@/lib/api';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useAlert } from '@/context/AlertContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { StatusToggle } from '@/components/ui/StatusToggle';
import { TablePagination } from '@/components/ui/TablePagination';

const PAGE_SIZE = 10;

interface Service { id: number; name: string; currency: string; status: string }
interface OfferPackage {
  id: number; service_id: number; service_name: string | null; title: string;
  description: string | null; image_url: string; original_price: number;
  offer_price: number; currency: string; discount_percentage: number; status: string;
}

const emptyForm = {
  service_id: '', title: '', description: '', image_url: '', original_price: '',
  offer_price: '', currency: 'AED', status: 'active',
};

export default function AdminOfferPackagesPage() {
  const { user } = useAdminAuth(['super_admin', 'admin']);
  const { success, error: showError, confirm } = useAlert();
  const [services, setServices] = useState<Service[]>([]);
  const [offers, setOffers] = useState<OfferPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [togglingId, setTogglingId] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState<OfferPackage | null>(null);
  const [form, setForm] = useState(emptyForm);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [servicesResponse, offersResponse] = await Promise.all([
        api.get<Service[]>('/api/services?include_inactive=true'),
        api.get<OfferPackage[]>('/api/admin/offer-packages'),
      ]);
      setServices(servicesResponse.data);
      setOffers(offersResponse.data);
    } catch (err) {
      showError('Unable to load offer packages', apiErrorMessage(err, 'Please try again.'));
    } finally { setLoading(false); }
  }, [showError]);

  useEffect(() => {
    if (!user) return;
    const timer = window.setTimeout(() => void fetchData(), 0);
    return () => window.clearTimeout(timer);
  }, [user, fetchData]);

  const activeServices = services.filter(item => item.status === 'active');
  const discount = (() => {
    const original = Number(form.original_price);
    const offer = Number(form.offer_price);
    return original > 0 && offer > 0 && offer < original ? Math.round(((original - offer) / original) * 100) : 0;
  })();

  const openForm = (item?: OfferPackage) => {
    setEditing(item ?? null);
    setForm(item ? {
      service_id: String(item.service_id), title: item.title, description: item.description || '',
      image_url: item.image_url, original_price: String(item.original_price), offer_price: String(item.offer_price),
      currency: item.currency, status: item.status,
    } : { ...emptyForm, service_id: String(activeServices[0]?.id || ''), currency: activeServices[0]?.currency || 'AED' });
    setIsOpen(true);
  };

  const selectService = (serviceId: string) => {
    const service = services.find(item => String(item.id) === serviceId);
    setForm(current => ({ ...current, service_id: serviceId, currency: service?.currency || 'AED' }));
  };

  const uploadImage = async (file?: File) => {
    if (!file) return;
    const data = new FormData();
    data.append('image', file);
    setUploadingImage(true);
    try {
      const response = await api.post<{ image_url: string }>('/api/admin/offer-packages/image', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setForm(current => ({ ...current, image_url: response.data.image_url }));
      success('Image uploaded', 'The offer image is ready to use.');
    } catch (err) {
      showError('Unable to upload image', apiErrorMessage(err, 'Use a PNG, JPEG, or WebP image up to 5 MB.'));
    } finally { setUploadingImage(false); }
  };

  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    const originalPrice = Number(form.original_price);
    const offerPrice = Number(form.offer_price);
    if (offerPrice >= originalPrice) {
      showError('Invalid offer price', 'Offer price must be lower than the original price.');
      return;
    }
    const payload = {
      service_id: Number(form.service_id), title: form.title.trim(), description: form.description.trim() || null,
      image_url: form.image_url.trim(), original_price: originalPrice, offer_price: offerPrice,
      currency: form.currency, status: form.status,
    };
    setSaving(true);
    try {
      if (editing) await api.patch(`/api/admin/offer-packages/${editing.id}`, payload);
      else await api.post('/api/admin/offer-packages', payload);
      setIsOpen(false);
      success('Offer package saved', `${payload.title} is ready for the homepage carousel.`);
      await fetchData();
    } catch (err) {
      showError('Unable to save offer package', apiErrorMessage(err, 'Please check the form and try again.'));
    } finally { setSaving(false); }
  };

  const toggleStatus = async (item: OfferPackage) => {
    setTogglingId(item.id);
    try {
      const response = await api.patch<OfferPackage>(`/api/admin/offer-packages/${item.id}`, { status: item.status === 'active' ? 'inactive' : 'active' });
      setOffers(current => current.map(row => row.id === item.id ? response.data : row));
    } catch (err) { showError('Unable to update status', apiErrorMessage(err, 'Please try again.')); }
    finally { setTogglingId(null); }
  };

  const remove = async (item: OfferPackage) => {
    if (!(await confirm({ title: 'Delete Offer Package', message: `Remove ${item.title} from the website? Existing bookings will be preserved.`, danger: true, confirmLabel: 'Delete' }))) return;
    try {
      const response = await api.delete<{ message?: string }>(`/api/admin/offer-packages/${item.id}`);
      setOffers(current => current.filter(row => row.id !== item.id));
      success(response.data.message === 'Offer package deleted' ? 'Offer package deleted' : 'Offer package archived', `${item.title} was removed from the website.`);
    } catch (err) { showError('Unable to delete offer package', apiErrorMessage(err, 'Please try again.')); }
  };

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return offers.filter(item => !query || [item.title, item.service_name || ''].some(value => value.toLowerCase().includes(query)));
  }, [offers, search]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const effectivePage = Math.min(page, totalPages);
  const rows = filtered.slice((effectivePage - 1) * PAGE_SIZE, effectivePage * PAGE_SIZE);

  return <div className="space-y-6">
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <div><h1 className="font-primary text-4xl font-bold tracking-tight text-slate-900">Offer Packages</h1><p className="mt-1 text-sm text-slate-500">Manage homepage offers and connect each offer to its booking calendar.</p></div>
      <Button onClick={() => openForm()} className="flex items-center gap-2"><Plus className="h-4 w-4" /> Add Offer Package</Button>
    </div>
    <div className="glass-panel flex items-center gap-2 rounded-3xl p-6 shadow-soft"><Search className="h-5 w-5 text-gray-400" /><input className="w-full bg-transparent text-sm outline-none" placeholder="Search offers..." value={search} onChange={event => { setSearch(event.target.value); setPage(1); }} /></div>
    <div className="glass-panel overflow-hidden rounded-3xl shadow-soft"><div className="overflow-x-auto"><table className="min-w-[950px] w-full divide-y divide-gray-200"><thead className="bg-slate-50/50"><tr>{['Offer', 'Booking Service', 'Prices', 'Discount', 'Status', 'Actions'].map(label => <th key={label} className={`${label === 'Actions' ? 'text-right' : 'text-left'} px-6 py-3 text-xs font-medium uppercase tracking-wider text-slate-500`}>{label}</th>)}</tr></thead><tbody className="divide-y divide-slate-100/60 bg-white/20">
      {loading ? <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-500">Loading offer packages...</td></tr> : rows.length === 0 ? <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-500"><BadgePercent className="mx-auto mb-2 h-7 w-7" />No offer packages found</td></tr> : rows.map(item => <tr key={item.id} className="transition-colors hover:bg-white/60"><td className="px-6 py-4"><div className="flex items-center gap-3"><img src={item.image_url} alt="" className="h-12 w-16 rounded-lg bg-slate-100 object-cover" /><div><p className="text-sm font-medium text-slate-800">{item.title}</p><p className="max-w-xs truncate text-xs text-slate-500">{item.description}</p></div></div></td><td className="px-6 py-4 text-sm text-slate-600">{item.service_name || '-'}</td><td className="px-6 py-4 text-sm"><span className="text-slate-400 line-through">{item.currency} {item.original_price}</span><span className="ml-2 font-semibold text-(--primary-plum)">{item.currency} {item.offer_price}</span></td><td className="px-6 py-4"><span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">{item.discount_percentage}% OFF</span></td><td className="px-6 py-4"><StatusToggle active={item.status === 'active'} label={item.title} disabled={togglingId === item.id} onChange={() => toggleStatus(item)} /></td><td className="whitespace-nowrap px-6 py-4 text-right text-sm space-x-3"><button onClick={() => openForm(item)} className="inline-flex items-center text-(--primary-plum)"><Edit2 className="mr-1 h-4 w-4" /> Edit</button><button onClick={() => remove(item)} className="inline-flex items-center text-red-600"><Trash2 className="mr-1 h-4 w-4" /> Delete</button></td></tr>)}
    </tbody></table></div><TablePagination page={effectivePage} pageSize={PAGE_SIZE} totalItems={filtered.length} onPageChange={setPage} /></div>
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={editing ? 'Edit Offer Package' : 'Add Offer Package'} maxWidth="2xl"><form onSubmit={save} className="space-y-4">
      <div><label className="mb-1 block text-sm font-medium text-gray-700">Booking Service *</label><select required className="block w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm" value={form.service_id} onChange={event => selectService(event.target.value)}><option value="">Select a service</option>{activeServices.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}</select><p className="mt-1 text-xs text-slate-500">This service controls available staff, dates and time slots.</p></div>
      <Input label="Title *" required value={form.title} onChange={event => setForm({ ...form, title: event.target.value })} />
      <div><label className="mb-1 block text-sm font-medium text-gray-700">Description</label><textarea rows={3} className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm" value={form.description} onChange={event => setForm({ ...form, description: event.target.value })} /></div>
      <div><label className="mb-1 block text-sm font-medium text-gray-700">Offer Image *</label><label className="flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-(--primary-plum)/25 bg-(--primary-plum)/[0.03] px-4 py-5 text-center transition hover:border-(--primary-plum)/50"><input type="file" accept="image/png,image/jpeg,image/webp" className="sr-only" disabled={uploadingImage} onChange={event => void uploadImage(event.target.files?.[0])} />{uploadingImage ? <Loader2 className="h-7 w-7 animate-spin text-(--primary-plum)" /> : <ImagePlus className="h-7 w-7 text-(--primary-plum)" />}<span className="mt-2 text-sm font-semibold text-slate-700">{uploadingImage ? 'Uploading image...' : form.image_url ? 'Choose a replacement image' : 'Choose an image'}</span><span className="mt-1 text-xs text-slate-500">PNG, JPEG or WebP · maximum 5 MB</span></label>{form.image_url && <img src={form.image_url} alt="Offer preview" className="mt-3 h-40 w-full rounded-xl bg-slate-100 object-cover" />}<input required tabIndex={-1} aria-hidden="true" className="pointer-events-none h-0 w-0 opacity-0" value={form.image_url} onChange={() => undefined} /></div>
      <div className="grid gap-4 sm:grid-cols-2"><Input type="number" min="0.01" step="0.01" label={`Original Price (${form.currency}) *`} required value={form.original_price} onChange={event => setForm({ ...form, original_price: event.target.value })} /><Input type="number" min="0.01" step="0.01" label={`Offer Price (${form.currency}) *`} required value={form.offer_price} onChange={event => setForm({ ...form, offer_price: event.target.value })} /></div>
      <div className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">Discount automatically calculated: {discount}% OFF</div>
      <div><label className="mb-1 block text-sm font-medium text-gray-700">Status</label><select className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm" value={form.status} onChange={event => setForm({ ...form, status: event.target.value })}><option value="active">Active</option><option value="inactive">Inactive</option></select></div>
      <div className="flex justify-end gap-3 pt-4"><Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button><Button type="submit" disabled={saving || uploadingImage}>{saving ? 'Saving...' : editing ? 'Save Changes' : 'Create Offer Package'}</Button></div>
    </form></Modal>
  </div>;
}
