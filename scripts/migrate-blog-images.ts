#!/usr/bin/env bun
/**
 * Blog Image Storage Migration Script
 * 
 * This script creates the Supabase Storage bucket and checks the database
 * for the cover_image column. Run with: bun run scripts/migrate-blog-images.ts
 * 
 * Required environment variables:
 * - NEXT_PUBLIC_SUPABASE_URL
 * - SUPABASE_SERVICE_ROLE_KEY
 */

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('❌ Missing environment variables!')
  console.error('')
  console.error('Please set these environment variables:')
  console.error('  NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co')
  console.error('  SUPABASE_SERVICE_ROLE_KEY=eyJ...')
  console.error('')
  console.error('You can find them in: Supabase Dashboard → Settings → API')
  console.error('')
  console.error('Then run:')
  console.error('  NEXT_PUBLIC_SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... bun run scripts/migrate-blog-images.ts')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY)

async function migrate() {
  console.log('🚀 Running Blog Image Storage Migration...\n')

  // Step 1: Create storage bucket
  console.log('📦 Step 1: Creating blog-images storage bucket...')
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
      console.log('   ✅ Bucket already exists (blog-images)')
    } else {
      console.log('   ❌ Error creating bucket:', bucketError.message)
    }
  } else {
    console.log('   ✅ Bucket created successfully (blog-images)')
  }

  // Step 2: Update bucket to ensure it's public with correct settings
  console.log('\n📦 Step 2: Updating bucket settings...')
  const { error: updateError } = await supabase.storage.updateBucket('blog-images', {
    public: true,
    fileSizeLimit: 5242880,
    allowedMimeTypes: [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/svg+xml',
    ],
  })

  if (updateError) {
    console.log('   ⚠️  Could not update bucket settings:', updateError.message)
  } else {
    console.log('   ✅ Bucket settings updated (public, 5MB limit)')
  }

  // Step 3: Check if cover_image column exists
  console.log('\n📋 Step 3: Checking cover_image column...')
  const { error: checkError } = await supabase
    .from('blog_posts')
    .select('cover_image')
    .limit(1)

  if (checkError) {
    if (checkError.message.includes('column') && checkError.message.includes('does not exist')) {
      console.log('   ⚠️  cover_image column does NOT exist')
      console.log('')
      console.log('   Run this SQL in the Supabase SQL Editor:')
      console.log('   ────────────────────────────────────────')
      console.log('   ALTER TABLE public.blog_posts ADD COLUMN cover_image TEXT;')
      console.log('   ────────────────────────────────────────')
    } else {
      console.log('   ❌ Error checking column:', checkError.message)
    }
  } else {
    console.log('   ✅ cover_image column exists')
  }

  // Step 4: Verify bucket access by listing files
  console.log('\n🔍 Step 4: Verifying bucket access...')
  const { data: listData, error: listError } = await supabase.storage
    .from('blog-images')
    .list('', { limit: 10 })

  if (listError) {
    console.log('   ❌ Cannot access bucket:', listError.message)
    console.log('   ⚠️  You may need to set up storage policies in the SQL Editor:')
    console.log('')
    console.log('   Run this SQL in the Supabase SQL Editor:')
    console.log('   ────────────────────────────────────────')
    console.log(`   CREATE POLICY "Blog images are publicly viewable"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'blog-images');

CREATE POLICY "Auth users can upload blog images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'blog-images' AND auth.role() = 'authenticated');

CREATE POLICY "Auth users can update blog images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'blog-images' AND auth.role() = 'authenticated');

CREATE POLICY "Auth users can delete blog images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'blog-images' AND auth.role() = 'authenticated');`)
    console.log('   ────────────────────────────────────────')
  } else {
    console.log(`   ✅ Bucket is accessible, contains ${(listData || []).length} items`)
  }

  // Step 5: Test upload
  console.log('\n🧪 Step 5: Testing upload...')
  const testContent = new TextEncoder().encode('migration test - delete me')
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('blog-images')
    .upload('_migration-test.txt', testContent, {
      contentType: 'text/plain',
      upsert: true,
    })

  if (uploadError) {
    console.log('   ❌ Upload test failed:', uploadError.message)
    console.log('   ⚠️  Storage policies may need to be set (see SQL above)')
  } else {
    console.log('   ✅ Upload test passed!')

    // Clean up test file
    const { error: deleteError } = await supabase.storage
      .from('blog-images')
      .remove(['_migration-test.txt'])

    if (!deleteError) {
      console.log('   ✅ Test file cleaned up')
    }
  }

  console.log('\n✨ Migration complete!')
  console.log('')
  console.log('If any steps showed ⚠️ or ❌, run the SQL statements above')
  console.log('in the Supabase Dashboard → SQL Editor.')
}

migrate().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
