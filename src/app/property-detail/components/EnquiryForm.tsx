'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import { submitPropertyEnquiry } from '@/lib/database/actions';

interface EnquiryFormProps {
  propertyId: string;
  propertyTitle: string;
  agentName: string;
}

export default function EnquiryForm({ propertyId, propertyTitle, agentName }: EnquiryFormProps) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: `Hi, I'm interested in "${propertyTitle}". Please share more details.`,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim() || form.name.trim().length < 2)
      newErrors.name = 'Please enter your full name.';
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, '')))
      newErrors.phone = 'Enter a valid 10-digit Indian mobile number.';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = 'Enter a valid email address.';
    if (!form.message.trim()) newErrors.message = 'Please add a message.';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitError(null);
    setLoading(true);
    const data = new FormData();
    data.append('property_id', propertyId);
    data.append('name', form.name);
    data.append('email', form.email);
    data.append('phone', form.phone);
    data.append('message', form.message);
    const result = await submitPropertyEnquiry(data);
    setLoading(false);
    if (result.success) {
      setSubmitted(true);
    } else {
      setSubmitError(result.error ?? 'Something went wrong. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div
        className="rounded-2xl border p-6 text-center"
        style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
      >
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ backgroundColor: 'var(--accent-light)' }}
        >
          <Icon name="CheckCircleIcon" size={30} style={{ color: 'var(--primary)' }} />
        </div>
        <h3
          className="font-display font-semibold text-lg mb-2"
          style={{ color: 'var(--foreground)' }}
        >
          Enquiry Sent!
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
          {agentName} will contact you within 2 hours. Check your phone for a confirmation message.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-4 text-sm font-medium underline underline-offset-4 transition-colors"
          style={{ color: 'var(--primary)' }}
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl border p-6"
      style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
    >
      <h3
        className="font-display font-semibold text-lg mb-1"
        style={{ color: 'var(--foreground)' }}
      >
        Send Enquiry
      </h3>
      <p className="text-xs mb-5" style={{ color: 'var(--muted-foreground)' }}>
        Get details from {agentName} within 2 hours
      </p>

      {submitError && (
        <div
          className="rounded-lg p-3 text-sm border mb-4"
          style={{
            backgroundColor: 'rgba(239,68,68,0.1)',
            borderColor: 'rgba(239,68,68,0.3)',
            color: '#ef4444',
          }}
        >
          {submitError}
        </div>
      )}
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Name */}
        <div>
          <label
            className="text-xs font-medium block mb-1.5"
            style={{ color: 'var(--foreground)' }}
          >
            Full Name <span style={{ color: 'var(--accent)' }}>*</span>
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Rajesh Kumar"
            className="input-field text-sm"
            aria-required="true"
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <p className="text-xs mt-1" style={{ color: '#DC2626' }}>
              {errors.name}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label
            className="text-xs font-medium block mb-1.5"
            style={{ color: 'var(--foreground)' }}
          >
            Mobile Number <span style={{ color: 'var(--accent)' }}>*</span>
          </label>
          <div className="relative">
            <span
              className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium"
              style={{ color: 'var(--muted-foreground)' }}
            >
              +91
            </span>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="98765 43210"
              className="input-field text-sm pl-10"
              aria-required="true"
              aria-invalid={!!errors.phone}
              maxLength={10}
            />
          </div>
          {errors.phone && (
            <p className="text-xs mt-1" style={{ color: '#DC2626' }}>
              {errors.phone}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            className="text-xs font-medium block mb-1.5"
            style={{ color: 'var(--foreground)' }}
          >
            Email Address
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="rajesh@example.com"
            className="input-field text-sm"
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="text-xs mt-1" style={{ color: '#DC2626' }}>
              {errors.email}
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <label
            className="text-xs font-medium block mb-1.5"
            style={{ color: 'var(--foreground)' }}
          >
            Message <span style={{ color: 'var(--accent)' }}>*</span>
          </label>
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            rows={3}
            className="input-field text-sm resize-none"
            aria-required="true"
            aria-invalid={!!errors.message}
          />
          {errors.message && (
            <p className="text-xs mt-1" style={{ color: '#DC2626' }}>
              {errors.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all disabled:opacity-70"
          style={{ backgroundColor: 'var(--primary)', color: 'white' }}
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Icon name="PaperAirplaneIcon" size={16} />
              Send Enquiry
            </>
          )}
        </button>

        <p className="text-xs text-center" style={{ color: 'var(--muted-foreground)' }}>
          By submitting, you agree to our{' '}
          <Link
            href="/"
            className="underline underline-offset-2 transition-colors hover:text-primary"
            style={{ color: 'var(--muted-foreground)' }}
          >
            Privacy Policy
          </Link>
        </p>
      </form>
    </div>
  );
}
