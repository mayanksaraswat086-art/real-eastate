import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactPageContent from '@/app/contact/ContactPageContent';

export const metadata: Metadata = {
  title: 'Contact Us — LuxEstate',
  description:
    'Get in touch with LuxEstate. Call, WhatsApp, or email us for property enquiries, agent support, or partnership opportunities.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      <Header />
      <ContactPageContent />
      <Footer />
    </main>
  );
}
