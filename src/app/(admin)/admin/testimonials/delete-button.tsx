'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { deleteTestimonial } from '@/features/testimonials/actions'
import { toast } from 'sonner'

export function DeleteTestimonialButton({ testimonialId }: { testimonialId: string }) {
  const router = useRouter()

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this testimonial?')) return

    const result = await deleteTestimonial(testimonialId)
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Testimonial deleted')
      router.refresh()
    }
  }

  return (
    <Button variant="ghost" size="sm" className="text-destructive" onClick={handleDelete}>
      Delete
    </Button>
  )
}
