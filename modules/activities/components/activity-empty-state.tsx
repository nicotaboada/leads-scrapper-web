'use client'

/**
 * Empty state for activities
 */

import { Activity } from 'lucide-react'

interface ActivityEmptyStateProps {
  message?: string
}

/**
 * Empty state component when no activities are found
 */
export function ActivityEmptyState({
  message = 'No hay actividades recientes',
}: ActivityEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm">
        <Activity className="h-6 w-6 text-zinc-400 dark:text-zinc-600" />
      </div>
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  )
}

