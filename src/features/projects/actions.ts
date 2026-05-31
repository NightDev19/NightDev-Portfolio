'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'
import type { ProjectFormData } from './schemas'

export async function createProject(data: ProjectFormData) {
  const supabase = createAdminClient()
  const { error } = await supabase.from('projects').insert({
    title: data.title,
    slug: data.slug,
    description: data.description,
    tech_stack: data.tech_stack,
    github_url: data.github_url || null,
    demo_url: data.demo_url || null,
    image_url: data.image_url || null,
    featured: data.featured ?? false,
    published: data.published ?? true,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/projects')
  revalidatePath('/')
  return { success: true }
}

export async function updateProject(id: string, data: Partial<ProjectFormData>) {
  const supabase = createAdminClient()
  const { error } = await supabase
    .from('projects')
    .update({
      ...data,
      github_url: data.github_url || null,
      demo_url: data.demo_url || null,
      image_url: data.image_url || null,
    })
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/projects')
  revalidatePath(`/projects/${data.slug}`)
  revalidatePath('/')
  revalidatePath('/admin/projects')
  return { success: true }
}

export async function deleteProject(id: string) {
  const supabase = createAdminClient()
  const { error } = await supabase.from('projects').delete().eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/projects')
  revalidatePath('/')
  revalidatePath('/admin/projects')
  return { success: true }
}
