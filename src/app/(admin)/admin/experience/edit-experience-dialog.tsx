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
import { updateExperience } from '@/features/experience/actions'
import { toast } from 'sonner'
import type { Experience } from '@/features/experience/types'

interface EditExperienceDialogProps {
  experience: Experience
}

export function EditExperienceDialog({ experience }: EditExperienceDialogProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState(experience.title)
  const [organization, setOrganization] = useState(experience.organization || '')
  const [description, setDescription] = useState(experience.description)
  const [techInput, setTechInput] = useState('')
  const [techStack, setTechStack] = useState<string[]>(experience.tech_stack || [])
  const [startDate, setStartDate] = useState(experience.start_date || '')
  const [endDate, setEndDate] = useState(experience.end_date || '')
  const [isCurrent, setIsCurrent] = useState(experience.current)
  const [orderIndex, setOrderIndex] = useState(String(experience.order_index))
  const [isSubmitting, setIsSubmitting] = useState(false)

  function addTech() {
    const trimmed = techInput.trim()
    if (trimmed && !techStack.includes(trimmed)) {
      setTechStack([...techStack, trimmed])
      setTechInput('')
    }
  }

  function removeTech(tech: string) {
    setTechStack(techStack.filter((t) => t !== tech))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim() || !description.trim()) {
      toast.error('Title and description are required')
      return
    }

    setIsSubmitting(true)
    const result = await updateExperience(experience.id, {
      title: title.trim(),
      organization: organization.trim() || undefined,
      description: description.trim(),
      tech_stack: techStack,
      start_date: startDate || undefined,
      end_date: isCurrent ? undefined : endDate || undefined,
      current: isCurrent,
      order_index: parseInt(orderIndex) || 0,
    })

    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Experience updated')
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
          <DialogTitle>Edit Experience</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="edit-exp-title">Title / Role</Label>
            <Input id="edit-exp-title" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1.5" required />
          </div>
          <div>
            <Label htmlFor="edit-exp-org">Organization</Label>
            <Input id="edit-exp-org" value={organization} onChange={(e) => setOrganization(e.target.value)} className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="edit-exp-desc">Description</Label>
            <Textarea id="edit-exp-desc" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="mt-1.5" required />
          </div>
          <div>
            <Label>Tech Stack</Label>
            <div className="flex gap-2 mt-1.5">
              <Input value={techInput} onChange={(e) => setTechInput(e.target.value)} placeholder="Add technology..." onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())} />
              <Button type="button" variant="outline" onClick={addTech}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {techStack.map((tech) => (
                <span key={tech} className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs cursor-pointer" onClick={() => removeTech(tech)}>
                  {tech} ×
                </span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-exp-start">Start Date</Label>
              <Input id="edit-exp-start" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="edit-exp-end">End Date</Label>
              <Input id="edit-exp-end" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} disabled={isCurrent} className="mt-1.5" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch id="edit-exp-current" checked={isCurrent} onCheckedChange={setIsCurrent} />
              <Label htmlFor="edit-exp-current">Current Position</Label>
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="edit-exp-order">Order</Label>
              <Input id="edit-exp-order" type="number" value={orderIndex} onChange={(e) => setOrderIndex(e.target.value)} className="w-20" />
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
