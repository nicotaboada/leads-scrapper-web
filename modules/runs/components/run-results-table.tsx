'use client'

import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import type { HeaderCheckboxState } from '../types/bulk-actions'
import { RunStatus } from '../types/run'
import type { PageInfo, RunResult } from '../types/run-result'
import { extractGoogleMapsResult } from '../types/run-result'
import { BulkActionHeader } from './bulk-action-header'
import { SelectionDropdown } from './selection-dropdown'

interface RunResultsTableProps {
	results: RunResult[]
	pageInfo: PageInfo | null
	loading: boolean
	runStatus: RunStatus
	subscriptionActive?: boolean
	onPageChange: (page: number) => void
	onPageSizeChange: (pageSize: number) => void
	// Bulk selection props
	selectedCount: number
	headerCheckboxState: HeaderCheckboxState
	isSelected: (id: string) => boolean
	onToggleItem: (id: string) => void
	onSelectNone: () => void
	onSelectPage: (pageIds: string[]) => void
	onSelectAll: () => void
	onCreateContacts: () => void
	isCreatingContacts?: boolean
}

/**
 * Table displaying paginated run results with real-time updates and bulk selection
 */
export function RunResultsTable({
	results,
	pageInfo,
	loading,
	runStatus,
	subscriptionActive = false,
	onPageChange,
	onPageSizeChange,
	selectedCount,
	headerCheckboxState,
	isSelected,
	onToggleItem,
	onSelectNone,
	onSelectPage,
	onSelectAll,
	onCreateContacts,
	isCreatingContacts = false,
}: RunResultsTableProps) {
	const totalCount = pageInfo?.totalCount ?? 0
	const pageIds = results.map((r) => r.id)
	const hasSelection = selectedCount > 0

	const handleSelectPage = () => {
		onSelectPage(pageIds)
	}

	// Loading state - show table structure with spinner
	if (loading && results.length === 0) {
		return (
			<div className="rounded-lg border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[50px]" />
							<TableHead>Place Name</TableHead>
							<TableHead>Website</TableHead>
							<TableHead>City</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell colSpan={4} className="py-16 text-center">
								<Loader2 className="text-muted-foreground mx-auto h-6 w-6 animate-spin" />
								<p className="text-muted-foreground mt-2 text-sm">
									Loading results...
								</p>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</div>
		)
	}

	// Empty state for running runs with no results yet
	if (
		(runStatus === RunStatus.PENDING || runStatus === RunStatus.RUNNING) &&
		results.length === 0
	) {
		return (
			<div className="rounded-lg border">
				<div className="flex min-h-[400px] items-center justify-center">
					<div className="space-y-3 text-center">
						<Loader2 className="text-muted-foreground mx-auto h-8 w-8 animate-spin" />
						<div>
							<h3 className="text-lg font-semibold">Processing run...</h3>
						</div>
					</div>
				</div>
			</div>
		)
	}

	// Empty state for failed/completed runs with no results
	if (results.length === 0 && !loading) {
		return (
			<div className="rounded-lg border">
				<div className="flex min-h-[400px] items-center justify-center">
					<div className="text-center">
						<h3 className="text-lg font-semibold">No results found</h3>
						<p className="text-muted-foreground mt-2 text-sm">
							{runStatus === RunStatus.FAILED
								? 'This run failed and did not produce any results.'
								: 'This run completed but did not produce any results.'}
						</p>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className="space-y-4">
			{/* Bulk Action Header */}
			<BulkActionHeader
				selectedCount={selectedCount}
				onCreateContacts={onCreateContacts}
				disabled={isCreatingContacts || !hasSelection}
			/>

			{/* Table */}
			<div className="rounded-lg border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[50px]">
								<SelectionDropdown
									headerState={headerCheckboxState}
									pageCount={pageIds.length}
									totalCount={totalCount}
									selectedCount={selectedCount}
									onSelectNone={onSelectNone}
									onSelectPage={handleSelectPage}
									onSelectAll={onSelectAll}
								/>
							</TableHead>
							<TableHead>Place Name</TableHead>
							<TableHead>Website</TableHead>
							<TableHead>City</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{results.map((result) => {
							const googleResult = extractGoogleMapsResult(result)
							const checked = isSelected(result.id)
							return (
								<TableRow
									key={result.id}
									data-state={checked ? 'selected' : undefined}
								>
									<TableCell>
										<Checkbox
											checked={checked}
											onCheckedChange={() => onToggleItem(result.id)}
											aria-label={`Select ${googleResult.placeName}`}
										/>
									</TableCell>
									<TableCell className="font-medium">
										{googleResult.placeName}
									</TableCell>
									<TableCell>
										{googleResult.website ? (
											<a
												href={googleResult.website}
												target="_blank"
												rel="noopener noreferrer"
												className="text-blue-600 hover:text-blue-800 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
											>
												{googleResult.website}
											</a>
										) : (
											<span className="text-muted-foreground text-sm">—</span>
										)}
									</TableCell>
									<TableCell>
										{googleResult.city || (
											<span className="text-muted-foreground text-sm">—</span>
										)}
									</TableCell>
								</TableRow>
							)
						})}
					</TableBody>
				</Table>
			</div>

			{/* Pagination Controls */}
			{pageInfo && pageInfo.totalCount > 0 && (
				<div className="flex items-center justify-between px-2">
					<div className="flex items-center gap-2">
						<span className="text-muted-foreground text-sm">
							Results per page:
						</span>
						<Select
							value={pageInfo.pageSize.toString()}
							onValueChange={(value) => onPageSizeChange(Number(value))}
						>
							<SelectTrigger className="w-[70px]">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="10">10</SelectItem>
								<SelectItem value="20">20</SelectItem>
								<SelectItem value="50">50</SelectItem>
								<SelectItem value="100">100</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div className="flex items-center gap-4">
						<span className="text-muted-foreground text-sm">
							Page {pageInfo.currentPage} of {pageInfo.totalPages} (
							{pageInfo.totalCount} total results)
						</span>

						<div className="flex items-center gap-2">
							<Button
								variant="outline"
								size="sm"
								onClick={() => onPageChange(pageInfo.currentPage - 1)}
								disabled={!pageInfo.hasPreviousPage || loading}
							>
								Previous
							</Button>
							<Button
								variant="outline"
								size="sm"
								onClick={() => onPageChange(pageInfo.currentPage + 1)}
								disabled={!pageInfo.hasNextPage || loading}
							>
								Next
							</Button>
						</div>
					</div>
				</div>
			)}

			{/* Subscription indicator */}
			{subscriptionActive && (
				<div className="text-center text-xs text-blue-600 dark:text-blue-400">
					🔴 Live updates active - new results will appear automatically
				</div>
			)}
		</div>
	)
}
