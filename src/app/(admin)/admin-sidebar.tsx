'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { ADMIN_NAV_LINKS } from '@/lib/constants'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { LogOut, Globe, Menu, X, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin')
    router.refresh()
  }

  const isActive = (href: string) =>
    href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)

  const navLinks = (
    <>
      {ADMIN_NAV_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={() => setMobileOpen(false)}
          className={cn(
            'group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
            isActive(link.href)
              ? 'bg-primary/10 text-primary shadow-sm shadow-primary/5'
              : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
          )}
        >
          <span className="flex-1">{link.label}</span>
          {isActive(link.href) && (
            <ChevronRight className="h-3.5 w-3.5 opacity-60" />
          )}
        </Link>
      ))}
    </>
  )

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
            <Image src="/icon.svg" alt="NightDev" width={16} height={16} />
          </div>
          <span className="font-semibold text-sm tracking-tight">NightDev Admin</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
            <Link href="/">
              <Globe className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle admin navigation"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile Dropdown Nav */}
      {mobileOpen && (
        <div className="md:hidden fixed top-[53px] left-0 right-0 z-40 bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-xl shadow-black/10">
          <nav className="px-3 py-2 space-y-0.5">
            {navLinks}
          </nav>
          <div className="px-3 py-3 border-t border-border/50 flex gap-2">
            <Button variant="outline" size="sm" className="flex-1 gap-2" asChild>
              <Link href="/">
                <Globe className="h-3.5 w-3.5" />
                View Site
              </Link>
            </Button>
            <Button variant="ghost" size="sm" className="flex-1 gap-2" onClick={handleLogout}>
              <LogOut className="h-3.5 w-3.5" />
              Sign Out
            </Button>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-72 flex-col border-r border-border/50 bg-card/50 backdrop-blur-sm">
        {/* Brand */}
        <div className="px-5 py-6 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 shadow-sm shadow-primary/10">
              <Image src="/icon.svg" alt="NightDev" width={20} height={20} />
            </div>
            <div>
              <span className="font-semibold tracking-tight block">NightDev</span>
              <span className="text-[11px] text-muted-foreground uppercase tracking-widest">Admin Panel</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
          <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/60">
            Navigation
          </p>
          {navLinks}
        </nav>

        {/* Bottom Actions */}
        <div className="px-3 py-4 border-t border-border/50 space-y-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start gap-2.5 text-muted-foreground hover:text-foreground border-border/50 bg-transparent hover:bg-white/5"
            asChild
          >
            <Link href="/">
              <Globe className="h-4 w-4" />
              View Site
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2.5 text-muted-foreground hover:text-destructive"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </aside>
    </>
  )
}
