"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import {
  LayoutDashboard,
  CalendarCheck,
  Receipt,
  UserCircle,
  LogOut,
  Menu,
} from 'lucide-react';

const NAV_ITEMS = [
  { name: 'Dashboard',   href: '/customer/dashboard', icon: LayoutDashboard },
  { name: 'My Profile',  href: '/customer/profile',   icon: UserCircle },
  { name: 'My Bookings', href: '/customer/bookings',  icon: CalendarCheck },
  { name: 'My Invoices', href: '/customer/invoices',  icon: Receipt },
];

const AUTH_PATHS = new Set(['/login', '/register', '/forgot-password']);

const CustomerSidebar = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  if (AUTH_PATHS.has(pathname)) return null;

  const initials = ((user?.full_name || user?.first_name || 'P')[0]).toUpperCase();

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-slate-200/70 bg-white shadow-[2px_0_12px_0_rgba(0,0,0,0.06)] z-20">
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b border-(--primary-plum)/10">
        <div>
          <p className="text-base font-extrabold text-(--primary-plum) tracking-widest uppercase leading-tight">
            RDMC
          </p>
          <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-[0.2em] leading-tight">
            Patient Portal
          </p>
        </div>
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto py-4">
        <p className="px-5 mb-2 text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">
          My Account
        </p>
        <nav className="space-y-0.5 px-3">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-(--primary-plum) text-white shadow-sm shadow-(--primary-plum)/20'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full bg-(--primary-gold)" />
                )}
                <item.icon
                  className={`h-4 w-4 shrink-0 transition-transform duration-150 group-hover:scale-110 ${
                    isActive ? 'text-(--primary-gold)' : 'text-slate-400 group-hover:text-slate-600'
                  }`}
                  aria-hidden="true"
                />
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User footer */}
      <div className="shrink-0 border-t border-slate-100 p-3">
        <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
          <div className="h-9 w-9 shrink-0 rounded-full bg-(--primary-plum)/10 border border-(--primary-plum)/20 flex items-center justify-center">
            <span className="text-(--primary-plum) text-sm font-bold">{initials}</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-800 leading-tight">
              {user?.full_name || user?.first_name || 'Patient'}
            </p>
            <p className="truncate text-[10px] text-slate-400 leading-tight mt-0.5">
              {user?.email}
            </p>
          </div>
          <button
            type="button"
            onClick={logout}
            title="Sign Out"
            className="shrink-0 flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useAuth();
  const isAuthPage = AUTH_PATHS.has(pathname);

  if (isAuthPage) {
    return <div className="min-h-screen bg-gray-50">{children}</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background font-sans text-slate-900">
      <CustomerSidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Topbar */}
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-slate-200/70 bg-white/80 backdrop-blur-xl px-6 shadow-sm">
          <div className="hidden md:flex items-center text-sm text-slate-500">
            <span className="font-medium text-slate-800 capitalize">
              {pathname.split('/').filter(Boolean).slice(1).join(' / ').replace(/-/g, ' ') || 'Dashboard'}
            </span>
          </div>
          <button
            type="button"
            className="md:hidden text-slate-500 hover:text-(--primary-plum) transition-colors"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-3 ml-auto">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-slate-900 leading-tight">
                {user?.full_name || user?.first_name || 'Patient'}
              </p>
              <p className="text-[10px] text-slate-400 uppercase tracking-wide">Patient</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-(--primary-plum)/10 border border-(--primary-plum)/20 flex items-center justify-center">
              <span className="text-(--primary-plum) text-xs font-bold">
                {((user?.full_name || user?.first_name || 'P')[0]).toUpperCase()}
              </span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="mx-auto max-w-6xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
