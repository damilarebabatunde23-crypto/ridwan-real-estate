'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CredentialsSection from '@/components/CredentialsSection';
import WhatsAppCommunityBanner from '@/components/WhatsAppCommunityBanner';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';
import { ShieldCheck, Award } from 'lucide-react';

export default function CredentialsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar />

      {/* Top Hero Banner with High-Resolution Executive Image */}
      <section className="relative min-h-[340px] sm:min-h-[380px] flex items-center bg-[#0a192f] text-white py-16 px-4 sm:px-8 border-b border-slate-800 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=85"
            alt="Corporate Real Estate Accreditation in Nigeria"
            className="w-full h-full object-cover object-center brightness-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a192f] via-[#0a192f]/90 to-[#0c2340]/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-sm">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Documented & Verified</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white drop-shadow-md">
            PROFESSIONAL CREDENTIALS & LICENSING
          </h1>

          <p className="text-sm sm:text-base text-slate-200 max-w-3xl leading-relaxed drop-shadow">
            Authenticity and verified documentation represent the cornerstone of RIDWANULLAHI CERTIFIED AGENT. Review our official certifications, agency credentials, and compliance records.
          </p>
        </div>
      </section>

      <main className="flex-1">
        <CredentialsSection />
      </main>

      <WhatsAppCommunityBanner />
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}
