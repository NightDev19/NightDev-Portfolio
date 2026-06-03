import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = createAdminClient()

    // Check if cover_image column exists by trying to select it
    const { data, error } = await supabase
      .from('blog_posts')
      .select('id, title, cover_image')
      .limit(3)

    if (error) {
      return NextResponse.json({
        connected: true,
        cover_image_column_exists: false,
        error: error.message,
        hint: 'Run the migration SQL in Supabase SQL Editor to add the cover_image column',
      })
    }

    return NextResponse.json({
      connected: true,
      cover_image_column_exists: true,
      posts: data,
      hint: data.some(p => p.cover_image)
        ? 'Some posts have cover images'
        : 'No posts have cover images set yet',
    })
  } catch (error: any) {
    return NextResponse.json({
      connected: false,
      error: error.message,
      hint: 'Check your SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local',
    })
  }
}
