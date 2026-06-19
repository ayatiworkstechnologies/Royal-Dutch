"use client";

import React, { useEffect, useState } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import api from '@/lib/api';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';

interface Service {
  id: number;
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
  name: string;
}

export default function AdminServicesPage() {
  const { user } = useAdminAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
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
        api.get('/api/services'),
        api.get('/api/categories')
      ]);
      setServices(servicesRes.data);
      setCategories(categoriesRes.data);
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
        category_id: categories.length > 0 ? categories[0].id.toString() : '', 
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
      alert(error.response?.data?.detail || 'An error occurred');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await api.delete(`/api/services/${id}`);
        fetchData();
      } catch (error) {
        console.error('Failed to delete service', error);
      }
    }
  };

  const filteredServices = services.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    (s.category_name && s.category_name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h1 className="text-2xl font-bold text-gray-900 font-cinzel">Services</h1>
        <Button onClick={() => handleOpenModal()} className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Service
        </Button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm ring-1 ring-gray-900/5 flex items-center gap-2">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search services by name or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent border-none focus:ring-0 outline-none text-sm"
        />
      </div>

      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration / Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">Loading services...</td>
                </tr>
              ) : filteredServices.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">No services found</td>
                </tr>
              ) : (
                filteredServices.map((service) => (
                  <tr key={service.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{service.name}</div>
                      <div className="text-xs text-gray-500 font-mono mt-1">{service.slug}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{service.category_name || `ID: ${service.category_id}`}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{service.duration_minutes ? `${service.duration_minutes} mins` : '-'}</div>
                      <div className="text-sm text-gray-500">{service.price ? `${service.price} ${service.currency}` : '-'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full capitalize ${service.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {service.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                      <button onClick={() => handleOpenModal(service)} className="text-indigo-600 hover:text-indigo-900 inline-flex items-center">
                        <Edit2 className="w-4 h-4 mr-1" /> Edit
                      </button>
                      <button onClick={() => handleDelete(service.id)} className="text-red-600 hover:text-red-900 inline-flex items-center">
                        <Trash2 className="w-4 h-4 mr-1" /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
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
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#B48F57] focus:ring-[#B48F57] sm:text-sm"
              value={formData.category_id}
              onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
              required
            >
              <option value="" disabled>Select a category</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
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
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#B48F57] focus:ring-[#B48F57] sm:text-sm"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#B48F57] focus:ring-[#B48F57] sm:text-sm"
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
    </div>
  );
}
