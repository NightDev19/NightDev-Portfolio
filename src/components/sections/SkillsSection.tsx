import { MotionWrapper } from '@/components/sections/MotionWrapper'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SkillCard } from '@/components/ui/SkillCard'
import { SKILL_CATEGORIES } from '@/lib/constants'
import type { Skill } from '@/features/skills/types'

interface SkillsSectionProps {
  skills: Skill[]
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  const grouped = SKILL_CATEGORIES.map((category) => ({
    category,
    skills: skills.filter((s) => s.category === category),
  })).filter((g) => g.skills.length > 0)

  return (
    <section id="skills" className="py-20 px-4 bg-muted/30">
      <div className="mx-auto max-w-6xl">
        <MotionWrapper>
          <SectionHeader
            title="Skills & Technologies"
            subtitle="Technologies I work with across the full stack."
          />
        </MotionWrapper>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {grouped.map((group, index) => (
            <MotionWrapper key={group.category} delay={index * 0.1}>
              <SkillCard category={group.category} skills={group.skills} />
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  )
}
