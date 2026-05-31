'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { projectSchema, type ProjectFormData } from '@/features/projects/schemas'
import { updateProject } from '@/features/projects/actions'
import { getProjectById } from '@/features/projects/queries'
import { toast } from 'sonner'

interface EditProjectPageProps {
  params: Promise<{ id: string }>
}

export default function EditProjectPage({ params }: EditProjectPageProps) {
  const router = useRouter()
  const [techInput, setTechInput] = useState('')
  const [techStack, setTechStack] = useState<string[]>([])
  const [projectId, setProjectId] = useState('')

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
  })

  useEffect(() => {
    params.then(async ({ id }) => {
      setProjectId(id)
      const project = await getProjectById(id)
      if (project) {
        setTechStack(project.tech_stack)
        reset({
          title: project.title,
          slug: project.slug,
          description: project.description,
          tech_stack: project.tech_stack,
          github_url: project.github_url || '',
          demo_url: project.demo_url || '',
          image_url: project.image_url || '',
          featured: project.featured,
          published: project.published,
        })
      }
    })
  }, [params, reset])

  function addTech() {
    const trimmed = techInput.trim()
    if (trimmed && !techStack.includes(trimmed)) {
      const updated = [...techStack, trimmed]
      setTechStack(updated)
      setValue('tech_stack', updated)
      setTechInput('')
    }
  }

  function removeTech(tech: string) {
    const updated = techStack.filter((t) => t !== tech)
    setTechStack(updated)
    setValue('tech_stack', updated)
  }

  async function onSubmit(data: ProjectFormData) {
    const result = await updateProject(projectId, data)
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Project updated')
      router.push('/admin/projects')
      router.refresh()
    }
  }

  return (
    <div>
      <Button asChild variant="ghost" size="sm" className="mb-4">
        <Link href="/admin/projects">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Edit Project</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" {...register('title')} className="mt-1.5" />
              {errors.title && <p className="mt-1 text-sm text-destructive">{errors.title.message}</p>}
            </div>

            <div>
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" {...register('slug')} className="mt-1.5" />
              {errors.slug && <p className="mt-1 text-sm text-destructive">{errors.slug.message}</p>}
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" rows={4} {...register('description')} className="mt-1.5" />
              {errors.description && <p className="mt-1 text-sm text-destructive">{errors.description.message}</p>}
            </div>

            <div>
              <Label>Tech Stack</Label>
              <div className="flex gap-2 mt-1.5">
                <Input
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  placeholder="Add technology..."
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
                />
                <Button type="button" variant="outline" onClick={addTech}>
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs cursor-pointer"
                    onClick={() => removeTech(tech)}
                  >
                    {tech} ×
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              <div>
                <Label htmlFor="github_url">GitHub URL</Label>
                <Input id="github_url" {...register('github_url')} className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="demo_url">Demo URL</Label>
                <Input id="demo_url" {...register('demo_url')} className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="image_url">Image URL</Label>
                <Input id="image_url" {...register('image_url')} className="mt-1.5" />
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Switch id="featured" onCheckedChange={(v) => setValue('featured', v)} />
                <Label htmlFor="featured">Featured</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch id="published" onCheckedChange={(v) => setValue('published', v)} />
                <Label htmlFor="published">Published</Label>
              </div>
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
