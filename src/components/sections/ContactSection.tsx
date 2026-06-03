'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Send, CheckCircle, AlertCircle, Mail, MapPin, Github, Linkedin, ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { MotionWrapper } from '@/components/sections/MotionWrapper'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { contactSchema, type ContactFormData } from '@/features/contact/schemas'
import { submitContactForm } from '@/features/contact/actions'
import { SITE_CONFIG } from '@/lib/constants'
import Link from 'next/link'

export function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  async function onSubmit(data: ContactFormData) {
    const result = await submitContactForm(data)
    if (result.success) {
      setStatus('success')
      reset()
      setTimeout(() => setStatus('idle'), 5000)
    } else {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  return (
    <section id="contact" className="py-28 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl">
        <MotionWrapper>
          <SectionHeader
            label="Contact"
            title="Get In Touch"
            subtitle="Have a question or want to work together? Send me a message."
          />
        </MotionWrapper>

        <div className="mt-10 grid gap-8 md:grid-cols-5">
          {/* Info Card */}
          <MotionWrapper className="md:col-span-2" delay={0.1}>
            <div className="rounded-xl border bg-card/80 backdrop-blur-sm p-6 h-full overflow-hidden relative">
              {/* Top gradient accent */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-primary/40 via-purple-500/40 to-primary/40" />

              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                I&apos;m always open to new opportunities, interesting projects, or just a friendly chat about tech.
              </p>

              <div className="space-y-4">
                <a
                  href={SITE_CONFIG.links.email}
                  className="group flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 border border-primary/10 group-hover:bg-primary/15 group-hover:border-primary/20 transition-all duration-200">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">Email</p>
                    <p className="font-medium text-foreground/80 group-hover:text-foreground">contact@sherwintajan.dev</p>
                  </div>
                </a>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 border border-primary/10">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">Location</p>
                    <p className="font-medium text-foreground/80">Batangas, Philippines</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-6 mt-6 border-t border-border/50">
                <Link
                  href={SITE_CONFIG.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-9 w-9 items-center justify-center rounded-lg border bg-card hover:border-primary/25 hover:bg-primary/5 text-muted-foreground hover:text-foreground transition-all duration-200"
                  aria-label="GitHub"
                >
                  <Github className="h-4 w-4" />
                </Link>
                <Link
                  href={SITE_CONFIG.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-9 w-9 items-center justify-center rounded-lg border bg-card hover:border-primary/25 hover:bg-primary/5 text-muted-foreground hover:text-foreground transition-all duration-200"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </MotionWrapper>

          {/* Form Card */}
          <MotionWrapper className="md:col-span-3" delay={0.15}>
            <form onSubmit={handleSubmit(onSubmit)} className="rounded-xl border bg-card/80 backdrop-blur-sm p-6 overflow-hidden relative">
              {/* Top gradient accent */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-primary/40 via-purple-500/40 to-primary/40" />

              <div className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-xs font-medium mb-2 text-foreground/80">Name</label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      className="text-sm bg-secondary/40 border-border/50 focus:border-primary/40 focus:bg-secondary/60 transition-all"
                      {...register('name')}
                      aria-invalid={!!errors.name}
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-xs text-destructive">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-medium mb-2 text-foreground/80">Email</label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="text-sm bg-secondary/40 border-border/50 focus:border-primary/40 focus:bg-secondary/60 transition-all"
                      {...register('email')}
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-destructive">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-medium mb-2 text-foreground/80">
                    Subject <span className="text-muted-foreground">(optional)</span>
                  </label>
                  <Input
                    id="subject"
                    placeholder="What is this about?"
                    className="text-sm bg-secondary/40 border-border/50 focus:border-primary/40 focus:bg-secondary/60 transition-all"
                    {...register('subject')}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-medium mb-2 text-foreground/80">Message</label>
                  <Textarea
                    id="message"
                    placeholder="Your message..."
                    rows={4}
                    className="text-sm bg-secondary/40 border-border/50 focus:border-primary/40 focus:bg-secondary/60 transition-all resize-none"
                    {...register('message')}
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-destructive">{errors.message.message}</p>
                  )}
                </div>

                <motion.div whileTap={{ scale: 0.98 }}>
                  <Button type="submit" size="lg" disabled={isSubmitting} className="w-full glow-primary-sm hover:glow-primary transition-shadow duration-300">
                    {isSubmitting ? (
                      'Sending...'
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </motion.div>

                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-green-600 dark:text-green-400"
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm">Message sent successfully!</span>
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-destructive"
                  >
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm">Failed to send message. Please try again.</span>
                  </motion.div>
                )}
              </div>
            </form>
          </MotionWrapper>
        </div>
      </div>
    </section>
  )
}
