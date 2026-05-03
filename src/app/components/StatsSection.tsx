'use client';

import React, { useRef, useEffect, useState } from 'react';

const stats = [
  { value: 247, suffix: '+', label: 'Active Listings', desc: 'Verified properties' },
  { value: 3200, suffix: '+', label: 'Happy Clients', desc: 'Since 2019' },
  { value: 12, suffix: '', label: 'Cities Covered', desc: 'Across India' },
  { value: 6, suffix: ' Yrs', label: 'Experience', desc: 'Market expertise' },
];

function CountUp({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    const duration = 1800;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [active, target]);

  return (
    <span className="count-up">
      {count.toLocaleString('en-IN')}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="py-16 relative overflow-hidden"
      style={{ backgroundColor: 'var(--primary)' }}
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 50%, var(--accent) 0%, transparent 50%), radial-gradient(circle at 80% 50%, var(--accent) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p
                className="font-display font-bold mb-1"
                style={{
                  fontSize: 'clamp(2rem, 5vw, 3.2rem)',
                  color: 'var(--accent)',
                  lineHeight: 1.1,
                }}
              >
                <CountUp target={stat.value} suffix={stat.suffix} active={active} />
              </p>
              <p className="font-semibold text-white mb-0.5" style={{ fontSize: '1rem' }}>
                {stat.label}
              </p>
              <p className="text-white/50 text-xs">{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
