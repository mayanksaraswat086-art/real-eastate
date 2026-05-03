'use client';

import React, { useRef, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

const benefits = [
  {
    icon: 'ShieldCheckIcon' as const,
    title: 'Verified Listings Only',
    desc: 'Every property is physically verified by our agents before going live. Zero fake listings — guaranteed.',
    color: '#2D5016',
  },
  {
    icon: 'UserGroupIcon' as const,
    title: 'Expert Local Agents',
    desc: 'Our 50+ agents have 8+ years of average experience and deep knowledge of their respective cities.',
    color: '#C9A84C',
  },
  {
    icon: 'BoltIcon' as const,
    title: 'Fast & Easy Process',
    desc: 'From search to possession in as few as 14 days. Our streamlined process removes every friction point.',
    color: '#2D5016',
  },
  {
    icon: 'ClockIcon' as const,
    title: '24/7 Support',
    desc: 'Got a question at midnight? Our dedicated support team is always available via call, chat, or WhatsApp.',
    color: '#C9A84C',
  },
];

export default function WhyChooseUsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.why-item');
            items.forEach((item, i) => {
              setTimeout(() => {
                item.classList.add('opacity-100', 'translate-y-0');
                item.classList.remove('opacity-0', 'translate-y-8');
              }, i * 120);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20" style={{ backgroundColor: 'var(--background)' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Left: Text + visual */}
          <div className="lg:col-span-2 why-item opacity-0 translate-y-8 transition-all duration-700">
            <p className="section-label mb-3">Why LuxEstate</p>
            <h2
              className="font-display font-bold mb-6"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: 'var(--foreground)' }}
            >
              The Smarter Way to Buy, Rent & Sell
            </h2>
            <p
              className="leading-relaxed mb-8"
              style={{ color: 'var(--muted-foreground)', fontSize: '1rem' }}
            >
              We've helped 3,200+ families find their perfect home. Our platform combines
              technology, local expertise, and a genuine commitment to making real estate
              effortless.
            </p>

            {/* Visual stat card */}
            <div
              className="rounded-2xl p-6 relative overflow-hidden"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10"
                style={{ backgroundColor: 'var(--accent)', transform: 'translate(30%, -30%)' }}
              />
              <div className="relative z-10">
                <p className="text-white/70 text-sm font-medium mb-1">Average time to close</p>
                <p
                  className="font-display font-bold text-white mb-1"
                  style={{ fontSize: '2.8rem', lineHeight: 1 }}
                >
                  14
                </p>
                <p
                  className="font-display font-semibold"
                  style={{ color: 'var(--accent)', fontSize: '1.2rem' }}
                >
                  Days
                </p>
                <p className="text-white/60 text-xs mt-3">vs. industry average of 45+ days</p>
              </div>
            </div>
          </div>

          {/* Right: Benefit cards grid */}
          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-5">
            {benefits.map((benefit, i) => (
              <div
                key={benefit.title}
                className="why-item opacity-0 translate-y-8 transition-all duration-700 rounded-2xl p-6 border spotlight-card group cursor-default"
                style={{
                  backgroundColor: 'var(--card)',
                  borderColor: 'var(--border)',
                  transitionDelay: `${(i + 1) * 100}ms`,
                }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                  e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor:
                      benefit.color === '#2D5016' ? 'var(--accent-light)' : 'rgba(45,80,22,0.08)',
                  }}
                >
                  <Icon name={benefit.icon} size={22} style={{ color: benefit.color }} />
                </div>
                <h3 className="font-semibold text-base mb-2" style={{ color: 'var(--foreground)' }}>
                  {benefit.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
