'use client';

import React from 'react';
import { 
  Search, 
  MapPin, 
  Building2, 
  Tag, 
  SlidersHorizontal, 
  RotateCcw,
  GraduationCap
} from 'lucide-react';
import { PropertyCategory, PropertyPurpose, AvailabilityStatus } from '@/types/property';

export interface FilterState {
  keyword: string;
  location: string;
  category: string;
  purpose: string;
  minPrice: string;
  maxPrice: string;
  status: string;
  isHostelOnly: boolean;
}

interface PropertySearchFilterProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  locations: string[];
  totalResults: number;
}

export default function PropertySearchFilter({
  filters,
  onFilterChange,
  locations,
  totalResults
}: PropertySearchFilterProps) {
  const handleChange = (field: keyof FilterState, value: any) => {
    onFilterChange({
      ...filters,
      [field]: value
    });
  };

  const handleReset = () => {
    onFilterChange({
      keyword: '',
      location: 'all',
      category: 'all',
      purpose: 'all',
      minPrice: '',
      maxPrice: '',
      status: 'all',
      isHostelOnly: false
    });
  };

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

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200/90 p-5 sm:p-7 space-y-4">
      {/* Top Search Input & Quick Hostels Toggle */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            placeholder="Search by title, features (e.g. Borehole, Self-contain, Poly Gate)..."
            value={filters.keyword}
            onChange={(e) => handleChange('keyword', e.target.value)}
            className="w-full pl-11 pr-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-900"
          />
        </div>

        {/* Hostel Quick Filter Pill */}
        <button
          type="button"
          onClick={() => {
            const nextVal = !filters.isHostelOnly;
            onFilterChange({
              ...filters,
              isHostelOnly: nextVal,
              category: nextVal ? 'Student Hostels' : 'all'
            });
          }}
          className={`px-4 py-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 shrink-0 ${
            filters.isHostelOnly
              ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
              : 'bg-sky-50 text-sky-800 hover:bg-sky-100 border border-sky-200'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Student Hostels Only</span>
        </button>
      </div>

      {/* Main Filter Dropdowns Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
        {/* Location Dropdown */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-blue-600" />
            <span>Location</span>
          </label>
          <select
            value={filters.location}
            onChange={(e) => handleChange('location', e.target.value)}
            className="w-full p-2.5 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none text-slate-800"
          >
            <option value="all">All Locations in Ilorin</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Category Dropdown */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Building2 className="w-3 h-3 text-blue-600" />
            <span>Category</span>
          </label>
          <select
            value={filters.category}
            onChange={(e) => {
              const val = e.target.value;
              onFilterChange({
                ...filters,
                category: val,
                isHostelOnly: val === 'Student Hostels'
              });
            }}
            className="w-full p-2.5 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none text-slate-800"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Purpose: Buy or Rent */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Tag className="w-3 h-3 text-blue-600" />
            <span>Buy or Rent</span>
          </label>
          <select
            value={filters.purpose}
            onChange={(e) => handleChange('purpose', e.target.value)}
            className="w-full p-2.5 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none text-slate-800"
          >
            <option value="all">Any (Buy & Rent)</option>
            <option value="buy">For Sale (Buy)</option>
            <option value="rent">For Rent (Lease)</option>
          </select>
        </div>

        {/* Availability Status */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
            <SlidersHorizontal className="w-3 h-3 text-blue-600" />
            <span>Availability</span>
          </label>
          <select
            value={filters.status}
            onChange={(e) => handleChange('status', e.target.value)}
            className="w-full p-2.5 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none text-slate-800"
          >
            <option value="all">All Statuses</option>
            <option value="AVAILABLE">Available</option>
            <option value="FEW ROOMS LEFT">Few Rooms Left</option>
            <option value="OCCUPIED">Occupied</option>
            <option value="SOLD">Sold</option>
          </select>
        </div>

        {/* Price Bracket */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            Max Budget (₦)
          </label>
          <select
            value={filters.maxPrice}
            onChange={(e) => handleChange('maxPrice', e.target.value)}
            className="w-full p-2.5 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none text-slate-800"
          >
            <option value="">Any Budget</option>
            <option value="200000">Up to ₦200,000</option>
            <option value="350000">Up to ₦350,000</option>
            <option value="600000">Up to ₦600,000</option>
            <option value="1500000">Up to ₦1.5M</option>
            <option value="5000000">Up to ₦5M</option>
            <option value="15000000">Up to ₦15M</option>
            <option value="50000000">Up to ₦50M</option>
          </select>
        </div>
      </div>

      {/* Footer bar with results count and reset */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span className="font-semibold text-slate-700">
          Showing <strong className="text-blue-700">{totalResults}</strong> listings matching your criteria
        </span>
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 text-slate-500 hover:text-rose-600 font-semibold transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Filters</span>
        </button>
      </div>
    </div>
  );
}
