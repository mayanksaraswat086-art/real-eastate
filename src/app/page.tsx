import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/app/components/HeroSection';
import FeaturedPropertiesSection from '@/app/components/FeaturedPropertiesSection';
import WhyChooseUsSection from '@/app/components/WhyChooseUsSection';
import StatsSection from '@/app/components/StatsSection';
import FeaturedAgentsSection from '@/app/components/FeaturedAgentsSection';
import TestimonialsSection from '@/app/components/TestimonialsSection';
import BlogPreviewSection from '@/app/components/BlogPreviewSection';
import {
  getFeaturedProperties,
  getAgents,
  getTestimonials,
  getBlogPosts,
} from '@/lib/database/queries';

export default async function HomePage() {
  const [featuredProperties, agents, testimonials, blogPosts] = await Promise.all([
    getFeaturedProperties(),
    getAgents(),
    getTestimonials(),
    getBlogPosts(),
  ]);

  return (
    <main
      className="min-h-screen overflow-x-hidden"
      style={{ backgroundColor: 'var(--background)' }}
    >
      <Header />
      <HeroSection />
      <FeaturedPropertiesSection properties={featuredProperties} />
      <WhyChooseUsSection />
      <StatsSection />
      <FeaturedAgentsSection agents={agents.slice(0, 3)} />
      <TestimonialsSection testimonials={testimonials} />
      <BlogPreviewSection posts={blogPosts.slice(0, 3)} />
      <Footer />
    </main>
  );
}
