"use client";

import React, { useEffect, useState } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import api from '@/lib/api';
import { catalogNumbers, sortCatalog } from '@/lib/catalogNumbers';
import { useAlert } from '@/context/AlertContext';
import { Plus, Edit2, Trash2, Search, ListTree } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { StatusToggle } from '@/components/ui/StatusToggle';
import { TablePagination } from '@/components/ui/TablePagination';

const PAGE_SIZE = 10;

interface Service {
  id: number;
  display_id?: number | null;
  category_id: number;
  category_name?: string;
  name: string;
  slug: string;
  description: string | null;
  duration_minutes: number | null;
  price: number | null;
  currency: string;
  status: string;
}

interface Category {
  id: number;
  display_id?: number | null;
  name: string;
  status: string;
}

interface SubService {
  id: number;
  service_id: number;
  name: string;
  slug: string;
  description: string | null;
  duration_minutes: number | null;
  price: number | null;
  currency: string;
  image: string | null;
  status: string;
}

const emptySubServiceForm = {
  name: '', slug: '', description: '', duration_minutes: '', price: '',
  currency: 'AED', image: '', status: 'active'
};

export default function AdminServicesPage() {
  const { user } = useAdminAuth();
  const { success: toastSuccess, error: toastError, confirm: confirmDialog } = useAlert();
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [togglingServiceId, setTogglingServiceId] = useState<number | null>(null);
  const [subServiceParent, setSubServiceParent] = useState<Service | null>(null);
  const [subServices, setSubServices] = useState<SubService[]>([]);
  const [subServicesLoading, setSubServicesLoading] = useState(false);
  const [editingSubService, setEditingSubService] = useState<SubService | null>(null);
  const [subServiceForm, setSubServiceForm] = useState(emptySubServiceForm);
  const [savingSubService, setSavingSubService] = useState(false);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    category_id: '',
    name: '',
    slug: '',
    description: '',
    duration_minutes: '',
    price: '',
    currency: 'AED',
    status: 'active'
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [servicesRes, categoriesRes] = await Promise.all([
        api.get('/api/services?include_inactive=true'),
        api.get('/api/categories?include_inactive=true')
      ]);
      setServices(sortCatalog<Service>(servicesRes.data));
      setCategories(sortCatalog<Category>(categoriesRes.data));
    } catch (error) {
      console.error('Failed to fetch data', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchData();
  }, [user]);

  const handleOpenModal = (service?: Service) => {
    if (service) {
      setEditingService(service);
      setFormData({
        category_id: service.category_id.toString(),
        name: service.name,
        slug: service.slug,
        description: service.description || '',
        duration_minutes: service.duration_minutes?.toString() || '',
        price: service.price?.toString() || '',
        currency: service.currency || 'AED',
        status: service.status
      });
    } else {
      setEditingService(null);
      setFormData({ 
        category_id: categories.find(category => category.status === 'active')?.id.toString() || '', 
        name: '', 
        slug: '', 
        description: '', 
        duration_minutes: '', 
        price: '', 
        currency: 'AED', 
        status: 'active' 
      });
    }
    setIsModalOpen(true);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setFormData(prev => ({
      ...prev,
      name: newName,
      slug: !editingService ? newName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : prev.slug
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        category_id: parseInt(formData.category_id, 10),
        duration_minutes: formData.duration_minutes ? parseInt(formData.duration_minutes, 10) : null,
        price: formData.price ? parseFloat(formData.price) : null,
      };

      if (editingService) {
        await api.patch(`/api/services/${editingService.id}`, payload);
      } else {
        await api.post('/api/services', payload);
      }
      setIsModalOpen(false);
      fetchData(); // refresh table
    } catch (error: any) {
      console.error('Failed to save service', error);
      toastError('Error', error.response?.data?.detail || 'An error occurred');
    }
  };

  const handleDelete = async (id: number) => {
    if (!(await confirmDialog({ title: 'Delete Service', message: 'Are you sure you want to delete this service?', danger: true, confirmLabel: 'Delete' }))) return;
    try {
      await api.delete(`/api/services/${id}`);
      fetchData();
    } catch (error) {
      console.error('Failed to delete service', error);
    }
  };

  const handleStatusToggle = async (service: Service) => {
    const nextStatus = service.status === 'active' ? 'inactive' : 'active';
    setTogglingServiceId(service.id);
    try {
      const response = await api.patch(`/api/services/${service.id}`, { status: nextStatus });
      setServices((current) =>
        current.map((item) => item.id === service.id ? response.data : item)
      );
      toastSuccess('Status updated', `${service.name} is now ${nextStatus}.`);
    } catch (error: any) {
      console.error('Failed to update service status', error);
      toastError('Status update failed', error.response?.data?.detail || 'Please try again.');
    } finally {
      setTogglingServiceId(null);
    }
  };

  const fetchSubServices = async (serviceId: number) => {
    setSubServicesLoading(true);
    try {
      const response = await api.get(`/api/services/${serviceId}/sub-services?include_inactive=true`);
      setSubServices(response.data);
    } catch (error: any) {
      toastError('Unable to load sub-services', error.response?.data?.detail || 'Please try again.');
    } finally {
      setSubServicesLoading(false);
    }
  };

  const openSubServices = (service: Service) => {
    setSubServiceParent(service);
    setEditingSubService(null);
    setSubServiceForm(emptySubServiceForm);
    fetchSubServices(service.id);
  };

  const editSubService = (item: SubService) => {
    setEditingSubService(item);
    setSubServiceForm({
      name: item.name,
      slug: item.slug,
      description: item.description || '',
      duration_minutes: item.duration_minutes?.toString() || '',
      price: item.price?.toString() || '',
      currency: item.currency || 'AED',
      image: item.image || '',
      status: item.status
    });
  };

  const saveSubService = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!subServiceParent) return;
    setSavingSubService(true);
    const payload = {
      ...subServiceForm,
      description: subServiceForm.description || null,
      image: subServiceForm.image || null,
      duration_minutes: subServiceForm.duration_minutes ? Number(subServiceForm.duration_minutes) : null,
      price: subServiceForm.price ? Number(subServiceForm.price) : null
    };
    try {
      if (editingSubService) {
        await api.patch(`/api/services/${subServiceParent.id}/sub-services/${editingSubService.id}`, payload);
      } else {
        await api.post(`/api/services/${subServiceParent.id}/sub-services`, payload);
      }
      toastSuccess('Sub-service saved', `${payload.name} was saved successfully.`);
      setEditingSubService(null);
      setSubServiceForm(emptySubServiceForm);
      await fetchSubServices(subServiceParent.id);
    } catch (error: any) {
      toastError('Unable to save sub-service', error.response?.data?.detail || 'Please check the form and try again.');
    } finally {
      setSavingSubService(false);
    }
  };

  const deleteSubService = async (item: SubService) => {
    if (!subServiceParent || !(await confirmDialog({ title: 'Delete Sub-service', message: `Delete ${item.name}?`, danger: true, confirmLabel: 'Delete' }))) return;
    try {
      await api.delete(`/api/services/${subServiceParent.id}/sub-services/${item.id}`);
      await fetchSubServices(subServiceParent.id);
      toastSuccess('Sub-service deleted', `${item.name} was deleted.`);
    } catch (error: any) {
      toastError('Unable to delete sub-service', error.response?.data?.detail || 'Please try again.');
    }
  };

  const serviceNumbers = catalogNumbers(services);
  const categoryNumbers = catalogNumbers(categories);
  const activeCategories = categories.filter(category => category.status === 'active');

  const filteredServices = services.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    (s.category_name && s.category_name.toLowerCase().includes(search.toLowerCase()))
  );
  const totalPages = Math.max(1, Math.ceil(filteredServices.length / PAGE_SIZE));
  const effectivePage = Math.min(currentPage, totalPages);
  const paginatedServices = filteredServices.slice((effectivePage - 1) * PAGE_SIZE, effectivePage * PAGE_SIZE);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 font-primary tracking-tight">Services</h1>
          <p className="mt-1 text-sm text-slate-500">Manage services, pricing and available sub-services.</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Service
        </Button>
      </div>

      <div className="glass-panel p-4 sm:px-6 rounded-2xl shadow-soft flex items-center gap-3 border border-white/60">
        <Search className="w-5 h-5 shrink-0 text-slate-400" />
        <input
          type="text"
          placeholder="Search services by name or category..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
          className="w-full bg-transparent border-none focus:ring-0 outline-none text-sm text-slate-700 placeholder:text-slate-400"
        />
        <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
          {filteredServices.length} {filteredServices.length === 1 ? 'service' : 'services'}
        </span>
      </div>

      <div className="glass-panel shadow-soft rounded-3xl overflow-hidden border border-white/70">
        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full table-fixed divide-y divide-slate-200">
            <thead className="bg-slate-50/80">
              <tr>
                <th className="w-[31%] px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Service</th>
                <th className="w-[25%] px-5 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                <th className="w-[17%] px-5 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Details</th>
                <th className="w-[14%] px-5 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="w-[13%] px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white/20 divide-y divide-slate-100/60">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">Loading services...</td>
                </tr>
              ) : filteredServices.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">No services found</td>
                </tr>
              ) : (
                paginatedServices.map((service) => (
                  <tr key={service.id} className="group hover:bg-white/70 transition-colors">
                    <td className="px-6 py-5">
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex h-7 min-w-7 items-center justify-center rounded-lg bg-(--primary-plum)/8 px-2 text-xs font-bold text-(--primary-plum)">
                          #{serviceNumbers.get(service.id)}
                        </span>
                        <div className="min-w-0">
                          <div className="truncate text-sm font-semibold text-slate-900" title={service.name}>{service.name}</div>
                          <div className="truncate text-xs text-slate-400 font-mono mt-1" title={service.slug}>{service.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5">
                      <div className="flex items-center gap-2">
                        <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-mono text-slate-500">#{categoryNumbers.get(service.category_id) ?? '-'}</span>
                        <span className="line-clamp-2 text-sm text-slate-600">{service.category_name || categories.find(category => category.id === service.category_id)?.name || '-'}</span>
                      </div>
                    </td>
                    <td className="px-5 py-5">
                      <div className="text-sm font-medium text-slate-700">{service.duration_minutes ? `${service.duration_minutes} mins` : 'No duration'}</div>
                      <div className="mt-1 text-xs text-slate-500">{service.price != null ? `${service.currency} ${Number(service.price).toFixed(2)}` : 'No price'}</div>
                    </td>
                    <td className="px-5 py-5 whitespace-nowrap">
                      <StatusToggle
                        active={service.status === 'active'}
                        label={service.name}
                        disabled={togglingServiceId === service.id}
                        onChange={() => handleStatusToggle(service)}
                      />
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-end gap-2">
                      <button title="Manage sub-services" aria-label={`Manage sub-services for ${service.name}`} onClick={() => openSubServices(service)} className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-700 transition hover:bg-sky-100 hover:scale-105">
                        <ListTree className="w-4 h-4" />
                      </button>
                      <button title="Edit service" aria-label={`Edit ${service.name}`} onClick={() => handleOpenModal(service)} className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-(--primary-plum)/8 text-(--primary-plum) transition hover:bg-(--primary-plum)/15 hover:scale-105">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button title="Delete service" aria-label={`Delete ${service.name}`} onClick={() => handleDelete(service.id)} className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-600 transition hover:bg-red-100 hover:scale-105">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <TablePagination page={effectivePage} pageSize={PAGE_SIZE} totalItems={filteredServices.length} onPageChange={setCurrentPage} />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingService ? 'Edit Service' : 'Add New Service'}
        maxWidth="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              id="name"
              label="Service Name *"
              value={formData.name}
              onChange={handleNameChange}
              required
            />
            <Input
              id="slug"
              label="Slug *"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
            <select
              className="block w-full appearance-none rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-slate-800 shadow-sm outline-none transition focus:border-(--primary-gold) focus:ring-2 focus:ring-(--primary-gold)/20"
              value={formData.category_id}
              onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
              required
            >
              <option value="" disabled>Select a category</option>
              {activeCategories.map(c => (
                <option key={c.id} value={c.id}>#{categoryNumbers.get(c.id)} — {c.name}</option>
              ))}
            </select>
            {activeCategories.length === 0 && <p className="mt-1 text-xs text-red-600">Create or activate a category before adding a service.</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              id="duration"
              type="number"
              label="Duration (minutes)"
              value={formData.duration_minutes}
              onChange={(e) => setFormData({ ...formData, duration_minutes: e.target.value })}
            />
            <Input
              id="price"
              type="number"
              step="0.01"
              label={`Price (${formData.currency})`}
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              className="w-full rounded-md border-slate-200/50 bg-white/40 shadow-sm focus:border-(--primary-gold) focus:ring-(--primary-gold) sm:text-sm"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              className="w-full rounded-md border-slate-200/50 bg-white/40 shadow-sm focus:border-(--primary-gold) focus:ring-(--primary-gold) sm:text-sm"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="pt-4 flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {editingService ? 'Save Changes' : 'Create Service'}
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={Boolean(subServiceParent)}
        onClose={() => setSubServiceParent(null)}
        title={`Sub-services${subServiceParent ? ` — ${subServiceParent.name}` : ''}`}
        maxWidth="lg"
      >
        <div className="space-y-6">
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {subServicesLoading ? (
              <p className="py-6 text-center text-sm text-slate-500">Loading sub-services...</p>
            ) : subServices.length === 0 ? (
              <p className="py-6 text-center text-sm text-slate-500">No sub-services added yet.</p>
            ) : subServices.map(item => (
              <div key={item.id} className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 p-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-semibold text-slate-800">{item.name}</p>
                    <span className={`rounded-full px-2 py-0.5 text-[11px] ${item.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>{item.status}</span>
                  </div>
                  <p className="text-xs text-slate-500">{item.duration_minutes ? `${item.duration_minutes} min` : 'No duration'} · {item.price != null ? `${item.currency} ${item.price}` : 'No price'}</p>
                </div>
                <div className="flex shrink-0 gap-3">
                  <button type="button" onClick={() => editSubService(item)} className="text-(--primary-plum)" aria-label={`Edit ${item.name}`}><Edit2 className="h-4 w-4" /></button>
                  <button type="button" onClick={() => deleteSubService(item)} className="text-red-600" aria-label={`Delete ${item.name}`}><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={saveSubService} className="space-y-4 border-t border-slate-200 pt-5">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-slate-800">{editingSubService ? 'Edit sub-service' : 'Add sub-service'}</h3>
              {editingSubService && <button type="button" className="text-sm text-slate-500 hover:text-slate-800" onClick={() => { setEditingSubService(null); setSubServiceForm(emptySubServiceForm); }}>Cancel edit</button>}
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input id="sub-service-name" label="Name *" required value={subServiceForm.name} onChange={(e) => { const name = e.target.value; setSubServiceForm(current => ({ ...current, name, slug: editingSubService ? current.slug : name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') })); }} />
              <Input id="sub-service-slug" label="Slug *" required value={subServiceForm.slug} onChange={(e) => setSubServiceForm({ ...subServiceForm, slug: e.target.value })} />
              <Input id="sub-service-duration" type="number" min="1" label="Duration (minutes)" value={subServiceForm.duration_minutes} onChange={(e) => setSubServiceForm({ ...subServiceForm, duration_minutes: e.target.value })} />
              <Input id="sub-service-price" type="number" min="0" step="0.01" label={`Price (${subServiceForm.currency})`} value={subServiceForm.price} onChange={(e) => setSubServiceForm({ ...subServiceForm, price: e.target.value })} />
              <Input id="sub-service-image" label="Image URL" value={subServiceForm.image} onChange={(e) => setSubServiceForm({ ...subServiceForm, image: e.target.value })} />
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Status</label>
                <select className="w-full rounded-md border-slate-200/50 bg-white/40 shadow-sm sm:text-sm" value={subServiceForm.status} onChange={(e) => setSubServiceForm({ ...subServiceForm, status: e.target.value })}>
                  <option value="active">Active</option><option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Description</label>
              <textarea rows={2} className="w-full rounded-md border-slate-200/50 bg-white/40 shadow-sm sm:text-sm" value={subServiceForm.description} onChange={(e) => setSubServiceForm({ ...subServiceForm, description: e.target.value })} />
            </div>
            <div className="flex justify-end"><Button type="submit" disabled={savingSubService}>{savingSubService ? 'Saving...' : editingSubService ? 'Save Changes' : 'Add Sub-service'}</Button></div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
