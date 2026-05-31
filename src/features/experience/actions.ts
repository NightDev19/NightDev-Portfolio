'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'
import type { ExperienceFormData } from './schemas'

export async function createExperience(data: ExperienceFormData) {
  const supabase = createAdminClient()
  const { error } = await supabase.from('experiences').insert({
    title: data.title,
    organization: data.organization || null,
    description: data.description,
    tech_stack: data.tech_stack || [],
    start_date: data.start_date || null,
    end_date: data.end_date || null,
    current: data.current ?? false,
    order_index: data.order_index ?? 0,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/')
  revalidatePath('/admin/experience')
  return { success: true }
}

export async function updateExperience(id: string, data: Partial<ExperienceFormData>) {
  const supabase = createAdminClient()
  const { error } = await supabase
    .from('experiences')
    .update(data)
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/')
  revalidatePath('/admin/experience')
  return { success: true }
}

export async function deleteExperience(id: string) {
  const supabase = createAdminClient()
  const { error } = await supabase.from('experiences').delete().eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/')
  revalidatePath('/admin/experience')
  return { success: true }
}
