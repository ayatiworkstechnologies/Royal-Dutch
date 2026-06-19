"use client";

import React, { useEffect, useState } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import api from '@/lib/api';
import { useAlert } from '@/context/AlertContext';
import { Plus, Edit2, Trash2, Search, Mail } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';

interface Payment {
  id: number;
  booking_id: number | null;
  invoice_id: number | null;
  amount: number;
  refund_amount: number;
  payment_method: string;
  payment_status: string;
  transaction_id: string | null;
  created_at: string;
}

interface Invoice {
  id: number;
  invoice_number: string;
  balance_due: number;
}

export default function AdminPaymentsPage() {
  const { user } = useAdminAuth();
  const { success: toastSuccess, error: toastError, warning: toastWarning, info: toastInfo, confirm: confirmDialog } = useAlert();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPayment, setEditingPayment] = useState<Payment | null>(null);
  
  const [formData, setFormData] = useState({
    invoice_id: '',
    booking_id: '',
    amount: '',
    refund_amount: '0',
    payment_method: 'pay_at_clinic',
    payment_status: 'paid',
    transaction_id: ''
  });

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/payments?limit=100');
      setPayments(response.data.items || response.data);
    } catch (error) {
      console.error('Failed to fetch payments', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchInvoices = async () => {
    try {
      const response = await api.get('/api/billing?limit=100');
      // Only fetch unpaid or partially paid for dropdown
      const activeInvoices = (response.data.items || response.data).filter((i: any) => i.balance_due > 0);
      setInvoices(activeInvoices);
    } catch (error) {
      console.error('Failed to fetch invoices', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchPayments();
      fetchInvoices();
    }
  }, [user]);

  const handleOpenModal = (payment?: Payment) => {
    if (payment) {
      setEditingPayment(payment);
      setFormData({
        invoice_id: payment.invoice_id?.toString() || '',
        booking_id: payment.booking_id?.toString() || '',
        amount: payment.amount.toString(),
        refund_amount: payment.refund_amount.toString(),
        payment_method: payment.payment_method,
        payment_status: payment.payment_status,
        transaction_id: payment.transaction_id || ''
      });
    } else {
      setEditingPayment(null);
      setFormData({
        invoice_id: '',
        booking_id: '',
        amount: '',
        refund_amount: '0',
        payment_method: 'pay_at_clinic',
        payment_status: 'paid',
        transaction_id: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleInvoiceSelect = (invoiceId: string) => {
    setFormData({ ...formData, invoice_id: invoiceId });
    const selected = invoices.find(i => i.id.toString() === invoiceId);
    if (selected && !formData.amount) {
      setFormData(prev => ({ ...prev, amount: selected.balance_due.toString() }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        invoice_id: formData.invoice_id ? parseInt(formData.invoice_id, 10) : null,
        booking_id: formData.booking_id ? parseInt(formData.booking_id, 10) : null,
        amount: parseFloat(formData.amount || '0'),
        refund_amount: parseFloat(formData.refund_amount || '0'),
      };

      if (editingPayment) {
        await api.patch(`/api/payments/${editingPayment.id}`, payload);
      } else {
        await api.post('/api/payments', payload);
      }
      setIsModalOpen(false);
      fetchPayments();
      fetchInvoices(); // Refresh balances
    } catch (error: any) {
      console.error('Failed to save payment', error);
      toastError('Error', error.response?.data?.detail || 'An error occurred');
    }
  };

  const handleDelete = async (id: number) => {
    if (!(await confirmDialog({ title: 'Delete Payment', message: 'This may affect invoice balances. This action cannot be undone.', danger: true, confirmLabel: 'Delete' }))) return;
    try {
      await api.delete(`/api/payments/${id}`);
      fetchPayments();
      fetchInvoices();
    } catch (error) {
      console.error('Failed to delete payment', error);
      toastError('Error', 'Failed to delete payment.');
    }
  };

  const handleQueueEmail = async (id: number) => {
    try {
      await api.post(`/api/payments/${id}/mail/payment`);
      toastSuccess('Email Queued', 'Payment receipt has been queued for delivery.');
    } catch (error) {
      console.error('Failed to queue email', error);
      toastError('Error', 'Failed to queue email.');
    }
  };

  const filteredPayments = payments.filter(p => 
    (p.transaction_id && p.transaction_id.toLowerCase().includes(search.toLowerCase())) ||
    p.payment_method.toLowerCase().includes(search.toLowerCase()) ||
    p.payment_status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h1 className="text-4xl font-bold text-slate-900 font-primary tracking-tight mb-2">Payments</h1>
        <Button onClick={() => handleOpenModal()} className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Record Payment
        </Button>
      </div>

      <div className="glass-panel p-6 rounded-3xl shadow-soft flex items-center gap-2">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search by transaction ID, method, or status..."
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
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date & TXN</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Linked To</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Method & Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white/20 divide-y divide-slate-100/60">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">Loading payments...</td>
                </tr>
              ) : filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">No payments found</td>
                </tr>
              ) : (
                filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-white/60 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-800">{new Date(payment.created_at).toLocaleString()}</div>
                      <div className="text-xs text-slate-500 font-mono mt-1">{payment.transaction_id || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800">
                      {payment.invoice_id && <div>Inv #{payment.invoice_id}</div>}
                      {payment.booking_id && <div>Booking #{payment.booking_id}</div>}
                      {!payment.invoice_id && !payment.booking_id && <span className="text-gray-400">Unlinked</span>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-slate-800">{Number(payment.amount || 0).toFixed(2)}</div>
                      {Number(payment.refund_amount || 0) > 0 && (
                        <div className="text-xs text-red-500">Refunded: {Number(payment.refund_amount || 0).toFixed(2)}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-800 capitalize">{payment.payment_method.replace(/_/g, ' ')}</div>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium capitalize mt-1
                        ${payment.payment_status === 'paid' ? 'bg-green-100/80 text-green-800 border border-green-200' : 
                          payment.payment_status === 'refunded' ? 'bg-purple-100/80 text-purple-800 border border-purple-200' : 
                          'bg-yellow-100/80 text-yellow-800 border border-yellow-200'}`}>
                        {payment.payment_status.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <button onClick={() => handleQueueEmail(payment.id)} className="text-slate-500 hover:text-blue-600" title="Email Receipt">
                        <Mail className="w-5 h-5" />
                      </button>
                      <button onClick={() => handleOpenModal(payment)} className="text-(--primary-plum) hover:text-(--primary-plum-light)" title="Edit">
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button onClick={() => handleDelete(payment.id)} className="text-red-600 hover:text-red-900" title="Delete">
                        <Trash2 className="w-5 h-5" />
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
        title={editingPayment ? 'Edit Payment' : 'Record New Payment'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Link Invoice</label>
              <select
                className="w-full rounded-md border-slate-200/50 bg-white/40 shadow-sm focus:border-(--primary-gold) focus:ring-(--primary-gold) sm:text-sm"
                value={formData.invoice_id}
                onChange={(e) => handleInvoiceSelect(e.target.value)}
              >
                <option value="">None</option>
                {invoices.map(inv => (
                  <option key={inv.id} value={inv.id}>{inv.invoice_number} (Due: {inv.balance_due})</option>
                ))}
              </select>
            </div>
            <Input
              id="booking_id"
              label="Link Booking ID"
              type="number"
              value={formData.booking_id}
              onChange={(e) => setFormData({ ...formData, booking_id: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              id="amount"
              label="Amount *"
              type="number"
              step="0.01"
              min="0"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              required
            />
            <Input
              id="refund_amount"
              label="Refund Amount"
              type="number"
              step="0.01"
              min="0"
              value={formData.refund_amount}
              onChange={(e) => setFormData({ ...formData, refund_amount: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Method *</label>
              <select
                className="w-full rounded-md border-slate-200/50 bg-white/40 shadow-sm focus:border-(--primary-gold) focus:ring-(--primary-gold) sm:text-sm"
                value={formData.payment_method}
                onChange={(e) => setFormData({ ...formData, payment_method: e.target.value })}
                required
              >
                <option value="pay_at_clinic">Pay At Clinic</option>
                <option value="online">Online</option>
                <option value="advance">Advance</option>
                <option value="full">Full</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
              <select
                className="w-full rounded-md border-slate-200/50 bg-white/40 shadow-sm focus:border-(--primary-gold) focus:ring-(--primary-gold) sm:text-sm"
                value={formData.payment_status}
                onChange={(e) => setFormData({ ...formData, payment_status: e.target.value })}
                required
              >
                <option value="unpaid">Unpaid</option>
                <option value="partially_paid">Partially Paid</option>
                <option value="paid">Paid</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>
          </div>

          <Input
            id="transaction_id"
            label="Transaction ID / Reference"
            value={formData.transaction_id}
            onChange={(e) => setFormData({ ...formData, transaction_id: e.target.value })}
          />

          <div className="pt-4 flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {editingPayment ? 'Save Changes' : 'Record Payment'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
