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

      <section className="bg-gradient-to-r from-[#0a192f] via-[#112240] to-[#0a192f] text-white py-14 sm:py-16 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-sky-300 border border-blue-400/30">
            <ShieldCheck className="w-4 h-4 text-sky-400" />
            <span>RIDWANULLAHI CERTIFIED AGENT</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
            OUR PROFESSIONAL REAL ESTATE SERVICES
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
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
