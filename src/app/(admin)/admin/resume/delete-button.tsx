'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { deleteResumeSection } from '@/features/resume/actions'
import { toast } from 'sonner'

interface DeleteResumeSectionButtonProps {
  sectionId: string
  sectionTitle: string
}

export function DeleteResumeSectionButton({ sectionId, sectionTitle }: DeleteResumeSectionButtonProps) {
  const router = useRouter()

  async function handleDelete() {
    if (!confirm(`Are you sure you want to delete "${sectionTitle}"?`)) return

    const result = await deleteResumeSection(sectionId)
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Resume section deleted')
      router.refresh()
    }
  }

  return (
    <Button variant="ghost" size="sm" className="text-destructive" onClick={handleDelete}>
      Delete
    </Button>
  )
}
