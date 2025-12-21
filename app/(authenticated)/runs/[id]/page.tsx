'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { BulkCreateModal } from '@/modules/runs/components/bulk-create-modal'
import { RunDetailHeader } from '@/modules/runs/components/run-detail-header'
import { RunResultsTable } from '@/modules/runs/components/run-results-table'
import { RunStatusSection } from '@/modules/runs/components/run-status-section'
import { useBulkCreateCompanies } from '@/modules/runs/hooks/use-bulk-create-companies'
import { useBulkSelection } from '@/modules/runs/hooks/use-bulk-selection'
import { useRunDetail } from '@/modules/runs/hooks/use-run-detail'
import { useRunResults } from '@/modules/runs/hooks/use-run-results'
import { RunStatus } from '@/modules/runs/types/run'

/**
 * Run detail page showing status and paginated results with bulk actions
 */
export default function RunDetailPage() {
	const params = useParams()
	const router = useRouter()
	const runId = params.id as string

	// Pagination state
	const [page, setPage] = useState(1)
	const [pageSize, setPageSize] = useState(10)

	// Modal state
	const [isModalOpen, setIsModalOpen] = useState(false)

	// Fetch run details
	const { run, loading: runLoading, error: runError } = useRunDetail(runId)

	// Fetch paginated results with automatic subscription management
	const {
		results,
		pageInfo,
		currentRun,
		loading: resultsLoading,
		subscriptionActive,
	} = useRunResults({
		runId,
		page,
		pageSize,
		enabled: true,
		initialRun: run,
	})

	// Use the run from results hook or fallback to initial run
	const displayRun = currentRun || run
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
	const { bulkCreate, loading: isCreating } = useBulkCreateCompanies()

	const pageIds = results.map((r) => r.id)
	const selectedCount = getSelectedCount()
	const headerCheckboxState = getHeaderCheckboxState(pageIds)

	// Reset to page 1 when page size changes
	const handlePageSizeChange = (newPageSize: number) => {
		setPageSize(newPageSize)
		setPage(1)
	}

	// Handle create contacts button click
	const handleCreateContactsClick = () => {
		setIsModalOpen(true)
	}

	// Handle confirm bulk create
	const handleConfirmBulkCreate = async () => {
		try {
			const payload = getSelectionPayload()

			const result = await bulkCreate({
				runId,
				selectionMode: payload.selectionMode,
				selectedIds: payload.selectedIds,
				deselectedIds: payload.deselectedIds,
				page,
				pageSize,
			})

			setIsModalOpen(false)
			selectNone()

			if (result.errorCount === 0) {
				toast.success(`${result.createdCount} contacts created successfully`)
			} else {
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

	// Handle errors
	if (runError) {
		return (
			<div className="container py-8">
				<div className="rounded-lg border border-red-200 bg-red-50 p-6 dark:border-red-800 dark:bg-red-950/30">
					<h2 className="text-lg font-semibold text-red-900 dark:text-red-100">
						Error loading run
					</h2>
					<p className="mt-2 text-sm text-red-700 dark:text-red-300">
						{runError.message ||
							'Failed to load run details. Please try again.'}
					</p>
				</div>
			</div>
		)
	}

	// Handle not found
	if (!runLoading && !displayRun) {
		return (
			<div className="container py-8">
				<div className="rounded-lg border border-dashed p-12 text-center">
					<h2 className="text-lg font-semibold">Run not found</h2>
					<p className="text-muted-foreground mt-2 text-sm">
						The run you are looking for does not exist or has been deleted.
					</p>
				</div>
			</div>
		)
	}

	return (
		<div className="container space-y-6 py-8">
			{/* Header with breadcrumb and actions */}
			<RunDetailHeader runName={displayRun?.name || ''} loading={runLoading} />

			{/* Status Section */}
			<RunStatusSection
				status={displayRun?.status || RunStatus.PAUSED}
				runName={displayRun?.name || ''}
				apifyUrl={displayRun?.runId}
				loading={runLoading}
			/>

			{/* Results Table */}
			<div>
				<h2 className="mb-4 text-xl font-semibold">Results</h2>
				<RunResultsTable
					results={results}
					pageInfo={pageInfo}
					loading={resultsLoading}
					runStatus={displayRun?.status || RunStatus.PAUSED}
					subscriptionActive={subscriptionActive}
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
					onCreateContacts={handleCreateContactsClick}
					isCreatingContacts={isCreating}
				/>
			</div>

			{/* Bulk Create Modal */}
			<BulkCreateModal
				open={isModalOpen}
				onOpenChange={setIsModalOpen}
				selectedCount={selectedCount}
				onConfirm={handleConfirmBulkCreate}
				loading={isCreating}
			/>
		</div>
	)
}
