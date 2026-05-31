'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { deleteProject } from '@/features/projects/actions'
import { toast } from 'sonner'

export function DeleteProjectButton({ projectId }: { projectId: string }) {
  const router = useRouter()

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this project?')) return

    const result = await deleteProject(projectId)
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Project deleted')
      router.refresh()
    }
  }

  return (
    <Button variant="ghost" size="sm" className="text-destructive" onClick={handleDelete}>
      Delete
    </Button>
  )
}
