'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import { submitContactMessage } from '@/lib/database/actions';

export default function ContactPageContent() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Enquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const form = new FormData();
    form.append('name', formData.name);
    form.append('email', formData.email);
    form.append('phone', formData.phone);
    form.append('subject', formData.subject);
    form.append('message', formData.message);
    const result = await submitContactMessage(form);
    setLoading(false);
    if (result.success) {
      setSubmitted(true);
    } else {
      setError(result.error ?? 'Something went wrong. Please try again.');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      {/* Page header */}
      <div
        className="py-10 border-b"
        style={{ backgroundColor: 'var(--primary)', borderColor: 'rgba(255,255,255,0.1)' }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-4">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Icon name="ChevronRightIcon" size={14} />
            <span className="text-white">Contact</span>
          </nav>
          <h1
            className="font-display font-bold text-white mb-2"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
          >
            Get In Touch
          </h1>
          <p className="text-white/70 text-sm">
            We'd love to hear from you. Reach out for property enquiries, agent support, or
            partnership opportunities.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Contact info cards */}
          <div className="lg:col-span-1 flex flex-col gap-5">
            {/* Phone */}
            <div
              className="rounded-2xl p-6 border"
              style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: 'var(--accent-light)' }}
              >
                <Icon name="PhoneIcon" size={22} style={{ color: 'var(--primary)' }} />
              </div>
              <h3 className="font-semibold text-base mb-2" style={{ color: 'var(--foreground)' }}>
                Call Us
              </h3>
              <a
                href="tel:+911800123456"
                className="text-sm font-medium block mb-1 transition-colors"
                style={{ color: 'var(--primary)' }}
              >
                +91 1800-123-456
              </a>
              <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                Mon–Sat: 9AM – 7PM IST
              </p>
            </div>

            {/* WhatsApp */}
            <div
              className="rounded-2xl p-6 border"
              style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: 'var(--accent-light)' }}
              >
                <Icon name="ChatBubbleLeftIcon" size={22} style={{ color: 'var(--primary)' }} />
              </div>
              <h3 className="font-semibold text-base mb-2" style={{ color: 'var(--foreground)' }}>
                WhatsApp
              </h3>
              <a
                href="https://wa.me/911800123456"
                className="text-sm font-medium block mb-1 transition-colors"
                style={{ color: 'var(--primary)' }}
              >
                +91 1800-123-456
              </a>
              <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                Quick replies, even on weekends
              </p>
            </div>

            {/* Email */}
            <div
              className="rounded-2xl p-6 border"
              style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: 'var(--accent-light)' }}
              >
                <Icon name="EnvelopeIcon" size={22} style={{ color: 'var(--primary)' }} />
              </div>
              <h3 className="font-semibold text-base mb-2" style={{ color: 'var(--foreground)' }}>
                Email Us
              </h3>
              <a
                href="mailto:hello@luxestate.in"
                className="text-sm font-medium block mb-1 transition-colors"
                style={{ color: 'var(--primary)' }}
              >
                hello@luxestate.in
              </a>
              <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                We respond within 24 hours
              </p>
            </div>

            {/* Office */}
            <div
              className="rounded-2xl p-6 border"
              style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: 'var(--accent-light)' }}
              >
                <Icon name="MapPinIcon" size={22} style={{ color: 'var(--primary)' }} />
              </div>
              <h3 className="font-semibold text-base mb-2" style={{ color: 'var(--foreground)' }}>
                Visit Us
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                LuxEstate HQ
                <br />
                14th Floor, One BKC
                <br />
                Bandra Kurla Complex
                <br />
                Mumbai, Maharashtra 400051
              </p>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2">
            <div
              className="rounded-2xl p-8 border"
              style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
            >
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                    style={{ backgroundColor: 'var(--accent-light)' }}
                  >
                    <Icon name="CheckIcon" size={32} style={{ color: 'var(--primary)' }} />
                  </div>
                  <h3
                    className="font-display font-semibold text-xl mb-2"
                    style={{ color: 'var(--foreground)' }}
                  >
                    Message Sent!
                  </h3>
                  <p className="text-sm mb-6" style={{ color: 'var(--muted-foreground)' }}>
                    Thank you for reaching out. Our team will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        subject: 'General Enquiry',
                        message: '',
                      });
                    }}
                    className="btn-primary"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h2
                    className="font-display font-semibold text-xl mb-6"
                    style={{ color: 'var(--foreground)' }}
                  >
                    Send Us a Message
                  </h2>
                  {error && (
                    <div
                      className="rounded-lg p-3 text-sm border"
                      style={{
                        backgroundColor: 'rgba(239,68,68,0.1)',
                        borderColor: 'rgba(239,68,68,0.3)',
                        color: '#ef4444',
                      }}
                    >
                      {error}
                    </div>
                  )}
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          className="text-xs font-semibold uppercase tracking-wider block mb-2"
                          style={{ color: 'var(--muted-foreground)' }}
                        >
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="input-field"
                          placeholder="Rahul Sharma"
                        />
                      </div>
                      <div>
                        <label
                          className="text-xs font-semibold uppercase tracking-wider block mb-2"
                          style={{ color: 'var(--muted-foreground)' }}
                        >
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="input-field"
                          placeholder="rahul@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          className="text-xs font-semibold uppercase tracking-wider block mb-2"
                          style={{ color: 'var(--muted-foreground)' }}
                        >
                          Phone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="input-field"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                      <div>
                        <label
                          className="text-xs font-semibold uppercase tracking-wider block mb-2"
                          style={{ color: 'var(--muted-foreground)' }}
                        >
                          Subject
                        </label>
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="input-field"
                        >
                          <option>General Enquiry</option>
                          <option>Property Enquiry</option>
                          <option>List My Property</option>
                          <option>Agent Support</option>
                          <option>Partnership</option>
                          <option>Complaint</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        className="text-xs font-semibold uppercase tracking-wider block mb-2"
                        style={{ color: 'var(--muted-foreground)' }}
                      >
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="input-field resize-none"
                        placeholder="Tell us how we can help..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-primary self-start px-8 py-3"
                      disabled={loading}
                    >
                      <Icon name="PaperAirplaneIcon" size={16} />
                      {loading ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
