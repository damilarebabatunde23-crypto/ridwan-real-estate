'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  ShieldCheck, 
  Award, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle2, 
  MessageCircle, 
  Globe, 
  Compass,
  HeartHandshake,
  Users
} from 'lucide-react';
import { FacebookIcon, LinkedInIcon } from '@/components/SocialIcons';
import { getSettings, getWhatsAppGeneralLink } from '@/lib/store';
import { BusinessSettings } from '@/types/property';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppCommunityBanner from '@/components/WhatsAppCommunityBanner';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';

export default function AboutPage() {
  const [settings, setSettings] = useState<BusinessSettings | null>(null);

  useEffect(() => {
    setSettings(getSettings());
  }, []);

  const fullName = settings?.fullName || 'BALOGUN RIDWAN BABATUNDE';
  const businessName = settings?.businessName || 'RIDWANULLAHI CERTIFIED AGENT';
  const phone = settings?.phoneDisplay || '07082256257';
  const email = settings?.email || 'Ridwanyunnus@gmail.com';
  const address = settings?.address || 'Eleko, Ilorin, Kwara State, Nigeria';
  const gbp = settings?.googleBusinessProfile || 'https://share.google/sjVg80f40cSexfRub';
  const linkedin = settings?.linkedinProfile || 'https://www.linkedin.com/in/ridwanullahi-certified-61a689303';
  const facebook = settings?.facebookProfile || 'https://www.facebook.com/profile.php?id=100075809320428';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar />

      {/* Top Hero Banner with High-Resolution Architecture Image */}
      <section className="relative min-h-[340px] sm:min-h-[380px] flex items-center bg-[#0a192f] text-white py-16 px-4 sm:px-8 border-b border-slate-800 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85"
            alt="Balogun Ridwan Babatunde Real Estate Agency"
            className="w-full h-full object-cover object-center brightness-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a192f] via-[#0a192f]/90 to-[#0c2340]/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-sky-300 border border-blue-400/30 backdrop-blur-sm">
            <ShieldCheck className="w-4 h-4 text-sky-400" />
            <span>Corporate Real Estate Profile</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white drop-shadow-md">
            ABOUT RIDWANULLAHI CERTIFIED AGENT
          </h1>

          <p className="text-base sm:text-lg text-sky-200 max-w-2xl font-semibold drop-shadow">
            "Real Estate. Real People. Real Results." — Your Dream Home Is Our Priority.
          </p>
        </div>
      </section>

      {/* Main Narrative */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-16 flex-1 w-full space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Bio & Agency Mission */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                Our Foundation & Vision
              </span>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                Authentic Property Agency Rooted in Integrity
              </h2>
            </div>

            <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
              <strong>RIDWANULLAHI CERTIFIED REAL ESTATE AGENT</strong> is a premier property agency based in Eleko, Ilorin, Kwara State, Nigeria. Founded and led by certified real estate practitioner <strong>BALOGUN RIDWAN BABATUNDE</strong>, we are committed to providing dependable, transparent, and legally verified real estate solutions.
            </p>

            <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
              Our comprehensive services encompass houses and land for sale, rooms and commercial shops for rent, residential and commercial developments, property management, land acquisition due diligence, and strategic real estate investment consultancy.
            </p>

            <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
              We specialize particularly in bridging the gap for students seeking safe, verified off-campus accommodation across Kwara State Polytechnic, University of Ilorin, and other tertiary institutions in Kwara State.
            </p>

            {/* Core Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-1.5">
                <div className="flex items-center gap-2 text-blue-700 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Absolute Transparency</span>
                </div>
                <p className="text-xs text-slate-600">
                  No hidden fees, no phantom room listings, and no fabricated land beacons.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-1.5">
                <div className="flex items-center gap-2 text-blue-700 font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>Survey & Legal Due Diligence</span>
                </div>
                <p className="text-xs text-slate-600">
                  Every plot of land and property title is verified against Kwara State official layout records.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-1.5">
                <div className="flex items-center gap-2 text-blue-700 font-bold text-sm">
                  <HeartHandshake className="w-4 h-4 text-amber-600" />
                  <span>Client-First Commitment</span>
                </div>
                <p className="text-xs text-slate-600">
                  We walk with you through every step—from physical inspection to keys handover.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-1.5">
                <div className="flex items-center gap-2 text-blue-700 font-bold text-sm">
                  <Users className="w-4 h-4 text-sky-600" />
                  <span>Active Community Support</span>
                </div>
                <p className="text-xs text-slate-600">
                  Helping students, families, and diaspora investors find their dream homes in Ilorin.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Agent Profile Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#0a192f] via-[#112240] to-[#1e3a8a] text-white p-8 rounded-3xl shadow-2xl space-y-6">
            <div className="text-center space-y-3">
              <div className="relative w-36 h-48 sm:w-44 sm:h-56 rounded-2xl border-4 border-amber-400 shadow-2xl overflow-hidden mx-auto bg-slate-800">
                <img
                  src="/images/agent-balogun-ridwan.jpg"
                  alt="Balogun Ridwan Babatunde"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute bottom-2 right-2 p-1 rounded-full bg-emerald-500 text-white shadow-md">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>

              <div>
                <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-blue-500/30 text-sky-300 border border-blue-400/30 uppercase tracking-wider">
                  Lead Certified Agent
                </span>
                <h3 className="text-2xl font-black text-white mt-2">{fullName}</h3>
                <p className="text-xs text-sky-200 font-medium">
                  {businessName}
                </p>
                <div className="mt-2 inline-block px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-mono font-bold">
                  CAC BN: 9992778 • TIN: 2622351035612
                </div>
              </div>
            </div>

            <div className="p-4 bg-white/10 rounded-2xl border border-white/15 space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>{address}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <a href={`tel:${phone}`} className="hover:underline font-bold text-white">
                  {phone}
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <a href={`mailto:${email}`} className="hover:underline text-sky-200 break-all">
                  {email}
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-2 pt-2 border-t border-slate-700/80">
              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
                Public Profiles & Verification
              </span>
              <div className="space-y-2">
                <a
                  href={gbp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/15 text-xs text-white transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-blue-400" />
                    <span>Google Business Profile</span>
                  </span>
                  <span className="text-slate-400">&rarr;</span>
                </a>

                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/15 text-xs text-white transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <LinkedInIcon className="w-4 h-4 text-sky-400" />
                    <span>LinkedIn Profile</span>
                  </span>
                  <span className="text-slate-400">&rarr;</span>
                </a>

                <a
                  href={facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/15 text-xs text-white transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <FacebookIcon className="w-4 h-4 text-blue-400" />
                    <span>Facebook Business Page</span>
                  </span>
                  <span className="text-slate-400">&rarr;</span>
                </a>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={getWhatsAppGeneralLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chat with Balogun Ridwan</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      <WhatsAppCommunityBanner />
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}
