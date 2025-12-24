'use client'

/**
 * Lead Section Component
 *
 * Displays lead information with edit capability.
 * Shows status and contacted channels with a pencil icon to edit.
 */

import { Linkedin, Mail, MessageCircle, Pencil } from 'lucide-react'
import { useState } from 'react'
import { Button } from 'components/ui/button'
import { cn } from 'lib/utils/merge'
import { LeadEditModal } from './lead-edit-modal'
import { type Contact, ContactChannel, LeadStatus } from '../types'

/**
 * Configuration for each lead status including label and color
 */
const LEAD_STATUS_CONFIG: Record<
	LeadStatus,
	{ label: string; color: string; bgColor: string }
> = {
	[LeadStatus.NEW]: {
		label: 'Nuevo',
		color: 'bg-yellow-500',
		bgColor: 'bg-yellow-50',
	},
	[LeadStatus.CONTACTED]: {
		label: 'Contactado',
		color: 'bg-pink-500',
		bgColor: 'bg-pink-50',
	},
	[LeadStatus.IN_CONVERSATIONS]: {
		label: 'En conversación',
		color: 'bg-gray-400',
		bgColor: 'bg-gray-50',
	},
	[LeadStatus.CLOSED]: {
		label: 'Cerrado',
		color: 'bg-green-500',
		bgColor: 'bg-green-50',
	},
}

const CHANNEL_CONFIG = {
	[ContactChannel.LINKEDIN]: {
		icon: Linkedin,
		label: 'LinkedIn',
		activeClass: 'bg-blue-100 text-blue-700',
	},
	[ContactChannel.WHATSAPP]: {
		icon: MessageCircle,
		label: 'WhatsApp',
		activeClass: 'bg-green-100 text-green-700',
	},
	[ContactChannel.EMAIL]: {
		icon: Mail,
		label: 'Email',
		activeClass: 'bg-purple-100 text-purple-700',
	},
} as const

interface LeadSectionProps {
	contact: Contact
	onLeadChanged?: () => void
}

export function LeadSection({ contact, onLeadChanged }: LeadSectionProps) {
	const [isModalOpen, setIsModalOpen] = useState(false)

	const statusConfig =
		LEAD_STATUS_CONFIG[contact.leadStatus] ?? LEAD_STATUS_CONFIG[LeadStatus.NEW]

	return (
		<div className="py-4">
			{/* Header row with pencil icon */}
			<div className="mb-3 flex items-center justify-between gap-2">
				<h3 className="text-sm font-semibold">Lead</h3>
				<Button
					variant="ghost"
					size="sm"
					className="h-7 w-7 p-0"
					onClick={() => setIsModalOpen(true)}
				>
					<Pencil className="size-3.5" />
				</Button>
			</div>

			<div className="space-y-2">
				{/* Status Row */}
				<div className="flex items-center gap-3">
					<span className="text-muted-foreground w-16 shrink-0 text-sm">
						Status
					</span>
					<div
						className={cn(
							'flex items-center gap-1.5 rounded-md px-2 py-0.5',
							statusConfig.bgColor
						)}
					>
						<span
							className={cn(
								'size-2.5 shrink-0 rounded-full',
								statusConfig.color
							)}
						/>
						<span className="text-sm">{statusConfig.label}</span>
					</div>
				</div>

				{/* Channels Row */}
				<div className="flex items-center gap-3">
					<span className="text-muted-foreground w-16 shrink-0 text-sm">
						Channels
					</span>
					<div className="flex gap-1">
						{contact.contactedChannels.length === 0 ? (
							<span className="text-muted-foreground text-sm">-</span>
						) : (
							contact.contactedChannels.map((channel) => {
								const config = CHANNEL_CONFIG[channel]
								if (!config) return null
								const Icon = config.icon
								return (
									<div
										key={channel}
										className={cn(
											'flex size-7 items-center justify-center rounded-md',
											config.activeClass
										)}
									>
										<Icon className="size-4" />
									</div>
								)
							})
						)}
					</div>
				</div>
			</div>

			{/* Edit Modal */}
			<LeadEditModal
				open={isModalOpen}
				onOpenChange={setIsModalOpen}
				contactId={contact.id}
				currentStatus={contact.leadStatus}
				currentChannels={contact.contactedChannels}
				onLeadChanged={onLeadChanged}
			/>
		</div>
	)
}
