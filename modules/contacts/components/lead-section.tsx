'use client'

/**
 * Lead Section Component
 *
 * Section displaying lead information including status selector.
 * Used in both company and contact detail sidebars.
 */

import { type Contact, type LeadStatus } from '../types'
import { useUpdateLeadStatus } from '../hooks/use-update-lead-status'
import { ContactChannelsToggle } from './contact-channels-toggle'
import { LeadStatusSelector } from './lead-status-selector'

interface LeadSectionProps {
	contact: Contact
	onStatusChange?: () => void
}

export function LeadSection({ contact, onStatusChange }: LeadSectionProps) {
	const { updateLeadStatus } = useUpdateLeadStatus()

	async function handleStatusChange(newStatus: LeadStatus) {
		const success = await updateLeadStatus(contact.id, newStatus)
		if (success) {
			onStatusChange?.()
		}
	}

	return (
		<div className="py-4">
			<h3 className="mb-4 text-sm font-semibold">Lead</h3>
			<div className="space-y-4">
				{/* Status Row */}
				<div className="flex items-center justify-between">
					<span className="text-muted-foreground text-sm">Status</span>
					<LeadStatusSelector
						value={contact.leadStatus}
						onChange={handleStatusChange}
					/>
				</div>
				{/* Channels Row */}
				<div className="flex items-center justify-between">
					<span className="text-muted-foreground text-sm">Channels</span>
					<ContactChannelsToggle
						contact={contact}
						onChannelToggle={onStatusChange}
					/>
				</div>
			</div>
		</div>
	)
}

