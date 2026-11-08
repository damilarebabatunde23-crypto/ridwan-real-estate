'use client';

import React, { useState, useEffect, use, Suspense } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize2, 
  CheckCircle2, 
  ShieldCheck, 
  Calendar, 
  MessageCircle, 
  Phone, 
  Mail, 
  ArrowLeft, 
  Share2, 
  Droplet, 
  Zap, 
  GraduationCap, 
  ChevronRight,
  Info
} from 'lucide-react';
import { Property, BusinessSettings } from '@/types/property';
import { 
  getProperties, 
  getPropertyBySlug, 
  getSettings, 
  formatPriceWithPeriod, 
  getWhatsAppPropertyLink, 
  getWhatsAppHostelLink,
  getWhatsAppGeneralLink 
} from '@/lib/store';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import InspectionModal from '@/components/InspectionModal';
import WhatsAppCommunityBanner from '@/components/WhatsAppCommunityBanner';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';

interface PageProps {
  params: Promise<{ slug: string }>;
}

function PropertyDetailContent({ params }: PageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const [property, setProperty] = useState<Property | null>(null);
  const [settings, setSettings] = useState<BusinessSettings | null>(null);
  const [activeImage, setActiveImage] = useState<string>('');
  const [isInspectionOpen, setIsInspectionOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const found = getPropertyBySlug(slug);
    if (found) {
      setProperty(found);
      setActiveImage(found.images?.[0] || '');
    }
    setSettings(getSettings());
  }, [slug]);

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
          <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center text-slate-500">
            <Building2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Property Listing Not Found</h2>
          <p className="text-sm text-slate-500 max-w-md">
            This property listing may have been rented, sold, or updated in the catalog.
          </p>
          <div className="pt-2 flex gap-3">
            <Link
              href="/properties"
              className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs"
            >
              Browse Available Properties
            </Link>
            <Link
              href="/hostels"
              className="px-5 py-2.5 rounded-xl bg-[#0a192f] text-white font-bold text-xs"
            >
              Browse Student Hostels
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const isHostel = property.category === 'Student Hostels';
  const priceDisplay = formatPriceWithPeriod(property.price, property.pricePeriod, property.category);
  const whatsappUrl = isHostel
    ? getWhatsAppHostelLink(property)
    : getWhatsAppPropertyLink(property);

  const phone = settings?.phoneDisplay || '09161116718';

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar />

      {/* Breadcrumb & Navigation Bar */}
      <div className="bg-white border-b border-slate-200 py-3 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <Link 
              href={isHostel ? "/hostels" : "/properties"} 
              className="hover:text-blue-600 transition-colors"
            >
              {isHostel ? 'Student Hostels' : 'Properties'}
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="font-semibold text-slate-800 truncate max-w-xs sm:max-w-md">
              {property.title}
            </span>
          </div>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 text-slate-600 hover:text-blue-600 transition-colors bg-slate-100 px-3 py-1.5 rounded-lg font-bold"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? 'Link Copied!' : 'Share Listing'}</span>
          </button>
        </div>
      </div>

      {/* Main Listing View */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 flex-1 w-full space-y-8">
        {/* Title & Price Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-[#0a192f] text-white">
                {property.category}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-black text-white ${
                property.status === 'AVAILABLE' ? 'bg-emerald-600' :
                property.status === 'FEW ROOMS LEFT' ? 'bg-amber-500' :
                'bg-slate-700'
              }`}>
                {property.status}
              </span>
              {property.isSampleListing && (
                <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-300">
                  Sample Verification Listing
                </span>
              )}
            </div>

            <div className="text-right">
              <div className="text-2xl sm:text-3xl font-black text-blue-700">
                {priceDisplay}
              </div>
              <div className="text-xs text-slate-500 font-medium">
                {property.purpose === 'rent' ? 'Annual Tenancy Rate' : 'Direct Outright Purchase'}
              </div>
            </div>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug">
              {property.title}
            </h1>
            <div className="flex items-center gap-2 text-sm text-slate-600 mt-2">
              <MapPin className="w-4 h-4 text-sky-600 shrink-0" />
              <span className="font-semibold">{property.location}, Ilorin, Kwara State</span>
              {property.addressDetail && (
                <span className="text-slate-400">({property.addressDetail})</span>
              )}
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="space-y-3">
          <div className="relative aspect-[16/9] md:aspect-[21/9] w-full bg-slate-900 rounded-3xl overflow-hidden shadow-lg border border-slate-200">
            <img
              src={activeImage || property.images[0]}
              alt={property.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-black/60 text-white text-xs px-3 py-1 rounded-full backdrop-blur-md">
              High Resolution Property Photography
            </div>
          </div>

          {/* Thumbnails Row */}
          {property.images && property.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {property.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-24 h-16 sm:w-32 sm:h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                    activeImage === img ? 'border-blue-600 scale-95 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Detailed Grid: Left Info, Right Agent Contact Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Details (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Hostel Specific Card */}
            {isHostel && property.hostelDetails && (
              <div className="bg-sky-50/70 rounded-3xl p-6 sm:p-8 border border-sky-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-6 h-6 text-sky-700" />
                    <h3 className="text-lg font-black text-sky-950">
                      Hostel & Campus Proximity Details
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-sky-200/80 text-sky-900 font-bold text-xs">
                    {property.hostelDetails.availableRooms} of {property.hostelDetails.totalRooms} Rooms Available
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-sky-100 space-y-1">
                    <span className="text-slate-400 font-bold uppercase tracking-wider block">
                      Room Configuration
                    </span>
                    <strong className="text-slate-900 text-sm">{property.hostelDetails.roomType}</strong>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-sky-100 space-y-1">
                    <span className="text-slate-400 font-bold uppercase tracking-wider block">
                      Campus Commute
                    </span>
                    <strong className="text-slate-900 text-sm">{property.hostelDetails.distanceToCampus}</strong>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-sky-100 space-y-1">
                    <span className="text-slate-400 font-bold uppercase tracking-wider block">
                      Water Infrastructure
                    </span>
                    <strong className="text-slate-900 text-xs">{property.hostelDetails.waterStatus}</strong>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-sky-100 space-y-1">
                    <span className="text-slate-400 font-bold uppercase tracking-wider block">
                      Electricity & Metering
                    </span>
                    <strong className="text-slate-900 text-xs">{property.hostelDetails.electricityStatus}</strong>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-sky-100 space-y-1 col-span-1 sm:col-span-2">
                    <span className="text-slate-400 font-bold uppercase tracking-wider block">
                      Compound Security
                    </span>
                    <strong className="text-slate-900 text-xs">{property.hostelDetails.securityStatus}</strong>
                  </div>
                </div>
              </div>
            )}

            {/* General Specs (Bedrooms, Bathrooms, Size) */}
            {!isHostel && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200 grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
                {property.bedrooms !== undefined && (
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <Bed className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                    <div className="text-xl font-bold text-slate-900">{property.bedrooms}</div>
                    <div className="text-xs text-slate-500 uppercase font-semibold">Bedrooms</div>
                  </div>
                )}
                {property.bathrooms !== undefined && (
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <Bath className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                    <div className="text-xl font-bold text-slate-900">{property.bathrooms}</div>
                    <div className="text-xs text-slate-500 uppercase font-semibold">Bathrooms</div>
                  </div>
                )}
                {property.sizeSqMeters !== undefined && (
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <Maximize2 className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                    <div className="text-xl font-bold text-slate-900">{property.sizeSqMeters} m²</div>
                    <div className="text-xs text-slate-500 uppercase font-semibold">Plot / Floor Area</div>
                  </div>
                )}
              </div>
            )}

            {/* Description */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-3">
              <h3 className="text-xl font-bold text-slate-900">
                Property Overview & Detailed Description
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Facilities & Amenities */}
            {property.facilities && property.facilities.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-4">
                <h3 className="text-xl font-bold text-slate-900">
                  Available Facilities & Building Features
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {property.facilities.map((facility, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="font-semibold text-slate-800">{facility}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar: Agent Contact & Actions (4 cols) */}
          <div className="lg:col-span-4 space-y-6 sticky top-24">
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200 space-y-6">
              {/* Agent Badge Card */}
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0a192f] to-[#1d4ed8] text-white flex items-center justify-center font-bold text-lg shadow-md">
                  BR
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-sm">
                    BALOGUN RIDWAN BABATUNDE
                  </h4>
                  <span className="inline-block text-[11px] font-bold text-blue-600 uppercase">
                    RIDWANULLAHI CERTIFIED AGENT
                  </span>
                  <p className="text-[10px] text-slate-400">Eleko, Ilorin, Kwara State</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => setIsInspectionOpen(true)}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#0a192f] hover:bg-slate-800 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-sky-400" />
                  <span>Request Physical Inspection</span>
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Contact Agent on WhatsApp</span>
                </a>

                <a
                  href={`tel:${phone}`}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Call: {phone}</span>
                </a>
              </div>

              {/* Guarantees Box */}
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 space-y-2 text-xs text-blue-950">
                <div className="flex items-center gap-1.5 font-bold">
                  <ShieldCheck className="w-4 h-4 text-blue-700" />
                  <span>Certified Agent Guarantee</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-snug">
                  Zero deposit or processing fees prior to physical inspection with Balogun Ridwan. All legal deeds and receipts verified.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <WhatsAppCommunityBanner />
      <Footer />
      <WhatsAppFloatingButton />

      {/* Inspection Modal */}
      <InspectionModal
        property={property}
        isOpen={isInspectionOpen}
        onClose={() => setIsInspectionOpen(false)}
      />
    </div>
  );
}

export default function PropertyDetailPage({ params }: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="text-center space-y-3">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-bold text-slate-500">Loading Property Details...</p>
          </div>
        </div>
      }
    >
      <PropertyDetailContent params={params} />
    </Suspense>
  );
}
