import axios from 'axios';
import { getToken, removeToken } from './auth';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      removeToken();
      // Optionally redirect to login based on path or let AuthContext handle it
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
        const isCustomer = window.location.pathname.startsWith('/customer');
        const isAdmin = window.location.pathname.startsWith('/admin');
        if (isAdmin) {
          window.location.href = '/admin/login';
        } else if (isCustomer) {
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
