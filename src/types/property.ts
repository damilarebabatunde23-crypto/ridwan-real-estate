export type PropertyCategory =
  | 'Houses for Sale'
  | 'Lands for Sale'
  | 'Apartments for Rent'
  | 'Rooms for Rent'
  | 'Shops for Rent'
  | 'Commercial Properties'
  | 'Residential Properties'
  | 'Investment Properties'
  | 'Student Hostels';

export type PropertyPurpose = 'buy' | 'rent';

export type AvailabilityStatus =
  | 'AVAILABLE'
  | 'FEW ROOMS LEFT'
  | 'OCCUPIED'
  | 'SOLD';

export interface HostelDetails {
  hostelName: string;
  area: string;
  roomType: 'Single Room (Shared)' | 'Self-Contain Studio' | 'Self-Contain with Kitchenette' | '2-Bedroom Shared Flat';
  totalRooms: number;
  availableRooms: number;
  electricityStatus: string;
  waterStatus: string;
  securityStatus: string;
  distanceToCampus: string;
  nearbySchools: string[];
}

export interface Property {
  id: string;
  title: string;
  slug: string;
  category: PropertyCategory;
  purpose: PropertyPurpose;
  price: number;
  pricePeriod?: 'year' | 'month' | 'total';
  location: string;
  addressDetail?: string;
  description: string;
  bedrooms?: number;
  bathrooms?: number;
  sizeSqMeters?: number;
  images: string[];
  facilities: string[];
  videoUrl?: string; // Video walkthrough tour (device upload or video link)
  status: AvailabilityStatus;
  isFeatured: boolean;
  isSampleListing: boolean; // Clearly labels sample listings as requested
  hostelDetails?: HostelDetails;
  createdAt: string;
  updatedAt: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  description: string;
  image: string;
  isVerified: boolean;
}

export interface Enquiry {
  id: string;
  propertyId?: string;
  propertyTitle?: string;
  name: string;
  phone: string;
  email?: string;
  message: string;
  type: 'general' | 'hostel_inspection' | 'property_purchase' | 'service_inquiry';
  status: 'pending' | 'contacted' | 'resolved';
  createdAt: string;
}

export interface BusinessSettings {
  fullName: string;
  professionalTitle: string;
  businessName: string;
  slogan: string;
  tagline: string;
  phone: string;
  phoneDisplay: string;
  phoneSecondary?: string;
  phoneSecondaryDisplay?: string;
  email: string;
  address: string;
  whatsappGroupLink: string;
  googleBusinessProfile: string;
  linkedinProfile: string;
  facebookProfile: string;
  locations: string[];
}
