'use client'

/**
 * Activity Item Component
 *
 * Displays a single activity in the timeline with icon, type, author, and summary
 * Summary is collapsible with a distinctive background
 */

import { useState } from 'react'
import {
	ChevronDown,
	ChevronUp,
	FileText,
	Linkedin,
	Mail,
	MessageCircle,
	MessageSquare,
	RefreshCw,
} from 'lucide-react'
import { cn } from '@/lib/utils/merge'
import type { Activity } from '../types/activity'
import { getActivityTypeConfig } from '../types/activity'

interface ActivityItemProps {
	activity: Activity
	isLast?: boolean
}

const COLLAPSED_HEIGHT = 'h-16'
const EXPANDED_HEIGHT = 'h-24'

const iconComponents: Record<string, React.ElementType> = {
	MessageCircle,
	Mail,
	Linkedin,
	MessageSquare,
	FileText,
	RefreshCw,
}

export function ActivityItem({ activity, isLast = false }: ActivityItemProps) {
	const hasSummaryInitial = Boolean(activity.summary)
	const [isExpanded, setIsExpanded] = useState(hasSummaryInitial)
	const config = getActivityTypeConfig(activity.activityType)
	const IconComponent = iconComponents[config.icon] ?? FileText
	const hasSummary = Boolean(activity.summary)

	function renderStatusChangeInfo(): React.ReactNode {
		if (activity.activityType !== 'STATUS_CHANGED' || !activity.metadata) {
			return null
		}
		const metadata = activity.metadata as { fromStatus?: string; toStatus?: string }
		if (!metadata.fromStatus || !metadata.toStatus) {
			return null
		}
		return (
			<span className="text-muted-foreground">
				{' '}
				from {formatStatus(metadata.fromStatus)} → {formatStatus(metadata.toStatus)}
			</span>
		)
	}

	function formatStatus(status: string): string {
		return status.replace(/_/g, ' ')
	}

	function toggleExpanded(): void {
		if (hasSummary) {
			setIsExpanded(!isExpanded)
		}
	}

	const lineHeight = hasSummary && isExpanded ? EXPANDED_HEIGHT : COLLAPSED_HEIGHT

	return (
		<div className="relative flex gap-4">
			{/* Timeline line */}
			{!isLast && (
				<div
					className={cn(
						'absolute top-10 left-5 w-px bg-border transition-all',
						lineHeight
					)}
				/>
			)}

			{/* Icon */}
			<div
				className={cn(
					'relative z-10 flex size-10 shrink-0 items-center justify-center rounded-lg',
					config.bgColor
				)}
			>
				<IconComponent className={cn('size-5', config.textColor)} />
			</div>

			{/* Content */}
			<div className="min-w-0 flex-1 pb-6">
				{/* Header row */}
				<div
					className={cn(
						'flex items-center justify-between',
						hasSummary && 'cursor-pointer'
					)}
					onClick={toggleExpanded}
				>
					<div className="flex flex-wrap items-center gap-x-2">
						<span className="font-semibold uppercase tracking-wide">
							{config.label}
						</span>
						{activity.activityType !== 'STATUS_CHANGED' && (
							<span className="text-muted-foreground">
								added by {activity.authorName}
							</span>
						)}
						{renderStatusChangeInfo()}
					</div>

					{/* Expand/Collapse button */}
					{hasSummary && (
						<button
							type="button"
							className="text-muted-foreground hover:text-foreground p-1"
							aria-label={isExpanded ? 'Collapse' : 'Expand'}
						>
							{isExpanded ? (
								<ChevronUp className="size-4" />
							) : (
								<ChevronDown className="size-4" />
							)}
						</button>
					)}
				</div>

				{/* Collapsible summary */}
				{hasSummary && isExpanded && (
					<div className="mt-2 rounded-md border-l-4 border-muted-foreground/30 bg-muted/50 py-2 pl-3 pr-2">
						<p className="text-muted-foreground text-sm italic">
							{activity.summary}
						</p>
					</div>
				)}
			</div>
		</div>
	)
}
