/**
 * Empty state component for follow-up contact list
 */

import { CalendarCheck } from 'lucide-react'

interface FollowUpEmptyStateProps {
	category: string
}

/**
 * Empty state displayed when no contacts match the selected category
 */
export function FollowUpEmptyState({ category }: FollowUpEmptyStateProps) {
	const categoryLabels: Record<string, string> = {
		OVERDUE: 'vencidos',
		TODAY: 'para hoy',
		UPCOMING: 'próximos',
	}

	return (
		<div className="flex flex-col items-center justify-center py-20 text-center px-6">
			<div className="rounded-full bg-zinc-50 dark:bg-zinc-900 p-4 border border-zinc-100 dark:border-zinc-800 shadow-sm">
				<CalendarCheck className="h-8 w-8 text-zinc-400 dark:text-zinc-600" />
			</div>
			<h3 className="mt-6 text-base font-semibold text-zinc-900 dark:text-zinc-100">
				Sin follow-ups {categoryLabels[category] ?? ''}
			</h3>
			<p className="mt-2 text-sm text-muted-foreground max-w-[240px]">
				Toda la actividad de seguimiento que programes aparecerá aquí.
			</p>
		</div>
	)
}

