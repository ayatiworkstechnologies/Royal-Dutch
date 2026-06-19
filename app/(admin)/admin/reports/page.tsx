"use client";

import React, { useEffect, useState } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import api from '@/lib/api';
import { BarChart3, TrendingUp, Users, DollarSign, Activity, FileText } from 'lucide-react';

interface ReportsSummary {
  date_from: string | null;
  date_to: string | null;
  bookings_by_status: Record<string, number>;
  revenue: {
    invoice_revenue: number;
    collected_revenue: number;
    refunded_revenue: number;
    net_revenue: number;
  };
  top_services: { service: string; count: number }[];
  new_patients: number;
}

export default function AdminReportsPage() {
  const { user } = useAdminAuth();
  const [summary, setSummary] = useState<ReportsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Quick filters
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const fetchReports = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (dateFrom) params.append('date_from', dateFrom);
      if (dateTo) params.append('date_to', dateTo);

      // Fetch summary
      const sumRes = await api.get(`/api/reports/summary?${params.toString()}`);
      setSummary(sumRes.data);
    } catch (error) {
      console.error('Failed to fetch reports', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchReports();
    }
  }, [user, dateFrom, dateTo]);

  if (loading && !summary) {
    return <div className="p-12 text-center text-slate-500 font-secondary">Loading advanced analytics...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-primary tracking-tight flex items-center gap-2">
            <BarChart3 className="w-8 h-8 text-[var(--primary-plum)]" />
            Reports & Analytics
          </h1>
          <p className="text-slate-500 mt-1 font-secondary text-sm">Comprehensive performance and financial metrics.</p>
        </div>
        
        <div className="flex space-x-3 bg-white p-2 rounded-xl shadow-sm border border-slate-100">
          <div className="flex flex-col">
            <label className="text-[10px] uppercase font-bold text-slate-400 px-2">From</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="border-0 focus:ring-0 text-sm text-slate-700 bg-transparent py-1"
            />
          </div>
          <div className="w-px bg-slate-200"></div>
          <div className="flex flex-col">
            <label className="text-[10px] uppercase font-bold text-slate-400 px-2">To</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="border-0 focus:ring-0 text-sm text-slate-700 bg-transparent py-1"
            />
          </div>
        </div>
      </div>

      {summary && (
        <div className="space-y-6">
          {/* Top Level KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-6 shadow-soft border-t-4 border-[var(--primary-plum)]">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-slate-500 font-secondary uppercase tracking-wider">Net Revenue</p>
                  <h3 className="text-3xl font-bold text-slate-900 mt-2 font-primary">AED {summary.revenue.net_revenue.toLocaleString(undefined, {minimumFractionDigits: 2})}</h3>
                </div>
                <div className="p-3 bg-[var(--primary-plum)]/10 rounded-xl">
                  <DollarSign className="w-6 h-6 text-[var(--primary-plum)]" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-soft border-t-4 border-[var(--primary-gold)]">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-slate-500 font-secondary uppercase tracking-wider">Collected Rev</p>
                  <h3 className="text-3xl font-bold text-slate-900 mt-2 font-primary">AED {summary.revenue.collected_revenue.toLocaleString(undefined, {minimumFractionDigits: 2})}</h3>
                </div>
                <div className="p-3 bg-[var(--primary-gold)]/10 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-[var(--primary-gold)]" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-soft border-t-4 border-emerald-500">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-slate-500 font-secondary uppercase tracking-wider">Completed Bookings</p>
                  <h3 className="text-3xl font-bold text-slate-900 mt-2 font-primary">{summary.bookings_by_status.completed || 0}</h3>
                </div>
                <div className="p-3 bg-emerald-100 rounded-xl">
                  <Activity className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-soft border-t-4 border-blue-500">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-slate-500 font-secondary uppercase tracking-wider">New Patients</p>
                  <h3 className="text-3xl font-bold text-slate-900 mt-2 font-primary">{summary.new_patients}</h3>
                </div>
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Detailed Revenue Breakdown */}
            <div className="bg-white rounded-2xl shadow-soft p-6">
              <h3 className="text-lg font-bold text-slate-900 font-primary mb-4 border-b pb-2">Revenue Breakdown</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 font-secondary">Invoiced Amount</span>
                  <span className="font-semibold text-slate-900">AED {summary.revenue.invoice_revenue.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 font-secondary">Collected Payments</span>
                  <span className="font-semibold text-emerald-600">AED {summary.revenue.collected_revenue.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 font-secondary">Refunds Processed</span>
                  <span className="font-semibold text-red-600">AED {summary.revenue.refunded_revenue.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                </div>
                <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                  <span className="font-bold text-slate-900">Net Revenue</span>
                  <span className="font-bold text-xl text-[var(--primary-plum)]">AED {summary.revenue.net_revenue.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                </div>
              </div>
            </div>

            {/* Top Services */}
            <div className="bg-white rounded-2xl shadow-soft p-6">
              <h3 className="text-lg font-bold text-slate-900 font-primary mb-4 border-b pb-2">Top Performing Services</h3>
              {summary.top_services.length === 0 ? (
                <p className="text-slate-500 italic">No services booked in this period.</p>
              ) : (
                <div className="space-y-3">
                  {summary.top_services.map((svc, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                          {idx + 1}
                        </span>
                        <span className="text-sm font-medium text-slate-800">{svc.service}</span>
                      </div>
                      <span className="text-sm font-bold text-[var(--primary-plum)] bg-[var(--primary-plum)]/10 px-3 py-1 rounded-full">
                        {svc.count} Bookings
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
