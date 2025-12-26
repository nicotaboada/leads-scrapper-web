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
		<div className="flex flex-col items-center justify-center py-12 text-center">
			<div className="rounded-full bg-muted p-3">
				<CalendarCheck className="h-6 w-6 text-muted-foreground" />
			</div>
			<h3 className="mt-4 text-sm font-medium">Sin follow-ups</h3>
			<p className="mt-1 text-sm text-muted-foreground">
				No hay contactos con follow-ups {categoryLabels[category] ?? ''}
			</p>
		</div>
	)
}

