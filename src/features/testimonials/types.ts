export interface Testimonial {
  id: string
  name: string
  role: string | null
  company: string | null
  avatar_url: string | null
  content: string
  rating: number | null
  featured: boolean
  published: boolean
  order_index: number
  created_at: string
  updated_at: string
}
