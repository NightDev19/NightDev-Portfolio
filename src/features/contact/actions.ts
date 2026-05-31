'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'
import type { ContactFormData } from './schemas'

export async function submitContactForm(data: ContactFormData) {
  const supabase = createAdminClient()
  const { error } = await supabase.from('contact_messages').insert({
    name: data.name,
    email: data.email,
    subject: data.subject || null,
    message: data.message,
  })

  if (error) {
    return { error: 'Failed to send message. Please try again.' }
  }

  revalidatePath('/admin/messages')
  return { success: true }
}

export async function getContactMessages() {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching messages:', error)
    return []
  }
  return data
}

export async function markMessageRead(id: string) {
  const supabase = createAdminClient()
  const { error } = await supabase
    .from('contact_messages')
    .update({ read: true })
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin/messages')
  return { success: true }
}

export async function deleteMessage(id: string) {
  const supabase = createAdminClient()
  const { error } = await supabase.from('contact_messages').delete().eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin/messages')
  return { success: true }
}
