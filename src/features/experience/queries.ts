import { createServerSupabaseClient } from '@/lib/supabase/server'
import type { Experience } from './types'

export async function getExperiences(): Promise<Experience[]> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('experiences')
    .select('*')
    .order('order_index', { ascending: true })

  if (error) {
    console.error('Error fetching experiences:', error)
    return []
  }
  return data as Experience[]
}
