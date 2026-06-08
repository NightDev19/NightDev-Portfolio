'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, ImageIcon, X } from 'lucide-react'
import Link from 'next/link'
import { projectSchema, type ProjectFormData } from '@/features/projects/schemas'
import { createProject } from '@/features/projects/actions'
import { ImageUploader } from '@/components/ui/ImageUploader'
import { ImageGallery } from '@/components/ui/ImageGallery'
import { toast } from 'sonner'

export default function NewProjectPage() {
  const router = useRouter()
  const [techInput, setTechInput] = useState('')
  const [techStack, setTechStack] = useState<string[]>([])
  const [imageUrl, setImageUrl] = useState('')

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: { tech_stack: [], featured: false, published: true, image_url: '' },
  })

  function addTech() {
    const newTechs = techInput
      .split(',')
      .map((tech) => tech.trim())
      .filter(Boolean)

    if (newTechs.length === 0) return

    const existingTechs = new Set(
      techStack.map((tech) => tech.toLowerCase())
    )

    const uniqueNewTechs = newTechs.filter((tech) => {
      const normalizedTech = tech.toLowerCase()

      if (existingTechs.has(normalizedTech)) {
        return false
      }

      existingTechs.add(normalizedTech)
      return true
    })

    if (uniqueNewTechs.length === 0) {
      setTechInput('')
      return
    }

    const updated = [...techStack, ...uniqueNewTechs]

    setTechStack(updated)
    setValue('tech_stack', updated, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
    setTechInput('')
  }

  function removeTech(tech: string) {
    const updated = techStack.filter((t) => t !== tech)
    setTechStack(updated)
    setValue('tech_stack', updated)
  }

  function handleSelectImage(url: string) {
    setImageUrl(url)
    setValue('image_url', url)
  }

  function handleRemoveImage() {
    setImageUrl('')
    setValue('image_url', '')
  }

  function handleUploadComplete(image: { url: string }) {
    setImageUrl(image.url)
    setValue('image_url', image.url)
  }

  async function onSubmit(data: ProjectFormData) {
    const result = await createProject(data)
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Project created')
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
          <CardTitle>New Project</CardTitle>
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
              <Input id="slug" placeholder="my-project" {...register('slug')} className="mt-1.5" />
              {errors.slug && <p className="mt-1 text-sm text-destructive">{errors.slug.message}</p>}
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" rows={4} {...register('description')} className="mt-1.5" />
              {errors.description && <p className="mt-1 text-sm text-destructive">{errors.description.message}</p>}
            </div>

            {/* Project Image */}
            <div>
              <Label>Project Image</Label>
              <div className="mt-1.5 space-y-3">
                {imageUrl ? (
                  <div className="relative rounded-lg overflow-hidden border bg-muted">
                    <div className="relative w-full h-48">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imageUrl}
                        alt="Project"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={handleRemoveImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <div className="p-3 bg-muted/50">
                      <p className="text-xs text-muted-foreground truncate">{imageUrl}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <ImageGallery
                      onSelectCover={handleSelectImage}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Image Upload Section */}
            <div className="rounded-lg border p-4 space-y-3">
              <div className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-muted-foreground" />
                <Label className="text-sm font-medium">Upload Image</Label>
              </div>
              <p className="text-xs text-muted-foreground">
                Upload an image for this project. After uploading, it will be set as the project image automatically.
              </p>
              <ImageUploader
                onUploadComplete={handleUploadComplete}
                folder="projects"
              />
            </div>

            {/* Or paste URL manually */}
            <div>
              <Label htmlFor="image_url">Or paste Image URL manually</Label>
              <Input
                id="image_url"
                placeholder="https://..."
                value={imageUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value)
                  setValue('image_url', e.target.value)
                }}
                className="mt-1.5"
              />
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
              {errors.tech_stack && <p className="mt-1 text-sm text-destructive">{errors.tech_stack.message}</p>}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="github_url">GitHub URL</Label>
                <Input id="github_url" placeholder="https://github.com/..." {...register('github_url')} className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="demo_url">Demo URL</Label>
                <Input id="demo_url" placeholder="https://..." {...register('demo_url')} className="mt-1.5" />
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Switch id="featured" onCheckedChange={(v) => setValue('featured', v)} />
                <Label htmlFor="featured">Featured</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch id="published" defaultChecked onCheckedChange={(v) => setValue('published', v)} />
                <Label htmlFor="published">Published</Label>
              </div>
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Project'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
