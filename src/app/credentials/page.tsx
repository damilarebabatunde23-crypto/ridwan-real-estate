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

      <section className="bg-gradient-to-r from-[#0a192f] via-[#112240] to-[#0a192f] text-white py-14 sm:py-16 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Documented & Verified</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
            PROFESSIONAL CREDENTIALS & LICENSING
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
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
