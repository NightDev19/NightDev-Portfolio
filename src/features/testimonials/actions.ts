'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'
import type { TestimonialFormData } from './schemas'

export async function createTestimonial(data: TestimonialFormData) {
  const supabase = createAdminClient()
  const { error } = await supabase.from('testimonials').insert({
    name: data.name,
    role: data.role || null,
    company: data.company || null,
    avatar_url: data.avatar_url || null,
    content: data.content,
    rating: data.rating || null,
    featured: data.featured ?? false,
    published: data.published ?? true,
    order_index: data.order_index ?? 0,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/')
  revalidatePath('/admin/testimonials')
  return { success: true }
}

export async function updateTestimonial(id: string, data: Partial<TestimonialFormData>) {
  const supabase = createAdminClient()
  const { error } = await supabase
    .from('testimonials')
    .update(data)
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/')
  revalidatePath('/admin/testimonials')
  return { success: true }
}

export async function deleteTestimonial(id: string) {
  const supabase = createAdminClient()
  const { error } = await supabase.from('testimonials').delete().eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/')
  revalidatePath('/admin/testimonials')
  return { success: true }
}
