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
		color: 'bg-zinc-900 dark:bg-zinc-100',
		bgColor: 'bg-zinc-100 dark:bg-zinc-800',
	},
	[LeadStatus.CONTACTED]: {
		label: 'Contactado',
		color: 'bg-zinc-600 dark:bg-zinc-400',
		bgColor: 'bg-zinc-100/50 dark:bg-zinc-800/50',
	},
	[LeadStatus.IN_CONVERSATIONS]: {
		label: 'En conversación',
		color: 'bg-zinc-400 dark:bg-zinc-500',
		bgColor: 'bg-zinc-50 dark:bg-zinc-900',
	},
	[LeadStatus.CLOSED]: {
		label: 'Cerrado',
		color: 'bg-zinc-900 dark:bg-zinc-100',
		bgColor: 'bg-zinc-200 dark:bg-zinc-700',
	},
}

const CHANNEL_CONFIG = {
	[ContactChannel.LINKEDIN]: {
		icon: Linkedin,
		label: 'LinkedIn',
		activeClass: 'bg-zinc-200 text-zinc-900 dark:bg-zinc-700 dark:text-zinc-100',
	},
	[ContactChannel.WHATSAPP]: {
		icon: MessageCircle,
		label: 'WhatsApp',
		activeClass: 'bg-zinc-200 text-zinc-900 dark:bg-zinc-700 dark:text-zinc-100',
	},
	[ContactChannel.EMAIL]: {
		icon: Mail,
		label: 'Email',
		activeClass: 'bg-zinc-200 text-zinc-900 dark:bg-zinc-700 dark:text-zinc-100',
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
			<div className="mb-4 flex items-center justify-between gap-2">
				<h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Lead</h3>
				<Button
					variant="ghost"
					size="sm"
					className="h-7 w-7 p-0 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
					onClick={() => setIsModalOpen(true)}
				>
					<Pencil className="size-3.5" />
				</Button>
			</div>

			<div className="divide-zinc-100 space-y-0.5 divide-y dark:divide-zinc-800">
				{/* Status Row */}
				<div className="flex items-start gap-3 py-3 transition-colors hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50">
					<div className="text-zinc-400 mt-1 shrink-0 dark:text-zinc-500">
						<div className={cn('size-2 rounded-full', statusConfig.color)} />
					</div>
					<div className="min-w-0 flex-1">
						<p className="text-zinc-500 text-[10px] font-medium uppercase dark:text-zinc-400">Status</p>
						<div className="mt-1 flex items-center">
							<span className="text-zinc-900 text-sm font-medium dark:text-zinc-100">{statusConfig.label}</span>
						</div>
					</div>
				</div>

				{/* Channels Row */}
				<div className="flex items-start gap-3 py-3 transition-colors hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50">
					<div className="text-zinc-400 mt-0.5 shrink-0 dark:text-zinc-500">
						<MessageCircle className="size-4" />
					</div>
					<div className="min-w-0 flex-1">
						<p className="text-zinc-500 text-[10px] font-medium uppercase dark:text-zinc-400">Channels</p>
						<div className="mt-1.5 flex gap-1.5">
							{contact.contactedChannels.length === 0 ? (
								<span className="text-zinc-400 text-sm italic">-</span>
							) : (
								contact.contactedChannels.map((channel) => {
									const config = CHANNEL_CONFIG[channel]
									if (!config) return null
									const Icon = config.icon
									return (
										<div
											key={channel}
											className={cn(
												'flex size-7 items-center justify-center rounded-md transition-colors',
												config.activeClass
											)}
											title={config.label}
										>
											<Icon className="size-4" />
										</div>
									)
								})
							)}
						</div>
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
