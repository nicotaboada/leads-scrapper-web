'use client'

/**
 * Grid of follow-up status cards for the dashboard
 * Each card is clickable and opens the sheet with that category selected
 */

import { ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import { Card, CardContent } from 'components/ui/card'
import { Skeleton } from 'components/ui/skeleton'
import { cn } from 'lib/utils/merge'
import { FollowUpSheet } from './follow-up-sheet'
import { useFollowUpSummary } from '../hooks/use-follow-up-summary'
import { FollowUpCategory } from '../types/follow-up'

interface FollowUpStatusConfig {
	category: FollowUpCategory
	label: string
	dotColor: string
}

const FOLLOW_UP_STATUSES: readonly FollowUpStatusConfig[] = [
	{
		category: FollowUpCategory.OVERDUE,
		label: 'Vencidos',
		dotColor: 'bg-zinc-950 dark:bg-zinc-100',
	},
	{
		category: FollowUpCategory.TODAY,
		label: 'Hoy',
		dotColor: 'bg-zinc-500',
	},
	{
		category: FollowUpCategory.UPCOMING,
		label: 'Próximos',
		dotColor: 'bg-zinc-300 dark:bg-zinc-600',
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
			className="group cursor-pointer border border-zinc-100/50 bg-zinc-50/30 transition-all duration-300 hover:border-zinc-200 hover:bg-zinc-50 hover:shadow-sm dark:border-zinc-800/50 dark:bg-zinc-900/20 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/40"
			onClick={onClick}
		>
			<CardContent className="flex flex-col gap-4 p-5">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<div
							className={cn('h-2 w-2 rounded-full shadow-sm', config.dotColor)}
							aria-hidden="true"
						/>
						<span className="text-[11px] font-semibold text-zinc-500">
							{config.label}
						</span>
					</div>
					<div className="flex h-6 w-6 items-center justify-center rounded-full border border-zinc-100 bg-white opacity-0 shadow-sm transition-all group-hover:opacity-100 dark:border-zinc-700 dark:bg-zinc-800">
						<ArrowUpRight className="h-3 w-3 text-zinc-500" />
					</div>
				</div>

				<div className="flex items-baseline justify-between">
					<span className="text-2xl leading-none font-semibold text-zinc-900 dark:text-zinc-100">
						{count}
					</span>
					<span className="text-muted-foreground/30 text-[10px] font-medium">
						Leads
					</span>
				</div>
			</CardContent>
		</Card>
	)
}

/**
 * Loading skeleton for status cards
 */
function StatusCardSkeleton() {
	return (
		<Card className="border-zinc-100/50 bg-zinc-50/30 dark:border-zinc-800/50 dark:bg-zinc-900/20">
			<CardContent className="flex flex-col gap-4 p-5">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Skeleton className="h-2 w-2 rounded-full" />
						<Skeleton className="h-3 w-16" />
					</div>
				</div>
				<div className="flex items-baseline justify-between">
					<Skeleton className="h-8 w-10" />
					<Skeleton className="h-2 w-12" />
				</div>
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
						<p className="text-muted-foreground text-sm">
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
