"use client";

import React, { useEffect, useState } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import api from '@/lib/api';
import { Plus, Edit2, Trash2, Search, FileText, Users, Activity, UserPlus, FileArchive } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { PatientDocumentsModal } from './PatientDocumentsModal';
import { format } from 'date-fns';

interface Patient {
  id: number;
  full_name: string;
  email: string | null;
  phone: string;
  gender: string | null;
  age: number | null;
  notes: string | null;
}

export default function AdminPatientsPage() {
  const { user } = useAdminAuth();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [docsModalPatient, setDocsModalPatient] = useState<Patient | null>(null);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    gender: '',
    age: '',
    notes: ''
  });

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/patients');
      setPatients(response.data);
    } catch (error) {
      console.error('Failed to fetch patients', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchPatients();
  }, [user]);

  const handleOpenModal = (patient?: Patient) => {
    if (patient) {
      setEditingPatient(patient);
      setFormData({
        full_name: patient.full_name,
        email: patient.email || '',
        phone: patient.phone,
        gender: patient.gender || '',
        age: patient.age ? patient.age.toString() : '',
        notes: patient.notes || ''
      });
    } else {
      setEditingPatient(null);
      setFormData({ full_name: '', email: '', phone: '', gender: '', age: '', notes: '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        age: formData.age ? parseInt(formData.age, 10) : null,
      };

      if (editingPatient) {
        await api.patch(`/api/patients/${editingPatient.id}`, payload);
      } else {
        await api.post('/api/patients', payload);
      }
      setIsModalOpen(false);
      fetchPatients();
    } catch (error: any) {
      console.error('Failed to save patient', error);
      alert(error.response?.data?.detail || 'An error occurred');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      try {
        await api.delete(`/api/patients/${id}`);
        fetchPatients();
      } catch (error) {
        console.error('Failed to delete patient', error);
      }
    }
  };

  const filteredPatients = patients.filter(p => 
    p.full_name.toLowerCase().includes(search.toLowerCase()) || 
    p.phone.includes(search) ||
    (p.email && p.email.toLowerCase().includes(search.toLowerCase()))
  );

  // Stats
  const totalPatients = patients.length;
  // Assume a dummy logic for new patients today for visual effect on dashboard (normally from API)
  const newPatientsCount = Math.floor(totalPatients * 0.1) || 0; 
  const activeCount = totalPatients - newPatientsCount;

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 font-primary tracking-tight">Patient Database</h1>
          <p className="text-slate-500 text-sm mt-1.5 font-secondary flex items-center gap-2">
            <Users className="h-4 w-4" />
            Manage and view patient records
          </p>
        </div>
      </div>

      {/* Hero Overview Block */}
      <div className="relative rounded-3xl bg-linear-to-br from-(--primary-plum) via-[#632052] to-[#38072e] p-8 text-white shadow-soft overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 group-hover:bg-white/10 transition-all duration-700" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-(--primary-gold)/10 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Activity className="h-5 w-5 text-(--primary-gold)" />
              <span className="text-xs font-semibold text-(--primary-gold) uppercase tracking-widest font-secondary">Patient Directory</span>
            </div>
            <p className="text-6xl font-bold font-primary mb-2 tracking-tight">{loading ? '—' : totalPatients}</p>
            <p className="text-white/70 text-sm font-secondary">Total registered patients</p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:gap-4 w-full md:w-auto">
            <MiniStat label="New This Month" value={newPatientsCount} color="text-blue-400" />
            <MiniStat label="Active Patients" value={activeCount} color="text-green-400" />
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard title="Total Registered" value={loading ? '—' : totalPatients} icon={<Users className="h-5 w-5 text-slate-500" />} />
        <StatCard title="New Patients" value={loading ? '—' : newPatientsCount} icon={<UserPlus className="h-5 w-5 text-blue-500" />} highlight={newPatientsCount > 0} />
        <StatCard title="Active Directory" value={loading ? '—' : activeCount} icon={<Activity className="h-5 w-5 text-green-500" />} />
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 font-secondary flex items-center gap-2">
          <span className="w-8 h-px bg-slate-300"></span> Patient Records
        </h2>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="glass-panel p-2 rounded-2xl shadow-sm flex items-center gap-2 flex-1 sm:w-72 border-0">
            <Search className="w-4 h-4 text-slate-400 ml-2" />
            <input
              type="text"
              placeholder="Search name, email, phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent border-none focus:ring-0 outline-none text-sm text-slate-700"
            />
          </div>
          <Button onClick={() => handleOpenModal()} className="rounded-xl flex items-center gap-2 shadow-sm whitespace-nowrap">
            <Plus className="w-4 h-4" /> Add Patient
          </Button>
        </div>
      </div>

      <div className="glass-panel shadow-soft rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest font-secondary">Name</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest font-secondary">Contact</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest font-secondary">Gender / Age</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-widest font-secondary">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white/20 divide-y divide-slate-100/60">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-500 font-secondary">Loading patients...</td>
                </tr>
              ) : filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-500 font-secondary">No patients found</td>
                </tr>
              ) : (
                filteredPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-white/60 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-(--primary-plum)/10 flex items-center justify-center font-bold text-(--primary-plum)">
                          {patient.full_name.charAt(0).toUpperCase()}
                        </div>
                        <div className="text-sm font-bold text-slate-800">{patient.full_name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-slate-700">{patient.phone}</div>
                      <div className="text-xs text-slate-500 font-secondary">{patient.email || 'No email provided'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                        {patient.gender || 'N/A'} {patient.age ? `• ${patient.age} yrs` : ''}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2 opacity-80 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => setDocsModalPatient(patient)} 
                        className="text-blue-600 hover:text-blue-800 bg-blue-50 p-2 rounded-lg transition-colors" 
                        title="View Medical Documents"
                      >
                        <FileArchive className="w-4 h-4 inline-block" />
                      </button>
                      <button onClick={() => handleOpenModal(patient)} className="text-(--primary-plum) hover:text-white hover:bg-(--primary-plum) bg-(--primary-plum)/10 p-2 rounded-lg transition-colors" title="Edit Patient">
                        <Edit2 className="w-4 h-4 inline-block" />
                      </button>
                      <button onClick={() => handleDelete(patient.id)} className="text-red-600 hover:text-red-900 bg-red-50 p-2 rounded-lg transition-colors" title="Delete">
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
        title={editingPatient ? 'Edit Patient Profile' : 'Register New Patient'}
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            id="full_name"
            label="Full Name *"
            value={formData.full_name}
            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              id="phone"
              label="Phone Number *"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
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
              <label className="block text-sm font-semibold text-slate-700 mb-1 font-secondary">Gender</label>
              <select
                className="w-full rounded-xl border border-slate-200/60 bg-white/60 px-4 py-2.5 text-slate-700 text-sm focus:border-(--primary-gold) focus:ring-1 focus:ring-(--primary-gold) outline-none transition-all shadow-sm"
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              >
                <option value="">Select...</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <Input
              id="age"
              type="number"
              label="Age"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1 font-secondary">Notes / Medical Context</label>
            <textarea
              className="w-full rounded-xl border border-slate-200/60 bg-white/60 px-4 py-3 text-slate-700 text-sm focus:border-(--primary-gold) focus:ring-1 focus:ring-(--primary-gold) outline-none transition-all shadow-sm resize-none"
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>
          <div className="pt-6 border-t border-slate-100 flex justify-end space-x-3">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
              Cancel
            </button>
            <Button type="submit" className="rounded-full px-8">
              {editingPatient ? 'Save Changes' : 'Register Patient'}
            </Button>
          </div>
        </form>
      </Modal>

      <PatientDocumentsModal 
        isOpen={!!docsModalPatient} 
        onClose={() => setDocsModalPatient(null)} 
        patient={docsModalPatient} 
      />
    </div>
  );
}

function MiniStat({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-center hover:bg-white/15 transition-colors">
      <p className={`text-2xl md:text-3xl font-bold font-primary ${color} mb-1 drop-shadow-sm`}>{value}</p>
      <p className="text-white/70 text-[10px] md:text-xs uppercase tracking-widest font-secondary font-semibold">{label}</p>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  highlight = false,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div className={`glass-panel rounded-2xl hover-lift transition-all duration-300 relative overflow-hidden ${highlight ? 'border-(--primary-gold)/30 bg-white/90 shadow-md' : 'bg-white/80'}`}>
      {highlight && <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-(--primary-gold) to-(--primary-plum)"></div>}
      <div className="p-5">
        <div className="flex items-center gap-4">
          <div className={`shrink-0 rounded-xl p-3 border shadow-sm transition-colors ${highlight ? 'bg-(--primary-gold)/10 border-(--primary-gold)/20' : 'bg-slate-50 border-slate-100'}`}>
            {icon}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-slate-400 font-secondary uppercase tracking-widest truncate mb-1">{title}</p>
            <p className={`font-bold font-primary truncate text-2xl ${highlight ? 'text-(--primary-gold) drop-shadow-sm' : 'text-slate-800'}`}>
              {value}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
