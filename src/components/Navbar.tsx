'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Menu, 
  X, 
  ShieldCheck, 
  GraduationCap, 
  Home, 
  Building2, 
  Award, 
  Users, 
  MessageCircle, 
  Lock,
  ExternalLink
} from 'lucide-react';
import { getSettings, getWhatsAppGeneralLink } from '@/lib/store';
import { BusinessSettings } from '@/types/property';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<BusinessSettings | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    setSettings(getSettings());
    const handleUpdate = () => setSettings(getSettings());
    window.addEventListener('rca_storage_updated', handleUpdate);
    return () => window.removeEventListener('rca_storage_updated', handleUpdate);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Properties', href: '/properties' },
    { 
      name: 'Student Hostels', 
      href: '/hostels', 
      badge: 'Hot in Ilorin', 
      isHostel: true 
    },
    { name: 'Services', href: '/services' },
    { name: 'Credentials', href: '/credentials' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const phone = settings?.phoneDisplay || '07082256257';
  const rawPhone = settings?.phone || '+2347082256257';
  const email = settings?.email || 'Ridwanyunnus@gmail.com';
  const location = settings?.address || 'Eleko, Ilorin, Kwara State';
  const whatsappCommunityLink = settings?.whatsappGroupLink || '[INSERT ACTIVE WHATSAPP GROUP INVITATION LINK]';

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md">
      {/* Top Bar for Trust & Quick Contacts */}
      <div className="bg-[#0a192f] text-slate-300 text-xs py-2 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
            <span className="flex items-center gap-1.5 text-sky-400 font-medium">
              <MapPin className="w-3.5 h-3.5" />
              <span>{location}</span>
            </span>
            <a 
              href={`tel:${phone}`} 
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>{phone}</span>
            </a>
            <a 
              href={`mailto:${email}`} 
              className="hidden md:flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-sky-400" />
              <span>{email}</span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={whatsappCommunityLink.startsWith('http') ? whatsappCommunityLink : getWhatsAppGeneralLink('Hello Balogun Ridwan, please add me to your WhatsApp Community for Ilorin property and hostel updates.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 transition-colors border border-emerald-500/40 text-[11px] font-semibold"
            >
              <Users className="w-3 h-3" />
              <span>Join WhatsApp Community</span>
            </a>
            <Link
              href="/admin"
              className="hidden lg:flex items-center gap-1 text-slate-400 hover:text-white transition-colors text-[11px] pl-2 border-l border-slate-700"
              title="Admin Portal"
            >
              <Lock className="w-3 h-3" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Logo Treatment */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-[#0a192f] via-[#1d4ed8] to-[#0ea5e9] text-white shadow-md shadow-blue-900/20 group-hover:scale-105 transition-transform">
            <Building2 className="w-6 h-6 text-sky-200" />
            <div className="absolute -bottom-1 -right-1 bg-amber-500 rounded-full p-0.5 border-2 border-white">
              <ShieldCheck className="w-3 h-3 text-white" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold tracking-tight text-lg sm:text-xl text-[#0a192f]">
                RIDWANULLAHI
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200">
                CERTIFIED
              </span>
            </div>
            <div className="text-[11px] font-medium text-slate-500 tracking-wide flex items-center gap-1">
              <span>REAL ESTATE AGENT</span>
              <span className="text-slate-300">•</span>
              <span className="text-sky-600 font-semibold">ILORIN, KWARA</span>
            </div>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-3 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'text-blue-700 bg-blue-50'
                    : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                {link.isHostel && (
                  <GraduationCap className="w-4 h-4 text-sky-600" />
                )}
                <span>{link.name}</span>
                {link.badge && (
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Right CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={getWhatsAppGeneralLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-semibold text-sm shadow-md shadow-emerald-600/20 hover:shadow-lg transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={getWhatsAppGeneralLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
            title="WhatsApp Agent"
          >
            <MessageCircle className="w-5 h-5" />
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="text-xs uppercase font-bold text-slate-400 px-3 pt-2">
            Navigation Menu
          </div>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-semibold ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  {link.isHostel ? (
                    <GraduationCap className="w-5 h-5 text-sky-600" />
                  ) : link.name === 'Home' ? (
                    <Home className="w-5 h-5 text-slate-500" />
                  ) : link.name === 'Properties' ? (
                    <Building2 className="w-5 h-5 text-slate-500" />
                  ) : link.name === 'Credentials' ? (
                    <Award className="w-5 h-5 text-slate-500" />
                  ) : (
                    <ShieldCheck className="w-5 h-5 text-slate-500" />
                  )}
                  <span>{link.name}</span>
                </div>
                {link.badge && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}

          <div className="pt-4 border-t border-slate-100 space-y-2.5">
            <a
              href={getWhatsAppGeneralLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Direct WhatsApp Chat</span>
            </a>
            <a
              href={`tel:${phone}`}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>Call: {phone}</span>
            </a>
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-slate-500 hover:text-slate-800 text-xs font-medium"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin Portal Login</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
