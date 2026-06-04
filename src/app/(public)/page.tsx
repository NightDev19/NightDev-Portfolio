import { HeroSection } from '@/components/sections/HeroSection'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'
import { AboutSection } from '@/components/sections/AboutSection'
import { SkillsSection } from '@/components/sections/SkillsSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { BlogSection } from '@/components/sections/BlogSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { getPublishedProjects } from '@/features/projects/queries'
import { getSkills } from '@/features/skills/queries'
import { getExperiences } from '@/features/experience/queries'
import { getPublishedTestimonials } from '@/features/testimonials/queries'
import { getPublishedPosts } from '@/features/blog/queries'

export const metadata: Metadata = {
  title: 'NightDev | Full Stack Software Developer — Sherwin Jefferson Tajan',
  description:
    'Sherwin Jefferson Tajan (NightDev) — Full Stack Software Developer building production-ready web applications, desktop apps, and DevOps pipelines with React, Next.js, TypeScript, Python, .NET, and Docker.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'NightDev | Full Stack Software Developer',
    description:
      'Full Stack Software Developer building web apps, desktop applications, and DevOps pipelines with React, Next.js, TypeScript, Python, .NET, and Docker.',
  },
}

export default async function HomePage() {
  const [projects, skills, experiences, testimonials, posts] = await Promise.all([
    getPublishedProjects(),
    getSkills(),
    getExperiences(),
    getPublishedTestimonials(),
    getPublishedPosts(),
  ])

  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection skills={skills} />
      <ProjectsSection projects={projects} />
      <ExperienceSection experiences={experiences} />
      <TestimonialsSection testimonials={testimonials} />
      <BlogSection posts={posts} />
      <ContactSection />
    </>
  )
}
