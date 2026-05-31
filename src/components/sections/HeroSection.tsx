'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Download, Mail } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { heroTextContainer, heroTextItem, buttonTap } from '@/lib/motion'
import { SITE_CONFIG } from '@/lib/constants'

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-4">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5 -z-10" />

      <motion.div
        variants={heroTextContainer}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-4xl text-center"
      >
        {/* Greeting */}
        <motion.div variants={heroTextItem} className="mb-4">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            Hello, I&apos;m
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={heroTextItem}
          className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {SITE_CONFIG.name}
        </motion.h1>

        {/* Role */}
        <motion.p
          variants={heroTextItem}
          className="mt-4 text-xl text-muted-foreground sm:text-2xl md:text-3xl"
        >
          {SITE_CONFIG.role}
        </motion.p>

        {/* Description */}
        <motion.p
          variants={heroTextItem}
          className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground leading-relaxed sm:text-lg"
        >
          {SITE_CONFIG.description}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={heroTextItem}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.div whileTap={buttonTap}>
            <Button asChild size="lg">
              <Link href="/projects">View Projects</Link>
            </Button>
          </motion.div>
          <motion.div whileTap={buttonTap}>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">
                <Mail className="mr-2 h-4 w-4" />
                Contact Me
              </Link>
            </Button>
          </motion.div>
          <motion.div whileTap={buttonTap}>
            <Button asChild variant="outline" size="lg">
              <Link href="/resume">
                <Download className="mr-2 h-4 w-4" />
                Resume
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="h-5 w-5 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  )
}
