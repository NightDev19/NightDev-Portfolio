import { createServerSupabaseClient } from '@/lib/supabase/server'
import { fallbackResumeSections } from '@/lib/fallback-data'
import type { ResumeSection } from './types'

function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  return !!url && !!key && !url.includes('your-project')
}

export async function getResumeSections(): Promise<ResumeSection[]> {
  if (!isSupabaseConfigured()) {
    return fallbackResumeSections
  }

  try {
    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase
      .from('resume_sections')
      .select('*')
      .order('order_index', { ascending: true })

    if (error) {
      console.error('Error fetching resume sections:', error)
      return fallbackResumeSections
    }
    return (data as ResumeSection[]) || fallbackResumeSections
  } catch {
    return fallbackResumeSections
  }
}

export async function getResumeSectionById(id: string): Promise<ResumeSection | null> {
  if (!isSupabaseConfigured()) {
    return fallbackResumeSections.find((s) => s.id === id) || null
  }

  try {
    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase
      .from('resume_sections')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching resume section:', error)
      return null
    }
    return data as ResumeSection
  } catch {
    return null
  }
}

export async function getAllResumeSectionsAdmin(): Promise<ResumeSection[]> {
  return getResumeSections()
}
