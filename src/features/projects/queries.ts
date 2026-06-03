import { createServerSupabaseClient } from '@/lib/supabase/server'
import { fallbackProjects } from '@/lib/fallback-data'
import type { Project } from './types'

function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  return !!url && !!key && !url.includes('your-project')
}

export async function getPublishedProjects(): Promise<Project[]> {
  if (!isSupabaseConfigured()) {
    return fallbackProjects.filter((p) => p.published)
  }

  try {
    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching projects:', error)
      return fallbackProjects.filter((p) => p.published)
    }
    return (data as Project[]) || fallbackProjects.filter((p) => p.published)
  } catch {
    return fallbackProjects.filter((p) => p.published)
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  if (!isSupabaseConfigured()) {
    return fallbackProjects.filter((p) => p.featured && p.published)
  }

  try {
    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('published', true)
      .eq('featured', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching featured projects:', error)
      return fallbackProjects.filter((p) => p.featured && p.published)
    }
    return (data as Project[]) || fallbackProjects.filter((p) => p.featured && p.published)
  } catch {
    return fallbackProjects.filter((p) => p.featured && p.published)
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (!isSupabaseConfigured()) {
    return fallbackProjects.find((p) => p.slug === slug && p.published) || null
  }

  try {
    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()

    if (error) {
      console.error('Error fetching project:', error)
      return fallbackProjects.find((p) => p.slug === slug && p.published) || null
    }
    return (data as Project) || null
  } catch {
    return fallbackProjects.find((p) => p.slug === slug && p.published) || null
  }
}

export async function getAllProjectsAdmin(): Promise<Project[]> {
  if (!isSupabaseConfigured()) {
    return fallbackProjects
  }

  try {
    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching all projects:', error)
      return fallbackProjects
    }
    return (data as Project[]) || fallbackProjects
  } catch {
    return fallbackProjects
  }
}

export async function getProjectById(id: string): Promise<Project | null> {
  if (!isSupabaseConfigured()) {
    return fallbackProjects.find((p) => p.id === id) || null
  }

  try {
    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching project by id:', error)
      return fallbackProjects.find((p) => p.id === id) || null
    }
    return (data as Project) || null
  } catch {
    return fallbackProjects.find((p) => p.id === id) || null
  }
}
