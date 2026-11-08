'use client';

import React from 'react';
import { X, ShieldCheck, CheckCircle2, Calendar, Award } from 'lucide-react';
import { Certificate } from '@/types/property';

interface CertificateModalProps {
  certificate: Certificate | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CertificateModal({ certificate, isOpen, onClose }: CertificateModalProps) {
  if (!isOpen || !certificate) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="bg-[#0a192f] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg">{certificate.title}</h3>
              <p className="text-xs text-sky-300">{certificate.issuer}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Certificate Image Preview */}
        <div className="p-6 space-y-4">
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-slate-100 rounded-xl overflow-hidden border border-slate-200 shadow-inner flex items-center justify-center">
            <img
              src={certificate.image}
              alt={certificate.title}
              className="w-full h-full object-contain bg-slate-900/5"
            />
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-1.5 text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Agent Credential</span>
              </div>
              {certificate.credentialId && (
                <div className="text-slate-500 font-mono text-[11px] bg-slate-100 px-2.5 py-1 rounded-md">
                  ID: {certificate.credentialId}
                </div>
              )}
            </div>

            <p className="text-sm text-slate-700 leading-relaxed">
              {certificate.description}
            </p>

            <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-100 text-xs text-blue-900 flex items-start gap-2">
              <Award className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span>
                Issued to <strong>BALOGUN RIDWAN BABATUNDE</strong> (RIDWANULLAHI CERTIFIED AGENT), practicing in Eleko, Ilorin, Kwara State, Nigeria.
              </span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-[#0a192f] hover:bg-slate-800 text-white font-bold text-sm transition-colors"
            >
              Close Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
