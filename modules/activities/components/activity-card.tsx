'use client'

/**
 * Card component showing recent activities for dashboard
 */

import { useState } from 'react'
import { Button } from 'components/ui/button'
import { Card, CardContent, CardFooter } from 'components/ui/card'
import { Skeleton } from 'components/ui/skeleton'
import { ActivityEmptyState } from './activity-empty-state'
import { ActivityItem } from './activity-item'
import { ActivitySheet } from './activity-sheet'
import { useActivities } from '../hooks/use-activities'

/**
 * Loading skeleton for the activity card
 */
function ActivityCardSkeleton() {
	return (
		<div className="flex h-full flex-col">
			<h3 className="mb-4 text-base font-semibold">Actividades Recientes</h3>
			<Card className="flex-1 overflow-hidden">
				<CardContent className="space-y-4 p-0">
					{Array.from({ length: 5 }).map((_, i) => (
						<div key={i} className="flex items-center gap-4 px-4 py-3">
							<Skeleton className="h-10 w-10 rounded-full" />
							<div className="flex-1 space-y-2">
								<Skeleton className="h-4 w-3/4" />
								<Skeleton className="h-3 w-1/4" />
							</div>
						</div>
					))}
				</CardContent>
				<CardFooter className="border-t bg-zinc-50/50 p-2 dark:bg-zinc-900/50">
					<Skeleton className="h-9 w-full" />
				</CardFooter>
			</Card>
		</div>
	)
}

/**
 * Activity summary card for dashboard
 * Shows the latest 5 activities from all users
 */
export function ActivityCard() {
	const { activities, totalCount, loading, error } = useActivities(10)
	const [isSheetOpen, setIsSheetOpen] = useState(false)

	if (loading && activities.length === 0) {
		return <ActivityCardSkeleton />
	}

	if (error) {
		return (
			<div className="flex h-full flex-col">
				<h3 className="mb-4 text-base font-semibold">Actividades Recientes</h3>
				<Card className="flex-1">
					<CardContent className="flex h-full items-center justify-center p-12 text-center">
						<p className="text-muted-foreground text-sm">
							Error al cargar las actividades
						</p>
					</CardContent>
				</Card>
			</div>
		)
	}

	const displayedActivities = activities.slice(0, 5)

	return (
		<>
			<div className="flex h-full flex-col">
				<h3 className="mb-4 text-base font-semibold">Actividades Recientes</h3>
				<Card className="flex flex-1 flex-col overflow-hidden transition-all hover:shadow-md dark:border-zinc-800">
					<CardContent className="flex-1 p-0">
						{activities.length === 0 ? (
							<div className="flex h-full flex-col items-center justify-center p-12 text-center">
								<ActivityEmptyState />
							</div>
						) : (
							<div className="flex flex-col">
								{displayedActivities.map((activity, index) => (
									<div key={activity.id}>
										<ActivityItem
											activity={activity}
											showTimestamp={true}
											compact={true}
										/>
										{index < displayedActivities.length - 1 && (
											<div className="mx-6 h-px bg-zinc-100 dark:bg-zinc-800/50" />
										)}
									</div>
								))}
							</div>
						)}
					</CardContent>
					<CardFooter className="shrink-0 border-t bg-zinc-50/50 p-2 dark:bg-zinc-900/50">
						<Button
							variant="ghost"
							className="text-muted-foreground hover:text-foreground h-9 w-full text-xs font-medium"
							onClick={() => setIsSheetOpen(true)}
							disabled={totalCount === 0}
						>
							Ver todas las actividades
						</Button>
					</CardFooter>
				</Card>
			</div>

			<ActivitySheet open={isSheetOpen} onOpenChange={setIsSheetOpen} />
		</>
	)
}
