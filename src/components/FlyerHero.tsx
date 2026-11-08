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
  const [showCacModal, setShowCacModal] = useState(false);
  const [showAgentModal, setShowAgentModal] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

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

      {/* CAC Certificate Lightbox Modal */}
      {showCacModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-4 bg-emerald-950 text-white flex items-center justify-between border-b border-emerald-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <div>
                  <span className="font-extrabold text-sm block">FEDERAL REPUBLIC OF NIGERIA</span>
                  <span className="text-[11px] text-emerald-300">Corporate Affairs Commission (CAC) Registration</span>
                </div>
              </div>
              <button
                onClick={() => setShowCacModal(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4 bg-slate-900 flex justify-center max-h-[75vh] overflow-y-auto">
              <img
                src="/images/cac-certificate.jpg"
                alt="Federal Republic of Nigeria Certificate of Registration CAC 9992778"
                className="max-h-[70vh] w-auto object-contain rounded-xl shadow-lg bg-white"
              />
            </div>
            <div className="p-4 bg-slate-50 space-y-2 text-xs">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-bold text-slate-800">RIDWANULLAHI REAL ESTATE AGENT</span>
                <span className="font-mono bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded font-bold">BN: 9992778 • TIN: 2622351035612</span>
              </div>
              <p className="text-slate-500 text-[11px]">
                Principal Place of Business: 1, Elekoyangan, Ilorin, Kwara State, Nigeria (Companies & Allied Matters Act 2020)
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Owner Photo Lightbox Modal */}
      {showAgentModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-md w-full bg-white rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-4 bg-[#0a192f] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm">BALOGUN RIDWAN BABATUNDE</span>
                <span className="text-xs text-amber-400 font-bold">• Certified Agent</span>
              </div>
              <button
                onClick={() => setShowAgentModal(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4 bg-slate-900 flex justify-center max-h-[75vh] overflow-y-auto">
              <img
                src="/images/agent-balogun-ridwan.jpg"
                alt="Balogun Ridwan Babatunde"
                className="max-h-[70vh] w-auto object-contain rounded-2xl shadow-xl"
              />
            </div>
            <div className="p-4 bg-slate-50 flex items-center justify-between text-xs">
              <div>
                <strong className="block text-slate-900 font-bold">RIDWANULLAHI CERTIFIED AGENT</strong>
                <span className="text-slate-500">Eleko, Ilorin, Kwara State</span>
              </div>
              <a
                href={getWhatsAppGeneralLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chat Direct</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp QR Lightbox Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-md w-full bg-white rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-4 bg-[#0a192f] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-emerald-400" />
                <span className="font-extrabold text-sm">Official WhatsApp Contact QR</span>
              </div>
              <button
                onClick={() => setShowQrModal(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4 bg-emerald-600 flex justify-center max-h-[75vh] overflow-y-auto">
              <img
                src="/images/ridwan-whatsapp-qr.jpg"
                alt="Ridwanullahi WhatsApp QR Contact Code"
                className="max-h-[65vh] w-auto object-contain rounded-2xl shadow-xl"
              />
            </div>
            <div className="p-4 bg-slate-50 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">Scan with WhatsApp camera</span>
                <span className="text-emerald-700 font-extrabold text-sm">09161116718</span>
              </div>
              <a
                href="https://wa.me/qr/W4VP4AFFIC5UC"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-center flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Open WhatsApp Direct Chat (wa.me/qr/W4VP4AFFIC5UC)</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* FLYER-STYLE MAIN CANVAS CONTAINER */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 pb-12">
        {/* Floating Quick Action Buttons: CAC Certificate, Owner Photo, WhatsApp QR, and Flyer */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowCacModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 hover:bg-emerald-100 text-xs font-bold shadow-sm border border-emerald-300 transition-all cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Federal CAC Certificate (BN: 9992778)</span>
            </button>
            <button
              onClick={() => setShowAgentModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-blue-800 hover:bg-blue-100 text-xs font-bold shadow-sm border border-blue-300 transition-all cursor-pointer"
            >
              <Users className="w-3.5 h-3.5 text-blue-600" />
              <span>Meet Balogun Ridwan (Lead Agent)</span>
            </button>
            <button
              onClick={() => setShowQrModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-50 text-teal-800 hover:bg-teal-100 text-xs font-bold shadow-sm border border-teal-300 transition-all cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 text-teal-600" />
              <span>Official WhatsApp QR Card</span>
            </button>
          </div>

          <button
            onClick={() => setShowFlyerModal(true)}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-slate-700 hover:text-blue-700 text-xs font-bold shadow-sm border border-slate-200 hover:border-blue-400 transition-all cursor-pointer"
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
            {/* Background Villa Image - Bright and Visible */}
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
                alt="Luxury Modern Architecture in Nigeria"
                className="w-full h-full object-cover object-center brightness-85"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a192f]/85 via-[#0a192f]/45 to-transparent" />
            </div>

            {/* Left Headline Area */}
            <div className="relative z-10 max-w-xl space-y-4 pt-4 sm:pt-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
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
              {/* 3 Photos Strip (8 cols) featuring REAL PROPERTIES */}
              <div className="lg:col-span-8 grid grid-cols-3 gap-3">
                <Link 
                  href="/properties/standard-3-bedroom-bungalow-kara-oke-ose"
                  className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md group border border-slate-200"
                >
                  <img
                    src="/images/property-kara-oke-ose.jpg"
                    alt="Standard 3-Bedroom Bungalow & 2 Plots at Kara Oke Ose"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 text-white">
                    <span className="block text-[9px] font-black uppercase text-amber-300">Kara Oke Ose</span>
                    <span className="text-[10px] font-bold truncate block">3-Bed Bungalow • ₦9.5M</span>
                  </div>
                </Link>

                <Link 
                  href="/properties/prime-frontline-shops-rooms-eleko"
                  className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md group border border-slate-200"
                >
                  <img
                    src="/images/property-commercial-shops-eleko.jpg"
                    alt="Frontline Commercial Shops with Borehole in Eleko"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 text-white">
                    <span className="block text-[9px] font-black uppercase text-sky-300">Eleko Corridor</span>
                    <span className="text-[10px] font-bold truncate block">Shops & Rooms • ₦180k/yr</span>
                  </div>
                </Link>

                <Link 
                  href="/properties/campus-serene-student-lodge-poly-gate"
                  className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md group border border-slate-200"
                >
                  <img
                    src="/images/hostel-student-lodge.jpg"
                    alt="Student Hostel Lodge in Poly Gate"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 text-white">
                    <span className="block text-[9px] font-black uppercase text-emerald-300">Poly Gate Lodge</span>
                    <span className="text-[10px] font-bold truncate block">Student Rooms • ₦130k/yr</span>
                  </div>
                </Link>
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
                    href="tel:09161116718"
                    className="flex items-center gap-2 text-xl sm:text-2xl font-black text-white hover:text-emerald-400 transition-colors"
                  >
                    <Phone className="w-5 h-5 text-[#00a8ff]" />
                    <span>09161116718</span>
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
                <div className="flex items-center gap-4 bg-white/5 hover:bg-white/10 p-3 rounded-2xl border border-white/15 transition-all group">
                  {/* Real WhatsApp QR Code Thumbnail with Lightbox */}
                  <div
                    onClick={() => setShowQrModal(true)}
                    className="w-20 h-20 bg-white p-1 rounded-xl shrink-0 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform overflow-hidden cursor-pointer"
                    title="Click to view full WhatsApp QR code card"
                  >
                    <img
                      src="/images/ridwan-whatsapp-qr.jpg"
                      alt="WhatsApp QR Code for Balogun Ridwan"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-1 text-left">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                      <MessageCircle className="w-4 h-4 fill-[#25D366] text-[#25D366]" />
                      <span>WhatsApp</span>
                    </div>
                    <p className="text-[11px] text-slate-300">Click or Scan to connect</p>
                    <a
                      href="https://wa.me/qr/W4VP4AFFIC5UC"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-[10px] font-extrabold text-emerald-400 hover:text-emerald-300 underline"
                    >
                      Open wa.me/qr/W4VP4AFFIC5UC &rarr;
                    </a>
                  </div>
                </div>
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
