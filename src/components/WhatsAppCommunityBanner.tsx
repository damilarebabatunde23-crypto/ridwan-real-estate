'use client';

import React, { useState, useEffect } from 'react';
import { Users, Bell, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { getSettings, getWhatsAppGeneralLink } from '@/lib/store';

export default function WhatsAppCommunityBanner() {
  const [whatsappLink, setWhatsappLink] = useState('https://wa.me/qr/W4VP4AFFIC5UC1');

  useEffect(() => {
    const settings = getSettings();
    if (settings?.whatsappGroupLink) {
      setWhatsappLink(settings.whatsappGroupLink);
    }
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (whatsappLink === '[INSERT ACTIVE WHATSAPP GROUP INVITATION LINK]' || !whatsappLink.startsWith('http')) {
      e.preventDefault();
      // If placeholder, open direct chat to ask for group link
      window.open(
        getWhatsAppGeneralLink('Hello Balogun Ridwan, I want to join your active WhatsApp real estate & hostel community in Ilorin. Please send me the group link!'),
        '_blank'
      );
    }
  };

  const hrefTarget = whatsappLink.startsWith('http') ? whatsappLink : '#';

  return (
    <section className="py-12 bg-gradient-to-r from-[#0a192f] via-[#112240] to-[#0a192f] text-white relative overflow-hidden border-y border-slate-800">
      <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 p-6 sm:p-10 rounded-3xl bg-slate-900/60 border border-slate-700/60 backdrop-blur-md">
          {/* Left Text */}
          <div className="space-y-3 text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              <Users className="w-3.5 h-3.5" />
              <span>Ilorin Real Estate & Student Alerts</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Join Our VIP WhatsApp Property & Hostel Community
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed">
              Be the first to see verified new student hostel vacancies near Kwara Poly & UNILORIN, fresh land deals in Eleko/Amoyo/Oyun, and distress property sales before they are publicly occupied.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-sky-200 pt-1">
              <span className="flex items-center gap-1.5">
                <Bell className="w-3.5 h-3.5 text-amber-400" />
                <span>Instant Vacancy Notifications</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verified Direct Landlords</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                <span>Exclusive Student Price Deals</span>
              </span>
            </div>
          </div>

          {/* Right Action Button */}
          <div className="shrink-0 flex flex-col items-center gap-2">
            <a
              href={hrefTarget}
              onClick={handleClick}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-emerald-900/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 border border-emerald-400/30"
            >
              <Users className="w-5 h-5" />
              <span>JOIN OUR WHATSAPP COMMUNITY</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <span className="text-[11px] text-slate-400 text-center">
              Free to join • Connect with Balogun Ridwan (09161116718)
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
