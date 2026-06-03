import Link from 'next/link'
import { MotionWrapper } from '@/components/sections/MotionWrapper'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import type { Project } from '@/features/projects/types'

interface ProjectsSectionProps {
  projects: Project[]
  showAll?: boolean
}

export function ProjectsSection({ projects, showAll = false }: ProjectsSectionProps) {
  const displayProjects = showAll ? projects : projects.slice(0, 3)

  return (
    <section id="projects" className="py-28 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -left-32 w-80 h-80 bg-purple-500/3 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -right-32 w-80 h-80 bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl">
        <MotionWrapper>
          <SectionHeader
            label="Projects"
            title="Selected Work"
            subtitle="A selection of projects that showcase my skills and experience."
          />
        </MotionWrapper>

        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayProjects.map((project, index) => (
            <MotionWrapper key={project.id} delay={index * 0.06}>
              <ProjectCard project={project} />
            </MotionWrapper>
          ))}
        </div>

        {!showAll && projects.length > 3 && (
          <MotionWrapper className="mt-12 text-center">
            <Button asChild variant="outline" size="lg" className="border-primary/20 hover:border-primary/40 hover:bg-primary/5 group">
              <Link href="/projects">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </Button>
          </MotionWrapper>
        )}
      </div>
    </section>
  )
}
