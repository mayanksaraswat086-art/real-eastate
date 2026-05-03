export interface Property {
  id: string;
  title: string;
  price: number;
  price_display: string;
  location: string;
  city: string;
  bhk: number;
  sqft: number;
  type: string;
  status: 'Buy' | 'Rent';
  image: string;
  image_alt: string;
  badge?: string | null;
  floor?: string | null;
  furnishing?: string | null;
  age?: string | null;
  featured?: boolean | null;
  description?: string | null;
  amenities?: string[] | null;
  created_at?: string;
}

export interface Agent {
  id: string;
  name: string;
  designation: string;
  city: string;
  experience: string;
  speciality: string;
  properties: number;
  rating: number;
  reviews: number;
  photo: string;
  photo_alt: string;
  phone: string;
  whatsapp?: string | null;
  bio?: string | null;
  created_at?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  read_time: string;
  image: string;
  image_alt: string;
  content?: string | null;
  created_at?: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  photo: string;
  photo_alt: string;
  text: string;
  rating: number;
  rotate?: string | null;
  created_at?: string;
}

export interface ContactMessage {
  id?: number;
  name: string;
  email: string;
  phone?: string | null;
  subject: string;
  message: string;
  created_at?: string;
}

export interface Appointment {
  id?: number;
  name: string;
  email: string;
  phone: string;
  address?: string | null;
  service_type: 'buy' | 'sell' | 'rent' | 'agent';
  preferred_date: string;
  preferred_time: string;
  description?: string | null;
  created_at?: string;
}

export interface PropertyEnquiry {
  id?: number;
  property_id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at?: string;
}
