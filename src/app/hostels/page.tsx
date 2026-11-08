'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  GraduationCap, 
  Search, 
  MapPin, 
  SlidersHorizontal, 
  CheckCircle2, 
  Droplet, 
  Zap, 
  ShieldCheck, 
  MessageCircle, 
  Calendar, 
  Filter, 
  RotateCcw,
  Sparkles,
  Info,
  ChevronRight
} from 'lucide-react';
import { Property, BusinessSettings } from '@/types/property';
import { getProperties, getSettings, getWhatsAppHostelLink, getWhatsAppGeneralLink, formatPriceWithPeriod } from '@/lib/store';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import InspectionModal from '@/components/InspectionModal';
import WhatsAppCommunityBanner from '@/components/WhatsAppCommunityBanner';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';

export default function StudentHostelsPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [settings, setSettings] = useState<BusinessSettings | null>(null);
  const [selectedHostelForInspection, setSelectedHostelForInspection] = useState<Property | null>(null);

  // Hostel specific filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState('all');
  const [selectedRoomType, setSelectedRoomType] = useState('all');
  const [maxBudget, setMaxBudget] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [mustHaveBorehole, setMustHaveBorehole] = useState(false);
  const [mustHavePrepaid, setMustHavePrepaid] = useState(false);

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

  const hostelListings = useMemo(() => {
    return properties.filter((p) => p.category === 'Student Hostels');
  }, [properties]);

  const areas = useMemo(() => {
    const list = new Set<string>();
    hostelListings.forEach((h) => {
      if (h.location) list.add(h.location);
      if (h.hostelDetails?.area) list.add(h.hostelDetails.area);
    });
    return Array.from(list);
  }, [hostelListings]);

  const filteredHostels = useMemo(() => {
    return hostelListings.filter((hostel) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = hostel.title.toLowerCase().includes(q);
        const inHostelName = hostel.hostelDetails?.hostelName?.toLowerCase().includes(q);
        const inArea = hostel.location.toLowerCase().includes(q);
        const inSchools = hostel.hostelDetails?.nearbySchools?.some((s) => s.toLowerCase().includes(q));
        const inFacilities = hostel.facilities?.some((f) => f.toLowerCase().includes(q));
        if (!inTitle && !inHostelName && !inArea && !inSchools && !inFacilities) return false;
      }

      // Area
      if (selectedArea !== 'all' && hostel.location !== selectedArea && hostel.hostelDetails?.area !== selectedArea) {
        return false;
      }

      // Room Type
      if (selectedRoomType !== 'all' && hostel.hostelDetails?.roomType !== selectedRoomType) {
        return false;
      }

      // Max Budget
      if (maxBudget && hostel.price > Number(maxBudget)) {
        return false;
      }

      // Status
      if (selectedStatus !== 'all' && hostel.status !== selectedStatus) {
        return false;
      }

      // Borehole check
      if (mustHaveBorehole) {
        const hasBorehole = hostel.facilities?.some((f) => f.toLowerCase().includes('water') || f.toLowerCase().includes('borehole')) ||
          hostel.hostelDetails?.waterStatus.toLowerCase().includes('borehole');
        if (!hasBorehole) return false;
      }

      // Prepaid check
      if (mustHavePrepaid) {
        const hasPrepaid = hostel.facilities?.some((f) => f.toLowerCase().includes('prepaid') || f.toLowerCase().includes('meter')) ||
          hostel.hostelDetails?.electricityStatus.toLowerCase().includes('meter');
        if (!hasPrepaid) return false;
      }

      return true;
    });
  }, [hostelListings, searchQuery, selectedArea, selectedRoomType, maxBudget, selectedStatus, mustHaveBorehole, mustHavePrepaid]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedArea('all');
    setSelectedRoomType('all');
    setMaxBudget('');
    setSelectedStatus('all');
    setMustHaveBorehole(false);
    setMustHavePrepaid(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar />

      {/* Top Hero Banner with High-Resolution Background Image */}
      <section className="relative min-h-[340px] sm:min-h-[380px] flex items-center bg-[#0a192f] text-white py-16 px-4 sm:px-8 border-b border-slate-800 overflow-hidden">
        {/* Background Image with Cinematic Navy Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=2000&q=85"
            alt="Student Hostels in Ilorin, Kwara State"
            className="w-full h-full object-cover object-center brightness-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a192f] via-[#0a192f]/90 to-[#0c2340]/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-500/20 text-sky-300 border border-sky-400/30 flex items-center gap-1.5 backdrop-blur-sm">
              <GraduationCap className="w-4 h-4 text-sky-400" />
              <span>Campus Accommodation Marketplace</span>
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-sm">
              Verified Student Rents
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white drop-shadow-md">
            STUDENT HOSTELS IN ILORIN
          </h1>

          <p className="text-sm sm:text-base text-slate-200 max-w-3xl leading-relaxed drop-shadow">
            Browse verified, clean and secure student hostels, self-contains, and shared rooms near Kwara State Polytechnic, University of Ilorin, and college zones. Compare annual rental fees, check water & electricity stability, and book physical inspections.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-sky-200">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Direct Landlord Agreement</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Zero Fake Room Claims</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              <span>Poly Gate • Oke Ose • Eleko • Oyun • Tanke</span>
            </span>
          </div>
        </div>
      </section>

      {/* Main Filter & Listings Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-10 flex-1 w-full space-y-8">
        {/* Filter Bar */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-5 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search hostel name, campus, or facility (e.g. Al-Barakah, Kwara Poly, Borehole)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none text-slate-800"
              />
            </div>

            <button
              onClick={handleResetFilters}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-rose-600 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5 shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Area Filter */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Area / Neighbourhood
              </label>
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="w-full p-2.5 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="all">All Student Areas in Ilorin</option>
                {areas.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>

            {/* Room Type */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Room Configuration
              </label>
              <select
                value={selectedRoomType}
                onChange={(e) => setSelectedRoomType(e.target.value)}
                className="w-full p-2.5 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="all">Any Room Type</option>
                <option value="Self-Contain Studio">Self-Contain Studio</option>
                <option value="Self-Contain with Kitchenette">Self-Contain with Kitchenette</option>
                <option value="Single Room (Shared)">Single Room (Shared Facility)</option>
                <option value="2-Bedroom Shared Flat">2-Bedroom Shared Flat</option>
              </select>
            </div>

            {/* Price Filter */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Max Annual Rent
              </label>
              <select
                value={maxBudget}
                onChange={(e) => setMaxBudget(e.target.value)}
                className="w-full p-2.5 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Any Annual Rent</option>
                <option value="150000">Up to ₦150,000 / yr</option>
                <option value="200000">Up to ₦200,000 / yr</option>
                <option value="250000">Up to ₦250,000 / yr</option>
                <option value="350000">Up to ₦350,000 / yr</option>
              </select>
            </div>

            {/* Availability Status */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Room Availability
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full p-2.5 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="all">All (Available & Occupied)</option>
                <option value="AVAILABLE">AVAILABLE Only</option>
                <option value="FEW ROOMS LEFT">FEW ROOMS LEFT</option>
                <option value="OCCUPIED">OCCUPIED</option>
              </select>
            </div>
          </div>

          {/* Quick Checkbox Amenities */}
          <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-5 text-xs font-semibold text-slate-700">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={mustHaveBorehole}
                onChange={(e) => setMustHaveBorehole(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="flex items-center gap-1">
                <Droplet className="w-3.5 h-3.5 text-sky-500" />
                <span>Must Have Running Borehole Water</span>
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={mustHavePrepaid}
                onChange={(e) => setMustHavePrepaid(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>Dedicated Prepaid Meter</span>
              </span>
            </label>
          </div>
        </div>

        {/* Results Counter & Transparency Notice */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600">
          <div className="font-semibold">
            Showing <strong className="text-blue-700">{filteredHostels.length}</strong> student hostel accommodations
          </div>
          <div className="flex items-center gap-1.5 text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            <Info className="w-3.5 h-3.5 text-amber-600" />
            <span>Sample listings clearly labeled until verified vacancy updates are synchronized.</span>
          </div>
        </div>

        {/* Hostels Grid */}
        {filteredHostels.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHostels.map((hostel) => (
              <PropertyCard
                key={hostel.id}
                property={hostel}
                showHostelBadges={true}
                onScheduleInspection={(p) => setSelectedHostelForInspection(p)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
            <div className="w-16 h-16 bg-sky-50 text-sky-600 rounded-full flex items-center justify-center mx-auto">
              <GraduationCap className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">
              No Hostels Matched This Exact Query
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Hostel rooms move fast across Kwara Poly and UNILORIN campuses. Contact Balogun Ridwan directly to enquire about recently vacated rooms before they hit the market.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs"
              >
                Reset All Filters
              </button>
              <a
                href={getWhatsAppGeneralLink('Hello Balogun Ridwan, I need a student hostel in Ilorin. Can you share current vacancies and inspections?')}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chat with Agent on WhatsApp</span>
              </a>
            </div>
          </div>
        )}

        {/* Student Advice / Inspection Guide */}
        <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-xl font-bold text-slate-900">
            Student Hostel Inspection & Tenancy Guidelines
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600">
            <div className="space-y-1.5 p-4 rounded-xl bg-slate-50 border border-slate-100">
              <strong className="block text-slate-900 font-bold text-sm">1. Physical Viewing First</strong>
              <p>
                We do not ask students to pay rent or deposits before inspecting the room. Always confirm water flow, room ventilation, and security in person with Balogun Ridwan.
              </p>
            </div>
            <div className="space-y-1.5 p-4 rounded-xl bg-slate-50 border border-slate-100">
              <strong className="block text-slate-900 font-bold text-sm">2. Transparent Utility Rules</strong>
              <p>
                Every hostel listing details prepaid meter status, sanitation dues, and security guard coverage so roommates avoid unexpected surprises during the academic term.
              </p>
            </div>
            <div className="space-y-1.5 p-4 rounded-xl bg-slate-50 border border-slate-100">
              <strong className="block text-slate-900 font-bold text-sm">3. Direct Landlord Receipt</strong>
              <p>
                All tenancy agreements and receipts are formally issued with clear agreement terms, protecting your student tenancy rights throughout your academic stay in Ilorin.
              </p>
            </div>
          </div>
        </section>
      </main>

      <WhatsAppCommunityBanner />
      <Footer />
      <WhatsAppFloatingButton />

      {/* Inspection Modal */}
      <InspectionModal
        property={selectedHostelForInspection}
        isOpen={Boolean(selectedHostelForInspection)}
        onClose={() => setSelectedHostelForInspection(null)}
      />
    </div>
  );
}
