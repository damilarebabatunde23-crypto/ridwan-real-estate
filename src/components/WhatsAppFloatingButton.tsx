'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircle, X, ShieldCheck } from 'lucide-react';
import { getWhatsAppGeneralLink, getSettings } from '@/lib/store';

export default function WhatsAppFloatingButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [agentName, setAgentName] = useState('Balogun Ridwan');

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(true), 3500);
    const settings = getSettings();
    if (settings?.fullName) setAgentName(settings.fullName);
    return () => clearTimeout(timer);
  }, []);

  const whatsappUrl = getWhatsAppGeneralLink();

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Animated Pop-up Bubble */}
      {showTooltip && (
        <div className="mb-3 max-w-xs bg-white rounded-2xl shadow-2xl border border-slate-200 p-3.5 text-xs text-slate-700 animate-in fade-in slide-in-from-bottom-4 duration-300 relative">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 p-0.5"
            aria-label="Close message"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-center gap-1.5 font-bold text-slate-900 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>RIDWANULLAHI AGENT</span>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 rounded font-bold">Online</span>
          </div>
          <p className="text-slate-600 leading-snug">
            Need student hostels in Ilorin or land/houses for sale? Tap below to chat directly with Balogun Ridwan on WhatsApp!
          </p>
        </div>
      )}

      {/* Main WhatsApp Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with Balogun Ridwan Babatunde"
        className="group relative flex items-center gap-2.5 px-4 py-3.5 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white shadow-2xl shadow-emerald-600/50 hover:shadow-emerald-600/70 hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-white"
      >
        <span className="relative flex items-center justify-center">
          <MessageCircle className="w-6 h-6 fill-white" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 border-2 border-emerald-600 rounded-full" />
        </span>
        <span className="hidden sm:inline font-bold text-sm tracking-wide">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
}
