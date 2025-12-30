'use client'

/**
 * City Filter Component
 *
 * Filter component for filtering contacts by cities.
 * Uses the FilterBy component for consistent styling.
 */

import { useEffect, useState } from 'react'
import { FilterBy } from 'components/common/filter-by'
import { CityMultiselect } from './city-multiselect'

interface CityFilterProps {
	value: string[]
	onApply: (cities: string[]) => void
}

export function CityFilter({ value, onApply }: CityFilterProps) {
	const [selectedCities, setSelectedCities] = useState<string[]>(value)

	const hasFilters = value.length > 0

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
			<div className="space-y-2">
				<CityMultiselect
					selectedCities={selectedCities}
					onChange={setSelectedCities}
					placeholder="Seleccionar ciudades..."
					autoOpen={false}
				/>
			</div>
		</FilterBy>
	)
}
