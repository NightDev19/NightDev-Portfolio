import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, Tag, Clock, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MotionWrapper } from '@/components/sections/MotionWrapper'
import { getPostBySlug, getPublishedPosts } from '@/features/blog/queries'
import { formatDate } from '@/lib/utils'
import { BlogMarkdown } from '@/components/ui/BlogMarkdown'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  const posts = await getPublishedPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: 'Post Not Found' }

  return {
    title: post.title,
    description: post.excerpt || post.content.substring(0, 160),
    openGraph: post.cover_image ? { images: [{ url: post.cover_image }] } : undefined,
  }
}

function getReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).length
  const minutes = Math.ceil(words / 200)
  return `${minutes} min read`
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) notFound()

  return (
    <div className="pt-20">
      <article className="py-16 px-6">
        <div className="mx-auto max-w-2xl">
          {/* Back */}
          <MotionWrapper>
            <Button asChild variant="ghost" size="sm" className="mb-8 -ml-2 text-muted-foreground hover:text-foreground">
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
          </MotionWrapper>

          {/* Cover */}
          {post.cover_image && (
            <MotionWrapper delay={0.05}>
              <div className="relative w-full aspect-[2/1] rounded-lg overflow-hidden bg-muted mb-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={post.cover_image} alt={post.title} className="object-cover w-full h-full" />
              </div>
            </MotionWrapper>
          )}

          {/* Title */}
          <MotionWrapper delay={0.1}>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl leading-tight">
              {post.title}
            </h1>
          </MotionWrapper>

          {/* Meta */}
          <MotionWrapper delay={0.15}>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground font-mono">
              <div className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                <time dateTime={post.created_at}>{formatDate(post.created_at)}</time>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                <span>{getReadingTime(post.content)}</span>
              </div>
              <div className="flex items-center gap-1">
                <User className="h-3.5 w-3.5" />
                <span>Sherwin Jefferson Tajan</span>
              </div>
            </div>
          </MotionWrapper>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <MotionWrapper delay={0.2}>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-[11px] px-2 py-0.5 rounded-md bg-secondary text-muted-foreground">
                    <Tag className="h-2.5 w-2.5 mr-1 inline" />
                    {tag}
                  </span>
                ))}
              </div>
            </MotionWrapper>
          )}

          {/* Divider */}
          <div className="mt-8 mb-8 border-b" />

          {/* Content */}
          <MotionWrapper delay={0.25}>
            <BlogMarkdown content={post.content} />
          </MotionWrapper>

          {/* Bottom */}
          <div className="mt-12 pt-6 border-t">
            <Button asChild variant="outline" size="sm">
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to all posts
              </Link>
            </Button>
          </div>
        </div>
      </article>
    </div>
  )
}
