'use client'

import { UserPlusIcon } from 'lucide-react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { BulkCreateModal } from '@/modules/runs/components/bulk-create-modal'
import { LeadsCompanyWarningModal } from '@/modules/runs/components/leads-company-warning-modal'
import { LeadsEnrichmentTab } from '@/modules/runs/components/leads-enrichment-tab'
import { RunDetailHeader } from '@/modules/runs/components/run-detail-header'
import {
	type RunDetailTab,
	RunDetailTabs,
} from '@/modules/runs/components/run-detail-tabs'
import { RunResultsTable } from '@/modules/runs/components/run-results-table'
import { RunStatusSection } from '@/modules/runs/components/run-status-section'
import { useBulkCreateCompanies } from '@/modules/runs/hooks/use-bulk-create-companies'
import { useBulkCreatePersonContacts } from '@/modules/runs/hooks/use-bulk-create-person-contacts'
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

	// Pagination state for Overview tab
	const [overviewPage, setOverviewPage] = useState(1)
	const [overviewPageSize, setOverviewPageSize] = useState(10)

	// Pagination state for Leads tab
	const [leadsPage, setLeadsPage] = useState(1)
	const [leadsPageSize, setLeadsPageSize] = useState(10)
	const [leadsTotalCount, setLeadsTotalCount] = useState(0)
	const [leadsPageIds, setLeadsPageIds] = useState<string[]>([])

	// Modal state
	const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false)
	const [isPersonModalOpen, setIsPersonModalOpen] = useState(false)

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
		page: overviewPage,
		pageSize: overviewPageSize,
		enabled: true,
		initialRun: run,
	})

	// Use the run from results hook or fallback to initial run
	const displayRun = currentRun || run
	const overviewTotalCount = pageInfo?.totalCount ?? 0

	// Bulk selection for Overview tab (Companies)
	const {
		toggleItem: toggleOverviewItem,
		selectNone: selectOverviewNone,
		selectPage: selectOverviewPage,
		selectAll: selectOverviewAll,
		isSelected: isOverviewSelected,
		getSelectedCount: getOverviewSelectedCount,
		getHeaderCheckboxState: getOverviewHeaderCheckboxState,
		getSelectionPayload: getOverviewSelectionPayload,
	} = useBulkSelection({ totalCount: overviewTotalCount })

	// Bulk selection for Leads tab (Persons)
	const {
		toggleItem: toggleLeadsItem,
		selectNone: selectLeadsNone,
		selectPage: selectLeadsPage,
		selectAll: selectLeadsAll,
		isSelected: isLeadsSelected,
		getSelectedCount: getLeadsSelectedCount,
		getHeaderCheckboxState: getLeadsHeaderCheckboxState,
		getSelectionPayload: getLeadsSelectionPayload,
	} = useBulkSelection({ totalCount: leadsTotalCount })

	// Bulk create mutations
	const { bulkCreate: bulkCreateCompanies, loading: isCreatingCompanies } =
		useBulkCreateCompanies()
	const { bulkCreate: bulkCreatePersons, loading: isCreatingPersons } =
		useBulkCreatePersonContacts()

	const isCreating = isCreatingCompanies || isCreatingPersons

	// Overview tab selection state
	const overviewPageIds = results.map((r: { id: string }) => r.id)
	const overviewSelectedCount = getOverviewSelectedCount()
	const overviewHeaderCheckboxState =
		getOverviewHeaderCheckboxState(overviewPageIds)

	// Leads tab selection state
	const leadsSelectedCount = getLeadsSelectedCount()
	const leadsHeaderCheckboxState = getLeadsHeaderCheckboxState(leadsPageIds)

	// Determine which selection count to show based on active tab
	const activeSelectedCount =
		activeTab === 'overview' ? overviewSelectedCount : leadsSelectedCount
	const hasSelection = activeSelectedCount > 0

	// Handle tab change with URL update and reset selections
	const handleTabChange = useCallback(
		(tab: RunDetailTab) => {
			// Reset the OTHER tab's selection when switching
			if (tab === 'overview') {
				selectLeadsNone()
			} else {
				selectOverviewNone()
			}

			const url = new URL(window.location.href)
			if (tab === 'overview') {
				url.searchParams.delete('tab')
			} else {
				url.searchParams.set('tab', tab)
			}
			router.push(url.pathname + url.search)
		},
		[router, selectLeadsNone, selectOverviewNone]
	)

	// Reset to page 1 when page size changes (Overview)
	const handleOverviewPageSizeChange = (newPageSize: number) => {
		setOverviewPageSize(newPageSize)
		setOverviewPage(1)
	}

	// Reset to page 1 when page size changes (Leads)
	const handleLeadsPageSizeChange = (newPageSize: number) => {
		setLeadsPageSize(newPageSize)
		setLeadsPage(1)
	}

	// Handle create contacts button click - opens correct modal based on tab
	const handleCreateContactsClick = () => {
		if (activeTab === 'overview') {
			setIsCompanyModalOpen(true)
		} else {
			setIsPersonModalOpen(true)
		}
	}

	// Handle confirm bulk create for Companies (Overview tab)
	const handleConfirmBulkCreateCompanies = async () => {
		try {
			const payload = getOverviewSelectionPayload()

			const result = await bulkCreateCompanies({
				runId,
				selectionMode: payload.selectionMode,
				selectedIds: payload.selectedIds,
				deselectedIds: payload.deselectedIds,
				page: overviewPage,
				pageSize: overviewPageSize,
			})

			setIsCompanyModalOpen(false)
			selectOverviewNone()

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

	// Handle confirm bulk create for Persons (Leads tab)
	const handleConfirmBulkCreatePersons = async () => {
		try {
			const payload = getLeadsSelectionPayload()

			const result = await bulkCreatePersons({
				runId,
				selectionMode: payload.selectionMode,
				selectedIds: payload.selectedIds,
				deselectedIds: payload.deselectedIds,
			})

			setIsPersonModalOpen(false)
			selectLeadsNone()

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
					className="bg-zinc-900 text-zinc-50 shadow-sm transition-all duration-200 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200"
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
					onPageChange={setOverviewPage}
					onPageSizeChange={handleOverviewPageSizeChange}
					// Bulk selection props
					selectedCount={overviewSelectedCount}
					headerCheckboxState={overviewHeaderCheckboxState}
					isSelected={isOverviewSelected}
					onToggleItem={toggleOverviewItem}
					onSelectNone={selectOverviewNone}
					onSelectPage={selectOverviewPage}
					onSelectAll={selectOverviewAll}
					onCreateContacts={handleCreateContactsClick}
					isCreatingContacts={isCreatingCompanies}
				/>
			) : (
				<LeadsEnrichmentTab
					runId={runId}
					scrapeLeadsEnabled={
						displayRun?.input?.scrapeReviewsPersonalData ?? false
					}
					page={leadsPage}
					pageSize={leadsPageSize}
					onPageChange={setLeadsPage}
					onPageSizeChange={handleLeadsPageSizeChange}
					// Bulk selection props
					selectedCount={leadsSelectedCount}
					headerCheckboxState={leadsHeaderCheckboxState}
					isSelected={isLeadsSelected}
					onToggleItem={toggleLeadsItem}
					onSelectNone={selectLeadsNone}
					onSelectPage={selectLeadsPage}
					onSelectAll={selectLeadsAll}
					onTotalCountChange={setLeadsTotalCount}
					onPageIdsChange={setLeadsPageIds}
				/>
			)}

			{/* Bulk Create Modal for Companies (Overview tab) */}
			<BulkCreateModal
				open={isCompanyModalOpen}
				onOpenChange={setIsCompanyModalOpen}
				selectedCount={overviewSelectedCount}
				onConfirm={handleConfirmBulkCreateCompanies}
				loading={isCreatingCompanies}
			/>

			{/* Bulk Create Modal for Persons (Leads tab) */}
			<LeadsCompanyWarningModal
				open={isPersonModalOpen}
				onOpenChange={setIsPersonModalOpen}
				selectedCount={leadsSelectedCount}
				onCancel={() => setIsPersonModalOpen(false)}
				onProceed={handleConfirmBulkCreatePersons}
				loading={isCreatingPersons}
			/>
		</div>
	)
}
