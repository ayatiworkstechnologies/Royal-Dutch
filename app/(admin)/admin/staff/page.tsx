"use client";

import React, { useEffect, useState } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import api from '@/lib/api';
import { useAlert } from '@/context/AlertContext';
import { Plus, Edit2, Trash2, Search, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { CLINICAL_ROLES } from '@/hooks/useAdminAuth';
import Link from 'next/link';

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
  const { success: toastSuccess, error: toastError, warning: toastWarning, info: toastInfo, confirm: confirmDialog } = useAlert();
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
    service_ids: [] as number[],
    password: '',
    confirmPassword: ''
  });

  const fetchStaff = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/staff');
      setStaffList(response.data);
    } catch (error) {
      console.error('Failed to fetch staff', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await api.get('/api/services');
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
        service_ids: staff.service_ids || [],
        password: '',
        confirmPassword: ''
      });
    } else {
      setEditingStaff(null);
      setFormData({ name: '', email: '', phone: '', role: '', specialization: '', status: 'active', service_ids: [], password: '', confirmPassword: '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingStaff && formData.password !== formData.confirmPassword) {
      toastWarning('Validation', 'Passwords do not match.');
      return;
    }
    
    try {
      if (editingStaff) {
        const { password, confirmPassword, ...updateData } = formData;
        await api.patch(`/api/staff/${editingStaff.id}`, updateData);
      } else {
        const { confirmPassword, password, ...rest } = formData;
        const createData = password ? { ...rest, password } : rest;
        await api.post('/api/staff', createData);
      }
      setIsModalOpen(false);
      fetchStaff();
    } catch (error: any) {
      console.error('Failed to save staff', error);
      toastError('Error', error.response?.data?.detail || 'An error occurred');
    }
  };

  const handleDelete = async (id: number) => {
    if (!(await confirmDialog({ title: 'Delete Staff', message: 'Are you sure you want to remove this staff member?', danger: true, confirmLabel: 'Delete' }))) return;
    try {
      await api.delete(`/api/staff/${id}`);
      fetchStaff();
    } catch (error) {
      console.error('Failed to delete staff', error);
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
        <h1 className="text-4xl font-bold text-slate-900 font-primary tracking-tight mb-2">Staff Management</h1>
        <Button onClick={() => handleOpenModal()} className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Staff
        </Button>
      </div>

      <div className="glass-panel p-6 rounded-3xl shadow-soft flex items-center gap-2">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search staff by name, role, or specialization..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent border-none focus:ring-0 outline-none text-sm"
        />
      </div>

      <div className="glass-panel shadow-soft rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Name & Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Role & Specialization</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white/20 divide-y divide-slate-100/60">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-500">Loading staff...</td>
                </tr>
              ) : filteredStaff.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-500">No staff found</td>
                </tr>
              ) : (
                filteredStaff.map((staff) => (
                  <tr key={staff.id} className="hover:bg-white/60 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-800">{staff.name}</div>
                      <div className="text-sm text-slate-500">{staff.email || '-'}</div>
                      <div className="text-sm text-slate-500">{staff.phone || '-'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-800">{staff.role}</div>
                      <div className="text-sm text-slate-500">{staff.specialization || '-'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full capitalize ${staff.status === 'active' ? 'bg-green-100/80 text-green-800 border border-green-200' : 'bg-red-100/80 text-red-800 border border-red-200'}`}>
                        {staff.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                      {CLINICAL_ROLES.includes(staff.role) && (
                        <Link href={`/admin/staff/${staff.id}/dashboard`} className="text-slate-500 hover:text-(--primary-plum) inline-flex items-center">
                          <LayoutDashboard className="w-4 h-4 mr-1" /> Dashboard
                        </Link>
                      )}
                      <button onClick={() => handleOpenModal(staff)} className="text-(--primary-plum) hover:text-(--primary-plum-light) inline-flex items-center">
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
              <select
                className="w-full rounded-md border-slate-200/50 bg-white/40 shadow-sm focus:border-(--primary-gold) focus:ring-(--primary-gold) sm:text-sm h-10 px-3"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                required
              >
                <option value="" disabled>Select a role...</option>
                <option value="doctor">Doctor</option>
                <option value="nurse">Nurse</option>
                <option value="physiotherapist">Physiotherapist</option>
                <option value="dentist">Dentist</option>
                <option value="laser_specialist">Laser Specialist</option>
                <option value="facial_therapist">Facial Therapist</option>
              </select>
            </div>
          </div>
          
          {!editingStaff && (
            <div className="grid grid-cols-2 gap-4">
              <Input
                id="password"
                type="password"
                label="Login Password *"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              <Input
                id="confirmPassword"
                type="password"
                label="Confirm Password *"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
              />
            </div>
          )}
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
