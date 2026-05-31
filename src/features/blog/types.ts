export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  cover_image: string | null
  tags: string[] | null
  published: boolean
  created_at: string
  updated_at: string
}
