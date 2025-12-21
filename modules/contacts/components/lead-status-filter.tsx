'use client'

/**
 * Lead Status Filter Component
 *
 * A filter component for filtering contacts by lead status.
 * Uses the FilterBy component with colored status indicators.
 */

import { useEffect, useState } from 'react'
import { FilterBy } from 'components/common/filter-by'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from 'components/ui/select'
import { cn } from 'lib/utils/merge'
import { LeadStatus } from '../types'
import { LEAD_STATUS_CONFIG } from './lead-status-selector'

interface LeadStatusFilterProps {
	/**
	 * Current lead status filter value
	 */
	value: LeadStatus | null

	/**
	 * Callback fired when the filter is applied
	 */
	onApply: (value: LeadStatus | null) => void
}

/**
 * LeadStatusFilter Component
 *
 * A pre-built filter component for filtering by lead status.
 * Uses the FilterBy component internally with a Select dropdown.
 *
 * @example
 * ```tsx
 * const [leadStatusFilter, setLeadStatusFilter] = useState<LeadStatus | null>(null)
 *
 * <LeadStatusFilter
 *   value={leadStatusFilter}
 *   onApply={setLeadStatusFilter}
 * />
 * ```
 */
export function LeadStatusFilter({ value, onApply }: LeadStatusFilterProps) {
	const [selectedValue, setSelectedValue] = useState<LeadStatus | null>(value)

	const options = Object.entries(LEAD_STATUS_CONFIG).map(([status, config]) => ({
		value: status as LeadStatus,
		label: config.label,
		color: config.color,
	}))

	// Sync internal state with prop value
	useEffect(() => {
		setSelectedValue(value)
	}, [value])

	function handleApply() {
		onApply(selectedValue)
	}

	function handleClear() {
		setSelectedValue(null)
		onApply(null)
	}

	function getDisplayValue(): string | undefined {
		if (!value) return undefined
		return LEAD_STATUS_CONFIG[value]?.label
	}

	return (
		<FilterBy
			label="Estado Lead"
			isActive={!!value}
			selectedValue={getDisplayValue()}
			onApply={handleApply}
			onClear={handleClear}
		>
			<div className="space-y-2">
				<Select
					value={selectedValue || ''}
					onValueChange={(val) => setSelectedValue(val as LeadStatus)}
				>
					<SelectTrigger className="w-full">
						<SelectValue placeholder="Seleccionar estado" />
					</SelectTrigger>
					<SelectContent>
						{options.map((option) => (
							<SelectItem key={option.value} value={option.value}>
								<div className="flex items-center gap-2">
									<span
										className={cn('h-3 w-3 shrink-0 rounded-full', option.color)}
									/>
									<span>{option.label}</span>
								</div>
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
		</FilterBy>
	)
}

