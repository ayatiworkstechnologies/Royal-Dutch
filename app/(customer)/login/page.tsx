"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import api from '@/lib/api';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function CustomerLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload = { email, password };

      const response = await api.post('/api/v1/auth/login', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { access_token } = response.data;
      
      const userRes = await api.get('/api/v1/account/me', {
        headers: { Authorization: `Bearer ${access_token}` }
      });

      const user = userRes.data;
      login(access_token, user);
      
      router.push('/customer/dashboard');
    } catch (err: any) {
      let errorMsg = 'Login failed. Please check your credentials.';
      if (err.response?.data?.detail) {
        const detail = err.response.data.detail;
        if (typeof detail === 'string') {
          errorMsg = detail;
        } else if (Array.isArray(detail)) {
          errorMsg = detail.map((d: any) => `${d.loc?.join('.')} ${d.msg}`).join(', ');
        } else {
          errorMsg = JSON.stringify(detail);
        }
      } else if (err.message) {
        errorMsg = err.message;
      }
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-md border border-gray-100">
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#171717] font-cinzel">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to access your Patient Portal
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4 rounded-md shadow-sm">
            <Input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              label="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <div className="flex items-center justify-end mt-2">
            <Link href="/forgot-password" className="text-sm font-medium text-[#B48F57] hover:text-[#8e6e3c]">
              Forgot your password?
            </Link>
          </div>

          <div className="mt-6">
            <Button
              type="submit"
              variant="primary"
              className="w-full"
              isLoading={loading}
            >
              Sign in
            </Button>
          </div>
        </form>

        <div className="text-center text-sm mt-4">
          <Link href="/" className="text-[#B48F57] hover:text-[#8e6e3c] font-medium block mb-2">
            &larr; Back to Home
          </Link>
          <div className="text-gray-600 mt-6">
            Don't have an account?{' '}
            <Link href="/register" className="text-[#B48F57] hover:text-[#8e6e3c] font-medium">
              Sign up here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
