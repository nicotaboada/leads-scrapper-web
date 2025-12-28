'use client'

/**
 * Channel Selector Component
 *
 * Toggle buttons for selecting message channel (WhatsApp or Email)
 */

import { Mail, MessageSquare } from 'lucide-react'
import { cn } from 'lib/utils/merge'
import { MessageChannel } from '../../types/ai-message'

interface ChannelSelectorProps {
	value: MessageChannel
	onChange: (channel: MessageChannel) => void
	disabled?: boolean
	/** Compact mode for card view (inline with label) */
	compact?: boolean
}

export function ChannelSelector({ value, onChange, disabled, compact }: ChannelSelectorProps) {
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
							'hover:bg-zinc-50 dark:hover:bg-zinc-800',
							'disabled:cursor-not-allowed disabled:opacity-50',
							value === MessageChannel.WHATSAPP
								? 'border-green-500 bg-green-50 text-green-700 dark:border-green-400 dark:bg-green-950/30 dark:text-green-400'
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
							'hover:bg-zinc-50 dark:hover:bg-zinc-800',
							'disabled:cursor-not-allowed disabled:opacity-50',
							value === MessageChannel.EMAIL
								? 'border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-950/30 dark:text-blue-400'
								: 'border-zinc-200 text-zinc-500 dark:border-zinc-700 dark:text-zinc-400'
						)}
					>
						<Mail className="h-3 w-3" />
						Email
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
			<div className="flex gap-3">
				<button
					type="button"
					disabled={disabled}
					onClick={() => onChange(MessageChannel.WHATSAPP)}
					className={cn(
						'flex flex-1 items-center justify-center gap-2 rounded-lg border-2 px-4 py-3 text-sm font-medium transition-all',
						'hover:bg-zinc-50 dark:hover:bg-zinc-800',
						'disabled:cursor-not-allowed disabled:opacity-50',
						value === MessageChannel.WHATSAPP
							? 'border-green-500 bg-green-50 text-green-700 dark:border-green-400 dark:bg-green-950/30 dark:text-green-400'
							: 'border-zinc-200 text-zinc-600 dark:border-zinc-700 dark:text-zinc-400'
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
						'flex flex-1 items-center justify-center gap-2 rounded-lg border-2 px-4 py-3 text-sm font-medium transition-all',
						'hover:bg-zinc-50 dark:hover:bg-zinc-800',
						'disabled:cursor-not-allowed disabled:opacity-50',
						value === MessageChannel.EMAIL
							? 'border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-950/30 dark:text-blue-400'
							: 'border-zinc-200 text-zinc-600 dark:border-zinc-700 dark:text-zinc-400'
					)}
				>
					<Mail className="h-4 w-4" />
					Email
				</button>
			</div>
		</div>
	)
}

