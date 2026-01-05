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
		<div className="flex flex-col items-center justify-center px-6 py-20 text-center">
			<div className="rounded-full border border-zinc-100 bg-zinc-50 p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
				<CalendarCheck className="h-8 w-8 text-zinc-400 dark:text-zinc-600" />
			</div>
			<h3 className="mt-6 text-base font-semibold text-zinc-900 dark:text-zinc-100">
				Sin follow-ups {categoryLabels[category] ?? ''}
			</h3>
			<p className="text-muted-foreground mt-2 max-w-[240px] text-sm">
				Toda la actividad de seguimiento que programes aparecerá aquí.
			</p>
		</div>
	)
}
