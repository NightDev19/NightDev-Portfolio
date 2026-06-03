'use client'

import { motion } from 'framer-motion'
import { Code2, Server, Layers, Database, Wrench } from 'lucide-react'
import type { Skill } from '@/features/skills/types'

const CATEGORY_CONFIG: Record<string, { icon: React.ElementType; color: string; gradient: string }> = {
  Frontend: {
    icon: Code2,
    color: 'text-blue-400',
    gradient: 'from-blue-500/20 to-cyan-500/10',
  },
  Backend: {
    icon: Server,
    color: 'text-emerald-400',
    gradient: 'from-emerald-500/20 to-teal-500/10',
  },
  'Desktop Development': {
    icon: Layers,
    color: 'text-purple-400',
    gradient: 'from-purple-500/20 to-violet-500/10',
  },
  Databases: {
    icon: Database,
    color: 'text-amber-400',
    gradient: 'from-amber-500/20 to-orange-500/10',
  },
  'DevOps & Tools': {
    icon: Wrench,
    color: 'text-rose-400',
    gradient: 'from-rose-500/20 to-pink-500/10',
  },
}

const DEFAULT_CONFIG = {
  icon: Code2,
  color: 'text-blue-400',
  gradient: 'from-blue-500/20 to-cyan-500/10',
}

interface SkillCardProps {
  category: string
  skills: Skill[]
}

export function SkillCard({ category, skills }: SkillCardProps) {
  const config = CATEGORY_CONFIG[category] || DEFAULT_CONFIG
  const Icon = config.icon

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative h-full"
    >
      {/* Glow effect on hover */}
      <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/20 group-hover:via-purple-500/10 group-hover:to-primary/20 transition-all duration-500 blur-sm opacity-0 group-hover:opacity-100" />

      <div className="relative h-full rounded-xl border bg-card/80 backdrop-blur-sm p-6 transition-all duration-300 group-hover:border-primary/25 group-hover:shadow-lg group-hover:shadow-primary/5 overflow-hidden">
        {/* Top gradient bar */}
        <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${config.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

        {/* Shimmer overlay */}
        <div className="absolute inset-0 shimmer-hover rounded-xl overflow-hidden" />

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${config.gradient} backdrop-blur-sm border border-white/5`}>
            <Icon className={`h-5 w-5 ${config.color}`} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm">{category}</h3>
            <p className="text-[11px] text-muted-foreground font-mono">{skills.length} technologies</p>
          </div>
        </div>

        {/* Skills grid */}
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <motion.span
              key={skill.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, delay: index * 0.03 }}
              className="inline-flex items-center rounded-lg px-3 py-1.5 text-xs font-medium bg-secondary/60 backdrop-blur-sm border border-white/5 text-foreground/80 hover:text-foreground hover:bg-secondary hover:border-primary/20 transition-all duration-200 cursor-default"
            >
              {skill.name}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
