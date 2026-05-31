import { z } from 'zod'

export const experienceSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  organization: z.string().optional(),
  description: z.string().min(1, 'Description is required'),
  tech_stack: z.array(z.string()).optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  current: z.boolean().optional(),
  order_index: z.number().optional(),
})

export type ExperienceFormData = z.infer<typeof experienceSchema>
