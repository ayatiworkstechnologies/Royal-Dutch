"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import api from '@/lib/api';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';

export type AuthView = 'patient_login' | 'staff_login' | 'register' | 'forgot_password';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: AuthView;
}

export function AuthModal({ isOpen, onClose, initialView = 'patient_login' }: AuthModalProps) {
  const [view, setView] = useState<AuthView>(initialView);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Forgot password specific
  const [forgotStep, setForgotStep] = useState<1 | 2>(1);

  const router = useRouter();
  const { login } = useAuth();

  useEffect(() => {
    if (isOpen) {
      setView(initialView);
      setError('');
      setSuccess('');
      setForgotStep(1);
    }
  }, [isOpen, initialView]);

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setPhone('');
    setCode('');
    setNewPassword('');
    setError('');
    setSuccess('');
    setForgotStep(1);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const extractError = (err: any, defaultMsg: string) => {
    let errorMsg = defaultMsg;
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
    return errorMsg;
  };

  const handleLogin = async (e: React.FormEvent, isStaff: boolean) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await api.post('/api/auth/login', { email, password }, {
        headers: { 'Content-Type': 'application/json' },
      });

      const { access_token } = response.data;
      
      const userRes = await api.get('/api/account/me', {
        headers: { Authorization: `Bearer ${access_token}` }
      });

      const user = userRes.data;

      if (isStaff && user.role === 'customer') {
        throw new Error('This login is for staff only. Customers must use the Patient Login.');
      }
      if (!isStaff && user.role !== 'customer') {
        throw new Error('This login is for patients only. Staff members must use the Staff Login.');
      }

      login(access_token, user);
      handleClose();
      
      if (isStaff) {
        router.push('/admin/dashboard');
      } else {
        router.push('/customer/dashboard');
      }
    } catch (err: any) {
      setError(extractError(err, 'Login failed. Please check your credentials.'));
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const payload = { name, email, phone, password };
      const response = await api.post('/api/auth/register', payload, {
        headers: { 'Content-Type': 'application/json' },
      });

      const { access_token } = response.data;
      
      const userRes = await api.get('/api/account/me', {
        headers: { Authorization: `Bearer ${access_token}` }
      });

      const user = userRes.data;
      login(access_token, user);
      handleClose();
      router.push('/customer/dashboard');
    } catch (err: any) {
      setError(extractError(err, 'Registration failed. Please check your details.'));
    } finally {
      setLoading(false);
    }
  };

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await api.post('/api/auth/otp/request', { email });
      setSuccess('Verification code sent to your email.');
      setForgotStep(2);
    } catch (err: any) {
      setError(extractError(err, 'Failed to send reset code.'));
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
      await api.post('/api/auth/reset-password', { email, code, new_password: newPassword });
      setSuccess('Password reset successfully. You can now login.');
      setTimeout(() => {
        setView('patient_login');
        setForgotStep(1);
        setPassword('');
        setCode('');
        setNewPassword('');
        setSuccess('');
      }, 2000);
    } catch (err: any) {
      setError(extractError(err, 'Failed to reset password.'));
    } finally {
      setLoading(false);
    }
  };

  const renderTitle = () => {
    switch (view) {
      case 'patient_login': return 'Welcome Back';
      case 'staff_login': return 'Staff Portal';
      case 'register': return 'Create an Account';
      case 'forgot_password': return 'Reset Password';
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={renderTitle()} maxWidth="sm">
      <div className="space-y-4">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border-l-4 border-green-500 p-3">
            <p className="text-sm text-green-700">{success}</p>
          </div>
        )}

        {/* PATIENT LOGIN */}
        {view === 'patient_login' && (
          <form className="space-y-4" onSubmit={(e) => handleLogin(e, false)}>
            <Input
              id="email"
              type="email"
              required
              label="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              id="password"
              type="password"
              required
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex justify-end">
              <button 
                type="button" 
                onClick={() => setView('forgot_password')}
                className="text-sm font-medium text-[#B48F57] hover:text-[#8e6e3c]"
              >
                Forgot your password?
              </button>
            </div>
            <Button type="submit" className="w-full" isLoading={loading}>Sign in</Button>
            <div className="text-center text-sm text-gray-600 mt-4">
              Don't have an account?{' '}
              <button 
                type="button" 
                onClick={() => setView('register')}
                className="text-[#B48F57] hover:text-[#8e6e3c] font-medium"
              >
                Sign up here
              </button>
            </div>
            <div className="text-center text-sm text-gray-600 mt-2">
              Are you a staff member?{' '}
              <button 
                type="button" 
                onClick={() => setView('staff_login')}
                className="text-[#B48F57] hover:text-[#8e6e3c] font-medium"
              >
                Staff Login
              </button>
            </div>
          </form>
        )}

        {/* STAFF LOGIN */}
        {view === 'staff_login' && (
          <form className="space-y-4" onSubmit={(e) => handleLogin(e, true)}>
            <Input
              id="staff-email"
              type="email"
              required
              label="Work Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              id="staff-password"
              type="password"
              required
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" className="w-full" isLoading={loading}>Sign in to Staff Portal</Button>
            <div className="text-center text-sm text-gray-600 mt-4">
              Not a staff member?{' '}
              <button 
                type="button" 
                onClick={() => setView('patient_login')}
                className="text-[#B48F57] hover:text-[#8e6e3c] font-medium"
              >
                Patient Login
              </button>
            </div>
          </form>
        )}

        {/* REGISTER */}
        {view === 'register' && (
          <form className="space-y-4" onSubmit={handleRegister}>
            <Input
              id="reg-name"
              type="text"
              required
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              id="reg-email"
              type="email"
              required
              label="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              id="reg-phone"
              type="tel"
              label="Phone number (optional)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Input
              id="reg-password"
              type="password"
              required
              label="Password (min 8 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" className="w-full" isLoading={loading}>Create Account</Button>
            <div className="text-center text-sm text-gray-600 mt-4">
              Already have an account?{' '}
              <button 
                type="button" 
                onClick={() => setView('patient_login')}
                className="text-[#B48F57] hover:text-[#8e6e3c] font-medium"
              >
                Sign in here
              </button>
            </div>
          </form>
        )}

        {/* FORGOT PASSWORD */}
        {view === 'forgot_password' && (
          <>
            {forgotStep === 1 ? (
              <form className="space-y-4" onSubmit={handleRequestOtp}>
                <p className="text-sm text-gray-600">Enter your email to receive a reset code.</p>
                <Input
                  id="forgot-email"
                  type="email"
                  required
                  label="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button type="submit" className="w-full" isLoading={loading}>Send Reset Code</Button>
              </form>
            ) : (
              <form className="space-y-4" onSubmit={handleResetPassword}>
                <p className="text-sm text-gray-600">Enter your code and new password.</p>
                <Input
                  id="reset-code"
                  type="text"
                  required
                  label="6-Digit Reset Code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
                <Input
                  id="new-password"
                  type="password"
                  required
                  label="New Password (min 8 characters)"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <Button type="submit" className="w-full" isLoading={loading}>Reset Password</Button>
                <div className="text-center mt-2">
                  <button 
                    type="button" 
                    onClick={() => setForgotStep(1)} 
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Use a different email
                  </button>
                </div>
              </form>
            )}
            <div className="text-center text-sm mt-4">
              <button 
                type="button" 
                onClick={() => setView('patient_login')}
                className="text-[#B48F57] hover:text-[#8e6e3c] font-medium"
              >
                &larr; Back to Login
              </button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}
