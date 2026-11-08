'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Home, 
  Users, 
  Landmark, 
  Briefcase, 
  Phone, 
  Mail, 
  MessageCircle, 
  ShieldCheck, 
  GraduationCap, 
  Search, 
  Sparkles, 
  ArrowRight,
  CheckCircle2,
  Maximize2,
  ExternalLink,
  X
} from 'lucide-react';
import { getWhatsAppGeneralLink } from '@/lib/store';

export default function FlyerHero() {
  const [showFlyerModal, setShowFlyerModal] = useState(false);

  const servicesCol1 = [
    {
      title: 'Property Management',
      desc: 'Hassle-free property management solutions.',
      icon: Home,
      waText: 'Hello Balogun Ridwan, I need Property Management services in Ilorin.'
    },
    {
      title: 'Property for Sales',
      desc: 'Find the right property at the best value.',
      icon: Building2,
      waText: 'Hello Balogun Ridwan, I am looking to buy a property (house/land) in Ilorin.'
    },
    {
      title: 'Property Development',
      desc: 'From concept to completion.',
      icon: Sparkles,
      waText: 'Hello Balogun Ridwan, I want to discuss Property Development projects.'
    },
    {
      title: 'Business Consultant',
      desc: 'Smart investment advice for long-term growth.',
      icon: Briefcase,
      waText: 'Hello Balogun Ridwan, I need Real Estate Investment & Business Consultation in Kwara State.'
    },
  ];

  const servicesCol2 = [
    {
      title: 'Property Development',
      desc: 'Quality homes and modern spaces.',
      icon: Home,
      waText: 'Hello Balogun Ridwan, I am inquiring about Quality Homes & Modern Spaces Development.'
    },
    {
      title: 'Rooms, Shops ETC to Rent',
      desc: 'Comfortable and affordable rental options.',
      icon: Users,
      waText: 'Hello Balogun Ridwan, I am looking for student rooms, hostels, or commercial shops for rent in Ilorin.'
    },
    {
      title: 'Land Acquisition',
      desc: 'Secure and verified land deals.',
      icon: Landmark,
      waText: 'Hello Balogun Ridwan, I want to acquire secure, verified land with survey check in Ilorin.'
    },
  ];

  return (
    <div className="w-full bg-[#f8fafc] text-slate-800">
      {/* Flyer Lightbox Modal */}
      {showFlyerModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-2xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-4 bg-[#0a192f] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm">ORIGINAL BRANDING FLYER</span>
                <span className="text-xs text-sky-300">• RIDWANULLAHI CERTIFIED AGENT</span>
              </div>
              <button
                onClick={() => setShowFlyerModal(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4 bg-slate-900 flex justify-center max-h-[80vh] overflow-y-auto">
              <img
                src="/flyer.jpg"
                alt="RIDWANULLAHI CERTIFIED AGENT Promotional Flyer"
                className="max-h-[75vh] w-auto object-contain rounded-xl shadow-lg"
              />
            </div>
            <div className="p-4 bg-slate-50 flex items-center justify-between text-xs">
              <span className="text-slate-500">Official promotional reference image</span>
              <a
                href={getWhatsAppGeneralLink('Hello Balogun Ridwan, I saw your official flyer and would like to inquire about your real estate services.')}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* FLYER-STYLE MAIN CANVAS CONTAINER */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 pb-12">
        {/* Floating Quick Action: View Original Flyer Button */}
        <div className="flex justify-end mb-3">
          <button
            onClick={() => setShowFlyerModal(true)}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-slate-700 hover:text-blue-700 text-xs font-bold shadow-sm border border-slate-200 hover:border-blue-400 transition-all"
          >
            <Maximize2 className="w-3.5 h-3.5 text-blue-600" />
            <span>View Original Reference Flyer</span>
          </button>
        </div>

        {/* THE FLYER FRAME */}
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative">
          {/* 1. TOP HEADER (Brand Logo + Tagline) */}
          <div className="p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-100 bg-white">
            {/* Logo treatment from flyer */}
            <div className="flex items-center gap-4 text-left">
              {/* House with wave emblem */}
              <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full text-[#1d4ed8]">
                  {/* Roof */}
                  <path d="M50 15 L15 45 L25 45 L50 24 L75 45 L85 45 Z" fill="#1d4ed8" />
                  {/* House Body */}
                  <path d="M25 45 L25 78 L75 78 L75 45 Z" fill="#1e40af" />
                  {/* 4-pane window */}
                  <rect x="40" y="42" width="8" height="8" rx="1" fill="#ffffff" />
                  <rect x="52" y="42" width="8" height="8" rx="1" fill="#ffffff" />
                  <rect x="40" y="54" width="8" height="8" rx="1" fill="#ffffff" />
                  <rect x="52" y="54" width="8" height="8" rx="1" fill="#ffffff" />
                  {/* Wave swoosh */}
                  <path d="M10 82 Q 40 95 85 75 Q 92 72 88 84 Q 45 102 8 87 Z" fill="#0ea5e9" />
                </svg>
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-[#0a192f] tracking-tight leading-none">
                  RIDWANULLAHI
                </h1>
                
                {/* Certified with lines */}
                <div className="flex items-center gap-2 my-1.5">
                  <span className="h-[1.5px] w-6 bg-[#0a192f]" />
                  <span className="text-[11px] font-black tracking-widest text-[#0a192f] uppercase">
                    CERTIFIED
                  </span>
                  <span className="h-[1.5px] w-6 bg-[#0a192f]" />
                </div>

                {/* Blue pill badge */}
                <div className="inline-block px-3 py-0.5 rounded-full bg-[#1e40af] text-white text-[11px] font-extrabold tracking-wider uppercase mb-1">
                  REAL ESTATE AGENT
                </div>

                <div className="text-[11px] font-bold text-[#0a192f] tracking-wider space-x-2">
                  <span>BUY</span>
                  <span>|</span>
                  <span>SELL</span>
                  <span>|</span>
                  <span>RENT</span>
                  <span>|</span>
                  <span>INVEST</span>
                </div>
              </div>
            </div>

            {/* Top Right: Cursive Slogan */}
            <div className="text-center md:text-right">
              <p className="font-serif italic text-xl sm:text-2xl text-[#1e3a8a] font-bold tracking-tight">
                "Your Dream Home is Our Priority"
              </p>
              <div className="flex items-center justify-center md:justify-end gap-2 mt-2">
                <a
                  href={getWhatsAppGeneralLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* 2. HERO COMPOSITION (Villa Backdrop + Headline + Circular Bedroom Inset) */}
          <div className="relative min-h-[460px] sm:min-h-[520px] bg-[#0a192f] overflow-hidden flex flex-col justify-between p-6 sm:p-10 text-white">
            {/* Background Villa Image */}
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
                alt="Luxury Modern Architecture in Nigeria"
                className="w-full h-full object-cover object-center brightness-50"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a192f]/95 via-[#0a192f]/80 to-transparent" />
            </div>

            {/* Left Headline Area */}
            <div className="relative z-10 max-w-xl space-y-4 pt-4 sm:pt-8">
              <div className="space-y-1">
                <div className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-none">
                  FIND YOUR
                </div>
                <div className="text-5xl sm:text-7xl font-black text-white tracking-tight leading-none">
                  PERFECT
                </div>
                <div className="text-5xl sm:text-7xl font-black text-[#00a8ff] tracking-tight leading-none">
                  PROPERTY
                </div>
              </div>

              <p className="text-lg sm:text-xl font-bold text-slate-100 tracking-wide pt-1">
                With Trusted Real Estate Services
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={getWhatsAppGeneralLink('Hello Balogun Ridwan, I want to find my perfect property in Ilorin. Please share your current listings.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-black text-sm shadow-xl flex items-center gap-2 hover:scale-105 transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Connect on WhatsApp</span>
                </a>

                <Link
                  href="/hostels"
                  className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold text-sm flex items-center gap-2 transition-all"
                >
                  <GraduationCap className="w-4 h-4 text-sky-300" />
                  <span>Student Hostels in Ilorin</span>
                </Link>
              </div>
            </div>

            {/* Circular Luxury Inset (Right side matching flyer) */}
            <div className="relative z-10 self-end mt-6 sm:mt-0 flex flex-col items-end">
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full border-4 border-white shadow-2xl overflow-hidden ring-4 ring-[#00a8ff]/40">
                <img
                  src="https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80"
                  alt="Luxury Bedroom Comfort"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Overlapping Seal: LUXURY COMFORT SECURITY */}
              <div className="-mt-14 -mr-2 sm:-mr-4 relative z-20 w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-[#0a192f] border-4 border-white shadow-2xl flex flex-col items-center justify-center text-center p-2 text-white">
                <Home className="w-6 h-6 text-[#00a8ff] mb-1" />
                <div className="font-extrabold text-[11px] leading-tight tracking-wider uppercase">
                  LUXURY
                </div>
                <div className="font-extrabold text-[11px] leading-tight tracking-wider uppercase text-sky-300">
                  COMFORT
                </div>
                <div className="font-extrabold text-[11px] leading-tight tracking-wider uppercase text-emerald-400">
                  SECURITY
                </div>
              </div>
            </div>
          </div>

          {/* 3. "OUR SERVICES" SECTION (Exact layout from flyer) */}
          <div className="p-6 sm:p-10 bg-white">
            <div className="mb-6">
              <span className="inline-block px-6 py-2 rounded-full bg-[#0a192f] text-white font-extrabold text-sm sm:text-base tracking-wider uppercase shadow-md">
                OUR SERVICES
              </span>
            </div>

            {/* 2-Column Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
              {/* Column 1 */}
              <div className="space-y-4">
                {servicesCol1.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={idx}
                      href={getWhatsAppGeneralLink(item.waText)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-4 p-3 rounded-2xl hover:bg-blue-50/70 transition-all border border-transparent hover:border-blue-200"
                    >
                      <div className="w-11 h-11 rounded-full bg-[#1e40af] text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 group-hover:bg-emerald-600 transition-all">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-black text-slate-900 text-sm group-hover:text-blue-700 transition-colors flex items-center gap-2">
                          <span>{item.title}</span>
                          <span className="text-[10px] text-emerald-600 font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                            <MessageCircle className="w-3 h-3 fill-emerald-600" />
                            WhatsApp
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                          {item.desc}
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>

              {/* Column 2 */}
              <div className="space-y-4">
                {servicesCol2.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={idx}
                      href={getWhatsAppGeneralLink(item.waText)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-4 p-3 rounded-2xl hover:bg-blue-50/70 transition-all border border-transparent hover:border-blue-200"
                    >
                      <div className="w-11 h-11 rounded-full bg-[#1e40af] text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 group-hover:bg-emerald-600 transition-all">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-black text-slate-900 text-sm group-hover:text-blue-700 transition-colors flex items-center gap-2">
                          <span>{item.title}</span>
                          <span className="text-[10px] text-emerald-600 font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                            <MessageCircle className="w-3 h-3 fill-emerald-600" />
                            WhatsApp
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                          {item.desc}
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 4. BOTTOM 3-PHOTO SHOWCASE + ANGLED BADGE */}
          <div className="p-6 sm:p-10 pt-2 bg-white">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
              {/* 3 Photos Strip (8 cols) */}
              <div className="lg:col-span-8 grid grid-cols-3 gap-3">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md group">
                  <img
                    src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=600&q=80"
                    alt="Luxury Modern Villa"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute bottom-2 left-2 text-[10px] font-bold text-white">Modern Villa</span>
                </div>

                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md group">
                  <img
                    src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80"
                    alt="Interior Living Lounge"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute bottom-2 left-2 text-[10px] font-bold text-white">Living Lounge</span>
                </div>

                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md group">
                  <img
                    src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80"
                    alt="Student Hostel & Apartments"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute bottom-2 left-2 text-[10px] font-bold text-white">Student Block</span>
                </div>
              </div>

              {/* Angled Badge (4 cols) matching flyer */}
              <div className="lg:col-span-4 bg-[#0a192f] text-white rounded-2xl p-6 flex flex-col justify-center relative overflow-hidden shadow-md border-l-4 border-[#00a8ff]">
                <div className="text-xs font-black tracking-widest text-[#00a8ff] uppercase mb-1">
                  RESIDENTIAL | COMMERCIAL
                </div>
                <div className="text-sm font-black tracking-widest text-white uppercase mb-3">
                  LAND | INVESTMENT
                </div>
                <p className="font-serif italic text-sky-200 text-sm">
                  "Your satisfaction is our success."
                </p>
              </div>
            </div>
          </div>

          {/* 5. FOOTER / CONTACT BAR (Matching flyer bottom section) */}
          <div className="bg-[#0a192f] text-white p-6 sm:p-8 border-t border-slate-800">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* Left: Contact Info */}
              <div className="space-y-3">
                <a
                  href={getWhatsAppGeneralLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#00a8ff] hover:bg-sky-400 text-[#0a192f] font-extrabold text-xs tracking-wider uppercase transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>CONTACT US TODAY</span>
                </a>

                <div className="space-y-1">
                  <a
                    href="tel:07082256257"
                    className="flex items-center gap-2 text-xl sm:text-2xl font-black text-white hover:text-emerald-400 transition-colors"
                  >
                    <Phone className="w-5 h-5 text-[#00a8ff]" />
                    <span>07082256257</span>
                  </a>
                  <a
                    href="mailto:Ridwanyunnus@gmail.com"
                    className="flex items-center gap-2 text-xs text-slate-300 hover:text-white transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[#00a8ff]" />
                    <span>Ridwanyunnus@gmail.com</span>
                  </a>
                </div>
              </div>

              {/* Middle: WhatsApp Scan & Direct Chat */}
              <div className="flex items-center justify-center">
                <a
                  href={getWhatsAppGeneralLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-white/5 hover:bg-white/10 p-3 rounded-2xl border border-white/15 transition-all group"
                  title="Click to Chat on WhatsApp"
                >
                  {/* Clean SVG QR Code Representation */}
                  <div className="w-20 h-20 bg-white p-1 rounded-xl shrink-0 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900">
                      {/* Standard QR Code Matrix pattern */}
                      <rect width="100" height="100" fill="white" />
                      {/* Top-Left Corner Box */}
                      <rect x="10" y="10" width="25" height="25" fill="#0a192f" rx="3" />
                      <rect x="15" y="15" width="15" height="15" fill="white" />
                      <rect x="19" y="19" width="7" height="7" fill="#0a192f" />
                      {/* Top-Right Corner Box */}
                      <rect x="65" y="10" width="25" height="25" fill="#0a192f" rx="3" />
                      <rect x="70" y="15" width="15" height="15" fill="white" />
                      <rect x="74" y="19" width="7" height="7" fill="#0a192f" />
                      {/* Bottom-Left Corner Box */}
                      <rect x="10" y="65" width="25" height="25" fill="#0a192f" rx="3" />
                      <rect x="15" y="70" width="15" height="15" fill="white" />
                      <rect x="19" y="74" width="7" height="7" fill="#0a192f" />
                      {/* Data Dots & WhatsApp Center Icon */}
                      <circle cx="50" cy="50" r="14" fill="#25D366" />
                      <path d="M46 47 C46 45, 54 45, 54 47 C54 49, 52 50, 50 52 L50 54" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
                      <circle cx="50" cy="57" r="1.5" fill="white" />
                      {/* Random decorative grid points */}
                      <rect x="42" y="15" width="6" height="6" fill="#0a192f" />
                      <rect x="52" y="18" width="6" height="6" fill="#0a192f" />
                      <rect x="42" y="75" width="6" height="6" fill="#0a192f" />
                      <rect x="52" y="78" width="6" height="6" fill="#0a192f" />
                      <rect x="75" y="45" width="6" height="6" fill="#0a192f" />
                      <rect x="85" y="55" width="6" height="6" fill="#0a192f" />
                    </svg>
                  </div>

                  <div className="space-y-1 text-left">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                      <MessageCircle className="w-4 h-4 fill-[#25D366] text-[#25D366]" />
                      <span>WhatsApp</span>
                    </div>
                    <p className="text-[11px] text-slate-300">Click or Scan to connect</p>
                    <span className="inline-block text-[10px] font-extrabold text-emerald-400 group-hover:underline">
                      Open Direct Chat &rarr;
                    </span>
                  </div>
                </a>
              </div>

              {/* Right: Architectural Skyline Emblem */}
              <div className="text-center md:text-right space-y-2">
                <div className="flex items-center justify-center md:justify-end gap-1.5 text-[#00a8ff]">
                  {/* Roof towers */}
                  <svg viewBox="0 0 100 40" className="w-24 h-10 text-[#00a8ff]">
                    <polygon points="20,35 30,10 40,35" fill="currentColor" />
                    <polygon points="40,35 50,5 60,35" fill="currentColor" />
                    <polygon points="60,35 70,15 80,35" fill="currentColor" />
                    <path d="M5,36 Q 50,42 95,36" stroke="#00a8ff" strokeWidth="2" fill="none" />
                  </svg>
                </div>

                <div className="text-sm font-black tracking-widest text-white uppercase">
                  RIDWANULLAHI CERTIFIED
                </div>

                <div className="font-serif italic text-xs text-sky-300">
                  "Real Estate. Real People. Real Results."
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
