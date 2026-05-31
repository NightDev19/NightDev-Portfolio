import { createServerSupabaseClient } from '@/lib/supabase/server'
import type { BlogPost } from './types'

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
  return data as BlogPost[]
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
  return data as BlogPost
}

export async function getAllPostsAdmin(): Promise<BlogPost[]> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching all blog posts:', error)
    return []
  }
  return data as BlogPost[]
}

export async function getPostById(id: string): Promise<BlogPost | null> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching post by id:', error)
    return null
  }
  return data as BlogPost
}
