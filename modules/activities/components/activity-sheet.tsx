'use client'

/**
 * Sheet component showing all activities with filters and infinite scroll
 */

import { Filter, Loader2 } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ScrollArea } from 'components/ui/scroll-area'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from 'components/ui/select'
import { Separator } from 'components/ui/separator'
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from 'components/ui/sheet'
import { ActivityEmptyState } from './activity-empty-state'
import { ActivityItem } from './activity-item'
import { useInfiniteActivities } from '../hooks/use-infinite-activities'
import { useUsersList } from '../hooks/use-users-list'
import { DateRangeFilter } from '../types/activity'

interface ActivitySheetProps {
	open: boolean
	onOpenChange: (open: boolean) => void
}

const DATE_RANGE_OPTIONS = [
	{ value: 'ALL', label: 'Todas las fechas' },
	{ value: DateRangeFilter.LAST_24_HOURS, label: 'Últimas 24 horas' },
	{ value: DateRangeFilter.LAST_7_DAYS, label: 'Últimos 7 días' },
	{ value: DateRangeFilter.LAST_30_DAYS, label: 'Último mes' },
] as const

/**
 * Sheet displaying all activities with filters and infinite scroll
 */
export function ActivitySheet({ open, onOpenChange }: ActivitySheetProps) {
	const [selectedUserId, setSelectedUserId] = useState<number | undefined>(
		undefined
	)
	const [selectedDateRange, setSelectedDateRange] = useState<
		DateRangeFilter | undefined
	>(undefined)

	const { users } = useUsersList()
	const { activities, loading, hasNextPage, loadMore, refetch } =
		useInfiniteActivities({
			userId: selectedUserId,
			dateRange: selectedDateRange,
		})

	const observerRef = useRef<IntersectionObserver | null>(null)
	const loadMoreRef = useRef<HTMLDivElement | null>(null)

	// Intersection observer for infinite scroll
	const setupObserver = useCallback(() => {
		if (observerRef.current) {
			observerRef.current.disconnect()
		}

		observerRef.current = new IntersectionObserver(
			(entries) => {
				if (entries[0]?.isIntersecting && hasNextPage && !loading) {
					loadMore()
				}
			},
			{ threshold: 0.1 }
		)

		if (loadMoreRef.current) {
			observerRef.current.observe(loadMoreRef.current)
		}
	}, [hasNextPage, loading, loadMore])

	useEffect(() => {
		if (open) {
			setupObserver()
		}
		return () => {
			observerRef.current?.disconnect()
		}
	}, [open, setupObserver])

	// Refetch when sheet opens
	useEffect(() => {
		if (open) {
			refetch()
		}
	}, [open, refetch])

	// Refetch when filters change
	useEffect(() => {
		if (open) {
			refetch()
		}
	}, [selectedUserId, selectedDateRange, open, refetch])

	const handleUserChange = (value: string) => {
		setSelectedUserId(value === 'ALL' ? undefined : Number(value))
	}

	const handleDateRangeChange = (value: string) => {
		setSelectedDateRange(
			value === 'ALL' ? undefined : (value as DateRangeFilter)
		)
	}

	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent
				side="right"
				className="flex h-full flex-col p-0 sm:max-w-lg"
			>
				<SheetHeader className="shrink-0 px-6 py-6">
					<SheetTitle className="text-xl font-bold">
						Todas las actividades
					</SheetTitle>
				</SheetHeader>

				<div className="shrink-0 px-6 pb-6">
					<div className="flex flex-col gap-4">
						<div className="text-muted-foreground flex items-center gap-2 text-xs font-medium">
							<Filter className="h-3 w-3" />
							<span>FILTRAR POR</span>
						</div>

						<div className="flex gap-3">
							<Select
								value={selectedUserId?.toString() ?? 'ALL'}
								onValueChange={handleUserChange}
							>
								<SelectTrigger className="h-9 flex-1 bg-zinc-50 dark:bg-zinc-900/50">
									<SelectValue placeholder="Todos los usuarios" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="ALL">Todos los usuarios</SelectItem>
									{users.map((user) => (
										<SelectItem key={user.id} value={user.id.toString()}>
											{user.name ?? user.email}
										</SelectItem>
									))}
								</SelectContent>
							</Select>

							<Select
								value={selectedDateRange ?? 'ALL'}
								onValueChange={handleDateRangeChange}
							>
								<SelectTrigger className="h-9 flex-1 bg-zinc-50 dark:bg-zinc-900/50">
									<SelectValue placeholder="Todas las fechas" />
								</SelectTrigger>
								<SelectContent>
									{DATE_RANGE_OPTIONS.map((option) => (
										<SelectItem key={option.value} value={option.value}>
											{option.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>
				</div>

				<Separator />

				{/* Activity list */}
				<ScrollArea className="min-h-0 flex-1">
					<div className="py-2">
						{activities.length === 0 && !loading ? (
							<div className="px-6 py-12 text-center">
								<ActivityEmptyState message="No hay actividades que coincidan con los filtros" />
							</div>
						) : (
							<div className="flex flex-col">
								{activities.map((activity, index) => (
									<div key={activity.id}>
										<ActivityItem activity={activity} showFullName={true} />
										{index < activities.length - 1 && (
											<div className="mx-4 h-px bg-zinc-100 dark:bg-zinc-800/50" />
										)}
									</div>
								))}
							</div>
						)}

						{/* Load more trigger */}
						<div ref={loadMoreRef} className="py-8">
							{loading && (
								<div className="flex items-center justify-center">
									<Loader2 className="h-6 w-6 animate-spin text-zinc-400" />
								</div>
							)}
						</div>
					</div>
				</ScrollArea>
			</SheetContent>
		</Sheet>
	)
}
