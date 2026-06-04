'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'
import type { ResumeSectionFormData } from './schemas'

export async function createResumeSection(data: ResumeSectionFormData) {
  const supabase = createAdminClient()
  const { error } = await supabase.from('resume_sections').insert({
    section_type: data.section_type,
    title: data.title || null,
    subtitle: data.subtitle || null,
    description: data.description || null,
    metadata: data.metadata || {},
    order_index: data.order_index ?? 0,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/')
  revalidatePath('/resume')
  revalidatePath('/admin/resume')
  return { success: true }
}

export async function updateResumeSection(id: string, data: Partial<ResumeSectionFormData>) {
  const supabase = createAdminClient()
  const { error } = await supabase
    .from('resume_sections')
    .update(data)
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/')
  revalidatePath('/resume')
  revalidatePath('/admin/resume')
  return { success: true }
}

export async function deleteResumeSection(id: string) {
  const supabase = createAdminClient()
  const { error } = await supabase.from('resume_sections').delete().eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/')
  revalidatePath('/resume')
  revalidatePath('/admin/resume')
  return { success: true }
}
