import { MotionWrapper } from '@/components/sections/MotionWrapper'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Code2, Database, Layers, Server, Wrench, GraduationCap } from 'lucide-react'

const highlights = [
  {
    icon: Code2,
    title: 'Frontend Development',
    description:
      'Building responsive, accessible, and performant user interfaces with React, Next.js, Vue 3, TypeScript, and Tailwind CSS.',
    color: 'text-blue-400',
    gradient: 'from-blue-500/20 to-cyan-500/10',
  },
  {
    icon: Server,
    title: 'Backend Development',
    description:
      'Designing APIs and server-side logic with Python, FastAPI, Django, Node.js, Express, C#, and .NET 8.',
    color: 'text-emerald-400',
    gradient: 'from-emerald-500/20 to-teal-500/10',
  },
  {
    icon: Layers,
    title: 'Desktop Applications',
    description:
      'Creating cross-platform desktop apps with Avalonia UI, MVVM architecture, and .NET 8 with Entity Framework Core.',
    color: 'text-purple-400',
    gradient: 'from-purple-500/20 to-violet-500/10',
  },
  {
    icon: Database,
    title: 'Database Management',
    description:
      'Working with PostgreSQL, Supabase, SQLite, MongoDB, and Redis for data persistence and caching strategies.',
    color: 'text-amber-400',
    gradient: 'from-amber-500/20 to-orange-500/10',
  },
  {
    icon: Wrench,
    title: 'DevOps & Tooling',
    description:
      'Containerizing applications with Docker and Docker Compose, managing Git workflows, and working in Linux environments.',
    color: 'text-rose-400',
    gradient: 'from-rose-500/20 to-pink-500/10',
  },
  {
    icon: GraduationCap,
    title: 'Continuous Learning',
    description:
      'Always exploring new technologies — from system design fundamentals to OpenSearch, Redis, and advanced authentication patterns.',
    color: 'text-cyan-400',
    gradient: 'from-cyan-500/20 to-sky-500/10',
  },
]

export function AboutSection() {
  return (
    <section id="about" className="py-28 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl">
        <MotionWrapper>
          <SectionHeader
            label="About"
            title="What I Do"
            subtitle="A developer focused on full-stack engineering, clean architecture, and continuous technical growth."
          />
        </MotionWrapper>

        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((item, index) => (
            <MotionWrapper key={item.title} delay={index * 0.05}>
              <div className="group relative h-full rounded-xl border bg-card/80 backdrop-blur-sm p-6 transition-all duration-300 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 overflow-hidden">
                {/* Top gradient bar */}
                <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                {/* Shimmer overlay */}
                <div className="absolute inset-0 shimmer-hover rounded-xl overflow-hidden" />

                {/* Glow on hover */}
                <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-primary/0 to-primary/0 group-hover:from-primary/10 group-hover:to-purple-500/5 transition-all duration-500 blur-sm opacity-0 group-hover:opacity-100" />

                <div className="relative">
                  <div className="mb-4">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${item.gradient} border border-white/5 backdrop-blur-sm`}>
                      <item.icon className={`h-5 w-5 ${item.color}`} />
                    </div>
                  </div>
                  <h3 className="font-semibold text-sm mb-2">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  )
}
