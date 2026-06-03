import Link from 'next/link'
import { Github, Linkedin, Mail } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="relative border-t border-border/50">
      {/* Top gradient line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, oklch(0.65 0.16 260 / 30%), oklch(0.7 0.18 300 / 30%), transparent)',
        }}
      />

      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <Link href="/" className="group inline-flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg overflow-hidden bg-primary/10 border border-primary/20 group-hover:bg-primary/15 group-hover:border-primary/30 transition-all duration-200">
                <img
                  src="/icon.svg"
                  alt="NightDev"
                  className="h-6 w-6"
                  aria-hidden="true"
                />
              </div>
              <span className="font-mono text-lg font-semibold tracking-tight group-hover:text-primary transition-colors duration-200">
                {SITE_CONFIG.name}
              </span>
            </Link>
            <p className="text-xs text-muted-foreground mt-2">
              Software Developer / Full Stack Engineer
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8 text-xs text-muted-foreground">
            <Link href="/about" className="hover:text-foreground transition-colors duration-200">About</Link>
            <Link href="/projects" className="hover:text-foreground transition-colors duration-200">Projects</Link>
            <Link href="/blog" className="hover:text-foreground transition-colors duration-200">Blog</Link>
            <Link href="/contact" className="hover:text-foreground transition-colors duration-200">Contact</Link>
          </div>

          {/* Social */}
          <div className="flex items-center gap-2">
            <Link
              href={SITE_CONFIG.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-lg border bg-card hover:border-primary/25 hover:bg-primary/5 text-muted-foreground hover:text-foreground transition-all duration-200"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </Link>
            <Link
              href={SITE_CONFIG.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-lg border bg-card hover:border-primary/25 hover:bg-primary/5 text-muted-foreground hover:text-foreground transition-all duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </Link>
            <Link
              href={SITE_CONFIG.links.email}
              className="flex h-9 w-9 items-center justify-center rounded-lg border bg-card hover:border-primary/25 hover:bg-primary/5 text-muted-foreground hover:text-foreground transition-all duration-200"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border/50 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. Built with Next.js.
        </div>
      </div>
    </footer>
  )
}
