import Link from 'next/link'
import { FolderKanban, FileText, Wrench, Briefcase, MessageSquare, FileUser } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getAllProjectsAdmin } from '@/features/projects/queries'
import { getAllPostsAdmin } from '@/features/blog/queries'
import { getSkills } from '@/features/skills/queries'
import { getExperiences } from '@/features/experience/queries'
import { getContactMessages } from '@/features/contact/actions'
import { getResumeSections } from '@/features/resume/queries'

const dashboardCards = [
  { label: 'Projects', href: '/admin/projects', icon: FolderKanban, getKey: 'projects' },
  { label: 'Blog Posts', href: '/admin/blog', icon: FileText, getKey: 'posts' },
  { label: 'Skills', href: '/admin/skills', icon: Wrench, getKey: 'skills' },
  { label: 'Experience', href: '/admin/experience', icon: Briefcase, getKey: 'experiences' },
  { label: 'Resume', href: '/admin/resume', icon: FileUser, getKey: 'resume' },
  { label: 'Messages', href: '/admin/messages', icon: MessageSquare, getKey: 'messages' },
]

export async function AdminDashboard() {
  const [projects, posts, skills, experiences, resumeSections, messages] = await Promise.all([
    getAllProjectsAdmin(),
    getAllPostsAdmin(),
    getSkills(),
    getExperiences(),
    getResumeSections(),
    getContactMessages(),
  ])

  const counts: Record<string, number> = {
    projects: projects.length,
    posts: posts.length,
    skills: skills.length,
    experiences: experiences.length,
    resume: resumeSections.length,
    messages: messages.length,
  }

  const unreadMessages = messages.filter((m: { read: boolean }) => !m.read).length

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {dashboardCards.map((card) => (
          <Link key={card.getKey} href={card.href}>
            <Card className="transition-colors hover:border-primary/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{card.label}</CardTitle>
                <card.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{counts[card.getKey]}</div>
                {card.getKey === 'messages' && unreadMessages > 0 && (
                  <p className="text-xs text-muted-foreground">
                    {unreadMessages} unread
                  </p>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
