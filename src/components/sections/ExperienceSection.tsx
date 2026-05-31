import { MotionWrapper } from '@/components/sections/MotionWrapper'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { TimelineItem } from '@/components/ui/TimelineItem'
import type { Experience } from '@/features/experience/types'

interface ExperienceSectionProps {
  experiences: Experience[]
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section id="experience" className="py-20 px-4 bg-muted/30">
      <div className="mx-auto max-w-4xl">
        <MotionWrapper>
          <SectionHeader
            title="Experience"
            subtitle="My journey as a developer — projects, learning, and growth."
          />
        </MotionWrapper>

        <div className="mt-8">
          {experiences.map((exp, index) => (
            <TimelineItem key={exp.id} experience={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
