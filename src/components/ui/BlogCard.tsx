'use client'

import { motion } from 'framer-motion'
import { Calendar, Tag } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cardHover } from '@/lib/motion'
import { formatDate } from '@/lib/utils'
import type { BlogPost } from '@/features/blog/types'

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <motion.div variants={cardHover} initial="rest" whileHover="hover">
      <Card className="h-full flex flex-col transition-colors hover:border-primary/50 overflow-hidden">
        {/* Cover Image */}
        {post.cover_image && (
          <Link href={`/blog/${post.slug}`} className="block">
            <div className="relative w-full h-48 bg-muted">
              <Image
                src={post.cover_image}
                alt={post.title}
                fill
                className="object-cover transition-transform hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          </Link>
        )}

        <CardHeader>
          <CardTitle className="text-xl leading-tight">
            <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
              {post.title}
            </Link>
          </CardTitle>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            {formatDate(post.created_at)}
          </div>
        </CardHeader>
        <CardContent className="flex-1">
          {post.excerpt && (
            <p className="text-muted-foreground text-sm leading-relaxed">
              {post.excerpt}
            </p>
          )}
        </CardContent>
        {post.tags && post.tags.length > 0 && (
          <CardFooter>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          </CardFooter>
        )}
      </Card>
    </motion.div>
  )
}
