import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

// This client uses the service role key and bypasses RLS.
// ONLY use this in server-side code. NEVER expose to the browser.
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local')
  }

  return createClient<Database>(
    supabaseUrl,
    serviceRoleKey
  )
}
