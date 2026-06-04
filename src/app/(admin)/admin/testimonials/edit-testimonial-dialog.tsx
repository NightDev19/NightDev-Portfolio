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
import { Pencil } from 'lucide-react'
import { updateTestimonial } from '@/features/testimonials/actions'
import { toast } from 'sonner'
import type { Testimonial } from '@/features/testimonials/types'

interface EditTestimonialDialogProps {
  testimonial: Testimonial
}

export function EditTestimonialDialog({ testimonial }: EditTestimonialDialogProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState(testimonial.name)
  const [role, setRole] = useState(testimonial.role || '')
  const [company, setCompany] = useState(testimonial.company || '')
  const [avatarUrl, setAvatarUrl] = useState(testimonial.avatar_url || '')
  const [content, setContent] = useState(testimonial.content)
  const [rating, setRating] = useState(String(testimonial.rating || 5))
  const [featured, setFeatured] = useState(testimonial.featured)
  const [published, setPublished] = useState(testimonial.published)
  const [orderIndex, setOrderIndex] = useState(String(testimonial.order_index))
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !content.trim()) {
      toast.error('Name and content are required')
      return
    }

    setIsSubmitting(true)
    const result = await updateTestimonial(testimonial.id, {
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
      toast.success('Testimonial updated')
      setIsOpen(false)
      router.refresh()
    }
    setIsSubmitting(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Testimonial</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="edit-test-name">Name</Label>
            <Input id="edit-test-name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-test-role">Role</Label>
              <Input id="edit-test-role" value={role} onChange={(e) => setRole(e.target.value)} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="edit-test-company">Company</Label>
              <Input id="edit-test-company" value={company} onChange={(e) => setCompany(e.target.value)} className="mt-1.5" />
            </div>
          </div>
          <div>
            <Label htmlFor="edit-test-avatar">Avatar URL</Label>
            <Input id="edit-test-avatar" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="edit-test-content">Testimonial</Label>
            <Textarea id="edit-test-content" value={content} onChange={(e) => setContent(e.target.value)} rows={4} className="mt-1.5" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-test-rating">Rating (1-5)</Label>
              <Input id="edit-test-rating" type="number" min={1} max={5} value={rating} onChange={(e) => setRating(e.target.value)} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="edit-test-order">Order</Label>
              <Input id="edit-test-order" type="number" value={orderIndex} onChange={(e) => setOrderIndex(e.target.value)} className="mt-1.5" />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Switch id="edit-test-featured" checked={featured} onCheckedChange={setFeatured} />
              <Label htmlFor="edit-test-featured">Featured</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="edit-test-published" checked={published} onCheckedChange={setPublished} />
              <Label htmlFor="edit-test-published">Published</Label>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Save Changes'}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
