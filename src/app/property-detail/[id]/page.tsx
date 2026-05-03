import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PropertyDetailPage from '@/app/property-detail/components/PropertyDetailPage';
import { getPropertyById } from '@/lib/database/queries';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const property = await getPropertyById(id);

  if (!property) {
    return {
      title: 'Property Not Found — LuxEstate',
    };
  }

  return {
    title: `${property.title} — LuxEstate`,
    description: property.description || 'View detailed property information and connect with our expert agents.',
  };
}

export default async function PropertyDetail({ params }: Props) {
  const { id } = await params;
  const property = await getPropertyById(id);

  if (!property) {
    notFound();
  }

  return (
    <main className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      <Header />
      <PropertyDetailPage property={property} />
      <Footer />
    </main>
  );
}
