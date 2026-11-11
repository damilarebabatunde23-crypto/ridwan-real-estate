-- RIDWANULLAHI CERTIFIED AGENT - Complete Database Schema for Supabase
-- Copy and paste this entire script into your Supabase SQL Editor and click "RUN"

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
  video_url text,
  status text not null check (status in ('AVAILABLE', 'FEW ROOMS LEFT', 'OCCUPIED', 'SOLD')),
  is_featured boolean default false,
  is_sample_listing boolean default false,
  hostel_details jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Migration safety: ensure video_url column exists if table was previously created
alter table public.properties add column if not exists video_url text;

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

-- 3. CLIENT ENQUIRIES & INSPECTION BOOKINGS TABLE
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
  phone text default '+2349161116718',
  phone_display text default '09161116718',
  phone_secondary text default '+2347082256257',
  phone_secondary_display text default '07082256257',
  email text default 'Ridwanyunnus@gmail.com',
  address text default 'Eleko, Ilorin, Kwara State, Nigeria',
  whatsapp_group_link text default 'https://chat.whatsapp.com/FiGliyINdjiLcTFpBYGGzV?mode=ac_t',
  google_business_profile text default 'https://share.google/sjVg80f40cSexfRub',
  linkedin_profile text default 'https://www.linkedin.com/in/ridwanullahi-certified-61a689303',
  facebook_profile text default 'https://www.facebook.com/profile.php?id=100075809320428',
  locations text[] default array['Ilorin', 'Oyun', 'Yakuba', 'Amoyo', 'Gaa Akanbi', 'Ganmo', 'Eleko', 'Oke Ose', 'Poly Gate'],
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Ensure default settings row exists
insert into public.business_settings (id, full_name, professional_title, business_name, slogan, tagline, phone, phone_display, phone_secondary, phone_secondary_display, email, address, whatsapp_group_link, google_business_profile, linkedin_profile, facebook_profile, locations)
values (
  1,
  'BALOGUN RIDWAN BABATUNDE',
  'Real Estate Agent',
  'RIDWANULLAHI CERTIFIED AGENT',
  'Real Estate. Real People. Real Results.',
  'Your Dream Home Is Our Priority.',
  '+2349161116718',
  '09161116718',
  '+2347082256257',
  '07082256257',
  'Ridwanyunnus@gmail.com',
  'Eleko, Ilorin, Kwara State, Nigeria',
  'https://chat.whatsapp.com/FiGliyINdjiLcTFpBYGGzV?mode=ac_t',
  'https://share.google/sjVg80f40cSexfRub',
  'https://www.linkedin.com/in/ridwanullahi-certified-61a689303',
  'https://www.facebook.com/profile.php?id=100075809320428',
  array['Ilorin', 'Oyun', 'Yakuba', 'Amoyo', 'Gaa Akanbi', 'Ganmo', 'Eleko', 'Oke Ose', 'Poly Gate']
)
on conflict (id) do nothing;

-- 5. PERMISSIONS & ACCESS POLICIES
-- Disable RLS to allow the website and admin dashboard to read and write directly via the Anon key
alter table public.properties disable row level security;
alter table public.certificates disable row level security;
alter table public.enquiries disable row level security;
alter table public.business_settings disable row level security;

-- Also create permissive policies in case RLS is manually re-enabled in the Supabase UI
alter table public.properties enable row level security;
alter table public.certificates enable row level security;
alter table public.enquiries enable row level security;
alter table public.business_settings enable row level security;

drop policy if exists "Allow public select properties" on public.properties;
drop policy if exists "Allow public all properties" on public.properties;
create policy "Allow public all properties" on public.properties for all using (true) with check (true);

drop policy if exists "Allow public all certificates" on public.certificates;
create policy "Allow public all certificates" on public.certificates for all using (true) with check (true);

drop policy if exists "Allow public all enquiries" on public.enquiries;
create policy "Allow public all enquiries" on public.enquiries for all using (true) with check (true);

drop policy if exists "Allow public all settings" on public.business_settings;
create policy "Allow public all settings" on public.business_settings for all using (true) with check (true);

-- 6. ENABLE REALTIME BROADCASTING
-- Allows visitors to see new properties and updates live without refreshing
do $$
begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime') then
    alter publication supabase_realtime add table public.properties;
    alter publication supabase_realtime add table public.certificates;
    alter publication supabase_realtime add table public.enquiries;
    alter publication supabase_realtime add table public.business_settings;
  end if;
exception when others then
  -- publication table might already be added, ignore duplicate errors
end $$;
