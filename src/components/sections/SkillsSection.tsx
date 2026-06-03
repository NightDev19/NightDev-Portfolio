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
    <section id="skills" className="py-28 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-purple-500/3 rounded-full blur-3xl" />
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-muted/30 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-5xl">
        <MotionWrapper>
          <SectionHeader
            label="Tech Stack"
            title="Skills & Technologies"
            subtitle="Technologies I work with across the full stack."
          />
        </MotionWrapper>

        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {grouped.map((group, index) => (
            <MotionWrapper key={group.category} delay={index * 0.06}>
              <SkillCard category={group.category} skills={group.skills} />
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  )
}
