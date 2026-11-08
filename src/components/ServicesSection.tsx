'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Home, 
  HardHat, 
  Store, 
  Landmark, 
  TrendingUp, 
  Briefcase, 
  ArrowRight, 
  MessageCircle,
  CheckCircle2
} from 'lucide-react';
import { getWhatsAppGeneralLink } from '@/lib/store';

export default function ServicesSection() {
  const services = [
    {
      id: 'property-management',
      title: 'Property Management',
      icon: Building2,
      description: 'Comprehensive tenancy administration, rent collection, prompt maintenance oversight, and legal tenancy agreement handling for landlord peace of mind in Ilorin.',
      features: ['Tenant Screening & Placement', 'Prompt Rent Collection & Disbursement', 'Facility Maintenance & Upkeep'],
      color: 'from-blue-600 to-indigo-600',
    },
    {
      id: 'property-sales',
      title: 'Property Sales',
      icon: Home,
      description: 'Facilitating secure sales and purchases of completed modern bungalows, duplexes, multi-unit residential flats, and prime landed properties across Kwara State.',
      features: ['Verified Property Titles', 'Market Valuations', 'Stress-Free Buyer-Seller Closing'],
      color: 'from-emerald-600 to-teal-600',
    },
    {
      id: 'property-development',
      title: 'Property Development',
      icon: HardHat,
      description: 'Turnkey architectural planning, structural supervision, and modern building development tailored to maximize property value and rental yields in high-growth corridors.',
      features: ['Student Hostel Development', 'Residential Terraces', 'Commercial Plazas'],
      color: 'from-amber-500 to-orange-600',
    },
    {
      id: 'rooms-and-shops-for-rent',
      title: 'Rooms and Shops for Rent',
      icon: Store,
      description: 'Dedicated leasing services connecting students and residents with secure rooms/hostels, and entrepreneurs with high-traffic lockup commercial shops in Ganmo, Poly Gate, and Eleko.',
      features: ['Student Hostels & Lodges', 'Commercial Streetfront Shops', 'Executive Residential Apartments'],
      color: 'from-sky-500 to-blue-600',
    },
    {
      id: 'land-acquisition',
      title: 'Land Acquisition',
      icon: Landmark,
      description: 'Safe, dispute-free land procurement with thorough boundary demarcation, surveyor beacon verification, Kwara State masterplan checking, and Deed of Assignment execution.',
      features: ['Dispute-Free Guarantee', 'Perimeter Survey Coordination', 'Physical Land Allocation'],
      color: 'from-purple-600 to-indigo-700',
    },
    {
      id: 'investment-consultancy',
      title: 'Real Estate Investment Consultancy',
      icon: TrendingUp,
      description: 'Strategic advisory for high-yield real estate investments in Ilorin, focusing on student hostel yields, capital appreciation, and passive rental cashflow properties.',
      features: ['High-Yield Hostel Investments', 'Portfolio Advisory', 'ROI & Cashflow Forecasting'],
      color: 'from-cyan-600 to-blue-700',
    },
    {
      id: 'business-consultancy',
      title: 'Business Consultancy',
      icon: Briefcase,
      description: 'Strategic advisory for commercial enterprises seeking strategic physical locations, retail spaces, office branches, and asset acquisition in Kwara State commercial hubs.',
      features: ['Commercial Site Selection', 'Branch Expansion Assistance', 'Asset Acquisition Advisory'],
      color: 'from-slate-700 to-slate-900',
    },
  ];

  return (
    <section id="services" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-blue-100 text-blue-900 border border-blue-200">
            <span>What We Do Best</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Comprehensive Real Estate Services
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            From verified land acquisition and luxury home sales to student hostel accommodation and strategic property development in Ilorin, Kwara State.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            const waUrl = getWhatsAppGeneralLink(`Hello Balogun Ridwan, I am inquiring about your "${service.title}" service in Ilorin.`);

            return (
              <div
                key={service.id}
                className="bg-white rounded-2xl p-7 border border-slate-200/80 hover:border-blue-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Icon */}
                  <div className={`w-13 h-13 rounded-xl bg-gradient-to-br ${service.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Key Highlights */}
                  <div className="pt-2 space-y-1.5 border-t border-slate-100">
                    {service.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Inquiry Link */}
                <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-emerald-600 text-transparent" />
                    <span>Inquire via WhatsApp</span>
                  </a>
                  <span className="text-xs text-slate-400 font-medium">Eleko, Ilorin</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
