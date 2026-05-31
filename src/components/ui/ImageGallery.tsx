'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  ImageIcon,
  Loader2,
  Search,
  Trash2,
  Copy,
  Plus,
  ExternalLink,
} from 'lucide-react'
import { toast } from 'sonner'
import Image from 'next/image'

interface StorageImage {
  name: string
  path: string
  url: string
  size: number
  type: string
  created_at: string
}

interface ImageGalleryProps {
  onInsertToContent?: (markdown: string) => void
  onSelectCover?: (url: string) => void
}

export function ImageGallery({ onInsertToContent, onSelectCover }: ImageGalleryProps) {
  const [images, setImages] = useState<StorageImage[]>([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)

  const fetchImages = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/storage/list?folder=blog')
      const result = await response.json()

      if (!response.ok) {
        toast.error(result.error || 'Failed to load images')
        return
      }

      setImages(result.files || [])
    } catch (error: any) {
      toast.error('Failed to load images')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      fetchImages()
    }
  }, [isOpen, fetchImages])

  const handleDelete = async (image: StorageImage) => {
    if (!confirm(`Delete "${image.name}"? This cannot be undone.`)) return

    setDeleting(image.path)
    try {
      const response = await fetch('/api/storage/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: image.path }),
      })

      const result = await response.json()

      if (!response.ok) {
        toast.error(result.error || 'Delete failed')
        return
      }

      setImages((prev) => prev.filter((img) => img.path !== image.path))
      toast.success('Image deleted')
    } catch (error: any) {
      toast.error('Delete failed')
    } finally {
      setDeleting(null)
    }
  }

  const handleInsert = (image: StorageImage) => {
    const alt = image.name.replace(/\.[^/.]+$/, '')
    const markdown = `![${alt}](${image.url})`
    onInsertToContent?.(markdown)
    toast.success('Image inserted')
  }

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    toast.success('URL copied to clipboard')
  }

  const handleSelectCover = (url: string) => {
    onSelectCover?.(url)
    toast.success('Cover image selected')
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const filteredImages = images.filter(
    (img) =>
      img.name.toLowerCase().includes(search.toLowerCase()) ||
      img.path.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" size="sm">
          <ImageIcon className="mr-2 h-4 w-4" />
          Browse Images
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Image Library</DialogTitle>
        </DialogHeader>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search images..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Images grid */}
        <div className="flex-1 overflow-y-auto -mx-2 px-2">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : filteredImages.length === 0 ? (
            <div className="text-center py-16">
              <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground/50 mb-3" />
              <p className="text-sm text-muted-foreground">
                {images.length === 0
                  ? 'No images uploaded yet. Upload your first image above!'
                  : 'No images match your search.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 py-2">
              {filteredImages.map((image) => (
                <Card
                  key={image.path}
                  className="group relative overflow-hidden hover:border-primary/50 transition-colors"
                >
                  {/* Image */}
                  <div className="relative aspect-square bg-muted">
                    <Image
                      src={image.url}
                      alt={image.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                    />

                    {/* Hover overlay with actions */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                      <Button
                        type="button"
                        size="sm"
                        variant="secondary"
                        onClick={() => handleInsert(image)}
                      >
                        <Plus className="mr-1 h-3.5 w-3.5" />
                        Insert
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="secondary"
                        onClick={() => handleSelectCover(image.url)}
                      >
                        Cover
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="secondary"
                        onClick={() => handleCopyUrl(image.url)}
                      >
                        <Copy className="mr-1 h-3.5 w-3.5" />
                        URL
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        className="text-red-400 hover:text-red-300 hover:bg-red-900/50"
                        disabled={deleting === image.path}
                        onClick={() => handleDelete(image)}
                      >
                        {deleting === image.path ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Trash2 className="mr-1 h-3.5 w-3.5" />
                        )}
                        Delete
                      </Button>
                    </div>
                  </div>

                  {/* Name */}
                  <div className="p-2">
                    <p className="text-xs truncate font-medium">{image.name}</p>
                    <p className="text-[10px] text-muted-foreground">
                      {formatFileSize(image.size)}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {images.length > 0 && (
          <div className="flex items-center justify-between pt-2 border-t text-xs text-muted-foreground">
            <span>
              {filteredImages.length} of {images.length} images
            </span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={fetchImages}
              disabled={loading}
            >
              Refresh
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
