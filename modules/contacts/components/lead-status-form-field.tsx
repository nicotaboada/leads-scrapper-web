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
	{ value: LeadStatus.NEW, label: 'Nuevo', color: 'bg-yellow-500' },
	{ value: LeadStatus.CONTACTED, label: 'Contactado', color: 'bg-blue-500' },
	{
		value: LeadStatus.IN_CONVERSATIONS,
		label: 'En Conversación',
		color: 'bg-purple-500',
	},
	{ value: LeadStatus.CLOSED, label: 'Cerrado', color: 'bg-green-500' },
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
					size="sm"
					disabled={disabled}
					className="h-8 justify-between gap-2"
				>
					<div className="flex items-center gap-2">
						<span
							className={cn('h-2 w-2 rounded-full', selectedOption?.color)}
						/>
						<span className="text-sm">
							{selectedOption?.label ?? 'Seleccionar'}
						</span>
					</div>
					<ChevronDown className="h-4 w-4 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className="w-48 p-1"
				align="end"
				onPointerDownOutside={(e) => e.preventDefault()}
			>
				<div className="flex flex-col gap-0.5">
					{LEAD_STATUS_OPTIONS.map((option) => (
						<button
							key={option.value}
							type="button"
							onClick={(e) => {
								e.stopPropagation()
								handleSelect(option.value)
							}}
							className={cn(
								'flex w-full cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm transition-colors',
								'hover:bg-accent hover:text-accent-foreground',
								value === option.value && 'bg-accent'
							)}
						>
							<span
								className={cn('h-2 w-2 shrink-0 rounded-full', option.color)}
							/>
							<span className="flex-1">{option.label}</span>
							{value === option.value && (
								<Check className="text-primary h-4 w-4" />
							)}
						</button>
					))}
				</div>
			</PopoverContent>
		</Popover>
	)
}
