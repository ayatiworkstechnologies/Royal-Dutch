"use client";

import React, { useEffect, useState } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import api from '@/lib/api';
import { Plus, Edit2, Trash2, Search, FileText } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { PatientDocumentsModal } from './PatientDocumentsModal';

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
      const response = await api.get('/api/v1/patients');
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
        await api.patch(`/api/v1/patients/${editingPatient.id}`, payload);
      } else {
        await api.post('/api/v1/patients', payload);
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
        await api.delete(`/api/v1/patients/${id}`);
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h1 className="text-2xl font-bold text-gray-900 font-cinzel">Patients</h1>
        <Button onClick={() => handleOpenModal()} className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Patient
        </Button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm ring-1 ring-gray-900/5 flex items-center gap-2">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search patients by name, email, or phone..."
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender / Age</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">Loading patients...</td>
                </tr>
              ) : filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">No patients found</td>
                </tr>
              ) : (
                filteredPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{patient.full_name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{patient.phone}</div>
                      <div className="text-sm text-gray-500">{patient.email || '-'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {patient.gender || '-'} / {patient.age || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                      <button 
                        onClick={() => setDocsModalPatient(patient)} 
                        className="text-[var(--primary-plum)] hover:text-[var(--primary-gold)] transition-colors" 
                        title="View Medical Documents"
                      >
                        <FileText className="w-4 h-4 inline-block" />
                      </button>
                      <button onClick={() => handleOpenModal(patient)} className="text-indigo-600 hover:text-indigo-900 transition-colors" title="Edit Patient">
                        <Edit2 className="w-4 h-4 inline-block" />
                      </button>
                      <button onClick={() => handleDelete(patient.id)} className="text-red-600 hover:text-red-900 inline-flex items-center">
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
        title={editingPatient ? 'Edit Patient' : 'Add New Patient'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#B48F57] focus:ring-[#B48F57] sm:text-sm"
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#B48F57] focus:ring-[#B48F57] sm:text-sm"
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>
          <div className="pt-4 flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {editingPatient ? 'Save Changes' : 'Create Patient'}
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
