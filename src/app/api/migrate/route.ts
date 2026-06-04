import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'

/**
 * One-time migration endpoint.
 * Run: curl http://localhost:3000/api/migrate
 * Protected: Requires authentication.
 */
export async function GET() {
  const user = await requireAuth()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const results: { step: string; status: string; message?: string }[] = []

  try {
    const supabase = createAdminClient()

    // Step 1: Create the storage bucket
    const { data: bucketData, error: bucketError } = await supabase.storage.createBucket(
      'blog-images',
      {
        public: true,
        fileSizeLimit: 5242880, // 5MB
        allowedMimeTypes: [
          'image/jpeg',
          'image/png',
          'image/gif',
          'image/webp',
          'image/svg+xml',
        ],
      }
    )

    if (bucketError) {
      if (bucketError.message.includes('already exists')) {
        results.push({ step: 'Create bucket', status: 'already_exists', message: 'blog-images bucket already exists' })
      } else {
        results.push({ step: 'Create bucket', status: 'error', message: bucketError.message })
      }
    } else {
      results.push({ step: 'Create bucket', status: 'success', message: 'blog-images bucket created' })
    }

    // Step 2: Check if cover_image column exists by selecting it
    const { error: checkError } = await supabase
      .from('blog_posts')
      .select('cover_image')
      .limit(1)

    if (checkError && checkError.message.includes('column') && checkError.message.includes('does not exist')) {
      results.push({
        step: 'Add cover_image column',
        status: 'manual_required',
        message: 'The cover_image column does not exist. You need to run this SQL in the Supabase SQL Editor:\n\nALTER TABLE public.blog_posts ADD COLUMN cover_image TEXT;',
      })
    } else if (checkError) {
      results.push({
        step: 'Check cover_image column',
        status: 'error',
        message: checkError.message,
      })
    } else {
      results.push({ step: 'Check cover_image column', status: 'success', message: 'cover_image column exists' })
    }

    // Step 3: Verify bucket access
    const { data: listData, error: listError } = await supabase.storage
      .from('blog-images')
      .list('', { limit: 5 })

    if (listError) {
      results.push({ step: 'Verify bucket access', status: 'error', message: listError.message })
    } else {
      results.push({ step: 'Verify bucket access', status: 'success', message: `Bucket is accessible, contains ${(listData || []).length} items` })
    }

    return NextResponse.json({ migration: results })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, migration: results },
      { status: 500 }
    )
  }
}
