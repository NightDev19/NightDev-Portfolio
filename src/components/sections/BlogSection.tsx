import Link from 'next/link'
import { MotionWrapper } from '@/components/sections/MotionWrapper'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { BlogCard } from '@/components/ui/BlogCard'
import { Button } from '@/components/ui/button'
import type { BlogPost } from '@/features/blog/types'

interface BlogSectionProps {
  posts: BlogPost[]
  showAll?: boolean
}

export function BlogSection({ posts, showAll = false }: BlogSectionProps) {
  const displayPosts = showAll ? posts : posts.slice(0, 3)

  return (
    <section id="blog" className="py-20 px-4">
      <div className="mx-auto max-w-6xl">
        <MotionWrapper>
          <SectionHeader
            title="Developer Journal"
            subtitle="Technical notes, learning logs, and documentation from my engineering journey."
          />
        </MotionWrapper>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayPosts.map((post, index) => (
            <MotionWrapper key={post.id} delay={index * 0.1}>
              <BlogCard post={post} />
            </MotionWrapper>
          ))}
        </div>

        {!showAll && posts.length > 3 && (
          <MotionWrapper className="mt-10 text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/blog">View All Posts</Link>
            </Button>
          </MotionWrapper>
        )}
      </div>
    </section>
  )
}
