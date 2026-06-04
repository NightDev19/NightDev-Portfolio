import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'
import { MotionWrapper } from '@/components/sections/MotionWrapper'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { BlogCard } from '@/components/ui/BlogCard'
import { getPublishedPosts } from '@/features/blog/queries'

export const metadata: Metadata = {
  title: 'Blog — Developer Journal & Technical Notes',
  description:
    'Technical notes, learning logs, and in-depth documentation from Sherwin Jefferson Tajan (NightDev). Covering React, Next.js, TypeScript, Python, .NET, Docker, databases, DevOps workflows, and software engineering best practices.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Blog — NightDev Developer Journal',
    description:
      'Technical notes, learning logs, and documentation from NightDev\'s engineering journey across web, desktop, and DevOps.',
  },
}

export default async function BlogPage() {
  const posts = await getPublishedPosts()
  const featured = posts[0]
  const rest = posts.slice(1)

  return (
    <div className="pt-20">
      <section className="py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <MotionWrapper>
            <SectionHeader
              label="Blog"
              title="Developer Journal"
              subtitle="Technical notes, learning logs, and documentation from my engineering journey."
            />
          </MotionWrapper>

          {posts.length === 0 ? (
            <MotionWrapper>
              <p className="text-center text-muted-foreground mt-12">
                No blog posts published yet. Check back soon!
              </p>
            </MotionWrapper>
          ) : (
            <>
              {/* Featured post */}
              {featured && (
                <MotionWrapper delay={0.05} className="mt-8">
                  <BlogCard post={featured} featured />
                </MotionWrapper>
              )}

              {/* Rest */}
              {rest.length > 0 && (
                <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((post, index) => (
                    <MotionWrapper key={post.id} delay={(index + 1) * 0.05}>
                      <BlogCard post={post} />
                    </MotionWrapper>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}
