import { z } from 'zod'

export const skillSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  category: z.string().min(1, 'Category is required'),
  level: z.string().optional(),
  icon: z.string().optional(),
  order_index: z.number().optional(),
})

export type SkillFormData = z.infer<typeof skillSchema>
