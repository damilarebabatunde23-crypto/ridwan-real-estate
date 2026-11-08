'use client';

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Award, 
  FileCheck, 
  ExternalLink, 
  CheckCircle2, 
  UserCheck, 
  MapPin, 
  Phone, 
  Mail, 
  Building2,
  Lock,
  Eye
} from 'lucide-react';
import { Certificate, BusinessSettings } from '@/types/property';
import { getCertificates, getSettings, getWhatsAppGeneralLink } from '@/lib/store';
import CertificateModal from './CertificateModal';

export default function CredentialsSection() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [settings, setSettings] = useState<BusinessSettings | null>(null);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  useEffect(() => {
    setCertificates(getCertificates());
    setSettings(getSettings());

    const handleUpdate = () => {
      setCertificates(getCertificates());
      setSettings(getSettings());
    };
    window.addEventListener('rca_storage_updated', handleUpdate);
    return () => window.removeEventListener('rca_storage_updated', handleUpdate);
  }, []);

  const fullName = settings?.fullName || 'BALOGUN RIDWAN BABATUNDE';
  const businessName = settings?.businessName || 'RIDWANULLAHI CERTIFIED AGENT';
  const phone = settings?.phoneDisplay || '07082256257';
  const email = settings?.email || 'Ridwanyunnus@gmail.com';
  const address = settings?.address || 'Eleko, Ilorin, Kwara State, Nigeria';

  return (
    <section id="credentials" className="py-20 bg-gradient-to-b from-white via-slate-50 to-blue-50/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-blue-100 text-blue-900 border border-blue-200">
            <ShieldCheck className="w-4 h-4 text-blue-700" />
            <span>Professional Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Verified Identity & Agency Accreditation
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Real estate in Kwara State demands trust, transparency, and authenticated representation. Review our certified credentials and verified agency profile below.
          </p>
        </div>

        {/* Bio & Profile Hero Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200/80 mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Agent Avatar / Seal */}
            <div className="lg:col-span-4 flex flex-col items-center text-center p-6 bg-gradient-to-br from-[#0a192f] via-[#112240] to-[#1e3a8a] text-white rounded-2xl shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl" />
              
              <div className="relative w-28 h-28 rounded-full border-4 border-amber-400/80 shadow-2xl overflow-hidden mb-4 bg-slate-800 flex items-center justify-center">
                <Building2 className="w-14 h-14 text-sky-300" />
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 text-xs font-bold mb-2">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Certified Real Estate Agent</span>
              </div>

              <h3 className="text-xl font-black text-white">{fullName}</h3>
              <p className="text-xs text-sky-200 font-semibold uppercase tracking-wider mt-0.5">
                {businessName}
              </p>

              <div className="mt-4 pt-4 border-t border-slate-700/80 w-full text-xs space-y-1.5 text-slate-300">
                <p className="flex items-center justify-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-sky-400" />
                  <span>{address}</span>
                </p>
                <p className="flex items-center justify-center gap-1.5 font-bold text-white">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <a href={`tel:${phone}`}>{phone}</a>
                </p>
              </div>
            </div>

            {/* Profile Narrative & Guarantees */}
            <div className="lg:col-span-8 space-y-5">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                  About The Certified Practitioner
                </span>
                <h4 className="text-2xl font-black text-slate-900 mt-1">
                  Balogun Ridwan Babatunde
                </h4>
                <p className="text-sm font-semibold text-slate-500">
                  "Real Estate. Real People. Real Results." — Your Dream Home Is Our Priority.
                </p>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed">
                <strong>RIDWANULLAHI CERTIFIED REAL ESTATE AGENT</strong> provides real estate services in Ilorin, Kwara State, Nigeria, helping individuals, families, students, and institutional investors discover and acquire suitable properties.
              </p>

              <p className="text-sm text-slate-700 leading-relaxed">
                Our scope covers houses and land for sale, rooms and commercial shops for rent, student hostels near Kwara State Polytechnic and UNILORIN, property management, land acquisition due diligence, and real estate investment consultancy. We are committed to helping clients explore verified properties, make well-informed decisions, and navigate property transactions with confidence and peace of mind.
              </p>

              {/* Trust Badges Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="flex items-center gap-2 text-blue-800 font-bold text-xs">
                    <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Survey & Title Audit</span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Rigorous beacon coordinate & surveyor checks prior to any land allocation.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Direct Agency Only</span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Transparent negotiations directly connecting verified landlords with genuine clients.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="flex items-center gap-2 text-amber-800 font-bold text-xs">
                    <Lock className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Zero Fraud Guarantee</span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Zero fabricated listings or unauthorized property collections in Ilorin.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Certificate Preview Cards Grid */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                Official Agency Documents & Certificates
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Click any document preview card below to view high-resolution verification details.
              </p>
            </div>
            <div className="text-xs text-slate-400 italic">
              Verified & Updated by Balogun Ridwan Babatunde
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                onClick={() => setSelectedCert(cert)}
                className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Thumbnail Preview */}
                <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  
                  <div className="absolute top-3 right-3">
                    <span className="p-1.5 rounded-lg bg-white/90 text-slate-800 shadow backdrop-blur-sm group-hover:bg-blue-600 group-hover:text-white transition-colors flex items-center gap-1 text-[11px] font-bold">
                      <Eye className="w-3.5 h-3.5" />
                      <span>View</span>
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-white mb-1">
                      {cert.issueDate}
                    </span>
                    <h4 className="font-bold text-sm text-white line-clamp-1">
                      {cert.title}
                    </h4>
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="text-xs text-blue-600 font-semibold mb-1">
                      {cert.issuer}
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {cert.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Verified
                    </span>
                    <span className="text-blue-600 font-bold group-hover:underline flex items-center gap-1">
                      <span>Examine Certificate</span>
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <CertificateModal
        certificate={selectedCert}
        isOpen={Boolean(selectedCert)}
        onClose={() => setSelectedCert(null)}
      />
    </section>
  );
}
