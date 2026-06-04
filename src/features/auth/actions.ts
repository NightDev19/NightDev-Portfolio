'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'

export async function loginWithEmail(email: string, password: string) {
  // Validate credentials server-side
  const supabase = createAdminClient()
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin')
  return { success: true }
}

export async function logout() {
  const supabase = createAdminClient()
  await supabase.auth.signOut()

  revalidatePath('/admin')
  revalidatePath('/')
  return { success: true }
}
