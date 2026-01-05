import { useCallback, useMemo, useState } from 'react'

/** Type for filter values */
type FilterValue = string | number | boolean | null | undefined

/**
 * Options for the useTableFilters hook
 */
interface UseTableFiltersOptions {
	/**
	 * Initial filter values
	 */
	initialFilters?: Record<string, FilterValue>

	/**
	 * Callback fired when any filter changes
	 */
	onChange?: (filters: Record<string, FilterValue>) => void
}

/**
 * Return type of the useTableFilters hook
 */
interface UseTableFiltersReturn {
	/**
	 * Current filter values
	 */
	filters: Record<string, FilterValue>

	/**
	 * Set a specific filter value
	 */
	setFilter: (key: string, value: FilterValue) => void

	/**
	 * Clear a specific filter
	 */
	clearFilter: (key: string) => void

	/**
	 * Clear all filters
	 */
	clearAllFilters: () => void

	/**
	 * Number of active filters (non-null values)
	 */
	activeFiltersCount: number

	/**
	 * Filters formatted for API queries (removes null/undefined values)
	 */
	queryFilters: Record<string, NonNullable<FilterValue>>
}

/**
 * useTableFilters Hook
 *
 * A simple hook to manage table filters state and provide utilities
 * for setting, clearing, and formatting filters for API queries.
 *
 * @example
 * ```tsx
 * const { filters, setFilter, clearFilter, clearAllFilters, activeFiltersCount, queryFilters } = useTableFilters({
 *   initialFilters: {
 *     status: null,
 *     hasCard: null,
 *   },
 *   onChange: (filters) => {
 *     console.log('Filters changed:', filters)
 *     resetPage()
 *   }
 * })
 *
 * // Use in component
 * <StatusFilter
 *   value={filters.status}
 *   onApply={(value) => setFilter('status', value)}
 * />
 *
 * // Pass to API
 * useBackendPagination({
 *   query: GET_CONTACTS,
 *   queryVariables: {
 *     search: searchQuery,
 *     ...queryFilters
 *   }
 * })
 * ```
 */
export function useTableFilters(
	options: UseTableFiltersOptions = {}
): UseTableFiltersReturn {
	const { initialFilters = {}, onChange } = options

	const [filters, setFilters] =
		useState<Record<string, FilterValue>>(initialFilters)

	const setFilter = useCallback(
		(key: string, value: FilterValue) => {
			setFilters((prev) => {
				const newFilters = { ...prev, [key]: value }
				onChange?.(newFilters)
				return newFilters
			})
		},
		[onChange]
	)

	const clearFilter = useCallback(
		(key: string) => {
			setFilters((prev) => {
				const { [key]: _, ...rest } = prev
				const newFilters = { ...rest, [key]: null }
				onChange?.(newFilters)
				return newFilters
			})
		},
		[onChange]
	)

	const clearAllFilters = useCallback(() => {
		const clearedFilters = Object.keys(filters).reduce(
			(acc, key) => ({ ...acc, [key]: null }),
			{}
		)
		setFilters(clearedFilters)
		onChange?.(clearedFilters)
	}, [filters, onChange])

	const activeFiltersCount = useMemo(() => {
		return Object.values(filters).filter(
			(value) => value !== null && value !== undefined && value !== ''
		).length
	}, [filters])

	const queryFilters = useMemo(() => {
		return Object.entries(filters).reduce(
			(acc, [key, value]) => {
				if (value !== null && value !== undefined && value !== '') {
					acc[key] = value
				}
				return acc
			},
			{} as Record<string, NonNullable<FilterValue>>
		)
	}, [filters])

	return {
		filters,
		setFilter,
		clearFilter,
		clearAllFilters,
		activeFiltersCount,
		queryFilters,
	}
}
