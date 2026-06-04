import { getCurrentUserSafe } from '@/lib/supabase/server'

export async function getCurrentUser() {
  return getCurrentUserSafe()
}
