---
Task ID: 1
Agent: Main Agent
Task: Fix hydration mismatch and Invalid Server Actions request errors

Work Log:
- Diagnosed hydration mismatch: `toLocaleDateString()` produces "May 31" on server (UTC) vs "June 1" on client (Asia/Manila UTC+8)
- Created `formatDate()` and `formatShortDate()` utility functions in `src/lib/utils.ts` using UTC-based formatting with `timeZone: 'UTC'` to ensure consistent output between server and client
- Updated all 8 files using `toLocaleDateString` to use the new UTC-based formatters
- Diagnosed "Invalid Server Actions request" error — multiple root causes:
  1. `auth/actions.ts` imported browser client (`createBrowserClient`) in a `'use server'` file, corrupting the server action module graph
  2. Middleware `setAll` callback created new `NextResponse` objects that interfered with Server Action POST requests
  3. Blog/project edit pages were `'use client'` components that imported server-only query functions (`getPostById`, `getProjectById`) which use `cookies()` from `next/headers`
  4. `next.config.ts` had invalid `serverActions` key (not supported in Next.js 16.1.3)
- Fixed `auth/actions.ts` to use `createAdminClient` instead of browser client
- Updated middleware to detect Server Action requests (`Next-Action` header) and avoid creating new response objects for them
- Restructured blog and project edit pages: page.tsx is now a server component that fetches data and passes it as props to a new client form component
- Removed invalid `serverActions` config from `next.config.ts`
- Cleared `.next` cache to remove stale action IDs
- Verified dev server starts cleanly without config warnings

Stage Summary:
- All date formatting now uses UTC to prevent hydration mismatches
- Server Actions should now work correctly after fixing: corrupted module graph, middleware interference, invalid config
- Edit pages properly separated into server (data fetching) and client (form handling) components
- Files created: `src/app/(admin)/admin/blog/[id]/edit/edit-form.tsx`, `src/app/(admin)/admin/projects/[id]/edit/edit-form.tsx`
- Files modified: `src/lib/utils.ts`, `src/components/ui/BlogCard.tsx`, `src/components/ui/TimelineItem.tsx`, `src/features/auth/actions.ts`, `src/lib/supabase/middleware.ts`, `next.config.ts`, and 6 admin/public page files for date formatting

---
Task ID: 2
Agent: Main Agent
Task: Add blog image upload with Supabase Storage blob storage

Work Log:
- Added `cover_image TEXT` column to `blog_posts` table in schema.sql
- Created `blog-images` Supabase Storage bucket config in schema.sql (public, 5MB limit, JPEG/PNG/GIF/WebP/SVG)
- Added storage RLS policies (public view, auth upload/update/delete)
- Created migration SQL file for adding to existing database
- Created 3 API routes for client-side image operations:
  - `/api/storage/upload` — POST, handles file upload to Supabase Storage with date-based folder structure (blog/YYYY/MM/timestamp-random.ext)
  - `/api/storage/list` — GET, lists all images in bucket recursively with public URLs
  - `/api/storage/delete` — POST, deletes image by path
- Created `ImageUploader` component with drag & drop, file picker, progress bar, uploaded image list with Insert/Copy URL actions
- Created `ImageGallery` component with searchable grid, hover actions (Insert, Cover, Copy URL, Delete)
- Updated blog types, schemas, and actions to include `cover_image` field
- Updated blog new/edit pages with: cover image preview/selector, ImageGallery browser, ImageUploader section, insert-to-content functionality
- Updated public BlogCard and blog detail page to display cover images
- Updated fallback data with `cover_image: null`
- Configured Next.js `images.remotePatterns` for Supabase storage CDN

Stage Summary:
- Full blog image upload system using Supabase Storage as blob storage
- Images stored in `blog-images` bucket with date-based folder structure
- Public CDN URLs for fast delivery
- Cover image support for blog posts
- Insert images directly into markdown content from editor
- Browse existing image library and manage (delete, copy URL)
- Migration SQL provided for existing databases
