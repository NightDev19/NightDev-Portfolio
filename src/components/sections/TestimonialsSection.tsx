'use client'

import { motion, type Variants } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import type { Testimonial } from '@/features/testimonials/types'
import { SectionHeader } from '@/components/ui/SectionHeader'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, staggerChildren: 0.1 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

function AvatarOrInitials({
  name,
  avatarUrl,
}: {
  name: string
  avatarUrl: string | null
}) {
  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={name}
        className="h-12 w-12 rounded-full object-cover border-2 border-border/50"
      />
    )
  }

  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 border border-primary/20 text-sm font-semibold text-primary">
      {getInitials(name)}
    </div>
  )
}

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  if (testimonials.length === 0) return null

  const featured = testimonials.filter((t) => t.featured)
  const display = featured.length > 0 ? featured : testimonials

  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          label="Testimonials"
          title="What People Say"
          subtitle="Feedback from colleagues, clients, and collaborators I've worked with."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {display.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              className="group relative rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-black/5 hover:-translate-y-0.5"
            >
              {/* Quote icon */}
              <Quote className="h-8 w-8 text-primary/10 mb-3" />

              {/* Content */}
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              {/* Rating */}
              {testimonial.rating && (
                <div className="flex items-center gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${
                        i < testimonial.rating!
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-muted-foreground/20'
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-border/30">
                <AvatarOrInitials
                  name={testimonial.name}
                  avatarUrl={testimonial.avatar_url}
                />
                <div>
                  <p className="text-sm font-medium">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role}
                    {testimonial.company && (
                      <span className="text-muted-foreground/60">
                        {' '}
                        · {testimonial.company}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
