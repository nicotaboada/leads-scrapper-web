'use client'

/**
 * Activities Tab Component
 *
 * Tab content that displays activities for a contact with search and add functionality.
 * Wrapped in a Card for HubSpot-style layout.
 */

import { motion } from 'motion/react'
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

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
}

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.4,
		},
	},
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
		<motion.div
			variants={containerVariants}
			initial="hidden"
			animate="visible"
		>
			<Card className="p-6 border-zinc-200 shadow-sm dark:border-zinc-800">
				<div className="space-y-6">
					{/* Top Bar - Only show when there are activities */}
					<motion.div variants={itemVariants} className="flex items-center justify-between gap-4">
						<div className="relative max-w-sm flex-1">
							<Search className="text-zinc-400 absolute top-1/2 left-3 size-4 -translate-y-1/2 dark:text-zinc-500" />
							<Input
								placeholder="Search for activities..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="pl-9 border-zinc-200 bg-white font-medium focus:ring-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:focus:ring-zinc-100"
							/>
						</div>
						<Button 
							onClick={() => setIsAddSheetOpen(true)}
							className="bg-zinc-900 font-medium text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 shadow-sm"
						>
							<Plus className="mr-2 size-4" />
							Add Activity
						</Button>
					</motion.div>

					{/* Content */}
					<motion.div variants={itemVariants}>
						{loading ? (
							<ActivitiesTabSkeleton />
						) : hasActivities ? (
							<ActivityList activities={activities} />
						) : isSearching ? (
							<div className="py-12 text-center rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800">
								<p className="text-zinc-500 font-medium text-sm">
									No activities found matching &quot;{debouncedSearch}&quot;
								</p>
							</div>
						) : (
							<ActivityEmptyState onAddActivity={() => setIsAddSheetOpen(true)} />
						)}
					</motion.div>

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
		</motion.div>
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
