'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { MotionWrapper } from '@/components/sections/MotionWrapper'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { contactSchema, type ContactFormData } from '@/features/contact/schemas'
import { submitContactForm } from '@/features/contact/actions'
import { buttonTap } from '@/lib/motion'

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
    <section id="contact" className="py-20 px-4 bg-muted/30">
      <div className="mx-auto max-w-2xl">
        <MotionWrapper>
          <SectionHeader
            title="Get In Touch"
            subtitle="Have a question or want to work together? Send me a message."
          />
        </MotionWrapper>

        <MotionWrapper delay={0.2}>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1.5">
                  Name
                </label>
                <Input
                  id="name"
                  placeholder="Your name"
                  {...register('name')}
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1.5">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  {...register('email')}
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-1.5">
                Subject <span className="text-muted-foreground">(optional)</span>
              </label>
              <Input
                id="subject"
                placeholder="What is this about?"
                {...register('subject')}
                aria-invalid={!!errors.subject}
              />
              {errors.subject && (
                <p className="mt-1 text-sm text-destructive">{errors.subject.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1.5">
                Message
              </label>
              <Textarea
                id="message"
                placeholder="Your message..."
                rows={5}
                {...register('message')}
                aria-invalid={!!errors.message}
              />
              {errors.message && (
                <p className="mt-1 text-sm text-destructive">{errors.message.message}</p>
              )}
            </div>

            <motion.div whileTap={buttonTap}>
              <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
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
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-green-600 dark:text-green-400"
              >
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm">Message sent successfully!</span>
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-destructive"
              >
                <AlertCircle className="h-5 w-5" />
                <span className="text-sm">Failed to send message. Please try again.</span>
              </motion.div>
            )}
          </form>
        </MotionWrapper>
      </div>
    </section>
  )
}
