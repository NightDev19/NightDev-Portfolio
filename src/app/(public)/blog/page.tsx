import type { Metadata } from 'next'
import { MotionWrapper } from '@/components/sections/MotionWrapper'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { BlogCard } from '@/components/ui/BlogCard'
import { getPublishedPosts } from '@/features/blog/queries'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Technical notes, learning logs, and documentation from Sherwin Jefferson Tajan\'s engineering journey.',
}

export default async function BlogPage() {
  const posts = await getPublishedPosts()

  return (
    <div className="pt-20">
      <section className="py-20 px-4">
        <div className="mx-auto max-w-6xl">
          <MotionWrapper>
            <SectionHeader
              title="Developer Journal"
              subtitle="Technical notes, learning logs, and documentation from my engineering journey."
            />
          </MotionWrapper>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <MotionWrapper key={post.id} delay={index * 0.1}>
                <BlogCard post={post} />
              </MotionWrapper>
            ))}
          </div>

          {posts.length === 0 && (
            <MotionWrapper>
              <p className="text-center text-muted-foreground mt-12">
                No blog posts published yet. Check back soon!
              </p>
            </MotionWrapper>
          )}
        </div>
      </section>
    </div>
  )
}
