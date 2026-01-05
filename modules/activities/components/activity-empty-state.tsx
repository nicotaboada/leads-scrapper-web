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
			<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-zinc-100 bg-zinc-50 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
				<Activity className="h-6 w-6 text-zinc-400 dark:text-zinc-600" />
			</div>
			<p className="text-muted-foreground text-sm">{message}</p>
		</div>
	)
}
