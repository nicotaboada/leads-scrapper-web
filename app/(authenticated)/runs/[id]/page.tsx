'use client'

import { useParams } from 'next/navigation'
import { useState } from 'react'
import { RunDetailHeader } from '@/modules/runs/components/run-detail-header'
import { RunResultsTable } from '@/modules/runs/components/run-results-table'
import { RunStatusSection } from '@/modules/runs/components/run-status-section'
import { useRunDetail } from '@/modules/runs/hooks/use-run-detail'
import { useRunResults } from '@/modules/runs/hooks/use-run-results'
import { RunStatus } from '@/modules/runs/types/run'

/**
 * Run detail page showing status and paginated results
 */
export default function RunDetailPage() {
	const params = useParams()
	const runId = params.id as string

	// Pagination state
	const [page, setPage] = useState(1)
	const [pageSize, setPageSize] = useState(10)

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
		enabled: true, // ✅ Execute in parallel with GET_RUN
		initialRun: run,
	})

	// Use the run from results hook or fallback to initial run
	const displayRun = currentRun || run

	// Reset to page 1 when page size changes
	const handlePageSizeChange = (newPageSize: number) => {
		setPageSize(newPageSize)
		setPage(1)
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
				/>
			</div>
		</div>
	)
}
