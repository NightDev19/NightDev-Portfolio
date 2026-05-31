'use client'

import { useState, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Upload, X, Loader2, ImagePlus, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'
import Image from 'next/image'

interface UploadedImage {
  path: string
  url: string
  name: string
  size: number
  type: string
}

interface ImageUploaderProps {
  onUploadComplete?: (image: UploadedImage) => void
  onInsertToContent?: (markdown: string) => void
  folder?: string
}

export function ImageUploader({
  onUploadComplete,
  onInsertToContent,
  folder = 'blog',
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const uploadFile = useCallback(
    async (file: File) => {
      // Validate type
      const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
        'image/svg+xml',
      ]
      if (!allowedTypes.includes(file.type)) {
        toast.error(`Invalid file type: ${file.type}`)
        return
      }

      // Validate size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File too large. Maximum size is 5MB.')
        return
      }

      setIsUploading(true)
      setUploadProgress(0)

      try {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('folder', folder)

        // Simulate progress for UX
        const progressInterval = setInterval(() => {
          setUploadProgress((prev) => Math.min(prev + 10, 90))
        }, 200)

        const response = await fetch('/api/storage/upload', {
          method: 'POST',
          body: formData,
        })

        clearInterval(progressInterval)
        setUploadProgress(100)

        const result = await response.json()

        if (!response.ok) {
          toast.error(result.error || 'Upload failed')
          return
        }

        const image: UploadedImage = {
          path: result.path,
          url: result.url,
          name: result.name,
          size: result.size,
          type: result.type,
        }

        setUploadedImages((prev) => [image, ...prev])
        onUploadComplete?.(image)
        toast.success(`Uploaded: ${file.name}`)
      } catch (error: any) {
        toast.error('Upload failed: ' + (error.message || 'Unknown error'))
      } finally {
        setIsUploading(false)
        setUploadProgress(0)
      }
    },
    [folder, onUploadComplete]
  )

  const handleFiles = useCallback(
    (files: FileList | File[]) => {
      Array.from(files).forEach((file) => uploadFile(file))
    },
    [uploadFile]
  )

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files)
      // Reset input so the same file can be re-selected
      e.target.value = ''
    }
  }

  const handleInsertMarkdown = (image: UploadedImage) => {
    const alt = image.name.replace(/\.[^/.]+$/, '') // Remove extension for alt text
    const markdown = `![${alt}](${image.url})`
    onInsertToContent?.(markdown)
    toast.success('Image inserted into content')
  }

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    toast.success('URL copied to clipboard')
  }

  const handleRemoveLocal = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`
          relative cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-all
          ${
            isDragging
              ? 'border-primary bg-primary/5 scale-[1.01]'
              : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-accent/50'
          }
          ${isUploading ? 'pointer-events-none opacity-70' : ''}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp,image/svg+xml"
          multiple
          onChange={handleFileInput}
          className="hidden"
        />

        {isUploading ? (
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-10 w-10 text-primary animate-spin" />
            <p className="text-sm text-muted-foreground">Uploading...</p>
            <div className="w-full max-w-xs h-2 rounded-full bg-secondary overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="rounded-full bg-primary/10 p-3">
              <ImagePlus className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">
                Drop images here or click to browse
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                JPEG, PNG, GIF, WebP, SVG — Max 5MB
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Uploaded images list */}
      {uploadedImages.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            Recently uploaded
          </p>
          <div className="space-y-2">
            {uploadedImages.map((image, index) => (
              <Card
                key={`${image.path}-${index}`}
                className="flex items-center gap-3 p-3"
              >
                {/* Thumbnail */}
                <div className="relative h-14 w-14 shrink-0 rounded-md overflow-hidden bg-muted">
                  <Image
                    src={image.url}
                    alt={image.name}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{image.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(image.size)} — {image.type.split('/')[1].toUpperCase()}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    <span className="text-xs text-green-600">Uploaded</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleInsertMarkdown(image)
                    }}
                    className="text-xs"
                  >
                    Insert
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleCopyUrl(image.url)
                    }}
                    className="text-xs"
                  >
                    Copy URL
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRemoveLocal(index)
                    }}
                    className="text-destructive"
                  >
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
