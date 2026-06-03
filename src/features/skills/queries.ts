import { createServerSupabaseClient } from '@/lib/supabase/server'
import { fallbackSkills } from '@/lib/fallback-data'
import type { Skill } from './types'

function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  return !!url && !!key && !url.includes('your-project')
}

export async function getSkills(): Promise<Skill[]> {
  if (!isSupabaseConfigured()) {
    return fallbackSkills
  }

  try {
    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('order_index', { ascending: true })

    if (error) {
      console.error('Error fetching skills:', error)
      return fallbackSkills
    }
    return (data as Skill[]) || fallbackSkills
  } catch {
    return fallbackSkills
  }
}
