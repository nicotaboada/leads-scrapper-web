'use client'

/**
 * Leads Enrichment Table Component
 *
 * Paginated table displaying person leads extracted from a run.
 * Includes bulk selection, contact icons, and pagination controls.
 */

import { Loader2, UserPlus } from 'lucide-react'
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
import type { Lead } from '../types/lead'
import { getLeadDisplayName } from '../types/lead'
import type { PageInfo } from '../types/run-result'
import { LeadContactIconsCell } from './lead-contact-icons-cell'
import { SelectionDropdown } from './selection-dropdown'

interface LeadsEnrichmentTableProps {
	leads: Lead[]
	pageInfo: PageInfo | null
	loading: boolean
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
	onAddContacts: () => void
	isAddingContacts?: boolean
}

/**
 * Table displaying paginated leads with bulk selection
 */
export function LeadsEnrichmentTable({
	leads,
	pageInfo,
	loading,
	onPageChange,
	onPageSizeChange,
	selectedCount,
	headerCheckboxState,
	isSelected,
	onToggleItem,
	onSelectNone,
	onSelectPage,
	onSelectAll,
	onAddContacts,
	isAddingContacts = false,
}: LeadsEnrichmentTableProps) {
	const totalCount = pageInfo?.totalCount ?? 0
	const pageIds = leads.map((l) => l.id)
	const hasSelection = selectedCount > 0

	const handleSelectPage = () => {
		onSelectPage(pageIds)
	}

	// Loading state - show table structure with spinner
	if (loading && leads.length === 0) {
		return (
			<div className="rounded-lg border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[50px]" />
							<TableHead>Full Name</TableHead>
							<TableHead>Position</TableHead>
							<TableHead>Company</TableHead>
							<TableHead className="w-[120px]" />
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell colSpan={5} className="py-16 text-center">
								<Loader2 className="text-muted-foreground mx-auto h-6 w-6 animate-spin" />
								<p className="text-muted-foreground mt-2 text-sm">
									Loading leads...
								</p>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</div>
		)
	}

	// Empty state for no leads found
	if (leads.length === 0 && !loading) {
		return (
			<div className="rounded-lg border">
				<div className="flex min-h-[400px] items-center justify-center">
					<div className="text-center">
						<h3 className="text-lg font-semibold">No leads found</h3>
						<p className="text-muted-foreground mt-2 text-sm">
							This run did not produce any person leads.
						</p>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className="space-y-4">
			{/* Bulk Action Header */}
			<div className="flex items-center justify-between">
				<div className="text-sm text-muted-foreground">
					{hasSelection ? (
						<span className="font-medium text-foreground">
							{selectedCount} selected
						</span>
					) : (
						<span>No items selected</span>
					)}
				</div>

				{hasSelection && (
					<Button
						variant="default"
						size="sm"
						onClick={onAddContacts}
						disabled={isAddingContacts}
					>
						<UserPlus className="mr-2 size-4" />
						Add Contacts
					</Button>
				)}
			</div>

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
							<TableHead>Full Name</TableHead>
							<TableHead>Position</TableHead>
							<TableHead>Company</TableHead>
							<TableHead className="w-[120px]" />
						</TableRow>
					</TableHeader>
					<TableBody>
						{leads.map((lead) => {
							const checked = isSelected(lead.id)
							return (
								<TableRow
									key={lead.id}
									data-state={checked ? 'selected' : undefined}
								>
									<TableCell>
										<Checkbox
											checked={checked}
											onCheckedChange={() => onToggleItem(lead.id)}
											aria-label={`Select ${getLeadDisplayName(lead)}`}
										/>
									</TableCell>
									<TableCell className="font-medium">
										{getLeadDisplayName(lead)}
									</TableCell>
									<TableCell>
										{lead.headline || (
											<span className="text-muted-foreground text-sm">—</span>
										)}
									</TableCell>
									<TableCell>
										{lead.title || (
											<span className="text-muted-foreground text-sm">—</span>
										)}
									</TableCell>
									<TableCell>
										<LeadContactIconsCell
											linkedinUrl={lead.linkedinProfile}
											email={lead.email}
											phone={lead.mobileNumber}
										/>
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
		</div>
	)
}

