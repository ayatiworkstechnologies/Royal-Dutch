"use client";

import React, { useEffect, useState } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import api from '@/lib/api';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';

interface Staff {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  role: string;
  specialization: string | null;
  status: string;
  service_ids?: number[];
}

export default function AdminStaffPage() {
  const { user } = useAdminAuth();
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    specialization: '',
    status: 'active',
    service_ids: [] as number[]
  });

  const fetchStaff = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/v1/staff');
      setStaffList(response.data);
    } catch (error) {
      console.error('Failed to fetch staff', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await api.get('/api/v1/services');
      setServices(response.data);
    } catch (error) {
      console.error('Failed to fetch services', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchStaff();
      fetchServices();
    }
  }, [user]);

  const handleOpenModal = (staff?: Staff) => {
    if (staff) {
      setEditingStaff(staff);
      setFormData({
        name: staff.name,
        email: staff.email || '',
        phone: staff.phone || '',
        role: staff.role,
        specialization: staff.specialization || '',
        status: staff.status,
        service_ids: staff.service_ids || []
      });
    } else {
      setEditingStaff(null);
      setFormData({ name: '', email: '', phone: '', role: '', specialization: '', status: 'active', service_ids: [] });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingStaff) {
        await api.patch(`/api/v1/staff/${editingStaff.id}`, formData);
      } else {
        await api.post('/api/v1/staff', formData);
      }
      setIsModalOpen(false);
      fetchStaff();
    } catch (error: any) {
      console.error('Failed to save staff', error);
      alert(error.response?.data?.detail || 'An error occurred');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this staff member?')) {
      try {
        await api.delete(`/api/v1/staff/${id}`);
        fetchStaff();
      } catch (error) {
        console.error('Failed to delete staff', error);
      }
    }
  };

  const filteredStaff = staffList.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    (s.role && s.role.toLowerCase().includes(search.toLowerCase())) ||
    (s.specialization && s.specialization.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h1 className="text-2xl font-bold text-gray-900 font-cinzel">Staff Management</h1>
        <Button onClick={() => handleOpenModal()} className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Staff
        </Button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm ring-1 ring-gray-900/5 flex items-center gap-2">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search staff by name, role, or specialization..."
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name & Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role & Specialization</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">Loading staff...</td>
                </tr>
              ) : filteredStaff.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">No staff found</td>
                </tr>
              ) : (
                filteredStaff.map((staff) => (
                  <tr key={staff.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{staff.name}</div>
                      <div className="text-sm text-gray-500">{staff.email || '-'}</div>
                      <div className="text-sm text-gray-500">{staff.phone || '-'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{staff.role}</div>
                      <div className="text-sm text-gray-500">{staff.specialization || '-'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full capitalize ${staff.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {staff.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                      <button onClick={() => handleOpenModal(staff)} className="text-indigo-600 hover:text-indigo-900 inline-flex items-center">
                        <Edit2 className="w-4 h-4 mr-1" /> Edit
                      </button>
                      <button onClick={() => handleDelete(staff.id)} className="text-red-600 hover:text-red-900 inline-flex items-center">
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
        title={editingStaff ? 'Edit Staff Member' : 'Add New Staff Member'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="name"
            label="Full Name *"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              id="phone"
              label="Phone Number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            <Input
              id="email"
              type="email"
              label="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              id="role"
              label="Role *"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              required
            />
            <Input
              id="specialization"
              label="Specialization"
              value={formData.specialization}
              onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Services Provided</label>
            <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-md p-2 space-y-2 bg-gray-50">
              {services.map((service) => (
                <label key={service.id} className="flex items-center space-x-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-[#B48F57] focus:ring-[#B48F57]"
                    checked={formData.service_ids.includes(service.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({ ...formData, service_ids: [...formData.service_ids, service.id] });
                      } else {
                        setFormData({ ...formData, service_ids: formData.service_ids.filter(id => id !== service.id) });
                      }
                    }}
                  />
                  <span>{service.name}</span>
                </label>
              ))}
              {services.length === 0 && <span className="text-gray-400 text-xs">No services available. Create one first.</span>}
            </div>
          </div>
          <div className="pt-4 flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {editingStaff ? 'Save Changes' : 'Create Staff'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
