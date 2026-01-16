'use client'

/**
 * Channel Selector Component
 *
 * Toggle buttons for selecting message channel (WhatsApp, Email, or LinkedIn)
 */

import { Linkedin, Mail, MessageSquare } from 'lucide-react'
import { cn } from 'lib/utils/merge'
import { MessageChannel } from '../../types/ai-message'

interface ChannelSelectorProps {
	value: MessageChannel
	onChange: (channel: MessageChannel) => void
	disabled?: boolean
	/** Compact mode for card view (inline with label) */
	compact?: boolean
}

export function ChannelSelector({
	value,
	onChange,
	disabled,
	compact,
}: ChannelSelectorProps) {
	if (compact) {
		return (
			<div className="flex items-center gap-2">
				<span className="text-sm text-zinc-500 dark:text-zinc-400">Canal:</span>
				<div className="flex gap-1">
					<button
						type="button"
						disabled={disabled}
						onClick={() => onChange(MessageChannel.WHATSAPP)}
						className={cn(
							'flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium transition-all',
							'disabled:cursor-not-allowed disabled:opacity-50',
							value === MessageChannel.WHATSAPP
								? 'border-zinc-900 bg-zinc-900 text-zinc-50 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900'
								: 'border-zinc-200 text-zinc-500 dark:border-zinc-700 dark:text-zinc-400'
						)}
					>
						<MessageSquare className="h-3 w-3" />
						WhatsApp
					</button>
					<button
						type="button"
						disabled={disabled}
						onClick={() => onChange(MessageChannel.EMAIL)}
						className={cn(
							'flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium transition-all',
							'disabled:cursor-not-allowed disabled:opacity-50',
							value === MessageChannel.EMAIL
								? 'border-zinc-900 bg-zinc-900 text-zinc-50 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900'
								: 'border-zinc-200 text-zinc-500 dark:border-zinc-700 dark:text-zinc-400'
						)}
					>
						<Mail className="h-3 w-3" />
						Email
					</button>
					<button
						type="button"
						disabled={disabled}
						onClick={() => onChange(MessageChannel.LINKEDIN)}
						className={cn(
							'flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium transition-all',
							'disabled:cursor-not-allowed disabled:opacity-50',
							value === MessageChannel.LINKEDIN
								? 'border-zinc-900 bg-zinc-900 text-zinc-50 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900'
								: 'border-zinc-200 text-zinc-500 dark:border-zinc-700 dark:text-zinc-400'
						)}
					>
						<Linkedin className="h-3 w-3" />
						LinkedIn
					</button>
				</div>
			</div>
		)
	}

	return (
		<div className="space-y-2">
			<label className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
				Canal de envío
			</label>
			<div className="flex flex-wrap gap-2">
				<button
					type="button"
					disabled={disabled}
					onClick={() => onChange(MessageChannel.WHATSAPP)}
					className={cn(
						'flex min-w-[100px] flex-1 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold transition-all',
						'shadow-sm disabled:cursor-not-allowed disabled:opacity-50',
						value === MessageChannel.WHATSAPP
							? 'border-zinc-900 bg-zinc-900 text-zinc-50 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900'
							: 'border-zinc-200 bg-white text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-500'
					)}
				>
					<MessageSquare className="h-4 w-4" />
					WhatsApp
				</button>
				<button
					type="button"
					disabled={disabled}
					onClick={() => onChange(MessageChannel.EMAIL)}
					className={cn(
						'flex min-w-[100px] flex-1 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold transition-all',
						'shadow-sm disabled:cursor-not-allowed disabled:opacity-50',
						value === MessageChannel.EMAIL
							? 'border-zinc-900 bg-zinc-900 text-zinc-50 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900'
							: 'border-zinc-200 bg-white text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-500'
					)}
				>
					<Mail className="h-4 w-4" />
					Email
				</button>
				<button
					type="button"
					disabled={disabled}
					onClick={() => onChange(MessageChannel.LINKEDIN)}
					className={cn(
						'flex min-w-[100px] flex-1 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold transition-all',
						'shadow-sm disabled:cursor-not-allowed disabled:opacity-50',
						value === MessageChannel.LINKEDIN
							? 'border-zinc-900 bg-zinc-900 text-zinc-50 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900'
							: 'border-zinc-200 bg-white text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-500'
					)}
				>
					<Linkedin className="h-4 w-4" />
					LinkedIn
				</button>
			</div>
		</div>
	)
}
