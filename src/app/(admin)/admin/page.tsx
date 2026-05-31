import { getCurrentUser } from '@/features/auth/queries'
import { AdminDashboard } from './dashboard-content'
import { AdminLoginPage } from './login-page'

export default async function AdminPage() {
  const user = await getCurrentUser()

  if (!user) {
    return <AdminLoginPage />
  }

  return <AdminDashboard />
}
