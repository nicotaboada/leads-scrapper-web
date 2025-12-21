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
							'flex size-6 items-center justify-center rounded-full',
							isOverdue
								? 'bg-red-100 text-red-600'
								: 'bg-amber-100 text-amber-600'
						)}
					>
						{isOverdue ? (
							<AlertCircle className="size-3.5" />
						) : (
							<CalendarDays className="size-3.5" />
						)}
					</div>
				</TooltipTrigger>
				<TooltipContent side="top" className="max-w-xs">
					<div className="space-y-1">
						<div className="flex items-center gap-2">
							<span className="font-semibold">Follow-up:</span>
							<span
								className={cn(
									'text-sm',
									isOverdue ? 'text-red-500' : 'text-muted-foreground'
								)}
							>
								{formatFollowUpDate(followUp.dueDate)}
							</span>
							<span
								className={cn(
									'text-xs',
									isOverdue ? 'text-red-400' : 'text-muted-foreground'
								)}
							>
								({getFollowUpRelativeTime(followUp.dueDate)})
							</span>
						</div>
						{followUp.note && (
							<p className="text-xs text-muted-foreground line-clamp-2">
								{followUp.note}
							</p>
						)}
					</div>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}

