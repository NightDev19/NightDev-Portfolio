import { z } from 'zod'

export const testimonialSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  role: z.string().optional(),
  company: z.string().optional(),
  avatar_url: z.string().url('Invalid URL').optional().or(z.literal('')),
  content: z.string().min(1, 'Testimonial content is required'),
  rating: z.coerce.number().min(1).max(5).optional(),
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
  order_index: z.number().optional(),
})

export type TestimonialFormData = z.infer<typeof testimonialSchema>
