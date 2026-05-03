import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogPageContent from '@/app/blog/BlogPageContent';
import { getBlogPosts } from '@/lib/database/queries';

export const metadata: Metadata = {
  title: 'Blog — LuxEstate | Real Estate Insights & Guides',
  description:
    'Expert articles on buying, renting, investing in Indian real estate. Market trends, locality guides, RERA updates, and home loan tips.',
};

export default async function BlogPage() {
  const posts = await getBlogPosts();
  return (
    <main className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      <Header />
      <BlogPageContent posts={posts} />
      <Footer />
    </main>
  );
}
