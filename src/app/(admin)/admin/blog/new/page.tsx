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
import { blogPostSchema, type BlogPostFormData } from '@/features/blog/schemas'
import { createBlogPost } from '@/features/blog/actions'
import { ImageUploader } from '@/components/ui/ImageUploader'
import { ImageGallery } from '@/components/ui/ImageGallery'
import { toast } from 'sonner'

export default function NewBlogPostPage() {
  const router = useRouter()
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [coverImage, setCoverImage] = useState<string>('')

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BlogPostFormData>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: { tags: [], published: false, cover_image: '' },
  })

  function addTag() {
    const newTags = tagInput
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    if (newTags.length === 0) return;

    const existingTags = new Set(tags.map((tag) => tag.toLowerCase()));

    const uniqueNewTags = newTags.filter((tag) => {
      const normalizedTag = tag.toLowerCase();

      if (existingTags.has(normalizedTag)) {
        return false;
      }

      existingTags.add(normalizedTag);
      return true;
    });

    if (uniqueNewTags.length === 0) {
      setTagInput("");
      return;
    }

    const updatedTags = [...tags, ...uniqueNewTags];

    setTags(updatedTags);
    setValue("tags", updatedTags, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    setTagInput("");
  }

  function removeTag(tag: string) {
    const updated = tags.filter((t) => t !== tag)
    setTags(updated)
    setValue('tags', updated)
  }

  function handleInsertToContent(markdown: string) {
    // Get the current content from the textarea and append
    const textarea = document.getElementById('content') as HTMLTextAreaElement
    if (textarea) {
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const currentContent = textarea.value
      const newContent =
        currentContent.substring(0, start) +
        '\n' +
        markdown +
        '\n' +
        currentContent.substring(end)
      setValue('content', newContent, { shouldValidate: true })
    } else {
      const currentVal = document.querySelector<HTMLInputElement>('#content')?.value || ''
      setValue('content', currentVal + '\n' + markdown + '\n', { shouldValidate: true })
    }
    toast.success('Image inserted into content')
  }

  function handleSelectCover(url: string) {
    setCoverImage(url)
    setValue('cover_image', url)
  }

  function handleRemoveCover() {
    setCoverImage('')
    setValue('cover_image', '')
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

            {/* Cover Image */}
            <div>
              <Label>Cover Image</Label>
              <div className="mt-1.5 space-y-3">
                {coverImage ? (
                  <div className="relative rounded-lg overflow-hidden border bg-muted">
                    <div className="relative w-full h-48">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={coverImage}
                        alt="Cover"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={handleRemoveCover}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <div className="p-3 bg-muted/50">
                      <p className="text-xs text-muted-foreground truncate">{coverImage}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <ImageGallery
                      onSelectCover={handleSelectCover}
                      onInsertToContent={handleInsertToContent}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Content with image tools */}
            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="content">Content (Markdown)</Label>
                <ImageGallery onInsertToContent={handleInsertToContent} />
              </div>
              <Textarea
                id="content"
                rows={15}
                {...register('content')}
                className="mt-1.5 font-mono text-sm"
              />
              {errors.content && <p className="mt-1 text-sm text-destructive">{errors.content.message}</p>}
            </div>

            {/* Image Upload Section */}
            <div className="rounded-lg border p-4 space-y-3">
              <div className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-muted-foreground" />
                <Label className="text-sm font-medium">Upload Images</Label>
              </div>
              <p className="text-xs text-muted-foreground">
                Upload images to use in your blog post. After uploading, click &quot;Insert&quot; to add the image to your content, or &quot;Copy URL&quot; to use it elsewhere.
              </p>
              <ImageUploader
                onInsertToContent={handleInsertToContent}
                folder="blog"
              />
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
