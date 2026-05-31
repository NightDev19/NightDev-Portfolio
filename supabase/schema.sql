-- ============================================
-- Sherwin Jefferson Tajan Portfolio - Supabase Schema
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- Profiles Table
-- ============================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  role TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Projects Table
-- ============================================
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  tech_stack TEXT[] NOT NULL,
  github_url TEXT,
  demo_url TEXT,
  image_url TEXT,
  featured BOOLEAN DEFAULT FALSE,
  published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Blog Posts Table
-- ============================================
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  tags TEXT[],
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Skills Table
-- ============================================
CREATE TABLE IF NOT EXISTS public.skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  level TEXT,
  icon TEXT,
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Experiences Table
-- ============================================
CREATE TABLE IF NOT EXISTS public.experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  organization TEXT,
  description TEXT NOT NULL,
  tech_stack TEXT[],
  start_date DATE,
  end_date DATE,
  current BOOLEAN DEFAULT FALSE,
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Contact Messages Table
-- ============================================
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Updated At Trigger Function
-- ============================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- Row Level Security (RLS) Policies
-- ============================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Profiles
CREATE POLICY "Profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Projects
CREATE POLICY "Published projects viewable" ON public.projects FOR SELECT USING (published = true OR auth.role() = 'authenticated');
CREATE POLICY "Auth users insert projects" ON public.projects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth users update projects" ON public.projects FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth users delete projects" ON public.projects FOR DELETE USING (auth.role() = 'authenticated');

-- Blog Posts
CREATE POLICY "Published posts viewable" ON public.blog_posts FOR SELECT USING (published = true OR auth.role() = 'authenticated');
CREATE POLICY "Auth users insert posts" ON public.blog_posts FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth users update posts" ON public.blog_posts FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth users delete posts" ON public.blog_posts FOR DELETE USING (auth.role() = 'authenticated');

-- Skills
CREATE POLICY "Skills viewable" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Auth users insert skills" ON public.skills FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth users update skills" ON public.skills FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth users delete skills" ON public.skills FOR DELETE USING (auth.role() = 'authenticated');

-- Experiences
CREATE POLICY "Experiences viewable" ON public.experiences FOR SELECT USING (true);
CREATE POLICY "Auth users insert experiences" ON public.experiences FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth users update experiences" ON public.experiences FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth users delete experiences" ON public.experiences FOR DELETE USING (auth.role() = 'authenticated');

-- Contact Messages: anyone can insert, only auth can read
CREATE POLICY "Anyone insert messages" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Auth users view messages" ON public.contact_messages FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Auth users update messages" ON public.contact_messages FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth users delete messages" ON public.contact_messages FOR DELETE USING (auth.role() = 'authenticated');

-- ============================================
-- Seed Data: Skills
-- ============================================
INSERT INTO public.skills (name, category, level, order_index) VALUES
  ('React', 'Frontend', 'Intermediate', 1),
  ('Next.js', 'Frontend', 'Intermediate', 2),
  ('Vue 3', 'Frontend', 'Beginner', 3),
  ('TypeScript', 'Frontend', 'Intermediate', 4),
  ('JavaScript', 'Frontend', 'Intermediate', 5),
  ('Tailwind CSS', 'Frontend', 'Intermediate', 6),
  ('Responsive UI', 'Frontend', 'Intermediate', 7),
  ('UI/UX Improvement', 'Frontend', 'Intermediate', 8),
  ('Python', 'Backend', 'Intermediate', 9),
  ('FastAPI', 'Backend', 'Intermediate', 10),
  ('Django', 'Backend', 'Beginner', 11),
  ('Node.js', 'Backend', 'Intermediate', 12),
  ('Express', 'Backend', 'Intermediate', 13),
  ('C#', 'Backend', 'Intermediate', 14),
  ('.NET 8', 'Backend', 'Intermediate', 15),
  ('ASP.NET Core', 'Backend', 'Beginner', 16),
  ('Avalonia UI', 'Desktop Development', 'Intermediate', 17),
  ('MVVM', 'Desktop Development', 'Intermediate', 18),
  ('CommunityToolkit.Mvvm', 'Desktop Development', 'Intermediate', 19),
  ('SQLite', 'Desktop Development', 'Intermediate', 20),
  ('Entity Framework Core', 'Desktop Development', 'Intermediate', 21),
  ('Supabase', 'Databases', 'Intermediate', 22),
  ('PostgreSQL', 'Databases', 'Intermediate', 23),
  ('MongoDB', 'Databases', 'Beginner', 24),
  ('Redis', 'Databases', 'Beginner', 25),
  ('Docker', 'DevOps & Tools', 'Intermediate', 26),
  ('Docker Compose', 'DevOps & Tools', 'Intermediate', 27),
  ('Git', 'DevOps & Tools', 'Intermediate', 28),
  ('GitHub', 'DevOps & Tools', 'Intermediate', 29),
  ('Linux Fedora', 'DevOps & Tools', 'Intermediate', 30),
  ('VS Code', 'DevOps & Tools', 'Advanced', 31),
  ('Zed', 'DevOps & Tools', 'Beginner', 32),
  ('Postman', 'DevOps & Tools', 'Intermediate', 33);

-- ============================================
-- Seed Data: Projects
-- ============================================
INSERT INTO public.projects (title, slug, description, tech_stack, github_url, featured, published) VALUES
  (
    'Project Chameleon',
    'project-chameleon',
    'A desktop application built with Avalonia UI and .NET 8 featuring authentication, RBAC sidebar permissions, dashboard cards, device info, sensor pages, profile management, notifications, activity log, SQLite database with EF Core migrations, and responsive layout improvements.',
    ARRAY['Avalonia UI', '.NET 8', 'C#', 'SQLite', 'EF Core', 'MVVM', 'CommunityToolkit.Mvvm'],
    'https://github.com/sherwintajan/project-chameleon',
    true, true
  ),
  (
    'Docker Learning Project',
    'docker-learning-project',
    'A full-stack Docker setup demonstrating containerized frontend, backend FastAPI, MongoDB, Docker Compose orchestration, environment variable management, startup order control, container networking, and volume usage for persistent data.',
    ARRAY['Docker', 'Docker Compose', 'FastAPI', 'MongoDB', 'Python', 'Container Networking'],
    'https://github.com/sherwintajan/docker-learning',
    true, true
  ),
  (
    'Node.js OAuth Project',
    'nodejs-oauth-project',
    'Authentication experiment implementing Google OAuth and GitHub OAuth strategies using Node.js, Express, and Appwrite as the backend authentication service.',
    ARRAY['Node.js', 'Express', 'Appwrite', 'Google OAuth', 'GitHub OAuth'],
    'https://github.com/sherwintajan/nodejs-oauth',
    false, true
  );

-- ============================================
-- Seed Data: Experiences
-- ============================================
INSERT INTO public.experiences (title, organization, description, tech_stack, start_date, current, order_index) VALUES
  (
    'Project Chameleon - Desktop Application Developer',
    'Personal Project',
    'Built a full-featured desktop application using Avalonia UI and .NET 8. Implemented login page with authentication, RBAC sidebar permissions, dashboard with interactive cards, device information pages, sensor monitoring, profile management, notifications system, and activity logging. Used SQLite with Entity Framework Core for data persistence and applied MVVM architecture with CommunityToolkit.Mvvm.',
    ARRAY['Avalonia UI', '.NET 8', 'C#', 'SQLite', 'EF Core', 'MVVM'],
    '2024-06-01', true, 1
  ),
  (
    'Docker Compose Learning - DevOps',
    'Self-Directed Learning',
    'Designed and implemented a full-stack Docker environment with multiple containers including frontend, FastAPI backend, and MongoDB. Configured Docker Compose for service orchestration, managed environment variables, controlled startup order, implemented container networking, and used volumes for persistent data storage.',
    ARRAY['Docker', 'Docker Compose', 'FastAPI', 'MongoDB'],
    '2024-03-01', false, 2
  ),
  (
    'OAuth Authentication - Backend Development',
    'Self-Directed Learning',
    'Experimented with authentication strategies using Node.js and Express with Appwrite as the auth provider. Implemented Google OAuth and GitHub OAuth login flows, understanding token management and session handling.',
    ARRAY['Node.js', 'Express', 'Appwrite', 'OAuth'],
    '2024-01-01', false, 3
  ),
  (
    'UI/UX Improvements & Responsive Design',
    'Personal Projects',
    'Focused on improving user interfaces across personal projects. Applied responsive design principles, fixed layout issues, improved accessibility, and enhanced overall user experience in desktop and web applications.',
    ARRAY['Tailwind CSS', 'Avalonia UI', 'Responsive Design', 'UI/UX'],
    '2024-01-01', true, 4
  ),
  (
    'Backend Authentication & RBAC Implementation',
    'Personal Projects',
    'Implemented authentication systems and role-based access control for desktop applications. Designed permission structures, created user roles, and built secure access management systems.',
    ARRAY['C#', '.NET 8', 'RBAC', 'Authentication', 'EF Core'],
    '2024-04-01', true, 5
  );

-- ============================================
-- Seed Data: Blog Posts
-- ============================================
INSERT INTO public.blog_posts (title, slug, excerpt, content, tags, published) VALUES
  (
    'Getting Started with Docker Compose',
    'getting-started-with-docker-compose',
    'A practical guide to understanding Docker Compose for multi-container applications, covering service definition, networking, volumes, and environment configuration.',
    '# Getting Started with Docker Compose\n\nDocker Compose is a tool for defining and running multi-container Docker applications. With Compose, you use a YAML file to configure your application''s services, networks, and volumes.\n\n## Why Docker Compose?\n\nWhen building full-stack applications, you typically need multiple services running together. Docker Compose lets you define your entire stack in a single file.\n\n## Core Concepts\n\n### Services\nEach service represents a container with its image, ports, and environment.\n\n### Networks\nCompose creates a default network allowing services to communicate using service names.\n\n### Volumes\nVolumes provide persistent storage for your containers.',
    ARRAY['Docker', 'DevOps', 'Containers'], true
  ),
  (
    'Understanding RBAC in Desktop Applications',
    'understanding-rbac-in-desktop-apps',
    'Exploring how Role-Based Access Control works in desktop applications using .NET 8 and Avalonia UI.',
    '# Understanding RBAC in Desktop Applications\n\nRole-Based Access Control restricts system access based on user roles. In desktop applications, RBAC manages what features different users can access.\n\n## Why RBAC Matters\n\nWithout RBAC, every user has the same access level, which is both a security risk and a usability problem.\n\n## Implementation in .NET 8\n\n1. Define roles and permissions\n2. Map permissions to roles\n3. Bind UI visibility to permissions\n4. Enforce permissions on the backend',
    ARRAY['RBAC', '.NET 8', 'Avalonia UI', 'Authentication'], true
  );
