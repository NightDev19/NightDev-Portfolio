import { MotionWrapper } from '@/components/sections/MotionWrapper'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { TimelineItem } from '@/components/ui/TimelineItem'
import type { Experience } from '@/features/experience/types'

interface ExperienceSectionProps {
  experiences: Experience[]
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section id="experience" className="py-28 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/2 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl">
        <MotionWrapper>
          <SectionHeader
            label="Experience"
            title="Where I've Worked"
            subtitle="My journey as a developer — projects, learning, and growth."
          />
        </MotionWrapper>

        <div className="mt-4">
          {experiences.map((exp, index) => (
            <TimelineItem key={exp.id} experience={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
