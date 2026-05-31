export interface Project {
  id: string
  title: string
  slug: string
  description: string
  tech_stack: string[]
  github_url: string | null
  demo_url: string | null
  image_url: string | null
  featured: boolean
  published: boolean
  created_at: string
  updated_at: string
}
