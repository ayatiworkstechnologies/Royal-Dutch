"use client";

import React, { useEffect, useState } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import api from '@/lib/api';
import { 
  Calendar, 
  CheckCircle, 
  Clock, 
  CheckSquare, 
  DollarSign, 
  TrendingUp,
  CreditCard,
  RefreshCcw
} from 'lucide-react';

interface DashboardData {
  total_bookings: number;
  pending_bookings: number;
  confirmed_bookings: number;
  completed_bookings: number;
  invoice_revenue: number;
  collected_revenue: number;
  refunded_revenue: number;
  net_revenue: number;
}

export default function AdminDashboardPage() {
  const { user } = useAdminAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/v1/dashboard');
      setData(response.data);
    } catch (err: any) {
      setError('Failed to load dashboard data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchDashboard();
    }
  }, [user]);

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900 font-primary tracking-tight">Dashboard</h1>
        <button 
          onClick={fetchDashboard}
          className="p-2.5 text-slate-500 hover:text-[var(--primary-gold)] hover:bg-[var(--primary-gold)]/10 rounded-full transition-all hover-lift"
        >
          <RefreshCcw className={`h-5 w-5 ${loading ? 'animate-spin text-[var(--primary-gold)]' : ''}`} />
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md">
          {error}
        </div>
      )}

      {data && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          
          <DashboardCard 
            title="Total Bookings" 
            value={data.total_bookings} 
            icon={<Calendar className="h-6 w-6 text-blue-600" />} 
          />
          <DashboardCard 
            title="Pending Bookings" 
            value={data.pending_bookings} 
            icon={<Clock className="h-6 w-6 text-yellow-600" />} 
          />
          <DashboardCard 
            title="Confirmed Bookings" 
            value={data.confirmed_bookings} 
            icon={<CheckCircle className="h-6 w-6 text-green-600" />} 
          />
          <DashboardCard 
            title="Completed Bookings" 
            value={data.completed_bookings} 
            icon={<CheckSquare className="h-6 w-6 text-indigo-600" />} 
          />
          
          <DashboardCard 
            title="Invoice Revenue" 
            value={`$${data.invoice_revenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`} 
            icon={<FileTextIcon className="h-6 w-6 text-purple-600" />} 
          />
          <DashboardCard 
            title="Collected Revenue" 
            value={`$${data.collected_revenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`} 
            icon={<DollarSign className="h-6 w-6 text-emerald-600" />} 
          />
          <DashboardCard 
            title="Refunded Revenue" 
            value={`$${data.refunded_revenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`} 
            icon={<CreditCard className="h-6 w-6 text-red-600" />} 
          />
          <DashboardCard 
            title="Net Revenue" 
            value={`$${data.net_revenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`} 
            icon={<TrendingUp className="h-6 w-6 text-[#B48F57]" />} 
          />
        </div>
      )}
    </div>
  );
}

function DashboardCard({ title, value, icon }: { title: string, value: string | number, icon: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-slate-900/5 hover-lift transition-all">
      <div className="p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0 bg-slate-50 rounded-xl p-3 shadow-sm border border-slate-100">
            {icon}
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="truncate text-sm font-medium text-slate-500 font-secondary">{title}</dt>
              <dd className="mt-2 text-3xl font-bold tracking-tight text-slate-900 font-primary">{value}</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

// Simple icon for FileText as it's not imported at the top
function FileTextIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <line x1="10" x2="8" y1="9" y2="9" />
    </svg>
  )
}
