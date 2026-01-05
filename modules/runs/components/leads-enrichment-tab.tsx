'use client'

/**
 * Leads Enrichment Tab Component
 *
 * Container component for the leads enrichment table and bulk actions.
 * Displays person leads extracted from the run with selection and contact creation.
 */

import { Users } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { TableEmptyState } from '@/components/common/table-empty-state'
import { LeadsEnrichmentTable } from './leads-enrichment-table'
import { useRunLeads } from '../hooks/use-run-leads'
import type {
	HeaderCheckboxState,
	SelectionPayload,
} from '../types/bulk-actions'

/**
 * Selection state exposed to parent component
 */
export interface LeadsSelectionState {
	selectedCount: number
	headerCheckboxState: HeaderCheckboxState
	pageIds: string[]
	getSelectionPayload: () => SelectionPayload
}

interface LeadsEnrichmentTabProps {
	/**
	 * ID of the run to fetch leads for
	 */
	runId: string
	/**
	 * Whether leads enrichment was enabled for this run
	 */
	scrapeLeadsEnabled: boolean
	/**
	 * Pagination state
	 */
	page: number
	pageSize: number
	onPageChange: (page: number) => void
	onPageSizeChange: (pageSize: number) => void
	/**
	 * Bulk selection props passed from parent
	 */
	selectedCount: number
	headerCheckboxState: HeaderCheckboxState
	isSelected: (id: string) => boolean
	onToggleItem: (id: string) => void
	onSelectNone: () => void
	onSelectPage: (pageIds: string[]) => void
	onSelectAll: () => void
	/**
	 * Callback to update parent with total count for selection calculations
	 */
	onTotalCountChange?: (totalCount: number) => void
	/**
	 * Callback to update parent with current page IDs for checkbox state
	 */
	onPageIdsChange?: (pageIds: string[]) => void
}

/**
 * LeadsEnrichmentTab component
 *
 * Displays the leads enrichment table with pagination and bulk selection.
 * Shows appropriate empty state when enrichment was not enabled.
 *
 * @param runId - ID of the run to fetch leads for
 * @param scrapeLeadsEnabled - Whether leads enrichment was enabled for this run
 */
export function LeadsEnrichmentTab({
	runId,
	scrapeLeadsEnabled,
	page,
	pageSize,
	onPageChange,
	onPageSizeChange,
	selectedCount,
	headerCheckboxState,
	isSelected,
	onToggleItem,
	onSelectNone,
	onSelectPage,
	onSelectAll,
	onTotalCountChange,
	onPageIdsChange,
}: LeadsEnrichmentTabProps) {
	// Fetch leads data
	const { leads, pageInfo, loading } = useRunLeads({
		runId,
		page,
		pageSize,
		enabled: scrapeLeadsEnabled,
	})

	const totalCount = pageInfo?.totalCount ?? 0
	const pageIds = leads.map((l) => l.id)

	// Track previous values to avoid infinite loops
	const prevTotalCountRef = useRef<number | undefined>(undefined)
	const prevPageIdsKeyRef = useRef<string | undefined>(undefined)
	const pageIdsKey = pageIds.join(',')

	// Notify parent of total count changes (only when value actually changes)
	useEffect(() => {
		if (onTotalCountChange && prevTotalCountRef.current !== totalCount) {
			prevTotalCountRef.current = totalCount
			onTotalCountChange(totalCount)
		}
	}, [totalCount, onTotalCountChange])

	// Notify parent of page IDs changes (only when IDs actually change)
	useEffect(() => {
		if (onPageIdsChange && prevPageIdsKeyRef.current !== pageIdsKey) {
			prevPageIdsKeyRef.current = pageIdsKey
			onPageIdsChange(pageIds)
		}
	}, [pageIdsKey, pageIds, onPageIdsChange])

	// Show empty state if leads enrichment was not enabled
	if (!scrapeLeadsEnabled) {
		return (
			<div className="py-8">
				<TableEmptyState
					icon={Users}
					title="Leads enrichment was not enabled"
					description="Enable leads enrichment when creating a new run to collect person leads with LinkedIn profiles, emails, and phone numbers."
				/>
			</div>
		)
	}

	return (
		<LeadsEnrichmentTable
			leads={leads}
			pageInfo={pageInfo}
			loading={loading}
			onPageChange={onPageChange}
			onPageSizeChange={onPageSizeChange}
			// Bulk selection props
			selectedCount={selectedCount}
			headerCheckboxState={headerCheckboxState}
			isSelected={isSelected}
			onToggleItem={onToggleItem}
			onSelectNone={onSelectNone}
			onSelectPage={onSelectPage}
			onSelectAll={onSelectAll}
		/>
	)
}
