import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  email: z.string().email('Invalid email address'),
  subject: z.string().max(200, 'Subject too long').optional(),
  message: z.string().min(1, 'Message is required').max(2000, 'Message too long'),
})

export type ContactFormData = z.infer<typeof contactSchema>
