import { createServerSupabaseClient } from '@/lib/supabase/server'
import type { Skill } from './types'

export async function getSkills(): Promise<Skill[]> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .order('order_index', { ascending: true })

  if (error) {
    console.error('Error fetching skills:', error)
    return []
  }
  return data as Skill[]
}
