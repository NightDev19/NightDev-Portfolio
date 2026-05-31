'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { ADMIN_NAV_LINKS } from '@/lib/constants'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { LogOut, Terminal } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin')
    router.refresh()
  }

  return (
    <aside className="hidden md:flex w-64 flex-col border-r bg-card">
      <div className="flex items-center gap-2 px-6 py-5 border-b">
        <Terminal className="h-5 w-5 text-primary" />
        <span className="font-bold">Admin Panel</span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {ADMIN_NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'block px-3 py-2 rounded-md text-sm font-medium transition-colors',
              pathname === link.href || (link.href !== '/admin' && pathname.startsWith(link.href))
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="px-3 py-4 border-t">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </aside>
  )
}
