'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'
import { NAV_LINKS, SITE_CONFIG } from '@/lib/constants'
import { Button } from '@/components/ui/button'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const prevPathname = useRef(pathname)

  useEffect(() => {
    const handleScroll = () => {
      queueMicrotask(() => setScrolled(window.scrollY > 20))
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    queueMicrotask(() => setMounted(true))
  }, [])

  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname
      queueMicrotask(() => setIsOpen(false))
    }
  }, [pathname])

  const isActive = useCallback(
    (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href)),
    [pathname]
  )

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'glass-nav border-b border-border/50 shadow-sm shadow-primary/5'
          : 'bg-transparent'
      )}
    >
      <nav className="mx-auto max-w-5xl px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2.5">
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

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative px-3.5 py-2 rounded-lg text-sm transition-all duration-200',
                  isActive(link.href)
                    ? 'text-foreground font-medium bg-secondary/60'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/40'
                )}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-2 right-2 h-[2px] bg-gradient-to-r from-primary via-purple-500 to-primary rounded-full"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            ))}

            {/* Divider */}
            <div className="w-px h-5 bg-border/50 mx-1.5" />

            {/* Theme toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/40 transition-all duration-200"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {theme === 'dark' ? (
                    <motion.div
                      key="sun"
                      initial={{ y: -8, opacity: 0, rotate: -90 }}
                      animate={{ y: 0, opacity: 1, rotate: 0 }}
                      exit={{ y: 8, opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun className="h-4 w-4" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ y: -8, opacity: 0, rotate: -90 }}
                      animate={{ y: 0, opacity: 1, rotate: 0 }}
                      exit={{ y: 8, opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon className="h-4 w-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/40 transition-all duration-200"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation menu"
              className="hover:bg-secondary/40"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden border-t border-border/50"
            >
              <div className="py-4 space-y-1 glass rounded-b-xl">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'block px-4 py-2.5 rounded-lg text-sm transition-all duration-200',
                      isActive(link.href)
                        ? 'text-foreground font-medium bg-secondary/60'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/40'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
