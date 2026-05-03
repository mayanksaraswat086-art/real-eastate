import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import type { BlogPost } from '@/lib/database/types';

interface BlogPreviewSectionProps {
  posts: BlogPost[];
}

export default function BlogPreviewSection({ posts }: BlogPreviewSectionProps) {
  return (
    <section className="py-20" style={{ backgroundColor: 'var(--background-alt)' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <p className="section-label mb-3">Insights & Guides</p>
            <h2
              className="font-display font-bold"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: 'var(--foreground)' }}
            >
              Latest from the Blog
            </h2>
          </div>
          <Link href="/blog" className="btn-secondary shrink-0 self-start sm:self-auto">
            All Articles <Icon name="ArrowRightIcon" size={16} />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article key={post.slug} className="property-card group overflow-hidden">
              {/* Image */}
              <div className="relative overflow-hidden" style={{ height: '200px' }}>
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
                  className="text-sm leading-relaxed line-clamp-2 mb-4"
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
      </div>
    </section>
  );
}
