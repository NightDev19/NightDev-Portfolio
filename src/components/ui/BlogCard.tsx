'use client'

import { motion } from 'framer-motion'
import { Calendar, Tag } from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cardHover } from '@/lib/motion'
import type { BlogPost } from '@/features/blog/types'

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <motion.div variants={cardHover} initial="rest" whileHover="hover">
      <Card className="h-full flex flex-col transition-colors hover:border-primary/50">
        <CardHeader>
          <CardTitle className="text-xl leading-tight">
            <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
              {post.title}
            </Link>
          </CardTitle>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            {new Date(post.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
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
