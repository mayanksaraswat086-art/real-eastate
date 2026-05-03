'use client';

import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import type { Agent } from '@/lib/database/types';

interface AgentProfilePageProps {
  agent: Agent;
}

export default function AgentProfilePage({ agent }: AgentProfilePageProps) {
  return (
    <div className="bg-white">
      {/* Profile Header Section */}
      <div className="bg-primary pt-12 pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Icon name="ChevronRightIcon" size={14} />
            <Link href="/agents" className="hover:text-white transition-colors">Agents</Link>
            <Icon name="ChevronRightIcon" size={14} />
            <span className="text-white">{agent.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 -mt-16 md:-mt-24 pb-20">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col md:flex-row">
          {/* Left: Profile Image & Quick Stats */}
          <div className="md:w-1/3 p-8 border-b md:border-b-0 md:border-r border-gray-100 bg-gray-50/50">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-6 shadow-lg border-4 border-white">
              <AppImage 
                src={agent.photo} 
                alt={agent.photo_alt || agent.name} 
                fill 
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 font-medium">Experience</span>
                <span className="font-bold text-gray-900">{agent.experience}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 font-medium">Rating</span>
                <div className="flex items-center gap-1">
                  <Icon name="StarIcon" size={14} variant="solid" className="text-yellow-400" />
                  <span className="font-bold text-gray-900">{agent.rating} ({agent.reviews} reviews)</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 font-medium">Active Listings</span>
                <span className="font-bold text-primary">{agent.properties} Properties</span>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <a 
                href={`tel:${agent.phone}`}
                className="w-full btn-primary flex items-center justify-center gap-2 py-4 shadow-xl shadow-primary/20"
              >
                <Icon name="PhoneIcon" size={18} />
                Call Agent
              </a>
              <a 
                href={`https://wa.me/${agent.phone.replace(/\D/g, '')}`}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm border-2 border-primary text-primary hover:bg-primary/5 transition-all"
              >
                <Icon name="ChatBubbleLeftIcon" size={18} />
                Message on WhatsApp
              </a>
            </div>
          </div>

          {/* Right: Detailed Bio & Info */}
          <div className="md:w-2/3 p-8 md:p-12">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-2">{agent.name}</h1>
              <p className="text-lg text-accent font-medium">{agent.designation}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <Icon name="MapPinIcon" size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-gray-400 tracking-wider mb-1">City</p>
                  <p className="font-semibold text-gray-900">{agent.city}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
                  <Icon name="SparklesIcon" size={20} className="text-purple-600" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-gray-400 tracking-wider mb-1">Speciality</p>
                  <p className="font-semibold text-gray-900">{agent.speciality}</p>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-4">Professional Biography</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {agent.bio || `${agent.name} is a dedicated ${agent.designation} at LuxEstate with ${agent.experience} of experience in the ${agent.city} real estate market. Specializing in ${agent.speciality}, they have a proven track record of helping clients find their dream homes and high-yield investment properties.`}
              </p>
            </div>

            {/* Placeholder for Listings or Testimonials */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-dashed border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <Icon name="CheckCircleIcon" size={24} className="text-green-500" />
                <h3 className="font-bold text-gray-900">Verified Professional</h3>
              </div>
              <p className="text-sm text-gray-500">
                This agent has passed our 10-point verification process and is authorized to represent LuxEstate for all residential and commercial transactions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
