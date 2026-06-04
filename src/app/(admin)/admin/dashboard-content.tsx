import Link from 'next/link'
import { FolderKanban, FileText, Wrench, Briefcase, MessageSquare, FileUser, Quote, ArrowUpRight } from 'lucide-react'
import { getAllProjectsAdmin } from '@/features/projects/queries'
import { getAllPostsAdmin } from '@/features/blog/queries'
import { getSkills } from '@/features/skills/queries'
import { getExperiences } from '@/features/experience/queries'
import { getContactMessages } from '@/features/contact/actions'
import { getResumeSections } from '@/features/resume/queries'
import { getAllTestimonialsAdmin } from '@/features/testimonials/queries'

const dashboardCards = [
  { label: 'Projects', href: '/admin/projects', icon: FolderKanban, getKey: 'projects', color: 'from-blue-500/20 to-blue-600/5', iconColor: 'text-blue-400', borderHover: 'hover:border-blue-500/30' },
  { label: 'Blog Posts', href: '/admin/blog', icon: FileText, getKey: 'posts', color: 'from-emerald-500/20 to-emerald-600/5', iconColor: 'text-emerald-400', borderHover: 'hover:border-emerald-500/30' },
  { label: 'Skills', href: '/admin/skills', icon: Wrench, getKey: 'skills', color: 'from-amber-500/20 to-amber-600/5', iconColor: 'text-amber-400', borderHover: 'hover:border-amber-500/30' },
  { label: 'Experience', href: '/admin/experience', icon: Briefcase, getKey: 'experiences', color: 'from-purple-500/20 to-purple-600/5', iconColor: 'text-purple-400', borderHover: 'hover:border-purple-500/30' },
  { label: 'Resume', href: '/admin/resume', icon: FileUser, getKey: 'resume', color: 'from-cyan-500/20 to-cyan-600/5', iconColor: 'text-cyan-400', borderHover: 'hover:border-cyan-500/30' },
  { label: 'Testimonials', href: '/admin/testimonials', icon: Quote, getKey: 'testimonials', color: 'from-pink-500/20 to-pink-600/5', iconColor: 'text-pink-400', borderHover: 'hover:border-pink-500/30' },
  { label: 'Messages', href: '/admin/messages', icon: MessageSquare, getKey: 'messages', color: 'from-rose-500/20 to-rose-600/5', iconColor: 'text-rose-400', borderHover: 'hover:border-rose-500/30' },
]

export async function AdminDashboard() {
  const [projects, posts, skills, experiences, resumeSections, testimonials, messages] = await Promise.all([
    getAllProjectsAdmin(),
    getAllPostsAdmin(),
    getSkills(),
    getExperiences(),
    getResumeSections(),
    getAllTestimonialsAdmin(),
    getContactMessages(),
  ])

  const counts: Record<string, number> = {
    projects: projects.length,
    posts: posts.length,
    skills: skills.length,
    experiences: experiences.length,
    resume: resumeSections.length,
    testimonials: testimonials.length,
    messages: messages.length,
  }

  const unreadMessages = messages.filter((m: { read: boolean }) => !m.read).length

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Overview of your portfolio content and activity.
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full border border-border/50">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Session active
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {dashboardCards.map((card) => (
          <Link key={card.getKey} href={card.href} className="group">
            <div className={`relative overflow-hidden rounded-xl border border-border/50 bg-gradient-to-br ${card.color} p-5 transition-all duration-300 ${card.borderHover} hover:shadow-lg hover:shadow-black/5 hover:-translate-y-0.5`}>
              <div className="flex items-start justify-between mb-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-background/80 backdrop-blur-sm border border-border/30 shadow-sm`}>
                  <card.icon className={`h-5 w-5 ${card.iconColor}`} />
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground/40 transition-all duration-300 group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {card.label}
                </p>
                <p className="text-3xl font-bold tracking-tight">
                  {counts[card.getKey]}
                </p>
              </div>
              {card.getKey === 'messages' && unreadMessages > 0 && (
                <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-rose-500/10 px-2.5 py-0.5 text-[11px] font-medium text-rose-400 border border-rose-500/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
                  {unreadMessages} unread
                </div>
              )}
              {/* Decorative corner glow */}
              <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-primary/5 blur-2xl group-hover:bg-primary/10 transition-all duration-500" />
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Info */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-5">
          <h3 className="text-sm font-semibold mb-3">Content Summary</h3>
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Published projects</span>
              <span className="font-medium">{projects.filter((p: { published: boolean }) => p.published).length} / {projects.length}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Published posts</span>
              <span className="font-medium">{posts.filter((p: { published: boolean }) => p.published).length} / {posts.length}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Resume sections</span>
              <span className="font-medium">{resumeSections.length}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Unread messages</span>
              <span className="font-medium">{unreadMessages}</span>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-5">
          <h3 className="text-sm font-semibold mb-3">Quick Actions</h3>
          <div className="space-y-2">
            <Link
              href="/admin/projects/new"
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              <FolderKanban className="h-4 w-4 text-blue-400" />
              Add new project
            </Link>
            <Link
              href="/admin/blog/new"
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              <FileText className="h-4 w-4 text-emerald-400" />
              Write new post
            </Link>
            <Link
              href="/admin/messages"
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              <MessageSquare className="h-4 w-4 text-rose-400" />
              {unreadMessages > 0 ? `View ${unreadMessages} unread messages` : 'View messages'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
