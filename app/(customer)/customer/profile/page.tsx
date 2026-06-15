"use client";

import React, { useEffect, useState } from 'react';
import { useCustomerAuth } from '@/hooks/useCustomerAuth';
import api from '@/lib/api';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function CustomerProfilePage() {
  const { user } = useCustomerAuth();
  
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    gender: '',
    age: '',
    notes: '',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/api/v1/account/me');
        const data = res.data;
        setFormData({
          full_name: data.full_name || '',
          phone: data.phone || '',
          gender: data.gender || '',
          age: data.age?.toString() || '',
          notes: data.notes || '',
        });
      } catch (err) {
        console.error("Failed to load profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const payload = {
        ...formData,
        age: formData.age ? parseInt(formData.age, 10) : null
      };

      await api.patch('/api/v1/account/me', payload);
      setSuccessMsg('Profile updated successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err: any) {
      setErrorMsg(err.response?.data?.detail || 'Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-gray-500">Loading profile...</div>;
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-[#171717] font-cinzel tracking-wider uppercase mb-2">My Profile</h1>
        <p className="text-gray-600">Update your personal and contact details.</p>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        {successMsg && (
          <div className="mb-6 bg-green-50 text-green-700 p-4 rounded-md border border-green-200">
            {successMsg}
          </div>
        )}
        {errorMsg && (
          <div className="mb-6 bg-red-50 text-red-700 p-4 rounded-md border border-red-200">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Full Name"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              required
            />
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="text" 
                value={user?.email || ''} 
                disabled 
                className="rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-gray-500 cursor-not-allowed"
              />
              <p className="text-xs text-gray-400 mt-1">Email cannot be changed.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="rounded-md border border-gray-300 px-3 py-2 focus:border-[#B48F57] focus:ring-[#B48F57]"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Medical Notes (Optional)</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              className="rounded-md border border-gray-300 px-3 py-2 focus:border-[#B48F57] focus:ring-[#B48F57]"
              placeholder="Any existing conditions or allergies..."
            ></textarea>
          </div>

          <div className="pt-4 flex justify-end">
            <Button type="submit" variant="primary" isLoading={saving}>
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
