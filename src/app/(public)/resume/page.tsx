import type { Metadata } from 'next'
import { Download, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MotionWrapper } from '@/components/sections/MotionWrapper'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Resume',
  description: 'View and download the resume of Sherwin Jefferson Tajan — Software Developer / Full Stack Developer.',
}

const resumeSections = [
  {
    title: 'Professional Summary',
    items: [
      'Software Developer focused on becoming a professional full-stack software engineer',
      'Experienced across frontend, backend, desktop applications, databases, and DevOps workflows',
      'Values maintainable code, clean architecture, practical engineering, and professional documentation',
    ],
  },
  {
    title: 'Technical Skills',
    items: [
      {
        category: 'Frontend',
        skills: 'React, Next.js, Vue 3, TypeScript, JavaScript, Tailwind CSS, Responsive UI, UI/UX Improvement',
      },
      {
        category: 'Backend',
        skills: 'Python, FastAPI, Django, Node.js, Express, C#, .NET 8, ASP.NET Core',
      },
      {
        category: 'Desktop Development',
        skills: 'Avalonia UI, MVVM, CommunityToolkit.Mvvm, SQLite, Entity Framework Core',
      },
      {
        category: 'Databases',
        skills: 'Supabase, PostgreSQL, SQLite, MongoDB, Redis',
      },
      {
        category: 'DevOps & Tools',
        skills: 'Docker, Docker Compose, Git, GitHub, Linux Fedora, VS Code, Postman',
      },
    ],
  },
  {
    title: 'Experience',
    items: [
      {
        title: 'Project Chameleon - Desktop Application Developer',
        org: 'Personal Project',
        period: 'Jun 2024 — Present',
        description:
          'Built a full-featured desktop application using Avalonia UI and .NET 8 with authentication, RBAC, dashboards, device monitoring, and EF Core data persistence.',
      },
      {
        title: 'Docker Compose Learning - DevOps',
        org: 'Self-Directed Learning',
        period: 'Mar 2024',
        description:
          'Designed full-stack Docker environment with frontend, FastAPI backend, MongoDB, and Docker Compose orchestration.',
      },
      {
        title: 'OAuth Authentication - Backend Development',
        org: 'Self-Directed Learning',
        period: 'Jan 2024',
        description:
          'Implemented Google OAuth and GitHub OAuth with Node.js, Express, and Appwrite.',
      },
    ],
  },
  {
    title: 'Education & Learning',
    items: [
      'Self-directed learning in full-stack development, DevOps, and system design',
      'Continuous technical documentation and blog writing',
      'Active GitHub contributor and open-source learner',
    ],
  },
]

export default function ResumePage() {
  return (
    <div className="pt-20">
      <section className="py-20 px-4">
        <div className="mx-auto max-w-4xl">
          <MotionWrapper>
            <SectionHeader
              title="Resume"
              subtitle="A summary of my skills, experience, and professional background."
            />
          </MotionWrapper>

          <MotionWrapper delay={0.1}>
            <div className="mt-8 mb-8">
              <Button asChild size="lg">
                <a href="/resume/sherwin-tajan-resume.pdf" download>
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume (PDF)
                </a>
              </Button>
            </div>
          </MotionWrapper>

          <div className="space-y-10">
            {resumeSections.map((section, sIndex) => (
              <MotionWrapper key={section.title} delay={0.15 + sIndex * 0.1}>
                <div>
                  <h3 className="text-xl font-bold mb-4 pb-2 border-b">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.items.map((item, iIndex) => {
                      if (typeof item === 'string') {
                        return (
                          <li key={iIndex} className="flex items-start gap-2">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        )
                      }

                      if ('category' in item) {
                        return (
                          <li key={iIndex} className="flex flex-col sm:flex-row gap-1 sm:gap-3">
                            <Badge variant="outline" className="w-fit shrink-0">
                              {item.category}
                            </Badge>
                            <span className="text-sm text-muted-foreground">{item.skills}</span>
                          </li>
                        )
                      }

                      if ('title' in item) {
                        return (
                          <li key={iIndex} className="pl-4 border-l-2 border-primary/30">
                            <div className="font-medium">{item.title}</div>
                            <div className="text-sm text-muted-foreground">
                              {item.org} · {item.period}
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                          </li>
                        )
                      }

                      return null
                    })}
                  </ul>
                </div>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
