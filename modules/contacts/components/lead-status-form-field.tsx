'use client'

/**
 * Lead Status Form Field Component
 *
 * A form field component for selecting lead status.
 * Used within edit forms for contacts and companies.
 */

import { Check, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { Button } from 'components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from 'components/ui/popover'
import { cn } from 'lib/utils/merge'
import { LeadStatus } from '../types'

const LEAD_STATUS_OPTIONS = [
	{
		value: LeadStatus.NEW,
		label: 'Nuevo',
		color: 'bg-zinc-900 dark:bg-zinc-100',
	},
	{
		value: LeadStatus.CONTACTED,
		label: 'Contactado',
		color: 'bg-zinc-600 dark:bg-zinc-400',
	},
	{
		value: LeadStatus.IN_CONVERSATIONS,
		label: 'En Conversación',
		color: 'bg-zinc-400 dark:bg-zinc-500',
	},
	{
		value: LeadStatus.CLOSED,
		label: 'Cerrado',
		color: 'bg-zinc-900 dark:bg-zinc-100',
	},
] as const

interface LeadStatusFormFieldProps {
	value: LeadStatus
	onChange: (value: LeadStatus) => void
	disabled?: boolean
}

export function LeadStatusFormField({
	value,
	onChange,
	disabled = false,
}: LeadStatusFormFieldProps) {
	const [open, setOpen] = useState(false)

	const selectedOption = LEAD_STATUS_OPTIONS.find((opt) => opt.value === value)

	function handleSelect(status: LeadStatus) {
		onChange(status)
		setOpen(false)
	}

	return (
		<Popover open={open} onOpenChange={setOpen} modal>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					size="lg"
					disabled={disabled}
					className="h-11 w-full justify-between gap-3 rounded-xl border-zinc-200 px-4 text-base font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-900"
				>
					<div className="flex items-center gap-3">
						<span
							className={cn('h-2.5 w-2.5 rounded-full', selectedOption?.color)}
						/>
						<span>{selectedOption?.label ?? 'Seleccionar'}</span>
					</div>
					<ChevronDown className="h-4 w-4 text-zinc-400" />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className="w-[var(--radix-popover-trigger-width)] overflow-hidden rounded-xl border-zinc-200 p-1.5 shadow-xl dark:border-zinc-800"
				align="start"
				onPointerDownOutside={(e) => e.preventDefault()}
			>
				<div className="flex flex-col gap-1">
					{LEAD_STATUS_OPTIONS.map((option) => (
						<button
							key={option.value}
							type="button"
							onClick={(e) => {
								e.stopPropagation()
								handleSelect(option.value)
							}}
							className={cn(
								'flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors',
								'hover:bg-zinc-100 dark:hover:bg-zinc-900',
								value === option.value
									? 'bg-zinc-50 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100'
									: 'text-zinc-600 dark:text-zinc-400'
							)}
						>
							<span
								className={cn(
									'h-2.5 w-2.5 shrink-0 rounded-full',
									option.color
								)}
							/>
							<span className="flex-1">{option.label}</span>
							{value === option.value && (
								<Check className="h-4 w-4 text-zinc-900 dark:text-zinc-100" />
							)}
						</button>
					))}
				</div>
			</PopoverContent>
		</Popover>
	)
}
