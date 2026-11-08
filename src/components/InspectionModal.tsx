'use client';

import React, { useState } from 'react';
import { X, Calendar, Clock, User, Phone, CheckCircle, MessageCircle, Building2, MapPin } from 'lucide-react';
import { Property } from '@/types/property';
import { formatPriceWithPeriod, addEnquiry, getWhatsAppInspectionLink } from '@/lib/store';

interface InspectionModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function InspectionModal({ property, isOpen, onClose }: InspectionModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('Morning (9:00 AM - 12:00 PM)');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !property) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    // Save to enquiries store
    addEnquiry({
      propertyId: property.id,
      propertyTitle: property.title,
      name,
      phone,
      message: `Inspection request for ${property.title} on ${date || 'Flexible Date'} (${time}). Notes: ${notes || 'None'}`,
      type: property.category === 'Student Hostels' ? 'hostel_inspection' : 'general',
    });

    setSubmitted(true);

    // Open WhatsApp after short delay or immediately
    const whatsappUrl = getWhatsAppInspectionLink(property, name, date, time);
    window.open(whatsappUrl, '_blank');
  };

  const handleReset = () => {
    setName('');
    setPhone('');
    setDate('');
    setNotes('');
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#0a192f] text-white p-6 relative">
          <button
            onClick={handleReset}
            className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-500/20 text-sky-300 border border-sky-400/30 mb-2">
            Schedule Physical Inspection
          </span>
          <h3 className="text-lg font-bold line-clamp-1">{property.title}</h3>
          <div className="flex items-center gap-3 text-xs text-slate-300 mt-1">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              {property.location}
            </span>
            <span>•</span>
            <span className="text-amber-400 font-bold">
              {formatPriceWithPeriod(property.price, property.pricePeriod, property.category)}
            </span>
          </div>
        </div>

        {/* Form Body */}
        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-bold text-slate-800">Inspection Request Sent!</h4>
            <p className="text-sm text-slate-600">
              Thank you, <strong>{name}</strong>! Your inspection request has been registered and WhatsApp has opened to coordinate the inspection time directly with <strong>Balogun Ridwan</strong>.
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={handleReset}
                className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <p className="text-xs text-slate-500">
              Fill in your details below to arrange a prompt on-site viewing with certified agent <strong>Balogun Ridwan</strong>.
            </p>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Your Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Ibrahim Adeleke"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Phone / WhatsApp Number *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="tel"
                  required
                  placeholder="08012345678 or +234..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Preferred Date
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Preferred Time
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                  >
                    <option value="Morning (9:00 AM - 12:00 PM)">Morning (9am - 12pm)</option>
                    <option value="Afternoon (1:00 PM - 4:00 PM)">Afternoon (1pm - 4pm)</option>
                    <option value="Evening (4:00 PM - 6:00 PM)">Evening (4pm - 6pm)</option>
                    <option value="Flexible / Anytime">Flexible</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Any Special Notes (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="e.g., I am a Kwara Poly student looking for an immediate room move-in date..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Confirm & Open WhatsApp Chat</span>
              </button>
              <p className="text-[11px] text-center text-slate-400 mt-2">
                Direct transmission to Balogun Ridwan (09161116718). Zero inspection fees prior to appointment.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
