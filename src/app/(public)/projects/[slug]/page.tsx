import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Github } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MotionWrapper } from '@/components/sections/MotionWrapper'
import { getProjectBySlug, getPublishedProjects } from '@/features/projects/queries'

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

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

  if (!project) {
    notFound()
  }

  return (
    <div className="pt-20">
      <section className="py-20 px-4">
        <div className="mx-auto max-w-4xl">
          <MotionWrapper>
            <Button asChild variant="ghost" size="sm" className="mb-6">
              <Link href="/projects">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Link>
            </Button>
          </MotionWrapper>

          <MotionWrapper delay={0.1}>
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {project.title}
              </h1>
              {project.featured && <Badge variant="secondary">Featured</Badge>}
            </div>
          </MotionWrapper>

          <MotionWrapper delay={0.2}>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              {project.description}
            </p>
          </MotionWrapper>

          <MotionWrapper delay={0.3}>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tech_stack.map((tech) => (
                <Badge key={tech} variant="outline" className="text-sm">
                  {tech}
                </Badge>
              ))}
            </div>
          </MotionWrapper>

          <MotionWrapper delay={0.4}>
            <div className="mt-8 flex gap-3">
              {project.github_url && (
                <Button asChild>
                  <Link href={project.github_url} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    View Code
                  </Link>
                </Button>
              )}
              {project.demo_url && (
                <Button asChild variant="outline">
                  <Link href={project.demo_url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </Link>
                </Button>
              )}
            </div>
          </MotionWrapper>

          <MotionWrapper delay={0.5}>
            <div className="mt-8 text-sm text-muted-foreground">
              Created on{' '}
              {new Date(project.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          </MotionWrapper>
        </div>
      </section>
    </div>
  )
}
