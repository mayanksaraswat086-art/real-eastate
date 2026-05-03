'use client';

import React, { useState } from 'react';
import { login, setupAdmin } from '@/lib/database/auth-actions';
import Icon from '@/components/ui/AppIcon';

export default function AdminLoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const result = await login(formData);

    if (result && !result.success) {
      setError(result.error || 'Login failed');
      setLoading(false);
    }
  }

  async function handleSetup() {
    setLoading(true);
    const result = await setupAdmin();
    if (result.success) {
      setMessage(result.message || 'Setup successful');
    } else {
      setError(result.error || 'Setup failed');
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-8 text-center bg-primary text-white">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <Icon name="HomeModernIcon" size={32} />
          </div>
          <h1 className="text-2xl font-bold font-display">LuxEstate Admin</h1>
          <p className="text-white/70 text-sm mt-1">Please sign in to continue</p>
        </div>

        <div className="p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl text-sm flex items-center gap-3">
              <Icon name="ExclamationCircleIcon" size={18} />
              {error}
            </div>
          )}

          {message && (
            <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-xl text-sm flex items-center gap-3">
              <Icon name="CheckCircleIcon" size={18} />
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-xs font-bold uppercase text-gray-400 block mb-2 tracking-wider">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <Icon name="EnvelopeIcon" size={18} />
                </div>
                <input
                  name="email"
                  type="email"
                  required
                  defaultValue="realstate@gmail.com"
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-gray-400 block mb-2 tracking-wider">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <Icon name="LockClosedIcon" size={18} />
                </div>
                <input
                  name="password"
                  type="password"
                  required
                  defaultValue="123456789"
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <button 
              onClick={handleSetup}
              className="text-xs text-gray-400 hover:text-primary transition-colors"
            >
              First time? Click here to setup Admin account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
