"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import api from '@/lib/api';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function CustomerRegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload = { name, email, phone, password };

      const response = await api.post('/api/v1/auth/register', payload, {
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
      let errorMsg = 'Registration failed. Please check your details.';
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
            Create an Account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign up to access your Patient Portal
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleRegister}>
          <div className="space-y-4 rounded-md shadow-sm">
            <Input
              id="full-name"
              name="name"
              type="text"
              required
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
              id="phone-number"
              name="phone"
              type="tel"
              label="Phone number (optional)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              label="Password (min 8 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <Button
              type="submit"
              variant="primary"
              className="w-full"
              isLoading={loading}
            >
              Sign up
            </Button>
          </div>
        </form>

        <div className="text-center text-sm mt-4">
          <Link href="/" className="text-[#B48F57] hover:text-[#8e6e3c] font-medium block mb-2">
            &larr; Back to Home
          </Link>
          <div className="text-gray-600 mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-[#B48F57] hover:text-[#8e6e3c] font-medium">
              Sign in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
