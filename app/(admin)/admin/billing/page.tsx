"use client";

import React, { useEffect, useState } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import api from '@/lib/api';
import { Plus, Edit2, Trash2, Search, Download, Mail, Eye, DollarSign, FileText, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { format } from 'date-fns';

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
      const response = await api.get('/api/billing?limit=100');
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
    setCurrentPage(1);
  }, [search]);

  // Dashboard Stats Logic
  const totalInvoices = invoices.length;
  const totalRevenue = invoices.reduce((acc, inv) => acc + (inv.paid_amount || 0), 0);
  const pendingRevenue = invoices.reduce((acc, inv) => acc + (inv.balance_due || 0), 0);
  const paidCount = invoices.filter(inv => inv.status === 'paid').length;
  const draftCount = invoices.filter(inv => inv.status === 'draft').length;
  const unpaidCount = invoices.filter(inv => inv.balance_due > 0 && inv.status !== 'draft' && inv.status !== 'cancelled').length;

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 font-primary tracking-tight">Billing & Finance</h1>
          <p className="text-slate-500 text-sm mt-1.5 font-secondary flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Manage invoices, payments, and revenue
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
              <DollarSign className="h-5 w-5 text-(--primary-gold)" />
              <span className="text-xs font-semibold text-(--primary-gold) uppercase tracking-widest font-secondary">Financial Overview</span>
            </div>
            <p className="text-5xl md:text-6xl font-bold font-primary mb-2 tracking-tight">
              {loading ? '—' : `AED ${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            </p>
            <p className="text-white/70 text-sm font-secondary">Total collected revenue</p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:gap-4 w-full md:w-auto">
            <MiniStat label="Pending Revenue" value={`AED ${pendingRevenue.toLocaleString()}`} color="text-yellow-400" isCurrency />
            <MiniStat label="Total Invoices" value={totalInvoices.toString()} color="text-blue-400" />
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard title="Paid Invoices" value={loading ? '—' : paidCount} icon={<CheckCircle className="h-5 w-5 text-green-500" />} />
        <StatCard title="Awaiting Payment" value={loading ? '—' : unpaidCount} icon={<Clock className="h-5 w-5 text-yellow-500" />} highlight={unpaidCount > 0} />
        <StatCard title="Drafts" value={loading ? '—' : draftCount} icon={<FileText className="h-5 w-5 text-slate-500" />} />
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 font-secondary flex items-center gap-2">
          <span className="w-8 h-px bg-slate-300"></span> Invoice Ledger
        </h2>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="glass-panel p-2 rounded-2xl shadow-sm flex items-center gap-2 flex-1 sm:w-80 border-0">
            <Search className="w-4 h-4 text-slate-400 ml-2" />
            <input
              type="text"
              placeholder="Search invoice #, patient, or status..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent border-none focus:ring-0 outline-none text-sm text-slate-700"
            />
          </div>
          <Button onClick={() => handleOpenModal()} className="rounded-xl flex items-center gap-2 shadow-sm whitespace-nowrap">
            <Plus className="w-4 h-4" /> Create Invoice
          </Button>
        </div>
      </div>

      <div className="glass-panel shadow-soft rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest font-secondary">Invoice / Date</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest font-secondary">Client Details</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest font-secondary">Amount & Balance</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest font-secondary">Status</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-widest font-secondary">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white/20 divide-y divide-slate-100/60">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500 font-secondary">Loading invoices...</td>
                </tr>
              ) : filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500 font-secondary">No invoices found</td>
                </tr>
              ) : (
                paginatedInvoices.map((invoice, index) => (
                  <tr key={invoice.id} className="hover:bg-white/60 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                          <FileText className="w-4 h-4 text-slate-400" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-800">{invoice.invoice_number}</div>
                          <div className="text-xs text-slate-500 font-secondary">{invoice.issue_date}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-slate-800">{invoice.patient?.full_name || patients.find(p => p.id === invoice.patient_id)?.full_name || 'N/A'}</div>
                      {invoice.booking_id && <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider bg-(--primary-plum)/5 text-(--primary-plum) px-2 py-0.5 rounded-full">Booking #{invoice.booking_id}</span>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-slate-800">{Number(invoice.total_amount || 0).toFixed(2)} {invoice.currency}</div>
                      <div className={`text-xs font-secondary font-bold ${Number(invoice.balance_due || 0) > 0 ? 'text-red-500' : 'text-green-600'}`}>
                        Due: {Number(invoice.balance_due || 0).toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-[10px] uppercase tracking-widest font-bold rounded-full 
                        ${invoice.status === 'paid' ? 'bg-green-100/80 text-green-800' : 
                          invoice.status === 'draft' ? 'bg-slate-100 text-slate-600' : 
                          invoice.status === 'cancelled' ? 'bg-red-100/80 text-red-800' : 
                          'bg-yellow-100/80 text-yellow-800'}`}>
                        {invoice.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2 opacity-80 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleDownloadPDF(invoice.id, invoice.invoice_number)} className="text-slate-500 hover:text-(--primary-gold) bg-slate-50 hover:bg-(--primary-gold)/10 p-2 rounded-lg transition-colors" title="Download PDF">
                        <Download className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleQueueEmail(invoice.id)} className="text-slate-500 hover:text-blue-600 bg-slate-50 hover:bg-blue-50 p-2 rounded-lg transition-colors" title="Email Invoice">
                        <Mail className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleOpenModal(invoice)} className="text-(--primary-plum) hover:text-white hover:bg-(--primary-plum) bg-(--primary-plum)/10 p-2 rounded-lg transition-colors" title="Edit Status">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(invoice.id)} className="text-red-600 hover:text-red-900 bg-red-50 p-2 rounded-lg transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4" />
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
          <div className="bg-white/40 px-4 py-3 border-t border-slate-200/50 flex items-center justify-between sm:px-6">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-slate-700 font-secondary">
                  Showing <span className="font-bold text-slate-900">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-bold text-slate-900">{Math.min(currentPage * itemsPerPage, filteredInvoices.length)}</span> of <span className="font-bold text-slate-900">{filteredInvoices.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-xl shadow-sm -space-x-px overflow-hidden" aria-label="Pagination">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-3 py-2 border border-slate-200/60 bg-white/60 text-sm font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-bold transition-colors ${
                        currentPage === i + 1
                          ? 'z-10 bg-(--primary-plum) border-(--primary-plum) text-white shadow-sm'
                          : 'bg-white/60 border-slate-200/60 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-3 py-2 border border-slate-200/60 bg-white/60 text-sm font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
        <form onSubmit={handleSubmit} className="space-y-5">
          {!editingInvoice && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1 font-secondary">Patient *</label>
                  <select
                    className="w-full rounded-xl border border-slate-200/60 bg-white/60 px-4 py-2.5 text-slate-700 text-sm focus:border-(--primary-gold) focus:ring-1 focus:ring-(--primary-gold) outline-none transition-all shadow-sm"
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

              <div className="border-t border-slate-100 pt-4">
                <h3 className="text-sm font-bold text-slate-800 mb-3 font-secondary uppercase tracking-wider">Invoice Items</h3>
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
                        className="mb-2 p-3 text-red-500 hover:text-red-700 bg-red-50 rounded-xl disabled:opacity-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" size="sm" onClick={handleAddItem} className="rounded-xl border-dashed mt-2">
                    <Plus className="w-4 h-4 mr-1" /> Add Item
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4 mt-2">
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
            <label className="block text-sm font-semibold text-slate-700 mb-1 font-secondary">Status</label>
            <select
              className="w-full rounded-xl border border-slate-200/60 bg-white/60 px-4 py-2.5 text-slate-700 text-sm focus:border-(--primary-gold) focus:ring-1 focus:ring-(--primary-gold) outline-none transition-all shadow-sm"
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
            <label className="block text-sm font-semibold text-slate-700 mb-1 font-secondary">Notes (Optional)</label>
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
              {editingInvoice ? 'Save Changes' : 'Create Invoice'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

function MiniStat({ label, value, color, isCurrency = false }: { label: string; value: string | number; color: string, isCurrency?: boolean }) {
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-center hover:bg-white/15 transition-colors">
      <p className={`text-2xl md:text-3xl font-bold font-primary ${color} mb-1 drop-shadow-sm truncate`}>{value}</p>
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
