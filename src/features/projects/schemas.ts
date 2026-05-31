import { z } from 'zod'

export const projectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase with hyphens'),
  description: z.string().min(1, 'Description is required'),
  tech_stack: z
    .array(z.string())
    .min(1, 'At least one technology is required'),
  github_url: z.string().url('Invalid URL').or(z.literal('')).optional(),
  demo_url: z.string().url('Invalid URL').or(z.literal('')).optional(),
  image_url: z.string().url('Invalid URL').or(z.literal('')).optional(),
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
})

export type ProjectFormData = z.infer<typeof projectSchema>
