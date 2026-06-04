import { getCurrentUser } from '@/features/auth/queries'
import { AdminSidebar } from './admin-sidebar'
import { AdminLoginPage } from './admin/login-page'
import { SessionTimeoutProvider } from '@/components/admin/session-timeout-provider'

export const dynamic = 'force-dynamic'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  if (!user) {
    return <AdminLoginPage />
  }

  return (
    <SessionTimeoutProvider>
      <div className="flex min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        {/* Subtle background grid */}
        <div
          className="fixed inset-0 -z-10 opacity-[0.015] dark:opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
        <AdminSidebar />
        <main className="flex-1 overflow-auto">
          <div className="p-6 lg:p-8 pt-[72px] md:pt-6 lg:pt-8">{children}</div>
        </main>
      </div>
    </SessionTimeoutProvider>
  )
}
