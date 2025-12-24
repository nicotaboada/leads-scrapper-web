'use client'

/**
 * City Filter Component
 *
 * Filter component for filtering contacts by cities.
 * Uses the FilterBy component for consistent styling.
 */

import { useEffect, useState } from 'react'
import { FilterBy } from 'components/common/filter-by'
import { cn } from 'lib/utils/merge'
import { CityMultiselect } from './city-multiselect'

interface CityFilterProps {
	value: string[]
	onApply: (cities: string[]) => void
}

export function CityFilter({ value, onApply }: CityFilterProps) {
	const [selectedCities, setSelectedCities] = useState<string[]>(value)
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)

	const hasFilters = value.length > 0
	const hasSelectedCities = selectedCities.length > 0

	// Sync internal state with prop value
	useEffect(() => {
		setSelectedCities(value)
	}, [value])

	function handleApply() {
		onApply(selectedCities)
	}

	function handleClear() {
		setSelectedCities([])
		onApply([])
	}

	function getDisplayValue(): string | undefined {
		if (!hasFilters) return undefined
		if (value.length === 1) {
			return value[0]
		}
		return `${value.length} ciudades`
	}

	return (
		<FilterBy
			label="Ciudad"
			isActive={hasFilters}
			selectedValue={getDisplayValue()}
			onApply={handleApply}
			onClear={handleClear}
		>
			<div
				className={cn(
					'space-y-2 transition-all duration-200',
					isDropdownOpen && 'min-h-[280px]',
					hasSelectedCities && !isDropdownOpen && 'min-h-[60px]'
				)}
			>
				<CityMultiselect
					selectedCities={selectedCities}
					onChange={setSelectedCities}
					placeholder="Seleccionar ciudades..."
					autoOpen={false}
					onOpenChange={setIsDropdownOpen}
				/>
			</div>
		</FilterBy>
	)
}
