"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './useAuth';

export const useAdminAuth = (allowedRoles: string[] = ['super_admin', 'admin', 'staff']) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/admin/login');
      }
    }
  }, [user, loading, router, allowedRoles]);

  return { user, loading };
};
