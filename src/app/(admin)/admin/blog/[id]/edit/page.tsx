import { notFound } from 'next/navigation'
import { getPostById } from '@/features/blog/queries'
import { EditBlogPostForm } from './edit-form'

interface EditBlogPostPageProps {
  params: Promise<{ id: string }>
}

export default async function EditBlogPostPage({ params }: EditBlogPostPageProps) {
  const { id } = await params
  const post = await getPostById(id)

  if (!post) {
    notFound()
  }

  return <EditBlogPostForm post={post} />
}
