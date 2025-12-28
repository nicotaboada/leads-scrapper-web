'use client'

/**
 * Grid of follow-up status cards for the dashboard
 * Each card is clickable and opens the sheet with that category selected
 */

import { useState } from 'react'
import { Card, CardContent } from 'components/ui/card'
import { Skeleton } from 'components/ui/skeleton'
import { useFollowUpSummary } from '../hooks/use-follow-up-summary'
import { FollowUpSheet } from './follow-up-sheet'
import { FollowUpCategory } from '../types/follow-up'

interface FollowUpStatusConfig {
	category: FollowUpCategory
	label: string
	color: string
	dotColor: string
}

const FOLLOW_UP_STATUSES: readonly FollowUpStatusConfig[] = [
	{
		category: FollowUpCategory.OVERDUE,
		label: 'Vencidos',
		color: 'hover:border-red-300 hover:bg-red-50/50',
		dotColor: 'bg-red-500',
	},
	{
		category: FollowUpCategory.TODAY,
		label: 'Hoy',
		color: 'hover:border-yellow-300 hover:bg-yellow-50/50',
		dotColor: 'bg-yellow-500',
	},
	{
		category: FollowUpCategory.UPCOMING,
		label: 'Próximos',
		color: 'hover:border-green-300 hover:bg-green-50/50',
		dotColor: 'bg-green-500',
	},
] as const

/**
 * Individual status card component
 */
function StatusCard({
	config,
	count,
	onClick,
}: {
	config: FollowUpStatusConfig
	count: number
	onClick: () => void
}) {
	return (
		<Card
			className={`cursor-pointer border transition-all duration-200 ${config.color}`}
			onClick={onClick}
		>
			<CardContent className="px-4">
				<div className="flex items-center gap-2">
					<span
						className={`h-2.5 w-2.5 ${config.dotColor}`}
						aria-hidden="true"
					/>
					<span className="text-sm font-medium text-muted-foreground">
						{config.label}
					</span>
				</div>
				<p className="mt-3 pl-[18px] text-2xl font-semibold">{count}</p>
			</CardContent>
		</Card>
	)
}

/**
 * Loading skeleton for status cards
 */
function StatusCardSkeleton() {
	return (
		<Card>
			<CardContent className="px-4">
				<div className="flex items-center gap-2">
					<Skeleton className="h-2.5 w-2.5" />
					<Skeleton className="h-4 w-16" />
				</div>
				<Skeleton className="ml-[18px] mt-3 h-7 w-10" />
			</CardContent>
		</Card>
	)
}

/**
 * Grid of follow-up status cards
 * Shows counts for overdue, today, and upcoming follow-ups
 */
export function FollowUpCards() {
	const { summary, loading, error } = useFollowUpSummary()
	const [isSheetOpen, setIsSheetOpen] = useState(false)
	const [selectedCategory, setSelectedCategory] = useState<FollowUpCategory>(
		FollowUpCategory.OVERDUE
	)

	const handleCardClick = (category: FollowUpCategory) => {
		setSelectedCategory(category)
		setIsSheetOpen(true)
	}

	const getCountForCategory = (category: FollowUpCategory): number => {
		if (!summary) return 0
		switch (category) {
			case FollowUpCategory.OVERDUE:
				return summary.overdueCount
			case FollowUpCategory.TODAY:
				return summary.todayCount
			case FollowUpCategory.UPCOMING:
				return summary.upcomingCount
			default:
				return 0
		}
	}

	if (loading && !summary) {
		return (
			<div className="col-span-full">
				<h3 className="mb-4 text-base font-semibold">Follow-ups pendientes</h3>
				<div className="grid grid-cols-3 gap-4">
					<StatusCardSkeleton />
					<StatusCardSkeleton />
					<StatusCardSkeleton />
				</div>
			</div>
		)
	}

	if (error) {
		return (
			<div className="col-span-full">
				<h3 className="mb-4 text-base font-semibold">Follow-ups pendientes</h3>
				<Card>
					<CardContent className="p-6">
						<p className="text-sm text-muted-foreground">
							Error al cargar los datos
						</p>
					</CardContent>
				</Card>
			</div>
		)
	}

	return (
		<>
			<div className="col-span-full">
				<h3 className="mb-4 text-base font-semibold">Follow-ups pendientes</h3>
				<div className="grid grid-cols-3 gap-4">
					{FOLLOW_UP_STATUSES.map((config) => (
						<StatusCard
							key={config.category}
							config={config}
							count={getCountForCategory(config.category)}
							onClick={() => handleCardClick(config.category)}
						/>
					))}
				</div>
			</div>

			<FollowUpSheet
				open={isSheetOpen}
				onOpenChange={setIsSheetOpen}
				initialCategory={selectedCategory}
			/>
		</>
	)
}

