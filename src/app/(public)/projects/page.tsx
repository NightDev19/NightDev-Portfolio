import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'
import { MotionWrapper } from '@/components/sections/MotionWrapper'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { getPublishedProjects } from '@/features/projects/queries'

export const metadata: Metadata = {
  title: 'Projects — Web Apps, Desktop Applications & DevOps',
  description:
    'Explore projects built by Sherwin Jefferson Tajan (NightDev) — full-stack web applications with React and Next.js, desktop applications with .NET and Avalonia UI, Docker Compose setups, OAuth implementations, and more.',
  alternates: {
    canonical: '/projects',
  },
  openGraph: {
    title: 'Projects by NightDev',
    description:
      'Full-stack web apps, desktop applications, Docker setups, and authentication systems built by NightDev.',
  },
}

export default async function ProjectsPage() {
  const projects = await getPublishedProjects()

  return (
    <div className="pt-20">
      <section className="py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <MotionWrapper>
            <SectionHeader
              label="Projects"
              title="Selected Work"
              subtitle="A collection of projects that demonstrate my skills across different areas of software development."
            />
          </MotionWrapper>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <MotionWrapper key={project.id} delay={index * 0.05}>
                <ProjectCard project={project} />
              </MotionWrapper>
            ))}
          </div>

          {projects.length === 0 && (
            <MotionWrapper>
              <p className="text-center text-muted-foreground mt-12">
                No projects published yet. Check back soon!
              </p>
            </MotionWrapper>
          )}
        </div>
      </section>
    </div>
  )
}
