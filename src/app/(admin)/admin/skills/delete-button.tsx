'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { deleteSkill } from '@/features/skills/actions'
import { toast } from 'sonner'

export function DeleteSkillButton({ skillId }: { skillId: string }) {
  const router = useRouter()

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this skill?')) return

    const result = await deleteSkill(skillId)
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Skill deleted')
      router.refresh()
    }
  }

  return (
    <Button variant="ghost" size="sm" className="text-destructive" onClick={handleDelete}>
      Delete
    </Button>
  )
}
