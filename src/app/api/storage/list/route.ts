import { createAdminClient } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const folder = searchParams.get('folder') || 'blog'
    const supabase = createAdminClient()

    // List all files in the folder recursively
    const { data, error } = await supabase.storage
      .from('blog-images')
      .list(folder, {
        limit: 100,
        sortBy: { column: 'created_at', order: 'desc' },
      })

    if (error) {
      console.error('Storage list error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Filter out folders (items without file extensions) and get public URLs
    const files = (data || [])
      .filter((item) => item.metadata && item.metadata.size > 0)
      .map((item) => {
        const { data: urlData } = supabase.storage
          .from('blog-images')
          .getPublicUrl(`${folder}/${item.name}`)

        return {
          name: item.name,
          path: `${folder}/${item.name}`,
          url: urlData.publicUrl,
          size: item.metadata?.size || 0,
          type: item.metadata?.mimetype || '',
          created_at: item.created_at,
        }
      })

    // Also check subfolders (year/month structure)
    const subfolders = (data || []).filter(
      (item) => !item.metadata || item.metadata.size === 0
    )

    const subfolderFiles: any[] = []
    for (const sub of subfolders.slice(0, 12)) {
      // Limit subfolder depth
      const subPath = `${folder}/${sub.name}`
      const { data: subData } = await supabase.storage
        .from('blog-images')
        .list(subPath, {
          limit: 50,
          sortBy: { column: 'created_at', order: 'desc' },
        })

      if (subData) {
        // Check for year/month structure (sub-subfolders)
        const subSubfolders = subData.filter(
          (item) => !item.metadata || item.metadata.size === 0
        )

        for (const subSub of subSubfolders.slice(0, 12)) {
          const subSubPath = `${subPath}/${subSub.name}`
          const { data: subSubData } = await supabase.storage
            .from('blog-images')
            .list(subSubPath, {
              limit: 50,
              sortBy: { column: 'created_at', order: 'desc' },
            })

          if (subSubData) {
            for (const file of subSubData.filter(
              (item) => item.metadata && item.metadata.size > 0
            )) {
              const filePath = `${subSubPath}/${file.name}`
              const { data: urlData } = supabase.storage
                .from('blog-images')
                .getPublicUrl(filePath)

              subfolderFiles.push({
                name: file.name,
                path: filePath,
                url: urlData.publicUrl,
                size: file.metadata?.size || 0,
                type: file.metadata?.mimetype || '',
                created_at: file.created_at,
              })
            }
          }
        }

        // Direct files in subfolder
        for (const file of subData.filter(
          (item) => item.metadata && item.metadata.size > 0
        )) {
          const filePath = `${subPath}/${file.name}`
          const { data: urlData } = supabase.storage
            .from('blog-images')
            .getPublicUrl(filePath)

          subfolderFiles.push({
            name: file.name,
            path: filePath,
            url: urlData.publicUrl,
            size: file.metadata?.size || 0,
            type: file.metadata?.mimetype || '',
            created_at: file.created_at,
          })
        }
      }
    }

    // Combine and sort by created_at desc
    const allFiles = [...files, ...subfolderFiles].sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )

    return NextResponse.json({ files: allFiles })
  } catch (error: any) {
    console.error('List error:', error)
    return NextResponse.json(
      { error: error.message || 'List failed' },
      { status: 500 }
    )
  }
}
