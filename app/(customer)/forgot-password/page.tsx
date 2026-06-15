"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await api.post('/api/v1/auth/otp/request', { email });
      setSuccess('Verification code sent to your email.');
      setStep(2);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to send reset code.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await api.post('/api/v1/auth/reset-password', { 
        email, 
        code, 
        new_password: newPassword 
      });
      setSuccess('Password reset successfully. Redirecting to login...');
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err: any) {
      let errorMsg = 'Failed to reset password.';
      if (err.response?.data?.detail) {
        const detail = err.response.data.detail;
        if (typeof detail === 'string') {
          errorMsg = detail;
        } else if (Array.isArray(detail)) {
          errorMsg = detail.map((d: any) => `${d.loc?.join('.')} ${d.msg}`).join(', ');
        }
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
            Reset Password
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {step === 1 ? "Enter your email to receive a reset code." : "Enter your code and new password."}
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4">
            <p className="text-sm text-green-700">{success}</p>
          </div>
        )}

        {step === 1 ? (
          <form className="mt-8 space-y-6" onSubmit={handleRequestOtp}>
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
            </div>

            <div>
              <Button
                type="submit"
                variant="primary"
                className="w-full"
                isLoading={loading}
              >
                Send Reset Code
              </Button>
            </div>
          </form>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleResetPassword}>
            <div className="space-y-4 rounded-md shadow-sm">
              <Input
                id="reset-code"
                name="code"
                type="text"
                required
                label="6-Digit Reset Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <Input
                id="new-password"
                name="new-password"
                type="password"
                required
                label="New Password (min 8 characters)"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div>
              <Button
                type="submit"
                variant="primary"
                className="w-full"
                isLoading={loading}
              >
                Reset Password
              </Button>
            </div>
            
            <div className="text-center mt-2">
              <button 
                type="button" 
                onClick={() => setStep(1)} 
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Use a different email
              </button>
            </div>
          </form>
        )}

        <div className="text-center text-sm mt-4">
          <Link href="/login" className="text-[#B48F57] hover:text-[#8e6e3c] font-medium block">
            &larr; Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
