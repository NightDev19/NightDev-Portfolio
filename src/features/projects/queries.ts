import { createServerSupabaseClient } from '@/lib/supabase/server'
import type { Project } from './types'

export async function getPublishedProjects(): Promise<Project[]> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching projects:', error)
    return []
  }
  return data as Project[]
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('published', true)
    .eq('featured', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching featured projects:', error)
    return []
  }
  return data as Project[]
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (error) {
    console.error('Error fetching project:', error)
    return null
  }
  return data as Project
}

export async function getAllProjectsAdmin(): Promise<Project[]> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching all projects:', error)
    return []
  }
  return data as Project
}

export async function getProjectById(id: string): Promise<Project | null> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching project by id:', error)
    return null
  }
  return data as Project
}
