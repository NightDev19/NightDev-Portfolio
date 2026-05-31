import { createServerSupabaseClient } from '@/lib/supabase/server'
import { fallbackBlogPosts } from '@/lib/fallback-data'
import type { BlogPost } from './types'

function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  return !!url && !url.includes('your-project')
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  if (!isSupabaseConfigured()) {
    return fallbackBlogPosts.filter((p) => p.published)
  }

  try {
    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching blog posts:', error)
      return fallbackBlogPosts.filter((p) => p.published)
    }
    return (data as BlogPost[]) || fallbackBlogPosts.filter((p) => p.published)
  } catch {
    return fallbackBlogPosts.filter((p) => p.published)
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!isSupabaseConfigured()) {
    return fallbackBlogPosts.find((p) => p.slug === slug && p.published) || null
  }

  try {
    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()

    if (error) {
      console.error('Error fetching blog post:', error)
      return fallbackBlogPosts.find((p) => p.slug === slug && p.published) || null
    }
    return (data as BlogPost) || null
  } catch {
    return fallbackBlogPosts.find((p) => p.slug === slug && p.published) || null
  }
}

export async function getAllPostsAdmin(): Promise<BlogPost[]> {
  if (!isSupabaseConfigured()) {
    return fallbackBlogPosts
  }

  try {
    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching all blog posts:', error)
      return fallbackBlogPosts
    }
    return (data as BlogPost[]) || fallbackBlogPosts
  } catch {
    return fallbackBlogPosts
  }
}

export async function getPostById(id: string): Promise<BlogPost | null> {
  if (!isSupabaseConfigured()) {
    return fallbackBlogPosts.find((p) => p.id === id) || null
  }

  try {
    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching post by id:', error)
      return fallbackBlogPosts.find((p) => p.id === id) || null
    }
    return (data as BlogPost) || null
  } catch {
    return fallbackBlogPosts.find((p) => p.id === id) || null
  }
}
