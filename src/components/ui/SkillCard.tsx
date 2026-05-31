'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cardHover } from '@/lib/motion'
import type { Skill } from '@/features/skills/types'

interface SkillCardProps {
  category: string
  skills: Skill[]
}

export function SkillCard({ category, skills }: SkillCardProps) {
  return (
    <motion.div variants={cardHover} initial="rest" whileHover="hover">
      <Card className="h-full transition-colors hover:border-primary/50">
        <CardHeader>
          <CardTitle className="text-lg">{category}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge
                key={skill.id}
                variant="secondary"
                className="text-sm py-1 px-3"
              >
                {skill.name}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
