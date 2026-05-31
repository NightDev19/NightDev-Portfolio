import { getCurrentUser } from '@/features/auth/queries'
import { AdminSidebar } from './admin-sidebar'
import { AdminLoginPage } from './login-page'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  // If not logged in, show the login page instead of the admin layout
  if (!user) {
    return <AdminLoginPage />
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  )
}
