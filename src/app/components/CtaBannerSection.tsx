import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

export default function CtaBannerSection() {
  return (
    <section className="py-20" style={{ backgroundColor: 'var(--background)' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="relative rounded-3xl overflow-hidden" style={{ minHeight: '380px' }}>
          {/* Background image */}
          <AppImage
            src="https://img.rocket.new/generatedImages/rocket_gen_img_1ee19e983-1775058545672.png"
            alt="Aerial view of luxury residential complex, manicured gardens, swimming pools, warm afternoon light, dark shadows on buildings"
            fill
            className="object-cover"
            sizes="100vw"
          />

          {/* Dark scrim — white text needs strong overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, rgba(45,80,22,0.92) 0%, rgba(45,80,22,0.75) 60%, rgba(0,0,0,0.5) 100%)',
            }}
          />

          {/* Content */}
          <div
            className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 p-10 md:p-14"
            style={{ minHeight: '380px' }}
          >
            <div className="max-w-lg text-center lg:text-left">
              <p
                className="text-sm font-semibold uppercase tracking-widest mb-4"
                style={{ color: 'var(--accent)' }}
              >
                Ready to Sell?
              </p>
              <h2
                className="font-display font-bold text-white mb-4"
                style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
              >
                List Your Property Today — It's Free
              </h2>
              <p className="text-white/80 leading-relaxed">
                Join 1,200+ sellers who found verified buyers through LuxEstate. Free listing, no
                hidden charges, dedicated agent support throughout.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-4 shrink-0">
              <Link
                href="/"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all duration-200 hover:-translate-y-0.5"
                style={{ backgroundColor: 'var(--accent)', color: 'var(--foreground)' }}
              >
                <Icon name="PlusIcon" size={18} />
                List Property Free
              </Link>
              <Link
                href="/"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-base border-2 border-white/40 text-white hover:bg-white/10 transition-all"
              >
                <Icon name="PhoneIcon" size={18} />
                Talk to an Agent
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
