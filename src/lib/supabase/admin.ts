import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

// This client uses the service role key and bypasses RLS.
// ONLY use this in server-side code. NEVER expose to the browser.
export function createAdminClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}
