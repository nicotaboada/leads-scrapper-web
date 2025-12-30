'use client'

/**
 * Follow-up Badge Component
 *
 * Small badge/indicator for the contacts list table.
 * Shows a calendar icon with tooltip containing follow-up details.
 */

import { CalendarDays, AlertCircle } from 'lucide-react'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from 'components/ui/tooltip'
import { cn } from '@/lib/utils/merge'
import {
	type FollowUp,
	isFollowUpOverdue,
	formatFollowUpDate,
	getFollowUpRelativeTime,
} from '../types'

interface FollowUpBadgeProps {
	followUp?: FollowUp
}

export function FollowUpBadge({ followUp }: FollowUpBadgeProps) {
	if (!followUp) return null

	const isOverdue = isFollowUpOverdue(followUp.dueDate)

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<div
						className={cn(
							'flex size-5 items-center justify-center rounded-full transition-colors',
							isOverdue
								? 'bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-950 shadow-sm'
								: 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400'
						)}
					>
						{isOverdue ? (
							<AlertCircle className="size-3" />
						) : (
							<CalendarDays className="size-3" />
						)}
					</div>
				</TooltipTrigger>
				<TooltipContent side="top" className="max-w-xs shadow-xl">
					<div className="space-y-1.5 p-1">
						<div className="flex items-center gap-2">
							<span className="text-xs font-bold uppercase tracking-tight opacity-90">Seguimiento:</span>
							<span
								className={cn(
									'text-xs font-medium',
									isOverdue && 'underline underline-offset-2'
								)}
							>
								{formatFollowUpDate(followUp.dueDate)}
							</span>
						</div>
						{followUp.note && (
							<p className="text-xs opacity-80 line-clamp-2 italic leading-relaxed">
								&ldquo;{followUp.note}&rdquo;
							</p>
						)}
						<div className="text-[10px] opacity-60 font-medium">
							{getFollowUpRelativeTime(followUp.dueDate)}
						</div>
					</div>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}

