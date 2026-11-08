'use client';

import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  Globe, 
  Users,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { FacebookIcon, LinkedInIcon } from '@/components/SocialIcons';
import { getSettings, addEnquiry, getWhatsAppGeneralLink } from '@/lib/store';
import { BusinessSettings } from '@/types/property';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppCommunityBanner from '@/components/WhatsAppCommunityBanner';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';

export default function ContactPage() {
  const [settings, setSettings] = useState<BusinessSettings | null>(null);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState('General Property Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setSettings(getSettings());
  }, []);

  const fullName = settings?.fullName || 'BALOGUN RIDWAN BABATUNDE';
  const businessName = settings?.businessName || 'RIDWANULLAHI CERTIFIED AGENT';
  const phoneDisplay = settings?.phoneDisplay || '07082256257';
  const phoneRaw = settings?.phone || '+2347082256257';
  const emailAddress = settings?.email || 'Ridwanyunnus@gmail.com';
  const address = settings?.address || 'Eleko, Ilorin, Kwara State, Nigeria';
  const gbp = settings?.googleBusinessProfile || 'https://share.google/sjVg80f40cSexfRub';
  const linkedin = settings?.linkedinProfile || 'https://www.linkedin.com/in/ridwanullahi-certified-61a689303';
  const facebook = settings?.facebookProfile || 'https://www.facebook.com/profile.php?id=100075809320428';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    addEnquiry({
      name,
      phone,
      email,
      message: `[${interest}]: ${message || 'No extra message'}`,
      type: interest.toLowerCase().includes('hostel') ? 'hostel_inspection' : 'general',
    });

    setSubmitted(true);

    // Open WhatsApp
    const waText = `Hello RIDWANULLAHI CERTIFIED AGENT, my name is ${name}. I am inquiring about ${interest}. Message: ${message || 'Please provide details.'}`;
    window.open(getWhatsAppGeneralLink(waText), '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar />

      {/* Top Hero Banner with High-Resolution Corporate Office Image */}
      <section className="relative min-h-[340px] sm:min-h-[380px] flex items-center bg-[#0a192f] text-white py-16 px-4 sm:px-8 border-b border-slate-800 overflow-hidden">
        {/* Background Image with Clear Visibility & Subtle Scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=85"
            alt="Contact Balogun Ridwan Real Estate Office"
            className="w-full h-full object-cover object-center brightness-85 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a192f]/85 via-[#0a192f]/45 to-slate-900/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f]/80 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full space-y-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-sm">
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Direct WhatsApp & Agency Office</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white drop-shadow-md">
            CONTACT BALOGUN RIDWAN
          </h1>

          <p className="text-sm sm:text-base text-slate-200 max-w-3xl leading-relaxed drop-shadow">
            Have questions about buying land, renting a commercial shop, securing a student hostel near Kwara Poly or investing in Ilorin property? Reach out directly.
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-14 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                  Verified Contact Details
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-1">
                  {fullName}
                </h3>
                <p className="text-xs text-slate-500 font-semibold uppercase">
                  {businessName} • Real Estate Agent
                </p>
              </div>

              <div className="space-y-4 text-xs text-slate-700">
                {/* Location */}
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-bold text-sm">Physical Office</strong>
                    <span className="text-slate-600">{address}</span>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-bold text-sm">Phone Number</strong>
                    <a href={`tel:${phoneDisplay}`} className="text-emerald-700 font-bold text-sm hover:underline">
                      {phoneDisplay}
                    </a>
                    <span className="block text-[11px] text-slate-400">Available Mon - Sat for calls & visits</span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-bold text-sm">Official Email</strong>
                    <a href={`mailto:${emailAddress}`} className="text-sky-700 font-bold hover:underline break-all">
                      {emailAddress}
                    </a>
                  </div>
                </div>

                {/* WhatsApp Direct */}
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-100">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <MessageCircle className="w-4 h-4 fill-white" />
                  </div>
                  <div>
                    <strong className="block text-emerald-950 font-bold text-sm">Direct WhatsApp</strong>
                    <a
                      href={getWhatsAppGeneralLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 font-bold hover:underline inline-block mt-0.5"
                    >
                      Chat on wa.me/2347082256257 &rarr;
                    </a>
                  </div>
                </div>
              </div>

              {/* Public Profiles */}
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Public Agency Profiles
                </span>
                <div className="flex flex-col gap-2">
                  <a
                    href={gbp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-800 transition-colors border border-slate-200"
                  >
                    <span className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-blue-600" />
                      <span>Google Business Profile</span>
                    </span>
                    <span className="text-slate-400">&rarr;</span>
                  </a>

                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-800 transition-colors border border-slate-200"
                  >
                    <span className="flex items-center gap-2">
                      <LinkedInIcon className="w-4 h-4 text-sky-600" />
                      <span>LinkedIn Profile</span>
                    </span>
                    <span className="text-slate-400">&rarr;</span>
                  </a>

                  <a
                    href={facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-800 transition-colors border border-slate-200"
                  >
                    <span className="flex items-center gap-2">
                      <FacebookIcon className="w-4 h-4 text-blue-600" />
                      <span>Facebook Page</span>
                    </span>
                    <span className="text-slate-400">&rarr;</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Message / Inquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200 space-y-6">
              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                  Fast Direct Inquiry
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-1">
                  Send A Message or Inspection Inquiry
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Your inquiry is recorded and will open directly on WhatsApp with Balogun Ridwan for instant response.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 text-center space-y-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                  <div className="w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">Inquiry Sent Successfully!</h4>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Thank you, <strong>{name}</strong>! Your message has been sent to Balogun Ridwan. WhatsApp has opened in another tab to continue our discussion.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Balogun Ridwan"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 07082256257"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-3 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="name@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Service or Category of Interest
                      </label>
                      <select
                        value={interest}
                        onChange={(e) => setInterest(e.target.value)}
                        className="w-full px-4 py-3 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white font-medium"
                      >
                        <option value="Student Hostel Accommodation">Student Hostel Accommodation</option>
                        <option value="Land for Sale in Ilorin">Land for Sale in Ilorin</option>
                        <option value="House / Bungalow for Sale">House / Bungalow for Sale</option>
                        <option value="Apartment / Flat for Rent">Apartment / Flat for Rent</option>
                        <option value="Commercial Shop / Store for Rent">Commercial Shop / Store for Rent</option>
                        <option value="Property Management">Property Management</option>
                        <option value="Real Estate Investment Consultancy">Real Estate Investment Consultancy</option>
                        <option value="General Property Inquiry">General Property Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Message / Property Requirements
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Please specify preferred location (Eleko, Poly Gate, Oyun, etc.), your budget, or specific questions..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full p-4 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-emerald-700 text-white font-black text-sm sm:text-base shadow-xl shadow-emerald-700/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                    >
                      <MessageCircle className="w-5 h-5 fill-white" />
                      <span>Send & Chat Directly on WhatsApp</span>
                    </button>
                    <p className="text-[11px] text-center text-slate-400 mt-2">
                      Zero consultation fees. Connect directly with certified agent Balogun Ridwan Babatunde.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <WhatsAppCommunityBanner />
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}
