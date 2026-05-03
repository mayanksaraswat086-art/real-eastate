import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PropertyListingsPage from '@/app/property-listings/components/PropertyListingsPage';
import { getProperties } from '@/lib/database/queries';

export const metadata = {
  title: 'Property Listings — LuxEstate | Buy & Rent in India',
  description:
    'Browse 200+ verified properties for sale and rent across Mumbai, Pune, Bengaluru, Hyderabad and more. Filter by city, type, price, and BHK.',
};

export default async function PropertyListings() {
  const properties = await getProperties();
  return (
    <main className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      <Header />
      <PropertyListingsPage properties={properties} />
      <Footer />
    </main>
  );
}
