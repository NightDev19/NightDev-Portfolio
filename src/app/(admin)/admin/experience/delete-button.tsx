'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { deleteExperience } from '@/features/experience/actions'
import { toast } from 'sonner'

export function DeleteExperienceButton({ experienceId }: { experienceId: string }) {
  const router = useRouter()

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this experience entry?')) return

    const result = await deleteExperience(experienceId)
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Experience deleted')
      router.refresh()
    }
  }

  return (
    <Button variant="ghost" size="sm" className="text-destructive" onClick={handleDelete}>
      Delete
    </Button>
  )
}
