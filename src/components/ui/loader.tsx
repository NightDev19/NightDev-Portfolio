'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LETTERS = ['N', 'i', 'g', 'h', 't', 'D', 'e', 'v']

export function SplashScreen({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [show, setShow] = useState(true)

  useEffect(() => {
    const minDuration = 2200
    const timer = setTimeout(() => setLoading(false), minDuration)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence onExitComplete={() => setShow(false)}>
        {loading && (
          <motion.div
            key="splash"
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <div className="flex flex-col items-center gap-8">
              {/* Monogram with staggered letter reveal */}
              <div className="flex items-center gap-0">
                {LETTERS.map((letter, i) => (
                  <motion.span
                    key={`${letter}-${i}`}
                    className={`font-mono text-3xl font-semibold tracking-tight ${i < 5 ? 'text-foreground' : 'text-primary'}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.35,
                      delay: 0.2 + i * 0.06,
                      ease: 'easeOut',
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>

              {/* Line that draws itself */}
              <div className="relative w-20 h-px bg-muted">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{
                    duration: 1.4,
                    delay: 0.6,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                />
              </div>

              {/* Subtle loading text */}
              <motion.p
                className="font-mono text-xs text-muted-foreground tracking-widest uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.6, 0.4, 0.6] }}
                transition={{
                  duration: 2,
                  delay: 0.8,
                  ease: 'easeInOut',
                }}
              >
                loading<span className="animate-ellipsis" />
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ visibility: show ? 'hidden' : 'visible' }}>
        {children}
      </div>
    </>
  )
}

export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = { sm: 'h-5 w-5', md: 'h-8 w-8', lg: 'h-12 w-12' }

  return (
    <div className="flex items-center justify-center p-4">
      <svg className={`${sizes[size]} animate-spin`} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="opacity-20" />
        <path d="M12 2a10 10 0 0 1 10 10" stroke="oklch(0.65 0.16 260)" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  )
}

/**
 * Inline spinner for use inside buttons, cards, etc.
 */
export function InlineSpinner({ className }: { className?: string }) {
  return (
    <svg
      className={className ?? 'h-4 w-4 animate-spin'}
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="opacity-20"
      />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  )
}
