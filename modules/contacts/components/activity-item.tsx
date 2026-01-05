'use client'

/**
 * Activity Item Component
 *
 * Displays a single activity in the timeline with icon, type, author, and summary
 * Summary is collapsible with a distinctive background
 */

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
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { cn } from '@/lib/utils/merge'
import type { Activity } from '../types/activity'
import { getActivityTypeConfig } from '../types/activity'

interface ActivityItemProps {
	activity: Activity
	isLast?: boolean
}

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
		const metadata = activity.metadata as {
			fromStatus?: string
			toStatus?: string
		}
		if (!metadata.fromStatus || !metadata.toStatus) {
			return null
		}
		return (
			<span className="font-medium text-zinc-400">
				{' '}
				from{' '}
				<span className="text-zinc-900 dark:text-zinc-100">
					{formatStatus(metadata.fromStatus)}
				</span>{' '}
				→{' '}
				<span className="text-zinc-900 dark:text-zinc-100">
					{formatStatus(metadata.toStatus)}
				</span>
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

	return (
		<div className="relative flex gap-6">
			{/* Timeline line */}
			{!isLast && (
				<div className="absolute top-12 bottom-0 left-5 w-[2px] bg-zinc-100 dark:bg-zinc-800" />
			)}

			{/* Icon */}
			<div className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-white bg-zinc-900 shadow-sm dark:border-zinc-950 dark:bg-zinc-100">
				<IconComponent className="size-4 text-zinc-50 dark:text-zinc-900" />
			</div>

			{/* Content */}
			<div className="min-w-0 flex-1 pb-10">
				{/* Header row */}
				<div
					className={cn(
						'group flex items-center justify-between',
						hasSummary && 'cursor-pointer'
					)}
					onClick={toggleExpanded}
				>
					<div className="flex flex-wrap items-center gap-x-2">
						<span className="text-sm font-semibold text-zinc-900 uppercase dark:text-zinc-100">
							{config.label}
						</span>
						{activity.activityType !== 'STATUS_CHANGED' && (
							<span className="text-sm font-medium text-zinc-400">
								por{' '}
								<span className="text-zinc-600 dark:text-zinc-300">
									{activity.authorName}
								</span>
							</span>
						)}
						{renderStatusChangeInfo()}
					</div>

					{/* Expand/Collapse button */}
					{hasSummary && (
						<button
							type="button"
							className="p-1 text-zinc-400 transition-colors group-hover:text-zinc-900 dark:group-hover:text-zinc-100"
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
				<AnimatePresence initial={false}>
					{hasSummary && isExpanded && (
						<motion.div
							initial={{ height: 0, opacity: 0, marginTop: 0 }}
							animate={{ height: 'auto', opacity: 1, marginTop: 8 }}
							exit={{ height: 0, opacity: 0, marginTop: 0 }}
							className="overflow-hidden"
						>
							<div className="rounded-xl border border-zinc-100 bg-zinc-50/50 p-4 dark:border-zinc-800 dark:bg-zinc-900/30">
								<p className="text-sm leading-relaxed font-medium text-zinc-600 italic dark:text-zinc-400">
									&ldquo;{activity.summary}&rdquo;
								</p>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	)
}
