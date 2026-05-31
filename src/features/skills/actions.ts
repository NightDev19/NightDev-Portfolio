'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'
import type { SkillFormData } from './schemas'

export async function createSkill(data: SkillFormData) {
  const supabase = createAdminClient()
  const { error } = await supabase.from('skills').insert({
    name: data.name,
    category: data.category,
    level: data.level || null,
    icon: data.icon || null,
    order_index: data.order_index ?? 0,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/')
  revalidatePath('/about')
  revalidatePath('/admin/skills')
  return { success: true }
}

export async function updateSkill(id: string, data: Partial<SkillFormData>) {
  const supabase = createAdminClient()
  const { error } = await supabase
    .from('skills')
    .update(data)
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/')
  revalidatePath('/about')
  revalidatePath('/admin/skills')
  return { success: true }
}

export async function deleteSkill(id: string) {
  const supabase = createAdminClient()
  const { error } = await supabase.from('skills').delete().eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/')
  revalidatePath('/about')
  revalidatePath('/admin/skills')
  return { success: true }
}
