'use server'

import { createClient } from '@/lib/supabase/client'
import { revalidatePath } from 'next/cache'

export async function loginWithEmail(email: string, password: string) {
  // This is used from client-side, but we keep it as a server action for potential use
  revalidatePath('/admin')
  return { success: true }
}

export async function logout() {
  revalidatePath('/admin')
  return { success: true }
}
