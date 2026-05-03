'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { useRealtime } from '@/lib/database/useRealtime';
import type { Property } from '@/lib/database/types';

interface PropertyListingsContentProps {
  properties: Property[];
}

const cities = ['All Cities', 'Mumbai', 'Bengaluru', 'Pune', 'Hyderabad', 'Delhi NCR', 'Chennai'];
const types = [
  'All Types',
  'Apartment',
  'Villa',
  'Bungalow',
  'Penthouse',
  'Plot',
  'Commercial',
  'Studio',
];
const bhkOptions = ['Any BHK', '1 BHK', '2 BHK', '3 BHK', '4 BHK', '5+ BHK'];
const statusOptions = ['Buy & Rent', 'Buy', 'Rent'];
const sortOptions = ['Latest', 'Price: Low to High', 'Price: High to Low'];
const priceRanges = [
  { label: 'Any Budget', min: 0, max: Infinity },
  { label: 'Under ₹50L', min: 0, max: 5000000 },
  { label: '₹50L – ₹1Cr', min: 5000000, max: 10000000 },
  { label: '₹1Cr – ₹3Cr', min: 10000000, max: 30000000 },
  { label: '₹3Cr+', min: 30000000, max: Infinity },
];

function PropertyCard({ prop }: { prop: Property }) {
  const [wishlisted, setWishlisted] = useState(false);
  return (
    <div className="property-card group">
      <Link href={`/property-detail/${prop.id}`} className="block relative overflow-hidden" style={{ height: '210px' }}>
        <AppImage
          src={prop.image}
          alt={prop.image_alt ?? ''}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%)' }}
        />
        <div className="absolute top-3 left-3 flex gap-2 z-10">
          {prop.badge && (
            <span
              className="text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{ backgroundColor: 'var(--accent)', color: 'var(--foreground)' }}
            >
              {prop.badge}
            </span>
          )}
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${prop.status === 'Buy' ? 'tag-buy' : 'tag-rent'}`}
          >
            {prop.status}
          </span>
        </div>
        <button
          onClick={(e) => { e.preventDefault(); setWishlisted(!wishlisted); }}
          aria-label={wishlisted ? 'Remove wishlist' : 'Add wishlist'}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all"
          style={{ backgroundColor: wishlisted ? 'var(--accent)' : 'rgba(255,255,255,0.9)' }}
        >
          <Icon
            name="HeartIcon"
            size={16}
            variant={wishlisted ? 'solid' : 'outline'}
            style={{ color: wishlisted ? 'white' : 'var(--primary)' }}
          />
        </button>
        <div className="absolute bottom-3 left-3 z-10">
          <span
            className="font-display font-bold text-white text-lg"
            style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}
          >
            {prop.price_display}
          </span>
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/property-detail/${prop.id}`} className="block">
          <h3
            className="font-display font-semibold text-sm mb-1 line-clamp-1 group-hover:text-primary transition-colors"
            style={{ color: 'var(--foreground)' }}
          >
            {prop.title}
          </h3>
        </Link>
        <p
          className="text-xs flex items-center gap-1 mb-3"
          style={{ color: 'var(--muted-foreground)' }}
        >
          <Icon name="MapPinIcon" size={12} style={{ color: 'var(--accent)' }} />
          {prop.location}
        </p>
        <div
          className="flex items-center gap-3 pt-3 border-t text-[10px] font-medium"
          style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}
        >
          {prop.bhk > 0 && (
            <span className="flex items-center gap-1">
              <Icon name="HomeIcon" size={12} style={{ color: 'var(--primary)' }} />
              {prop.bhk} BHK
            </span>
          )}
          <span className="flex items-center gap-1">
            <Icon name="Squares2X2Icon" size={12} style={{ color: 'var(--primary)' }} />
            {prop.sqft.toLocaleString('en-IN')} sqft
          </span>
        </div>

        <Link
          href={`/property-detail/${prop.id}`}
          className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-bold transition-all border-2 border-primary text-primary hover:bg-primary hover:text-white"
        >
          View Property details
          <Icon name="ArrowRightIcon" size={14} />
        </Link>
      </div>
    </div>
  );
}


function PropertyListingsContent({ properties: initialProperties }: PropertyListingsContentProps) {
  const properties = useRealtime(initialProperties, 'properties');
  const searchParams = useSearchParams();

  const [city, setCity] = useState('All Cities');
  const [type, setType] = useState('All Types');
  const [bhk, setBhk] = useState('Any BHK');
  const [status, setStatus] = useState('Buy & Rent');
  const [priceRange, setPriceRange] = useState(0);
  const [sort, setSort] = useState('Latest');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [view, setView] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const statusParam = searchParams.get('status');
    if (statusParam === 'Buy' || statusParam === 'Rent') {
      setStatus(statusParam);
    }
  }, [searchParams]);

  const filtered = useMemo(() => {
    let result = properties.filter((p) => {
      const pr = priceRanges[priceRange];
      if (city !== 'All Cities' && p.city !== city) return false;
      if (type !== 'All Types' && p.type !== type) return false;
      if (status !== 'Buy & Rent' && p.status !== status) return false;
      if (bhk !== 'Any BHK') {
        const n = parseInt(bhk);
        if (bhk === '5+ BHK' ? p.bhk < 5 : p.bhk !== n) return false;
      }
      if (p.price < pr.min || p.price > pr.max) return false;
      return true;
    });
    if (sort === 'Price: Low to High') result = [...result].sort((a, b) => a.price - b.price);
    if (sort === 'Price: High to Low') result = [...result].sort((a, b) => b.price - a.price);
    return result;
  }, [city, type, bhk, status, priceRange, sort, properties]);

  const FilterSidebar = () => (
    <aside
      className="shrink-0 lg:w-72 rounded-2xl p-6 border h-fit sticky top-24"
      style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-semibold text-base" style={{ color: 'var(--foreground)' }}>
          Filters
        </h2>
        <button
          onClick={() => {
            setCity('All Cities');
            setType('All Types');
            setBhk('Any BHK');
            setStatus('Buy & Rent');
            setPriceRange(0);
          }}
          className="text-xs font-medium transition-colors"
          style={{ color: 'var(--accent)' }}
        >
          Reset All
        </button>
      </div>

      {/* Status */}
      <div className="mb-5">
        <p
          className="text-xs font-semibold uppercase tracking-wider mb-3"
          style={{ color: 'var(--muted-foreground)' }}
        >
          Status
        </p>
        <div className="flex gap-2 flex-wrap">
          {statusOptions.map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className="text-xs font-medium px-3 py-1.5 rounded-full border transition-all"
              style={{
                backgroundColor: status === s ? 'var(--primary)' : 'transparent',
                color: status === s ? 'white' : 'var(--muted-foreground)',
                borderColor: status === s ? 'var(--primary)' : 'var(--border)',
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* City */}
      <div className="mb-5">
        <p
          className="text-xs font-semibold uppercase tracking-wider mb-3"
          style={{ color: 'var(--muted-foreground)' }}
        >
          City
        </p>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="input-field text-sm"
          aria-label="Filter by city"
        >
          {cities.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Type */}
      <div className="mb-5">
        <p
          className="text-xs font-semibold uppercase tracking-wider mb-3"
          style={{ color: 'var(--muted-foreground)' }}
        >
          Property Type
        </p>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="input-field text-sm"
          aria-label="Filter by property type"
        >
          {types.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* BHK */}
      <div className="mb-5">
        <p
          className="text-xs font-semibold uppercase tracking-wider mb-3"
          style={{ color: 'var(--muted-foreground)' }}
        >
          BHK
        </p>
        <div className="flex gap-2 flex-wrap">
          {bhkOptions.map((b) => (
            <button
              key={b}
              onClick={() => setBhk(b)}
              className="text-xs font-medium px-3 py-1.5 rounded-full border transition-all"
              style={{
                backgroundColor: bhk === b ? 'var(--primary)' : 'transparent',
                color: bhk === b ? 'white' : 'var(--muted-foreground)',
                borderColor: bhk === b ? 'var(--primary)' : 'var(--border)',
              }}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-5">
        <p
          className="text-xs font-semibold uppercase tracking-wider mb-3"
          style={{ color: 'var(--muted-foreground)' }}
        >
          Budget
        </p>
        {priceRanges.map((pr, i) => (
          <label key={pr.label} className="flex items-center gap-2.5 py-1.5 cursor-pointer group">
            <input
              type="radio"
              name="priceRange"
              checked={priceRange === i}
              onChange={() => setPriceRange(i)}
              className="accent-primary"
            />
            <span
              className="text-sm transition-colors"
              style={{ color: priceRange === i ? 'var(--primary)' : 'var(--muted-foreground)' }}
            >
              {pr.label}
            </span>
          </label>
        ))}
      </div>

      {/* Amenities */}
      <div>
        <p
          className="text-xs font-semibold uppercase tracking-wider mb-3"
          style={{ color: 'var(--muted-foreground)' }}
        >
          Amenities
        </p>
        {['Swimming Pool', 'Gym', 'Parking', 'Security', 'Club House'].map((a) => (
          <label key={a} className="flex items-center gap-2.5 py-1.5 cursor-pointer">
            <input type="checkbox" className="accent-primary w-4 h-4 rounded" />
            <span className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
              {a}
            </span>
          </label>
        ))}
      </div>
    </aside>
  );

  return (
    <>
      {/* Page header */}
      <div
        className="py-10 border-b"
        style={{ backgroundColor: 'var(--primary)', borderColor: 'rgba(255,255,255,0.1)' }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-4">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Icon name="ChevronRightIcon" size={14} />
            <span className="text-white">Properties</span>
          </nav>
          <h1
            className="font-display font-bold text-white mb-2"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
          >
            All Properties
          </h1>
          <p className="text-white/70 text-sm">{filtered.length} properties found across India</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Mobile filter toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden mb-4 flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors"
          style={{
            borderColor: 'var(--border)',
            color: 'var(--foreground)',
            backgroundColor: 'var(--card)',
          }}
        >
          <Icon name="AdjustmentsHorizontalIcon" size={16} />
          Filters
          {(city !== 'All Cities' ||
            type !== 'All Types' ||
            bhk !== 'Any BHK' ||
            status !== 'Buy & Rent' ||
            priceRange !== 0) && (
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
            )}
        </button>

        <div className="flex gap-6 items-start">
          {/* Sidebar — desktop always visible, mobile conditional */}
          <div className={`${sidebarOpen ? 'block' : 'hidden'} lg:block`}>
            <FilterSidebar />
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Sort & View bar */}
            <div
              className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-5 border-b"
              style={{ borderColor: 'var(--border)' }}
            >
              <p className="text-sm font-medium" style={{ color: 'var(--muted-foreground)' }}>
                Showing{' '}
                <span className="font-semibold" style={{ color: 'var(--foreground)' }}>
                  {filtered.length}
                </span>{' '}
                properties
              </p>
              <div className="flex items-center gap-3">
                {/* Sort */}
                <div className="flex items-center gap-2">
                  <span
                    className="text-xs font-medium hidden sm:inline"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    Sort:
                  </span>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="input-field py-2 text-xs w-auto"
                    style={{ minWidth: '160px' }}
                    aria-label="Sort properties"
                  >
                    {sortOptions.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* View toggle */}
                <div
                  className="flex items-center border rounded-lg overflow-hidden"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <button
                    onClick={() => setView('grid')}
                    className="p-2.5 transition-colors"
                    style={{
                      backgroundColor: view === 'grid' ? 'var(--primary)' : 'transparent',
                      color: view === 'grid' ? 'white' : 'var(--muted-foreground)',
                    }}
                    aria-label="Grid view"
                  >
                    <Icon name="Squares2X2Icon" size={16} />
                  </button>
                  <button
                    onClick={() => setView('list')}
                    className="p-2.5 transition-colors"
                    style={{
                      backgroundColor: view === 'list' ? 'var(--primary)' : 'transparent',
                      color: view === 'list' ? 'white' : 'var(--muted-foreground)',
                    }}
                    aria-label="List view"
                  >
                    <Icon name="ListBulletIcon" size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Results */}
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <Icon name="MagnifyingGlassIcon" size={48} style={{ color: 'var(--border)' }} />
                <p
                  className="mt-4 font-semibold text-lg"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  No properties found
                </p>
                <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>
                  Try adjusting your filters
                </p>
              </div>
            ) : view === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((prop) => (
                  <PropertyCard key={prop.id} prop={prop} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {filtered.map((prop) => (
                  <div
                    key={prop.id}
                    className="property-card flex flex-col sm:flex-row group overflow-hidden"
                  >
                    <div
                      className="relative shrink-0 overflow-hidden"
                      style={{ width: '100%', maxWidth: '280px', height: '200px' }}
                    >
                      <AppImage
                        src={prop.image}
                        alt={prop.image_alt ?? ''}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="280px"
                      />
                      <div className="absolute top-3 left-3 flex gap-2 z-10">
                        {prop.badge && (
                          <span
                            className="text-xs font-semibold px-2.5 py-1 rounded-full"
                            style={{ backgroundColor: 'var(--accent)', color: 'var(--foreground)' }}
                          >
                            {prop.badge}
                          </span>
                        )}
                        <span
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${prop.status === 'Buy' ? 'tag-buy' : 'tag-rent'}`}
                        >
                          {prop.status}
                        </span>
                      </div>
                    </div>
                    <div className="p-5 flex flex-col justify-between flex-1">
                      <div>
                        <div className="flex items-start justify-between gap-4 mb-1">
                          <h3
                            className="font-display font-semibold text-base"
                            style={{ color: 'var(--foreground)' }}
                          >
                            {prop.title}
                          </h3>
                          <span
                            className="font-display font-bold shrink-0"
                            style={{ color: 'var(--primary)', fontSize: '1.1rem' }}
                          >
                            {prop.price_display}
                          </span>
                        </div>
                        <p
                          className="text-sm flex items-center gap-1 mb-3"
                          style={{ color: 'var(--muted-foreground)' }}
                        >
                          <Icon name="MapPinIcon" size={13} style={{ color: 'var(--accent)' }} />
                          {prop.location}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {prop.bhk > 0 && <span className="badge">{prop.bhk} BHK</span>}
                          <span className="badge">{prop.sqft.toLocaleString('en-IN')} sqft</span>
                          <span className="badge">{prop.type}</span>
                          <span className="badge">{prop.furnishing}</span>
                        </div>
                      </div>
                      <div
                        className="flex items-center gap-3 pt-3 border-t"
                        style={{ borderColor: 'var(--border)' }}
                      >
                        <Link href={`/property-detail/${prop.id}`} className="btn-primary py-2 px-5 text-sm">
                          View Details
                        </Link>
                        <button
                          className="flex items-center gap-1.5 text-sm font-medium transition-colors"
                          style={{ color: 'var(--muted-foreground)' }}
                        >
                          <Icon name="HeartIcon" size={15} />
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {filtered.length > 0 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  className="w-10 h-10 rounded-lg border flex items-center justify-center transition-colors hover:border-primary"
                  style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}
                  aria-label="Previous page"
                >
                  <Icon name="ChevronLeftIcon" size={18} />
                </button>
                {[1, 2, 3].map((p) => (
                  <button
                    key={p}
                    className="w-10 h-10 rounded-lg border flex items-center justify-center text-sm font-medium transition-all"
                    style={{
                      backgroundColor: p === 1 ? 'var(--primary)' : 'transparent',
                      color: p === 1 ? 'white' : 'var(--muted-foreground)',
                      borderColor: p === 1 ? 'var(--primary)' : 'var(--border)',
                    }}
                  >
                    {p}
                  </button>
                ))}
                <button
                  className="w-10 h-10 rounded-lg border flex items-center justify-center transition-colors hover:border-primary"
                  style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}
                  aria-label="Next page"
                >
                  <Icon name="ChevronRightIcon" size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

interface PropertyListingsPageProps {
  properties: Property[];
}

export default function PropertyListingsPage({ properties }: PropertyListingsPageProps) {
  return (
    <Suspense
      fallback={
        <div
          className="min-h-screen flex items-center justify-center"
          style={{ backgroundColor: 'var(--background)' }}
        >
          <p style={{ color: 'var(--muted-foreground)' }}>Loading...</p>
        </div>
      }
    >
      <PropertyListingsContent properties={properties} />
    </Suspense>
  );
}
