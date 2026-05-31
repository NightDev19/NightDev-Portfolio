'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'
import type { BlogPostFormData } from './schemas'

export async function createBlogPost(data: BlogPostFormData) {
  const supabase = createAdminClient()
  const { error } = await supabase.from('blog_posts').insert({
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt || null,
    content: data.content,
    tags: data.tags || [],
    published: data.published ?? false,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/blog')
  revalidatePath('/')
  return { success: true }
}

export async function updateBlogPost(id: string, data: Partial<BlogPostFormData>) {
  const supabase = createAdminClient()
  const { error } = await supabase
    .from('blog_posts')
    .update({
      ...data,
      excerpt: data.excerpt || null,
      tags: data.tags || [],
    })
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/blog')
  revalidatePath(`/blog/${data.slug}`)
  revalidatePath('/')
  revalidatePath('/admin/blog')
  return { success: true }
}

export async function deleteBlogPost(id: string) {
  const supabase = createAdminClient()
  const { error } = await supabase.from('blog_posts').delete().eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/blog')
  revalidatePath('/')
  revalidatePath('/admin/blog')
  return { success: true }
}
