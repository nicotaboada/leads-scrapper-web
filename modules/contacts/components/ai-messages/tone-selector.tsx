'use client'

/**
 * Tone Selector Component
 *
 * Toggle buttons for selecting message tone (Formal, Friendly, Persuasive)
 */

import { cn } from 'lib/utils/merge'
import { MessageTone } from '../../types/ai-message'

interface ToneSelectorProps {
	value: MessageTone
	onChange: (tone: MessageTone) => void
	disabled?: boolean
}

const TONE_LABELS: Record<MessageTone, string> = {
	[MessageTone.FORMAL]: 'Formal',
	[MessageTone.FRIENDLY]: 'Amigable',
	[MessageTone.PERSUASIVE]: 'Persuasivo',
}

export function ToneSelector({ value, onChange, disabled }: ToneSelectorProps) {
	const tones = Object.values(MessageTone)

	return (
		<div className="space-y-2">
			<label className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
				Tono del mensaje
			</label>
			<div className="flex gap-2">
				{tones.map((tone) => (
					<button
						key={tone}
						type="button"
						disabled={disabled}
						onClick={() => onChange(tone)}
						className={cn(
							'flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-all',
							'hover:bg-zinc-100 dark:hover:bg-zinc-800',
							'disabled:cursor-not-allowed disabled:opacity-50',
							value === tone
								? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
								: 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
						)}
					>
						{TONE_LABELS[tone]}
					</button>
				))}
			</div>
		</div>
	)
}

