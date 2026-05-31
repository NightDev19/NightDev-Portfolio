# Sherwin Jefferson Tajan — Developer Portfolio

A full-stack developer portfolio built with Next.js 16, TypeScript, Tailwind CSS, Framer Motion, and Supabase.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Animation**: Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Validation**: Zod
- **Forms**: React Hook Form
- **Icons**: Lucide React

## Getting Started

### 1. Clone and Install

```bash
git clone https://github.com/sherwintajan/portfolio.git
cd portfolio
bun install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to the SQL Editor and run the schema from `supabase/schema.sql`
3. Go to Project Settings > API to get your keys

### 3. Configure Environment Variables

Copy `.env.local` and update with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

**Security**: Never expose `SUPABASE_SERVICE_ROLE_KEY` to the browser. It is only used in server-side code.

### 4. Create an Admin User

1. Go to Supabase Dashboard > Authentication > Users
2. Create a new user with email and password
3. This user will be able to access the admin dashboard at `/admin`

### 5. Run the Development Server

```bash
bun run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the portfolio.

## Project Structure

```
src/
  app/
    (public)/          # Public portfolio pages
      page.tsx         # Home page
      about/           # About page
      projects/        # Projects list + [slug]
      blog/            # Blog list + [slug]
      contact/         # Contact form
      resume/          # Resume page
    (admin)/           # Admin dashboard (protected)
      admin/           # Dashboard, CRUD pages
    api/contact/       # Contact form API route
    auth/callback/     # Supabase auth callback
    layout.tsx         # Root layout with ThemeProvider
    globals.css        # Global styles + CSS variables

  components/
    layout/            # Navbar, Footer
    sections/          # HeroSection, AboutSection, etc.
    ui/                # Reusable components + shadcn/ui

  features/
    projects/          # actions, queries, schemas, types
    blog/              # actions, queries, schemas, types
    skills/            # actions, queries, schemas, types
    experience/        # actions, queries, schemas, types
    contact/           # actions, schemas, types
    auth/              # actions, queries

  lib/
    supabase/          # client.ts, server.ts, admin.ts, middleware.ts
    motion.ts          # Reusable Framer Motion variants
    constants.ts       # Site config, nav links
    utils.ts           # Utility functions

  types/
    database.ts        # Supabase database types
```

## Features

### Public Portfolio
- **Hero Section**: Animated entrance with name, role, and CTA buttons
- **About Section**: Developer profile with skill highlights
- **Skills Section**: Grouped skill cards (Frontend, Backend, Desktop, Databases, DevOps)
- **Projects Section**: Dynamic project cards from Supabase
- **Experience Section**: Timeline-style experience display
- **Blog/Developer Journal**: Technical blog with markdown support
- **Contact Form**: Working form with Zod validation and React Hook Form
- **Resume Page**: Resume display with download button

### Admin Dashboard
- Protected by Supabase Auth
- Dashboard overview with counts
- CRUD for Projects, Blog Posts, Skills, Experience
- View and manage Contact Messages
- Mark messages as read/unread

### Animation (Framer Motion)
- Page fade-in transitions
- Section reveal on scroll
- Card hover animations
- Button hover/tap animations
- Hero text staggered animation
- All animation variants in `lib/motion.ts` for reuse

### SEO
- Next.js metadata API
- OpenGraph and Twitter cards
- Sitemap and robots.txt
- Clean slugs for projects and blog posts

### Performance
- Server Components by default
- Client Components only when needed
- Optimized with next/image
- Controlled Framer Motion usage

## Customization

### Adding Your Resume

Place your resume PDF at `public/resume/sherwin-tajan-resume.pdf`.

### Updating Site Config

Edit `src/lib/constants.ts` to update:
- Your name and role
- Social links (GitHub, LinkedIn, email)
- Navigation links

### Styling

The portfolio uses a dark-mode-first design with CSS variables. Edit `src/app/globals.css` to customize the color scheme.

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js. Make sure to:
1. Set all environment variables
2. Build with `bun run build`
3. Start with `bun run start`

## License

MIT
