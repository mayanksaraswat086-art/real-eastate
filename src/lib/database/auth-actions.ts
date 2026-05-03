'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
  const supabase = await createClient();

  const email = String(formData.get('email') ?? '');
  const password = String(formData.get('password') ?? '');

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  redirect('/admin/dashboard');
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/admin/login');
}

// Special function to setup the admin user if it doesn't exist
// User can call this once to create the account they provided
export async function setupAdmin() {
  const supabase = await createClient();
  
  const { error } = await supabase.auth.signUp({
    email: 'realstate@gmail.com',
    password: '123456789',
    options: {
        data: {
            role: 'admin'
        }
    }
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, message: 'Admin account created! You can now login.' };
}
