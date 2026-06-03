'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import { createResumeSection } from '@/features/resume/actions'
import { toast } from 'sonner'

const SECTION_TYPES = [
  { value: 'personal_info', label: 'Personal Info' },
  { value: 'experience', label: 'Experience' },
  { value: 'education', label: 'Education' },
  { value: 'awards', label: 'Awards' },
  { value: 'skills', label: 'Skills' },
]

export function AddResumeSectionForm() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [sectionType, setSectionType] = useState('')
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [description, setDescription] = useState('')
  const [metadataJson, setMetadataJson] = useState('{}')
  const [orderIndex, setOrderIndex] = useState('0')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!sectionType) {
      toast.error('Section type is required')
      return
    }

    let metadata = {}
    try {
      metadata = JSON.parse(metadataJson)
    } catch {
      toast.error('Invalid JSON in metadata field')
      return
    }

    setIsSubmitting(true)
    const result = await createResumeSection({
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
      toast.success('Resume section added')
      setTitle('')
      setSubtitle('')
      setDescription('')
      setMetadataJson('{}')
      setOrderIndex('0')
      setSectionType('')
      setIsOpen(false)
      router.refresh()
    }
    setIsSubmitting(false)
  }

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)}>
        <Plus className="mr-2 h-4 w-4" />
        Add Resume Section
      </Button>
    )
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Add New Resume Section</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Section Type</Label>
              <Select value={sectionType} onValueChange={setSectionType}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select type" />
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
              <Label htmlFor="resume-order">Order</Label>
              <Input
                id="resume-order"
                type="number"
                value={orderIndex}
                onChange={(e) => setOrderIndex(e.target.value)}
                className="mt-1.5"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="resume-title">Title</Label>
              <Input
                id="resume-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Company name, school name, etc."
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="resume-subtitle">Subtitle</Label>
              <Input
                id="resume-subtitle"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Role, degree, etc."
                className="mt-1.5"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="resume-description">Description</Label>
            <Textarea
              id="resume-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Summary, job description, etc."
              className="mt-1.5 min-h-[80px]"
            />
          </div>

          <div>
            <Label htmlFor="resume-metadata">Metadata (JSON)</Label>
            <Textarea
              id="resume-metadata"
              value={metadataJson}
              onChange={(e) => setMetadataJson(e.target.value)}
              placeholder='{"key": "value"}'
              className="mt-1.5 min-h-[80px] font-mono text-xs"
            />
            <p className="text-xs text-muted-foreground mt-1">
              JSON object for flexible data like dates, locations, tech stacks, etc.
            </p>
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Adding...' : 'Add Section'}
            </Button>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
