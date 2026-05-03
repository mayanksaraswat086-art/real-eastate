'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import EMICalculator from './EMICalculator';
import EnquiryForm from './EnquiryForm';
import SimilarProperties from './SimilarProperties';
import type { Property } from '@/lib/database/types';

interface PropertyDetailPageProps {
  property?: Property | null;
}

const defaultProperty = {
  id: 'prop-001',
  title: 'Sea-View Villa, Bandra West',
  price: '₹4.2 Cr',
  priceNum: 42000000,
  type: 'Villa',
  status: 'Buy',
  location: 'Bandra West, Mumbai, Maharashtra 400050',
  bhk: 4,
  sqft: 3200,
  floor: '3rd Floor',
  furnishing: 'Semi-Furnished',
  facing: 'West (Sea-Facing)',
  age: '2 Years',
  parking: '2 Covered',
  description:
    "A stunning 4BHK sea-facing villa nestled in the heart of Bandra West. This masterpiece of contemporary architecture offers unobstructed Arabian Sea views from every room. The villa features a private infinity pool, landscaped garden, Italian marble flooring, and a fully modular kitchen. Perfect for a family seeking luxury living in Mumbai's most coveted address. The building has 24/7 security with CCTV surveillance and a dedicated concierge service.",
  images: [
    {
      src: 'https://img.rocket.new/generatedImages/rocket_gen_img_1bd157f01-1772201310966.png',
      alt: 'Modern white villa exterior with infinity pool, sea view, lush garden, bright afternoon light',
    },
    {
      src: 'https://img.rocket.new/generatedImages/rocket_gen_img_13eeb1d95-1772218505274.png',
      alt: 'Villa terrace with panoramic sea view, outdoor furniture, golden hour sunset light',
    },
    {
      src: 'https://img.rocket.new/generatedImages/rocket_gen_img_16f11967e-1772186014693.png',
      alt: 'Villa living room interior, large windows with sea view, modern furniture, bright natural light',
    },
    {
      src: 'https://images.unsplash.com/photo-1676500850828-1f643aba7639',
      alt: 'Modern kitchen interior, marble countertop, white cabinets, natural light, clean minimalist design',
    },
    {
      src: 'https://img.rocket.new/generatedImages/rocket_gen_img_19fd64a92-1773164991403.png',
      alt: 'Master bedroom with sea view, king bed, neutral tones, floor-to-ceiling windows, morning light',
    },
  ],

  amenities: [
    { icon: 'SparklesIcon', label: 'Infinity Pool' },
    { icon: 'BoltIcon', label: 'Power Backup' },
    { icon: 'ShieldCheckIcon', label: '24/7 Security' },
    { icon: 'TruckIcon', label: '2 Car Parking' },
    { icon: 'WifiIcon', label: 'High-Speed WiFi' },
    { icon: 'HomeIcon', label: 'Concierge' },
    { icon: 'SunIcon', label: 'Sea View' },
    { icon: 'BuildingOfficeIcon', label: 'Club House' },
    { icon: 'HeartIcon', label: 'Kids Play Area' },
    { icon: 'StarIcon', label: 'Gym & Spa' },
    { icon: 'GlobeAltIcon', label: 'Smart Home' },
    { icon: 'CameraIcon', label: 'CCTV' },
  ],

  agent: {
    name: 'Priya Mehta',
    designation: 'Senior Property Consultant',
    photo: 'https://img.rocket.new/generatedImages/rocket_gen_img_15f4e23f6-1763300607163.png',
    photoAlt:
      'Professional Indian woman in formal attire, warm smile, office background, bright natural light',
    phone: '+91 98765 43210',
    whatsapp: '919876543210',
    email: 'priya.mehta@luxestate.in',
    experience: '9 years',
    properties: 38,
    rating: 4.9,
  },
};

export default function PropertyDetailPage({ property: dbProperty }: PropertyDetailPageProps) {
  const property = dbProperty
    ? {
        ...defaultProperty,
        id: dbProperty.id,
        title: dbProperty.title,
        price: dbProperty.price_display,
        priceNum: dbProperty.price,
        type: dbProperty.type,
        status: dbProperty.status,
        location: dbProperty.location,
        bhk: dbProperty.bhk,
        sqft: dbProperty.sqft,
        floor: dbProperty.floor || 'N/A',
        furnishing: dbProperty.furnishing || 'N/A',
        age: dbProperty.age || 'N/A',
        description: dbProperty.description || 'No description provided.',
        amenities: dbProperty.amenities && dbProperty.amenities.length > 0 
          ? dbProperty.amenities.map(a => ({
              icon: 'CheckCircleIcon',
              label: a
            })) 
          : [],
      }
    : defaultProperty;
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      {/* Breadcrumb */}
      <div
        className="py-4 border-b"
        style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <nav
            className="flex items-center gap-2 text-sm"
            style={{ color: 'var(--muted-foreground)' }}
          >
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <Icon name="ChevronRightIcon" size={14} />
            <Link href="/property-listings" className="hover:text-primary transition-colors">
              Properties
            </Link>
            <Icon name="ChevronRightIcon" size={14} />
            <span style={{ color: 'var(--foreground)' }}>Sea-View Villa, Bandra West</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Title row */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="badge">Villa</span>
              <span className="tag-buy text-xs font-semibold px-2.5 py-1 rounded-full">
                For Sale
              </span>
              <span className="badge">Featured</span>
            </div>
            <h1
              className="font-display font-bold mb-1"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: 'var(--foreground)' }}
            >
              {property.title}
            </h1>
            <p
              className="text-sm flex items-center gap-1.5"
              style={{ color: 'var(--muted-foreground)' }}
            >
              <Icon name="MapPinIcon" size={14} style={{ color: 'var(--accent)' }} />
              {property.location}
            </p>
          </div>
          <div className="text-left sm:text-right shrink-0">
            <p
              className="font-display font-bold"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: 'var(--primary)' }}
            >
              {property.price}
            </p>
            <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
              Negotiable
            </p>
          </div>
        </div>

        {/* Photo Gallery */}
        <div
          className="grid grid-cols-4 gap-3 mb-8 rounded-2xl overflow-hidden"
          style={{ height: 'clamp(320px, 45vw, 500px)' }}
        >
          {/* Main image */}
          <div
            className="col-span-4 md:col-span-2 relative rounded-xl overflow-hidden cursor-pointer group"
            style={{ height: '100%' }}
            onClick={() => setLightboxOpen(true)}
          >
            <AppImage
              src={property.images[activeImage].src}
              alt={property.images[activeImage].alt}
              fill
              priority
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            <div
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ backgroundColor: 'rgba(0,0,0,0.25)' }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
              >
                <Icon
                  name="MagnifyingGlassPlusIcon"
                  size={22}
                  style={{ color: 'var(--primary)' }}
                />
              </div>
            </div>
            <div
              className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg text-xs font-medium"
              style={{ backgroundColor: 'rgba(0,0,0,0.6)', color: 'white' }}
            >
              {activeImage + 1} / {property.images.length}
            </div>
          </div>

          {/* Thumbnails grid */}
          <div
            className="hidden md:grid md:col-span-2 grid-cols-2 gap-3"
            style={{ height: '100%' }}
          >
            {property.images.slice(1, 5).map((img, i) => (
              <div
                key={i}
                className="relative rounded-xl overflow-hidden cursor-pointer group"
                onClick={() => setActiveImage(i + 1)}
              >
                <AppImage
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="25vw"
                />

                <div
                  className="absolute inset-0 transition-opacity"
                  style={{
                    backgroundColor: activeImage === i + 1 ? 'rgba(45,80,22,0.35)' : 'transparent',
                  }}
                />

                {i === 3 && property.images.length > 5 && (
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}
                  >
                    <span className="font-semibold text-white text-sm">
                      +{property.images.length - 5} more
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Share + action row */}
        <div
          className="flex flex-wrap items-center gap-3 mb-8 pb-6 border-b"
          style={{ borderColor: 'var(--border)' }}
        >
          <span className="text-xs font-medium mr-1" style={{ color: 'var(--muted-foreground)' }}>
            Share:
          </span>
          <a
            href={`https://wa.me/?text=Check out this property: ${property.title} - ${property.price}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all hover:border-primary"
            style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}
          >
            <Icon name="ChatBubbleLeftIcon" size={13} />
            WhatsApp
          </a>
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all hover:border-primary"
            style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}
          >
            <Icon name="LinkIcon" size={13} />
            Copy Link
          </button>
          <a
            href="#"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all hover:border-primary"
            style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}
          >
            <Icon name="GlobeAltIcon" size={13} />
            Facebook
          </a>
          <div className="ml-auto flex gap-2">
            <button
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium border transition-all hover:border-primary"
              style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}
            >
              <Icon name="HeartIcon" size={14} />
              Save
            </button>
            <button
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-all"
              style={{ backgroundColor: 'var(--accent-light)', color: 'var(--primary)' }}
            >
              <Icon name="EyeIcon" size={14} />
              Virtual Tour
            </button>
          </div>
        </div>

        {/* Main 2-col layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Info Cards */}
            <div>
              <h2
                className="font-display font-semibold text-xl mb-5"
                style={{ color: 'var(--foreground)' }}
              >
                Property Details
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { icon: 'HomeIcon', label: 'BHK', value: `${property.bhk} BHK` },
                  {
                    icon: 'Squares2X2Icon',
                    label: 'Area',
                    value: `${property.sqft.toLocaleString('en-IN')} sqft`,
                  },
                  { icon: 'BuildingOfficeIcon', label: 'Floor', value: property.floor },
                  { icon: 'SparklesIcon', label: 'Furnishing', value: property.furnishing },
                  { icon: 'SunIcon', label: 'Facing', value: property.facing },
                  { icon: 'ClockIcon', label: 'Age', value: property.age },
                  { icon: 'TruckIcon', label: 'Parking', value: property.parking },
                  { icon: 'MapPinIcon', label: 'Type', value: property.type },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl p-4 border text-center"
                    style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center mx-auto mb-2"
                      style={{ backgroundColor: 'var(--accent-light)' }}
                    >
                      <Icon
                        name={item.icon as 'HomeIcon'}
                        size={16}
                        style={{ color: 'var(--primary)' }}
                      />
                    </div>
                    <p className="text-xs mb-0.5" style={{ color: 'var(--muted-foreground)' }}>
                      {item.label}
                    </p>
                    <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <h2
                className="font-display font-semibold text-xl mb-4"
                style={{ color: 'var(--foreground)' }}
              >
                About This Property
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                {property.description}
              </p>
            </div>

            {/* Amenities */}
            <div>
              <h2
                className="font-display font-semibold text-xl mb-5"
                style={{ color: 'var(--foreground)' }}
              >
                Amenities
              </h2>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                {property.amenities.map((amenity) => (
                  <div key={amenity.label} className="flex flex-col items-center gap-2 text-center">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: 'var(--accent-light)' }}
                    >
                      <Icon
                        name={amenity.icon as 'HomeIcon'}
                        size={20}
                        style={{ color: 'var(--primary)' }}
                      />
                    </div>
                    <span
                      className="text-xs font-medium leading-tight"
                      style={{ color: 'var(--muted-foreground)' }}
                    >
                      {amenity.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location Map placeholder */}
            <div>
              <h2
                className="font-display font-semibold text-xl mb-4"
                style={{ color: 'var(--foreground)' }}
              >
                Location
              </h2>
              <div
                className="rounded-2xl overflow-hidden border flex items-center justify-center relative"
                style={{
                  height: '280px',
                  backgroundColor: 'var(--muted)',
                  borderColor: 'var(--border)',
                }}
              >
                <AppImage
                  src="https://img.rocket.new/generatedImages/rocket_gen_img_121e7bf46-1777741732899.png"
                  alt="Map view of Bandra West Mumbai area, aerial satellite view, streets and coastline visible"
                  fill
                  className="object-cover opacity-60"
                  sizes="100vw"
                />

                <div className="relative z-10 flex flex-col items-center gap-3 text-center px-6">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: 'var(--primary)' }}
                  >
                    <Icon name="MapPinIcon" size={28} style={{ color: 'white' }} />
                  </div>
                  <div className="glass-card rounded-xl px-5 py-3">
                    <p className="font-semibold text-sm" style={{ color: 'var(--foreground)' }}>
                      Bandra West, Mumbai
                    </p>
                    <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                      Maharashtra 400050
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 mt-3">
                {[
                  '2 km to Sea Link',
                  '1.5 km to Bandra Station',
                  '3 km to Linking Road',
                  '5 km to BKC',
                ].map((landmark) => (
                  <span key={landmark} className="badge text-xs">
                    {landmark}
                  </span>
                ))}
              </div>
            </div>

            {/* EMI Calculator */}
            <EMICalculator propertyPrice={property.priceNum} />

            {/* Similar Properties */}
            <SimilarProperties currentId={property.id} />
          </div>

          {/* Right: Agent Card + Enquiry Form */}
          <div className="lg:col-span-1 space-y-6">
            {/* Sticky wrapper */}
            <div className="sticky top-24 space-y-5">
              {/* Agent Card */}
              <div
                className="rounded-2xl border overflow-hidden"
                style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
              >
                <div className="p-5">
                  <p
                    className="text-xs font-semibold uppercase tracking-wider mb-4"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    Listed By
                  </p>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0">
                      <AppImage
                        src={property.agent.photo}
                        alt={property.agent.photoAlt}
                        width={56}
                        height={56}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <p
                        className="font-display font-semibold text-base"
                        style={{ color: 'var(--foreground)' }}
                      >
                        {property.agent.name}
                      </p>
                      <p className="text-xs" style={{ color: 'var(--accent)' }}>
                        {property.agent.designation}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Icon
                            key={i}
                            name="StarIcon"
                            size={10}
                            variant="solid"
                            style={{ color: 'var(--accent)' }}
                          />
                        ))}
                        <span className="text-xs ml-1" style={{ color: 'var(--muted-foreground)' }}>
                          {property.agent.rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div
                    className="flex items-center gap-3 text-xs mb-4 pb-4 border-b"
                    style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}
                  >
                    <span className="flex items-center gap-1">
                      <Icon name="BriefcaseIcon" size={11} />
                      {property.agent.experience} exp.
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="HomeIcon" size={11} />
                      {property.agent.properties} listings
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <a
                      href={`tel:${property.agent.phone}`}
                      className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all"
                      style={{ backgroundColor: 'var(--primary)', color: 'white' }}
                    >
                      <Icon name="PhoneIcon" size={15} />
                      {property.agent.phone}
                    </a>
                    <a
                      href={`https://wa.me/${property.agent.whatsapp}`}
                      className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold border transition-all hover:bg-primary hover:text-white"
                      style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}
                    >
                      <Icon name="ChatBubbleLeftIcon" size={15} />
                      WhatsApp
                    </a>
                    <a
                      href={`mailto:${property.agent.email}`}
                      className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium border transition-all hover:border-primary"
                      style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}
                    >
                      <Icon name="EnvelopeIcon" size={15} />
                      Send Email
                    </a>
                  </div>
                </div>
              </div>

              {/* Enquiry Form */}
              <EnquiryForm
                propertyId={property.id}
                propertyTitle={property.title}
                agentName={property.agent.name}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.92)' }}
          onClick={() => setLightboxOpen(false)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close lightbox"
          >
            <Icon name="XMarkIcon" size={24} />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setActiveImage(
                (prev) => (prev - 1 + property.images.length) % property.images.length
              );
            }}
            aria-label="Previous image"
          >
            <Icon name="ChevronLeftIcon" size={24} />
          </button>
          <div
            className="relative mx-16"
            style={{ maxWidth: '90vw', maxHeight: '85vh', width: '900px', height: '600px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <AppImage
              src={property.images[activeImage].src}
              alt={property.images[activeImage].alt}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setActiveImage((prev) => (prev + 1) % property.images.length);
            }}
            aria-label="Next image"
          >
            <Icon name="ChevronRightIcon" size={24} />
          </button>
          {/* Thumbnail strip */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {property.images.map((img, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImage(i);
                }}
                className="relative w-14 h-10 rounded-lg overflow-hidden border-2 transition-all"
                style={{ borderColor: i === activeImage ? 'var(--accent)' : 'transparent' }}
                aria-label={`View image ${i + 1}`}
              >
                <AppImage src={img.src} alt={img.alt} fill className="object-cover" sizes="56px" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
