-- LuxEstate Supabase Database Schema
-- Run this in the Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)

-- 1. Properties table
CREATE TABLE IF NOT EXISTS properties (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  price INTEGER NOT NULL,
  price_display TEXT NOT NULL,
  location TEXT NOT NULL,
  city TEXT NOT NULL,
  bhk INTEGER NOT NULL DEFAULT 0,
  sqft INTEGER NOT NULL,
  type TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('Buy', 'Rent')),
  image TEXT NOT NULL,
  image_alt TEXT NOT NULL,
  badge TEXT,
  floor TEXT,
  furnishing TEXT,
  age TEXT,
  featured BOOLEAN DEFAULT FALSE,
  description TEXT,
  amenities TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Agents table
CREATE TABLE IF NOT EXISTS agents (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  designation TEXT NOT NULL,
  city TEXT NOT NULL,
  experience TEXT NOT NULL,
  speciality TEXT NOT NULL,
  properties INTEGER NOT NULL DEFAULT 0,
  rating NUMERIC(2,1) NOT NULL DEFAULT 0,
  reviews INTEGER NOT NULL DEFAULT 0,
  photo TEXT NOT NULL,
  photo_alt TEXT NOT NULL,
  phone TEXT NOT NULL,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  category TEXT NOT NULL,
  date TEXT NOT NULL,
  read_time TEXT NOT NULL,
  image TEXT NOT NULL,
  image_alt TEXT NOT NULL,
  content TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  photo TEXT NOT NULL,
  photo_alt TEXT NOT NULL,
  text TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5,
  rotate TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL DEFAULT 'General Enquiry',
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT,
  service_type TEXT NOT NULL CHECK (service_type IN ('buy', 'sell', 'rent', 'agent')),
  preferred_date DATE NOT NULL,
  preferred_time TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Property enquiries table
CREATE TABLE IF NOT EXISTS property_enquiries (
  id SERIAL PRIMARY KEY,
  property_id TEXT NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_enquiries ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Allow public read access
CREATE POLICY "Allow public read properties" ON properties FOR SELECT USING (true);
CREATE POLICY "Allow public read agents" ON agents FOR SELECT USING (true);
CREATE POLICY "Allow public read blog_posts" ON blog_posts FOR SELECT USING (true);
CREATE POLICY "Allow public read testimonials" ON testimonials FOR SELECT USING (true);

-- RLS Policies: Allow public insert for forms (no auth required)
CREATE POLICY "Allow public insert contact_messages" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert appointments" ON appointments FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert property_enquiries" ON property_enquiries FOR INSERT WITH CHECK (true);

-- Disable read on sensitive tables by default (admin only via service role)
CREATE POLICY "Deny public read contact_messages" ON contact_messages FOR SELECT USING (false);
CREATE POLICY "Deny public read appointments" ON appointments FOR SELECT USING (false);
CREATE POLICY "Deny public read property_enquiries" ON property_enquiries FOR SELECT USING (false);

-- Seed data: Properties
INSERT INTO properties (id, title, price, price_display, location, city, bhk, sqft, type, status, image, image_alt, badge, floor, furnishing, age, featured)
VALUES
('prop-001', 'Sea-View Villa, Bandra West', 42000000, '₹4.2 Cr', 'Bandra West, Mumbai', 'Mumbai', 4, 3200, 'Villa', 'Buy', 'https://img.rocket.new/generatedImages/rocket_gen_img_143f2e1bc-1775454607542.png', 'Modern white villa with sea view, infinity pool, bright afternoon light, lush garden', 'Featured', '3rd', 'Semi-Furnished', '2 yrs', true),
('prop-002', 'Luxury 3BHK, Koramangala', 18000000, '₹1.8 Cr', 'Koramangala, Bengaluru', 'Bengaluru', 3, 1850, 'Apartment', 'Buy', 'https://images.unsplash.com/photo-1721614463238-c327d3d42ccf', 'Contemporary apartment living room with large windows, city view, neutral tones, bright natural light', 'New', '12th', 'Fully Furnished', 'New', false),
('prop-003', 'Premium Penthouse, Hinjewadi', 25000000, '₹2.5 Cr', 'Hinjewadi Phase 2, Pune', 'Pune', 4, 2800, 'Penthouse', 'Buy', 'https://img.rocket.new/generatedImages/rocket_gen_img_18f46e769-1772202612659.png', 'Penthouse terrace with city panorama, sunset sky, modern outdoor furniture, warm golden hour', 'Hot', 'Top', 'Semi-Furnished', '1 yr', true),
('prop-004', 'Garden Apartment, Jubilee Hills', 1020000, '₹85,000/mo', 'Jubilee Hills, Hyderabad', 'Hyderabad', 3, 2100, 'Apartment', 'Rent', 'https://images.unsplash.com/photo-1458387938310-98f54c6cbb4a', 'Apartment complex with garden courtyard, manicured green lawn, morning light, residential architecture', NULL, '5th', 'Fully Furnished', '3 yrs', false),
('prop-005', 'Heritage Bungalow, Defence Colony', 75000000, '₹7.5 Cr', 'Defence Colony, Delhi NCR', 'Delhi NCR', 5, 4500, 'Bungalow', 'Buy', 'https://images.unsplash.com/photo-1644570358013-c19c53526ebe', 'Classic colonial bungalow facade, wide verandah, mature trees, driveway, warm evening light', 'Exclusive', 'G+1', 'Unfurnished', '15 yrs', false),
('prop-006', 'Smart Studio, OMR Road', 336000, '₹28,000/mo', 'OMR Road, Chennai', 'Chennai', 1, 650, 'Studio', 'Rent', 'https://img.rocket.new/generatedImages/rocket_gen_img_14f311005-1770575726313.png', 'Compact modern studio apartment, white walls, natural light, minimalist furnishing, open plan layout', NULL, '8th', 'Fully Furnished', 'New', false),
('prop-007', 'Corner 2BHK, Wakad', 9500000, '₹95 L', 'Wakad, Pune', 'Pune', 2, 1050, 'Apartment', 'Buy', 'https://images.unsplash.com/photo-1696650137303-3ed1c08d7412', 'Corner apartment balcony view, city and greenery, morning light, modern residential building', NULL, '7th', 'Semi-Furnished', '4 yrs', false),
('prop-008', 'IT Corridor Office Space', 1500000, '₹1.25 L/mo', 'Whitefield, Bengaluru', 'Bengaluru', 0, 3500, 'Commercial', 'Rent', 'https://img.rocket.new/generatedImages/rocket_gen_img_1d1342fbb-1766936728417.png', 'Modern open-plan office space, floor-to-ceiling windows, city view, neutral decor, bright natural light', 'Commercial', '15th', 'Fully Furnished', 'New', false),
('prop-009', 'Riverside Plot, Mahalaxmi', 30000000, '₹3 Cr', 'Mahalaxmi, Mumbai', 'Mumbai', 0, 5000, 'Plot', 'Buy', 'https://images.unsplash.com/photo-1650521610747-ea336b56560c', 'Green open land plot near river, clear blue sky, lush surroundings, boundary wall, Mumbai landscape', 'Investment', 'N/A', 'N/A', 'N/A', false)
ON CONFLICT (id) DO NOTHING;

-- Seed data: Agents
INSERT INTO agents (id, name, designation, city, experience, speciality, properties, rating, reviews, photo, photo_alt, phone, bio)
VALUES
('agent-001', 'Priya Mehta', 'Senior Property Consultant', 'Mumbai', '9 years', 'Luxury Residences', 38, 4.9, 124, 'https://img.rocket.new/generatedImages/rocket_gen_img_15f4e23f6-1763300607163.png', 'Professional Indian woman in formal attire, warm smile, office background, bright natural light', '+91 98765 43210', 'Specializing in luxury sea-view apartments and villas across South Mumbai. Priya has helped over 120 families find their dream waterfront home.'),
('agent-002', 'Arjun Sharma', 'Investment Property Specialist', 'Bengaluru', '11 years', 'Commercial & Investment', 52, 4.8, 98, 'https://img.rocket.new/generatedImages/rocket_gen_img_19f0fd5cb-1763295525028.png', 'Professional Indian man in business suit, confident expression, modern office, soft natural light', '+91 98765 43211', 'Bengaluru''s top commercial property advisor. Arjun has facilitated over ₹200 Cr in investment deals across Whitefield, ORR, and Electronic City.'),
('agent-003', 'Kavitha Nair', 'Residential Leasing Expert', 'Hyderabad', '7 years', 'Rental & Leasing', 29, 4.9, 87, 'https://img.rocket.new/generatedImages/rocket_gen_img_11a2def93-1763297528938.png', 'Professional South Indian woman, warm professional smile, bright studio backdrop, business attire', '+91 98765 43212', 'Hyderabad''s go-to rental expert. Kavitha ensures every tenant finds a home that fits their lifestyle and budget, from Jubilee Hills to Gachibowli.'),
('agent-004', 'Rahul Verma', 'NRI Investment Advisor', 'Delhi NCR', '14 years', 'NRI & Premium Sales', 67, 4.9, 156, 'https://img.rocket.new/generatedImages/rocket_gen_img_12b9c2bb3-1763293370864.png', 'Indian man in formal shirt, professional headshot, office background, confident expression', '+91 98765 43213', 'Specializing in NRI investments and premium properties across Delhi NCR. Rahul has closed over 150 deals remotely for clients across 12 countries.'),
('agent-005', 'Meera Patel', 'First-Time Buyer Specialist', 'Pune', '6 years', 'Affordable & Mid-Segment', 43, 4.7, 72, 'https://img.rocket.new/generatedImages/rocket_gen_img_124ba0bf5-1763301531300.png', 'Indian woman in professional attire, warm expression, bright natural light, neutral background', '+91 98765 43214', 'Pune''s trusted advisor for first-time home buyers. Meera guides clients through every step — from loan eligibility to possession — with patience and expertise.'),
('agent-006', 'Suresh Kumar', 'Plot & Land Specialist', 'Chennai', '10 years', 'Plots & Development Land', 31, 4.8, 64, 'https://img.rocket.new/generatedImages/rocket_gen_img_15a0ea664-1763296536479.png', 'South Indian man, professional expression, light background, business casual attire', '+91 98765 43215', 'Chennai''s leading land and plot specialist. Suresh has helped investors identify high-growth corridors along OMR, GST Road, and ECR for maximum ROI.')
ON CONFLICT (id) DO NOTHING;

-- Seed data: Blog posts
INSERT INTO blog_posts (slug, title, excerpt, category, date, read_time, image, image_alt)
VALUES
('top-localities-mumbai-2026', '7 Top Localities to Invest in Mumbai in 2026', 'From Bandra West to Thane — discover which micro-markets are delivering the highest capital appreciation this year.', 'Market News', '28 Apr 2026', '5 min read', 'https://images.unsplash.com/photo-1649478188598-6664f9c75474', 'Mumbai skyline at dusk, city lights, Marine Drive, dark blue sky, financial district silhouette'),
('first-home-buyer-guide-india', 'Complete Guide for First-Time Home Buyers in India', 'Everything you need to know — from home loan eligibility and stamp duty to RERA registration and possession.', 'Buying Tips', '22 Apr 2026', '8 min read', 'https://img.rocket.new/generatedImages/rocket_gen_img_10005e370-1774489824727.png', 'Couple reviewing documents at a bright office desk, natural light, warm tones, professional setting'),
('rental-yield-bengaluru-2026', 'Rental Yields in Bengaluru: Which Areas Give Best Returns?', 'Whitefield, Sarjapur, and Electronic City are seeing 4–6% rental yields. Here''s the detailed breakdown.', 'Investment', '15 Apr 2026', '6 min read', 'https://img.rocket.new/generatedImages/rocket_gen_img_1a403a6bd-1766739647843.png', 'Bengaluru tech park area, modern glass buildings, green boulevards, bright day, commercial district'),
('rera-guide-2026', 'RERA 2026: What Buyers & Sellers Must Know', 'Updated RERA guidelines, new compliance requirements, and how they protect your property investment in 2026.', 'Legal', '10 Apr 2026', '7 min read', 'https://images.unsplash.com/photo-1589829545856-5a8b7c3c3e34', 'Legal documents and gavel on desk, professional setting, warm light, Indian real estate context'),
('home-loan-interest-rates-april-2026', 'Home Loan Interest Rates in April 2026: Best Banks Compared', 'SBI, HDFC, ICICI, and Axis — we compare the latest home loan rates, processing fees, and EMI options side by side.', 'Finance', '5 Apr 2026', '5 min read', 'https://img.rocket.new/generatedImages/rocket_gen_img_1d1342fbb-1766936728417.png', 'Bank building with modern architecture, financial district, bright daylight, Indian metro city'),
('hyderabad-real-estate-boom', 'Why Hyderabad is 2026''s Hottest Real Estate Market', 'IT corridor expansion, affordable luxury, and 8% annual appreciation — here''s why investors are flocking to Hyderabad.', 'Market News', '1 Apr 2026', '6 min read', 'https://images.unsplash.com/photo-1650521610747-ea336b56560c', 'Hyderabad cityscape with modern towers, Hussain Sagar lake, evening golden light, tech district')
ON CONFLICT (slug) DO NOTHING;

-- Seed data: Testimonials
INSERT INTO testimonials (id, name, role, photo, photo_alt, text, rating, rotate)
VALUES
(1, 'Rohit Kapoor', 'Home Buyer, Mumbai', 'https://img.rocket.new/generatedImages/rocket_gen_img_19f0fd5cb-1763295525028.png', 'Indian professional man in casual shirt, friendly smile, blurred office background', 'LuxEstate made buying our first home incredibly smooth. Priya guided us through every step — from shortlisting to registration. We closed in just 18 days!', 5, '-rotate-2'),
(2, 'Sneha Iyer', 'Property Investor, Bengaluru', 'https://img.rocket.new/generatedImages/rocket_gen_img_124ba0bf5-1763301531300.png', 'Indian woman in professional attire, warm expression, bright natural light, neutral background', 'The verified listings gave me complete confidence. I invested in two commercial properties through LuxEstate and the ROI has been exceptional. Highly recommend Arjun.', 5, 'rotate-1'),
(3, 'Deepak Menon', 'Tenant, Hyderabad', 'https://img.rocket.new/generatedImages/rocket_gen_img_15a0ea664-1763296536479.png', 'South Indian man, professional expression, light background, business casual attire', 'Found a beautiful 3BHK in Jubilee Hills within a week. The virtual tours saved so much time — I could shortlist 10 properties before visiting just 2. Perfect experience.', 5, '-rotate-1'),
(4, 'Ananya Desai', 'Home Seller, Pune', 'https://img.rocket.new/generatedImages/rocket_gen_img_15f4e23f6-1763300607163.png', 'Young Indian woman, confident smile, minimal backdrop, professional casual look', 'Listed my flat on LuxEstate and received 12 enquiries in the first week. Sold at my asking price in 3 weeks. The process was transparent and stress-free.', 5, 'rotate-2'),
(5, 'Vikram Singh', 'NRI Buyer, Delhi NCR', 'https://img.rocket.new/generatedImages/rocket_gen_img_12b9c2bb3-1763293370864.png', 'Indian man in formal shirt, professional headshot, office background, confident expression', 'Bought a heritage bungalow in Defence Colony remotely from Dubai. LuxEstate handled everything — verification, documentation, and even coordination with the bank. Outstanding service.', 5, '-rotate-2')
ON CONFLICT (id) DO NOTHING;
