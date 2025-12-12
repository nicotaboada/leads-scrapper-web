'use client'

import { useEffect, useState } from 'react'
import { FilterBy } from 'components/common/filter-by'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from 'components/ui/select'

/**
 * Props for the StatusFilter component
 */
interface StatusFilterProps {
	/**
	 * Current status filter value ('active' | 'inactive' | null)
	 */
	value: string | null

	/**
	 * Callback fired when the filter is applied
	 */
	onApply: (value: string | null) => void
}

/**
 * StatusFilter Component
 *
 * A pre-built filter component for filtering by status (Active/Inactive).
 * Uses the FilterBy component internally with a Select dropdown.
 *
 * @example
 * ```tsx
 * const [statusFilter, setStatusFilter] = useState<string | null>(null)
 *
 * <StatusFilter
 *   value={statusFilter}
 *   onApply={setStatusFilter}
 * />
 * ```
 */
export function StatusFilter({ value, onApply }: StatusFilterProps) {
	const [selectedValue, setSelectedValue] = useState<string | null>(value)

	const options = [
		{ value: 'ENABLED', label: 'Activo' },
		{ value: 'DISABLED', label: 'Inactivo' },
	]

	// Sync internal state with prop value
	useEffect(() => {
		setSelectedValue(value)
	}, [value])

	const handleApply = () => {
		onApply(selectedValue)
	}

	const handleClear = () => {
		setSelectedValue(null)
		onApply(null)
	}

	const getDisplayValue = () => {
		if (!value) return undefined
		const option = options.find((opt) => opt.value === value)
		return option?.label
	}

	return (
		<FilterBy
			label="Estado"
			isActive={!!value}
			selectedValue={getDisplayValue()}
			onApply={handleApply}
			onClear={handleClear}
		>
			<div className="space-y-2">
				<Select value={selectedValue || ''} onValueChange={setSelectedValue}>
					<SelectTrigger className="w-full">
						<SelectValue placeholder="Seleccionar estado" />
					</SelectTrigger>
					<SelectContent>
						{options.map((option) => (
							<SelectItem key={option.value} value={option.value}>
								{option.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
		</FilterBy>
	)
}
