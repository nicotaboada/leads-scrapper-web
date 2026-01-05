'use client'

import { useCallback, useState } from 'react'
import {
	BulkSelectionMode,
	type HeaderCheckboxState,
	type SelectionPayload,
	type SelectionState,
} from '../types/bulk-actions'

interface UseBulkSelectionOptions {
	totalCount: number
}

interface UseBulkSelectionReturn {
	selectionState: SelectionState
	toggleItem: (id: string) => void
	selectNone: () => void
	selectPage: (pageIds: string[]) => void
	selectAll: () => void
	isSelected: (id: string) => boolean
	getSelectedCount: () => number
	getSelectionPayload: () => SelectionPayload
	getHeaderCheckboxState: (pageIds: string[]) => HeaderCheckboxState
	hasSelection: boolean
}

/**
 * Hook for managing bulk selection state across paginated data
 */
export function useBulkSelection({
	totalCount,
}: UseBulkSelectionOptions): UseBulkSelectionReturn {
	const [selectionState, setSelectionState] = useState<SelectionState>({
		mode: 'none',
		selectedIds: new Set(),
		deselectedIds: new Set(),
	})

	/**
	 * Clears all selection
	 */
	const selectNone = useCallback(() => {
		setSelectionState({
			mode: 'none',
			selectedIds: new Set(),
			deselectedIds: new Set(),
		})
	}, [])

	/**
	 * Selects only the items on the current page
	 */
	const selectPage = useCallback((pageIds: string[]) => {
		setSelectionState({
			mode: 'page',
			selectedIds: new Set(pageIds),
			deselectedIds: new Set(),
		})
	}, [])

	/**
	 * Selects all items (using flag, not loading all IDs)
	 */
	const selectAll = useCallback(() => {
		setSelectionState({
			mode: 'all',
			selectedIds: new Set(),
			deselectedIds: new Set(),
		})
	}, [])

	/**
	 * Toggles an individual item's selection
	 */
	const toggleItem = useCallback((id: string) => {
		setSelectionState((prev) => {
			const newState = { ...prev }
			if (prev.mode === 'all') {
				// In "all" mode, toggle means adding/removing from deselected
				const newDeselected = new Set(prev.deselectedIds)
				if (newDeselected.has(id)) {
					newDeselected.delete(id)
				} else {
					newDeselected.add(id)
				}
				return {
					...newState,
					deselectedIds: newDeselected,
				}
			}
			// In other modes, toggle means adding/removing from selected
			const newSelected = new Set(prev.selectedIds)
			if (newSelected.has(id)) {
				newSelected.delete(id)
			} else {
				newSelected.add(id)
			}
			// If we have manual selections, mode is 'manual'
			const mode = newSelected.size > 0 ? 'manual' : 'none'
			return {
				mode,
				selectedIds: newSelected,
				deselectedIds: new Set(),
			}
		})
	}, [])

	/**
	 * Checks if an item is selected based on current mode
	 */
	const isSelected = useCallback(
		(id: string): boolean => {
			if (selectionState.mode === 'all') {
				return !selectionState.deselectedIds.has(id)
			}
			return selectionState.selectedIds.has(id)
		},
		[selectionState]
	)

	/**
	 * Returns the count of selected items
	 */
	const getSelectedCount = useCallback((): number => {
		if (selectionState.mode === 'all') {
			return totalCount - selectionState.deselectedIds.size
		}
		return selectionState.selectedIds.size
	}, [selectionState, totalCount])

	/**
	 * Returns the selection payload for the mutation
	 */
	const getSelectionPayload = useCallback((): SelectionPayload => {
		if (selectionState.mode === 'all') {
			return {
				selectionMode: BulkSelectionMode.ALL_EXCEPT,
				selectedIds: [],
				deselectedIds: Array.from(selectionState.deselectedIds),
			}
		}
		return {
			selectionMode: BulkSelectionMode.SELECTED,
			selectedIds: Array.from(selectionState.selectedIds),
			deselectedIds: [],
		}
	}, [selectionState])

	/**
	 * Returns the visual state for the header checkbox
	 */
	const getHeaderCheckboxState = useCallback(
		(pageIds: string[]): HeaderCheckboxState => {
			if (selectionState.mode === 'none') {
				return 'empty'
			}
			if (selectionState.mode === 'all') {
				if (selectionState.deselectedIds.size === 0) {
					return 'checked'
				}
				return 'indeterminate'
			}
			// Check if all page items are selected
			const allPageSelected = pageIds.every((id) =>
				selectionState.selectedIds.has(id)
			)
			if (allPageSelected && pageIds.length > 0) {
				return 'checked'
			}
			if (selectionState.selectedIds.size > 0) {
				return 'indeterminate'
			}
			return 'empty'
		},
		[selectionState]
	)

	const hasSelection = getSelectedCount() > 0

	return {
		selectionState,
		toggleItem,
		selectNone,
		selectPage,
		selectAll,
		isSelected,
		getSelectedCount,
		getSelectionPayload,
		getHeaderCheckboxState,
		hasSelection,
	}
}
