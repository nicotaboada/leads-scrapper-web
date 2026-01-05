'use client'

/**
 * Lead Status Badge Component
 *
 * A read-only badge that displays the lead status of a contact.
 * Does not allow changing the status (use LeadStatusSelector for that).
 */

import { Badge } from '@/components/ui/badge'
import { cn } from 'lib/utils/merge'
import { LEAD_STATUS_CONFIG } from './lead-status-selector'
import { LeadStatus } from '../types'

interface LeadStatusBadgeProps {
	status: LeadStatus
	className?: string
}

export function LeadStatusBadge({ status, className }: LeadStatusBadgeProps) {
	const config =
		LEAD_STATUS_CONFIG[status] ?? LEAD_STATUS_CONFIG[LeadStatus.NEW]

	return (
		<Badge
			variant="outline"
			className={cn(
				'h-6 border-zinc-200 px-2 py-0 text-xs font-medium shadow-none transition-all duration-200 dark:border-zinc-800',
				config.bgColor,
				className
			)}
		>
			{config.label}
		</Badge>
	)
}
