import { HeroSection } from '@/components/sections/HeroSection'

export const dynamic = 'force-dynamic'
import { AboutSection } from '@/components/sections/AboutSection'
import { SkillsSection } from '@/components/sections/SkillsSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { BlogSection } from '@/components/sections/BlogSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { getPublishedProjects } from '@/features/projects/queries'
import { getSkills } from '@/features/skills/queries'
import { getExperiences } from '@/features/experience/queries'
import { getPublishedPosts } from '@/features/blog/queries'

export default async function HomePage() {
  const [projects, skills, experiences, posts] = await Promise.all([
    getPublishedProjects(),
    getSkills(),
    getExperiences(),
    getPublishedPosts(),
  ])

  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection skills={skills} />
      <ProjectsSection projects={projects} />
      <ExperienceSection experiences={experiences} />
      <BlogSection posts={posts} />
      <ContactSection />
    </>
  )
}
