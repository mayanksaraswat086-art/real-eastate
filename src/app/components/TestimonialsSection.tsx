'use client';

import React, { useRef, useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import type { Testimonial } from '@/lib/database/types';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (dir: 'left' | 'right') => {
    if (!railRef.current) return;
    railRef.current.scrollBy({ left: dir === 'right' ? 480 : -480, behavior: 'smooth' });
  };

  const handleScroll = () => {
    if (!railRef.current) return;
    setCanScrollLeft(railRef.current.scrollLeft > 10);
    setCanScrollRight(
      railRef.current.scrollLeft < railRef.current.scrollWidth - railRef.current.clientWidth - 10
    );
  };

  return (
    <section className="py-20" style={{ backgroundColor: 'var(--background-alt)' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <p className="section-label mb-3">Client Stories</p>
            <h2
              className="font-display font-bold"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: 'var(--foreground)' }}
            >
              What Our Clients Say
            </h2>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="w-11 h-11 rounded-full border flex items-center justify-center transition-all"
              style={{
                borderColor: canScrollLeft ? 'var(--primary)' : 'var(--border)',
                color: canScrollLeft ? 'var(--primary)' : 'var(--muted-foreground)',
                opacity: canScrollLeft ? 1 : 0.5,
              }}
              aria-label="Previous testimonials"
            >
              <Icon name="ArrowLeftIcon" size={18} />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="w-11 h-11 rounded-full flex items-center justify-center transition-all"
              style={{
                backgroundColor: canScrollRight ? 'var(--primary)' : 'var(--border)',
                color: 'white',
                opacity: canScrollRight ? 1 : 0.5,
              }}
              aria-label="Next testimonials"
            >
              <Icon name="ArrowRightIcon" size={18} />
            </button>
          </div>
        </div>

        {/* Rail */}
        <div className="relative">
          {/* Edge fades */}
          <div
            className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, var(--background-alt), transparent)' }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, var(--background-alt), transparent)' }}
          />

          <div
            ref={railRef}
            onScroll={handleScroll}
            className="flex gap-5 overflow-x-auto scrollbar-hide pb-4 snap-scroll"
            style={{ paddingLeft: '4px', paddingRight: '4px' }}
          >
            {testimonials.map((t) => (
              <article
                key={t.id}
                className={`snap-item shrink-0 rounded-2xl p-7 border shadow-sm ${t.rotate} hover:rotate-0 transition-all duration-300 hover:shadow-md`}
                style={{
                  width: 'clamp(300px, 80vw, 420px)',
                  backgroundColor: 'var(--card)',
                  borderColor: 'var(--border)',
                }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Icon
                      key={i}
                      name="StarIcon"
                      size={14}
                      variant="solid"
                      style={{ color: 'var(--accent)' }}
                    />
                  ))}
                </div>

                {/* Quote */}
                <p
                  className="text-sm leading-relaxed mb-6 italic"
                  style={{ color: 'var(--foreground)' }}
                >
                  "{t.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl overflow-hidden shrink-0">
                    <AppImage
                      src={t.photo}
                      alt={t.photo_alt ?? ''}
                      width={44}
                      height={44}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: 'var(--foreground)' }}>
                      {t.name}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                      {t.role}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
