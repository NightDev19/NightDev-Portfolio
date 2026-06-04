import { createServerSupabaseClient } from '@/lib/supabase/server'
import { fallbackTestimonials } from '@/lib/fallback-data'
import type { Testimonial } from './types'

function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  return !!url && !!key && !url.includes('your-project')
}

export async function getPublishedTestimonials(): Promise<Testimonial[]> {
  if (!isSupabaseConfigured()) {
    return fallbackTestimonials.filter((t) => t.published)
  }

  try {
    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('published', true)
      .order('order_index', { ascending: true })

    if (error) {
      console.error('Error fetching testimonials:', error)
      return fallbackTestimonials.filter((t) => t.published)
    }
    return (data as Testimonial[]) || fallbackTestimonials.filter((t) => t.published)
  } catch {
    return fallbackTestimonials.filter((t) => t.published)
  }
}

export async function getAllTestimonialsAdmin(): Promise<Testimonial[]> {
  if (!isSupabaseConfigured()) {
    return fallbackTestimonials
  }

  try {
    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('order_index', { ascending: true })

    if (error) {
      console.error('Error fetching testimonials (admin):', error)
      return fallbackTestimonials
    }
    return (data as Testimonial[]) || fallbackTestimonials
  } catch {
    return fallbackTestimonials
  }
}

export async function getTestimonialById(id: string): Promise<Testimonial | null> {
  if (!isSupabaseConfigured()) {
    return fallbackTestimonials.find((t) => t.id === id) || null
  }

  try {
    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching testimonial:', error)
      return null
    }
    return data as Testimonial
  } catch {
    return null
  }
}
