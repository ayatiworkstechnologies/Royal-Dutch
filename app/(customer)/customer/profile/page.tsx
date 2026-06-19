"use client";

import React, { useEffect, useState } from 'react';
import { useCustomerAuth } from '@/hooks/useCustomerAuth';
import api from '@/lib/api';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { User, Mail, Phone, Calendar } from 'lucide-react';

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
        const res = await api.get('/api/account/me');
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

      await api.patch('/api/account/me', payload);
      setSuccessMsg('Profile updated successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err: any) {
      setErrorMsg(err.response?.data?.detail || 'Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  if (!user) return null;

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-10">
      <div className="flex items-center gap-4">
        <div className="bg-(--primary-plum)/10 p-4 rounded-2xl">
          <User className="h-8 w-8 text-(--primary-plum)" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-slate-900 font-primary tracking-tight">My Profile</h1>
          <p className="text-slate-500 font-secondary mt-1">Manage your personal information and contact details.</p>
        </div>
      </div>

      <div className="glass-panel p-8 md:p-10 rounded-3xl shadow-soft border-0">
        {successMsg && (
          <div className="mb-8 bg-green-50/80 text-green-700 p-4 rounded-xl border border-green-200 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="font-medium text-sm">{successMsg}</span>
          </div>
        )}
        {errorMsg && (
          <div className="mb-8 bg-red-50/80 text-red-700 p-4 rounded-xl border border-red-200 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <span className="font-medium text-sm">{errorMsg}</span>
          </div>
        )}

        {loading ? (
          <div className="py-12 text-center text-slate-500 font-secondary">Loading profile data...</div>
        ) : (
          <form onSubmit={handleSave} className="space-y-8">
            {/* Account Details Section */}
            <div>
              <h3 className="text-lg font-bold font-primary text-slate-800 mb-4 border-b border-slate-100 pb-2">Account Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Full Name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                />
                <div className="flex flex-col relative group">
                  <label className="text-sm font-semibold text-slate-700 mb-1.5 font-secondary">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-4 w-4 text-slate-400" />
                    </div>
                    <input 
                      type="text" 
                      value={user?.email || ''} 
                      disabled 
                      className="w-full pl-10 rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-slate-500 cursor-not-allowed text-sm transition-colors"
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-1.5 font-secondary">Email cannot be changed.</p>
                </div>
              </div>
            </div>

            {/* Personal Details Section */}
            <div>
              <h3 className="text-lg font-bold font-primary text-slate-800 mb-4 border-b border-slate-100 pb-2">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                />
                
                <div className="flex flex-col">
                  <label className="text-sm font-semibold text-slate-700 mb-1.5 font-secondary">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200/60 bg-white/60 px-4 py-2.5 text-slate-700 text-sm focus:border-(--primary-gold) focus:ring-1 focus:ring-(--primary-gold) outline-none transition-all shadow-sm"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <Input
                  label="Age"
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="e.g. 35"
                />
              </div>
            </div>

            {/* Medical Notes */}
            <div>
              <h3 className="text-lg font-bold font-primary text-slate-800 mb-4 border-b border-slate-100 pb-2">Medical History</h3>
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-slate-700 mb-1.5 font-secondary">Additional Notes (Optional)</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={4}
                  className="w-full rounded-xl border border-slate-200/60 bg-white/60 px-4 py-3 text-slate-700 text-sm focus:border-(--primary-gold) focus:ring-1 focus:ring-(--primary-gold) outline-none transition-all shadow-sm resize-none"
                  placeholder="Any existing conditions, allergies, or context for your doctor..."
                ></textarea>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex justify-end">
              <button 
                type="submit" 
                disabled={saving}
                className="bg-linear-to-r from-(--primary-plum) to-[#511c45] hover:from-[#511c45] hover:to-[#38072e] text-white px-8 py-3 rounded-full font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {saving ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Saving Changes...
                  </>
                ) : (
                  'Save Profile'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
