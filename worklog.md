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
