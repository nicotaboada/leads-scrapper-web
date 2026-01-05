/**
 * Search Filters Row Component
 *
 * A reusable search input component with debouncing support.
 * Positioned between the page header and content for filtering results.
 */

import { Search, X } from 'lucide-react'
import { StatusFilter } from 'components/filters/status-filter'
import { Input } from 'components/ui/input'

interface SearchFiltersRowProps {
	/**
	 * Current search value
	 */
	searchValue: string

	/**
	 * Callback fired when search value changes
	 */
	onSearchChange: (value: string) => void

	/**
	 * Current filter values
	 */
	filters: Record<string, string | null>

	/**
	 * Callback to apply a filter
	 */
	onFilterApply: (key: string, value: string | null) => void

	/**
	 * Callback to clear a filter
	 */
	_onFilterClear?: (key: string) => void

	/**
	 * Placeholder text for the search input
	 */
	placeholder?: string

	/**
	 * Additional CSS classes
	 */
	className?: string
}

/**
 * Search and filters row component
 *
 * Displays a search input with search icon and clear button,
 * followed by optional filter buttons (FilterBy components).
 */
export function SearchFiltersRow({
	searchValue,
	onSearchChange,
	filters,
	onFilterApply,
	_onFilterClear,
	placeholder = 'Search...',
	className = '',
}: SearchFiltersRowProps) {
	const handleClear = () => {
		onSearchChange('')
	}

	return (
		<div className={`flex items-center gap-2 ${className}`}>
			<div className="relative w-full flex-[0.23]">
				{/* Search Icon */}
				<Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />

				{/* Search Input */}
				<Input
					type="text"
					placeholder={placeholder}
					value={searchValue}
					className="pr-8 pl-8"
					onChange={(e) => onSearchChange(e.target.value)}
				/>

				{/* Clear Button */}
				{searchValue && (
					<button
						type="button"
						onClick={handleClear}
						className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer transition-colors"
						aria-label="Clear search"
					>
						<X className="h-4 w-4" />
					</button>
				)}
			</div>

			{/* Filter Buttons */}
			<StatusFilter
				value={filters.status}
				onApply={(value) => onFilterApply('status', value)}
			/>
		</div>
	)
}
