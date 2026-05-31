'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { deleteBlogPost } from '@/features/blog/actions'
import { toast } from 'sonner'

export function DeletePostButton({ postId }: { postId: string }) {
  const router = useRouter()

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this post?')) return

    const result = await deleteBlogPost(postId)
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Post deleted')
      router.refresh()
    }
  }

  return (
    <Button variant="ghost" size="sm" className="text-destructive" onClick={handleDelete}>
      Delete
    </Button>
  )
}
