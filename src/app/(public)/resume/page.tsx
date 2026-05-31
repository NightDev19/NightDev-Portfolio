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
      'Results-driven Software Engineer with nearly 2 years of experience in full-stack development, building modern web and desktop applications using React.js, Next.js, Python, C#, PostgreSQL, and Docker. Proven ability to develop responsive user interfaces, integrate backend services, design RESTful APIs, and collaborate effectively in Agile environments. Seeking opportunities to leverage my software engineering skills to develop scalable, user-focused applications and contribute to high-performing development teams.',
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
        'Maintained and enhanced a University Library Information Management System (LIMS) using React.js, Python, and PostgreSQL, improving system reliability and usability for students and faculty.',
        'Developed cross-platform desktop applications for IoT projects using .NET MAUI and Avalonia, enabling real-time device monitoring and data visualization.',
        'Designed and integrated RESTful APIs to support seamless communication between frontend applications, backend services, and connected devices.',
        'Collaborated with cross-functional teams to develop, optimize, and troubleshoot full-stack features, improving application performance and maintainability.',
      ],
    },
    {
      company: 'Innocore Systems Solutions',
      role: 'Junior Software Engineer',
      period: 'May 2025 — Oct 2025',
      location: 'Remote',
      description: [
        'Maintained and enhanced a school monitoring system using Next.js, Tailwind CSS, Supabase, Framer Motion, and shadcn/ui, supporting attendance tracking, grade management, RFID security, and reporting features.',
        'Developed and maintained the company website, implementing responsive and user-friendly interfaces to improve user experience and accessibility.',
        'Collaborated with backend developers to integrate APIs, implement new features, and resolve technical issues across the application stack.',
        'Optimized frontend components and application workflows, improving performance, maintainability, and overall user experience.',
      ],
    },
    {
      company: 'Tanauan City Academy',
      role: 'Secondary Teacher',
      period: 'May 2025 — Oct 2025',
      location: 'Tanauan City, Batangas',
      description: [
        'Delivered Senior High School Computer Programming I–IV courses, covering Python programming, web development, SQL databases, and computer hardware fundamentals.',
        'Developed instructional materials and practical programming exercises to strengthen students\' technical and problem-solving skills.',
        'Provided technical support to faculty members by troubleshooting network connectivity, software installations, and classroom technology issues.',
        'Guided students in hands-on projects involving programming, database management, and web application development.',
      ],
    },
  ],
  skills: {
    core: 'Web Development, Frontend Development, Backend Development, Software Engineering, System Design, UI/UX',
    technical: 'React.js, Next.js, Python, C#, .NET MAUI, Avalonia UI, FastAPI, Node.js, Express, RESTful APIs, PostgreSQL, Supabase, MongoDB, Docker, Git, CI/CD, Authentication & Authorization (RBAC)',
    soft: 'Agile Team Collaboration, Scrum, Responsive Design, Technical Documentation, Mentoring',
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
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function ResumePage() {
  return (
    <div className="pt-20">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="p-8 md:p-12 space-y-8 max-w-4xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={fadeIn} className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            {RESUME_DATA.personalInfo.name}
          </h1>
          <p className="text-muted-foreground uppercase tracking-widest text-sm">
            {RESUME_DATA.personalInfo.title}
          </p>

          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground pt-2">
            <div className="flex items-center gap-1.5">
              <Mail className="h-4 w-4" />
              <span>{RESUME_DATA.personalInfo.email}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Phone className="h-4 w-4" />
              <span>{RESUME_DATA.personalInfo.phone}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              <span>{RESUME_DATA.personalInfo.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Linkedin className="h-4 w-4" />
              <span>{RESUME_DATA.personalInfo.linkedin}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Globe className="h-4 w-4" />
              <span>{RESUME_DATA.personalInfo.website}</span>
            </div>
          </div>
        </motion.div>

        <Separator />

        {/* Summary */}
        <motion.div variants={fadeIn} className="space-y-3">
          <h2 className="text-xl font-bold text-foreground border-b-2 border-foreground pb-1 inline-block">
            Professional Summary
          </h2>
          <p className="text-card-foreground leading-relaxed text-sm md:text-base">
            {RESUME_DATA.personalInfo.summary}
          </p>
        </motion.div>

        {/* Experience */}
        <motion.div variants={fadeIn} className="space-y-6">
          <h2 className="text-xl font-bold text-foreground border-b-2 border-foreground pb-1 inline-block">
            Experience
          </h2>

          <div className="space-y-6">
            {RESUME_DATA.experience.map((job, index) => (
              <div key={index}>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1 gap-1">
                  <h3 className="text-lg font-bold text-foreground">
                    {job.company}
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    {job.period}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2 gap-1">
                  <p className="text-card-foreground font-medium italic">
                    {job.role}
                  </p>
                  <span className="text-sm text-muted-foreground">
                    {job.location}
                  </span>
                </div>
                <ul className="list-disc list-outside ml-5 space-y-1 text-card-foreground text-sm">
                  {job.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Skills */}
        <motion.div variants={fadeIn} className="space-y-3">
          <h2 className="text-xl font-bold text-foreground border-b-2 border-foreground pb-1 inline-block">
            Technical Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-bold text-foreground block mb-1">
                Core Skills:
              </span>
              <p className="text-card-foreground">
                {RESUME_DATA.skills.core}
              </p>
            </div>
            <div>
              <span className="font-bold text-foreground block mb-1">
                Technologies & Tools:
              </span>
              <p className="text-card-foreground">
                {RESUME_DATA.skills.technical}
              </p>
            </div>
            <div>
              <span className="font-bold text-foreground block mb-1">
                Soft Skills:
              </span>
              <p className="text-card-foreground">
                {RESUME_DATA.skills.soft}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Education */}
        <motion.div variants={fadeIn} className="space-y-3">
          <h2 className="text-xl font-bold text-foreground border-b-2 border-foreground pb-1 inline-block">
            Education
          </h2>
          <div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
              <h3 className="text-lg font-bold text-foreground">
                {RESUME_DATA.education.school}
              </h3>
              <span className="text-sm text-muted-foreground">
                {RESUME_DATA.education.period}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
              <p className="text-card-foreground">
                {RESUME_DATA.education.degree}
              </p>
              <span className="text-sm text-muted-foreground">
                {RESUME_DATA.education.location}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Awards */}
        <motion.div variants={fadeIn} className="space-y-3">
          <h2 className="text-xl font-bold text-foreground border-b-2 border-foreground pb-1 inline-block">
            Awards
          </h2>
          <ul className="list-disc list-outside ml-5 space-y-1 text-card-foreground text-sm">
            {RESUME_DATA.awards.map((award, index) => (
              <li key={index}>{award}</li>
            ))}
          </ul>
        </motion.div>

        <div className="pt-8 flex justify-center">
          <Button className="gap-2" asChild>
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
