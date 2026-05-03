import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Icon from '@/components/ui/AppIcon';

export const metadata: Metadata = {
  title: 'Terms of Service — LuxEstate',
  description: 'Read the terms and conditions for using LuxEstate platform.',
};

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-16">
        <div className="flex items-center gap-2 text-primary mb-6">
          <Icon name="DocumentTextIcon" size={24} variant="solid" />
          <h1 className="text-3xl font-display font-bold text-gray-900">Terms of Service</h1>
        </div>
        
        <p className="text-gray-500 mb-8 italic">Effective Date: May 1, 2026</p>

        <div className="prose prose-slate max-w-none space-y-8 text-gray-600">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p>By accessing or using the LuxEstate website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
            <p>LuxEstate provides an online marketplace for residential and commercial real estate listings. We facilitate connections between buyers, sellers, tenants, and real estate professionals. We do not act as a real estate broker or agent in any transaction.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">3. User Obligations</h2>
            <p>Users are responsible for the accuracy of any information they provide on the platform. You agree not to use the service for any illegal or unauthorized purpose.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">4. Property Listings</h2>
            <p>While we strive for accuracy, property listings are provided for informational purposes only. LuxEstate does not guarantee the accuracy, completeness, or suitability of any listing. Users are encouraged to verify all details independently.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">5. Intellectual Property</h2>
            <p>All content on LuxEstate, including logos, text, and images, is the property of LuxEstate or its licensors and is protected by copyright and other intellectual property laws.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">6. Limitation of Liability</h2>
            <p>LuxEstate shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our services or any interactions between users on the platform.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">7. Termination</h2>
            <p>We reserve the right to suspend or terminate your access to the platform at our discretion, without notice, for any violation of these terms.</p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
