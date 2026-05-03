import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AgentsPageContent from '@/app/agents/AgentsPageContent';
import { getAgents } from '@/lib/database/queries';

export const metadata: Metadata = {
  title: 'Our Expert Agents — LuxEstate',
  description:
    'Meet 50+ verified real estate agents across India. Expert local knowledge, trusted service, and dedicated support for your property journey.',
};

export default async function AgentsPage() {
  const agents = await getAgents();
  return (
    <main className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      <Header />
      <AgentsPageContent agents={agents} />
      <Footer />
    </main>
  );
}
