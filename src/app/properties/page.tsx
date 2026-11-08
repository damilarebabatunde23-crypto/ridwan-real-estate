'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Search, 
  MapPin, 
  SlidersHorizontal, 
  Tag, 
  ArrowUpDown, 
  CheckCircle2, 
  ShieldCheck, 
  RotateCcw,
  GraduationCap,
  MessageCircle,
  Sparkles
} from 'lucide-react';
import { Property, BusinessSettings, PropertyCategory } from '@/types/property';
import { getProperties, getSettings, getWhatsAppGeneralLink } from '@/lib/store';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import InspectionModal from '@/components/InspectionModal';
import WhatsAppCommunityBanner from '@/components/WhatsAppCommunityBanner';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';

export default function PropertiesCataloguePage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [settings, setSettings] = useState<BusinessSettings | null>(null);
  const [selectedPropertyForInspection, setSelectedPropertyForInspection] = useState<Property | null>(null);

  // Filters & Sorting
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedPurpose, setSelectedPurpose] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [priceSort, setPriceSort] = useState<'default' | 'asc' | 'desc'>('default');

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

  const categories: PropertyCategory[] = [
    'Houses for Sale',
    'Lands for Sale',
    'Apartments for Rent',
    'Rooms for Rent',
    'Shops for Rent',
    'Commercial Properties',
    'Residential Properties',
    'Investment Properties',
    'Student Hostels'
  ];

  const filteredProperties = useMemo(() => {
    let result = properties.filter((item) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = item.title.toLowerCase().includes(q);
        const inDesc = item.description.toLowerCase().includes(q);
        const inLoc = item.location.toLowerCase().includes(q);
        const inFacilities = item.facilities?.some((f) => f.toLowerCase().includes(q));
        if (!inTitle && !inDesc && !inLoc && !inFacilities) return false;
      }

      // Category
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Location
      if (selectedLocation !== 'all' && item.location !== selectedLocation) {
        return false;
      }

      // Purpose
      if (selectedPurpose !== 'all' && item.purpose !== selectedPurpose) {
        return false;
      }

      // Status
      if (selectedStatus !== 'all' && item.status !== selectedStatus) {
        return false;
      }

      return true;
    });

    // Sorting
    if (priceSort === 'asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (priceSort === 'desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [properties, searchQuery, selectedCategory, selectedLocation, selectedPurpose, selectedStatus, priceSort]);

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedLocation('all');
    setSelectedPurpose('all');
    setSelectedStatus('all');
    setPriceSort('default');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar />

      {/* Top Hero Banner with High-Resolution Luxury Real Estate Image */}
      <section className="relative min-h-[340px] sm:min-h-[380px] flex items-center bg-[#0a192f] text-white py-16 px-4 sm:px-8 border-b border-slate-800 overflow-hidden">
        {/* Luxury Real Estate Image Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
            alt="Luxury Real Estate Properties in Ilorin, Kwara State"
            className="w-full h-full object-cover object-center brightness-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a192f] via-[#0a192f]/90 to-[#0c2340]/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-sky-300 border border-blue-400/30 flex items-center gap-1.5 backdrop-blur-sm">
              <Building2 className="w-4 h-4 text-sky-400" />
              <span>Full Marketplace Catalogue</span>
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-sm">
              Eleko • Ilorin • Kwara State
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white drop-shadow-md">
            PROPERTIES IN ILORIN
          </h1>

          <p className="text-sm sm:text-base text-slate-200 max-w-3xl leading-relaxed drop-shadow">
            Explore verified residential homes, commercial shops, prime dry lands, student hostels, and high-yield real estate investment opportunities in Ilorin, Kwara State.
          </p>
        </div>
      </section>

      {/* Main Filter & Listing Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-10 flex-1 w-full space-y-8">
        {/* Category Pills Scroller */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#0a192f] text-white shadow'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            All Categories ({properties.length})
          </button>
          {categories.map((cat) => {
            const count = properties.filter((p) => p.category === cat).length;
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat === 'Student Hostels' && <GraduationCap className="w-3.5 h-3.5 text-sky-300" />}
                <span>{cat}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Filter Controls Row */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search by keywords, location, or features..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none text-slate-800"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Sort By Price */}
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
                <span className="font-semibold text-slate-600">Sort Price:</span>
                <select
                  value={priceSort}
                  onChange={(e: any) => setPriceSort(e.target.value)}
                  className="bg-transparent font-bold text-slate-800 outline-none cursor-pointer"
                >
                  <option value="default">Default</option>
                  <option value="asc">Low to High</option>
                  <option value="desc">High to Low</option>
                </select>
              </div>

              <button
                onClick={handleReset}
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-rose-600 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Sub Filters: Location, Purpose, Status */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Location in Ilorin
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full p-2.5 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="all">All Locations</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Transaction Purpose
              </label>
              <select
                value={selectedPurpose}
                onChange={(e) => setSelectedPurpose(e.target.value)}
                className="w-full p-2.5 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="all">All (Buy & Rent)</option>
                <option value="buy">For Sale (Buy)</option>
                <option value="rent">For Rent (Rent/Lease)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Availability Status
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full p-2.5 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="AVAILABLE">AVAILABLE</option>
                <option value="FEW ROOMS LEFT">FEW ROOMS LEFT</option>
                <option value="OCCUPIED">OCCUPIED</option>
                <option value="SOLD">SOLD</option>
              </select>
            </div>
          </div>
        </div>

        {/* Counter */}
        <div className="flex items-center justify-between text-xs text-slate-600">
          <div>
            Showing <strong className="text-blue-700 font-bold">{filteredProperties.length}</strong> available listings
          </div>
          <div className="text-slate-400">
            Real Estate. Real People. Real Results.
          </div>
        </div>

        {/* Listings Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProperties.map((prop) => (
              <PropertyCard
                key={prop.id}
                property={prop}
                showHostelBadges={prop.category === 'Student Hostels'}
                onScheduleInspection={(p) => setSelectedPropertyForInspection(p)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
              <Building2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">
              No Properties Found For This Selection
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              We frequently update our inventory with direct landlord mandates across Eleko, Poly Gate, Ganmo, and Oyun. Ask Balogun Ridwan directly on WhatsApp for off-market listings.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <button
                onClick={handleReset}
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs"
              >
                Reset Filters
              </button>
              <a
                href={getWhatsAppGeneralLink('Hello Balogun Ridwan, I am looking for a property in Ilorin. What new listings do you have available?')}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Contact Agent on WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </main>

      <WhatsAppCommunityBanner />
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
