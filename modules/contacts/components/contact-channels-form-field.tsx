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
		activeClass:
			'bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900 border-zinc-900 dark:border-zinc-50',
		hoverClass: 'hover:bg-zinc-50 dark:hover:bg-zinc-900',
	},
	[ContactChannel.WHATSAPP]: {
		icon: MessageCircle,
		label: 'WhatsApp',
		activeClass:
			'bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900 border-zinc-900 dark:border-zinc-50',
		hoverClass: 'hover:bg-zinc-50 dark:hover:bg-zinc-900',
	},
	[ContactChannel.EMAIL]: {
		icon: Mail,
		label: 'Email',
		activeClass:
			'bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900 border-zinc-900 dark:border-zinc-50',
		hoverClass: 'hover:bg-zinc-50 dark:hover:bg-zinc-900',
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
		<div className="flex gap-2">
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
							'flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border transition-all duration-200',
							'disabled:cursor-not-allowed disabled:opacity-50',
							isActive
								? config.activeClass
								: 'border-zinc-200 bg-white text-zinc-400 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-500 dark:hover:border-zinc-700'
						)}
						aria-label={config.label}
						aria-pressed={isActive}
					>
						<Icon className="h-5 w-5" />
					</button>
				)
			})}
		</div>
	)
}
