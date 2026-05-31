import type { Metadata } from 'next'
import { MotionWrapper } from '@/components/sections/MotionWrapper'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { getPublishedProjects } from '@/features/projects/queries'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Explore projects built by Sherwin Jefferson Tajan — from desktop applications to full-stack Docker setups and OAuth implementations.',
}

export default async function ProjectsPage() {
  const projects = await getPublishedProjects()

  return (
    <div className="pt-20">
      <section className="py-20 px-4">
        <div className="mx-auto max-w-6xl">
          <MotionWrapper>
            <SectionHeader
              title="Projects"
              subtitle="A collection of projects that demonstrate my skills across different areas of software development."
            />
          </MotionWrapper>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <MotionWrapper key={project.id} delay={index * 0.1}>
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
