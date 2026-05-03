'use client';

import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { useRealtime } from '@/lib/database/useRealtime';
import type { Agent } from '@/lib/database/types';

interface AgentsPageContentProps {
  agents: Agent[];
}

function AgentCard({ agent }: { agent: Agent }) {
  return (
    <div
      className="rounded-2xl overflow-hidden border group transition-all duration-300 hover:shadow-lg"
      style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
    >
      {/* Photo */}
      <div className="relative overflow-hidden" style={{ height: '280px' }}>
        <AppImage
          src={agent.photo}
          alt={agent.photo_alt ?? ''}
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(45,80,22,0.7) 0%, transparent 50%)' }}
        />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-1 mb-1">
            {[...Array(5)].map((_, i) => (
              <Icon
                key={i}
                name="StarIcon"
                size={12}
                variant="solid"
                style={{ color: 'var(--accent)' }}
              />
            ))}
            <span className="text-white text-xs ml-1 font-medium">
              {agent.rating} ({agent.reviews})
            </span>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <h3
          className="font-display font-semibold text-lg mb-0.5"
          style={{ color: 'var(--foreground)' }}
        >
          {agent.name}
        </h3>
        <p className="text-sm mb-3" style={{ color: 'var(--accent)' }}>
          {agent.designation}
        </p>

        <div className="flex flex-wrap gap-2 mb-3">
          <span className="badge">{agent.city}</span>
          <span className="badge">{agent.speciality}</span>
        </div>

        <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted-foreground)' }}>
          {agent.bio}
        </p>

        <div
          className="flex items-center justify-between text-xs mb-4"
          style={{ color: 'var(--muted-foreground)' }}
        >
          <span className="flex items-center gap-1">
            <Icon name="BriefcaseIcon" size={12} />
            {agent.experience} exp.
          </span>
          <span className="flex items-center gap-1">
            <Icon name="HomeIcon" size={12} />
            {agent.properties} properties
          </span>
        </div>

        <div className="flex gap-2 mb-4">
          <a
            href={`tel:${agent.phone}`}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all"
            style={{ backgroundColor: 'var(--primary)', color: 'white' }}
          >
            <Icon name="PhoneIcon" size={14} />
            Call
          </a>
          <a
            href={`https://wa.me/${(agent.whatsapp || agent.phone).replace(/\D/g, '')}`}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium border transition-all hover:bg-primary hover:text-white"
            style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}
          >
            <Icon name="ChatBubbleLeftIcon" size={14} />
            WhatsApp
          </a>
        </div>

        <Link
          href={`/agents/${agent.id}`}
          className="block w-full text-center py-2 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-primary transition-colors border-t border-gray-50 pt-4"
        >
          View Full Profile
        </Link>
      </div>
    </div>
  );
}


export default function AgentsPageContent({ agents: initialAgents }: AgentsPageContentProps) {
  const agents = useRealtime(initialAgents, 'agents');
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
            <span className="text-white">Agents</span>
          </nav>
          <h1
            className="font-display font-bold text-white mb-2"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
          >
            Our Expert Agents
          </h1>
          <p className="text-white/70 text-sm">
            50+ dedicated specialists across 12 cities — each with deep local market knowledge.
          </p>
        </div>
      </div>

      {/* Agents grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent: Agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </div>
    </>
  );
}
