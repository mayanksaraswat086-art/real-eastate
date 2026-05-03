'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const similarProps = [
  {
    id: 'prop-010',
    title: 'Luxury 4BHK, Juhu',
    price: '₹5.1 Cr',
    location: 'Juhu, Mumbai',
    bhk: 4,
    sqft: 3500,
    type: 'Villa',
    status: 'Buy' as const,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1eb26f09a-1769253014765.png',
    imageAlt:
      'Luxury villa with pool in Juhu Mumbai, warm evening light, tropical garden, modern architecture',
  },
  {
    id: 'prop-011',
    title: 'Seafront Penthouse, Worli',
    price: '₹8.5 Cr',
    location: 'Worli, Mumbai',
    bhk: 5,
    sqft: 4200,
    type: 'Penthouse',
    status: 'Buy' as const,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1294012e5-1770501056157.png',
    imageAlt:
      'Penthouse living room with panoramic sea view, floor-to-ceiling glass, modern interior, bright natural light',
  },
  {
    id: 'prop-012',
    title: 'Classic Bungalow, Pali Hill',
    price: '₹6.8 Cr',
    location: 'Pali Hill, Bandra',
    bhk: 4,
    sqft: 3800,
    type: 'Bungalow',
    status: 'Buy' as const,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1e80cba39-1767519904326.png',
    imageAlt:
      'Classic Bandra bungalow with heritage facade, lush garden, warm afternoon light, quiet residential street',
  },
  {
    id: 'prop-013',
    title: 'Modern 3BHK, Andheri West',
    price: '₹2.2 Cr',
    location: 'Andheri West, Mumbai',
    bhk: 3,
    sqft: 1700,
    type: 'Apartment',
    status: 'Buy' as const,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1f87baa61-1776096341644.png',
    imageAlt:
      'Modern apartment balcony with city view, contemporary furniture, bright morning light, Andheri Mumbai',
  },
];

export default function SimilarProperties({ currentId }: { currentId: string }) {
  const railRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!railRef.current) return;
    railRef.current.scrollBy({ left: dir === 'right' ? 320 : -320, behavior: 'smooth' });
  };

  const props = similarProps.filter((p) => p.id !== currentId);

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-display font-semibold text-xl" style={{ color: 'var(--foreground)' }}>
          Similar Properties
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="w-9 h-9 rounded-full border flex items-center justify-center transition-all hover:border-primary"
            style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}
            aria-label="Scroll left"
          >
            <Icon name="ArrowLeftIcon" size={15} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
            style={{ backgroundColor: 'var(--primary)', color: 'white' }}
            aria-label="Scroll right"
          >
            <Icon name="ArrowRightIcon" size={15} />
          </button>
        </div>
      </div>

      <div ref={railRef} className="flex gap-4 overflow-x-auto scrollbar-hide snap-scroll pb-2">
        {props.map((prop) => (
          <div
            key={prop.id}
            className="snap-item shrink-0 property-card group overflow-hidden"
            style={{ width: '260px' }}
          >
            <div className="relative overflow-hidden" style={{ height: '160px' }}>
              <AppImage
                src={prop.image}
                alt={prop.imageAlt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="260px"
              />

              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 55%)',
                }}
              />
              <div className="absolute top-2 left-2">
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${prop.status === 'Buy' ? 'tag-buy' : 'tag-rent'}`}
                >
                  {prop.status}
                </span>
              </div>
              <div className="absolute bottom-2 left-2">
                <span
                  className="font-display font-bold text-white text-base"
                  style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}
                >
                  {prop.price}
                </span>
              </div>
            </div>
            <div className="p-3">
              <h3
                className="font-semibold text-sm mb-0.5 line-clamp-1 group-hover:text-primary transition-colors"
                style={{ color: 'var(--foreground)' }}
              >
                {prop.title}
              </h3>
              <p
                className="text-xs flex items-center gap-1 mb-2"
                style={{ color: 'var(--muted-foreground)' }}
              >
                <Icon name="MapPinIcon" size={11} style={{ color: 'var(--accent)' }} />
                {prop.location}
              </p>
              <div
                className="flex items-center gap-2 text-xs"
                style={{ color: 'var(--muted-foreground)' }}
              >
                <span>{prop.bhk} BHK</span>
                <span>·</span>
                <span>{prop.sqft.toLocaleString('en-IN')} sqft</span>
                <Link
                  href="/property-detail"
                  className="ml-auto font-semibold text-xs flex items-center gap-0.5 transition-colors"
                  style={{ color: 'var(--primary)' }}
                >
                  View <Icon name="ArrowRightIcon" size={10} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
