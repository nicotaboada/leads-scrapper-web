'use client'

/**
 * Activities Tab Component
 *
 * Tab content that displays activities for a contact with search and add functionality.
 * Wrapped in a Card for HubSpot-style layout.
 */

import { useState } from 'react'
import { Plus, Search } from 'lucide-react'
import { Button } from 'components/ui/button'
import { Card } from 'components/ui/card'
import { Input } from 'components/ui/input'
import { Skeleton } from 'components/ui/skeleton'
import { useDebounce } from 'hooks/use-debounce'
import { useActivities } from '../hooks/use-activities'
import { ActivityEmptyState } from './activity-empty-state'
import { ActivityList } from './activity-list'
import { AddActivitySheet } from './add-activity-sheet'

interface ActivitiesTabProps {
	contactId: string
	contactName: string
}

export function ActivitiesTab({ contactId, contactName }: ActivitiesTabProps) {
	const [searchQuery, setSearchQuery] = useState('')
	const [isAddSheetOpen, setIsAddSheetOpen] = useState(false)

	const debouncedSearch = useDebounce(searchQuery, 300)

	const { activities, loading, error, refetch } = useActivities({
		contactId,
		search: debouncedSearch || undefined,
	})

	function handleActivityCreated(): void {
		refetch()
	}

	if (error) {
		return (
			<Card className="border-red-200 bg-red-50 p-6 dark:border-red-800 dark:bg-red-950/30">
				<h3 className="text-lg font-semibold text-red-900 dark:text-red-100">
					Error loading activities
				</h3>
				<p className="mt-2 text-sm text-red-700 dark:text-red-300">
					{error.message || 'Could not load activities. Please try again.'}
				</p>
			</Card>
		)
	}

	const hasActivities = activities.length > 0
	const isSearching = debouncedSearch.length > 0

	return (
		<Card className="p-6">
			<div className="space-y-4">
				{/* Top Bar - Only show when there are activities */}
				{hasActivities && (
					<div className="flex items-center justify-between gap-4">
						<div className="relative max-w-sm flex-1">
							<Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
							<Input
								placeholder="Search for activities"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="pl-9"
							/>
						</div>
						<Button onClick={() => setIsAddSheetOpen(true)}>
							<Plus className="mr-2 size-4" />
							Add Activity
						</Button>
					</div>
				)}

				{/* Content */}
				{loading ? (
					<ActivitiesTabSkeleton />
				) : hasActivities ? (
					<ActivityList activities={activities} />
				) : isSearching ? (
					<div className="py-12 text-center">
						<p className="text-muted-foreground">
							No activities found matching &quot;{debouncedSearch}&quot;
						</p>
					</div>
				) : (
					<ActivityEmptyState onAddActivity={() => setIsAddSheetOpen(true)} />
				)}

				{/* Add Activity Sheet */}
				<AddActivitySheet
					open={isAddSheetOpen}
					onOpenChange={setIsAddSheetOpen}
					contactId={contactId}
					contactName={contactName}
					onActivityCreated={handleActivityCreated}
				/>
			</div>
		</Card>
	)
}

function ActivitiesTabSkeleton() {
	return (
		<div className="space-y-6">
			<Skeleton className="h-4 w-16" />
			<div className="space-y-4">
				{[1, 2, 3].map((i) => (
					<div key={i} className="flex gap-4">
						<Skeleton className="size-10 rounded-lg" />
						<div className="flex-1 space-y-2">
							<Skeleton className="h-4 w-48" />
							<Skeleton className="h-3 w-64" />
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
