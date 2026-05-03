import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

const quickLinks = [
  { label: 'Properties', href: '/property-listings' },
  { label: 'Buy', href: '/property-listings?status=Buy' },
  { label: 'Rent', href: '/property-listings?status=Rent' },
  { label: 'Sell', href: '/property-listings' },
  { label: 'Agents', href: '/agents' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export default function Footer() {
  return (
    <footer
      className="border-t"
      style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)' }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        <div className="flex flex-col lg:flex-row gap-12 justify-between">
          {/* Brand + tagline */}
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <AppLogo size={36} />
              <span className="font-display text-xl font-bold" style={{ color: 'var(--primary)' }}>
                LuxEstate
              </span>
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
              India's trusted premium property platform. Verified listings, expert agents, and
              seamless real estate journeys across top cities.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {[
                { icon: 'DevicePhoneMobileIcon', label: 'Instagram', href: '#' },
                { icon: 'GlobeAltIcon', label: 'LinkedIn', href: '#' },
                { icon: 'ChatBubbleLeftIcon', label: 'Twitter', href: '#' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full flex items-center justify-center border transition-colors hover:border-primary hover:text-primary"
                  style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}
                >
                  <Icon name={social.icon as any} size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: 'var(--accent)' }}
            >
              Quick Links
            </p>
            <ul className="flex flex-wrap gap-x-8 gap-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium transition-colors hover:text-primary"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="shrink-0">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: 'var(--accent)' }}
            >
              Contact
            </p>
            <div
              className="flex flex-col gap-2 text-sm"
              style={{ color: 'var(--muted-foreground)' }}
            >
              <a
                href="tel:+911800123456"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Icon name="PhoneIcon" size={14} />
                +91 1800-123-456
              </a>
              <a
                href="mailto:hello@luxestate.in"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Icon name="EnvelopeIcon" size={14} />
                hello@luxestate.in
              </a>
              <span className="flex items-center gap-2">
                <Icon name="MapPinIcon" size={14} />
                Mumbai, Maharashtra, India
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs"
          style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}
        >
          <span>© 2026 LuxEstate. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
