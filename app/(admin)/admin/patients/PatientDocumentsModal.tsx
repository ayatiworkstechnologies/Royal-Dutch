import React, { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Trash2, FileText, ExternalLink, Plus } from 'lucide-react';

interface Patient {
  id: number;
  full_name: string;
}

interface PatientDocument {
  id: number;
  patient_id: number;
  title: string;
  document_type: string | null;
  file_name: string;
  external_url: string | null;
  created_at: string;
}

interface PatientDocumentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: Patient | null;
}

export function PatientDocumentsModal({ isOpen, onClose, patient }: PatientDocumentsModalProps) {
  const [documents, setDocuments] = useState<PatientDocument[]>([]);
  const [loading, setLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    document_type: 'medical_record',
    file_name: '',
    external_url: ''
  });

  const fetchDocuments = async () => {
    if (!patient) return;
    setLoading(true);
    try {
      const response = await api.get(`/api/v1/patients/${patient.id}/documents`);
      setDocuments(response.data);
    } catch (error) {
      console.error('Failed to fetch documents', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && patient) {
      fetchDocuments();
      setIsAdding(false);
    }
  }, [isOpen, patient]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patient) return;
    try {
      await api.post(`/api/v1/patients/${patient.id}/documents`, formData);
      setFormData({ title: '', document_type: 'medical_record', file_name: '', external_url: '' });
      setIsAdding(false);
      fetchDocuments();
    } catch (error: any) {
      console.error('Failed to add document', error);
      alert(error.response?.data?.detail || 'An error occurred while adding the document');
    }
  };

  const handleDelete = async (docId: number) => {
    if (!patient) return;
    if (window.confirm('Are you sure you want to delete this document record?')) {
      try {
        await api.delete(`/api/v1/patients/${patient.id}/documents/${docId}`);
        fetchDocuments();
      } catch (error) {
        console.error('Failed to delete document', error);
      }
    }
  };

  if (!patient) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Medical Documents: ${patient.full_name}`} maxWidth="2xl">
      <div className="space-y-6">
        
        {!isAdding ? (
          <div className="flex justify-end">
            <Button onClick={() => setIsAdding(true)} className="flex items-center gap-2 text-sm py-1.5 px-3">
              <Plus className="w-4 h-4" /> Add Document Link
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
            <h4 className="font-bold text-slate-900 font-primary">Add New Document Record</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Title</label>
                <Input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g. Blood Test Results" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Document Type</label>
                <select 
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-[var(--primary-plum)] focus:border-[var(--primary-plum)] sm:text-sm"
                  value={formData.document_type}
                  onChange={e => setFormData({...formData, document_type: e.target.value})}
                >
                  <option value="medical_record">Medical Record</option>
                  <option value="prescription">Prescription</option>
                  <option value="consent_form">Consent Form</option>
                  <option value="id_document">ID Document</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">File Name</label>
                <Input required value={formData.file_name} onChange={e => setFormData({...formData, file_name: e.target.value})} placeholder="blood_test_2026.pdf" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">External Link (Drive / Dropbox)</label>
                <Input required type="url" value={formData.external_url} onChange={e => setFormData({...formData, external_url: e.target.value})} placeholder="https://..." />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
              <Button type="submit">Save Document Record</Button>
            </div>
          </form>
        )}

        {loading ? (
          <div className="text-center py-8 text-slate-500">Loading documents...</div>
        ) : documents.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-100 shadow-sm">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-secondary">No medical documents found for this patient.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase">Document</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase">Date Added</th>
                  <th className="px-4 py-3 text-right text-xs font-bold text-slate-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {documents.map(doc => (
                  <tr key={doc.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-[var(--primary-plum)]/10 rounded-lg">
                          <FileText className="w-4 h-4 text-[var(--primary-plum)]" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{doc.title}</p>
                          <p className="text-xs text-slate-500">{doc.file_name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full capitalize">
                        {(doc.document_type || 'other').replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-500 font-secondary">
                      {new Date(doc.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right space-x-3">
                      {doc.external_url && (
                        <a 
                          href={doc.external_url} 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-[var(--primary-plum)] hover:text-plum-800 transition-colors inline-block"
                          title="Open Document"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      <button 
                        onClick={() => handleDelete(doc.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                        title="Delete Record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Modal>
  );
}
