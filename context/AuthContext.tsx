"use client";

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import api from '@/lib/api';
import { getToken, removeToken, setToken } from '@/lib/auth';

export type Role = 'super_admin' | 'admin' | 'receptionist' | 'doctor' | 'accountant' | 'marketing' | 'customer';

export interface User {
  id: string;
  email: string;
  role: Role;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  is_active: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: () => {},
  logout: () => {},
  refreshUser: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const response = await api.get('/api/account/me');
      setUser(response.data);
    } catch (error) {
      console.error('Failed to fetch user', error);
      removeToken();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = (token: string, userData: User) => {
    setToken(token, userData.role === 'customer' ? 'customer' : 'admin');
    setUser(userData);
  };

  const logout = () => {
    removeToken();
    setUser(null);
    if (window.location.pathname.startsWith('/admin')) {
      window.location.href = '/admin/login';
    } else {
      window.location.href = '/login';
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshUser: fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};
