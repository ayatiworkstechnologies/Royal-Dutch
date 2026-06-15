"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { 
  LayoutDashboard, 
  CalendarCheck, 
  Users, 
  FolderTree, 
  Stethoscope, 
  UserSquare2, 
  Receipt, 
  CreditCard, 
  Mail, 
  FileText, 
  Bell, 
  Settings, 
  ShieldAlert,
  UserCog,
  LogOut,
  Menu,
  BarChart3
} from 'lucide-react';

const AdminSidebar = () => {
  const pathname = usePathname();
  const { user } = useAuth();
  
  if (pathname === '/admin/login') return null;

  const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Reports', href: '/admin/reports', icon: BarChart3 },
    { name: 'Bookings', href: '/admin/bookings', icon: CalendarCheck },
    { name: 'Patients', href: '/admin/patients', icon: Users },
    { name: 'Categories', href: '/admin/categories', icon: FolderTree },
    { name: 'Services', href: '/admin/services', icon: Stethoscope },
    { name: 'Staff', href: '/admin/staff', icon: UserSquare2 },
    { name: 'Billing', href: '/admin/billing', icon: Receipt },
    { name: 'Payments', href: '/admin/payments', icon: CreditCard },
    { name: 'Mail', href: '/admin/mail', icon: Mail },
    { name: 'Email Templates', href: '/admin/email-templates', icon: FileText },
    { name: 'Notifications', href: '/admin/notifications', icon: Bell },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  if (user?.role === 'super_admin') {
    navItems.push({ name: 'System Users', href: '/admin/users', icon: UserCog });
    navItems.push({ name: 'Audit Logs', href: '/admin/audit-logs', icon: ShieldAlert });
  }

  return (
    <div className="flex h-screen w-64 flex-col bg-[var(--admin-sidebar-bg)] text-[var(--admin-sidebar-fg)] shadow-2xl relative z-20 border-r border-[var(--primary-plum)]/10">
      <div className="flex h-16 items-center px-6 border-b border-[var(--primary-plum)]/10 bg-[var(--admin-sidebar-bg)]">
        <span className="text-xl font-bold text-[var(--primary-plum)] tracking-widest uppercase font-primary">RDMC Admin</span>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-4 py-3 text-sm font-medium transition-all rounded-r-full mr-2 ${
                  isActive 
                    ? 'bg-[var(--primary-plum)] text-white shadow-md' 
                    : 'text-[var(--admin-sidebar-fg)]/70 hover:bg-[var(--primary-plum)]/5 hover:text-[var(--primary-plum)]'
                }`}
              >
                <item.icon className={`mr-3 h-5 w-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-[var(--primary-gold)]' : 'text-[var(--primary-plum)]/60 group-hover:text-[var(--primary-plum)]'}`} aria-hidden="true" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    return <div className="min-h-screen bg-gray-50">{children}</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--background)] font-sans text-slate-900">
      <AdminSidebar />
      <div className="flex flex-1 flex-col overflow-hidden relative">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-slate-200/60 bg-white/70 backdrop-blur-xl px-6 shadow-sm">
          <div className="flex items-center">
            <button className="md:hidden text-slate-500 hover:text-[var(--primary-gold)] transition-colors">
              <Menu className="h-6 w-6" />
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3 text-right">
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-slate-900">{user?.first_name} {user?.last_name}</p>
                <p className="text-xs font-medium text-slate-500 capitalize">{user?.role?.replace('_', ' ')}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-[var(--primary-plum)]/10 border border-[var(--primary-plum)]/20 flex items-center justify-center">
                <span className="text-[var(--primary-plum)] font-bold text-lg">{user?.first_name?.[0] || 'A'}</span>
              </div>
            </div>
            <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>
            <button
              onClick={logout}
              className="flex items-center px-3 py-2 text-sm font-medium rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all"
              title="Sign Out"
            >
              <LogOut className="h-5 w-5 sm:mr-2" />
              <span className="hidden sm:block">Sign Out</span>
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
