'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServicesSection from '@/components/ServicesSection';
import WhatsAppCommunityBanner from '@/components/WhatsAppCommunityBanner';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar />

      {/* Top Hero Banner with High-Resolution Architecture & Development Image */}
      <section className="relative min-h-[340px] sm:min-h-[380px] flex items-center bg-[#0a192f] text-white py-16 px-4 sm:px-8 border-b border-slate-800 overflow-hidden">
        {/* Background Image with Clear Visibility & Subtle Scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2000&q=85"
            alt="Real Estate Services in Ilorin, Kwara State"
            className="w-full h-full object-cover object-center brightness-85 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a192f]/85 via-[#0a192f]/45 to-slate-900/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f]/80 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full space-y-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-sky-300 border border-blue-400/30 backdrop-blur-sm">
            <ShieldCheck className="w-4 h-4 text-sky-400" />
            <span>RIDWANULLAHI CERTIFIED AGENT</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white drop-shadow-md">
            OUR PROFESSIONAL REAL ESTATE SERVICES
          </h1>

          <p className="text-sm sm:text-base text-slate-200 max-w-3xl leading-relaxed drop-shadow">
            From verified land acquisition and residential sales in Eleko to student hostel leasing across Ilorin campus corridors. Explore how Balogun Ridwan provides dependable results.
          </p>
        </div>
      </section>

      <main className="flex-1">
        <ServicesSection />
      </main>

      <WhatsAppCommunityBanner />
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}
