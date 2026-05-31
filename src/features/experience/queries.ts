import { createServerSupabaseClient } from '@/lib/supabase/server'
import { fallbackExperiences } from '@/lib/fallback-data'
import type { Experience } from './types'

function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  return !!url && !url.includes('your-project')
}

export async function getExperiences(): Promise<Experience[]> {
  if (!isSupabaseConfigured()) {
    return fallbackExperiences
  }

  try {
    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .order('order_index', { ascending: true })

    if (error) {
      console.error('Error fetching experiences:', error)
      return fallbackExperiences
    }
    return (data as Experience[]) || fallbackExperiences
  } catch {
    return fallbackExperiences
  }
}
