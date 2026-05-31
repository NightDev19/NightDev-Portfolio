'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { deleteMessage } from '@/features/contact/actions'
import { toast } from 'sonner'

export function DeleteMessageButton({ messageId }: { messageId: string }) {
  const router = useRouter()

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this message?')) return

    const result = await deleteMessage(messageId)
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Message deleted')
      router.refresh()
    }
  }

  return (
    <Button variant="ghost" size="sm" className="text-destructive" onClick={handleDelete}>
      Delete
    </Button>
  )
}
