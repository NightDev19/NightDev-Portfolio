import { z } from 'zod'

export const blogPostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase with hyphens'),
  excerpt: z.string().optional(),
  content: z.string().min(1, 'Content is required'),
  cover_image: z.string().optional(),
  tags: z.array(z.string()).optional(),
  published: z.boolean().optional(),
})

export type BlogPostFormData = z.infer<typeof blogPostSchema>
