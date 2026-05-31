import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a date string consistently between server and client to avoid hydration mismatches.
 * Uses UTC-based formatting so the result is the same regardless of timezone.
 */
export function formatDate(
  dateInput: string | Date,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
): string {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput
  // Use UTC methods to ensure consistent output between server and client
  const utcDate = new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate()
    )
  )
  return utcDate.toLocaleDateString('en-US', { ...options, timeZone: 'UTC' })
}

/**
 * Format a date as a short month + year string (e.g. "Jan 2024")
 */
export function formatShortDate(dateInput: string | Date): string {
  return formatDate(dateInput, { month: 'short', year: 'numeric' })
}
