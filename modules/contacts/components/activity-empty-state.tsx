'use client'

/**
 * Activity Empty State Component
 *
 * Displayed when there are no activities logged for a contact
 */

import { ClipboardList } from 'lucide-react'
import { Button } from 'components/ui/button'
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from 'components/ui/empty'

interface ActivityEmptyStateProps {
	onAddActivity: () => void
}

export function ActivityEmptyState({ onAddActivity }: ActivityEmptyStateProps) {
	return (
		<Empty className="py-16">
			<EmptyHeader>
				<EmptyMedia variant="icon">
					<ClipboardList className="size-5" />
				</EmptyMedia>
				<EmptyTitle>
					There are no Activities logged for this contact.
				</EmptyTitle>
				<EmptyDescription>
					Start tracking your interactions by logging your first activity.
				</EmptyDescription>
			</EmptyHeader>
			<EmptyContent>
				<Button variant="outline" onClick={onAddActivity}>
					Log an Activity
				</Button>
			</EmptyContent>
		</Empty>
	)
}
