'use client'

/**
 * Card component showing leads status summary for dashboard
 */

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from 'components/ui/card'
import { Skeleton } from 'components/ui/skeleton'
import { useLeadsStatusSummary } from '../hooks/use-leads-status-summary'
import { LeadsStatusDonut } from './leads-status-donut'
import {
	LeadStatus,
	LEAD_STATUS_COLORS,
	LEAD_STATUS_LABELS,
} from '../types/leads-summary'

/**
 * Status row component for displaying status count with color indicator
 */
function StatusRow({
	status,
	count,
}: {
	status: LeadStatus
	count: number
}) {
	return (
		<div className="flex items-center justify-between py-1.5">
			<div className="flex items-center gap-2">
				<span
					className="h-2.5 w-2.5 rounded-full"
					style={{ backgroundColor: LEAD_STATUS_COLORS[status] }}
					aria-hidden="true"
				/>
				<span className="text-sm text-muted-foreground">
					{LEAD_STATUS_LABELS[status]}
				</span>
			</div>
			<span className="text-sm font-semibold">{count}</span>
		</div>
	)
}

/**
 * Loading skeleton for the card
 */
function LeadsStatusCardSkeleton() {
	return (
		<Card className="md:col-span-2">
			<CardHeader>
				<Skeleton className="h-5 w-40" />
			</CardHeader>
			<CardContent>
				<div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
					{/* Donut skeleton */}
					<div className="flex-shrink-0">
						<Skeleton className="h-[180px] w-[180px] rounded-full" />
					</div>
					{/* Stats skeleton */}
					<div className="flex-1 space-y-3">
						<Skeleton className="h-10 w-32" />
						<div className="space-y-2">
							<Skeleton className="h-8 w-full" />
							<Skeleton className="h-8 w-full" />
							<Skeleton className="h-8 w-full" />
							<Skeleton className="h-8 w-full" />
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}

/**
 * Empty state when no leads exist
 */
function EmptyState() {
	return (
		<Card className="md:col-span-2">
			<CardHeader>
				<CardTitle className="text-base">Resumen de Leads</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex flex-col items-center justify-center py-8 text-center">
					<div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
						<span className="text-2xl">📊</span>
					</div>
					<p className="text-sm text-muted-foreground">
						No hay leads aún. Crea un run para comenzar a generar leads.
					</p>
				</div>
			</CardContent>
		</Card>
	)
}

/**
 * Leads status summary card for dashboard
 * Shows total leads count and distribution by status with donut chart
 */
export function LeadsStatusCard() {
	const { summary, isLoading, error } = useLeadsStatusSummary()

	if (isLoading && !summary) {
		return <LeadsStatusCardSkeleton />
	}

	if (error) {
		return (
			<Card className="md:col-span-2">
				<CardHeader>
					<CardTitle className="text-base">Resumen de Leads</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-sm text-muted-foreground">
						Error al cargar los datos
					</p>
				</CardContent>
			</Card>
		)
	}

	if (!summary || summary.total === 0) {
		return <EmptyState />
	}

	return (
		<Card className="md:col-span-2">
			<CardHeader>
				<CardTitle className="text-base">Resumen de Leads</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
					{/* Donut chart */}
					<div className="flex-shrink-0">
						<LeadsStatusDonut summary={summary} />
					</div>
					{/* Stats list */}
					<div className="flex-1">
						<div className="mb-4">
							<p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
								Total Leads
							</p>
							<p className="text-3xl font-bold">{summary.total}</p>
						</div>
						<div className="space-y-1">
							<StatusRow status={LeadStatus.NEW} count={summary.new} />
							<StatusRow
								status={LeadStatus.CONTACTED}
								count={summary.contacted}
							/>
							<StatusRow
								status={LeadStatus.IN_CONVERSATIONS}
								count={summary.inConversations}
							/>
							<StatusRow status={LeadStatus.CLOSED} count={summary.closed} />
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}

