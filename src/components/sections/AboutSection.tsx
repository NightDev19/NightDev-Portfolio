import { MotionWrapper } from '@/components/sections/MotionWrapper'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Code2, Database, Layers, Server, Wrench, GraduationCap } from 'lucide-react'

const highlights = [
  {
    icon: Code2,
    title: 'Frontend Development',
    description:
      'Building responsive, accessible, and performant user interfaces with React, Next.js, Vue 3, TypeScript, and Tailwind CSS.',
  },
  {
    icon: Server,
    title: 'Backend Development',
    description:
      'Designing APIs and server-side logic with Python, FastAPI, Django, Node.js, Express, C#, and .NET 8.',
  },
  {
    icon: Layers,
    title: 'Desktop Applications',
    description:
      'Creating cross-platform desktop apps with Avalonia UI, MVVM architecture, and .NET 8 with Entity Framework Core.',
  },
  {
    icon: Database,
    title: 'Database Management',
    description:
      'Working with PostgreSQL, Supabase, SQLite, MongoDB, and Redis for data persistence and caching strategies.',
  },
  {
    icon: Wrench,
    title: 'DevOps & Tooling',
    description:
      'Containerizing applications with Docker and Docker Compose, managing Git workflows, and working in Linux environments.',
  },
  {
    icon: GraduationCap,
    title: 'Continuous Learning',
    description:
      'Always exploring new technologies — from system design fundamentals to OpenSearch, Redis, and advanced authentication patterns.',
  },
]

export function AboutSection() {
  return (
    <section id="about" className="py-20 px-4">
      <div className="mx-auto max-w-6xl">
        <MotionWrapper>
          <SectionHeader
            title="About Me"
            subtitle="A developer focused on full-stack engineering, clean architecture, and continuous technical growth."
          />
        </MotionWrapper>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((item, index) => (
            <MotionWrapper key={item.title} delay={index * 0.1}>
              <div className="rounded-lg border bg-card p-6 h-full transition-colors hover:border-primary/50">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  )
}
