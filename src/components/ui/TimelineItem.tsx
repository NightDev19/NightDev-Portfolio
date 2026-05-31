'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import type { Experience } from '@/features/experience/types'

interface TimelineItemProps {
  experience: Experience
  index: number
}

export function TimelineItem({ experience, index }: TimelineItemProps) {
  const isLeft = index % 2 === 0

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative flex items-start gap-6 pb-10 last:pb-0"
    >
      {/* Timeline line and dot */}
      <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border hidden md:block" />
      <div className="relative z-10 mt-1 h-10 w-10 shrink-0 rounded-full bg-primary flex items-center justify-center">
        <span className="text-xs font-bold text-primary-foreground">
          {index + 1}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="rounded-lg border bg-card p-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
            <h3 className="font-semibold text-lg">{experience.title}</h3>
            {experience.current && (
              <Badge variant="secondary" className="w-fit">Current</Badge>
            )}
          </div>
          {experience.organization && (
            <p className="text-sm text-muted-foreground mb-2">{experience.organization}</p>
          )}
          {experience.start_date && (
            <p className="text-xs text-muted-foreground mb-3">
              {new Date(experience.start_date).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric',
              })}
              {' — '}
              {experience.current
                ? 'Present'
                : experience.end_date
                  ? new Date(experience.end_date).toLocaleDateString('en-US', {
                      month: 'short',
                      year: 'numeric',
                    })
                  : 'N/A'}
            </p>
          )}
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            {experience.description}
          </p>
          {experience.tech_stack && experience.tech_stack.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {experience.tech_stack.map((tech) => (
                <Badge key={tech} variant="outline" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
