import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testInsert() {
  const { data, error } = await supabase.from('agents').insert([
    {
      name: 'Test Agent',
      designation: 'Senior Broker',
      city: 'Mumbai',
      experience: '5 Years',
      speciality: 'Luxury Apartments',
      properties: 12,
      rating: 4.8,
      reviews: 45,
      photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
      photo_alt: 'Test Agent',
      phone: '+91 98765 43210'
    }
  ]);
  console.log('Error:', error);
  console.log('Data:', data);
}

testInsert();
