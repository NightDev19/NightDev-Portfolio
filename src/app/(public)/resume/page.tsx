'use client'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { motion, Variants } from 'framer-motion'
import { Download, Globe, Linkedin, Mail, MapPin, Phone } from 'lucide-react'

const RESUME_DATA = {
  personalInfo: {
    name: 'Sherwin Jefferson Tajan',
    title: 'Software Engineer',
    summary:
      'Results-driven Software Engineer with nearly 2 years of experience in full-stack development, building modern web and desktop applications using React.js, Next.js, Python, C#, PostgreSQL, and Docker. Proven ability to develop responsive user interfaces, integrate backend services, design RESTful APIs, and collaborate effectively in Agile environments.',
    email: 'sherwinjeffersontajan@gmail.com',
    phone: '09153181689',
    location: 'Sitio Ilog Wawa, Tanauan City, Batangas',
    linkedin: 'linkedin.com/in/sherwintajan',
    website: 'sherwintajan.dev',
  },
  experience: [
    {
      company: 'Code Fusion IT Solutions',
      role: 'Mid Software Engineer',
      period: 'Jul 2025 — May 2026',
      location: 'Sto. Tomas, Batangas',
      description: [
        'Maintained and enhanced a University Library Information Management System (LIMS) using React.js, Python, and PostgreSQL.',
        'Developed cross-platform desktop applications for IoT projects using .NET MAUI and Avalonia.',
        'Designed and integrated RESTful APIs to support seamless communication between frontend applications, backend services, and connected devices.',
        'Collaborated with cross-functional teams to develop, optimize, and troubleshoot full-stack features.',
      ],
    },
    {
      company: 'Innocore Systems Solutions',
      role: 'Junior Software Engineer',
      period: 'May 2025 — Oct 2025',
      location: 'Remote',
      description: [
        'Maintained and enhanced a school monitoring system using Next.js, Tailwind CSS, Supabase, Framer Motion, and shadcn/ui.',
        'Developed and maintained the company website, implementing responsive and user-friendly interfaces.',
        'Collaborated with backend developers to integrate APIs and resolve technical issues across the application stack.',
        'Optimized frontend components and application workflows, improving performance and maintainability.',
      ],
    },
    {
      company: 'Tanauan City Academy',
      role: 'Secondary Teacher',
      period: 'May 2025 — Oct 2025',
      location: 'Tanauan City, Batangas',
      description: [
        'Delivered Senior High School Computer Programming I–IV courses, covering Python, web development, SQL databases, and hardware fundamentals.',
        'Developed instructional materials and practical programming exercises.',
        'Provided technical support to faculty members by troubleshooting network and technology issues.',
        'Guided students in hands-on projects involving programming, database management, and web application development.',
      ],
    },
  ],
  skills: {
    core: ['Web Development', 'Frontend Development', 'Backend Development', 'Software Engineering', 'System Design', 'UI/UX'],
    technical: ['React.js', 'Next.js', 'Python', 'C#', '.NET MAUI', 'Avalonia UI', 'FastAPI', 'Node.js', 'Express', 'RESTful APIs', 'PostgreSQL', 'Supabase', 'MongoDB', 'Docker', 'Git', 'CI/CD', 'RBAC'],
    soft: ['Agile Collaboration', 'Scrum', 'Responsive Design', 'Technical Documentation', 'Mentoring'],
  },
  education: {
    school: 'Batangas State University — JPLCP Campus',
    degree: 'Bachelor of Science in Information Technology',
    period: 'Aug 2020 — Aug 2024',
    location: 'Malvar, Batangas',
  },
  awards: [
    "Dean's Lister, 2nd Year College — 2022",
    "Dean's Lister, 3rd Year College — 2023",
  ],
}

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

export default function ResumePage() {
  return (
    <div className="pt-20">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="py-20 px-6 max-w-3xl mx-auto space-y-10"
      >
        {/* Header */}
        <motion.div variants={fadeIn}>
          <p className="font-mono text-sm text-primary mb-2">Resume</p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {RESUME_DATA.personalInfo.name}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {RESUME_DATA.personalInfo.title}
          </p>

          <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-muted-foreground mt-4">
            <div className="flex items-center gap-1"><Mail className="h-3 w-3" />{RESUME_DATA.personalInfo.email}</div>
            <div className="flex items-center gap-1"><Phone className="h-3 w-3" />{RESUME_DATA.personalInfo.phone}</div>
            <div className="flex items-center gap-1"><MapPin className="h-3 w-3" />{RESUME_DATA.personalInfo.location}</div>
            <div className="flex items-center gap-1"><Linkedin className="h-3 w-3" />{RESUME_DATA.personalInfo.linkedin}</div>
            <div className="flex items-center gap-1"><Globe className="h-3 w-3" />{RESUME_DATA.personalInfo.website}</div>
          </div>
        </motion.div>

        <Separator />

        {/* Summary */}
        <motion.div variants={fadeIn} className="space-y-2">
          <h2 className="text-sm font-semibold uppercase tracking-wider">Professional Summary</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {RESUME_DATA.personalInfo.summary}
          </p>
        </motion.div>

        {/* Experience */}
        <motion.div variants={fadeIn} className="space-y-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider">Experience</h2>
          {RESUME_DATA.experience.map((job, i) => (
            <div key={i}>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                <h3 className="font-medium text-sm">{job.company}</h3>
                <span className="text-xs text-muted-foreground font-mono">{job.period}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-0.5 mb-2">
                <p className="text-sm text-primary">{job.role}</p>
                <span className="text-xs text-muted-foreground">{job.location}</span>
              </div>
              <ul className="list-disc list-outside ml-4 space-y-0.5 text-xs text-muted-foreground leading-relaxed">
                {job.description.map((item, j) => <li key={j}>{item}</li>)}
              </ul>
            </div>
          ))}
        </motion.div>

        {/* Skills */}
        <motion.div variants={fadeIn} className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider">Technical Skills</h2>
          <div className="space-y-3">
            <div>
              <p className="text-xs font-medium mb-1.5">Core</p>
              <div className="flex flex-wrap gap-1.5">
                {RESUME_DATA.skills.core.map((s) => (
                  <span key={s} className="text-[11px] px-2 py-0.5 rounded-md bg-secondary text-muted-foreground">{s}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium mb-1.5">Technologies & Tools</p>
              <div className="flex flex-wrap gap-1.5">
                {RESUME_DATA.skills.technical.map((s) => (
                  <span key={s} className="text-[11px] px-2 py-0.5 rounded-md bg-secondary text-muted-foreground">{s}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium mb-1.5">Soft Skills</p>
              <div className="flex flex-wrap gap-1.5">
                {RESUME_DATA.skills.soft.map((s) => (
                  <span key={s} className="text-[11px] px-2 py-0.5 rounded-md bg-secondary text-muted-foreground">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Education */}
        <motion.div variants={fadeIn} className="space-y-2">
          <h2 className="text-sm font-semibold uppercase tracking-wider">Education</h2>
          <div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
              <h3 className="font-medium text-sm">{RESUME_DATA.education.school}</h3>
              <span className="text-xs text-muted-foreground font-mono">{RESUME_DATA.education.period}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-0.5">
              <p className="text-sm text-muted-foreground">{RESUME_DATA.education.degree}</p>
              <span className="text-xs text-muted-foreground">{RESUME_DATA.education.location}</span>
            </div>
          </div>
        </motion.div>

        {/* Awards */}
        <motion.div variants={fadeIn} className="space-y-2">
          <h2 className="text-sm font-semibold uppercase tracking-wider">Awards</h2>
          <ul className="list-disc list-outside ml-4 space-y-0.5 text-xs text-muted-foreground">
            {RESUME_DATA.awards.map((award, i) => <li key={i}>{award}</li>)}
          </ul>
        </motion.div>

        <div className="pt-4 flex justify-center">
          <Button size="default" className="gap-2" asChild>
            <a href="/resume/sherwin-tajan-resume.pdf" download>
              <Download className="h-4 w-4" />
              Download PDF
            </a>
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
