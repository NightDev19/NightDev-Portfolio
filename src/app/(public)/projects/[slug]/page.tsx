import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Github } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MotionWrapper } from '@/components/sections/MotionWrapper'
import { getProjectBySlug, getPublishedProjects } from '@/features/projects/queries'
import { formatDate } from '@/lib/utils'

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  const projects = await getPublishedProjects()
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) return { title: 'Project Not Found' }

  return {
    title: project.title,
    description: project.description,
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) notFound()

  return (
    <div className="pt-20">
      <section className="py-20 px-6">
        <div className="mx-auto max-w-3xl">
          <MotionWrapper>
            <Button asChild variant="ghost" size="sm" className="mb-6 -ml-2 text-muted-foreground hover:text-foreground">
              <Link href="/projects">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Link>
            </Button>
          </MotionWrapper>

          {/* Project Image */}
          {project.image_url && (
            <MotionWrapper delay={0.05}>
              <div className="relative w-full rounded-xl overflow-hidden border bg-muted mb-8">
                <div className="relative w-full aspect-video">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </MotionWrapper>
          )}

          <MotionWrapper delay={0.1}>
            <p className="font-mono text-sm text-primary mb-2">Project</p>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {project.title}
            </h1>
          </MotionWrapper>

          <MotionWrapper delay={0.15}>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-2xl">
              {project.description}
            </p>
          </MotionWrapper>

          <MotionWrapper delay={0.2}>
            <div className="mt-6 flex flex-wrap gap-1.5">
              {project.tech_stack.map((tech) => (
                <span key={tech} className="text-[11px] px-2.5 py-1 rounded-md bg-secondary text-muted-foreground">
                  {tech}
                </span>
              ))}
            </div>
          </MotionWrapper>

          <MotionWrapper delay={0.25}>
            <div className="mt-8 flex gap-3">
              {project.github_url && (
                <Button asChild size="default" className="gap-2">
                  <Link href={project.github_url} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                    View Code
                  </Link>
                </Button>
              )}
              {project.demo_url && (
                <Button asChild variant="outline" size="default" className="gap-2">
                  <Link href={project.demo_url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    Live Demo
                  </Link>
                </Button>
              )}
            </div>
          </MotionWrapper>

          <MotionWrapper delay={0.3}>
            <div className="mt-6 text-xs text-muted-foreground font-mono">
              Created on {formatDate(project.created_at)}
            </div>
          </MotionWrapper>
        </div>
      </section>
    </div>
  )
}
