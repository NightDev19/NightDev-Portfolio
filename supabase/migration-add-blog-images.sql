-- ============================================
-- Migration: Add blog image storage
-- Run this in Supabase SQL Editor to add:
-- 1. cover_image column to blog_posts table
-- 2. blog-images storage bucket
-- 3. Storage policies
-- ============================================

-- Add cover_image column to blog_posts
ALTER TABLE public.blog_posts
ADD COLUMN IF NOT EXISTS cover_image TEXT;

-- Create the storage bucket for blog images (public, 5MB limit)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'blog-images',
  'blog-images',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
) ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Blog images are publicly viewable" ON storage.objects;
DROP POLICY IF EXISTS "Auth users can upload blog images" ON storage.objects;
DROP POLICY IF EXISTS "Auth users can update blog images" ON storage.objects;
DROP POLICY IF EXISTS "Auth users can delete blog images" ON storage.objects;

-- Storage policies
CREATE POLICY "Blog images are publicly viewable"
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
  USING (bucket_id = 'blog-images' AND auth.role() = 'authenticated');
