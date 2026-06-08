'use client'

import { motion } from 'framer-motion'
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import type { Project } from '@/features/projects/types'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative h-full"
    >
      {/* Glow effect on hover */}
      <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/15 group-hover:via-purple-500/8 group-hover:to-primary/15 transition-all duration-500 blur-sm opacity-0 group-hover:opacity-100" />

      <div className="relative h-full flex flex-col rounded-xl border bg-card/80 backdrop-blur-sm transition-all duration-300 group-hover:border-primary/25 group-hover:shadow-lg group-hover:shadow-primary/5 overflow-hidden">
        {/* Top gradient accent */}
        <div className="h-1 w-full bg-gradient-to-r from-primary/60 via-purple-500/60 to-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Shimmer overlay */}
        <div className="absolute inset-0 shimmer-hover rounded-xl overflow-hidden" />

        {/* Project Image */}
        {project.image_url ? (
          <div className="relative w-full h-44 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image_url}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Gradient overlay at bottom for smooth text transition */}
            <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
            {project.featured && (
              <Badge className="absolute top-3 right-3 text-[10px] px-2 py-0.5 bg-primary/90 text-primary-foreground border-none shadow-sm">
                Featured
              </Badge>
            )}
          </div>
        ) : null}

        <div className="relative flex flex-1 flex-col p-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-3">
            {!project.image_url && (
              <h3 className="font-semibold text-base group-hover:text-primary transition-colors duration-200">
                {project.title}
              </h3>
            )}
            {project.image_url && (
              <h3 className="font-semibold text-base group-hover:text-primary transition-colors duration-200">
                {project.title}
              </h3>
            )}
            {!project.image_url && project.featured && (
              <Badge className="shrink-0 text-[10px] px-2 py-0.5 bg-primary/10 text-primary border-primary/20 hover:bg-primary/15">
                Featured
              </Badge>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1 line-clamp-3">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tech_stack.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-secondary/60 backdrop-blur-sm border border-white/5 text-muted-foreground hover:text-foreground hover:border-primary/15 transition-all duration-200"
              >
                {tech}
              </span>
            ))}
            {project.tech_stack.length > 5 && (
              <span className="text-[11px] px-2.5 py-1 rounded-md bg-secondary/40 text-muted-foreground">
                +{project.tech_stack.length - 5}
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center pt-4 border-t border-border/50">
            {project.github_url && (
              <Link
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <Github className="h-3.5 w-3.5" />
                Code
              </Link>
            )}
            <Link
              href={`/projects/${project.slug}`}
              className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors duration-200"
            >
              Details
              <ArrowUpRight className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
