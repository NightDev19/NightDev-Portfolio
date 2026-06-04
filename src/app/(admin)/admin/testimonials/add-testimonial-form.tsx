'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Plus } from 'lucide-react'
import { createTestimonial } from '@/features/testimonials/actions'
import { toast } from 'sonner'

export function AddTestimonialForm() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [company, setCompany] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [content, setContent] = useState('')
  const [rating, setRating] = useState('5')
  const [featured, setFeatured] = useState(false)
  const [published, setPublished] = useState(true)
  const [orderIndex, setOrderIndex] = useState('0')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !content.trim()) {
      toast.error('Name and content are required')
      return
    }

    setIsSubmitting(true)
    const result = await createTestimonial({
      name: name.trim(),
      role: role.trim() || undefined,
      company: company.trim() || undefined,
      avatar_url: avatarUrl.trim() || undefined,
      content: content.trim(),
      rating: parseInt(rating) || undefined,
      featured,
      published,
      order_index: parseInt(orderIndex) || 0,
    })

    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Testimonial added')
      setIsOpen(false)
      resetForm()
      router.refresh()
    }
    setIsSubmitting(false)
  }

  function resetForm() {
    setName('')
    setRole('')
    setCompany('')
    setAvatarUrl('')
    setContent('')
    setRating('5')
    setFeatured(false)
    setPublished(true)
    setOrderIndex('0')
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Testimonial
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Testimonial</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="test-name">Name</Label>
            <Input id="test-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" className="mt-1.5" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="test-role">Role</Label>
              <Input id="test-role" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Senior Developer" className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="test-company">Company</Label>
              <Input id="test-company" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Acme Inc." className="mt-1.5" />
            </div>
          </div>
          <div>
            <Label htmlFor="test-avatar">Avatar URL</Label>
            <Input id="test-avatar" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} placeholder="https://example.com/avatar.jpg" className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="test-content">Testimonial</Label>
            <Textarea id="test-content" value={content} onChange={(e) => setContent(e.target.value)} rows={4} placeholder="What they said about you..." className="mt-1.5" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="test-rating">Rating (1-5)</Label>
              <Input id="test-rating" type="number" min={1} max={5} value={rating} onChange={(e) => setRating(e.target.value)} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="test-order">Order</Label>
              <Input id="test-order" type="number" value={orderIndex} onChange={(e) => setOrderIndex(e.target.value)} className="mt-1.5" />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Switch id="test-featured" checked={featured} onCheckedChange={setFeatured} />
              <Label htmlFor="test-featured">Featured</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="test-published" checked={published} onCheckedChange={setPublished} />
              <Label htmlFor="test-published">Published</Label>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Adding...' : 'Add Testimonial'}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
