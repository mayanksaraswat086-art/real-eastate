'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import { submitAppointment } from '@/lib/database/actions';
import { type Agent } from '@/lib/database/types';

interface FormData {
  // Step 1
  name: string;
  email: string;
  phone: string;
  address: string;
  // Step 2
  serviceType: 'buy' | 'rent';
  // Step 3
  propertyType: string;
  agentId: string;
  // Step 4
  preferredDate: string;
  preferredTime: string;
  description: string;
}

const initialData: FormData = {
  name: '',
  email: '',
  phone: '',
  address: '',
  serviceType: 'buy',
  propertyType: '',
  agentId: '',
  preferredDate: '',
  preferredTime: '',
  description: '',
};

const timeSlots = [
  '09:00 AM',
  '09:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '12:00 PM',
  '12:30 PM',
  '02:00 PM',
  '02:30 PM',
  '03:00 PM',
  '03:30 PM',
  '04:00 PM',
  '04:30 PM',
  '05:00 PM',
  '05:30 PM',
  '06:00 PM',
  '06:30 PM',
];

export default function BookAppointmentContent({ agents = [] }: { agents?: Agent[] }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialData);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateForm = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const form = new FormData();
    form.append('name', formData.name);
    form.append('email', formData.email);
    form.append('phone', formData.phone);
    form.append('address', formData.address);
    form.append('service_type', formData.serviceType);
    form.append('preferred_date', formData.preferredDate);
    form.append('preferred_time', formData.preferredTime);
    
    const selectedAgent = agents.find(a => a.id === formData.agentId);
    const enrichedDescription = [
      `Property Type: ${formData.propertyType || 'Not specified'}`,
      `Preferred Agent: ${selectedAgent ? selectedAgent.name : 'Any'}`,
      formData.description ? `\nNotes: ${formData.description}` : ''
    ].filter(Boolean).join('\n');
    
    form.append('description', enrichedDescription);
    const result = await submitAppointment(form);
    setLoading(false);
    if (result.success) {
      setSubmitted(true);
    } else {
      setError(result.error ?? 'Something went wrong. Please try again.');
    }
  };

  if (submitted) {
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
              <span className="text-white">Book Appointment</span>
            </nav>
            <h1
              className="font-display font-bold text-white mb-2"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
            >
              Appointment Confirmed!
            </h1>
            <p className="text-white/70 text-sm">
              Thank you for booking. We'll contact you shortly.
            </p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 md:px-6 py-16">
          <div className="text-center">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: 'var(--accent-light)' }}
            >
              <Icon name="CheckIcon" size={40} style={{ color: 'var(--primary)' }} />
            </div>
            <h2
              className="font-display font-semibold text-2xl mb-4"
              style={{ color: 'var(--foreground)' }}
            >
              Your appointment has been scheduled
            </h2>
            <p className="text-sm mb-8" style={{ color: 'var(--muted-foreground)' }}>
              We've received your booking request. Our team will contact you at{' '}
              <strong>{formData.phone}</strong> or <strong>{formData.email}</strong> to confirm the
              appointment details.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/" className="btn-primary">
                Back to Home
              </Link>
              <Link href="/contact" className="btn-secondary">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

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
            <span className="text-white">Book Appointment</span>
          </nav>
          <h1
            className="font-display font-bold text-white mb-2"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
          >
            Book an Appointment
          </h1>
          <p className="text-white/70 text-sm">
            Schedule a consultation with our real estate experts in 3 simple steps
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div
        className="py-6 border-b"
        style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
      >
        <div className="max-w-2xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((num) => (
              <React.Fragment key={num}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                      step >= num ? 'text-white' : ''
                    }`}
                    style={{ backgroundColor: step >= num ? 'var(--primary)' : 'var(--border)' }}
                  >
                    {step > num ? <Icon name="CheckIcon" size={16} /> : num}
                  </div>
                  <span
                    className="text-xs mt-2 font-medium"
                    style={{ color: step >= num ? 'var(--primary)' : 'var(--muted-foreground)' }}
                  >
                    {num === 1 ? 'Details' : num === 2 ? 'Service' : num === 3 ? 'Preferences' : 'Schedule'}
                  </span>
                </div>
                {num < 4 && (
                  <div
                    className="flex-1 h-0.5 mx-2"
                    style={{ backgroundColor: step > num ? 'var(--primary)' : 'var(--border)' }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 md:px-6 py-12">
        <form onSubmit={handleSubmit}>
          {error && (
            <div
              className="rounded-lg p-3 text-sm border mb-6"
              style={{
                backgroundColor: 'rgba(239,68,68,0.1)',
                borderColor: 'rgba(239,68,68,0.3)',
                color: '#ef4444',
              }}
            >
              {error}
            </div>
          )}
          {/* Step 1: Customer Details */}
          {step === 1 && (
            <div className="space-y-6">
              <h2
                className="font-display font-semibold text-xl mb-6"
                style={{ color: 'var(--foreground)' }}
              >
                Step 1: Tell us about yourself
              </h2>

              <div>
                <label
                  className="text-xs font-semibold uppercase tracking-wider block mb-2"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  className="input-field"
                  placeholder="Rahul Sharma"
                  value={formData.name}
                  onChange={(e) => updateForm('name', e.target.value)}
                />
              </div>

              <div>
                <label
                  className="text-xs font-semibold uppercase tracking-wider block mb-2"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  className="input-field"
                  placeholder="rahul@example.com"
                  value={formData.email}
                  onChange={(e) => updateForm('email', e.target.value)}
                />
              </div>

              <div>
                <label
                  className="text-xs font-semibold uppercase tracking-wider block mb-2"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  className="input-field"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => updateForm('phone', e.target.value)}
                />
              </div>

              <div>
                <label
                  className="text-xs font-semibold uppercase tracking-wider block mb-2"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  Current Address
                </label>
                <textarea
                  className="input-field resize-none"
                  rows={3}
                  placeholder="123 Main Street, Bandra West, Mumbai - 400050"
                  value={formData.address}
                  onChange={(e) => updateForm('address', e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Step 2: Service Type */}
          {step === 2 && (
            <div className="space-y-6">
              <h2
                className="font-display font-semibold text-xl mb-6"
                style={{ color: 'var(--foreground)' }}
              >
                Step 2: What service do you need?
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    value: 'buy',
                    label: 'Buy Property',
                    icon: 'HomeIcon',
                    desc: 'Looking to purchase a property',
                  },
                  {
                    value: 'rent',
                    label: 'Rent Property',
                    icon: 'BuildingOfficeIcon',
                    desc: 'Looking for rental options',
                  },
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`relative rounded-xl p-5 border cursor-pointer transition-all ${
                      formData.serviceType === option.value ? 'border-2' : 'border'
                    }`}
                    style={{
                      backgroundColor:
                        formData.serviceType === option.value
                          ? 'var(--accent-light)'
                          : 'var(--card)',
                      borderColor:
                        formData.serviceType === option.value ? 'var(--primary)' : 'var(--border)',
                    }}
                  >
                    <input
                      type="radio"
                      name="serviceType"
                      value={option.value}
                      checked={formData.serviceType === option.value}
                      onChange={(e) => updateForm('serviceType', e.target.value as any)}
                      className="sr-only"
                    />
                    <div className="flex items-start gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: 'var(--primary)' }}
                      >
                        <Icon name={option.icon as any} size={20} style={{ color: 'white' }} />
                      </div>
                      <div>
                        <h3
                          className="font-semibold text-base mb-1"
                          style={{ color: 'var(--foreground)' }}
                        >
                          {option.label}
                        </h3>
                        <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                          {option.desc}
                        </p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Preferences */}
          {step === 3 && (
            <div className="space-y-6">
              <h2
                className="font-display font-semibold text-xl mb-6"
                style={{ color: 'var(--foreground)' }}
              >
                Step 3: Tell us your preferences
              </h2>

              <div>
                <label
                  className="text-xs font-semibold uppercase tracking-wider block mb-2"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  Property Type
                </label>
                <select
                  className="input-field"
                  value={formData.propertyType}
                  onChange={(e) => updateForm('propertyType', e.target.value)}
                >
                  <option value="">Select property type</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa / Independent House</option>
                  <option value="Penthouse">Penthouse</option>
                  <option value="Commercial">Commercial Space</option>
                  <option value="Plot">Plot / Land</option>
                </select>
              </div>

              <div>
                <label
                  className="text-xs font-semibold uppercase tracking-wider block mb-2"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  Preferred Agent (Optional)
                </label>
                <select
                  className="input-field"
                  value={formData.agentId}
                  onChange={(e) => updateForm('agentId', e.target.value)}
                >
                  <option value="">Anyone from the team</option>
                  {agents.map((agent) => (
                    <option key={agent.id} value={agent.id}>
                      {agent.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Step 4: Schedule */}
          {step === 4 && (
            <div className="space-y-6">
              <h2
                className="font-display font-semibold text-xl mb-6"
                style={{ color: 'var(--foreground)' }}
              >
                Step 4: When would you like to meet?
              </h2>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label
                    className="text-xs font-semibold uppercase tracking-wider block mb-2"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    required
                    className="input-field"
                    value={formData.preferredDate}
                    onChange={(e) => updateForm('preferredDate', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div>
                  <label
                    className="text-xs font-semibold uppercase tracking-wider block mb-2"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    Preferred Time *
                  </label>
                  <select
                    required
                    className="input-field"
                    value={formData.preferredTime}
                    onChange={(e) => updateForm('preferredTime', e.target.value)}
                  >
                    <option value="">Select time</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label
                  className="text-xs font-semibold uppercase tracking-wider block mb-2"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  Additional Details
                </label>
                <textarea
                  className="input-field resize-none"
                  rows={4}
                  placeholder="Tell us more about your requirements, budget, preferred locations, or any specific questions you have..."
                  value={formData.description}
                  onChange={(e) => updateForm('description', e.target.value)}
                />
              </div>

              {/* Summary */}
              <div
                className="rounded-xl p-5 border"
                style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
              >
                <h3 className="font-semibold text-base mb-3" style={{ color: 'var(--foreground)' }}>
                  Appointment Summary
                </h3>
                <div className="space-y-2 text-sm">
                  <div
                    className="flex justify-between"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    <span>Name:</span>
                    <span style={{ color: 'var(--foreground)' }}>{formData.name}</span>
                  </div>
                  <div
                    className="flex justify-between"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    <span>Email:</span>
                    <span style={{ color: 'var(--foreground)' }}>{formData.email}</span>
                  </div>
                  <div
                    className="flex justify-between"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    <span>Phone:</span>
                    <span style={{ color: 'var(--foreground)' }}>{formData.phone}</span>
                  </div>
                  <div
                    className="flex justify-between"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    <span>Service:</span>
                    <span style={{ color: 'var(--foreground)' }} className="capitalize">
                      {formData.serviceType}
                    </span>
                  </div>
                  {formData.propertyType && (
                    <div
                      className="flex justify-between"
                      style={{ color: 'var(--muted-foreground)' }}
                    >
                      <span>Property Type:</span>
                      <span style={{ color: 'var(--foreground)' }}>{formData.propertyType}</span>
                    </div>
                  )}
                  {formData.agentId && agents.find(a => a.id === formData.agentId) && (
                    <div
                      className="flex justify-between"
                      style={{ color: 'var(--muted-foreground)' }}
                    >
                      <span>Agent:</span>
                      <span style={{ color: 'var(--foreground)' }}>
                        {agents.find(a => a.id === formData.agentId)?.name}
                      </span>
                    </div>
                  )}
                  {formData.preferredDate && (
                    <div
                      className="flex justify-between"
                      style={{ color: 'var(--muted-foreground)' }}
                    >
                      <span>Date:</span>
                      <span style={{ color: 'var(--foreground)' }}>
                        {new Date(formData.preferredDate).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  )}
                  {formData.preferredTime && (
                    <div
                      className="flex justify-between"
                      style={{ color: 'var(--muted-foreground)' }}
                    >
                      <span>Time:</span>
                      <span style={{ color: 'var(--foreground)' }}>{formData.preferredTime}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex justify-between mt-10">
            <button
              type="button"
              onClick={prevStep}
              className="btn-secondary"
              disabled={step === 1}
            >
              <Icon name="ArrowLeftIcon" size={16} />
              Previous
            </button>

            {step < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="btn-primary"
                disabled={
                  (step === 1 && (!formData.name || !formData.email || !formData.phone)) ||
                  (step === 2 && !formData.serviceType) ||
                  (step === 3 && !formData.propertyType)
                }
              >
                Next
                <Icon name="ArrowRightIcon" size={16} />
              </button>
            ) : (
              <button
                type="submit"
                className="btn-primary"
                disabled={!formData.preferredDate || !formData.preferredTime || loading}
              >
                <Icon name="CalendarIcon" size={16} />
                {loading ? 'Booking...' : 'Book Appointment'}
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
