'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="text-center"
      >
        {/* Large 404 with layered typography */}
        <div className="relative mb-6">
          <motion.span
            className="block font-mono text-[8rem] sm:text-[10rem] md:text-[12rem] font-bold leading-none tracking-tighter text-foreground/5 select-none"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            404
          </motion.span>
          <motion.span
            className="absolute inset-0 flex items-center justify-center font-mono text-[8rem] sm:text-[10rem] md:text-[12rem] font-bold leading-none tracking-tighter text-foreground/10 select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            404
          </motion.span>
        </div>

        {/* Divider line */}
        <motion.div
          className="mx-auto mb-6 h-px w-12 bg-primary"
          initial={{ width: 0 }}
          animate={{ width: 48 }}
          transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
        />

        {/* Message */}
        <motion.p
          className="text-lg font-medium text-foreground mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Page not found
        </motion.p>

        <motion.p
          className="text-sm text-muted-foreground max-w-xs mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </motion.p>

        {/* Navigation */}
        <motion.div
          className="mt-8 flex items-center justify-center gap-3"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Button asChild size="default">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Home
            </Link>
          </Button>
          <Button variant="outline" size="default" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}
