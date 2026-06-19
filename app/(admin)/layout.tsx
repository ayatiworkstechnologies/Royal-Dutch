"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { ADMIN_ROLES, CLINICAL_ROLES, ROLE_LABELS, ROLE_ALLOWED_PATHS } from '@/hooks/useAdminAuth';
import api from '@/lib/api';
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
  BarChart3,
  Shield,
  Briefcase,
  ClipboardList,
  CalendarDays,
} from 'lucide-react';

// ─── Nav definitions ─────────────────────────────────────────────────────────
type NavItem = { name: string; href: string; icon: React.ElementType };

const ALL_NAV: NavItem[] = [
  { name: 'Dashboard',       href: '/admin/dashboard',       icon: LayoutDashboard },
  { name: 'Reports',         href: '/admin/reports',         icon: BarChart3 },
  { name: 'Bookings',        href: '/admin/bookings',        icon: CalendarCheck },
  { name: 'Patients',        href: '/admin/patients',        icon: Users },
  { name: 'Categories',      href: '/admin/categories',      icon: FolderTree },
  { name: 'Services',        href: '/admin/services',        icon: Stethoscope },
  { name: 'Staff',           href: '/admin/staff',           icon: UserSquare2 },
  { name: 'Billing',         href: '/admin/billing',         icon: Receipt },
  { name: 'Payments',        href: '/admin/payments',        icon: CreditCard },
  { name: 'Mail',            href: '/admin/mail',            icon: Mail },
  { name: 'Email Templates', href: '/admin/email-templates', icon: FileText },
  { name: 'Notifications',   href: '/admin/notifications',   icon: Bell },
  { name: 'Settings',        href: '/admin/settings',        icon: Settings },
];

const SUPER_ADMIN_EXTRA: NavItem[] = [
  { name: 'System Users', href: '/admin/users',      icon: UserCog },
  { name: 'Audit Logs',   href: '/admin/audit-logs', icon: ShieldAlert },
];

const CLINICAL_NAV: NavItem[] = [
  { name: 'Dashboard',    href: '/admin/dashboard',        icon: LayoutDashboard },
  { name: 'My Schedule',  href: '/admin/staff-dashboard',  icon: CalendarDays },
];

function getNavItems(role: string): NavItem[] {
  if (role === 'super_admin') return [...ALL_NAV, ...SUPER_ADMIN_EXTRA];
  if (role === 'admin')        return ALL_NAV;
  if (CLINICAL_ROLES.includes(role)) return CLINICAL_NAV;
  const allowed = ROLE_ALLOWED_PATHS[role] ?? [];
  return ALL_NAV.filter(n => allowed.some(p => n.href.startsWith(p)));
}

const ROLE_CFG: Record<string, { icon: React.ElementType; color: string }> = {
  super_admin:      { icon: Shield,        color: 'text-red-400' },
  admin:            { icon: Briefcase,     color: 'text-blue-400' },
  receptionist:     { icon: ClipboardList, color: 'text-emerald-400' },
  doctor:           { icon: Stethoscope,   color: 'text-indigo-400' },
  nurse:            { icon: Stethoscope,   color: 'text-pink-400' },
  physiotherapist:  { icon: Stethoscope,   color: 'text-teal-400' },
  dentist:          { icon: Stethoscope,   color: 'text-cyan-400' },
  laser_specialist: { icon: Stethoscope,   color: 'text-violet-400' },
  facial_therapist: { icon: Stethoscope,   color: 'text-rose-400' },
  accountant:       { icon: Receipt,       color: 'text-amber-400' },
  marketing:        { icon: Mail,          color: 'text-fuchsia-400' },
};

// ─── Sidebar ─────────────────────────────────────────────────────────────────
const AdminSidebar = () => {
  const pathname = usePathname();
  const { user } = useAuth();

  if (pathname === '/admin/login') return null;

  const role      = user?.role ?? '';
  const navItems  = getNavItems(role);
  const roleCfg   = ROLE_CFG[role];
  const roleLabel = ROLE_LABELS[role];

  return (
    <div className="flex h-screen w-64 shrink-0 flex-col bg-(--admin-sidebar-bg) text-(--admin-sidebar-fg) shadow-2xl relative z-20 border-r border-(--primary-plum)/10">
      {/* Logo + role badge */}
      <div className="flex h-16 flex-col justify-center px-6 border-b border-(--primary-plum)/10 bg-(--admin-sidebar-bg)">
        <span className="text-xl font-bold text-(--primary-plum) tracking-widest uppercase font-primary leading-tight">
          RDMC Admin
        </span>
        {roleCfg && roleLabel && (
          <div className={`flex items-center gap-1 mt-0.5 ${roleCfg.color}`}>
            <roleCfg.icon className="h-3 w-3" />
            <span className="text-[10px] font-semibold uppercase tracking-widest">{roleLabel}</span>
          </div>
        )}
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto py-4">
        {roleLabel && (
          <p className="px-5 mb-2 text-[9px] font-bold uppercase tracking-widest text-(--admin-sidebar-fg)/30">
            {roleLabel} Access
          </p>
        )}
        <nav className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-4 py-3 text-sm font-medium transition-all rounded-r-full mr-2 ${
                  isActive
                    ? 'bg-(--primary-plum) text-white shadow-md'
                    : 'text-(--admin-sidebar-fg)/70 hover:bg-(--primary-plum)/5 hover:text-(--primary-plum)'
                }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                    isActive ? 'text-(--primary-gold)' : 'text-(--primary-plum)/60 group-hover:text-(--primary-plum)'
                  }`}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

// ─── Notification Bell ────────────────────────────────────────────────────────
const NotificationBell = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchNotifs = async () => {
      try {
        const res = await api.get('/api/notifications?limit=5');
        const items = res.data.items || res.data;
        setNotifications(items);
        setUnreadCount(items.filter((n: any) => !n.read).length);
      } catch {
        // silent
      }
    };
    fetchNotifs();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getNotificationLink = (notif: any) => {
    const text = `${notif.title} ${notif.message} ${notif.channel}`.toLowerCase();
    if (text.includes('booking') || text.includes('appointment')) return '/admin/bookings';
    if (text.includes('patient'))  return '/admin/patients';
    if (text.includes('invoice') || text.includes('payment') || text.includes('billing')) return '/admin/billing';
    return '/admin/notifications';
  };

  const handleNotificationClick = async (notif: any) => {
    setIsOpen(false);
    if (!notif.read) {
      try {
        await api.patch(`/api/notifications/${notif.id}`, { read: true });
        setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, read: true } : n));
        setUnreadCount(prev => Math.max(0, prev - 1));
      } catch {
        // silent
      }
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Notifications"
        className="relative p-2 text-slate-500 hover:bg-slate-100 hover:text-(--primary-plum) rounded-full transition-colors focus:outline-none"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="font-bold text-slate-800 font-secondary uppercase tracking-wider text-xs">Notifications</h3>
            {unreadCount > 0 && (
              <span className="text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                {unreadCount} New
              </span>
            )}
          </div>
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-slate-500 text-sm font-secondary">No recent notifications</div>
            ) : (
              notifications.map((notif) => (
                <Link
                  key={notif.id}
                  href={getNotificationLink(notif)}
                  onClick={() => handleNotificationClick(notif)}
                  className={`block p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors relative ${!notif.read ? 'bg-(--primary-plum)/5' : ''}`}
                >
                  {!notif.read && (
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-(--primary-gold) rounded-full" />
                  )}
                  <div className={!notif.read ? 'pl-3' : ''}>
                    <p className="text-sm font-bold text-slate-800 leading-tight">{notif.title}</p>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 font-secondary">{notif.message}</p>
                    <p className="text-[10px] text-slate-400 mt-2 uppercase tracking-widest">
                      {new Date(notif.created_at).toLocaleDateString()} •{' '}
                      {new Date(notif.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </Link>
              ))
            )}
          </div>
          <div className="p-3 bg-slate-50 text-center hover:bg-slate-100 transition-colors">
            <Link
              href="/admin/notifications"
              onClick={() => setIsOpen(false)}
              className="text-xs font-bold text-(--primary-plum) uppercase tracking-widest w-full inline-block"
            >
              View All Notifications
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Layout ──────────────────────────────────────────────────────────────────
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname    = usePathname();
  const router      = useRouter();
  const { user, logout } = useAuth();
  const isLoginPage = pathname === '/admin/login';

  // Path guard
  useEffect(() => {
    if (isLoginPage || !user) return;
    if (!ADMIN_ROLES.includes(user.role)) { router.push('/admin/login'); return; }
    const allowed = ROLE_ALLOWED_PATHS[user.role];
    if (allowed && !allowed.some(p => pathname.startsWith(p))) router.push('/admin/dashboard');
  }, [pathname, user, isLoginPage, router]);

  if (isLoginPage) {
    return <div className="min-h-screen bg-gray-50">{children}</div>;
  }

  const role      = user?.role ?? '';
  const roleCfg   = ROLE_CFG[role];
  const roleLabel = ROLE_LABELS[role];

  return (
    <div className="flex h-screen overflow-hidden bg-background font-sans text-slate-900">
      <AdminSidebar />

      <div className="flex flex-1 flex-col overflow-hidden relative">
        {/* Topbar */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200/60 bg-white/70 backdrop-blur-xl px-6 shadow-sm">
          <div className="flex items-center">
            <button
              type="button"
              className="md:hidden text-slate-500 hover:text-(--primary-gold) transition-colors"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <NotificationBell />

            <div className="h-6 w-px bg-slate-200 hidden sm:block" />

            <div className="flex items-center space-x-3 text-right">
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-slate-900">
                  {user?.first_name} {user?.last_name}
                </p>
                {roleCfg && roleLabel ? (
                  <div className={`flex items-center justify-end gap-1 ${roleCfg.color}`}>
                    <roleCfg.icon className="h-3 w-3" />
                    <p className="text-[10px] font-bold uppercase tracking-wide">{roleLabel}</p>
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 capitalize">{role.replace('_', ' ')}</p>
                )}
              </div>
              <div className="h-10 w-10 rounded-full bg-(--primary-plum)/10 border border-(--primary-plum)/20 flex items-center justify-center">
                <span className="text-(--primary-plum) font-bold text-lg">
                  {user?.first_name?.[0] ?? 'A'}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={logout}
              className="flex items-center px-3 py-2 text-sm font-medium rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all ml-2"
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
