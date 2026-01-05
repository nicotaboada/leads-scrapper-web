'use client'

/**
 * Tags Filter Component
 *
 * Filter component for filtering contacts by tags.
 * Uses the FilterBy component for consistent styling.
 */

import { useEffect, useState } from 'react'
import { FilterBy } from 'components/common/filter-by'
import { TagMultiselect } from 'modules/tags/components/tag-multiselect'
import { useAllTags } from 'modules/tags/hooks/use-all-tags'

interface TagsFilterProps {
	value: string[]
	onApply: (tagIds: string[]) => void
	/**
	 * Pre-fetched tags to use instead of fetching internally.
	 * When provided, improves performance by avoiding additional API calls.
	 */
	availableTags?: Array<{ id: string; name: string; color?: string | null }>
}

export function TagsFilter({ value, onApply, availableTags }: TagsFilterProps) {
	const [selectedTags, setSelectedTags] = useState<string[]>(value)
	// Use pre-fetched tags if provided, otherwise fetch internally
	const { tags: fetchedTags } = useAllTags()
	const tags = availableTags ?? fetchedTags

	const hasFilters = value.length > 0

	// Sync internal state with prop value
	useEffect(() => {
		setSelectedTags(value)
	}, [value])

	function handleApply() {
		onApply(selectedTags)
	}

	function handleClear() {
		setSelectedTags([])
		onApply([])
	}

	function getDisplayValue(): string | undefined {
		if (!hasFilters) return undefined
		const selectedTagNames = tags
			.filter((tag) => value.includes(tag.id))
			.map((tag) => tag.name)
		if (selectedTagNames.length === 1) {
			return selectedTagNames[0]
		}
		return `${selectedTagNames.length} tags`
	}

	return (
		<FilterBy
			label="Tags"
			isActive={hasFilters}
			selectedValue={getDisplayValue()}
			onApply={handleApply}
			onClear={handleClear}
		>
			<div className="space-y-2">
				<TagMultiselect
					selectedTagIds={selectedTags}
					onChange={setSelectedTags}
					placeholder="Seleccionar tags..."
					autoOpen={false}
					availableTags={availableTags}
				/>
			</div>
		</FilterBy>
	)
}
