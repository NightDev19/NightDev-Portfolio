'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { formatShortDate } from '@/lib/utils'
import type { Experience } from '@/features/experience/types'

interface TimelineItemProps {
  experience: Experience
  index: number
}

export function TimelineItem({ experience, index }: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative flex gap-6 pb-12 last:pb-0"
    >
      {/* Timeline line + dot */}
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
          className="relative"
        >
          <div className="h-4 w-4 rounded-full border-2 border-primary bg-background shrink-0 mt-1" />
          {experience.current && (
            <div className="absolute inset-0 h-4 w-4 rounded-full bg-primary/20 animate-ping mt-1" />
          )}
        </motion.div>
        <div className="w-px flex-1 bg-gradient-to-b from-primary/30 to-border" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pb-2">
        <motion.div
          whileHover={{ y: -2, transition: { duration: 0.2 } }}
          className="group relative rounded-xl border bg-card/80 backdrop-blur-sm p-6 transition-all duration-300 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5 overflow-hidden"
        >
          {/* Left accent bar */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/60 to-primary/20 rounded-r opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Shimmer overlay */}
          <div className="absolute inset-0 shimmer-hover rounded-xl overflow-hidden" />

          <div className="relative">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
              <h3 className="font-semibold text-sm">{experience.title}</h3>
              {experience.current ? (
                <Badge className="w-fit text-[10px] px-2.5 py-0.5 bg-primary/10 text-primary border-primary/20 shrink-0">
                  Current
                </Badge>
              ) : null}
            </div>

            {experience.organization && (
              <p className="text-sm text-primary font-medium">{experience.organization}</p>
            )}

            {experience.start_date && (
              <p className="text-xs text-muted-foreground mt-1 mb-4 font-mono">
                {formatShortDate(experience.start_date)} — {experience.current
                  ? 'Present'
                  : experience.end_date
                    ? formatShortDate(experience.end_date)
                    : 'N/A'}
              </p>
            )}

            {experience.description && (
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                {experience.description}
              </p>
            )}

            {experience.tech_stack && experience.tech_stack.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {experience.tech_stack.map((tech) => (
                  <span key={tech} className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-secondary/60 border border-white/5 text-muted-foreground">
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
