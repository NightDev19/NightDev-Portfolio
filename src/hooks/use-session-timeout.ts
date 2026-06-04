'use client'

import { useEffect, useRef, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

const IDLE_TIMEOUT_MS = 2 * 60 * 1000 // 2 minutes
const WARNING_BEFORE_MS = 30 * 1000 // Show warning 30 seconds before logout

type TimeoutState = 'active' | 'warning' | 'expired'

export function useSessionTimeout(onExpire?: () => void) {
  const router = useRouter()
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const warningTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const stateRef = useRef<TimeoutState>('active')
  const activityRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearTimers = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (warningTimerRef.current) clearTimeout(warningTimerRef.current)
    if (activityRef.current) clearTimeout(activityRef.current)
  }, [])

  const handleLogout = useCallback(async () => {
    stateRef.current = 'expired'
    clearTimers()
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin')
    router.refresh()
    onExpire?.()
  }, [router, clearTimers, onExpire])

  const resetTimers = useCallback(() => {
    stateRef.current = 'active'
    clearTimers()

    // Warning timer — fires 30 seconds before logout
    warningTimerRef.current = setTimeout(() => {
      stateRef.current = 'warning'
      window.dispatchEvent(new CustomEvent('session-warning'))
    }, IDLE_TIMEOUT_MS - WARNING_BEFORE_MS)

    // Logout timer
    timerRef.current = setTimeout(() => {
      handleLogout()
    }, IDLE_TIMEOUT_MS)
  }, [handleLogout, clearTimers])

  useEffect(() => {
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click'] as const

    const onActivity = () => {
      // Debounce rapid events
      if (activityRef.current) clearTimeout(activityRef.current)
      activityRef.current = setTimeout(() => {
        if (stateRef.current !== 'expired') {
          resetTimers()
        }
      }, 300)
    }

    events.forEach((event) => {
      window.addEventListener(event, onActivity, { passive: true })
    })

    resetTimers()

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, onActivity)
      })
      clearTimers()
    }
  }, [resetTimers, clearTimers])

  return { resetTimers, handleLogout }
}
