'use client'

import { motion } from 'framer-motion'
import { Calendar, Tag, ArrowUpRight, Clock } from 'lucide-react'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import type { BlogPost } from '@/features/blog/types'

function getReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).length
  const minutes = Math.ceil(words / 200)
  return `${minutes} min`
}

interface BlogCardProps {
  post: BlogPost
  featured?: boolean
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  if (featured) return <FeaturedBlogCard post={post} />

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative h-full"
    >
      <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/15 group-hover:via-purple-500/8 group-hover:to-primary/15 transition-all duration-500 blur-sm opacity-0 group-hover:opacity-100" />

      <Link href={`/blog/${post.slug}`} className="group/link block h-full relative">
        <div className="relative h-full flex flex-col rounded-xl border bg-card/80 backdrop-blur-sm overflow-hidden transition-all duration-300 group-hover/link:border-primary/25 group-hover/link:shadow-lg group-hover/link:shadow-primary/5">
          {/* Top accent */}
          <div className="h-0.5 w-full bg-gradient-to-r from-primary/40 via-purple-500/40 to-primary/40 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300" />

          {/* Shimmer */}
          <div className="absolute inset-0 shimmer-hover rounded-xl overflow-hidden" />

          <div className="relative flex flex-1 flex-col p-5">
            {/* Meta */}
            <div className="flex items-center gap-3 text-[11px] text-muted-foreground mb-3 font-mono">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <time dateTime={post.created_at}>{formatDate(post.created_at)}</time>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{getReadingTime(post.content)}</span>
              </div>
            </div>

            <h3 className="font-semibold text-sm leading-snug group-hover/link:text-primary transition-colors duration-200 line-clamp-2 mb-2">
              {post.title}
            </h3>

            {post.excerpt && (
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-4 flex-1">
                {post.excerpt}
              </p>
            )}

            {/* Tags + link */}
            <div className="flex items-center gap-1.5 flex-wrap pt-3 border-t border-border/50">
              {post.tags && post.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-secondary/60 border border-white/5 text-muted-foreground">
                  {tag}
                </span>
              ))}
              <span className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover/link:underline">
                Read
                <ArrowUpRight className="h-3 w-3" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

function FeaturedBlogCard({ post }: { post: BlogPost }) {
  return (
    <motion.div
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className="group relative"
    >
      <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/10 group-hover:via-purple-500/6 group-hover:to-primary/10 transition-all duration-500 blur-sm opacity-0 group-hover:opacity-100" />

      <Link href={`/blog/${post.slug}`} className="group/link block relative">
        <div className="rounded-xl border bg-card/80 backdrop-blur-sm overflow-hidden transition-all duration-300 group-hover/link:border-primary/25 group-hover/link:shadow-lg group-hover/link:shadow-primary/5">
          {/* Top accent */}
          <div className="h-1 w-full bg-gradient-to-r from-primary/60 via-purple-500/60 to-primary/60 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300" />

          <div className="relative grid md:grid-cols-2 gap-0">
            {/* Cover */}
            <div className="relative aspect-[16/10] md:aspect-auto bg-secondary/50 overflow-hidden">
              {post.cover_image ? (
                <img
                  src={post.cover_image}
                  alt={post.title}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover/link:scale-105"
                />
              ) : (
                <div className="w-full h-full min-h-[220px] bg-gradient-to-br from-primary/5 via-card to-secondary/20 flex items-center justify-center">
                  <span className="text-6xl font-bold gradient-text-subtle opacity-30">{post.title.charAt(0)}</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="relative flex flex-col justify-center p-6 md:p-8">
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3 font-mono">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  <time dateTime={post.created_at}>{formatDate(post.created_at)}</time>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{getReadingTime(post.content)} read</span>
                </div>
              </div>

              <h2 className="text-xl font-semibold leading-tight group-hover/link:text-primary transition-colors duration-200 mb-2">
                {post.title}
              </h2>

              {post.excerpt && (
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-3">
                  {post.excerpt}
                </p>
              )}

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-secondary/60 border border-white/5 text-muted-foreground">
                      <Tag className="h-2.5 w-2.5 mr-1 inline" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                Read article
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
