'use client'

import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'
import { toast } from 'sonner'
import { UserPlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BulkCreateModal } from '@/modules/runs/components/bulk-create-modal'
import { LeadsEnrichmentTab } from '@/modules/runs/components/leads-enrichment-tab'
import { RunDetailHeader } from '@/modules/runs/components/run-detail-header'
import {
	type RunDetailTab,
	RunDetailTabs,
} from '@/modules/runs/components/run-detail-tabs'
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
	const searchParams = useSearchParams()
	const runId = params.id as string

	// Tab state from URL
	const tabParam = searchParams.get('tab')
	const activeTab: RunDetailTab = tabParam === 'leads' ? 'leads' : 'overview'

	// Handle tab change with URL update
	const handleTabChange = useCallback(
		(tab: RunDetailTab) => {
			const url = new URL(window.location.href)
			if (tab === 'overview') {
				url.searchParams.delete('tab')
			} else {
				url.searchParams.set('tab', tab)
			}
			router.push(url.pathname + url.search)
		},
		[router]
	)

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

	const pageIds = results.map((r: { id: string }) => r.id)
	const selectedCount = getSelectedCount()
	const headerCheckboxState = getHeaderCheckboxState(pageIds)
	const hasSelection = selectedCount > 0

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

			{/* Results Header: Title and Create Contacts Button */}
			<div className="flex items-center justify-between">
				<h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
					Results
				</h2>
				<Button
					onClick={handleCreateContactsClick}
					disabled={isCreating || !hasSelection}
					className="bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200 transition-all duration-200 shadow-sm"
				>
					<UserPlusIcon className="mr-2 size-4" />
					Create Contacts
				</Button>
			</div>

			{/* Tab Navigation */}
			<RunDetailTabs activeTab={activeTab} onTabChange={handleTabChange} />

			{/* Tab Content */}
			{activeTab === 'overview' ? (
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
			) : (
				<LeadsEnrichmentTab
					runId={runId}
					scrapeLeadsEnabled={
						displayRun?.input?.scrapeReviewsPersonalData ?? false
					}
					onAddContacts={handleCreateContactsClick}
				/>
			)}

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
