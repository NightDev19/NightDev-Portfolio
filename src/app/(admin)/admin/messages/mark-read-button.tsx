'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { markMessageRead } from '@/features/contact/actions'
import { toast } from 'sonner'

export function MarkReadButton({ messageId }: { messageId: string }) {
  const router = useRouter()

  async function handleMarkRead() {
    const result = await markMessageRead(messageId)
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Marked as read')
      router.refresh()
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={handleMarkRead}>
      Mark as Read
    </Button>
  )
}
