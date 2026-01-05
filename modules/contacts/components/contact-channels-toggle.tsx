'use client'

/**
 * Contact Channels Toggle Component
 *
 * Displays available contact channels as toggleable icons.
 * Shows only channels for which we have contact information.
 * Gray = not contacted, Green = contacted
 */

import { Linkedin, Mail, MessageCircle } from 'lucide-react'
import { useState } from 'react'
import { Button } from 'components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from 'components/ui/tooltip'
import { cn } from 'lib/utils/merge'
import { useToggleContactChannel } from '../hooks/use-toggle-contact-channel'
import { type Contact, ContactChannel, getAvailableChannels } from '../types'

/**
 * Configuration for each contact channel
 */
const CHANNEL_CONFIG: Record<
	ContactChannel,
	{ icon: typeof Linkedin; label: string }
> = {
	[ContactChannel.LINKEDIN]: {
		icon: Linkedin,
		label: 'LinkedIn',
	},
	[ContactChannel.WHATSAPP]: {
		icon: MessageCircle,
		label: 'WhatsApp',
	},
	[ContactChannel.EMAIL]: {
		icon: Mail,
		label: 'Email',
	},
}

interface ContactChannelsToggleProps {
	contact: Contact
	onChannelToggle?: () => void
}

export function ContactChannelsToggle({
	contact,
	onChannelToggle,
}: ContactChannelsToggleProps) {
	const { toggleChannel } = useToggleContactChannel()
	const [loadingChannel, setLoadingChannel] = useState<ContactChannel | null>(
		null
	)
	const availableChannels = getAvailableChannels(contact)
	const contactedChannels = contact.contactedChannels ?? []

	async function handleToggle(channel: ContactChannel) {
		setLoadingChannel(channel)
		try {
			const success = await toggleChannel(contact.id, channel)
			if (success) {
				onChannelToggle?.()
			}
		} finally {
			setLoadingChannel(null)
		}
	}

	if (availableChannels.length === 0) {
		return (
			<span className="text-muted-foreground text-sm">
				No hay canales disponibles
			</span>
		)
	}

	return (
		<div className="flex items-center gap-1">
			{availableChannels.map((channel) => {
				const config = CHANNEL_CONFIG[channel]
				const Icon = config.icon
				const isContacted = contactedChannels.includes(channel)
				const isLoading = loadingChannel === channel

				return (
					<Tooltip key={channel}>
						<TooltipTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className={cn(
									'h-8 w-8 transition-colors duration-200',
									isLoading && 'opacity-50'
								)}
								onClick={() => handleToggle(channel)}
								disabled={isLoading}
							>
								<Icon
									className={cn(
										'h-4 w-4 transition-colors duration-200',
										isContacted ? 'text-green-500' : 'text-gray-400'
									)}
								/>
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>
								{config.label}
								{isContacted ? ' (contactado)' : ''}
							</p>
						</TooltipContent>
					</Tooltip>
				)
			})}
		</div>
	)
}
