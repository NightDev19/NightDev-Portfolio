import { z } from 'zod'

export const resumeSectionSchema = z.object({
  section_type: z.enum(['personal_info', 'experience', 'education', 'awards', 'skills']),
  title: z.string().optional().nullable(),
  subtitle: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  metadata: z.record(z.unknown()).optional().default({}),
  order_index: z.number().optional().default(0),
})

export type ResumeSectionFormData = z.infer<typeof resumeSectionSchema>
