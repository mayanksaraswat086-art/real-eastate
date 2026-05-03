import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getAgentById } from '@/lib/database/queries';
import AgentProfilePage from '@/app/agents/components/AgentProfilePage';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const agent = await getAgentById(id);
  
  if (!agent) return { title: 'Agent Not Found — LuxEstate' };
  
  return {
    title: `${agent.name} — ${agent.designation} at LuxEstate`,
    description: agent.bio || `Connect with ${agent.name}, ${agent.designation} specializing in ${agent.speciality}.`,
  };
}

export default async function AgentDetailPage({ params }: PageProps) {
  const { id } = await params;
  const agent = await getAgentById(id);

  if (!agent) {
    notFound();
  }

  return (
    <main className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      <Header />
      <AgentProfilePage agent={agent} />
      <Footer />
    </main>
  );
}
