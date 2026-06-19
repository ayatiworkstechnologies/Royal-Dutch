"use client";

import React, { useEffect, useState } from 'react';
import { useCustomerAuth } from '@/hooks/useCustomerAuth';
import api from '@/lib/api';
import { Receipt, Download, FileText, Calendar, DollarSign, CreditCard } from 'lucide-react';
import { format, parseISO } from 'date-fns';

export default function CustomerInvoicesPage() {
  const { user } = useCustomerAuth();
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await api.get('/api/account/invoices');
        setInvoices(res.data);
      } catch (err) {
        console.error("Failed to load invoices", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoices();
  }, []);

  const handleDownload = async (invoiceId: number, invoiceNumber: string) => {
    try {
      const res = await api.get(`/api/account/invoices/${invoiceId}/pdf`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Invoice-${invoiceNumber}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    } catch (err) {
      console.error("Failed to download invoice pdf", err);
      alert("Failed to download invoice. Please try again.");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100/80 text-green-800 border border-green-200">Paid</span>;
      case 'unpaid':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100/80 text-red-800 border border-red-200">Unpaid</span>;
      case 'refunded':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100/80 text-gray-800 border border-gray-200">Refunded</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100/80 text-yellow-800 border border-yellow-200">{status}</span>;
    }
  };

  if (!user) return null;

  const totalInvoices = invoices.length;
  const paidCount = invoices.filter(inv => inv.status === 'paid').length;
  const unpaidCount = invoices.filter(inv => inv.status === 'unpaid').length;

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-10">
      {/* Header aligned with dashboard */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 font-primary tracking-tight">Invoices</h1>
          <p className="text-slate-500 text-sm mt-1.5 font-secondary flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {format(new Date(), 'EEEE, MMMM d, yyyy')}
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
              <Receipt className="h-5 w-5 text-(--primary-gold)" />
              <span className="text-xs font-semibold text-(--primary-gold) uppercase tracking-widest font-secondary">Financial Overview</span>
            </div>
            <p className="text-6xl font-bold font-primary mb-2 tracking-tight">{loading ? '—' : totalInvoices}</p>
            <p className="text-white/70 text-sm font-secondary">Total invoices generated</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 w-full md:w-auto">
            <MiniStat label="Unpaid" value={unpaidCount} color="text-red-400" />
            <MiniStat label="Paid" value={paidCount} color="text-green-400" />
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard title="Total Statements" value={loading ? '—' : totalInvoices} icon={<FileText className="h-5 w-5 text-slate-500" />} />
        <StatCard title="Outstanding" value={loading ? '—' : unpaidCount} icon={<DollarSign className="h-5 w-5 text-red-500" />} />
        <StatCard title="Settled" value={loading ? '—' : paidCount} icon={<CreditCard className="h-5 w-5 text-green-500" />} highlight={true} />
      </div>

      {/* List */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 font-secondary flex items-center gap-2">
           <span className="w-8 h-px bg-slate-300"></span> Billing Statements
        </h2>
        
        {invoices.length === 0 && !loading ? (
          <div className="glass-panel p-12 text-center rounded-3xl shadow-soft">
            <Receipt className="mx-auto h-12 w-12 text-slate-300 mb-4" />
            <h3 className="text-lg font-medium text-slate-800 mb-1">No invoices found</h3>
            <p className="text-slate-500">You don't have any billing statements yet.</p>
          </div>
        ) : (
          <div className="glass-panel shadow-soft rounded-3xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200/60">
                <thead className="bg-slate-50/50">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest font-secondary">
                      Invoice
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest font-secondary">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest font-secondary">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest font-secondary">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-widest font-secondary">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white/20 divide-y divide-slate-100/60">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-slate-500 font-secondary">Loading invoices...</td>
                    </tr>
                  ) : (
                    invoices.map((invoice) => (
                      <tr key={invoice.id} className="hover:bg-white/60 transition-colors group">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="bg-slate-100 p-2 rounded-lg mr-3 group-hover:bg-(--primary-plum)/10 transition-colors">
                              <FileText className="flex-shrink-0 h-4 w-4 text-slate-500 group-hover:text-(--primary-plum) transition-colors" />
                            </div>
                            <div className="text-sm font-bold text-slate-800 font-mono tracking-tight">
                              {invoice.invoice_number}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-slate-500 font-secondary">
                            {format(parseISO(invoice.created_at), 'MMM d, yyyy')}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-bold text-(--primary-gold-dark) bg-(--primary-gold)/10 px-3 py-1 rounded-md inline-block">
                            {invoice.currency} {parseFloat(invoice.total_amount).toFixed(2)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(invoice.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleDownload(invoice.id, invoice.invoice_number)}
                            className="inline-flex items-center justify-center px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-(--primary-plum) hover:border-(--primary-plum)/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-(--primary-plum) shadow-sm transition-all"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            PDF
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
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
    <div className={`glass-panel rounded-2xl hover-lift transition-all duration-300 relative overflow-hidden ${highlight ? 'border-(--primary-gold)/30 bg-white/90' : 'bg-white/80'}`}>
      {highlight && <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-(--primary-gold) to-(--primary-plum)"></div>}
      <div className="p-5 md:p-6">
        <div className="flex items-center gap-4">
          <div className={`shrink-0 rounded-2xl p-3 border shadow-sm ${highlight ? 'bg-(--primary-gold)/10 border-(--primary-gold)/20' : 'bg-white border-slate-100'}`}>
            {icon}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-500 font-secondary uppercase tracking-wider truncate mb-1">{title}</p>
            <p className={`font-bold font-primary truncate text-2xl md:text-3xl ${highlight ? 'text-[#B48F57]' : 'text-slate-900'}`}>
              {value}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
