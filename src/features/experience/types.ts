export interface Experience {
  id: string
  title: string
  organization: string | null
  description: string
  tech_stack: string[] | null
  start_date: string | null
  end_date: string | null
  current: boolean
  order_index: number
  created_at: string
}
