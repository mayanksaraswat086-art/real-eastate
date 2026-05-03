'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { useRealtime } from '@/lib/database/useRealtime';
import type { Agent } from '@/lib/database/types';

interface FeaturedAgentsSectionProps {
  agents: Agent[];
}

function AgentCard({ agent, index }: { agent: Agent; index: number }) {
  return (
    <div
      className="agent-card opacity-0 translate-y-8 transition-all duration-700 rounded-2xl overflow-hidden border group"
      style={{
        backgroundColor: 'var(--card)',
        borderColor: 'var(--border)',
        transitionDelay: `${index * 120}ms`,
      }}
    >
      {/* Photo */}
      <div className="relative overflow-hidden" style={{ height: '260px' }}>
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

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="badge">{agent.city}</span>
          <span className="badge">{agent.speciality}</span>
        </div>

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


export default function FeaturedAgentsSection({ agents: initialAgents }: FeaturedAgentsSectionProps) {
  const agents = useRealtime(initialAgents, 'agents');
  const sectionRef = useRef<HTMLElement>(null);


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.agent-card').forEach((card) => {
              card.classList.add('opacity-100', 'translate-y-0');
              card.classList.remove('opacity-0', 'translate-y-8');
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20" style={{ backgroundColor: 'var(--background)' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <p className="section-label mb-3">Our Team</p>
            <h2
              className="font-display font-bold"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: 'var(--foreground)' }}
            >
              Meet Your Expert Agents
            </h2>
            <p
              className="mt-2 text-sm leading-relaxed max-w-md"
              style={{ color: 'var(--muted-foreground)' }}
            >
              50+ dedicated specialists across 12 cities — each with deep local market knowledge.
            </p>
          </div>
          <Link href="/agents" className="btn-secondary shrink-0 self-start sm:self-auto">
            All Agents
            <Icon name="ArrowRightIcon" size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent: Agent, i) => (
            <AgentCard key={agent.id} agent={agent} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
