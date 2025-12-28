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
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted/50">
        <Activity className="h-6 w-6 text-muted-foreground" />
      </div>
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  )
}

