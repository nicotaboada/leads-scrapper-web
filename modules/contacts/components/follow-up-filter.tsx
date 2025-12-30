'use client'

/**
 * Follow-up Filter Component
 *
 * A filter component for filtering contacts by follow-up status.
 * Uses the FilterBy component with emoji indicators.
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
import { FOLLOW_UP_FILTER_CONFIG, FollowUpFilterValue } from '../types'

interface FollowUpFilterProps {
	/**
	 * Current follow-up filter value
	 */
	value: FollowUpFilterValue | null

	/**
	 * Callback fired when the filter is applied
	 */
	onApply: (value: FollowUpFilterValue | null) => void
}

/**
 * FollowUpFilter Component
 *
 * A pre-built filter component for filtering by follow-up status.
 * Uses the FilterBy component internally with a Select dropdown.
 *
 * @example
 * ```tsx
 * const [followUpFilter, setFollowUpFilter] = useState<FollowUpFilterValue | null>(null)
 *
 * <FollowUpFilter
 *   value={followUpFilter}
 *   onApply={setFollowUpFilter}
 * />
 * ```
 */
export function FollowUpFilter({ value, onApply }: FollowUpFilterProps) {
	const [selectedValue, setSelectedValue] = useState<FollowUpFilterValue | null>(
		value
	)

	const options = Object.entries(FOLLOW_UP_FILTER_CONFIG).map(
		([filterValue, config]) => ({
			value: filterValue as FollowUpFilterValue,
			label: config.label,
			color: config.color,
		})
	)

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

	function getDisplayValue(): React.ReactNode | undefined {
		if (!value) return undefined
		const config = FOLLOW_UP_FILTER_CONFIG[value]
		if (!config) return undefined

		return (
			<div className="flex items-center gap-2">
				<span className={cn('h-2 w-2 rounded-full', config.color)} />
				<span>{config.label}</span>
			</div>
		)
	}

	return (
		<FilterBy
			label="Follow-up"
			isActive={!!value}
			selectedValue={getDisplayValue()}
			onApply={handleApply}
			onClear={handleClear}
		>
			<div className="space-y-2">
				<Select
					value={selectedValue || ''}
					onValueChange={(val) => setSelectedValue(val as FollowUpFilterValue)}
				>
					<SelectTrigger className="w-full">
						<SelectValue placeholder="Seleccionar estado" />
					</SelectTrigger>
					<SelectContent>
						{options.map((option) => (
							<SelectItem key={option.value} value={option.value}>
								<div className="flex items-center gap-2">
									<span className={cn('h-2.5 w-2.5 rounded-full', option.color)} />
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

