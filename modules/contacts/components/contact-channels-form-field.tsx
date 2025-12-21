'use client'

/**
 * Contact Channels Form Field Component
 *
 * A form field component for toggling contact channels.
 * Used within edit forms for contacts and companies.
 */

import { Linkedin, Mail, MessageCircle } from 'lucide-react'
import { cn } from 'lib/utils/merge'
import { ContactChannel } from '../types'

const CHANNEL_CONFIG = {
	[ContactChannel.LINKEDIN]: {
		icon: Linkedin,
		label: 'LinkedIn',
		activeClass: 'bg-blue-100 text-blue-700',
		hoverClass: 'hover:bg-blue-50',
	},
	[ContactChannel.WHATSAPP]: {
		icon: MessageCircle,
		label: 'WhatsApp',
		activeClass: 'bg-green-100 text-green-700',
		hoverClass: 'hover:bg-green-50',
	},
	[ContactChannel.EMAIL]: {
		icon: Mail,
		label: 'Email',
		activeClass: 'bg-purple-100 text-purple-700',
		hoverClass: 'hover:bg-purple-50',
	},
} as const

interface ContactChannelsFormFieldProps {
	value: ContactChannel[]
	onChange: (value: ContactChannel[]) => void
	disabled?: boolean
}

export function ContactChannelsFormField({
	value,
	onChange,
	disabled = false,
}: ContactChannelsFormFieldProps) {
	function handleToggle(channel: ContactChannel) {
		const isActive = value.includes(channel)
		if (isActive) {
			onChange(value.filter((c) => c !== channel))
		} else {
			onChange([...value, channel])
		}
	}

	return (
		<div className="flex gap-1">
			{Object.entries(CHANNEL_CONFIG).map(([channel, config]) => {
				const isActive = value.includes(channel as ContactChannel)
				const Icon = config.icon

				return (
					<button
						key={channel}
						type="button"
						onClick={() => handleToggle(channel as ContactChannel)}
						disabled={disabled}
						className={cn(
							'flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border transition-colors',
							'disabled:cursor-not-allowed disabled:opacity-50',
							isActive
								? config.activeClass
								: `border-input bg-background ${config.hoverClass}`
						)}
						aria-label={config.label}
						aria-pressed={isActive}
					>
						<Icon className="h-4 w-4" />
					</button>
				)
			})}
		</div>
	)
}
