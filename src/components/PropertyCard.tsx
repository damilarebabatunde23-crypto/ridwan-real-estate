'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  MapPin, 
  Bed, 
  Bath, 
  Maximize2, 
  MessageCircle, 
  Calendar, 
  CheckCircle2, 
  GraduationCap, 
  Zap, 
  Droplet, 
  ShieldCheck, 
  Sparkles,
  ChevronRight,
  Info
} from 'lucide-react';
import { Property } from '@/types/property';
import { formatPriceWithPeriod, getWhatsAppPropertyLink, getWhatsAppHostelLink } from '@/lib/store';

interface PropertyCardProps {
  property: Property;
  onScheduleInspection?: (property: Property) => void;
  showHostelBadges?: boolean;
}

export default function PropertyCard({ 
  property, 
  onScheduleInspection,
  showHostelBadges = false 
}: PropertyCardProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const isHostel = property.category === 'Student Hostels';
  const priceDisplay = formatPriceWithPeriod(property.price, property.pricePeriod, property.category);
  const images = property.images && property.images.length > 0 ? property.images : [
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80'
  ];

  // Status Badge Colors & Labels
  const getStatusBadge = () => {
    switch (property.status) {
      case 'AVAILABLE':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-500 text-white shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            AVAILABLE
          </span>
        );
      case 'FEW ROOMS LEFT':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-extrabold bg-amber-500 text-white shadow-sm animate-pulse-subtle">
            <Sparkles className="w-3 h-3" />
            FEW ROOMS LEFT
          </span>
        );
      case 'OCCUPIED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-extrabold bg-rose-600 text-white shadow-sm">
            OCCUPIED
          </span>
        );
      case 'SOLD':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-extrabold bg-slate-800 text-slate-200 shadow-sm">
            SOLD
          </span>
        );
      default:
        return null;
    }
  };

  const whatsappUrl = isHostel 
    ? getWhatsAppHostelLink(property)
    : getWhatsAppPropertyLink(property);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 hover:border-blue-400 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Image Container with Badges */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        {/* Main Image */}
        <img
          src={images[activeImageIndex]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-900/30" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#0a192f]/90 text-white backdrop-blur-md border border-white/20">
              {property.category}
            </span>
            {isHostel && (
              <span className="px-2 py-1 rounded-full text-[11px] font-bold bg-sky-500 text-white shadow-sm flex items-center gap-1">
                <GraduationCap className="w-3 h-3" />
                Student Hostel
              </span>
            )}
          </div>
          <div>{getStatusBadge()}</div>
        </div>

        {/* Sample Listing Label (Per User Instruction) */}
        {property.isSampleListing && (
          <div className="absolute top-11 left-3 pointer-events-none">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-slate-900/90 text-amber-300 border border-amber-400/40 backdrop-blur-sm">
              <Info className="w-2.5 h-2.5 text-amber-400" />
              Sample Listing Template
            </span>
          </div>
        )}

        {/* Bottom Price & Location on Image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
          <div>
            <div className="text-xl sm:text-2xl font-black text-white drop-shadow-md">
              {priceDisplay}
            </div>
            <div className="flex items-center gap-1 text-xs text-sky-200 drop-shadow">
              <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span className="font-semibold">{property.location}, Ilorin</span>
            </div>
          </div>

          {/* Multiple Photo Indicator */}
          {images.length > 1 && (
            <div className="text-[10px] font-bold bg-black/60 px-2 py-1 rounded-md text-white backdrop-blur-sm border border-white/20 pointer-events-auto">
              {activeImageIndex + 1}/{images.length} Photos
            </div>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="font-bold text-slate-900 text-base sm:text-lg group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
            {property.title}
          </h3>

          <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
            {property.description}
          </p>
        </div>

        {/* Hostel-Specific Amenities or General Specs */}
        {isHostel && property.hostelDetails ? (
          <div className="bg-sky-50/60 rounded-xl p-3 border border-sky-100 space-y-2 text-xs">
            <div className="flex items-center justify-between font-semibold text-sky-950">
              <span className="flex items-center gap-1">
                <Bed className="w-3.5 h-3.5 text-sky-600" />
                <span>{property.hostelDetails.roomType}</span>
              </span>
              <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-bold text-[11px]">
                {property.hostelDetails.availableRooms > 0 
                  ? `${property.hostelDetails.availableRooms} rooms left`
                  : 'Fully Occupied'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-1.5 text-[11px] text-slate-600 pt-1 border-t border-sky-100">
              <div className="flex items-center gap-1 truncate" title={property.hostelDetails.waterStatus}>
                <Droplet className="w-3 h-3 text-sky-500 shrink-0" />
                <span className="truncate">Running Water</span>
              </div>
              <div className="flex items-center gap-1 truncate" title={property.hostelDetails.electricityStatus}>
                <Zap className="w-3 h-3 text-amber-500 shrink-0" />
                <span className="truncate">Prepaid / Light</span>
              </div>
              <div className="flex items-center gap-1 col-span-2 text-blue-900 font-medium">
                <GraduationCap className="w-3 h-3 text-blue-600 shrink-0" />
                <span className="truncate">{property.hostelDetails.distanceToCampus}</span>
              </div>
            </div>
          </div>
        ) : (
          /* General Specs */
          <div className="flex items-center gap-4 text-xs font-medium text-slate-600 py-2 border-y border-slate-100">
            {property.bedrooms !== undefined && (
              <span className="flex items-center gap-1.5">
                <Bed className="w-4 h-4 text-blue-600" />
                <span>{property.bedrooms} Beds</span>
              </span>
            )}
            {property.bathrooms !== undefined && (
              <span className="flex items-center gap-1.5">
                <Bath className="w-4 h-4 text-blue-600" />
                <span>{property.bathrooms} Baths</span>
              </span>
            )}
            {property.sizeSqMeters !== undefined && (
              <span className="flex items-center gap-1.5">
                <Maximize2 className="w-3.5 h-3.5 text-blue-600" />
                <span>{property.sizeSqMeters} m²</span>
              </span>
            )}
            {property.category === 'Lands for Sale' && (
              <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Dry Table Land</span>
              </span>
            )}
          </div>
        )}

        {/* Facilities Preview */}
        {property.facilities && property.facilities.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {property.facilities.slice(0, 3).map((facility, idx) => (
              <span
                key={idx}
                className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600"
              >
                {facility}
              </span>
            ))}
            {property.facilities.length > 3 && (
              <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-100 text-slate-400">
                +{property.facilities.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-2 grid grid-cols-2 gap-2">
          {onScheduleInspection ? (
            <button
              onClick={() => onScheduleInspection(property)}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors flex items-center justify-center gap-1"
            >
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              <span>Inspection</span>
            </button>
          ) : (
            <Link
              href={`/properties/${property.slug}`}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 text-xs font-bold transition-colors flex items-center justify-center gap-1"
            >
              <span>View Details</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          )}

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-1.5"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
