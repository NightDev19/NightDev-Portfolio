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
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { blogPostSchema, type BlogPostFormData } from '@/features/blog/schemas'
import { createBlogPost } from '@/features/blog/actions'
import { toast } from 'sonner'

export default function NewBlogPostPage() {
  const router = useRouter()
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BlogPostFormData>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: { tags: [], published: false },
  })

  function addTag() {
    const trimmed = tagInput.trim()
    if (trimmed && !tags.includes(trimmed)) {
      const updated = [...tags, trimmed]
      setTags(updated)
      setValue('tags', updated)
      setTagInput('')
    }
  }

  function removeTag(tag: string) {
    const updated = tags.filter((t) => t !== tag)
    setTags(updated)
    setValue('tags', updated)
  }

  async function onSubmit(data: BlogPostFormData) {
    const result = await createBlogPost(data)
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Post created')
      router.push('/admin/blog')
      router.refresh()
    }
  }

  return (
    <div>
      <Button asChild variant="ghost" size="sm" className="mb-4">
        <Link href="/admin/blog">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>New Blog Post</CardTitle>
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
              <Input id="slug" placeholder="my-blog-post" {...register('slug')} className="mt-1.5" />
              {errors.slug && <p className="mt-1 text-sm text-destructive">{errors.slug.message}</p>}
            </div>

            <div>
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea id="excerpt" rows={2} {...register('excerpt')} className="mt-1.5" />
            </div>

            <div>
              <Label htmlFor="content">Content (Markdown)</Label>
              <Textarea id="content" rows={15} {...register('content')} className="mt-1.5 font-mono text-sm" />
              {errors.content && <p className="mt-1 text-sm text-destructive">{errors.content.message}</p>}
            </div>

            <div>
              <Label>Tags</Label>
              <div className="flex gap-2 mt-1.5">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Add tag..."
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <Button type="button" variant="outline" onClick={addTag}>
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs cursor-pointer"
                    onClick={() => removeTag(tag)}
                  >
                    {tag} ×
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Switch id="published" onCheckedChange={(v) => setValue('published', v)} />
              <Label htmlFor="published">Published</Label>
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Post'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
