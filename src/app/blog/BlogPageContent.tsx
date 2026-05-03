'use client';

import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import type { BlogPost } from '@/lib/database/types';

interface BlogPageContentProps {
  posts: BlogPost[];
}

const categories = ['All', 'Market News', 'Buying Tips', 'Investment', 'Legal', 'Finance'];

export default function BlogPageContent({ posts }: BlogPageContentProps) {
  const [activeCategory, setActiveCategory] = React.useState('All');

  const filtered =
    activeCategory === 'All' ? posts : posts.filter((p) => p.category === activeCategory);

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
            <span className="text-white">Blog</span>
          </nav>
          <h1
            className="font-display font-bold text-white mb-2"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
          >
            Insights & Guides
          </h1>
          <p className="text-white/70 text-sm">
            Expert advice on buying, renting, investing, and navigating Indian real estate.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="text-sm font-medium px-4 py-2 rounded-full border transition-all"
              style={{
                backgroundColor: activeCategory === cat ? 'var(--primary)' : 'transparent',
                color: activeCategory === cat ? 'white' : 'var(--muted-foreground)',
                borderColor: activeCategory === cat ? 'var(--primary)' : 'var(--border)',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post) => (
            <article key={post.slug} className="property-card group overflow-hidden">
              {/* Image */}
              <div className="relative overflow-hidden" style={{ height: '220px' }}>
                <AppImage
                  src={post.image}
                  alt={post.image_alt ?? ''}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute top-3 left-3">
                  <span className="badge text-xs">{post.category}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div
                  className="flex items-center gap-3 text-xs mb-3"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  <span className="flex items-center gap-1">
                    <Icon name="CalendarIcon" size={12} />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="ClockIcon" size={12} />
                    {post.read_time}
                  </span>
                </div>
                <h3
                  className="font-display font-semibold text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors"
                  style={{ color: 'var(--foreground)' }}
                >
                  {post.title}
                </h3>
                <p
                  className="text-sm leading-relaxed line-clamp-3 mb-4"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  {post.excerpt}
                </p>
                <Link
                  href="/"
                  className="text-sm font-semibold flex items-center gap-1 transition-colors"
                  style={{ color: 'var(--primary)' }}
                >
                  Read Article <Icon name="ArrowRightIcon" size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Icon name="NewspaperIcon" size={48} style={{ color: 'var(--border)' }} />
            <p className="mt-4 font-semibold text-lg" style={{ color: 'var(--muted-foreground)' }}>
              No articles in this category
            </p>
          </div>
        )}
      </div>
    </>
  );
}
