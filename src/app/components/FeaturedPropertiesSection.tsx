'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import { useRealtime } from '@/lib/database/useRealtime';


import type { Property } from '@/lib/database/types';

interface FeaturedPropertiesSectionProps {
  properties: Property[];
}

function PropertyCard({ property }: { property: Property }) {
  const [wishlisted, setWishlisted] = React.useState(false);

  const handleSpotlight = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <div className="property-card spotlight-card group" onMouseMove={handleSpotlight}>
      {/* Image */}
      <Link href={`/property-detail/${property.id}`} className="block relative overflow-hidden" style={{ height: '220px' }}>
        <AppImage
          src={property.image}
          alt={property.image_alt ?? ''}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Overlay gradient */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 50%)' }}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2 z-10">
          {property.badge && (
            <span
              className="text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{ backgroundColor: 'var(--accent)', color: 'var(--foreground)' }}
            >
              {property.badge}
            </span>
          )}
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${property.status === 'Buy' ? 'tag-buy' : 'tag-rent'}`}
          >
            {property.status}
          </span>
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => { e.preventDefault(); setWishlisted(!wishlisted); }}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
          style={{ backgroundColor: wishlisted ? 'var(--accent)' : 'rgba(255,255,255,0.9)' }}
        >
          <Icon
            name="HeartIcon"
            size={16}
            variant={wishlisted ? 'solid' : 'outline'}
            className={wishlisted ? 'text-white' : ''}
            style={{ color: wishlisted ? 'white' : 'var(--primary)' }}
          />
        </button>

        {/* Price */}
        <div className="absolute bottom-3 left-3 z-10">
          <span
            className="font-display font-bold text-white text-xl"
            style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}
          >
            {property.price_display}
          </span>
        </div>
      </Link>

      {/* Info */}
      <div className="p-4">
        <Link href={`/property-detail/${property.id}`} className="block">
          <h3
            className="font-display font-semibold text-base mb-1 line-clamp-1 group-hover:text-primary transition-colors"
            style={{ color: 'var(--foreground)' }}
          >
            {property.title}
          </h3>
        </Link>
        <p
          className="text-sm flex items-center gap-1.5 mb-3"
          style={{ color: 'var(--muted-foreground)' }}
        >
          <Icon name="MapPinIcon" size={13} style={{ color: 'var(--accent)' }} />
          {property.location}
        </p>

        {/* Stats row */}
        <div
          className="flex items-center gap-4 pt-3 border-t text-[10px] font-medium"
          style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}
        >
          <span className="flex items-center gap-1">
            <Icon name="HomeIcon" size={11} style={{ color: 'var(--primary)' }} />
            {property.bhk} BHK
          </span>
          <span className="flex items-center gap-1">
            <Icon name="Squares2X2Icon" size={11} style={{ color: 'var(--primary)' }} />
            {property.sqft.toLocaleString('en-IN')} sqft
          </span>
        </div>

        <Link
          href={`/property-detail/${property.id}`}
          className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-bold transition-all border-2 border-primary text-primary hover:bg-primary hover:text-white"
        >
          View Full Details
          <Icon name="ArrowRightIcon" size={14} />
        </Link>
      </div>

    </div>
  );
}

export default function FeaturedPropertiesSection({ properties: initialProperties }: FeaturedPropertiesSectionProps) {
  const allProperties = useRealtime(initialProperties, 'properties');
  const properties = allProperties.filter(p => !!p.featured).slice(0, 3);
  const sectionRef = useRef<HTMLElement>(null);



  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.property-card-animate');
            cards.forEach((card, i) => {
              (card as HTMLElement).style.transitionDelay = `${i * 80}ms`;
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
    <section
      ref={sectionRef}
      className="py-20"
      style={{ backgroundColor: 'var(--background-alt)' }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <p className="section-label mb-3">Handpicked for You</p>
            <h2
              className="font-display font-bold"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: 'var(--foreground)' }}
            >
              Featured Properties
            </h2>
            <p
              className="mt-2 text-sm leading-relaxed max-w-md"
              style={{ color: 'var(--muted-foreground)' }}
            >
              Curated premium listings verified by our expert agents across India's top cities.
            </p>
          </div>
          <Link
            href="/property-listings"
            className="btn-secondary shrink-0 self-start sm:self-auto"
          >
            View All Properties
            <Icon name="ArrowRightIcon" size={16} />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property: Property) => (
            <div
              key={property.id}
              className="property-card-animate opacity-0 translate-y-8 transition-all duration-500"
            >
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
