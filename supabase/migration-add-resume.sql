-- ============================================
-- Resume Tables Migration
-- Adds resume_sections table for editable resume data
-- ============================================

-- ============================================
-- Resume Sections Table
-- Stores different sections of the resume:
--   - personal_info (single row)
--   - experience (multiple rows)
--   - education (multiple rows)
--   - awards (multiple rows)
-- Each row has a section_type + flexible JSONB data field
-- ============================================
CREATE TABLE public.resume_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_type TEXT NOT NULL,  -- 'personal_info', 'experience', 'education', 'awards'
  title TEXT,                   -- Display title / company name / school name
  subtitle TEXT,                -- Role / degree
  description TEXT,             -- Summary / job description
  metadata JSONB DEFAULT '{}', -- Flexible field: location, dates, links, items, etc.
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Updated At Trigger for resume_sections
-- ============================================
CREATE TRIGGER update_resume_sections_updated_at
  BEFORE UPDATE ON public.resume_sections
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- Row Level Security (RLS)
-- ============================================
ALTER TABLE public.resume_sections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Resume sections viewable" ON public.resume_sections FOR SELECT USING (true);
CREATE POLICY "Auth users insert resume sections" ON public.resume_sections FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth users update resume sections" ON public.resume_sections FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth users delete resume sections" ON public.resume_sections FOR DELETE USING (auth.role() = 'authenticated');

-- ============================================
-- Seed Data: Personal Info
-- ============================================
INSERT INTO public.resume_sections (section_type, title, subtitle, description, metadata, order_index) VALUES
  (
    'personal_info',
    'Sherwin Jefferson Tajan',
    'Software Engineer',
    'Results-driven Software Engineer with nearly 2 years of experience in full-stack development, building modern web and desktop applications using React.js, Next.js, Python, C#, PostgreSQL, and Docker. Proven ability to develop responsive user interfaces, integrate backend services, design RESTful APIs, and collaborate effectively in Agile environments.',
    '{"email": "sherwinjeffersontajan@gmail.com", "phone": "09153181689", "location": "Sitio Ilog Wawa, Tanauan City, Batangas", "linkedin": "linkedin.com/in/sherwintajan", "website": "sherwintajan.dev"}'::jsonb,
    0
  );

-- ============================================
-- Seed Data: Experience
-- ============================================
INSERT INTO public.resume_sections (section_type, title, subtitle, description, metadata, order_index) VALUES
  (
    'experience',
    'Code Fusion IT Solutions',
    'Mid Software Engineer',
    'Maintained and enhanced a University Library Information Management System (LIMS) using React.js, Python, and PostgreSQL. Developed cross-platform desktop applications for IoT projects using .NET MAUI and Avalonia. Designed and integrated RESTful APIs to support seamless communication between frontend applications, backend services, and connected devices. Collaborated with cross-functional teams to develop, optimize, and troubleshoot full-stack features.',
    '{"start_date": "2025-07-01", "end_date": "2026-05-01", "location": "Sto. Tomas, Batangas", "tech_stack": ["React.js", "Python", "PostgreSQL", ".NET MAUI", "Avalonia", "RESTful APIs", "Docker"]}'::jsonb,
    1
  ),
  (
    'experience',
    'Innocore Systems Solutions',
    'Junior Software Engineer',
    'Maintained and enhanced a school monitoring system using Next.js, Tailwind CSS, Supabase, Framer Motion, and shadcn/ui. Developed and maintained the company website, implementing responsive and user-friendly interfaces. Collaborated with backend developers to integrate APIs and resolve technical issues across the application stack. Optimized frontend components and application workflows, improving performance and maintainability.',
    '{"start_date": "2025-05-01", "end_date": "2025-10-01", "location": "Remote", "tech_stack": ["Next.js", "Tailwind CSS", "Supabase", "Framer Motion", "shadcn/ui", "RESTful APIs"]}'::jsonb,
    2
  ),
  (
    'experience',
    'Tanauan City Academy',
    'Secondary Teacher',
    'Delivered Senior High School Computer Programming I–IV courses, covering Python, web development, SQL databases, and hardware fundamentals. Developed instructional materials and practical programming exercises. Provided technical support to faculty members by troubleshooting network and technology issues. Guided students in hands-on projects involving programming, database management, and web application development.',
    '{"start_date": "2025-05-01", "end_date": "2025-10-01", "location": "Tanauan City, Batangas", "tech_stack": ["Python", "Web Development", "SQL", "Computer Hardware", "Teaching"]}'::jsonb,
    3
  );

-- ============================================
-- Seed Data: Education
-- ============================================
INSERT INTO public.resume_sections (section_type, title, subtitle, description, metadata, order_index) VALUES
  (
    'education',
    'Batangas State University — JPLCP Campus',
    'Bachelor of Science in Information Technology',
    NULL,
    '{"start_date": "2020-08-01", "end_date": "2024-08-01", "location": "Malvar, Batangas"}'::jsonb,
    1
  );

-- ============================================
-- Seed Data: Awards
-- ============================================
INSERT INTO public.resume_sections (section_type, title, subtitle, description, metadata, order_index) VALUES
  (
    'awards',
    'Dean''s Lister, 2nd Year College',
    NULL,
    NULL,
    '{"year": "2022"}'::jsonb,
    1
  ),
  (
    'awards',
    'Dean''s Lister, 3rd Year College',
    NULL,
    NULL,
    '{"year": "2023"}'::jsonb,
    2
  );

-- ============================================
-- Seed Data: Skills (for resume skills section)
-- ============================================
INSERT INTO public.resume_sections (section_type, title, subtitle, description, metadata, order_index) VALUES
  (
    'skills',
    'Technical Skills',
    NULL,
    NULL,
    '{"core": ["Web Development", "Frontend Development", "Backend Development", "Software Engineering", "System Design", "UI/UX"], "technical": ["React.js", "Next.js", "Python", "C#", ".NET MAUI", "Avalonia UI", "FastAPI", "Node.js", "Express", "RESTful APIs", "PostgreSQL", "Supabase", "MongoDB", "Docker", "Git", "CI/CD", "RBAC"], "soft": ["Agile Collaboration", "Scrum", "Responsive Design", "Technical Documentation", "Mentoring"]}'::jsonb,
    0
  );
