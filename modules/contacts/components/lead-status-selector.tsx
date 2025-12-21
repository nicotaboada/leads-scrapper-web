'use client'

/**
 * Lead Status Selector Component
 *
 * A dropdown selector for changing the lead status of a contact.
 * Displays colored circles representing each status.
 */

import { Check, ChevronDown, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { Button } from 'components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from 'components/ui/popover'
import { cn } from 'lib/utils/merge'
import { LeadStatus } from '../types'

/**
 * Configuration for each lead status including label and color
 */
export const LEAD_STATUS_CONFIG: Record<
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

interface LeadStatusSelectorProps {
	value: LeadStatus
	onChange: (status: LeadStatus) => Promise<void> | void
	disabled?: boolean
}

export function LeadStatusSelector({
	value,
	onChange,
	disabled = false,
}: LeadStatusSelectorProps) {
	const [isOpen, setIsOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const currentConfig = LEAD_STATUS_CONFIG[value] ?? LEAD_STATUS_CONFIG[LeadStatus.NEW]

	async function handleSelect(status: LeadStatus) {
		if (status === value) {
			setIsOpen(false)
			return
		}
		setIsLoading(true)
		try {
			await onChange(status)
		} finally {
			setIsLoading(false)
			setIsOpen(false)
		}
	}

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="ghost"
					size="sm"
					disabled={disabled || isLoading}
					className={cn('h-8 justify-start gap-2 px-2 font-normal', currentConfig.bgColor)}
				>
					{isLoading ? (
						<Loader2 className="h-3 w-3 animate-spin" />
					) : (
						<span className={cn('h-3 w-3 shrink-0 rounded-full', currentConfig.color)} />
					)}
					<span className="truncate text-sm">{currentConfig.label}</span>
					<ChevronDown className="text-muted-foreground ml-auto h-3 w-3" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-48 p-1" align="start">
				<div className="flex flex-col gap-0.5">
					{Object.entries(LEAD_STATUS_CONFIG).map(([status, config]) => (
						<button
							key={status}
							type="button"
							onClick={() => handleSelect(status as LeadStatus)}
							className={cn(
								'flex w-full cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm transition-colors',
								'hover:bg-accent hover:text-accent-foreground',
								status === value && 'bg-accent'
							)}
						>
							<span
								className={cn('h-3 w-3 shrink-0 rounded-full', config.color)}
							/>
							<span className="flex-1">{config.label}</span>
							{status === value && <Check className="text-primary h-4 w-4" />}
						</button>
					))}
				</div>
			</PopoverContent>
		</Popover>
	)
}

