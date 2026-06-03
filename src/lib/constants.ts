export const SITE_CONFIG = {
  name: 'NightDev',
  role: 'Software Developer / Full Stack Developer',
  description:
    'Software developer focused on becoming a professional full stack software engineer. Working across frontend, backend, desktop applications, databases, Docker, DevOps workflows, and technical documentation.',
  url: 'https://sherwintajan.dev',
  ogImage: '/og-image.png',
  links: {
    github: 'https://github.com/sherwintajan',
    linkedin: 'https://linkedin.com/in/sherwintajan',
    email: 'mailto:contact@sherwintajan.dev',
  },
} as const

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
  { label: 'Resume', href: '/resume' },
] as const

export const SKILL_CATEGORIES = [
  'Frontend',
  'Backend',
  'Desktop Development',
  'Databases',
  'DevOps & Tools',
] as const

export const ADMIN_NAV_LINKS = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Projects', href: '/admin/projects' },
  { label: 'Blog', href: '/admin/blog' },
  { label: 'Skills', href: '/admin/skills' },
  { label: 'Experience', href: '/admin/experience' },
  { label: 'Messages', href: '/admin/messages' },
] as const
