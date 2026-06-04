import { getCurrentUserSafe } from '@/lib/supabase/server'

/**
 * Verify that the current request is from an authenticated user.
 * Use this in API route handlers to protect admin endpoints.
 * Returns the user object if authenticated, or null if not.
 */
export async function requireAuth() {
  return getCurrentUserSafe()
}

/**
 * Check if Supabase is configured (has required env vars).
 * Useful for gracefully handling missing credentials.
 */
export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  return !!url && !!key && !url.includes('your-project')
}
