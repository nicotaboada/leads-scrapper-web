'use client'

import { Activity, PlusIcon } from 'lucide-react'
import { useState } from 'react'
import { TableEmptyState } from '@/components/common/table-empty-state'
import { SectionHeader } from '@/components/layouts/section-header'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { CreateRunSheet } from '@/modules/runs/components/create-run-sheet'
import { RunsTable } from '@/modules/runs/components/runs-table'
import { useRunsGraphQL } from '@/modules/runs/hooks/use-runs-graphql'
import type { CreateRunFormInput } from '@/modules/runs/types/create-run'
import { SearchFiltersRow } from '@/modules/students/components/search-filters-row'

/**
 * Runs page component
 * Displays a list of scraping runs with search and pagination using GraphQL
 */
export default function RunsPage() {
	const [searchQuery, setSearchQuery] = useState('')
	const [filters] = useState({})
	const [isCreateSheetOpen, setIsCreateSheetOpen] = useState(false)

	// Fetch runs using GraphQL
	const { runs, loading: isLoading, refetch } = useRunsGraphQL({})

	// Filter runs by search query (client-side for now)
	const filteredRuns = runs.filter((run) =>
		run.name.toLowerCase().includes(searchQuery.toLowerCase())
	)

	/**
	 * Handles opening the create run sheet
	 */
	function handleCreateRun() {
		setIsCreateSheetOpen(true)
	}

	/**
	 * Handles successful run creation
	 * Refetches the runs list
	 */
	function handleRunCreated(data: CreateRunFormInput) {
		// Refetch runs (the mutation already updates the cache, but this ensures consistency)
		refetch()

		// Close the sheet
		setIsCreateSheetOpen(false)
	}

	return (
		<div className="space-y-6">
			<SectionHeader
				title="Runs"
				subtitle="Monitor and track your scraping job executions"
				actions={
					<Button className="cursor-pointer" onClick={handleCreateRun}>
						<PlusIcon className="mr-2 h-4 w-4" />
						Add Run
					</Button>
				}
			/>

			<div className="pt-2">
				<SearchFiltersRow
					searchValue={searchQuery}
					onSearchChange={setSearchQuery}
					filters={filters}
					onFilterApply={() => {}}
					onFilterClear={() => {}}
					placeholder="Search runs by name..."
				/>
			</div>

			{isLoading ? (
				<div className="space-y-4">
					<Skeleton className="h-12 w-full" />
					<Skeleton className="h-12 w-full" />
					<Skeleton className="h-12 w-full" />
					<Skeleton className="h-12 w-full" />
					<Skeleton className="h-12 w-full" />
				</div>
			) : filteredRuns.length === 0 && searchQuery ? (
				<TableEmptyState
					icon={Activity}
					title="No runs found"
					description="Try adjusting your search to find what you're looking for."
				/>
			) : filteredRuns.length === 0 ? (
				<TableEmptyState
					icon={Activity}
					title="No runs yet"
					description="Your scraping runs will appear here once you start a job."
					action={
						<Button className="mt-4 cursor-pointer" onClick={handleCreateRun}>
							<PlusIcon className="mr-2 h-4 w-4" />
							Create your first run
						</Button>
					}
				/>
			) : (
				<div className="space-y-4">
					<RunsTable runs={filteredRuns} />
				</div>
			)}

			<CreateRunSheet
				open={isCreateSheetOpen}
				onOpenChange={setIsCreateSheetOpen}
				onRunCreated={handleRunCreated}
			/>
		</div>
	)
}
