import React, { useEffect, useState } from 'react';
import api from '@/lib/api';
import { useAlert } from '@/context/AlertContext';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Trash2, Pill, Plus, CalendarDays, Pencil, X } from 'lucide-react';

interface Patient {
  id: number;
  full_name: string;
}

interface Booking {
  id: number;
  booking_code: string;
  booking_date: string;
  booking_time: string;
  status: string;
}

interface Prescription {
  id: number;
  booking_id: number;
  drug_name: string;
  dosage: string;
  frequency: string;
  duration: string;
  notes: string | null;
  created_at: string;
}

interface PatientDetail {
  id: number;
  full_name: string;
  bookings: Booking[];
  prescriptions: Prescription[];
}

interface PatientRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: Patient | null;
}

const EMPTY_FORM = { booking_id: '', drug_name: '', dosage: '', frequency: '', duration: '', notes: '' };

export function PatientRecordModal({ isOpen, onClose, patient }: PatientRecordModalProps) {
  const [detail, setDetail] = useState<PatientDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const { error: toastError, confirm: confirmDialog } = useAlert();

  const fetchDetail = async () => {
    if (!patient) return;
    setLoading(true);
    try {
      const res = await api.get(`/api/patients/${patient.id}`);
      setDetail(res.data);
    } catch (error) {
      console.error('Failed to fetch patient record', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && patient) {
      fetchDetail();
      setIsAdding(false);
      setEditingId(null);
      setForm(EMPTY_FORM);
    }
  }, [isOpen, patient]);

  const startAdd = () => {
    setEditingId(null);
    setForm({ ...EMPTY_FORM, booking_id: detail?.bookings[0]?.id?.toString() ?? '' });
    setIsAdding(true);
  };

  const startEdit = (p: Prescription) => {
    setIsAdding(false);
    setEditingId(p.id);
    setForm({
      booking_id: p.booking_id.toString(),
      drug_name: p.drug_name,
      dosage: p.dosage,
      frequency: p.frequency,
      duration: p.duration,
      notes: p.notes ?? '',
    });
  };

  const cancelForm = () => {
    setIsAdding(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patient) return;
    try {
      if (editingId) {
        await api.patch(`/api/prescriptions/${editingId}`, {
          drug_name: form.drug_name,
          dosage: form.dosage,
          frequency: form.frequency,
          duration: form.duration,
          notes: form.notes || null,
        });
      } else {
        if (!form.booking_id) {
          toastError('Error', 'Select a visit to attach this prescription to.');
          return;
        }
        await api.post(`/api/bookings/${form.booking_id}/prescriptions`, {
          drug_name: form.drug_name,
          dosage: form.dosage,
          frequency: form.frequency,
          duration: form.duration,
          notes: form.notes || null,
        });
      }
      cancelForm();
      fetchDetail();
    } catch (error: any) {
      console.error('Failed to save prescription', error);
      toastError('Error', error.response?.data?.detail || 'An error occurred while saving the prescription');
    }
  };

  const handleDelete = async (id: number) => {
    if (!(await confirmDialog({ title: 'Delete Prescription', message: 'Are you sure you want to remove this prescription?', danger: true, confirmLabel: 'Delete' }))) return;
    try {
      await api.delete(`/api/prescriptions/${id}`);
      fetchDetail();
    } catch (error) {
      console.error('Failed to delete prescription', error);
    }
  };

  if (!patient) return null;

  const bookingLabel = (id: number) => {
    const b = detail?.bookings.find(bk => bk.id === id);
    return b ? `${b.booking_date} ${b.booking_time?.slice(0, 5)} · #${b.booking_code}` : `Visit #${id}`;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Patient Record: ${patient.full_name}`} maxWidth="2xl">
      <div className="space-y-6">
        {!isAdding && !editingId ? (
          <div className="flex justify-end">
            <Button
              onClick={startAdd}
              disabled={!detail || detail.bookings.length === 0}
              className="flex items-center gap-2 text-sm py-1.5 px-3"
            >
              <Plus className="w-4 h-4" /> Add Prescription
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 font-primary">{editingId ? 'Edit Prescription' : 'Add Prescription'}</h4>
              <button type="button" onClick={cancelForm} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            {!editingId && (
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Visit</label>
                <select
                  title="Visit"
                  required
                  className="w-full border-slate-200/50 bg-white/40 rounded-md shadow-sm focus:ring-(--primary-plum) focus:border-(--primary-plum) sm:text-sm transition-colors"
                  value={form.booking_id}
                  onChange={e => setForm({ ...form, booking_id: e.target.value })}
                >
                  {detail?.bookings.map(b => (
                    <option key={b.id} value={b.id}>
                      {b.booking_date} {b.booking_time?.slice(0, 5)} · #{b.booking_code} ({b.status})
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Drug Name</label>
                <Input required value={form.drug_name} onChange={e => setForm({ ...form, drug_name: e.target.value })} placeholder="e.g. Amoxicillin" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Dosage</label>
                <Input required value={form.dosage} onChange={e => setForm({ ...form, dosage: e.target.value })} placeholder="500mg" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Frequency</label>
                <Input required value={form.frequency} onChange={e => setForm({ ...form, frequency: e.target.value })} placeholder="2x/day" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Duration</label>
                <Input required value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} placeholder="5 days" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Notes</label>
                <Input value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Optional notes" />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={cancelForm}>Cancel</Button>
              <Button type="submit">{editingId ? 'Save Changes' : 'Save Prescription'}</Button>
            </div>
          </form>
        )}

        {loading ? (
          <div className="text-center py-8 text-slate-500">Loading record...</div>
        ) : (
          <>
            <div>
              <h5 className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                <Pill className="w-3.5 h-3.5" /> Prescriptions
              </h5>
              {!detail || detail.prescriptions.length === 0 ? (
                <div className="text-center py-8 bg-white rounded-xl border border-slate-100 shadow-sm">
                  <Pill className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                  <p className="text-slate-500 font-secondary text-sm">No prescriptions recorded for this patient.</p>
                </div>
              ) : (
                <ul className="glass-panel rounded-2xl shadow-soft border-0 divide-y divide-slate-100/70 overflow-hidden">
                  {detail.prescriptions.map(p => (
                    <li key={p.id} className="p-4 flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-bold text-slate-900">{p.drug_name}</p>
                        <p className="text-xs text-slate-500 font-secondary mt-0.5">{p.dosage} · {p.frequency} · {p.duration}</p>
                        <p className="text-xs text-slate-400 font-secondary mt-1">{bookingLabel(p.booking_id)}</p>
                        {p.notes && <p className="text-xs text-slate-400 font-secondary mt-1 italic">{p.notes}</p>}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button type="button" onClick={() => startEdit(p)} className="text-(--primary-plum) hover:text-plum-800 transition-colors" title="Edit">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button type="button" onClick={() => handleDelete(p.id)} className="text-red-500 hover:text-red-700 transition-colors" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <h5 className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                <CalendarDays className="w-3.5 h-3.5" /> Visit History
              </h5>
              {!detail || detail.bookings.length === 0 ? (
                <p className="text-sm text-slate-400 font-secondary">No visits recorded.</p>
              ) : (
                <ul className="glass-panel rounded-2xl shadow-soft border-0 divide-y divide-slate-100/70 overflow-hidden">
                  {detail.bookings.map(b => (
                    <li key={b.id} className="p-3 flex items-center justify-between gap-3 text-sm">
                      <span className="text-slate-700 font-secondary">{b.booking_date} · {b.booking_time?.slice(0, 5)} · #{b.booking_code}</span>
                      <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 capitalize">{b.status.replace('_', ' ')}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}
