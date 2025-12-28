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
		<div>
			<h3 className="mb-4 text-base font-semibold">Actividades Recientes</h3>
			<Card>
				<CardContent className="space-y-2 p-6">
					{Array.from({ length: 5 }).map((_, i) => (
						<div key={i} className="flex items-center gap-2">
							<Skeleton className="h-6 w-6 rounded-full" />
							<Skeleton className="h-4 flex-1" />
						</div>
					))}
				</CardContent>
				<CardFooter className="px-6">
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
			<div>
				<h3 className="mb-4 text-base font-semibold">Actividades Recientes</h3>
				<Card>
					<CardContent className="p-6">
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
			<div>
				<h3 className="mb-4 text-base font-semibold">Actividades Recientes</h3>
				<Card>
					<CardContent className="px-6">
						{activities.length === 0 ? (
							<ActivityEmptyState />
						) : (
							<div className="divide-border/50 divide-y">
								{displayedActivities.map((activity) => (
									<ActivityItem
										key={activity.id}
										activity={activity}
										showTimestamp={false}
										compact
									/>
								))}
							</div>
						)}
					</CardContent>
					<CardFooter className="px-6">
						<Button
							variant="ghost"
							className="text-muted-foreground hover:text-foreground w-full"
							onClick={() => setIsSheetOpen(true)}
							disabled={totalCount === 0}
						>
							Ver más
						</Button>
					</CardFooter>
				</Card>
			</div>

			<ActivitySheet open={isSheetOpen} onOpenChange={setIsSheetOpen} />
		</>
	)
}
