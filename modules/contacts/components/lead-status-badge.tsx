'use client'

/**
 * Lead Status Badge Component
 *
 * A read-only badge that displays the lead status of a contact.
 * Does not allow changing the status (use LeadStatusSelector for that).
 */

import { cn } from 'lib/utils/merge'
import { LeadStatus } from '../types'
import { LEAD_STATUS_CONFIG } from './lead-status-selector'

interface LeadStatusBadgeProps {
	status: LeadStatus
}

export function LeadStatusBadge({ status }: LeadStatusBadgeProps) {
	const config = LEAD_STATUS_CONFIG[status] ?? LEAD_STATUS_CONFIG[LeadStatus.NEW]

	return (
		<div
			className={cn(
				'inline-flex items-center gap-2 rounded-md px-2 py-1',
				config.bgColor
			)}
		>
			<span className={cn('h-2.5 w-2.5 shrink-0 rounded-full', config.color)} />
			<span className="text-sm">{config.label}</span>
		</div>
	)
}

