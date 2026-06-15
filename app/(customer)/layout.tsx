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
  Menu
} from 'lucide-react';

const CustomerSidebar = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  
  if (pathname === '/login' || pathname === '/register' || pathname === '/forgot-password') return null;

  const navItems = [
    { name: 'Dashboard', href: '/customer/dashboard', icon: LayoutDashboard },
    { name: 'My Profile', href: '/customer/profile', icon: UserCircle },
    { name: 'My Bookings', href: '/customer/bookings', icon: CalendarCheck },
    { name: 'My Invoices', href: '/customer/invoices', icon: Receipt },
  ];

  return (
    <div className="flex h-screen w-64 flex-col bg-white border-r border-gray-200 text-gray-800">
      <div className="flex h-16 items-center px-6 border-b border-gray-200 bg-[#171717]">
        <span className="text-lg font-bold text-[#B48F57] tracking-wider uppercase font-cinzel">Patient Portal</span>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-4">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive ? 'bg-[#FDF8F3] text-[#B48F57]' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon className={`mr-3 h-5 w-5 flex-shrink-0 ${isActive ? 'text-[#B48F57]' : 'text-gray-400 group-hover:text-gray-500'}`} aria-hidden="true" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center mb-4">
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{user?.first_name || 'Patient'}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex w-full items-center px-3 py-2 text-sm font-medium rounded-md text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5 text-red-500" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/register' || pathname === '/forgot-password';

  if (isAuthPage) {
    return <div className="min-h-screen bg-gray-50">{children}</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#FAFAFA]">
      <CustomerSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm md:hidden">
          <div className="flex items-center">
            <button className="text-gray-500 hover:text-gray-700">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-5xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
