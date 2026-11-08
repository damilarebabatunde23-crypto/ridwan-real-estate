-- RIDWANULLAHI CERTIFIED AGENT - Database Schema for Supabase
-- Run this in the Supabase SQL Editor to initialize your cloud database

-- 1. PROPERTIES & STUDENT HOSTELS TABLE
create table if not exists public.properties (
  id text primary key,
  title text not null,
  slug text unique not null,
  category text not null,
  purpose text not null check (purpose in ('buy', 'rent')),
  price numeric not null,
  price_period text default 'year',
  location text not null,
  address_detail text,
  description text not null,
  bedrooms integer,
  bathrooms integer,
  size_sq_meters numeric,
  images text[] default '{}',
  facilities text[] default '{}',
  status text not null check (status in ('AVAILABLE', 'FEW ROOMS LEFT', 'OCCUPIED', 'SOLD')),
  is_featured boolean default false,
  is_sample_listing boolean default false,
  hostel_details jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. PROFESSIONAL CERTIFICATES TABLE
create table if not exists public.certificates (
  id text primary key,
  title text not null,
  issuer text not null,
  issue_date text not null,
  credential_id text,
  description text not null,
  image text not null,
  is_verified boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. CLIENT ENQUIRIES TABLE
create table if not exists public.enquiries (
  id text primary key,
  property_id text,
  property_title text,
  name text not null,
  phone text not null,
  email text,
  message text not null,
  type text default 'general',
  status text default 'pending' check (status in ('pending', 'contacted', 'resolved')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. BUSINESS SETTINGS TABLE
create table if not exists public.business_settings (
  id integer primary key default 1,
  full_name text default 'BALOGUN RIDWAN BABATUNDE',
  professional_title text default 'Real Estate Agent',
  business_name text default 'RIDWANULLAHI CERTIFIED AGENT',
  slogan text default 'Real Estate. Real People. Real Results.',
  tagline text default 'Your Dream Home Is Our Priority.',
  phone text default '+2347082256257',
  phone_display text default '07082256257',
  email text default 'Ridwanyunnus@gmail.com',
  address text default 'Eleko, Ilorin, Kwara State, Nigeria',
  whatsapp_group_link text default '[INSERT ACTIVE WHATSAPP GROUP INVITATION LINK]',
  google_business_profile text default 'https://share.google/sjVg80f40cSexfRub',
  linkedin_profile text default 'https://www.linkedin.com/in/ridwanullahi-certified-61a689303',
  facebook_profile text default 'https://www.facebook.com/profile.php?id=100075809320428',
  locations text[] default array['Ilorin', 'Oyun', 'Yakuba', 'Amoyo', 'Gaa Akanbi', 'Ganmo', 'Eleko', 'Oke Ose', 'Poly Gate'],
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.properties enable row level security;
alter table public.certificates enable row level security;
alter table public.enquiries enable row level security;
alter table public.business_settings enable row level security;

-- Public Read Policies
create policy "Public can view properties" on public.properties for select using (true);
create policy "Public can view certificates" on public.certificates for select using (true);
create policy "Public can insert enquiries" on public.enquiries for insert with check (true);
create policy "Public can view settings" on public.business_settings for select using (true);

-- Authenticated Admin Policies (Write/Update/Delete)
create policy "Authenticated admins have full access to properties" on public.properties for all using (auth.role() = 'authenticated');
create policy "Authenticated admins have full access to certificates" on public.certificates for all using (auth.role() = 'authenticated');
create policy "Authenticated admins have full access to enquiries" on public.enquiries for all using (auth.role() = 'authenticated');
create policy "Authenticated admins have full access to settings" on public.business_settings for all using (auth.role() = 'authenticated');
