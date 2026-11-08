'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle, 
  GraduationCap, 
  ExternalLink,
  Users,
  Globe,
  ArrowRight
} from 'lucide-react';
import { FacebookIcon, LinkedInIcon } from '@/components/SocialIcons';
import { getSettings, getWhatsAppGeneralLink } from '@/lib/store';
import { BusinessSettings } from '@/types/property';

export default function Footer() {
  const [settings, setSettings] = useState<BusinessSettings | null>(null);
  const [currentYear, setCurrentYear] = useState('2026');

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
    setSettings(getSettings());
    const handleUpdate = () => setSettings(getSettings());
    window.addEventListener('rca_storage_updated', handleUpdate);
    return () => window.removeEventListener('rca_storage_updated', handleUpdate);
  }, []);

  const phone = settings?.phoneDisplay || '07082256257';
  const email = settings?.email || 'Ridwanyunnus@gmail.com';
  const address = settings?.address || 'Eleko, Ilorin, Kwara State, Nigeria';
  const whatsappGroupLink = settings?.whatsappGroupLink || '[INSERT ACTIVE WHATSAPP GROUP INVITATION LINK]';
  const gbpLink = settings?.googleBusinessProfile || 'https://share.google/sjVg80f40cSexfRub';
  const linkedinLink = settings?.linkedinProfile || 'https://www.linkedin.com/in/ridwanullahi-certified-61a689303';
  const fbLink = settings?.facebookProfile || 'https://www.facebook.com/profile.php?id=100075809320428';

  const groupUrl = whatsappGroupLink.startsWith('http')
    ? whatsappGroupLink
    : getWhatsAppGeneralLink('Hello Balogun Ridwan, please share the link to join your active WhatsApp real estate & student hostel community.');

  return (
    <footer className="bg-[#0a192f] text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Col 1 & 2: Brand & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-sky-500 text-white shadow-md">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <span className="font-extrabold text-xl text-white tracking-tight">
                  RIDWANULLAHI
                </span>
                <span className="ml-2 text-xs uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-500/20 text-sky-400 border border-blue-500/30">
                  CERTIFIED AGENT
                </span>
                <p className="text-xs text-slate-400 font-medium">BALOGUN RIDWAN BABATUNDE</p>
              </div>
            </Link>

            <p className="text-sm text-slate-300 leading-relaxed max-w-md">
              <strong className="text-white">"Real Estate. Real People. Real Results."</strong>
              <br />
              <span className="text-sky-300 font-medium">Your Dream Home Is Our Priority.</span>
              <br />
              Providing certified, transparent and dependable real estate services in Ilorin, Kwara State. Specializing in land sales, residential homes, shops, property management, and dedicated student hostel accommodation.
            </p>

            {/* Social / Profile Links */}
            <div className="pt-2">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Verified Profiles & Socials
              </div>
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href={gbpLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-colors border border-slate-700"
                >
                  <Globe className="w-3.5 h-3.5 text-blue-400" />
                  <span>Google Business Profile</span>
                </a>
                <a
                  href={linkedinLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-colors border border-slate-700"
                >
                  <LinkedInIcon className="w-3.5 h-3.5 text-sky-400" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={fbLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-colors border border-slate-700"
                >
                  <FacebookIcon className="w-3.5 h-3.5 text-blue-500" />
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-sky-400" /> Home
                </Link>
              </li>
              <li>
                <Link href="/properties" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-sky-400" /> Property Catalogue
                </Link>
              </li>
              <li>
                <Link href="/hostels" className="text-sky-300 hover:text-white font-medium transition-colors flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-sky-400" /> Student Hostels
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-sky-400" /> Our Services
                </Link>
              </li>
              <li>
                <Link href="/credentials" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Credentials & Certs
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-sky-400" /> About Balogun Ridwan
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-sky-400" /> Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Top Locations in Ilorin */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Popular Locations
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-sky-400" /> Eleko (Agency Headquarters)
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-sky-400" /> Poly Gate (Kwara Poly Hub)
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-sky-400" /> Oke Ose (UITH Campus)
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-sky-400" /> Ganmo & Amoyo
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-sky-400" /> Gaa Akanbi & Oyun
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-sky-400" /> Yakuba & Tanke
              </li>
            </ul>

            <div className="pt-2">
              <Link
                href="/hostels"
                className="inline-block text-xs font-semibold text-sky-400 hover:text-sky-300 underline"
              >
                Browse Student Accommodation &rarr;
              </Link>
            </div>
          </div>

          {/* Col 5: Direct Contact & WhatsApp */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Contact Balogun Ridwan
            </h4>
            <div className="space-y-2 text-xs text-slate-300">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>{address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${phone}`} className="hover:text-white">
                  {phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-white break-all">
                  {email}
                </a>
              </p>
            </div>

            {/* Direct WhatsApp Action */}
            <div className="pt-2 space-y-2">
              <a
                href={getWhatsAppGeneralLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white" />
                <span>WhatsApp: {phone}</span>
              </a>

              <a
                href={groupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-300 border border-slate-700 text-xs font-semibold transition-colors"
              >
                <Users className="w-3.5 h-3.5" />
                <span>Join WhatsApp Community</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {currentYear} RIDWANULLAHI CERTIFIED AGENT. All rights reserved. Registered in Eleko, Ilorin, Kwara State, Nigeria.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Real Estate. Real People. Real Results.</span>
            <span>•</span>
            <Link href="/credentials" className="hover:text-white underline">
              Verified Documents
            </Link>
            <span>•</span>
            <Link href="/admin" className="hover:text-white">
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
