import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'
import { MotionWrapper } from '@/components/sections/MotionWrapper'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Code2, Database, Layers, Server, Wrench, GraduationCap } from 'lucide-react'
import { SkillsSection } from '@/components/sections/SkillsSection'
import { getSkills } from '@/features/skills/queries'

export const metadata: Metadata = {
  title: 'About — Full Stack Developer & Continuous Learner',
  description:
    'Learn about Sherwin Jefferson Tajan (NightDev) — a software developer specializing in full-stack web development with React, Next.js, and Python, desktop applications with .NET and Avalonia UI, and DevOps workflows with Docker. Driven by clean architecture, maintainable code, and continuous technical growth.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About NightDev — Full Stack Developer',
    description:
      'Software developer specializing in full-stack web development, desktop applications with .NET and Avalonia UI, and DevOps with Docker.',
  },
}

const highlights = [
  {
    icon: Code2,
    title: 'Frontend Development',
    description:
      'Building responsive, accessible, and performant user interfaces with React, Next.js, Vue 3, TypeScript, and Tailwind CSS. Focused on clean component architecture and seamless user experiences.',
  },
  {
    icon: Server,
    title: 'Backend Development',
    description:
      'Designing APIs and server-side logic with Python, FastAPI, Django, Node.js, Express, C#, and .NET 8. Experienced in RESTful services, authentication systems, and data processing pipelines.',
  },
  {
    icon: Layers,
    title: 'Desktop Applications',
    description:
      'Creating cross-platform desktop apps with Avalonia UI, MVVM architecture, and .NET 8 with Entity Framework Core. Built production-ready features including RBAC and dashboards.',
  },
  {
    icon: Database,
    title: 'Database Management',
    description:
      'Working with PostgreSQL, Supabase, SQLite, MongoDB, and Redis for data persistence and caching. Experienced in schema design, migrations, and query optimization.',
  },
  {
    icon: Wrench,
    title: 'DevOps & Tooling',
    description:
      'Containerizing applications with Docker and Docker Compose, managing Git workflows, and working in Linux environments. Building reproducible development environments.',
  },
  {
    icon: GraduationCap,
    title: 'Continuous Learning',
    description:
      'Always exploring new technologies — from system design fundamentals to OpenSearch, Redis, and advanced authentication patterns. Documenting learnings to share with the community.',
  },
]

export default async function AboutPage() {
  const skills = await getSkills()

  return (
    <div className="pt-20">
      {/* Intro */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-3xl">
          <MotionWrapper>
            <SectionHeader
              label="About"
              title="NightDev"
              align="left"
            />
          </MotionWrapper>

          <MotionWrapper delay={0.1}>
            <div className="mt-6 space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                I&apos;m a software developer driven by the goal of becoming a professional
                full-stack software engineer. My journey spans across frontend and backend web
                development, desktop application development, database management, and DevOps
                practices. I believe in writing maintainable code, building clean architectures,
                and creating user interfaces that are both readable and functional.
              </p>
              <p>
                Whether I&apos;m building a desktop application with Avalonia UI and .NET 8, setting
                up Docker Compose environments for full-stack projects, or implementing
                authentication and role-based access control systems, I approach every project as an
                opportunity to learn and grow as an engineer.
              </p>
              <p>
                I value practical engineering over theoretical perfection. Every line of code I write
                is aimed at solving real problems with maintainable, well-documented solutions.
              </p>
            </div>
          </MotionWrapper>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="mx-auto max-w-5xl">
          <MotionWrapper>
            <SectionHeader
              label="Expertise"
              title="What I Do"
              subtitle="Core areas of expertise and focus."
            />
          </MotionWrapper>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map((item, index) => (
              <MotionWrapper key={item.title} delay={index * 0.05}>
                <div className="rounded-lg border bg-card p-5 h-full transition-colors hover:border-primary/30">
                  <div className="mb-3">
                    <item.icon className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="font-medium text-sm mb-1.5">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <SkillsSection skills={skills} />
    </div>
  )
}
