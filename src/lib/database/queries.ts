'use server';

import { createClient } from '@/lib/supabase/server';
import type { Property, Agent, BlogPost, Testimonial, Appointment, ContactMessage, PropertyEnquiry } from './types';

export async function getProperties(): Promise<Property[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('getProperties error:', error.message);
    return [];
  }
  return (data as Property[]) ?? [];
}

export async function getPropertyCount(): Promise<number> {
  const supabase = await createClient();
  const { count, error } = await supabase.from('properties').select('*', { count: 'exact', head: true });

  if (error) {
    console.error('getPropertyCount error:', error.message);
    return 0;
  }
  return count ?? 0;
}


export async function getFeaturedProperties(): Promise<Property[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(3);

  if (error) {
    console.error('getFeaturedProperties error:', error.message);
    return [];
  }
  return (data as Property[]) ?? [];
}

export async function getPropertyById(id: string): Promise<Property | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from('properties').select('*').eq('id', id).single();

  if (error) {
    console.error('getPropertyById error:', error.message);
    return null;
  }
  return (data as Property) ?? null;
}

export async function getSimilarProperties(
  city: string,
  excludeId: string,
  limit = 3
): Promise<Property[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('city', city)
    .neq('id', excludeId)
    .limit(limit);

  if (error) {
    console.error('getSimilarProperties error:', error.message);
    return [];
  }
  return (data as Property[]) ?? [];
}

export async function getAgents(): Promise<Agent[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('agents')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('getAgents error:', error.message);
    return [];
  }
  return (data as Agent[]) ?? [];
}

export async function getAgentById(id: string): Promise<Agent | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from('agents').select('*').eq('id', id).single();

  if (error) {
    console.error('getAgentById error:', error.message);
    return null;
  }
  return (data as Agent) ?? null;
}


export async function getBlogPosts(): Promise<BlogPost[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('getBlogPosts error:', error.message);
    return [];
  }
  return (data as BlogPost[]) ?? [];
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    console.error('getTestimonials error:', error.message);
    return [];
  }
  return (data as Testimonial[]) ?? [];
}

export async function getAppointments(): Promise<Appointment[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('getAppointments error:', error.message);
    return [];
  }
  return (data as Appointment[]) ?? [];
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('getContactMessages error:', error.message);
    return [];
  }
  return (data as ContactMessage[]) ?? [];
}

export async function getPropertyEnquiries(): Promise<PropertyEnquiry[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('property_enquiries')
    .select('*, properties(title)')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('getPropertyEnquiries error:', error.message);
    return [];
  }
  return (data as (PropertyEnquiry & { properties: { title: string } })[]) ?? [];
}

