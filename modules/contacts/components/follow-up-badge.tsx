'use client'

/**
 * Follow-up Badge Component
 *
 * Small badge/indicator for the contacts list table.
 * Shows a calendar icon with tooltip containing follow-up details.
 */

import { AlertCircle, CalendarDays } from 'lucide-react'
import { cn } from '@/lib/utils/merge'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from 'components/ui/tooltip'
import {
	type FollowUp,
	formatFollowUpDate,
	getFollowUpRelativeTime,
	isFollowUpOverdue,
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
								? 'bg-zinc-900 text-zinc-50 shadow-sm dark:bg-zinc-100 dark:text-zinc-950'
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
							<span className="text-xs font-bold tracking-tight uppercase opacity-90">
								Seguimiento:
							</span>
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
							<p className="line-clamp-2 text-xs leading-relaxed italic opacity-80">
								&ldquo;{followUp.note}&rdquo;
							</p>
						)}
						<div className="text-[10px] font-medium opacity-60">
							{getFollowUpRelativeTime(followUp.dueDate)}
						</div>
					</div>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
