import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Icon from '@/components/ui/AppIcon';

export const metadata: Metadata = {
  title: 'Privacy Policy — LuxEstate',
  description: 'Learn how LuxEstate handles and protects your personal information.',
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-16">
        <div className="flex items-center gap-2 text-primary mb-6">
          <Icon name="ShieldCheckIcon" size={24} variant="solid" />
          <h1 className="text-3xl font-display font-bold text-gray-900">Privacy Policy</h1>
        </div>
        
        <p className="text-gray-500 mb-8 italic">Last Updated: May 1, 2026</p>

        <div className="prose prose-slate max-w-none space-y-8 text-gray-600">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">1. Introduction</h2>
            <p>Welcome to LuxEstate. We value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or use our services.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
            <p>We collect information that you provide directly to us, such as when you create an account, search for properties, contact agents, or subscribe to our newsletter. This may include:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Contact details (name, email address, phone number)</li>
              <li>Property preferences and search history</li>
              <li>Communications with agents and our support team</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <p>We use your information to provide and improve our services, including:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Connecting you with real estate agents and property owners</li>
              <li>Personalizing your property search experience</li>
              <li>Sending relevant property updates and marketing communications</li>
              <li>Enhancing website security and performance</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">4. Data Security</h2>
            <p>We implement industry-standard security measures to protect your data from unauthorized access, loss, or disclosure. However, please note that no method of transmission over the internet is 100% secure.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">5. Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal information. If you wish to exercise these rights, please contact us at privacy@luxestate.in.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">6. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last Updated" date.</p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
