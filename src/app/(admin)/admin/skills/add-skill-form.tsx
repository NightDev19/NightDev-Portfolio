'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import { createSkill } from '@/features/skills/actions'
import { toast } from 'sonner'

const SKILL_CATEGORIES = [
  'Frontend',
  'Backend',
  'Desktop Development',
  'Databases',
  'DevOps & Tools',
]

const SKILL_LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Expert']

interface AddSkillFormProps {
  categories: string[]
}

export function AddSkillForm({ categories }: AddSkillFormProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [level, setLevel] = useState('Intermediate')
  const [orderIndex, setOrderIndex] = useState('0')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !category) {
      toast.error('Name and category are required')
      return
    }

    setIsSubmitting(true)
    const result = await createSkill({
      name: name.trim(),
      category,
      level,
      order_index: parseInt(orderIndex) || 0,
    })

    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Skill added')
      setName('')
      setCategory('')
      setLevel('Intermediate')
      setOrderIndex('0')
      setIsOpen(false)
      router.refresh()
    }
    setIsSubmitting(false)
  }

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)}>
        <Plus className="mr-2 h-4 w-4" />
        Add Skill
      </Button>
    )
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Add New Skill</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-4">
          <div className="flex-1 min-w-[180px]">
            <Label htmlFor="skill-name">Name</Label>
            <Input
              id="skill-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="React, Python, etc."
              className="mt-1.5"
              required
            />
          </div>
          <div className="w-[200px]">
            <Label>Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {SKILL_CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-[160px]">
            <Label>Level</Label>
            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger className="mt-1.5">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SKILL_LEVELS.map((lvl) => (
                  <SelectItem key={lvl} value={lvl}>
                    {lvl}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-[80px]">
            <Label htmlFor="skill-order">Order</Label>
            <Input
              id="skill-order"
              type="number"
              value={orderIndex}
              onChange={(e) => setOrderIndex(e.target.value)}
              className="mt-1.5"
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Adding...' : 'Add'}
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
