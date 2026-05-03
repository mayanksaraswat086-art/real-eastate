import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookAppointmentContent from './BookAppointmentContent';

export const metadata: Metadata = {
  title: 'Book an Appointment — LuxEstate',
  description:
    'Schedule a consultation with our real estate experts. Choose your service type, preferred date and time, and get personalized assistance.',
};

import { getAgents } from '@/lib/database/queries';

export default async function BookAppointmentPage() {
  const agents = await getAgents();

  return (
    <main className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      <Header />
      <BookAppointmentContent agents={agents} />
      <Footer />
    </main>
  );
}
