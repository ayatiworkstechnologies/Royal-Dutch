"use client";

import React, { useEffect, useState } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { ROLE_LABELS } from '@/hooks/useAdminAuth';
import api from '@/lib/api';
import { useAlert } from '@/context/AlertContext';
import { Plus, Edit2, Trash2, ShieldCheck, UserCog } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { StatusToggle } from '@/components/ui/StatusToggle';

interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: string;
  is_active: boolean;
}

export default function AdminUsersPage() {
  const { user } = useAdminAuth();
  const { success: toastSuccess, error: toastError, confirm: confirmDialog } = useAlert();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [togglingUserId, setTogglingUserId] = useState<number | null>(null);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'receptionist',
    is_active: true
  });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/admin/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch admin users', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user.role === 'super_admin') {
      fetchUsers();
    }
  }, [user]);

  const handleOpenModal = (u?: AdminUser) => {
    if (u) {
      setEditingUser(u);
      setFormData({
        name: u.name,
        email: u.email,
        password: '', // Blank password field for edit means "keep existing"
        role: u.role,
        is_active: u.is_active
      });
    } else {
      setEditingUser(null);
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'receptionist',
        is_active: true
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // If editing and password is left blank, we don't send it to the backend to keep the old password
      const payload: any = { ...formData };
      if (editingUser && !payload.password) {
        delete payload.password;
      }

      if (editingUser) {
        await api.patch(`/api/admin/users/${editingUser.id}`, payload);
      } else {
        await api.post('/api/admin/users', payload);
      }
      setIsModalOpen(false);
      fetchUsers();
    } catch (error: any) {
      console.error('Failed to save user', error);
      toastError('Error', error.response?.data?.detail || 'An error occurred');
    }
  };

  const handleDeactivate = async (id: number) => {
    if (!(await confirmDialog({ title: 'Deactivate User', message: 'This user will no longer be able to log in.', danger: true, confirmLabel: 'Deactivate' }))) return;
    try {
      await api.delete(`/api/admin/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Failed to deactivate user', error);
      toastError('Error', 'Failed to deactivate user.');
    }
  };

  const handleStatusToggle = async (account: AdminUser) => {
    const isCurrentUser = account.id.toString() === user?.id?.toString();
    if (isCurrentUser && account.is_active) {
      toastError('Action unavailable', 'You cannot deactivate your own account.');
      return;
    }

    const nextActive = !account.is_active;
    setTogglingUserId(account.id);
    try {
      const response = await api.patch(`/api/admin/users/${account.id}`, {
        is_active: nextActive,
      });
      setUsers((current) =>
        current.map((item) => item.id === account.id ? response.data : item)
      );
      toastSuccess(
        'Status updated',
        `${account.name} is now ${nextActive ? 'active' : 'inactive'}.`
      );
    } catch (error: any) {
      console.error('Failed to update user status', error);
      toastError('Status update failed', error.response?.data?.detail || 'Please try again.');
    } finally {
      setTogglingUserId(null);
    }
  };

  if (user?.role !== 'super_admin') {
    return (
      <div className="flex flex-col items-center justify-center h-full p-12 text-center">
        <ShieldCheck className="w-16 h-16 text-slate-300 mb-4" />
        <h2 className="text-2xl font-bold text-slate-900 font-primary">Access Denied</h2>
        <p className="text-slate-500 mt-2 max-w-md">You do not have permission to access the System Users management page. Only Super Admins can manage staff accounts.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h1 className="text-4xl font-bold text-slate-900 font-primary tracking-tight mb-2">System Users</h1>
        <Button onClick={() => handleOpenModal()} className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add User
        </Button>
      </div>

      <div className="glass-panel shadow-soft rounded-3xl overflow-hidden hover-lift transition-all">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider font-secondary">Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider font-secondary">Email</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider font-secondary">Role</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider font-secondary">Status</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider font-secondary">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white/20 divide-y divide-slate-100/60">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500 font-secondary">Loading users...</td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500 font-secondary">No system users found</td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id} className="hover:bg-white/60 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-(--primary-plum)/10 flex items-center justify-center mr-3">
                          <UserCog className="h-4 w-4 text-(--primary-plum)" />
                        </div>
                        <div className="text-sm font-medium text-slate-800">{u.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {u.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-slate-100 text-slate-800 capitalize border border-slate-200">
                        {ROLE_LABELS[u.role] ?? u.role.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusToggle
                        active={u.is_active}
                        label={u.name}
                        disabled={togglingUserId === u.id || (u.is_active && u.id.toString() === user?.id?.toString())}
                        onChange={() => handleStatusToggle(u)}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                      <button onClick={() => handleOpenModal(u)} className="text-(--primary-plum) hover:text-(--primary-plum-light) transition-colors" title="Edit User">
                        <Edit2 className="w-4 h-4 inline-block" />
                      </button>
                      <button 
                        onClick={() => handleDeactivate(u.id)} 
                        disabled={!u.is_active || u.id.toString() === user?.id?.toString()}
                        className="text-red-600 hover:text-red-900 transition-colors disabled:opacity-30 disabled:cursor-not-allowed" 
                        title={u.id.toString() === user?.id?.toString() ? "Cannot deactivate yourself" : "Deactivate User"}
                      >
                        <Trash2 className="w-4 h-4 inline-block" />
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
        title={editingUser ? `Edit User: ${editingUser.name}` : 'Add New System User'}
        maxWidth="md"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 font-secondary">Full Name</label>
            <Input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 font-secondary">Email Address</label>
            <Input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 font-secondary">
              Password {editingUser && <span className="text-xs text-slate-500 font-normal">(Leave blank to keep existing)</span>}
            </label>
            <Input
              type="password"
              required={!editingUser}
              minLength={8}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 font-secondary">Role</label>
            <select
              required
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-200/50 bg-white/40 focus:outline-none focus:ring-(--primary-plum) focus:border-(--primary-plum) sm:text-sm rounded-md"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="super_admin">Admin (Full Access)</option>
              <option value="admin">Manager (View + Update)</option>
              <option value="receptionist">Receptionist (Booking + Billing)</option>
              <option value="doctor">Doctor</option>
              <option value="accountant">Accountant</option>
              <option value="marketing">Marketing</option>
            </select>
          </div>

          {editingUser && (
            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_active"
                className="h-4 w-4 text-(--primary-plum) focus:ring-(--primary-plum) border-slate-200/50 bg-white/40 rounded"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              />
              <label htmlFor="is_active" className="ml-2 block text-sm text-slate-800 font-secondary">
                Account Active
              </label>
            </div>
          )}

          <div className="pt-4 flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {editingUser ? 'Save Changes' : 'Create User'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
