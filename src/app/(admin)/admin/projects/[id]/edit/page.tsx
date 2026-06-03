import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'
import { getProjectById } from '@/features/projects/queries'
import { EditProjectForm } from './edit-form'

interface EditProjectPageProps {
  params: Promise<{ id: string }>
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const { id } = await params
  const project = await getProjectById(id)

  if (!project) {
    notFound()
  }

  return <EditProjectForm project={project} />
}
