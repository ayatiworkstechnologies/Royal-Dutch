"use client";

import React, { useEffect, useState } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import api from '@/lib/api';
import { Plus, Edit2, Trash2, Search, Download, Mail, Eye } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';

interface InvoiceItem {
  description: string;
  quantity: number;
  unit_price: number;
}

interface Invoice {
  id: number;
  invoice_number: string;
  booking_id: number | null;
  patient_id: number | null;
  issue_date: string;
  due_date: string;
  subtotal: number;
  discount_amount: number;
  tax_amount: number;
  total_amount: number;
  paid_amount: number;
  balance_due: number;
  currency: string;
  status: string;
  notes: string | null;
  patient?: {
    full_name: string;
  };
}

interface Patient {
  id: number;
  full_name: string;
  phone: string;
}

export default function AdminBillingPage() {
  const { user } = useAdminAuth();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);
  
  const [formData, setFormData] = useState({
    patient_id: '',
    issue_date: new Date().toISOString().split('T')[0],
    due_date: '',
    discount_amount: 0,
    tax_amount: 0,
    currency: 'AED',
    status: 'draft',
    notes: ''
  });

  const [items, setItems] = useState<InvoiceItem[]>([
    { description: '', quantity: 1, unit_price: 0 }
  ]);

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      // Fetching all for now without explicit pagination
      const response = await api.get('/api/billing?limit=100');
      // If backend returns paginated object { items: [...] } or list [...]
      setInvoices(response.data.items || response.data);
    } catch (error) {
      console.error('Failed to fetch invoices', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await api.get('/api/patients?limit=500');
      setPatients(response.data.items || response.data);
    } catch (error) {
      console.error('Failed to fetch patients', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchInvoices();
      fetchPatients();
    }
  }, [user]);

  const handleOpenModal = (invoice?: Invoice) => {
    if (invoice) {
      setEditingInvoice(invoice);
      setFormData({
        patient_id: invoice.patient_id?.toString() || '',
        issue_date: invoice.issue_date,
        due_date: invoice.due_date,
        discount_amount: invoice.discount_amount,
        tax_amount: invoice.tax_amount,
        currency: invoice.currency,
        status: invoice.status,
        notes: invoice.notes || ''
      });
      // In a real app we'd fetch items via GET /billing/{id} here.
      // But for update we mostly patch status/notes unless items are exposed.
      setItems([]); 
    } else {
      setEditingInvoice(null);
      setFormData({
        patient_id: '',
        issue_date: new Date().toISOString().split('T')[0],
        due_date: '',
        discount_amount: 0,
        tax_amount: 0,
        currency: 'AED',
        status: 'draft',
        notes: ''
      });
      setItems([{ description: '', quantity: 1, unit_price: 0 }]);
    }
    setIsModalOpen(true);
  };

  const handleAddItem = () => {
    setItems([...items, { description: '', quantity: 1, unit_price: 0 }]);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (index: number, field: keyof InvoiceItem, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        patient_id: formData.patient_id ? parseInt(formData.patient_id, 10) : null,
        discount_amount: parseFloat(formData.discount_amount.toString()),
        tax_amount: parseFloat(formData.tax_amount.toString()),
        items: items.map(item => ({
          ...item,
          quantity: parseInt(item.quantity.toString(), 10),
          unit_price: parseFloat(item.unit_price.toString())
        }))
      };

      if (editingInvoice) {
        // Can only patch some fields like status
        await api.patch(`/api/billing/${editingInvoice.id}`, { status: formData.status, notes: formData.notes });
      } else {
        await api.post('/api/billing', payload);
      }
      setIsModalOpen(false);
      fetchInvoices();
    } catch (error: any) {
      console.error('Failed to save invoice', error);
      alert(error.response?.data?.detail || 'An error occurred');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      try {
        await api.delete(`/api/billing/${id}`);
        fetchInvoices();
      } catch (error) {
        console.error('Failed to delete invoice', error);
        alert('Failed to delete invoice');
      }
    }
  };

  const handleDownloadPDF = async (id: number, number: string) => {
    try {
      const response = await api.get(`/api/billing/${id}/pdf`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Invoice_${number}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    } catch (error) {
      console.error('Failed to download invoice', error);
      alert('Failed to generate PDF');
    }
  };

  const handleQueueEmail = async (id: number) => {
    try {
      await api.post(`/api/billing/${id}/mail/invoice`);
      alert('Invoice email queued successfully!');
    } catch (error) {
      console.error('Failed to queue email', error);
      alert('Failed to queue email');
    }
  };

  const filteredInvoices = invoices.filter(i => {
    const patientName = i.patient?.full_name || patients.find(p => p.id === i.patient_id)?.full_name || '';
    return i.invoice_number.toLowerCase().includes(search.toLowerCase()) || 
      patientName.toLowerCase().includes(search.toLowerCase()) ||
      i.status.toLowerCase().includes(search.toLowerCase());
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);
  const paginatedInvoices = filteredInvoices.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => {
    setCurrentPage(1); // Reset page on search filter change
  }, [search]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h1 className="text-3xl font-bold text-slate-900 font-primary tracking-tight">Billing & Invoices</h1>
        <Button onClick={() => handleOpenModal()} className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Create Invoice
        </Button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm ring-1 ring-gray-900/5 flex items-center gap-2">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search by invoice number, patient name, or status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent border-none focus:ring-0 outline-none text-sm"
        />
      </div>

      <div className="bg-white shadow-soft ring-1 ring-slate-900/5 rounded-2xl overflow-hidden hover-lift transition-all">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider font-secondary">#</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider font-secondary">Invoice / Date</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider font-secondary">Client & Booking</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider font-secondary">Amount & Balance</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider font-secondary">Status</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider font-secondary">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500 font-secondary">Loading invoices...</td>
                </tr>
              ) : filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500 font-secondary">No invoices found</td>
                </tr>
              ) : (
                paginatedInvoices.map((invoice, index) => (
                  <tr key={invoice.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{invoice.invoice_number}</div>
                      <div className="text-xs text-gray-500">{invoice.issue_date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{invoice.patient?.full_name || patients.find(p => p.id === invoice.patient_id)?.full_name || 'N/A'}</div>
                      {invoice.booking_id && <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">Booking #{invoice.booking_id}</span>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{Number(invoice.total_amount || 0).toFixed(2)} {invoice.currency}</div>
                      <div className={`text-xs ${Number(invoice.balance_due || 0) > 0 ? 'text-red-500 font-semibold' : 'text-green-600'}`}>
                        Due: {Number(invoice.balance_due || 0).toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full capitalize 
                        ${invoice.status === 'paid' ? 'bg-green-100 text-green-800' : 
                          invoice.status === 'draft' ? 'bg-gray-100 text-gray-800' : 
                          invoice.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                          'bg-yellow-100 text-yellow-800'}`}>
                        {invoice.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <button onClick={() => handleDownloadPDF(invoice.id, invoice.invoice_number)} className="text-gray-500 hover:text-[#B48F57]" title="Download PDF">
                        <Download className="w-5 h-5" />
                      </button>
                      <button onClick={() => handleQueueEmail(invoice.id)} className="text-gray-500 hover:text-blue-600" title="Email Invoice">
                        <Mail className="w-5 h-5" />
                      </button>
                      <button onClick={() => handleOpenModal(invoice)} className="text-indigo-600 hover:text-indigo-900" title="Edit Status">
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button onClick={() => handleDelete(invoice.id)} className="text-red-600 hover:text-red-900" title="Delete">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="bg-white px-4 py-3 border-t border-slate-200 flex items-center justify-between sm:px-6">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-slate-700">
                  Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredInvoices.length)}</span> of <span className="font-medium">{filteredInvoices.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === i + 1
                          ? 'z-10 bg-[var(--primary-plum)]/10 border-[var(--primary-plum)] text-[var(--primary-plum)]'
                          : 'bg-white border-slate-300 text-slate-500 hover:bg-slate-50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingInvoice ? `Edit Invoice ${editingInvoice.invoice_number}` : 'Create Manual Invoice'}
        maxWidth={editingInvoice ? "md" : "2xl"}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {!editingInvoice && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Patient *</label>
                  <select
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#B48F57] focus:ring-[#B48F57] sm:text-sm"
                    value={formData.patient_id}
                    onChange={(e) => setFormData({ ...formData, patient_id: e.target.value })}
                    required
                  >
                    <option value="">Select Patient</option>
                    {patients.map(p => (
                      <option key={p.id} value={p.id}>{p.full_name} ({p.phone})</option>
                    ))}
                  </select>
                </div>
                <Input
                  id="currency"
                  label="Currency"
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  id="issue_date"
                  type="date"
                  label="Issue Date *"
                  value={formData.issue_date}
                  onChange={(e) => setFormData({ ...formData, issue_date: e.target.value })}
                  required
                />
                <Input
                  id="due_date"
                  type="date"
                  label="Due Date *"
                  value={formData.due_date}
                  onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                  required
                />
              </div>

              <div className="border-t pt-4">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Invoice Items</h3>
                <div className="space-y-3">
                  {items.map((item, index) => (
                    <div key={index} className="flex gap-3 items-end">
                      <div className="flex-1">
                        <Input
                          label={index === 0 ? "Description" : ""}
                          value={item.description}
                          onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                          required
                        />
                      </div>
                      <div className="w-24">
                        <Input
                          type="number"
                          label={index === 0 ? "Qty" : ""}
                          value={item.quantity}
                          min="1"
                          onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                          required
                        />
                      </div>
                      <div className="w-32">
                        <Input
                          type="number"
                          step="0.01"
                          label={index === 0 ? "Unit Price" : ""}
                          value={item.unit_price}
                          min="0"
                          onChange={(e) => handleItemChange(index, 'unit_price', e.target.value)}
                          required
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(index)}
                        disabled={items.length === 1}
                        className="mb-2 p-2 text-red-500 hover:text-red-700 disabled:opacity-50"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" size="sm" onClick={handleAddItem}>
                    + Add Item
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t pt-4">
                <Input
                  id="discount_amount"
                  type="number"
                  step="0.01"
                  label="Discount Amount"
                  value={formData.discount_amount}
                  onChange={(e) => setFormData({ ...formData, discount_amount: parseFloat(e.target.value) || 0 })}
                />
                <Input
                  id="tax_amount"
                  type="number"
                  step="0.01"
                  label="Tax Amount"
                  value={formData.tax_amount}
                  onChange={(e) => setFormData({ ...formData, tax_amount: parseFloat(e.target.value) || 0 })}
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#B48F57] focus:ring-[#B48F57] sm:text-sm"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="draft">Draft</option>
              <option value="issued">Issued</option>
              <option value="partially_paid">Partially Paid</option>
              <option value="paid">Paid</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
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
              {editingInvoice ? 'Save Changes' : 'Create Invoice'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
