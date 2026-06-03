'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Pencil } from 'lucide-react'
import { updateResumeSection } from '@/features/resume/actions'
import { toast } from 'sonner'
import type { ResumeSection } from '@/features/resume/types'

const SECTION_TYPES = [
  { value: 'personal_info', label: 'Personal Info' },
  { value: 'experience', label: 'Experience' },
  { value: 'education', label: 'Education' },
  { value: 'awards', label: 'Awards' },
  { value: 'skills', label: 'Skills' },
]

interface EditResumeSectionDialogProps {
  section: ResumeSection
}

export function EditResumeSectionDialog({ section }: EditResumeSectionDialogProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [sectionType, setSectionType] = useState(section.section_type)
  const [title, setTitle] = useState(section.title || '')
  const [subtitle, setSubtitle] = useState(section.subtitle || '')
  const [description, setDescription] = useState(section.description || '')
  const [metadataJson, setMetadataJson] = useState(JSON.stringify(section.metadata, null, 2))
  const [orderIndex, setOrderIndex] = useState(String(section.order_index))
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    let metadata = {}
    try {
      metadata = JSON.parse(metadataJson)
    } catch {
      toast.error('Invalid JSON in metadata field')
      return
    }

    setIsSubmitting(true)
    const result = await updateResumeSection(section.id, {
      section_type: sectionType as 'personal_info' | 'experience' | 'education' | 'awards' | 'skills',
      title: title || null,
      subtitle: subtitle || null,
      description: description || null,
      metadata,
      order_index: parseInt(orderIndex) || 0,
    })

    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Resume section updated')
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
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Resume Section</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Section Type</Label>
              <Select value={sectionType} onValueChange={setSectionType}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SECTION_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit-resume-order">Order</Label>
              <Input
                id="edit-resume-order"
                type="number"
                value={orderIndex}
                onChange={(e) => setOrderIndex(e.target.value)}
                className="mt-1.5"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-resume-title">Title</Label>
              <Input
                id="edit-resume-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="edit-resume-subtitle">Subtitle</Label>
              <Input
                id="edit-resume-subtitle"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="mt-1.5"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="edit-resume-description">Description</Label>
            <Textarea
              id="edit-resume-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1.5 min-h-[80px]"
            />
          </div>

          <div>
            <Label htmlFor="edit-resume-metadata">Metadata (JSON)</Label>
            <Textarea
              id="edit-resume-metadata"
              value={metadataJson}
              onChange={(e) => setMetadataJson(e.target.value)}
              className="mt-1.5 min-h-[120px] font-mono text-xs"
            />
            <p className="text-xs text-muted-foreground mt-1">
              JSON object for flexible data like dates, locations, tech stacks, etc.
            </p>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
