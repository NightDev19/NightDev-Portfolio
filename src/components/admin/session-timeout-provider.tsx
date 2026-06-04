'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSessionTimeout } from '@/hooks/use-session-timeout'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

export function SessionTimeoutProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [showWarning, setShowWarning] = useState(false)
  const [countdown, setCountdown] = useState(30)

  const handleExpire = useCallback(() => {
    setShowWarning(false)
  }, [])

  const { resetTimers, handleLogout } = useSessionTimeout(handleExpire)

  // Listen for the session-warning custom event
  useEffect(() => {
    const onWarning = () => {
      setShowWarning(true)
      setCountdown(30)
    }

    window.addEventListener('session-warning', onWarning)
    return () => window.removeEventListener('session-warning', onWarning)
  }, [])

  // Countdown timer
  useEffect(() => {
    if (!showWarning) return

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          handleLogout()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [showWarning, handleLogout])

  const handleStayActive = useCallback(() => {
    setShowWarning(false)
    setCountdown(30)
    resetTimers()
  }, [resetTimers])

  return (
    <>
      {children}
      <AlertDialog open={showWarning} onOpenChange={(open) => {
        if (!open) handleStayActive()
      }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Session Expiring</AlertDialogTitle>
            <AlertDialogDescription>
              You&apos;ve been inactive for a while. You&apos;ll be signed out in{' '}
              <span className="font-semibold text-foreground">{countdown}</span>{' '}
              seconds due to inactivity.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button onClick={handleStayActive} size="sm">
              Stay Signed In
            </Button>
            <AlertDialogAction onClick={handleLogout} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Sign Out Now
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
