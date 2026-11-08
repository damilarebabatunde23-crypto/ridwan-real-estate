'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  ShieldCheck, 
  Search, 
  GraduationCap, 
  MessageCircle, 
  ArrowRight, 
  MapPin, 
  Sparkles, 
  Phone, 
  CheckCircle2, 
  Clock, 
  Award,
  Users,
  Compass,
  Zap,
  Droplet,
  ChevronRight
} from 'lucide-react';
import { Property, BusinessSettings } from '@/types/property';
import { 
  getProperties, 
  getSettings, 
  getWhatsAppGeneralLink, 
  formatNaira, 
  formatPriceWithPeriod 
} from '@/lib/store';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import InspectionModal from '@/components/InspectionModal';
import ServicesSection from '@/components/ServicesSection';
import CredentialsSection from '@/components/CredentialsSection';
import WhatsAppCommunityBanner from '@/components/WhatsAppCommunityBanner';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';
import PropertySearchFilter, { FilterState } from '@/components/PropertySearchFilter';

export default function HomePage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [settings, setSettings] = useState<BusinessSettings | null>(null);
  const [selectedPropertyForInspection, setSelectedPropertyForInspection] = useState<Property | null>(null);

  const [filters, setFilters] = useState<FilterState>({
    keyword: '',
    location: 'all',
    category: 'all',
    purpose: 'all',
    minPrice: '',
    maxPrice: '',
    status: 'all',
    isHostelOnly: false,
  });

  useEffect(() => {
    setProperties(getProperties());
    setSettings(getSettings());

    const handleUpdate = () => {
      setProperties(getProperties());
      setSettings(getSettings());
    };
    window.addEventListener('rca_storage_updated', handleUpdate);
    return () => window.removeEventListener('rca_storage_updated', handleUpdate);
  }, []);

  const locations = settings?.locations || [
    'Ilorin', 'Oyun', 'Yakuba', 'Amoyo', 'Gaa Akanbi', 'Ganmo', 'Eleko', 'Oke Ose', 'Poly Gate'
  ];

  // Filtered properties for live search
  const filteredProperties = useMemo(() => {
    return properties.filter((item) => {
      // Keyword
      if (filters.keyword.trim()) {
        const q = filters.keyword.toLowerCase();
        const inTitle = item.title.toLowerCase().includes(q);
        const inDesc = item.description.toLowerCase().includes(q);
        const inLoc = item.location.toLowerCase().includes(q);
        const inFacilities = item.facilities?.some((f) => f.toLowerCase().includes(q));
        const inHostelName = item.hostelDetails?.hostelName?.toLowerCase().includes(q);
        if (!inTitle && !inDesc && !inLoc && !inFacilities && !inHostelName) return false;
      }

      // Location
      if (filters.location !== 'all' && item.location !== filters.location) {
        return false;
      }

      // Category / Hostel only
      if (filters.isHostelOnly && item.category !== 'Student Hostels') {
        return false;
      } else if (!filters.isHostelOnly && filters.category !== 'all' && item.category !== filters.category) {
        return false;
      }

      // Purpose
      if (filters.purpose !== 'all' && item.purpose !== filters.purpose) {
        return false;
      }

      // Status
      if (filters.status !== 'all' && item.status !== filters.status) {
        return false;
      }

      // Price limits
      if (filters.minPrice && item.price < Number(filters.minPrice)) {
        return false;
      }
      if (filters.maxPrice && item.price > Number(filters.maxPrice)) {
        return false;
      }

      return true;
    });
  }, [properties, filters]);

  // Featured Properties
  const featuredProperties = useMemo(() => {
    const featured = properties.filter((p) => p.isFeatured && p.category !== 'Student Hostels');
    return featured.length > 0 ? featured.slice(0, 4) : properties.slice(0, 4);
  }, [properties]);

  // Featured Student Hostels
  const studentHostels = useMemo(() => {
    return properties.filter((p) => p.category === 'Student Hostels');
  }, [properties]);

  const phone = settings?.phoneDisplay || '07082256257';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[640px] lg:min-h-[720px] flex items-center justify-center bg-[#0a192f] text-white overflow-hidden py-20 px-4 sm:px-8">
        {/* Luxury Modern House Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
            alt="Luxury Modern Real Estate in Nigeria"
            className="w-full h-full object-cover object-center brightness-40"
          />
          {/* Deep Navy/Royal Blue Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a192f] via-[#0a192f]/85 to-[#0f244a]/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-transparent to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
          {/* Certified Seal Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-bold text-sky-300 shadow-xl">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>BALOGUN RIDWAN BABATUNDE • CERTIFIED REAL ESTATE AGENT</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight sm:leading-none">
            FIND YOUR <span className="bg-gradient-to-r from-sky-400 via-blue-300 to-white bg-clip-text text-transparent">PERFECT</span> PROPERTY
          </h1>

          {/* Subtitle & Tagline */}
          <div className="space-y-1">
            <p className="text-xl sm:text-2xl font-bold text-sky-200 tracking-wide">
              Your Dream Home Is Our Priority.
            </p>
            <p className="text-sm sm:text-base text-slate-300 font-medium max-w-2xl mx-auto">
              "Real Estate. Real People. Real Results." — Verified houses, dry lands, commercial shops, and student hostels in Eleko, Poly Gate, Oke Ose & across Ilorin, Kwara State.
            </p>
          </div>

          {/* CTA Buttons Row */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="#search-section"
              className="px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-blue-700/40 hover:scale-105 transition-all flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>Search Properties</span>
            </a>

            <Link
              href="/hostels"
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-sky-600/30 hover:scale-105 transition-all flex items-center gap-2"
            >
              <GraduationCap className="w-5 h-5 text-amber-300" />
              <span>Explore Student Hostels</span>
            </Link>

            <a
              href={getWhatsAppGeneralLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-emerald-700/40 hover:scale-105 transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>Contact on WhatsApp</span>
            </a>
          </div>

          {/* Trust Highlights */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto text-xs text-slate-300 font-medium">
            <div className="p-2.5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Zero Fraud Guarantee</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center gap-2">
              <GraduationCap className="w-4 h-4 text-sky-400" />
              <span>Kwara Poly & UNILORIN</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Surveyor Verified</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center gap-2">
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>Direct: {phone}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Search & Filter Section */}
      <section id="search-section" className="relative -mt-12 z-20 max-w-7xl mx-auto px-4 sm:px-8 w-full">
        <PropertySearchFilter
          filters={filters}
          onFilterChange={setFilters}
          locations={locations}
          totalResults={filteredProperties.length}
        />
      </section>

      {/* Live Search Results (When Filter Active) */}
      {(filters.keyword || filters.location !== 'all' || filters.category !== 'all' || filters.purpose !== 'all' || filters.status !== 'all' || filters.maxPrice || filters.isHostelOnly) && (
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-8 w-full">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-black text-slate-900">
                Search Results ({filteredProperties.length})
              </h2>
              <p className="text-xs text-slate-500">
                Matching listings based on your active filters.
              </p>
            </div>
          </div>

          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((prop) => (
                <PropertyCard
                  key={prop.id}
                  property={prop}
                  onScheduleInspection={(p) => setSelectedPropertyForInspection(p)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 space-y-4">
              <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                <Search className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">No properties matched this filter</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Try widening your budget, selecting "All Locations", or contact Balogun Ridwan directly to request an off-market search in Ilorin.
              </p>
              <a
                href={getWhatsAppGeneralLink('Hello Balogun Ridwan, I am looking for a specific property in Ilorin that wasn\'t on your list. Can you help me find it?')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Request Custom Property Search via WhatsApp</span>
              </a>
            </div>
          )}
        </section>
      )}

      {/* Featured Student Hostels Showcase (One of the most important features) */}
      <section className="py-20 bg-gradient-to-b from-sky-50/60 to-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-sky-100 text-sky-900 border border-sky-200">
                <GraduationCap className="w-4 h-4 text-sky-600" />
                <span>Student Hostel Marketplace</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Student Hostels in Ilorin
              </h2>
              <p className="text-sm text-slate-600 max-w-2xl">
                Verified, secure, and affordable off-campus student accommodation in Poly Gate, Oke Ose, Eleko and student corridors. Running water, steady electricity, and transparent rents.
              </p>
            </div>

            <Link
              href="/hostels"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0a192f] hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shrink-0 transition-colors shadow-md"
            >
              <span>Explore All Hostels</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studentHostels.slice(0, 3).map((hostel) => (
              <PropertyCard
                key={hostel.id}
                property={hostel}
                showHostelBadges={true}
                onScheduleInspection={(p) => setSelectedPropertyForInspection(p)}
              />
            ))}
          </div>

          {/* Quick Hostel Perks Bar */}
          <div className="mt-10 p-6 rounded-2xl bg-white border border-sky-100 shadow-md grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                <Droplet className="w-5 h-5" />
              </div>
              <div>
                <strong className="block text-slate-900 font-bold">24/7 Running Borehole</strong>
                <span className="text-slate-500">Constant water supply & overhead tanks.</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <strong className="block text-slate-900 font-bold">Prepaid Meters & Light</strong>
                <span className="text-slate-500">Dedicated metres and stable campus power lines.</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <strong className="block text-slate-900 font-bold">Campus Proximity & Security</strong>
                <span className="text-slate-500">Walking distance to gates & fenced compounds.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties (Houses, Lands, Commercial) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-blue-100 text-blue-900 border border-blue-200">
                <Building2 className="w-4 h-4 text-blue-700" />
                <span>Featured Property Deals</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Featured Houses, Lands & Investments
              </h2>
              <p className="text-sm text-slate-600 max-w-2xl">
                Carefully inspected residential bungalows, commercial shops, and surveyed lands in high-demand Ilorin neighborhoods.
              </p>
            </div>

            <Link
              href="/properties"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shrink-0 transition-colors shadow-md"
            >
              <span>View Full Catalogue</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProperties.map((prop) => (
              <PropertyCard
                key={prop.id}
                property={prop}
                onScheduleInspection={(p) => setSelectedPropertyForInspection(p)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp Community Banner */}
      <WhatsAppCommunityBanner />

      {/* Comprehensive Services Section */}
      <ServicesSection />

      {/* Professional Credentials Section */}
      <CredentialsSection />

      {/* About The Agent Quick Spotlight */}
      <section className="py-20 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="bg-gradient-to-br from-[#0a192f] via-[#112240] to-[#1e3a8a] rounded-3xl p-8 sm:p-14 text-white shadow-2xl relative overflow-hidden">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  <span>Certified Estate Practitioner</span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                  Meet Balogun Ridwan Babatunde
                </h3>
                <p className="text-sky-200 font-semibold text-base sm:text-lg">
                  RIDWANULLAHI CERTIFIED AGENT — Eleko, Ilorin, Kwara State
                </p>
                <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
                  "Real Estate. Real People. Real Results. Your Dream Home Is Our Priority."
                  <br /><br />
                  With intimate on-the-ground knowledge of Kwara State property markets—from student accommodation clusters around Kwara State Polytechnic to prime residential layouts in Eleko and commercial corridors in Ganmo—we provide authentic guidance without false claims or hidden fees.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Link
                    href="/about"
                    className="px-6 py-3 rounded-xl bg-white text-slate-900 font-bold text-xs sm:text-sm hover:bg-slate-100 transition-colors"
                  >
                    Read Full Agent Biography &rarr;
                  </Link>
                  <a
                    href={getWhatsAppGeneralLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-colors flex items-center gap-2 shadow-md"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>WhatsApp Balogun Ridwan</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-4 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 space-y-4 text-xs">
                <h4 className="font-bold text-white text-sm uppercase tracking-wider border-b border-white/10 pb-2">
                  Direct Office Contacts
                </h4>
                <div className="space-y-3 text-slate-200">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-white">Agency Location</strong>
                      <span>Eleko, Ilorin, Kwara State, Nigeria</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-white">Direct Mobile / WhatsApp</strong>
                      <a href={`tel:${phone}`} className="hover:text-white underline">
                        {phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Award className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-white">Verified Registration</strong>
                      <span>Balogun Ridwan Babatunde</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloatingButton />

      {/* Inspection Modal */}
      <InspectionModal
        property={selectedPropertyForInspection}
        isOpen={Boolean(selectedPropertyForInspection)}
        onClose={() => setSelectedPropertyForInspection(null)}
      />
    </div>
  );
}
