'use client'

/**
 * Leads Enrichment Tab Component
 *
 * Container component for the leads enrichment table and bulk actions.
 * Displays person leads extracted from the run with selection and contact creation.
 */

import { Users } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { TableEmptyState } from '@/components/common/table-empty-state'
import { useBulkCreatePersonContacts } from '../hooks/use-bulk-create-person-contacts'
import { useBulkSelection } from '../hooks/use-bulk-selection'
import { useRunLeads } from '../hooks/use-run-leads'
import { LeadsCompanyWarningModal } from './leads-company-warning-modal'
import { LeadsEnrichmentTable } from './leads-enrichment-table'

interface LeadsEnrichmentTabProps {
	/**
	 * ID of the run to fetch leads for
	 */
	runId: string
	/**
	 * Whether leads enrichment was enabled for this run
	 */
	scrapeLeadsEnabled: boolean
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
}: LeadsEnrichmentTabProps) {
	const router = useRouter()

	// Pagination state
	const [page, setPage] = useState(1)
	const [pageSize, setPageSize] = useState(10)

	// Modal state
	const [isWarningModalOpen, setIsWarningModalOpen] = useState(false)

	// Fetch leads data
	const { leads, pageInfo, loading } = useRunLeads({
		runId,
		page,
		pageSize,
		enabled: scrapeLeadsEnabled,
	})

	const totalCount = pageInfo?.totalCount ?? 0

	// Bulk selection
	const {
		toggleItem,
		selectNone,
		selectPage,
		selectAll,
		isSelected,
		getSelectedCount,
		getHeaderCheckboxState,
		getSelectionPayload,
	} = useBulkSelection({ totalCount })

	// Bulk create mutation
	const { bulkCreate, loading: isCreating } = useBulkCreatePersonContacts()

	const pageIds = leads.map((l) => l.id)
	const selectedCount = getSelectedCount()
	const headerCheckboxState = getHeaderCheckboxState(pageIds)

	// Reset to page 1 when page size changes
	const handlePageSizeChange = (newPageSize: number) => {
		setPageSize(newPageSize)
		setPage(1)
	}

	// Handle add contacts button click - opens warning modal
	const handleAddContactsClick = () => {
		setIsWarningModalOpen(true)
	}

	// Handle confirm bulk create from modal
	const handleConfirmBulkCreate = async () => {
		try {
			const payload = getSelectionPayload()

			const result = await bulkCreate({
				runId,
				selectionMode: payload.selectionMode,
				selectedIds: payload.selectedIds,
				deselectedIds: payload.deselectedIds,
			})

			setIsWarningModalOpen(false)
			selectNone()

			// Show appropriate toast based on results
			if (result.errorCount === 0 && result.createdWithoutCompanyCount === 0) {
				toast.success(`${result.createdCount} contacts created successfully`)
			} else if (result.createdWithoutCompanyCount > 0) {
				toast.warning(
					`${result.createdCount} contacts created. ${result.createdWithoutCompanyCount} created without company.`
				)
			} else if (result.errorCount > 0) {
				toast.warning(
					`${result.createdCount} contacts created. ${result.errorCount} failed.`
				)
			}

			// Redirect to contacts page
			router.push('/contacts')
		} catch (error) {
			console.error('Error creating contacts:', error)
			toast.error('Failed to create contacts. Please try again.')
		}
	}

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
		<div>
			<h2 className="mb-4 text-xl font-semibold">Leads</h2>
			<LeadsEnrichmentTable
				leads={leads}
				pageInfo={pageInfo}
				loading={loading}
				onPageChange={setPage}
				onPageSizeChange={handlePageSizeChange}
				// Bulk selection props
				selectedCount={selectedCount}
				headerCheckboxState={headerCheckboxState}
				isSelected={isSelected}
				onToggleItem={toggleItem}
				onSelectNone={selectNone}
				onSelectPage={selectPage}
				onSelectAll={selectAll}
				onAddContacts={handleAddContactsClick}
				isAddingContacts={isCreating}
			/>

			{/* Company Warning Modal */}
			<LeadsCompanyWarningModal
				open={isWarningModalOpen}
				onOpenChange={setIsWarningModalOpen}
				selectedCount={selectedCount}
				onCancel={() => setIsWarningModalOpen(false)}
				onProceed={handleConfirmBulkCreate}
				loading={isCreating}
			/>
		</div>
	)
}

