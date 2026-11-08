'use client';

import { Property, Certificate, Enquiry, BusinessSettings } from '@/types/property';
import { initialProperties, initialCertificates, initialSettings } from './initialData';

const STORAGE_KEYS = {
  PROPERTIES: 'rca_properties_v2',
  CERTIFICATES: 'rca_certificates_v2',
  SETTINGS: 'rca_settings_v2',
  ENQUIRIES: 'rca_enquiries_v2',
};

// Safe localStorage helper
function safeGet<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = window.localStorage.getItem(key);
    if (!item) return fallback;
    return JSON.parse(item) as T;
  } catch (e) {
    console.error(`Error reading ${key} from localStorage:`, e);
    return fallback;
  }
}

function safeSet<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    // Dispatch a storage event for same-tab reactive updates
    window.dispatchEvent(new Event('rca_storage_updated'));
  } catch (e) {
    console.error(`Error writing ${key} to localStorage:`, e);
  }
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

// Properties Store
export function getProperties(): Property[] {
  return safeGet<Property[]>(STORAGE_KEYS.PROPERTIES, initialProperties);
}

export function getPropertyById(id: string): Property | undefined {
  const properties = getProperties();
  return properties.find(p => p.id === id);
}

export function getPropertyBySlug(slug: string): Property | undefined {
  const properties = getProperties();
  return properties.find(p => p.slug === slug || p.id === slug);
}

export function addProperty(propertyData: Omit<Property, 'id' | 'createdAt' | 'updatedAt' | 'slug'>): Property {
  const properties = getProperties();
  const id = 'prop-' + Date.now();
  const slug = slugify(propertyData.title) + '-' + Math.random().toString(36).substring(2, 6);
  const now = new Date().toISOString();

  const newProperty: Property = {
    ...propertyData,
    id,
    slug,
    createdAt: now,
    updatedAt: now,
  };

  const updatedList = [newProperty, ...properties];
  safeSet(STORAGE_KEYS.PROPERTIES, updatedList);
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

  properties[index] = updatedProperty;
  safeSet(STORAGE_KEYS.PROPERTIES, properties);
  return updatedProperty;
}

export function deleteProperty(id: string): boolean {
  const properties = getProperties();
  const filtered = properties.filter(p => p.id !== id);
  if (filtered.length === properties.length) return false;
  safeSet(STORAGE_KEYS.PROPERTIES, filtered);
  return true;
}

// Certificates Store
export function getCertificates(): Certificate[] {
  return safeGet<Certificate[]>(STORAGE_KEYS.CERTIFICATES, initialCertificates);
}

export function addCertificate(cert: Omit<Certificate, 'id'>): Certificate {
  const certs = getCertificates();
  const newCert: Certificate = {
    ...cert,
    id: 'cert-' + Date.now(),
  };
  const updated = [newCert, ...certs];
  safeSet(STORAGE_KEYS.CERTIFICATES, updated);
  return newCert;
}

export function deleteCertificate(id: string): boolean {
  const certs = getCertificates();
  const filtered = certs.filter(c => c.id !== id);
  if (filtered.length === certs.length) return false;
  safeSet(STORAGE_KEYS.CERTIFICATES, filtered);
  return true;
}

// Settings Store
export function getSettings(): BusinessSettings {
  const current = safeGet<BusinessSettings>(STORAGE_KEYS.SETTINGS, initialSettings);
  // Auto-migrate if stored settings still contain old phone number or placeholder
  if (current.phoneDisplay === '07082256257' || current.phone === '+2347082256257' || current.whatsappGroupLink?.includes('INSERT')) {
    current.phone = '+2349161116718';
    current.phoneDisplay = '09161116718';
    current.whatsappGroupLink = 'https://wa.me/qr/W4VP4AFFIC5UC';
    safeSet(STORAGE_KEYS.SETTINGS, current);
  }
  return current;
}

export function updateSettings(newSettings: Partial<BusinessSettings>): BusinessSettings {
  const current = getSettings();
  const updated = { ...current, ...newSettings };
  safeSet(STORAGE_KEYS.SETTINGS, updated);
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

// Enquiries Store
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
  safeSet(STORAGE_KEYS.ENQUIRIES, [newEnquiry, ...enquiries]);
  return newEnquiry;
}

export function updateEnquiryStatus(id: string, status: 'pending' | 'contacted' | 'resolved'): boolean {
  const enquiries = getEnquiries();
  const index = enquiries.findIndex(e => e.id === id);
  if (index === -1) return false;
  enquiries[index].status = status;
  safeSet(STORAGE_KEYS.ENQUIRIES, enquiries);
  return true;
}

export function resetToDefaults(): void {
  safeSet(STORAGE_KEYS.PROPERTIES, initialProperties);
  safeSet(STORAGE_KEYS.CERTIFICATES, initialCertificates);
  safeSet(STORAGE_KEYS.SETTINGS, initialSettings);
  safeSet(STORAGE_KEYS.ENQUIRIES, []);
}

// WhatsApp Direct Links & Call Numbers
export const WHATSAPP_DIRECT_LINK = 'https://wa.me/qr/W4VP4AFFIC5UC';
export const WHATSAPP_NUMBER = '2349161116718';
export const PHONE_CALL_DISPLAY = '09161116718';
export const PHONE_CALL_RAW = '+2349161116718';

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
