'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Full-page splash screen shown on initial site load.
 * Stays visible for at least `minDuration` ms, then fades out smoothly.
 */
export function SplashScreen({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [show, setShow] = useState(true)

  useEffect(() => {
    // Minimum time the splash is visible (ms)
    const minDuration = 2800

    // Mark content as ready after minimum duration
    const timer = setTimeout(() => {
      setLoading(false)
    }, minDuration)

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
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
            <div className="flex flex-col items-center gap-8">
              {/* Animated SVG Logo */}
              <SplashLogo />

              {/* Loading bar */}
              <div className="w-52 h-1 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: 'oklch(0.65 0.18 260)' }}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2.5, ease: 'easeInOut' }}
                />
              </div>

              {/* Loading text */}
              <motion.p
                className="text-sm text-muted-foreground tracking-widest uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                Loading
              </motion.p>
            </div>

            {/* Background particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {PARTICLES.map((p, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: p.size,
                    height: p.size,
                    backgroundColor: 'oklch(0.65 0.18 260)',
                    left: p.x,
                    top: p.y,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    opacity: [0.15, 0.4, 0.15],
                  }}
                  transition={{
                    duration: p.duration,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: p.delay,
                  }}
                />
              ))}
            </div>

            {/* Subtle grid lines */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                    <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actual page content — hidden behind splash while loading */}
      <div style={{ visibility: show ? 'hidden' : 'visible' }}>
        {children}
      </div>
    </>
  )
}

/** The animated SJT logo used in the splash screen */
function SplashLogo() {
  return (
    <div className="relative">
      <svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer spinning ring */}
        <motion.circle
          cx="40"
          cy="40"
          r="37"
          stroke="oklch(0.65 0.18 260)"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          strokeDasharray="80 160"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, ease: 'linear', repeat: Infinity }}
          style={{ transformOrigin: '40px 40px' }}
        />

        {/* Inner second ring — counter-rotate */}
        <motion.circle
          cx="40"
          cy="40"
          r="33"
          stroke="oklch(0.65 0.18 260)"
          strokeWidth="0.5"
          strokeLinecap="round"
          fill="none"
          strokeDasharray="40 180"
          opacity={0.4}
          animate={{ rotate: -360 }}
          transition={{ duration: 4, ease: 'linear', repeat: Infinity }}
          style={{ transformOrigin: '40px 40px' }}
        />

        {/* Background square */}
        <motion.rect
          x="14"
          y="14"
          width="52"
          height="52"
          rx="12"
          fill="oklch(0.65 0.18 260)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1], delay: 0.3 }}
        />

        {/* Subtle glow behind text */}
        <motion.ellipse
          cx="40"
          cy="44"
          rx="14"
          ry="6"
          fill="oklch(0.8 0.2 260)"
          opacity={0.15}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        />

        {/* SJT Text */}
        <motion.text
          x="40"
          y="47"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="20"
          fontWeight="700"
          letterSpacing="2"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          SJT
        </motion.text>
      </svg>
    </div>
  )
}

/** Pre-computed particle positions to avoid hydration mismatch */
const PARTICLES = [
  { size: 3, x: '12%', y: '20%', duration: 2.5, delay: 0 },
  { size: 2, x: '85%', y: '15%', duration: 3, delay: 0.4 },
  { size: 4, x: '70%', y: '75%', duration: 2.8, delay: 0.8 },
  { size: 2, x: '25%', y: '80%', duration: 3.2, delay: 0.2 },
  { size: 3, x: '50%', y: '10%', duration: 2.6, delay: 0.6 },
  { size: 2, x: '90%', y: '55%', duration: 2.9, delay: 1 },
  { size: 3, x: '8%', y: '55%', duration: 3.1, delay: 0.3 },
  { size: 2, x: '40%', y: '90%', duration: 2.7, delay: 0.7 },
]

/** Inline loading spinner for route transitions */
export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: 'h-5 w-5',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  }

  return (
    <div className="flex items-center justify-center p-4">
      <svg
        className={`${sizes[size]} animate-spin`}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="opacity-20"
        />
        <path
          d="M12 2a10 10 0 0 1 10 10"
          stroke="oklch(0.65 0.18 260)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}
