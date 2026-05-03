'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const heroSlides = [
  {
    id: 1,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_10efa58fb-1765517565758.png',
    alt: 'Luxury modern villa with pool, warm afternoon light, manicured gardens, deep shadow foreground',
    headline: 'Find Your Perfect',
    highlight: 'Dream Home',
    sub: 'Discover 200+ verified premium properties across Mumbai, Pune, Bengaluru and beyond.',
  },
  {
    id: 2,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1e0e19bc4-1772132427610.png',
    alt: 'Elegant apartment interior with city skyline view, golden hour light, minimal furnishing, dark walls',
    headline: 'Premium Rentals',
    highlight: 'Made Simple',
    sub: 'From furnished apartments to luxury penthouses — rent with confidence through verified listings.',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1603805893787-2fddc4f7e1e4',
    alt: 'Grand colonial bungalow exterior, lush green landscaping, evening light, long driveway, dramatic sky',
    headline: 'Sell Faster,',
    highlight: 'Earn More',
    sub: "List your property with India's most trusted real estate platform and reach 50,000+ buyers.",
  },
];

const propertyTypes = ['All Types', 'Apartment', 'Villa', 'Plot', 'Commercial'];
const budgets = ['Any Budget', 'Under ₹50L', '₹50L–₹1Cr', '₹1Cr–₹3Cr', '₹3Cr+'];
const cities = ['Any City', 'Mumbai', 'Pune', 'Bengaluru', 'Hyderabad', 'Delhi NCR', 'Chennai'];

export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [city, setCity] = useState('Any City');
  const [type, setType] = useState('All Types');
  const [budget, setBudget] = useState('Any Budget');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goToSlide = (index: number) => {
    if (isAnimating || index === activeSlide) return;
    setIsAnimating(true);
    setActiveSlide(index);
    setTimeout(() => setIsAnimating(false), 700);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5500);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const slide = heroSlides[activeSlide];

  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: '90vh' }}>
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        {heroSlides.map((s, i) => (
          <div
            key={s.id}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === activeSlide ? 1 : 0 }}
          >
            <AppImage
              src={s.image}
              alt={s.alt}
              fill
              priority={i === 0}
              className="object-cover"
              sizes="100vw"
            />
          </div>
        ))}
        {/* Dark scrim — white text needs strong overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.72) 100%)',
          }}
        />
        {/* Bottom green gradient for search bar blending */}
        <div
          className="absolute bottom-0 left-0 right-0 h-48"
          style={{ background: 'linear-gradient(to top, rgba(45,80,22,0.3), transparent)' }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 z-0 bg-grid-warm bg-grid-60 mask-radial-fade opacity-30" />

      {/* Content */}
      <div
        className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 flex flex-col justify-center"
        style={{ minHeight: '90vh', paddingTop: '80px', paddingBottom: '40px' }}
      >
        <div className="max-w-3xl">
          {/* Slide label */}
          <div
            className="flex items-center gap-3 mb-6 animate-fade-up"
            style={{ animationDelay: '0.1s' }}
          >
            <span className="w-8 h-px" style={{ backgroundColor: 'var(--accent)' }} />
            <span className="text-xs font-semibold uppercase tracking-widest text-white/80">
              Premium Real Estate
            </span>
          </div>

          {/* Main headline */}
          <h1
            className="font-display font-bold text-white leading-none mb-6 animate-clip-in"
            style={{ fontSize: 'clamp(2.8rem, 7vw, 6rem)', animationDelay: '0.2s' }}
          >
            {slide.headline}
            <br />
            <span style={{ color: 'var(--accent)' }}>{slide.highlight}</span>
          </h1>

          {/* Sub */}
          <p
            className="text-white/80 text-lg leading-relaxed mb-10 max-w-xl animate-fade-up"
            style={{ animationDelay: '0.4s', fontSize: 'clamp(1rem, 2vw, 1.2rem)' }}
          >
            {slide.sub}
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-wrap gap-4 mb-16 animate-fade-up"
            style={{ animationDelay: '0.5s' }}
          >
            <Link
              href="/property-listings"
              className="btn-primary text-base px-8 py-4 rounded-xl font-semibold shadow-lg"
            >
              <Icon name="MagnifyingGlassIcon" size={18} />
              Search Properties
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 text-base font-semibold px-8 py-4 rounded-xl border-2 border-white/40 text-white hover:bg-white/10 transition-all"
            >
              <Icon name="PlayCircleIcon" size={18} />
              Virtual Tour
            </Link>
          </div>
        </div>

        {/* Quick Search Bar */}
        <div className="w-full max-w-4xl animate-fade-up" style={{ animationDelay: '0.6s' }}>
          <div className="glass-card rounded-2xl p-2 shadow-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {/* City */}
              <div className="relative">
                <div
                  className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: 'var(--primary)' }}
                >
                  <Icon name="MapPinIcon" size={16} />
                </div>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full pl-9 pr-4 py-3.5 rounded-xl text-sm font-medium border-0 outline-none cursor-pointer appearance-none"
                  style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}
                  aria-label="Select city"
                >
                  {cities.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Type */}
              <div className="relative">
                <div
                  className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: 'var(--primary)' }}
                >
                  <Icon name="HomeIcon" size={16} />
                </div>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full pl-9 pr-4 py-3.5 rounded-xl text-sm font-medium border-0 outline-none cursor-pointer appearance-none"
                  style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}
                  aria-label="Select property type"
                >
                  {propertyTypes.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* Budget */}
              <div className="relative">
                <div
                  className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: 'var(--primary)' }}
                >
                  <Icon name="BanknotesIcon" size={16} />
                </div>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full pl-9 pr-4 py-3.5 rounded-xl text-sm font-medium border-0 outline-none cursor-pointer appearance-none"
                  style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}
                  aria-label="Select budget"
                >
                  {budgets.map((b) => (
                    <option key={b}>{b}</option>
                  ))}
                </select>
              </div>

              {/* Search Button */}
              <Link
                href="/property-listings"
                className="flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-semibold text-sm transition-all duration-200"
                style={{ backgroundColor: 'var(--primary)', color: 'white' }}
              >
                <Icon name="MagnifyingGlassIcon" size={18} />
                Search
              </Link>
            </div>
          </div>
        </div>

        {/* Slide indicators */}
        <div
          className="flex items-center gap-2 mt-8 animate-fade-up"
          style={{ animationDelay: '0.7s' }}
        >
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="transition-all duration-300 rounded-full"
              style={{
                width: i === activeSlide ? '32px' : '8px',
                height: '8px',
                backgroundColor: i === activeSlide ? 'var(--accent)' : 'rgba(255,255,255,0.4)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 right-6 z-10 flex flex-col items-center gap-2 text-white/50 animate-float">
        <span className="text-xs tracking-widest uppercase" style={{ writingMode: 'vertical-rl' }}>
          Scroll
        </span>
        <Icon name="ArrowDownIcon" size={14} />
      </div>
    </section>
  );
}
