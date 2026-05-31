import Link from 'next/link'
import { MotionWrapper } from '@/components/sections/MotionWrapper'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { Button } from '@/components/ui/button'
import type { Project } from '@/features/projects/types'

interface ProjectsSectionProps {
  projects: Project[]
  showAll?: boolean
}

export function ProjectsSection({ projects, showAll = false }: ProjectsSectionProps) {
  const displayProjects = showAll ? projects : projects.slice(0, 3)

  return (
    <section id="projects" className="py-20 px-4">
      <div className="mx-auto max-w-6xl">
        <MotionWrapper>
          <SectionHeader
            title="Projects"
            subtitle="A selection of projects that showcase my skills and experience."
          />
        </MotionWrapper>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayProjects.map((project, index) => (
            <MotionWrapper key={project.id} delay={index * 0.1}>
              <ProjectCard project={project} />
            </MotionWrapper>
          ))}
        </div>

        {!showAll && projects.length > 3 && (
          <MotionWrapper className="mt-10 text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/projects">View All Projects</Link>
            </Button>
          </MotionWrapper>
        )}
      </div>
    </section>
  )
}
