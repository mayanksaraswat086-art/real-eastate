'use server';

import { createClient } from '@/lib/supabase/server';
import type { ContactMessage, Appointment, PropertyEnquiry, Agent, Property } from './types';

export async function submitContactMessage(formData: FormData) {
  const supabase = await createClient();

  const payload: Omit<ContactMessage, 'id' | 'created_at'> = {
    name: String(formData.get('name') ?? ''),
    email: String(formData.get('email') ?? ''),
    phone: String(formData.get('phone') ?? '') || null,
    subject: String(formData.get('subject') ?? 'General Enquiry'),
    message: String(formData.get('message') ?? ''),
  };

  const { error } = await supabase.from('contact_messages').insert(payload);

  if (error) {
    console.error('submitContactMessage error:', error.message);
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function submitAppointment(formData: FormData) {
  const supabase = await createClient();

  const payload: Omit<Appointment, 'id' | 'created_at'> = {
    name: String(formData.get('name') ?? ''),
    email: String(formData.get('email') ?? ''),
    phone: String(formData.get('phone') ?? ''),
    address: String(formData.get('address') ?? '') || null,
    service_type: String(formData.get('service_type') ?? 'buy') as Appointment['service_type'],
    preferred_date: String(formData.get('preferred_date') ?? ''),
    preferred_time: String(formData.get('preferred_time') ?? ''),
    description: String(formData.get('description') ?? '') || null,
  };

  const { error } = await supabase.from('appointments').insert(payload);

  if (error) {
    console.error('submitAppointment error:', error.message);
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function submitPropertyEnquiry(formData: FormData) {
  const supabase = await createClient();

  const payload: Omit<PropertyEnquiry, 'id' | 'created_at'> = {
    property_id: String(formData.get('property_id') ?? ''),
    name: String(formData.get('name') ?? ''),
    email: String(formData.get('email') ?? ''),
    phone: String(formData.get('phone') ?? ''),
    message: String(formData.get('message') ?? ''),
  };

  const { error } = await supabase.from('property_enquiries').insert(payload);

  if (error) {
    console.error('submitPropertyEnquiry error:', error.message);
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function addAgent(formData: FormData) {
  const supabase = await createClient();

  const payload: Omit<Agent, 'id' | 'created_at'> = {
    name: String(formData.get('name') ?? ''),
    designation: String(formData.get('designation') ?? ''),
    city: String(formData.get('city') ?? ''),
    experience: String(formData.get('experience') ?? ''),
    speciality: String(formData.get('speciality') ?? ''),
    properties: Number(formData.get('properties') ?? 0),
    rating: Number(formData.get('rating') ?? 5.0),
    reviews: Number(formData.get('reviews') ?? 0),
    photo: String(formData.get('photo') ?? ''),
    photo_alt: String(formData.get('photo_alt') ?? ''),
    phone: String(formData.get('phone') ?? ''),
    whatsapp: String(formData.get('whatsapp') ?? '') || null,
    bio: String(formData.get('bio') ?? '') || null,
  };

  const id = `agent-${Math.random().toString(36).substr(2, 9)}`;
  const { error } = await supabase.from('agents').insert({ ...payload, id });

  if (error) {
    console.error('addAgent error:', error.message);
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function addProperty(formData: FormData) {
  const supabase = await createClient();

  const payload: Omit<Property, 'id' | 'created_at'> = {
    title: String(formData.get('title') ?? ''),
    price: Number(formData.get('price') ?? 0),
    price_display: String(formData.get('price_display') ?? ''),
    location: String(formData.get('location') ?? ''),
    city: String(formData.get('city') ?? ''),
    bhk: Number(formData.get('bhk') ?? 0),
    sqft: Number(formData.get('sqft') ?? 0),
    type: String(formData.get('type') ?? ''),
    status: String(formData.get('status') ?? 'Buy') as Property['status'],
    image: String(formData.get('image') ?? ''),
    image_alt: String(formData.get('image_alt') ?? ''),
    badge: String(formData.get('badge') ?? '') || null,
    floor: String(formData.get('floor') ?? '') || null,
    furnishing: String(formData.get('furnishing') ?? '') || null,
    age: String(formData.get('age') ?? '') || null,
    featured: formData.get('featured') === 'on',
    description: String(formData.get('description') ?? '') || null,
    amenities: String(formData.get('amenities') ?? '').split(',').map(s => s.trim()).filter(Boolean),
  };

  const id = `prop-${Math.random().toString(36).substr(2, 9)}`;
  const { error } = await supabase.from('properties').insert({ ...payload, id });

  if (error) {
    console.error('addProperty error:', error.message);
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function deleteProperty(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('properties').delete().eq('id', id);

  if (error) {
    console.error('deleteProperty error:', error.message);
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function deleteAgent(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('agents').delete().eq('id', id);

  if (error) {
    console.error('deleteAgent error:', error.message);
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function updateProperty(id: string, formData: FormData) {
  const supabase = await createClient();

  const payload: Partial<Property> = {
    title: String(formData.get('title') ?? ''),
    price: Number(formData.get('price') ?? 0),
    price_display: String(formData.get('price_display') ?? ''),
    location: String(formData.get('location') ?? ''),
    city: String(formData.get('city') ?? ''),
    bhk: Number(formData.get('bhk') ?? 0),
    sqft: Number(formData.get('sqft') ?? 0),
    type: String(formData.get('type') ?? ''),
    status: String(formData.get('status') ?? 'Buy') as Property['status'],
    image: String(formData.get('image') ?? ''),
    floor: String(formData.get('floor') ?? '') || null,
    furnishing: String(formData.get('furnishing') ?? '') || null,
    age: String(formData.get('age') ?? '') || null,
    featured: formData.get('featured') === 'on',
    description: String(formData.get('description') ?? '') || null,
    amenities: String(formData.get('amenities') ?? '').split(',').map(s => s.trim()).filter(Boolean),
  };

  const { error } = await supabase.from('properties').update(payload).eq('id', id);

  if (error) {
    console.error('updateProperty error:', error.message);
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function updateAgent(id: string, formData: FormData) {
  const supabase = await createClient();

  const payload: Partial<Agent> = {
    name: String(formData.get('name') ?? ''),
    designation: String(formData.get('designation') ?? ''),
    city: String(formData.get('city') ?? ''),
    experience: String(formData.get('experience') ?? ''),
    speciality: String(formData.get('speciality') ?? ''),
    phone: String(formData.get('phone') ?? ''),
    whatsapp: String(formData.get('whatsapp') ?? '') || null,
    photo: String(formData.get('photo') ?? ''),
    properties: Number(formData.get('properties') ?? 0),
    bio: String(formData.get('bio') ?? '') || null,
  };

  const { error } = await supabase.from('agents').update(payload).eq('id', id);

  if (error) {
    console.error('updateAgent error:', error.message);
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function deleteAppointment(id: number | string) {
  const supabase = await createClient();
  const { error } = await supabase.from('appointments').delete().eq('id', id);
  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function deleteContactMessage(id: number | string) {
  const supabase = await createClient();
  const { error } = await supabase.from('contact_messages').delete().eq('id', id);
  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function deletePropertyEnquiry(id: number | string) {
  const supabase = await createClient();
  const { error } = await supabase.from('property_enquiries').delete().eq('id', id);
  if (error) return { success: false, error: error.message };
  return { success: true };
}
