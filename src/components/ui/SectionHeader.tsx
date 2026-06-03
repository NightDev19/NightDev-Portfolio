'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  className?: string
  align?: 'left' | 'center'
  label?: string
}

export function SectionHeader({ title, subtitle, className, align = 'center', label }: SectionHeaderProps) {
  return (
    <div className={cn('mb-16', align === 'center' && 'text-center', className)}>
      {label && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className={cn('inline-flex items-center gap-2 mb-4', align === 'center' && 'justify-center')}
        >
          <span className="h-px w-6 bg-primary/60" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
            {label}
          </span>
          <span className="h-px w-6 bg-primary/60" />
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl font-bold tracking-tight sm:text-4xl gradient-text-subtle"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
      {/* Decorative gradient line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className={cn(
          'mt-6 h-[2px] w-20 origin-left',
          align === 'center' ? 'mx-auto origin-center' : ''
        )}
        style={{
          background: 'linear-gradient(90deg, transparent, oklch(0.65 0.16 260), oklch(0.7 0.18 300), transparent)',
        }}
      />
    </div>
  )
}
