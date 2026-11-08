import { Property, Certificate, BusinessSettings } from '@/types/property';

export const initialSettings: BusinessSettings = {
  fullName: 'BALOGUN RIDWAN BABATUNDE',
  professionalTitle: 'Real Estate Agent',
  businessName: 'RIDWANULLAHI CERTIFIED AGENT',
  slogan: 'Real Estate. Real People. Real Results.',
  tagline: 'Your Dream Home Is Our Priority.',
  phone: '+2347082256257',
  phoneDisplay: '07082256257',
  email: 'Ridwanyunnus@gmail.com',
  address: 'Eleko, Ilorin, Kwara State, Nigeria',
  whatsappGroupLink: '[INSERT ACTIVE WHATSAPP GROUP INVITATION LINK]',
  googleBusinessProfile: 'https://share.google/sjVg80f40cSexfRub',
  linkedinProfile: 'https://www.linkedin.com/in/ridwanullahi-certified-61a689303',
  facebookProfile: 'https://www.facebook.com/profile.php?id=100075809320428',
  locations: [
    'Ilorin',
    'Oyun',
    'Yakuba',
    'Amoyo',
    'Gaa Akanbi',
    'Ganmo',
    'Eleko',
    'Oke Ose',
    'Poly Gate',
    'Tanke',
    'Fate'
  ]
};

export const initialProperties: Property[] = [
  // 1. Student Hostel - Poly Gate
  {
    id: 'hostel-001',
    title: 'Al-Barakah Luxury Student Lodge (Self-Contain Units)',
    slug: 'al-barakah-student-lodge-poly-gate',
    category: 'Student Hostels',
    purpose: 'rent',
    price: 180000,
    pricePeriod: 'year',
    location: 'Poly Gate',
    addressDetail: 'Poly Gate Road, close to Kwara State Polytechnic, Ilorin',
    description: 'Modern, secure off-campus self-contain student rooms within a 4-minute walk to Kwara State Polytechnic campus gate. Features dedicated prepaid meters for each room, high water pressure from borehole with 3 large overhead tanks, and full perimeter security.',
    bedrooms: 1,
    bathrooms: 1,
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
    ],
    facilities: [
      '24/7 Borehole Water & Overhead Tank',
      'Individual Prepaid Meter',
      'Fenced with Security Gatehouse',
      'Tiled Floor & POP Ceiling',
      'Fitted Kitchenette & Private Bath',
      'Reading Desk Space',
      'Ample Motorcycle / Car Parking'
    ],
    status: 'FEW ROOMS LEFT',
    isFeatured: true,
    isSampleListing: true,
    hostelDetails: {
      hostelName: 'Al-Barakah Student Lodge',
      area: 'Poly Gate',
      roomType: 'Self-Contain with Kitchenette',
      totalRooms: 16,
      availableRooms: 3,
      electricityStatus: 'Dedicated Transformer Line + Pre-paid Metres',
      waterStatus: '24/7 Automatic Pumping Borehole (3 Overhead Tanks)',
      securityStatus: 'Uniformed Security Guard on Duty (Night & Day)',
      distanceToCampus: '4 minutes walk to Kwara State Polytechnic Gate',
      nearbySchools: ['Kwara State Polytechnic', 'Institute of Technology']
    },
    createdAt: '2026-03-01T10:00:00.000Z',
    updatedAt: '2026-03-01T10:00:00.000Z'
  },

  // 2. Student Hostel - Oke Ose
  {
    id: 'hostel-002',
    title: 'Crown Pearl Student Villa (Single Self-Contain Studio)',
    slug: 'crown-pearl-student-villa-oke-ose',
    category: 'Student Hostels',
    purpose: 'rent',
    price: 150000,
    pricePeriod: 'year',
    location: 'Oke Ose',
    addressDetail: 'Off University Teaching Hospital Road, Oke Ose, Ilorin',
    description: 'Serene student accommodation situated in Oke Ose. Ideal for students seeking a quiet, focused academic environment with round-the-clock water supply, private balcony, cross-ventilation, and easy access to university transport shuttles.',
    bedrooms: 1,
    bathrooms: 1,
    images: [
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80'
    ],
    facilities: [
      'Running Borehole Water',
      'Prepaid Meter Installed',
      'Fully Fenced with Razor Wire',
      'Private Water Closet & Shower',
      'Kitchen Cabinet Shelves',
      'Clean Interlocked Compound'
    ],
    status: 'AVAILABLE',
    isFeatured: true,
    isSampleListing: true,
    hostelDetails: {
      hostelName: 'Crown Pearl Student Villa',
      area: 'Oke Ose',
      roomType: 'Self-Contain Studio',
      totalRooms: 12,
      availableRooms: 5,
      electricityStatus: 'Stable Residential Feeder + Backup Generator Port',
      waterStatus: 'Industrial Borehole with uninterrupted water flow',
      securityStatus: 'Perimeter Wall with Razor Wire & Locked Access Gate',
      distanceToCampus: '6 minutes ride to Teaching Hospital / Campus Hub',
      nearbySchools: ['UITH College of Health Sciences', 'UNILORIN PS Commuter Hub']
    },
    createdAt: '2026-03-02T10:00:00.000Z',
    updatedAt: '2026-03-02T10:00:00.000Z'
  },

  // 3. Student Hostel - Eleko
  {
    id: 'hostel-003',
    title: 'Peace Haven Student Accommodation (2-Bedroom Shared Flat)',
    slug: 'peace-haven-student-accommodation-eleko',
    category: 'Student Hostels',
    purpose: 'rent',
    price: 240000,
    pricePeriod: 'year',
    location: 'Eleko',
    addressDetail: 'Eleko Area, Ilorin, Kwara State',
    description: 'Spacious 2-bedroom flat suitable for two or three student roommates to share rent comfortably. Comes with a large living lounge, dining corner, wide balcony, and kitchen with exit door. Safe residential neighbourhood.',
    bedrooms: 2,
    bathrooms: 1,
    images: [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80'
    ],
    facilities: [
      'Borehole Water System',
      'Large Living Room',
      'Separate Dining Area',
      'Gated Compound with Security Post',
      'Ample Car / Bike Parking'
    ],
    status: 'OCCUPIED',
    isFeatured: false,
    isSampleListing: true,
    hostelDetails: {
      hostelName: 'Peace Haven Student Residence',
      area: 'Eleko',
      roomType: '2-Bedroom Shared Flat',
      totalRooms: 6,
      availableRooms: 0,
      electricityStatus: 'Public Supply with individual meter',
      waterStatus: 'Overhead Borehole Tanks',
      securityStatus: 'Gated entrance with night watchman',
      distanceToCampus: '10 minutes ride to campus junction',
      nearbySchools: ['Kwara State Polytechnic', 'University of Ilorin']
    },
    createdAt: '2026-03-03T10:00:00.000Z',
    updatedAt: '2026-03-03T10:00:00.000Z'
  },

  // 4. House For Sale - Eleko
  {
    id: 'prop-004',
    title: 'Contemporary 4-Bedroom Fully Detached Bungalow with BQ',
    slug: 'contemporary-4-bedroom-bungalow-eleko',
    category: 'Houses for Sale',
    purpose: 'buy',
    price: 48000000,
    pricePeriod: 'total',
    location: 'Eleko',
    addressDetail: 'Prime Residential Layout, Eleko, Ilorin',
    description: 'A masterpiece of modern residential architecture situated in prime Eleko, Ilorin. This luxury 4-bedroom bungalow features all en-suite bedrooms, imported sanitary wares, Turkish security doors, a state-of-the-art fitted kitchen, interlocked compound for 6 vehicles, and a self-contained Boys Quarters.',
    bedrooms: 4,
    bathrooms: 5,
    sizeSqMeters: 650,
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80'
    ],
    facilities: [
      'All Bedrooms En-Suite',
      'Registered Survey & Approved Building Plan',
      'Fully Fitted Kitchen with Heat Extractor',
      'Clean Borehole with Water Treatment',
      'Paved Interlocked Compound',
      'Electric Security Wire Fence',
      'Attached 1-Room Boys Quarters'
    ],
    status: 'AVAILABLE',
    isFeatured: true,
    isSampleListing: true,
    createdAt: '2026-03-04T10:00:00.000Z',
    updatedAt: '2026-03-04T10:00:00.000Z'
  },

  // 5. Land For Sale - Amoyo
  {
    id: 'prop-005',
    title: 'Dry & Level Commercial/Residential Plots (100ft x 50ft)',
    slug: 'dry-level-plots-amoyo',
    category: 'Lands for Sale',
    purpose: 'buy',
    price: 3200000,
    pricePeriod: 'total',
    location: 'Amoyo',
    addressDetail: 'Developing Masterplan Zone, Amoyo Axis, Ilorin',
    description: 'Fast-developing dry table land located in Amoyo. Completely free from government acquisition or local disputes. Excellent for building rental flats, student lodges, personal residences, or long-term capital appreciation. Instant physical allocation upon payment.',
    sizeSqMeters: 465,
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1524813686514-a57563d77d66?auto=format&fit=crop&w=1200&q=80'
    ],
    facilities: [
      'Perimeter Survey Available',
      'Dry Table Land (No Waterlogging)',
      'Direct Motor Access Road',
      'Electricity Poles Extending Along Layout',
      'Immediate Physical Allocation'
    ],
    status: 'AVAILABLE',
    isFeatured: true,
    isSampleListing: true,
    createdAt: '2026-03-05T10:00:00.000Z',
    updatedAt: '2026-03-05T10:00:00.000Z'
  },

  // 6. Land For Sale - Oyun
  {
    id: 'prop-006',
    title: 'Prime 2 Corner Plots for Mixed-Use Development',
    slug: 'prime-corner-plots-oyun',
    category: 'Lands for Sale',
    purpose: 'buy',
    price: 6800000,
    pricePeriod: 'total',
    location: 'Oyun',
    addressDetail: 'Oyun High-Street Extension, Ilorin',
    description: 'Two well-positioned corner plots on a strategic link road in Oyun. Ideal for building a commercial complex, school, hospital or gated residential terrace homes. Clean deed and verified boundary pillars.',
    sizeSqMeters: 920,
    images: [
      'https://images.unsplash.com/photo-1628624747186-a941c476b7ef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80'
    ],
    facilities: [
      'Deed of Assignment Ready',
      'Survey Plan Approved',
      'Tarred Access Road Proximity',
      'Developed Neighborhood with Built Houses'
    ],
    status: 'AVAILABLE',
    isFeatured: false,
    isSampleListing: true,
    createdAt: '2026-03-06T10:00:00.000Z',
    updatedAt: '2026-03-06T10:00:00.000Z'
  },

  // 7. Shops For Rent - Ganmo
  {
    id: 'prop-007',
    title: 'Modern Frontline Lockup Commercial Shops & Stores',
    slug: 'frontline-commercial-shops-ganmo',
    category: 'Shops for Rent',
    purpose: 'rent',
    price: 350000,
    pricePeriod: 'year',
    location: 'Ganmo',
    addressDetail: 'Expressway Commercial Corridor, Ganmo, Ilorin',
    description: 'High foot-traffic lock-up commercial shop directly facing the busy commercial corridor in Ganmo. Perfect for pharmaceutical stores, boutique, wholesale business, POS banking center, or logistics hub.',
    bathrooms: 1,
    sizeSqMeters: 36,
    images: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582037928769-181f2644ecb7?auto=format&fit=crop&w=1200&q=80'
    ],
    facilities: [
      'High Pedestrian & Vehicular Traffic',
      'Solid Metal Rolling Shutter Doors',
      'Dedicated Electric Meter',
      'Commercial Restrooms for Tenants',
      'Customer Parking Lot in Front'
    ],
    status: 'AVAILABLE',
    isFeatured: true,
    isSampleListing: true,
    createdAt: '2026-03-07T10:00:00.000Z',
    updatedAt: '2026-03-07T10:00:00.000Z'
  },

  // 8. Apartments For Rent - Gaa Akanbi
  {
    id: 'prop-008',
    title: 'Executive 3-Bedroom Flat with Modern Finishing',
    slug: 'executive-3-bedroom-flat-gaa-akanbi',
    category: 'Apartments for Rent',
    purpose: 'rent',
    price: 900000,
    pricePeriod: 'year',
    location: 'Gaa Akanbi',
    addressDetail: 'Quiet Residential Layout, Gaa Akanbi, Ilorin',
    description: 'Tastefully finished 3-bedroom flat in a calm, gated community in Gaa Akanbi. Comes with guest toilet, dining area, fitted kitchen cabinets, overhead water supply, and dedicated car parking slots.',
    bedrooms: 3,
    bathrooms: 3,
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80'
    ],
    facilities: [
      'All Rooms En-suite with Guest Toilet',
      'Prepaid Metering System',
      'Overhead Clean Borehole Water',
      'Fenced Gated Compound',
      'Interlocked Compound'
    ],
    status: 'AVAILABLE',
    isFeatured: false,
    isSampleListing: true,
    createdAt: '2026-03-08T10:00:00.000Z',
    updatedAt: '2026-03-08T10:00:00.000Z'
  },

  // 9. Commercial / Investment Property - Yakuba
  {
    id: 'prop-009',
    title: 'Block of 8 Units Student Flats (High ROI Investment)',
    slug: 'block-of-8-units-student-flats-yakuba',
    category: 'Investment Properties',
    purpose: 'buy',
    price: 38000000,
    pricePeriod: 'total',
    location: 'Yakuba',
    addressDetail: 'Yakuba Layout, easy reach to Kwara institutions, Ilorin',
    description: 'Outstanding investment opportunity for discerning real estate investors. A fully constructed 2-storey block consisting of 8 spacious self-contained apartments. Currently generating steady annual rental income with 100% occupancy history.',
    bedrooms: 8,
    bathrooms: 8,
    sizeSqMeters: 750,
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80'
    ],
    facilities: [
      'Documented C of O / Survey Plan',
      'Immediate Rental Cash Flow Yield',
      'Industrial Borehole with Overhead Tank Stand',
      'Gated Compound with Security Post',
      'Separate Electric Meters for each flat'
    ],
    status: 'AVAILABLE',
    isFeatured: true,
    isSampleListing: true,
    createdAt: '2026-03-09T10:00:00.000Z',
    updatedAt: '2026-03-09T10:00:00.000Z'
  }
];

export const initialCertificates: Certificate[] = [
  {
    id: 'cert-001',
    title: 'Certificate of Real Estate Agency Practice',
    issuer: 'Real Estate Practice Certification Body',
    issueDate: 'Verified Practitioner',
    credentialId: 'BRB-KW-CERT-2024',
    description: 'Formal professional certification issued to Balogun Ridwan Babatunde authorizing professional property agency, land transaction facilitation, and real estate management in Kwara State.',
    image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=800&q=80',
    isVerified: true
  },
  {
    id: 'cert-002',
    title: 'Business Registration & Agency Identification',
    issuer: 'Enterprise Compliance & Business Entity Register',
    issueDate: 'Certified Operating Agency',
    credentialId: 'RCA-ILR-REG-994',
    description: 'Registered business operational document recognizing RIDWANULLAHI CERTIFIED AGENT with registered headquarters in Eleko, Ilorin, Kwara State, Nigeria.',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    isVerified: true
  },
  {
    id: 'cert-003',
    title: 'Land Verification & Title Due Diligence Compliance',
    issuer: 'Kwara State Property Documentation Standards',
    issueDate: 'Verified Due-Diligence Practitioner',
    credentialId: 'LVD-KW-2023-VERIFIED',
    description: 'Accreditation verifying rigorous compliance with surveyor coordinates verification, Gazette, Deed of Assignment, and C of O validation to protect buyers and students from fraud.',
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
    isVerified: true
  }
];
