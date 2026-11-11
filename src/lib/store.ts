'use client';

import { Property, Certificate, Enquiry, BusinessSettings } from '@/types/property';
import { initialProperties, initialCertificates, initialSettings } from './initialData';
import { getSupabaseClient, isSupabaseConfigured, getSupabaseCredentials } from './supabase';

export const STORAGE_KEYS = {
  PROPERTIES: 'rca_properties_v2',
  CERTIFICATES: 'rca_certificates_v2',
  SETTINGS: 'rca_settings_v2',
  ENQUIRIES: 'rca_enquiries_v2',
};

// In-memory cache to ensure session persistence across components
const memoryCache: Record<string, any> = {};

// Safe localStorage helper with sessionStorage fallback
function safeGet<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    let item = window.localStorage.getItem(key);
    if (!item) {
      item = window.sessionStorage.getItem(key);
    }
    if (!item) {
      if (memoryCache[key]) return memoryCache[key] as T;
      return fallback;
    }
    const parsed = JSON.parse(item) as T;
    memoryCache[key] = parsed;
    return parsed;
  } catch (e) {
    console.error(`Error reading ${key} from storage:`, e);
    return memoryCache[key] || fallback;
  }
}

function safeSet<T>(key: string, value: T): void {
  memoryCache[key] = value;
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`Error writing ${key} to localStorage (quota or disabled). Using sessionStorage:`, e);
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    } catch (_) {}
  }
  // Dispatch a storage event for same-tab reactive updates
  try {
    window.dispatchEvent(new Event('rca_storage_updated'));
  } catch (_) {}
}

// Format Naira currency cleanly
export function formatNaira(amount: number): string {
  return '₦' + new Intl.NumberFormat('en-NG').format(amount);
}

// Format price with period (e.g., ₦180,000 / yr or ₦48,000,000)
export function formatPriceWithPeriod(price: number, period?: 'year' | 'month' | 'total', category?: string): string {
  const formatted = formatNaira(price);
  if (period === 'year' || category === 'Student Hostels' || category === 'Apartments for Rent' || category === 'Shops for Rent' || category === 'Rooms for Rent') {
    return `${formatted} / yr`;
  }
  if (period === 'month') {
    return `${formatted} / mo`;
  }
  return formatted;
}

// Generate URL slug from title
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// --- DATABASE MAPPERS (CamelCase <-> Snake_Case) ---

function propertyToDb(p: Property) {
  return {
    id: p.id,
    title: p.title,
    slug: p.slug,
    category: p.category,
    purpose: p.purpose,
    price: p.price,
    price_period: p.pricePeriod || 'year',
    location: p.location,
    address_detail: p.addressDetail || null,
    description: p.description,
    bedrooms: p.bedrooms ?? null,
    bathrooms: p.bathrooms ?? null,
    size_sq_meters: p.sizeSqMeters ?? null,
    images: p.images || [],
    facilities: p.facilities || [],
    video_url: p.videoUrl || null,
    status: p.status,
    is_featured: Boolean(p.isFeatured),
    is_sample_listing: Boolean(p.isSampleListing),
    hostel_details: p.hostelDetails || null,
    created_at: p.createdAt || new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

function dbToProperty(row: any): Property {
  return {
    id: String(row.id),
    title: row.title || 'Untitled Property',
    slug: row.slug || String(row.id),
    category: row.category || 'Residential Properties',
    purpose: (row.purpose === 'buy' ? 'buy' : 'rent') as any,
    price: Number(row.price) || 0,
    pricePeriod: row.price_period || 'year',
    location: row.location || 'Ilorin',
    addressDetail: row.address_detail || undefined,
    description: row.description || '',
    bedrooms: row.bedrooms ?? undefined,
    bathrooms: row.bathrooms ?? undefined,
    sizeSqMeters: row.size_sq_meters ? Number(row.size_sq_meters) : undefined,
    images: Array.isArray(row.images) ? row.images : [],
    facilities: Array.isArray(row.facilities) ? row.facilities : [],
    videoUrl: row.video_url || undefined,
    status: (row.status || 'AVAILABLE') as any,
    isFeatured: Boolean(row.is_featured),
    isSampleListing: Boolean(row.is_sample_listing),
    hostelDetails: row.hostel_details || undefined,
    createdAt: row.created_at || new Date().toISOString(),
    updatedAt: row.updated_at || new Date().toISOString(),
  };
}

function certificateToDb(c: Certificate) {
  return {
    id: c.id,
    title: c.title,
    issuer: c.issuer,
    issue_date: c.issueDate,
    credential_id: c.credentialId || null,
    description: c.description,
    image: c.image,
    is_verified: Boolean(c.isVerified),
    created_at: new Date().toISOString(),
  };
}

function dbToCertificate(row: any): Certificate {
  return {
    id: String(row.id),
    title: row.title || '',
    issuer: row.issuer || '',
    issueDate: row.issue_date || '',
    credentialId: row.credential_id || undefined,
    description: row.description || '',
    image: row.image || '',
    isVerified: Boolean(row.is_verified),
  };
}

function enquiryToDb(e: Enquiry) {
  return {
    id: e.id,
    property_id: e.propertyId || null,
    property_title: e.propertyTitle || null,
    name: e.name,
    phone: e.phone,
    email: e.email || null,
    message: e.message,
    type: e.type || 'general',
    status: e.status || 'pending',
    created_at: e.createdAt || new Date().toISOString(),
  };
}

function dbToEnquiry(row: any): Enquiry {
  return {
    id: String(row.id),
    propertyId: row.property_id || undefined,
    propertyTitle: row.property_title || undefined,
    name: row.name || '',
    phone: row.phone || '',
    email: row.email || undefined,
    message: row.message || '',
    type: (row.type || 'general') as any,
    status: (row.status || 'pending') as any,
    createdAt: row.created_at || new Date().toISOString(),
  };
}

function settingsToDb(s: BusinessSettings) {
  return {
    id: 1,
    full_name: s.fullName,
    professional_title: s.professionalTitle,
    business_name: s.businessName,
    slogan: s.slogan,
    tagline: s.tagline,
    phone: s.phone,
    phone_display: s.phoneDisplay,
    phone_secondary: s.phoneSecondary || null,
    phone_secondary_display: s.phoneSecondaryDisplay || null,
    email: s.email,
    address: s.address,
    whatsapp_group_link: s.whatsappGroupLink,
    google_business_profile: s.googleBusinessProfile,
    linkedin_profile: s.linkedinProfile,
    facebook_profile: s.facebookProfile,
    locations: s.locations || [],
    updated_at: new Date().toISOString(),
  };
}

function dbToSettings(row: any): BusinessSettings {
  return {
    fullName: row.full_name || initialSettings.fullName,
    professionalTitle: row.professional_title || initialSettings.professionalTitle,
    businessName: row.business_name || initialSettings.businessName,
    slogan: row.slogan || initialSettings.slogan,
    tagline: row.tagline || initialSettings.tagline,
    phone: row.phone || initialSettings.phone,
    phoneDisplay: row.phone_display || initialSettings.phoneDisplay,
    phoneSecondary: row.phone_secondary || initialSettings.phoneSecondary,
    phoneSecondaryDisplay: row.phone_secondary_display || initialSettings.phoneSecondaryDisplay,
    email: row.email || initialSettings.email,
    address: row.address || initialSettings.address,
    whatsappGroupLink: row.whatsapp_group_link || initialSettings.whatsappGroupLink,
    googleBusinessProfile: row.google_business_profile || initialSettings.googleBusinessProfile,
    linkedinProfile: row.linkedin_profile || initialSettings.linkedinProfile,
    facebookProfile: row.facebook_profile || initialSettings.facebookProfile,
    locations: Array.isArray(row.locations) && row.locations.length > 0 ? row.locations : initialSettings.locations,
  };
}

// --- CLOUD SYNCHRONIZATION ENGINE ---

let isCloudSyncing = false;
let isRealtimeSubscribed = false;

export async function syncFromCloud(): Promise<void> {
  if (typeof window === 'undefined') return;
  const client = getSupabaseClient();
  if (!client || isCloudSyncing) return;

  isCloudSyncing = true;
  try {
    // 1. Sync Properties
    const { data: propRows, error: propErr } = await client
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false });

    if (!propErr && propRows) {
      if (propRows.length > 0) {
        const cloudProps = propRows.map(dbToProperty);
        safeSet(STORAGE_KEYS.PROPERTIES, cloudProps);
      } else {
        // Table is empty in Supabase, seed initial properties so site has full catalogue
        const seedPayload = initialProperties.map(propertyToDb);
        await client.from('properties').insert(seedPayload);
      }
    } else if (propErr) {
      console.warn('Supabase properties sync note:', propErr.message);
    }

    // 2. Sync Certificates
    const { data: certRows, error: certErr } = await client
      .from('certificates')
      .select('*')
      .order('created_at', { ascending: false });

    if (!certErr && certRows) {
      if (certRows.length > 0) {
        const cloudCerts = certRows.map(dbToCertificate);
        safeSet(STORAGE_KEYS.CERTIFICATES, cloudCerts);
      } else {
        const seedCerts = initialCertificates.map(certificateToDb);
        await client.from('certificates').insert(seedCerts);
      }
    }

    // 3. Sync Settings
    const { data: settingsRow, error: setErr } = await client
      .from('business_settings')
      .select('*')
      .limit(1)
      .maybeSingle();

    if (!setErr && settingsRow) {
      const cloudSettings = dbToSettings(settingsRow);
      safeSet(STORAGE_KEYS.SETTINGS, cloudSettings);
    } else if (!settingsRow && !setErr) {
      await client.from('business_settings').upsert(settingsToDb(initialSettings));
    }

    // 4. Sync Enquiries
    const { data: enqRows, error: enqErr } = await client
      .from('enquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (!enqErr && enqRows) {
      const cloudEnquiries = enqRows.map(dbToEnquiry);
      safeSet(STORAGE_KEYS.ENQUIRIES, cloudEnquiries);
    }

    // Setup realtime subscription after successful initial sync
    setupRealtimeSubscription();
  } catch (err) {
    console.warn('Cloud sync error (running in local offline fallback):', err);
  } finally {
    isCloudSyncing = false;
  }
}

function setupRealtimeSubscription() {
  if (typeof window === 'undefined' || isRealtimeSubscribed) return;
  const client = getSupabaseClient();
  if (!client) return;

  try {
    const channel = client
      .channel('rca_live_sync')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'properties' },
        async () => {
          const { data } = await client.from('properties').select('*').order('created_at', { ascending: false });
          if (data) {
            safeSet(STORAGE_KEYS.PROPERTIES, data.map(dbToProperty));
          }
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'certificates' },
        async () => {
          const { data } = await client.from('certificates').select('*').order('created_at', { ascending: false });
          if (data) {
            safeSet(STORAGE_KEYS.CERTIFICATES, data.map(dbToCertificate));
          }
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'business_settings' },
        async () => {
          const { data } = await client.from('business_settings').select('*').limit(1).maybeSingle();
          if (data) {
            safeSet(STORAGE_KEYS.SETTINGS, dbToSettings(data));
          }
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'enquiries' },
        async () => {
          const { data } = await client.from('enquiries').select('*').order('created_at', { ascending: false });
          if (data) {
            safeSet(STORAGE_KEYS.ENQUIRIES, data.map(dbToEnquiry));
          }
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          isRealtimeSubscribed = true;
        }
      });
  } catch (err) {
    console.warn('Realtime subscription could not be established:', err);
  }
}

// Auto-trigger sync in browser on module load
if (typeof window !== 'undefined') {
  // Run on initial page load
  setTimeout(() => {
    syncFromCloud();
  }, 50);

  // Re-sync when user tabs back into the window
  window.addEventListener('focus', () => {
    syncFromCloud();
  });
}

// Cloud Query Helper to safely execute Supabase operations without breaking local flow
async function runCloudQuery(queryPromise: PromiseLike<any>, desc: string) {
  try {
    const res = await queryPromise;
    if (res && res.error) {
      console.warn(`Supabase ${desc} warning:`, res.error.message);
    }
    return res;
  } catch (err: any) {
    console.warn(`Supabase ${desc} network error:`, err?.message || err);
    return null;
  }
}

// --- PROPERTIES STORE ---

export function getProperties(): Property[] {
  return safeGet<Property[]>(STORAGE_KEYS.PROPERTIES, initialProperties);
}

export function getPropertyById(id: string): Property | undefined {
  const properties = getProperties();
  return properties.find(p => p.id === id);
}

export function getPropertyBySlug(slug: string): Property | undefined {
  if (!slug) return undefined;
  const properties = getProperties();
  const raw = slug.trim();
  const clean = decodeURIComponent(raw).toLowerCase().trim();

  // 1. Direct exact or lowercased match
  let found = properties.find(
    (p) =>
      p.slug === raw ||
      p.id === raw ||
      (p.slug && p.slug.toLowerCase().trim() === clean) ||
      (p.id && p.id.toLowerCase().trim() === clean)
  );
  if (found) return found;

  // 2. Match without random suffix or partial slug
  found = properties.find((p) => {
    const pSlug = p.slug?.toLowerCase().trim() || '';
    const pId = p.id?.toLowerCase().trim() || '';
    return (
      (pSlug && (clean.startsWith(pSlug) || pSlug.startsWith(clean))) ||
      (pId && clean.includes(pId))
    );
  });
  if (found) return found;

  // 3. Match by slugified title directly
  found = properties.find((p) => {
    const titleSlug = slugify(p.title);
    return titleSlug && (clean.includes(titleSlug) || titleSlug.includes(clean));
  });

  return found;
}

export function addProperty(propertyData: Omit<Property, 'id' | 'createdAt' | 'updatedAt' | 'slug'>): Property {
  const properties = getProperties();
  const id = 'prop-' + Date.now();
  const baseSlug = slugify(propertyData.title) || 'property';
  const slug = `${baseSlug}-${Math.random().toString(36).substring(2, 6)}`;
  const now = new Date().toISOString();

  const newProperty: Property = {
    ...propertyData,
    id,
    slug,
    createdAt: now,
    updatedAt: now,
  };

  // 1. Immediate optimistic local update
  const updatedList = [newProperty, ...properties];
  safeSet(STORAGE_KEYS.PROPERTIES, updatedList);

  // 2. Persist to Supabase cloud database
  const client = getSupabaseClient();
  if (client) {
    runCloudQuery(
      client.from('properties').insert(propertyToDb(newProperty)),
      'inserting property'
    );
  }

  return newProperty;
}

export function updateProperty(id: string, updates: Partial<Property>): Property | null {
  const properties = getProperties();
  const index = properties.findIndex(p => p.id === id);
  if (index === -1) return null;

  const now = new Date().toISOString();
  const updatedProperty: Property = {
    ...properties[index],
    ...updates,
    updatedAt: now,
  };

  // 1. Immediate optimistic local update
  properties[index] = updatedProperty;
  safeSet(STORAGE_KEYS.PROPERTIES, properties);

  // 2. Persist to Supabase cloud database
  const client = getSupabaseClient();
  if (client) {
    const dbPayload = propertyToDb(updatedProperty);
    runCloudQuery(
      client.from('properties').update(dbPayload).eq('id', id),
      'updating property'
    );
  }

  return updatedProperty;
}

export function deleteProperty(id: string): boolean {
  const properties = getProperties();
  const filtered = properties.filter(p => p.id !== id);
  if (filtered.length === properties.length) return false;

  // 1. Immediate optimistic local update
  safeSet(STORAGE_KEYS.PROPERTIES, filtered);

  // 2. Persist to Supabase cloud database
  const client = getSupabaseClient();
  if (client) {
    runCloudQuery(
      client.from('properties').delete().eq('id', id),
      'deleting property'
    );
  }

  return true;
}

// --- CERTIFICATES STORE ---

export function getCertificates(): Certificate[] {
  return safeGet<Certificate[]>(STORAGE_KEYS.CERTIFICATES, initialCertificates);
}

export function addCertificate(cert: Omit<Certificate, 'id'>): Certificate {
  const certs = getCertificates();
  const newCert: Certificate = {
    ...cert,
    id: 'cert-' + Date.now(),
  };

  // 1. Immediate optimistic local update
  const updated = [newCert, ...certs];
  safeSet(STORAGE_KEYS.CERTIFICATES, updated);

  // 2. Persist to Supabase
  const client = getSupabaseClient();
  if (client) {
    runCloudQuery(
      client.from('certificates').insert(certificateToDb(newCert)),
      'inserting certificate'
    );
  }

  return newCert;
}

export function deleteCertificate(id: string): boolean {
  const certs = getCertificates();
  const filtered = certs.filter(c => c.id !== id);
  if (filtered.length === certs.length) return false;

  safeSet(STORAGE_KEYS.CERTIFICATES, filtered);

  const client = getSupabaseClient();
  if (client) {
    runCloudQuery(
      client.from('certificates').delete().eq('id', id),
      'deleting certificate'
    );
  }

  return true;
}

// --- SETTINGS STORE ---

export function getSettings(): BusinessSettings {
  const current = safeGet<BusinessSettings>(STORAGE_KEYS.SETTINGS, initialSettings);
  let changed = false;
  if (!current.phoneSecondary || current.phoneSecondary !== '+2347082256257') {
    current.phoneSecondary = '+2347082256257';
    current.phoneSecondaryDisplay = '07082256257';
    changed = true;
  }
  if (!current.phone || current.phone === '+2347082256257') {
    current.phone = '+2349161116718';
    current.phoneDisplay = '09161116718';
    changed = true;
  }
  if (!current.whatsappGroupLink || current.whatsappGroupLink.includes('INSERT') || current.whatsappGroupLink.includes('wa.me/qr')) {
    current.whatsappGroupLink = 'https://chat.whatsapp.com/FiGliyINdjiLcTFpBYGGzV?mode=ac_t';
    changed = true;
  }
  if (changed) {
    safeSet(STORAGE_KEYS.SETTINGS, current);
  }
  return current;
}

export function updateSettings(newSettings: Partial<BusinessSettings>): BusinessSettings {
  const current = getSettings();
  const updated = { ...current, ...newSettings };

  // 1. Immediate optimistic local update
  safeSet(STORAGE_KEYS.SETTINGS, updated);

  // 2. Persist to Supabase
  const client = getSupabaseClient();
  if (client) {
    runCloudQuery(
      client.from('business_settings').upsert(settingsToDb(updated)),
      'updating settings'
    );
  }

  return updated;
}

export function addLocation(locationName: string): string[] {
  const current = getSettings();
  const trimmed = locationName.trim();
  if (!trimmed || current.locations.includes(trimmed)) return current.locations;
  const updatedLocations = [...current.locations, trimmed];
  updateSettings({ locations: updatedLocations });
  return updatedLocations;
}

// --- ENQUIRIES STORE ---

export function getEnquiries(): Enquiry[] {
  return safeGet<Enquiry[]>(STORAGE_KEYS.ENQUIRIES, []);
}

export function addEnquiry(enquiry: Omit<Enquiry, 'id' | 'createdAt' | 'status'>): Enquiry {
  const enquiries = getEnquiries();
  const newEnquiry: Enquiry = {
    ...enquiry,
    id: 'enq-' + Date.now(),
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  // 1. Immediate optimistic local update
  safeSet(STORAGE_KEYS.ENQUIRIES, [newEnquiry, ...enquiries]);

  // 2. Persist to Supabase
  const client = getSupabaseClient();
  if (client) {
    runCloudQuery(
      client.from('enquiries').insert(enquiryToDb(newEnquiry)),
      'inserting enquiry'
    );
  }

  return newEnquiry;
}

export function updateEnquiryStatus(id: string, status: 'pending' | 'contacted' | 'resolved'): boolean {
  const enquiries = getEnquiries();
  const index = enquiries.findIndex(e => e.id === id);
  if (index === -1) return false;

  enquiries[index].status = status;
  safeSet(STORAGE_KEYS.ENQUIRIES, enquiries);

  const client = getSupabaseClient();
  if (client) {
    runCloudQuery(
      client.from('enquiries').update({ status }).eq('id', id),
      'updating enquiry status'
    );
  }

  return true;
}

export function resetToDefaults(): void {
  safeSet(STORAGE_KEYS.PROPERTIES, initialProperties);
  safeSet(STORAGE_KEYS.CERTIFICATES, initialCertificates);
  safeSet(STORAGE_KEYS.SETTINGS, initialSettings);
  safeSet(STORAGE_KEYS.ENQUIRIES, []);
}

// --- WHATSAPP DIRECT LINKS & CONTACT STRINGS ---

export const WHATSAPP_DIRECT_LINK = 'https://wa.me/qr/W4VP4AFFIC5UC1';
export const WHATSAPP_GROUP_LINK = 'https://chat.whatsapp.com/FiGliyINdjiLcTFpBYGGzV?mode=ac_t';
export const WHATSAPP_NUMBER = '2349161116718';
export const PHONE_CALL_DISPLAY = '09161116718';
export const PHONE_CALL_RAW = '+2349161116718';
export const PHONE_CALL_SECONDARY_DISPLAY = '07082256257';
export const PHONE_CALL_SECONDARY_RAW = '+2347082256257';

export function getWhatsAppGeneralLink(customMessage?: string): string {
  if (!customMessage) {
    return WHATSAPP_DIRECT_LINK;
  }
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(customMessage)}`;
}

export function getWhatsAppPropertyLink(property: Property): string {
  const priceText = formatPriceWithPeriod(property.price, property.pricePeriod, property.category);
  const text = `Hello RIDWANULLAHI CERTIFIED AGENT, I am interested in your property listing: "${property.title}" located in ${property.location} (${priceText}). Please provide more information.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function getWhatsAppHostelLink(hostel: Property): string {
  const hostelName = hostel.hostelDetails?.hostelName || hostel.title;
  const text = `Hello, I found your student hostel listing on your website (${hostelName} in ${hostel.location}). I would like to know more about room availability and inspection.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function getWhatsAppInspectionLink(property: Property, clientName: string, date?: string, time?: string): string {
  const dateStr = date ? ` on ${date}` : '';
  const timeStr = time ? ` around ${time}` : '';
  const text = `Hello RIDWANULLAHI CERTIFIED AGENT, my name is ${clientName}. I would like to schedule an inspection for "${property.title}" (${property.location})${dateStr}${timeStr}. Please let me know the available inspection time.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
