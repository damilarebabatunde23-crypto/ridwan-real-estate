import { Property, Certificate, BusinessSettings } from '@/types/property';

export const agentPhoto = '/images/agent-balogun-ridwan.jpg';

export const initialSettings: BusinessSettings = {
  fullName: 'BALOGUN RIDWAN BABATUNDE',
  professionalTitle: 'Certified Real Estate Agent',
  businessName: 'RIDWANULLAHI CERTIFIED AGENT',
  slogan: 'Real Estate. Real People. Real Results.',
  tagline: 'Your Dream Home Is Our Priority.',
  phone: '+2347082256257',
  phoneDisplay: '07082256257',
  email: 'Ridwanyunnus@gmail.com',
  address: '1, Elekoyangan, Ilorin, Kwara State, Nigeria',
  whatsappGroupLink: '[INSERT ACTIVE WHATSAPP GROUP INVITATION LINK]',
  googleBusinessProfile: 'https://share.google/sjVg80f40cSexfRub',
  linkedinProfile: 'https://www.linkedin.com/in/ridwanullahi-certified-61a689303',
  facebookProfile: 'https://www.facebook.com/profile.php?id=100075809320428',
  locations: [
    'Ilorin',
    'Eleko',
    'Poly Gate',
    'Oke Ose',
    'Ganmo',
    'Amoyo',
    'Gaa Akanbi',
    'Oyun',
    'Yakuba',
    'Tanke',
    'Fate'
  ]
};

export const initialProperties: Property[] = [
  // 1. GENUINE VERIFIED LISTING: Oke Ose Behind Kara Market (3-Bed Bungalow on 2 Plots)
  {
    id: 'prop-real-001',
    title: 'Standard 3-Bedroom Bungalow (Uncompleted) on 2 Gated Plots with Well Water',
    slug: 'standard-3-bedroom-bungalow-kara-oke-ose',
    category: 'Houses for Sale',
    purpose: 'buy',
    price: 9500000,
    pricePeriod: 'total',
    location: 'Oke Ose',
    addressDetail: 'Behind Kara Market, After Kwara Polytechnic, Oke Ose, Ilorin, Kwara State',
    description: 'Genuine verified property for sale at Kara Oke Ose, immediately after Kwara State Polytechnic, Ilorin. Consists of an uncompleted standard 3-bedroom bungalow built to lintel level with complete soakaway already constructed. Features reliable well water on site, plus building materials on ground including sharp sand and 2 full trips of granite sand. Sits on 2 full plots of dry land completely fenced and gated. Comes with an approved architectural residential building plan (Radian Sketches Consults). Direct mandated sale.',
    bedrooms: 3,
    bathrooms: 3,
    sizeSqMeters: 920,
    images: [
      '/images/property-kara-oke-ose.jpg',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80'
    ],
    facilities: [
      '2 Full Plots of Land (Fenced and Gated)',
      'Reliable High-Yield Well Water on Site',
      'Complete Soakaway Fully Constructed',
      'Sharp Sand & 2 Trips Granite Sand on Ground',
      'Approved Architectural Building Plan Included',
      'Direct Proximity to Kwara Polytechnic Corridor',
      '100% Verified Title & Dispute Free'
    ],
    status: 'AVAILABLE',
    isFeatured: true,
    isSampleListing: false, // REAL VERIFIED LISTING
    createdAt: '2026-11-06T10:00:00.000Z',
    updatedAt: '2026-11-06T10:00:00.000Z'
  },

  // 2. GENUINE VERIFIED LISTING: Prime Frontline Commercial Shops & Rooms in Eleko
  {
    id: 'prop-real-002',
    title: 'Prime Frontline Commercial Lockup Shops & Residential Units with Borehole',
    slug: 'prime-frontline-shops-rooms-eleko',
    category: 'Shops for Rent',
    purpose: 'rent',
    price: 180000,
    pricePeriod: 'year',
    location: 'Eleko',
    addressDetail: '1, Elekoyangan Commercial Corridor, Eleko, Ilorin, Kwara State',
    description: 'Highly profitable, frontline commercial lockup shops and attached rooms located along the bustling Elekoyangan corridor in Eleko, Ilorin. Fitted with heavy-duty metal security grilles and solid iron gates. Benefits from constant running borehole water with a large overhead storage tank. Excellent high foot-traffic location suitable for retail stores, boutique, beauty/hair salons, pharmacy, or POS banking agency.',
    bedrooms: 1,
    bathrooms: 1,
    sizeSqMeters: 45,
    images: [
      '/images/property-commercial-shops-eleko.jpg',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80'
    ],
    facilities: [
      'Prime High-Traffic Street Frontage',
      'Heavy-Duty Burglary Security Grilles',
      'Overhead Industrial Borehole Water Tank',
      'Dedicated Electric Connection & Meter',
      'Customer Parking & Easy Road Access',
      'Move-In Ready for Business or Living'
    ],
    status: 'AVAILABLE',
    isFeatured: true,
    isSampleListing: false, // REAL VERIFIED LISTING
    createdAt: '2026-11-07T10:00:00.000Z',
    updatedAt: '2026-11-07T10:00:00.000Z'
  },

  // 3. GENUINE VERIFIED LISTING: Student Hostel & Residential Compound in Poly Gate / Oke Ose
  {
    id: 'hostel-real-003',
    title: 'Campus Serene Student Lodge (Spacious Rooms with Arched Veranda & Well Water)',
    slug: 'campus-serene-student-lodge-poly-gate',
    category: 'Student Hostels',
    purpose: 'rent',
    price: 130000,
    pricePeriod: 'year',
    location: 'Poly Gate',
    addressDetail: 'Off Poly Gate Link Road, close to Kwara Polytechnic & Oke Ose axis, Ilorin',
    description: 'Spacious and serene student residential lodge within easy reach of Kwara State Polytechnic and university commuter stops. Features wide arched entrance veranda, fully wired rooms with ceiling fans, strong cross-ventilation, perimeter security fence, and a reliable on-site fresh water well. Quiet and conducive environment for focused academic study.',
    bedrooms: 1,
    bathrooms: 1,
    images: [
      '/images/hostel-student-lodge.jpg',
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80'
    ],
    facilities: [
      'Wide Fenced Perimeter Compound',
      'Arched Entrance Veranda with Shaded Seating',
      'Ceiling Fans & Installed Wiring in All Rooms',
      'On-Site Deep Well Water Infrastructure',
      'Fast Commute to Kwara Poly Gate & Oke Ose Campus',
      'Quiet Academic Neighborhood'
    ],
    status: 'FEW ROOMS LEFT',
    isFeatured: true,
    isSampleListing: false, // REAL VERIFIED LISTING
    hostelDetails: {
      hostelName: 'Campus Serene Student Lodge',
      area: 'Poly Gate',
      roomType: 'Self-Contain Studio',
      totalRooms: 10,
      availableRooms: 3,
      electricityStatus: 'Stable feeder line with ceiling fans and outlets in every room',
      waterStatus: 'Deep on-site fresh well water with continuous yield',
      securityStatus: 'Perimeter boundary block wall with lockable gate',
      distanceToCampus: '5 minutes direct ride to Kwara State Polytechnic Gate',
      nearbySchools: ['Kwara State Polytechnic', 'University of Ilorin Commuter Hub']
    },
    createdAt: '2026-11-07T12:00:00.000Z',
    updatedAt: '2026-11-07T12:00:00.000Z'
  },

  // 4. Student Hostel - Poly Gate
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

  // 6. House For Sale - Eleko
  {
    id: 'prop-004',
    title: 'Contemporary 4-Bedroom Fully Detached Luxury Bungalow with BQ',
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
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
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
  }
];

export const initialCertificates: Certificate[] = [
  // 1. GENUINE OFFICIAL CAC GOVERNMENT CERTIFICATE
  {
    id: 'cert-cac-official',
    title: 'Federal Republic of Nigeria Certificate of Registration (CAC)',
    issuer: 'Corporate Affairs Commission (CAC), Federal Republic of Nigeria',
    issueDate: 'Registered: 6th Nov 2026 (CAM Act 2020)',
    credentialId: 'BN: 9992778 | TIN: 2622351035612',
    description: 'Official Government Certificate of Registration issued under the Companies and Allied Matters Act 2020 by the Registrar-General Hussaini Ishaq Magaji SAN. Formally registering "RIDWANULLAHI REAL ESTATE AGENT" with principal address at 1, Elekoyangan, Ilorin, Kwara State, Nigeria to legally conduct real estate activities across Nigeria.',
    image: '/images/cac-certificate.jpg',
    isVerified: true
  },
  {
    id: 'cert-002',
    title: 'Kwara State Land Title & Coordinates Verification Accreditation',
    issuer: 'Survey & Due Diligence Compliance Standards',
    issueDate: 'Certified Practitioner',
    credentialId: 'KW-LVD-VERIFIED-2026',
    description: 'Accreditation verifying rigorous compliance with beacon coordinates validation, perimeter surveys, Deed of Assignment execution, and C of O validation to protect buyers and students from fraud.',
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
    isVerified: true
  }
];
