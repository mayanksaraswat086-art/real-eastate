'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Properties', href: '/property-listings' },
  { label: 'Buy', href: '/property-listings?status=Buy' },
  { label: 'Rent', href: '/property-listings?status=Rent' },
  { label: 'Agents', href: '/agents' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

import { useRealtime } from '@/lib/database/useRealtime';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [properties, setProperties] = useState<any[]>([]);

  useEffect(() => {
    // Fetch initial properties to start realtime sync
    const fetchProps = async () => {
      const { createClient } = await import('@/lib/supabase/client');
      const supabase = createClient();
      const { data } = await supabase.from('properties').select('id');
      setProperties(data || []);
    };
    fetchProps();
  }, []);

  const syncedProperties = useRealtime(properties, 'properties');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      {/* Top announcement bar */}
      <div
        className="w-full h-10 flex items-center justify-between px-4 md:px-8"
        style={{ backgroundColor: 'var(--accent)', color: 'var(--foreground)' }}
      >
        <div className="flex items-center gap-4 text-xs font-medium">
          <a
            href="tel:+911800123456"
            className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
          >
            <Icon name="PhoneIcon" size={13} variant="solid" />
            <span>+91 1800-123-456</span>
          </a>
          <a
            href="https://wa.me/911800123456"
            className="hidden sm:flex items-center gap-1.5 hover:opacity-80 transition-opacity"
          >
            <Icon name="ChatBubbleLeftIcon" size={13} variant="solid" />
            <span>WhatsApp Us</span>
          </a>
        </div>
        <div className="flex items-center gap-3 text-xs font-medium">
          <span className="hidden sm:inline">Mon–Sat: 9AM – 7PM IST</span>
          <div className="flex items-center gap-2">
            <a href="#" aria-label="Instagram" className="hover:opacity-70 transition-opacity">
              <Icon name="GlobeAltIcon" size={13} />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:opacity-70 transition-opacity">
              <Icon name="GlobeAltIcon" size={13} />
            </a>
          </div>
        </div>
      </div>
      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'shadow-lg' : ''}`}
        style={{ backgroundColor: 'var(--primary)', height: '72px' }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <AppLogo size={36} />
            <span className="font-display text-xl font-bold tracking-tight text-white hidden sm:block">
              LuxEstate
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks?.map((link) => (
              <Link
                key={link?.label}
                href={link?.href}
                className="text-sm font-medium text-white/80 hover:text-white px-3 py-2 rounded-md transition-colors hover:bg-white/10 flex items-center gap-1.5"
              >
                {link?.label}
                {link.label === 'Properties' && syncedProperties.length > 0 && (
                  <span className="bg-accent text-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {syncedProperties.length}
                  </span>
                )}
              </Link>
            ))}
          </nav>


          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/book-appointment"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200"
              style={{ backgroundColor: 'var(--accent)', color: 'var(--foreground)' }}
            >
              <Icon name="CalendarIcon" size={16} />
              Book Appointment
            </Link>
            <button
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-white hover:bg-white/10 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <Icon name={menuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={22} />
            </button>
          </div>
        </div>
      </header>
      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(45,80,22,0.96)' }}
          onClick={() => setMenuOpen(false)}
        >
          <div className="flex flex-col pt-6 px-6 gap-1" onClick={(e) => e?.stopPropagation()}>
            {navLinks?.map((link) => (
              <Link
                key={link?.label}
                href={link?.href}
                onClick={() => setMenuOpen(false)}
                className="text-lg font-medium text-white/90 hover:text-white py-3 border-b border-white/10 transition-colors flex items-center justify-between"
              >
                {link?.label}
                {link.label === 'Properties' && syncedProperties.length > 0 && (
                  <span className="bg-accent text-foreground text-xs font-bold px-2.5 py-0.5 rounded-full">
                    {syncedProperties.length}
                  </span>
                )}
              </Link>
            ))}

            <Link
              href="/book-appointment"
              onClick={() => setMenuOpen(false)}
              className="mt-6 inline-flex items-center justify-center gap-2 text-base font-semibold px-6 py-3 rounded-lg"
              style={{ backgroundColor: 'var(--accent)', color: 'var(--foreground)' }}
            >
              <Icon name="CalendarIcon" size={18} />
              Book Appointment
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
