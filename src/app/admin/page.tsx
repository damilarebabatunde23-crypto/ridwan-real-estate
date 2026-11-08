'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Lock, 
  Unlock, 
  Building2, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  AlertCircle, 
  LogOut, 
  Search, 
  GraduationCap, 
  MapPin, 
  DollarSign, 
  Image as ImageIcon, 
  Save, 
  RefreshCw, 
  Award, 
  Users, 
  Eye, 
  Clock, 
  MessageCircle,
  Database,
  Sliders,
  Settings,
  ChevronRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { 
  Property, 
  PropertyCategory, 
  PropertyPurpose, 
  AvailabilityStatus, 
  Certificate, 
  Enquiry, 
  BusinessSettings 
} from '@/types/property';
import { 
  getProperties, 
  addProperty, 
  updateProperty, 
  deleteProperty, 
  getCertificates, 
  addCertificate, 
  deleteCertificate, 
  getSettings, 
  updateSettings, 
  getEnquiries, 
  updateEnquiryStatus, 
  resetToDefaults, 
  formatNaira, 
  formatPriceWithPeriod 
} from '@/lib/store';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AdminPage() {
  // Authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<'listings' | 'add' | 'enquiries' | 'certificates' | 'settings'>('listings');

  // Data states
  const [properties, setProperties] = useState<Property[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [settings, setSettings] = useState<BusinessSettings | null>(null);

  // Search in admin
  const [searchTerm, setSearchTerm] = useState('');

  // Editing property
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  // Form state for new or edited property
  const [formData, setFormData] = useState({
    title: '',
    category: 'Student Hostels' as PropertyCategory,
    purpose: 'rent' as PropertyPurpose,
    price: 180000,
    pricePeriod: 'year' as 'year' | 'month' | 'total',
    location: 'Poly Gate',
    addressDetail: '',
    description: '',
    bedrooms: 1,
    bathrooms: 1,
    sizeSqMeters: 0,
    imagesText: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80',
    facilitiesText: 'Running Borehole Water, Dedicated Prepaid Meter, Fenced with Gatehouse, Tiled Floor',
    status: 'AVAILABLE' as AvailabilityStatus,
    isFeatured: true,
    isSampleListing: false,
    // Hostel specific
    hostelName: '',
    area: 'Poly Gate',
    roomType: 'Self-Contain with Kitchenette' as any,
    totalRooms: 10,
    availableRooms: 3,
    electricityStatus: 'Dedicated Transformer Line + Pre-paid Metres',
    waterStatus: '24/7 Automatic Pumping Borehole',
    securityStatus: 'Uniformed Security Guard on Duty',
    distanceToCampus: '4 minutes walk to Kwara State Polytechnic Gate',
    nearbySchoolsText: 'Kwara State Polytechnic, Institute of Technology',
  });

  // Settings form
  const [settingsForm, setSettingsForm] = useState<BusinessSettings | null>(null);
  const [newLocationInput, setNewLocationInput] = useState('');

  // New certificate form
  const [certForm, setCertForm] = useState({
    title: '',
    issuer: '',
    issueDate: 'Verified Practitioner',
    credentialId: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=800&q=80',
  });

  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    // Check if session stored
    if (typeof window !== 'undefined') {
      const isAuth = sessionStorage.getItem('rca_admin_auth') === 'true';
      if (isAuth) setIsAuthenticated(true);
    }

    refreshData();
  }, []);

  const refreshData = () => {
    const props = getProperties();
    const certs = getCertificates();
    const enqs = getEnquiries();
    const sets = getSettings();

    setProperties(props);
    setCertificates(certs);
    setEnquiries(enqs);
    setSettings(sets);
    setSettingsForm(sets);
  };

  const showNotify = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3500);
  };

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default master password or customizable password
    if (password === 'ridwan2026' || password === 'admin' || password === 'ridwanullahi') {
      setIsAuthenticated(true);
      sessionStorage.setItem('rca_admin_auth', 'true');
      setAuthError('');
      showNotify('Authenticated successfully as Balogun Ridwan Babatunde!');
    } else {
      setAuthError('Incorrect administrator password. Hint: ridwan2026 or admin');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('rca_admin_auth');
    showNotify('Logged out from admin portal.');
  };

  // Save new or edited property
  const handleSaveProperty = (e: React.FormEvent) => {
    e.preventDefault();

    const images = formData.imagesText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const facilities = formData.facilitiesText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const isHostel = formData.category === 'Student Hostels';

    const hostelDetails = isHostel
      ? {
          hostelName: formData.hostelName || formData.title,
          area: formData.area || formData.location,
          roomType: formData.roomType,
          totalRooms: Number(formData.totalRooms),
          availableRooms: Number(formData.availableRooms),
          electricityStatus: formData.electricityStatus,
          waterStatus: formData.waterStatus,
          securityStatus: formData.securityStatus,
          distanceToCampus: formData.distanceToCampus,
          nearbySchools: formData.nearbySchoolsText
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean),
        }
      : undefined;

    const propertyPayload = {
      title: formData.title,
      category: formData.category,
      purpose: formData.purpose,
      price: Number(formData.price),
      pricePeriod: formData.pricePeriod,
      location: formData.location,
      addressDetail: formData.addressDetail,
      description: formData.description,
      bedrooms: formData.bedrooms ? Number(formData.bedrooms) : undefined,
      bathrooms: formData.bathrooms ? Number(formData.bathrooms) : undefined,
      sizeSqMeters: formData.sizeSqMeters ? Number(formData.sizeSqMeters) : undefined,
      images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80'],
      facilities,
      status: formData.status,
      isFeatured: formData.isFeatured,
      isSampleListing: formData.isSampleListing,
      hostelDetails,
    };

    if (editingProperty) {
      updateProperty(editingProperty.id, propertyPayload);
      showNotify(`Property "${formData.title}" updated successfully!`);
      setEditingProperty(null);
    } else {
      addProperty(propertyPayload);
      showNotify(`New listing "${formData.title}" added to the public catalogue!`);
    }

    refreshData();
    setActiveTab('listings');
  };

  // Edit action
  const startEditProperty = (prop: Property) => {
    setEditingProperty(prop);
    setFormData({
      title: prop.title,
      category: prop.category,
      purpose: prop.purpose,
      price: prop.price,
      pricePeriod: prop.pricePeriod || 'year',
      location: prop.location,
      addressDetail: prop.addressDetail || '',
      description: prop.description,
      bedrooms: prop.bedrooms || 1,
      bathrooms: prop.bathrooms || 1,
      sizeSqMeters: prop.sizeSqMeters || 0,
      imagesText: (prop.images || []).join('\n'),
      facilitiesText: (prop.facilities || []).join(', '),
      status: prop.status,
      isFeatured: prop.isFeatured,
      isSampleListing: prop.isSampleListing,
      hostelName: prop.hostelDetails?.hostelName || '',
      area: prop.hostelDetails?.area || prop.location,
      roomType: prop.hostelDetails?.roomType || 'Self-Contain with Kitchenette',
      totalRooms: prop.hostelDetails?.totalRooms || 10,
      availableRooms: prop.hostelDetails?.availableRooms || 3,
      electricityStatus: prop.hostelDetails?.electricityStatus || '',
      waterStatus: prop.hostelDetails?.waterStatus || '',
      securityStatus: prop.hostelDetails?.securityStatus || '',
      distanceToCampus: prop.hostelDetails?.distanceToCampus || '',
      nearbySchoolsText: (prop.hostelDetails?.nearbySchools || []).join(', '),
    });
    setActiveTab('add');
  };

  const handleDeleteProperty = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteProperty(id);
      showNotify(`Listing deleted.`, 'error');
      refreshData();
    }
  };

  // Update status directly from table
  const handleQuickStatusChange = (id: string, status: AvailabilityStatus) => {
    updateProperty(id, { status });
    showNotify(`Status updated to ${status}`);
    refreshData();
  };

  // Toggle Featured
  const handleToggleFeatured = (id: string, current: boolean) => {
    updateProperty(id, { isFeatured: !current });
    showNotify(`Featured status updated`);
    refreshData();
  };

  // Save Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (!settingsForm) return;
    updateSettings(settingsForm);
    showNotify('Business settings & contact details saved!');
    refreshData();
  };

  const handleAddLocation = () => {
    if (!newLocationInput.trim() || !settingsForm) return;
    const trimmed = newLocationInput.trim();
    if (!settingsForm.locations.includes(trimmed)) {
      const updated = {
        ...settingsForm,
        locations: [...settingsForm.locations, trimmed],
      };
      setSettingsForm(updated);
      updateSettings(updated);
      setNewLocationInput('');
      showNotify(`Added "${trimmed}" to available locations!`);
      refreshData();
    }
  };

  const handleRemoveLocation = (loc: string) => {
    if (!settingsForm) return;
    const updated = {
      ...settingsForm,
      locations: settingsForm.locations.filter((l) => l !== loc),
    };
    setSettingsForm(updated);
    updateSettings(updated);
    showNotify(`Removed location "${loc}"`);
    refreshData();
  };

  // Add Certificate
  const handleAddCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certForm.title || !certForm.issuer) return;
    addCertificate({
      ...certForm,
      isVerified: true,
    });
    setCertForm({
      title: '',
      issuer: '',
      issueDate: 'Verified Practitioner',
      credentialId: '',
      description: '',
      image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=800&q=80',
    });
    showNotify('New professional certificate added to Credentials section!');
    refreshData();
  };

  const handleDeleteCertificate = (id: string) => {
    if (confirm('Are you sure you want to remove this certificate?')) {
      deleteCertificate(id);
      showNotify('Certificate removed.', 'error');
      refreshData();
    }
  };

  // Update Enquiry Status
  const handleEnquiryStatus = (id: string, status: 'pending' | 'contacted' | 'resolved') => {
    updateEnquiryStatus(id, status);
    showNotify(`Enquiry marked as ${status}`);
    refreshData();
  };

  // Reset to default sample seed
  const handleResetSeed = () => {
    if (confirm('Warning: This will reload default verified sample properties, certificates, and default contact info. Continue?')) {
      resetToDefaults();
      refreshData();
      showNotify('Reset to baseline verified template.');
    }
  };

  // Filter properties in admin list
  const filteredAdminProperties = properties.filter((p) => {
    if (!searchTerm) return true;
    const q = searchTerm.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-800">
      <Navbar />

      {/* Notifications Toast */}
      {notification && (
        <div className={`fixed top-20 right-6 z-50 px-5 py-3 rounded-2xl shadow-2xl text-xs font-bold text-white flex items-center gap-2 animate-in slide-in-from-top-4 duration-200 ${
          notification.type === 'error' ? 'bg-rose-600' : 'bg-emerald-600'
        }`}>
          {notification.type === 'error' ? <AlertCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Login Gate If Not Authenticated */}
      {!isAuthenticated ? (
        <div className="flex-1 flex items-center justify-center p-6 py-20">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="relative bg-[#0a192f] text-white p-8 text-center space-y-2 overflow-hidden">
              <div className="absolute inset-0 z-0">
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85"
                  alt="Admin Control Portal"
                  className="w-full h-full object-cover brightness-85 contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-[#0a192f]/60 to-[#0a192f]/40" />
              </div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-sky-500 text-white flex items-center justify-center mx-auto shadow-md mb-3">
                  <Lock className="w-7 h-7" />
                </div>
                <h2 className="text-2xl font-black tracking-tight text-white drop-shadow">
                  Admin Control Portal
                </h2>
                <p className="text-xs text-sky-200 font-semibold drop-shadow">
                  RIDWANULLAHI CERTIFIED AGENT
                </p>
                <p className="text-[11px] text-slate-300 drop-shadow">
                  Authorized access for Balogun Ridwan Babatunde
                </p>
              </div>
            </div>

            <form onSubmit={handleLogin} className="p-8 space-y-5">
              {authError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Administrator Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    required
                    placeholder="Enter admin password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1.5">
                  Default credentials: <code>ridwan2026</code> or <code>admin</code>
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Unlock className="w-4 h-4" />
                <span>Unlock Admin Portal</span>
              </button>
            </form>
          </div>
        </div>
      ) : (
        /* Authenticated Admin Dashboard */
        <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-8 py-8 w-full space-y-6">
          {/* Top Admin Status Bar with Architectural Backdrop */}
          <div className="relative bg-[#0a192f] text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-hidden border border-slate-800">
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=85"
                alt="Admin Real Estate Management"
                className="w-full h-full object-cover brightness-85 contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a192f]/85 via-[#0a192f]/45 to-slate-900/30" />
            </div>

            <div className="relative z-10 flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-amber-400 shrink-0 shadow-lg hidden sm:block">
                <img src="/images/agent-balogun-ridwan.jpg" alt="Balogun Ridwan" className="w-full h-full object-cover object-top" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-extrabold uppercase tracking-wider text-sky-300">
                    Live Management Portal
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-white">
                  Admin Dashboard: Balogun Ridwan
                </h1>
                <p className="text-xs text-slate-300">
                  Any changes made here immediately appear across the public website and student hostel catalogue.
                </p>
              </div>
            </div>

            <div className="relative z-10 flex flex-wrap items-center gap-2.5">
              <button
                onClick={handleResetSeed}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors flex items-center gap-1.5 border border-slate-700"
                title="Reset sample property catalog"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Demo Seed</span>
              </button>

              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-xl bg-rose-600/80 hover:bg-rose-600 text-white text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Metrics Overview Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-1">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Total Listings
              </div>
              <div className="text-2xl font-black text-slate-900">{properties.length}</div>
              <span className="text-[11px] text-blue-600 font-semibold">Active in catalogue</span>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-1">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Student Hostels
              </div>
              <div className="text-2xl font-black text-sky-600">
                {properties.filter((p) => p.category === 'Student Hostels').length}
              </div>
              <span className="text-[11px] text-slate-500">Ilorin student accommodation</span>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-1">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Properties for Sale
              </div>
              <div className="text-2xl font-black text-emerald-600">
                {properties.filter((p) => p.purpose === 'buy').length}
              </div>
              <span className="text-[11px] text-slate-500">Houses & Lands</span>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-1">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Enquiries & Bookings
              </div>
              <div className="text-2xl font-black text-amber-600">{enquiries.length}</div>
              <span className="text-[11px] text-slate-500">Inspection requests</span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-white rounded-2xl p-2 shadow-sm border border-slate-200 flex flex-wrap gap-2 text-xs font-bold">
            <button
              onClick={() => setActiveTab('listings')}
              className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
                activeTab === 'listings'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Listings Manager ({properties.length})</span>
            </button>

            <button
              onClick={() => {
                setEditingProperty(null);
                setActiveTab('add');
              }}
              className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
                activeTab === 'add'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>{editingProperty ? 'Edit Listing' : 'Add New Property / Hostel'}</span>
            </button>

            <button
              onClick={() => setActiveTab('enquiries')}
              className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
                activeTab === 'enquiries'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              <span>Enquiries ({enquiries.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('certificates')}
              className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
                activeTab === 'certificates'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Certificates & Credentials ({certificates.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
                activeTab === 'settings'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Locations & Business Settings</span>
            </button>
          </div>

          {/* TAB 1: LISTINGS MANAGER */}
          {activeTab === 'listings' && (
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search by title, category, or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <button
                  onClick={() => {
                    setEditingProperty(null);
                    setActiveTab('add');
                  }}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Property</span>
                </button>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider bg-slate-50/70">
                      <th className="py-3 px-3">Property</th>
                      <th className="py-3 px-3">Category</th>
                      <th className="py-3 px-3">Price</th>
                      <th className="py-3 px-3">Location</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3">Featured</th>
                      <th className="py-3 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredAdminProperties.map((prop) => (
                      <tr key={prop.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-3 max-w-xs">
                          <div className="font-bold text-slate-900 truncate" title={prop.title}>
                            {prop.title}
                          </div>
                          {prop.isSampleListing && (
                            <span className="text-[10px] text-amber-700 font-bold bg-amber-50 px-1.5 rounded">
                              Sample
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap">
                          <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                            prop.category === 'Student Hostels' ? 'bg-sky-100 text-sky-800' : 'bg-slate-100 text-slate-700'
                          }`}>
                            {prop.category}
                          </span>
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap font-bold text-blue-700">
                          {formatPriceWithPeriod(prop.price, prop.pricePeriod, prop.category)}
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap text-slate-600">
                          {prop.location}
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap">
                          <select
                            value={prop.status}
                            onChange={(e: any) => handleQuickStatusChange(prop.id, e.target.value)}
                            className="bg-slate-100 border border-slate-200 rounded-lg p-1 text-[11px] font-bold text-slate-800 outline-none"
                          >
                            <option value="AVAILABLE">AVAILABLE</option>
                            <option value="FEW ROOMS LEFT">FEW ROOMS LEFT</option>
                            <option value="OCCUPIED">OCCUPIED</option>
                            <option value="SOLD">SOLD</option>
                          </select>
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap">
                          <button
                            onClick={() => handleToggleFeatured(prop.id, prop.isFeatured)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                              prop.isFeatured
                                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                : 'bg-slate-100 text-slate-400'
                            }`}
                          >
                            {prop.isFeatured ? '★ Featured' : 'Normal'}
                          </button>
                        </td>
                        <td className="py-3 px-3 text-right whitespace-nowrap space-x-1">
                          <Link
                            href={`/properties/${prop.slug}`}
                            target="_blank"
                            className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-slate-100 inline-block"
                            title="View Public Page"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => startEditProperty(prop)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-slate-100"
                            title="Edit Listing"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProperty(prop.id, prop.title)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-slate-100"
                            title="Delete Listing"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: ADD / EDIT PROPERTY FORM */}
          {activeTab === 'add' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-xl font-black text-slate-900">
                    {editingProperty ? `Edit Listing: ${editingProperty.title}` : 'Add New Property / Student Hostel'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    All updates reflect instantly in the public catalogue and search filters.
                  </p>
                </div>
                {editingProperty && (
                  <button
                    onClick={() => {
                      setEditingProperty(null);
                      setActiveTab('listings');
                    }}
                    className="text-xs font-bold text-slate-500 hover:text-slate-800"
                  >
                    Cancel Editing
                  </button>
                )}
              </div>

              <form onSubmit={handleSaveProperty} className="space-y-6">
                {/* Basic Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Property Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Al-Barakah Luxury Student Lodge (Self-Contain Units)"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e: any) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white font-semibold"
                    >
                      <option value="Student Hostels">Student Hostels</option>
                      <option value="Houses for Sale">Houses for Sale</option>
                      <option value="Lands for Sale">Lands for Sale</option>
                      <option value="Apartments for Rent">Apartments for Rent</option>
                      <option value="Rooms for Rent">Rooms for Rent</option>
                      <option value="Shops for Rent">Shops for Rent</option>
                      <option value="Commercial Properties">Commercial Properties</option>
                      <option value="Residential Properties">Residential Properties</option>
                      <option value="Investment Properties">Investment Properties</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Purpose
                    </label>
                    <select
                      value={formData.purpose}
                      onChange={(e: any) => setFormData({ ...formData, purpose: e.target.value })}
                      className="w-full px-3 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white font-semibold"
                    >
                      <option value="rent">For Rent</option>
                      <option value="buy">For Sale (Outright Buy)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Price in Naira (₦) *
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="180000"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Price Frequency
                    </label>
                    <select
                      value={formData.pricePeriod}
                      onChange={(e: any) => setFormData({ ...formData, pricePeriod: e.target.value })}
                      className="w-full px-3 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white font-semibold"
                    >
                      <option value="year">Per Year (Annual)</option>
                      <option value="month">Per Month</option>
                      <option value="total">Total Outright</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Location in Ilorin *
                    </label>
                    <select
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-3 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white font-semibold"
                    >
                      {settings?.locations.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Availability Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e: any) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-3 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white font-semibold"
                    >
                      <option value="AVAILABLE">AVAILABLE</option>
                      <option value="FEW ROOMS LEFT">FEW ROOMS LEFT</option>
                      <option value="OCCUPIED">OCCUPIED</option>
                      <option value="SOLD">SOLD</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Detailed Address / Landmark
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Near Poly Gate main bus stop, Ilorin"
                      value={formData.addressDetail}
                      onChange={(e) => setFormData({ ...formData, addressDetail: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>

                {/* SPECIAL STUDENT HOSTEL FIELDS (If category is Student Hostels) */}
                {formData.category === 'Student Hostels' && (
                  <div className="bg-sky-50/70 rounded-2xl p-5 border border-sky-200 space-y-4">
                    <div className="flex items-center gap-2 text-sky-950 font-bold text-sm">
                      <GraduationCap className="w-5 h-5 text-sky-600" />
                      <span>Dedicated Student Hostel Parameters</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Hostel Name</label>
                        <input
                          type="text"
                          placeholder="e.g. Al-Barakah Student Lodge"
                          value={formData.hostelName}
                          onChange={(e) => setFormData({ ...formData, hostelName: e.target.value })}
                          className="w-full p-2 text-xs border border-slate-300 rounded-lg bg-white"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Room Configuration</label>
                        <select
                          value={formData.roomType}
                          onChange={(e) => setFormData({ ...formData, roomType: e.target.value as any })}
                          className="w-full p-2 text-xs border border-slate-300 rounded-lg bg-white font-semibold"
                        >
                          <option value="Self-Contain with Kitchenette">Self-Contain with Kitchenette</option>
                          <option value="Self-Contain Studio">Self-Contain Studio</option>
                          <option value="Single Room (Shared)">Single Room (Shared Facility)</option>
                          <option value="2-Bedroom Shared Flat">2-Bedroom Shared Flat</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Total Rooms</label>
                        <input
                          type="number"
                          value={formData.totalRooms}
                          onChange={(e) => setFormData({ ...formData, totalRooms: Number(e.target.value) })}
                          className="w-full p-2 text-xs border border-slate-300 rounded-lg bg-white"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Available Rooms Left</label>
                        <input
                          type="number"
                          value={formData.availableRooms}
                          onChange={(e) => setFormData({ ...formData, availableRooms: Number(e.target.value) })}
                          className="w-full p-2 text-xs border border-slate-300 rounded-lg bg-white"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block font-bold text-slate-700 mb-1">Distance to Campus</label>
                        <input
                          type="text"
                          placeholder="e.g. 4 minutes walk to Kwara Poly Gate"
                          value={formData.distanceToCampus}
                          onChange={(e) => setFormData({ ...formData, distanceToCampus: e.target.value })}
                          className="w-full p-2 text-xs border border-slate-300 rounded-lg bg-white"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block font-bold text-slate-700 mb-1">Water Supply Infrastructure</label>
                        <input
                          type="text"
                          placeholder="e.g. 24/7 Industrial Borehole with 3 Overhead Tanks"
                          value={formData.waterStatus}
                          onChange={(e) => setFormData({ ...formData, waterStatus: e.target.value })}
                          className="w-full p-2 text-xs border border-slate-300 rounded-lg bg-white"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block font-bold text-slate-700 mb-1">Electricity Status</label>
                        <input
                          type="text"
                          placeholder="e.g. Dedicated Transformer line + Individual Pre-paid meter"
                          value={formData.electricityStatus}
                          onChange={(e) => setFormData({ ...formData, electricityStatus: e.target.value })}
                          className="w-full p-2 text-xs border border-slate-300 rounded-lg bg-white"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block font-bold text-slate-700 mb-1">Security Setup</label>
                        <input
                          type="text"
                          placeholder="e.g. Perimeter fence with razor wire and night watchman"
                          value={formData.securityStatus}
                          onChange={(e) => setFormData({ ...formData, securityStatus: e.target.value })}
                          className="w-full p-2 text-xs border border-slate-300 rounded-lg bg-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Description & Facilities */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Property Description *
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Detailed overview for students, buyers or tenants..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full p-3 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Facilities / Amenities (Comma Separated)
                    </label>
                    <input
                      type="text"
                      placeholder="Running Water, Dedicated Prepaid Meter, Fenced with Gate, Ample Parking"
                      value={formData.facilitiesText}
                      onChange={(e) => setFormData({ ...formData, facilitiesText: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Property Photographs URLs (One per line)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="https://images.unsplash.com/photo-..."
                      value={formData.imagesText}
                      onChange={(e) => setFormData({ ...formData, imagesText: e.target.value })}
                      className="w-full p-3 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-mono"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">
                      Paste high-resolution image links. Multiple images enable the photo scroller and gallery view.
                    </p>
                  </div>
                </div>

                {/* Checkboxes: Featured & Sample Listing */}
                <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-slate-100 text-xs font-bold text-slate-700">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                      className="w-4 h-4 rounded text-blue-600"
                    />
                    <span>Feature this property on Homepage</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isSampleListing}
                      onChange={(e) => setFormData({ ...formData, isSampleListing: e.target.checked })}
                      className="w-4 h-4 rounded text-amber-600"
                    />
                    <span>Tag as Sample Listing (For demo/pre-launch verification)</span>
                  </label>
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>{editingProperty ? 'Save Property Updates' : 'Publish to Live Catalogue'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('listings')}
                    className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 3: ENQUIRIES & INSPECTIONS */}
          {activeTab === 'enquiries' && (
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
              <div>
                <h3 className="text-xl font-black text-slate-900">
                  Client Inquiries & Inspection Bookings ({enquiries.length})
                </h3>
                <p className="text-xs text-slate-500">
                  Clients who submitted physical inspection requests or general property questions.
                </p>
              </div>

              {enquiries.length > 0 ? (
                <div className="divide-y divide-slate-100">
                  {enquiries.map((enq) => (
                    <div key={enq.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <strong className="text-slate-900 text-sm font-bold">{enq.name}</strong>
                          <span className="text-slate-400">•</span>
                          <a href={`tel:${enq.phone}`} className="text-emerald-700 font-bold hover:underline">
                            {enq.phone}
                          </a>
                          {enq.email && (
                            <>
                              <span className="text-slate-400">•</span>
                              <span className="text-slate-500">{enq.email}</span>
                            </>
                          )}
                        </div>

                        {enq.propertyTitle && (
                          <div className="text-blue-700 font-semibold">
                            Listing: {enq.propertyTitle}
                          </div>
                        )}

                        <p className="text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                          {enq.message}
                        </p>

                        <div className="text-[10px] text-slate-400">
                          Received: {enq.createdAt ? enq.createdAt.replace('T', ' ').substring(0, 16) : 'Recent'}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <select
                          value={enq.status}
                          onChange={(e: any) => handleEnquiryStatus(enq.id, e.target.value)}
                          className="bg-slate-100 border border-slate-200 rounded-lg p-1.5 text-xs font-bold text-slate-800 outline-none"
                        >
                          <option value="pending">Pending</option>
                          <option value="contacted">Contacted</option>
                          <option value="resolved">Resolved</option>
                        </select>

                        <a
                          href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${enq.name}, this is Balogun Ridwan from RIDWANULLAHI CERTIFIED AGENT regarding your inquiry on our website.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 shadow-sm"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-white" />
                          <span>WhatsApp Client</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-slate-400 text-xs">
                  No client enquiries registered yet. Test the inspection modal on any listing to see how requests populate here.
                </div>
              )}
            </div>
          )}

          {/* TAB 4: CERTIFICATES & CREDENTIALS */}
          {activeTab === 'certificates' && (
            <div className="space-y-6">
              {/* Add New Certificate Form */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
                <h3 className="text-lg font-black text-slate-900">
                  Upload / Register Professional Certificate
                </h3>
                <p className="text-xs text-slate-500">
                  Add genuine certificates issued to Balogun Ridwan Babatunde to be showcased in the Professional Credentials section.
                </p>

                <form onSubmit={handleAddCertificate} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Certificate Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kwara State Real Estate Agency Certificate"
                      value={certForm.title}
                      onChange={(e) => setCertForm({ ...certForm, title: e.target.value })}
                      className="w-full p-2.5 border border-slate-300 rounded-xl outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Issuing Organization *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Real Estate Practice Regulatory Board"
                      value={certForm.issuer}
                      onChange={(e) => setCertForm({ ...certForm, issuer: e.target.value })}
                      className="w-full p-2.5 border border-slate-300 rounded-xl outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Issue Date / Status</label>
                    <input
                      type="text"
                      placeholder="e.g. 2024 / Verified Practitioner"
                      value={certForm.issueDate}
                      onChange={(e) => setCertForm({ ...certForm, issueDate: e.target.value })}
                      className="w-full p-2.5 border border-slate-300 rounded-xl outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Credential ID (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. BRB-KW-CERT-2024"
                      value={certForm.credentialId}
                      onChange={(e) => setCertForm({ ...certForm, credentialId: e.target.value })}
                      className="w-full p-2.5 border border-slate-300 rounded-xl outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-bold text-slate-700 mb-1">Document Image URL *</label>
                    <input
                      type="text"
                      required
                      placeholder="https://..."
                      value={certForm.image}
                      onChange={(e) => setCertForm({ ...certForm, image: e.target.value })}
                      className="w-full p-2.5 border border-slate-300 rounded-xl outline-none font-mono"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-bold text-slate-700 mb-1">Description</label>
                    <textarea
                      rows={2}
                      placeholder="Accreditation scope and legal validation details..."
                      value={certForm.description}
                      onChange={(e) => setCertForm({ ...certForm, description: e.target.value })}
                      className="w-full p-2.5 border border-slate-300 rounded-xl outline-none"
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Certificate Document</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Current Certificates */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
                <h4 className="font-bold text-slate-900 text-sm">
                  Active Verified Certificates ({certificates.length})
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {certificates.map((cert) => (
                    <div key={cert.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 relative">
                      <div className="aspect-[4/3] bg-slate-200 rounded-xl overflow-hidden mb-2">
                        <img src={cert.image} alt={cert.title} className="w-full h-full object-cover" />
                      </div>
                      <h5 className="font-bold text-xs text-slate-900 line-clamp-1">{cert.title}</h5>
                      <p className="text-[11px] text-blue-600">{cert.issuer}</p>
                      <button
                        onClick={() => handleDeleteCertificate(cert.id)}
                        className="text-[11px] text-rose-600 font-bold hover:underline flex items-center gap-1 pt-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Remove</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: LOCATIONS & BUSINESS SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              {/* Location Manager */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-black text-slate-900">
                    Location Filters Manager
                  </h3>
                </div>
                <p className="text-xs text-slate-500">
                  Manage the locations displayed in the property search bar and filters across Ilorin.
                </p>

                <div className="flex flex-wrap items-center gap-2">
                  <input
                    type="text"
                    placeholder="New location name (e.g. Pipeline, Tanke)..."
                    value={newLocationInput}
                    onChange={(e) => setNewLocationInput(e.target.value)}
                    className="px-3.5 py-2 text-xs border border-slate-300 rounded-xl outline-none"
                  />
                  <button
                    onClick={handleAddLocation}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
                  >
                    Add Location
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {settingsForm?.locations.map((loc) => (
                    <span
                      key={loc}
                      className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-2 border border-slate-200"
                    >
                      <span>{loc}</span>
                      <button
                        onClick={() => handleRemoveLocation(loc)}
                        className="text-slate-400 hover:text-rose-600"
                        title="Remove location"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* General Business Info Form */}
              {settingsForm && (
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
                  <h3 className="text-lg font-black text-slate-900">
                    Contact & Public Community Links
                  </h3>

                  <form onSubmit={handleSaveSettings} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={settingsForm.fullName}
                        onChange={(e) => setSettingsForm({ ...settingsForm, fullName: e.target.value })}
                        className="w-full p-2.5 border border-slate-300 rounded-xl outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Business Name</label>
                      <input
                        type="text"
                        value={settingsForm.businessName}
                        onChange={(e) => setSettingsForm({ ...settingsForm, businessName: e.target.value })}
                        className="w-full p-2.5 border border-slate-300 rounded-xl outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Display Phone Number</label>
                      <input
                        type="text"
                        value={settingsForm.phoneDisplay}
                        onChange={(e) => setSettingsForm({ ...settingsForm, phoneDisplay: e.target.value })}
                        className="w-full p-2.5 border border-slate-300 rounded-xl outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        value={settingsForm.email}
                        onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                        className="w-full p-2.5 border border-slate-300 rounded-xl outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-bold text-slate-700 mb-1">Physical Business Address</label>
                      <input
                        type="text"
                        value={settingsForm.address}
                        onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                        className="w-full p-2.5 border border-slate-300 rounded-xl outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-bold text-slate-700 mb-1">
                        Active WhatsApp Community Group Invitation Link
                      </label>
                      <input
                        type="text"
                        placeholder="https://chat.whatsapp.com/..."
                        value={settingsForm.whatsappGroupLink}
                        onChange={(e) => setSettingsForm({ ...settingsForm, whatsappGroupLink: e.target.value })}
                        className="w-full p-2.5 border border-slate-300 rounded-xl outline-none font-mono"
                      />
                      <p className="text-[11px] text-slate-400 mt-1">
                        Replace the placeholder <code>[INSERT ACTIVE WHATSAPP GROUP INVITATION LINK]</code> with your actual WhatsApp group invite link anytime.
                      </p>
                    </div>

                    <div className="sm:col-span-2">
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save Business Settings</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Supabase Connection Helper Box */}
              <div className="bg-slate-900 text-slate-300 rounded-3xl p-6 shadow-sm border border-slate-800 space-y-3 text-xs">
                <div className="flex items-center gap-2 text-sky-400 font-bold">
                  <Database className="w-4 h-4" />
                  <span>Supabase Cloud Database & Storage Ready</span>
                </div>
                <p className="leading-relaxed">
                  Your platform is fully configured with local browser persistence out-of-the-box, ensuring zero setup latency. To enable remote PostgreSQL multi-admin synchronization via Supabase:
                </p>
                <ol className="list-decimal pl-5 space-y-1 text-slate-400 font-mono text-[11px]">
                  <li>Run the SQL statements from <code>supabase_schema.sql</code> in your Supabase SQL editor.</li>
                  <li>Set <code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in <code>.env.local</code>.</li>
                </ol>
              </div>
            </div>
          )}
        </div>
      )}

      <Footer />
    </div>
  );
}
