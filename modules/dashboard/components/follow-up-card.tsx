'use client'

/**
 * Card component showing follow-up summary for dashboard
 */

import { useState } from 'react'
import { Button } from 'components/ui/button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from 'components/ui/card'
import { Skeleton } from 'components/ui/skeleton'
import { FollowUpSheet } from './follow-up-sheet'
import { useFollowUpSummary } from '../hooks/use-follow-up-summary'

/**
 * Counter row component for displaying category count
 */
function CounterRow({
	color,
	label,
	count,
}: {
	color: 'red' | 'yellow' | 'green'
	label: string
	count: number
}) {
	const colorClasses = {
		red: 'bg-red-500',
		yellow: 'bg-yellow-500',
		green: 'bg-green-500',
	}

	return (
		<div className="flex items-center justify-between py-2">
			<div className="flex items-center gap-3">
				<span
					className={`h-2.5 w-2.5 rounded-full ${colorClasses[color]}`}
					aria-hidden="true"
				/>
				<span className="text-muted-foreground text-sm">{label}</span>
			</div>
			<span className="text-sm font-semibold">{count}</span>
		</div>
	)
}

/**
 * Loading skeleton for the card
 */
function FollowUpCardSkeleton() {
	return (
		<Card>
			<CardHeader>
				<Skeleton className="h-5 w-40" />
			</CardHeader>
			<CardContent className="space-y-2">
				<Skeleton className="h-8 w-full" />
				<Skeleton className="h-8 w-full" />
				<Skeleton className="h-8 w-full" />
			</CardContent>
			<CardFooter>
				<Skeleton className="h-9 w-full" />
			</CardFooter>
		</Card>
	)
}

/**
 * Follow-up summary card for dashboard
 * Shows counts for overdue, today, and upcoming follow-ups
 */
export function FollowUpCard() {
	const { summary, loading, error } = useFollowUpSummary()
	const [isSheetOpen, setIsSheetOpen] = useState(false)

	if (loading && !summary) {
		return <FollowUpCardSkeleton />
	}

	if (error) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>Follow-ups pendientes</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-muted-foreground text-sm">
						Error al cargar los datos
					</p>
				</CardContent>
			</Card>
		)
	}

	const totalCount =
		(summary?.overdueCount ?? 0) +
		(summary?.todayCount ?? 0) +
		(summary?.upcomingCount ?? 0)

	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle className="text-base">Follow-ups pendientes</CardTitle>
				</CardHeader>
				<CardContent className="space-y-1">
					<CounterRow
						color="red"
						label="Vencidos"
						count={summary?.overdueCount ?? 0}
					/>
					<CounterRow
						color="yellow"
						label="Hoy"
						count={summary?.todayCount ?? 0}
					/>
					<CounterRow
						color="green"
						label="Próximos"
						count={summary?.upcomingCount ?? 0}
					/>
				</CardContent>
				<CardFooter>
					<Button
						variant="outline"
						className="w-full"
						onClick={() => setIsSheetOpen(true)}
						disabled={totalCount === 0}
					>
						Ver contactos
					</Button>
				</CardFooter>
			</Card>

			<FollowUpSheet open={isSheetOpen} onOpenChange={setIsSheetOpen} />
		</>
	)
}
