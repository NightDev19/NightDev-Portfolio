import Link from 'next/link'
import { MotionWrapper } from '@/components/sections/MotionWrapper'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { BlogCard } from '@/components/ui/BlogCard'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import type { BlogPost } from '@/features/blog/types'

interface BlogSectionProps {
  posts: BlogPost[]
  showAll?: boolean
}

export function BlogSection({ posts, showAll = false }: BlogSectionProps) {
  const displayPosts = showAll ? posts : posts.slice(0, 3)

  return (
    <section id="blog" className="py-28 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/3 rounded-full blur-3xl" />
        {/* Subtle dot grid */}
        <div className="absolute inset-0 bg-muted/30 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-5xl">
        <MotionWrapper>
          <SectionHeader
            label="Blog"
            title="Developer Journal"
            subtitle="Technical notes, learning logs, and documentation from my engineering journey."
          />
        </MotionWrapper>

        {posts.length === 0 ? (
          <MotionWrapper>
            <div className="text-center py-16">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/60 mb-4">
                <span className="text-2xl">📝</span>
              </div>
              <p className="text-muted-foreground">
                No blog posts published yet. Check back soon!
              </p>
            </div>
          </MotionWrapper>
        ) : (
          <>
            {/* Featured post */}
            {!showAll && posts[0] && (
              <MotionWrapper delay={0.05} className="mb-8">
                <BlogCard post={posts[0]} featured />
              </MotionWrapper>
            )}

            {/* Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {(showAll ? displayPosts : displayPosts.slice(1)).map((post, index) => (
                <MotionWrapper key={post.id} delay={(index + 1) * 0.06}>
                  <BlogCard post={post} />
                </MotionWrapper>
              ))}
            </div>
          </>
        )}

        {!showAll && posts.length > 3 && (
          <MotionWrapper className="mt-12 text-center">
            <Button asChild variant="outline" size="lg" className="border-primary/20 hover:border-primary/40 hover:bg-primary/5 group">
              <Link href="/blog">
                View All Posts
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </Button>
          </MotionWrapper>
        )}
      </div>
    </section>
  )
}
