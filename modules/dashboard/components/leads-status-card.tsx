'use client'

/**
 * Card component showing leads status summary for dashboard
 */

import { Users } from 'lucide-react'
import { Card, CardContent } from 'components/ui/card'
import { Skeleton } from 'components/ui/skeleton'
import { LeadsStatusDonut } from './leads-status-donut'
import { useLeadsStatusSummary } from '../hooks/use-leads-status-summary'
import {
	LEAD_STATUS_COLORS,
	LEAD_STATUS_LABELS,
	LeadStatus,
} from '../types/leads-summary'

/**
 * Status row component for displaying status count with color indicator
 */
function StatusRow({
	status,
	count,
	total,
}: {
	status: LeadStatus
	count: number
	total: number
}) {
	const percentage = total > 0 ? (count / total) * 100 : 0
	const formattedPercentage = percentage.toFixed(0)

	return (
		<div className="group flex flex-col gap-2 rounded-xl border border-zinc-100/50 bg-zinc-50/30 p-3.5 transition-all hover:border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800/50 dark:bg-zinc-900/20 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/40">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<div
						className="h-2 w-2 rounded-full shadow-sm"
						style={{ backgroundColor: LEAD_STATUS_COLORS[status] }}
						aria-hidden="true"
					/>
					<span className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400">
						{LEAD_STATUS_LABELS[status]}
					</span>
				</div>
				<span className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
					{count}
				</span>
			</div>

			{/* Progress bar */}
			<div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-200/50 dark:bg-zinc-800/50">
				<div
					className="h-full rounded-full transition-all duration-1000 ease-out"
					style={{
						width: `${percentage}%`,
						backgroundColor: LEAD_STATUS_COLORS[status],
					}}
				/>
			</div>

			<div className="flex items-center justify-between">
				<div className="flex items-center gap-1">
					<span className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400">
						{formattedPercentage}%
					</span>
				</div>
			</div>
		</div>
	)
}

/**
 * Loading skeleton for the card
 */
function LeadsStatusCardSkeleton() {
	return (
		<div className="flex h-full flex-col">
			<h3 className="mb-4 text-base font-semibold">Resumen de Leads</h3>
			<Card className="flex-1">
				<CardContent className="p-6">
					<div className="grid h-full grid-cols-1 gap-8 lg:grid-cols-2">
						<div className="flex items-center justify-center">
							<Skeleton className="h-[200px] w-[200px] rounded-full" />
						</div>
						<div className="grid grid-cols-2 gap-3">
							<Skeleton className="h-24 w-full rounded-xl" />
							<Skeleton className="h-24 w-full rounded-xl" />
							<Skeleton className="h-24 w-full rounded-xl" />
							<Skeleton className="h-24 w-full rounded-xl" />
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}

/**
 * Empty state when no leads exist
 */
function EmptyState() {
	return (
		<div className="flex h-full flex-col">
			<h3 className="mb-4 text-base font-semibold">Resumen de Leads</h3>
			<Card className="flex-1">
				<CardContent className="flex h-full flex-col items-center justify-center p-6 text-center">
					<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-zinc-100 bg-zinc-50 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
						<Users className="h-6 w-6 text-zinc-400 dark:text-zinc-600" />
					</div>
					<h4 className="mb-1 text-base font-semibold">Sin datos de leads</h4>
					<p className="text-muted-foreground max-w-[200px] text-sm">
						No hay leads aún. Crea un run para comenzar a generar leads.
					</p>
				</CardContent>
			</Card>
		</div>
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
			<div className="flex h-full flex-col">
				<h3 className="mb-4 text-base font-semibold">Resumen de Leads</h3>
				<Card className="flex-1">
					<CardContent className="flex h-full items-center justify-center p-6">
						<p className="text-muted-foreground text-sm">
							Error al cargar los datos
						</p>
					</CardContent>
				</Card>
			</div>
		)
	}

	if (!summary || summary.total === 0) {
		return <EmptyState />
	}

	return (
		<div className="flex h-full flex-col">
			<h3 className="mb-4 text-base font-semibold">Resumen de Leads</h3>
			<Card className="flex-1 overflow-hidden transition-all dark:border-zinc-800">
				<CardContent className="flex h-full flex-col items-center justify-center p-4 sm:p-6">
					<div className="flex w-full flex-col items-center gap-6">
						{/* Donut chart section - centered at the top */}
						<div className="relative flex shrink-0 scale-90 items-center justify-center sm:scale-100">
							<LeadsStatusDonut summary={summary} />
						</div>

						{/* Stats grid section - 2 rows of 2 columns, full width */}
						<div className="grid w-full max-w-2xl grid-cols-2 gap-3">
							<StatusRow
								status={LeadStatus.NEW}
								count={summary.new}
								total={summary.total}
							/>
							<StatusRow
								status={LeadStatus.CONTACTED}
								count={summary.contacted}
								total={summary.total}
							/>
							<StatusRow
								status={LeadStatus.IN_CONVERSATIONS}
								count={summary.inConversations}
								total={summary.total}
							/>
							<StatusRow
								status={LeadStatus.CLOSED}
								count={summary.closed}
								total={summary.total}
							/>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
