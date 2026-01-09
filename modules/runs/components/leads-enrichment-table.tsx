'use client'

/**
 * Leads Enrichment Table Component
 *
 * Paginated table displaying person leads extracted from a run.
 * Includes bulk selection, contact icons, and pagination controls.
 */

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
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { LeadContactIconsCell } from './lead-contact-icons-cell'
import { SelectionDropdown } from './selection-dropdown'
import type { HeaderCheckboxState } from '../types/bulk-actions'
import type { Lead } from '../types/lead'
import { getLeadDisplayName } from '../types/lead'
import type { PageInfo } from '../types/run-result'

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
	/** @deprecated No longer used - button is in parent header */
	onAddContacts?: () => void
	/** @deprecated No longer used - button is in parent header */
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
}: LeadsEnrichmentTableProps) {
	const totalCount = pageInfo?.totalCount ?? 0
	const pageIds = leads.map((l) => l.id)
	const _hasSelection = selectedCount > 0

	const handleSelectPage = () => {
		onSelectPage(pageIds)
	}

	// Loading state - show table structure with spinner
	if (loading && leads.length === 0) {
		return (
			<div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
				<Table>
					<TableHeader className="bg-zinc-50/50 dark:bg-zinc-900/50">
						<TableRow className="border-zinc-200 hover:bg-transparent dark:border-zinc-800">
							<TableHead className="w-[50px]" />
							<TableHead className="max-w-[200px] font-semibold text-zinc-900 dark:text-zinc-100">
								Full Name
							</TableHead>
							<TableHead className="max-w-[300px] font-semibold text-zinc-900 dark:text-zinc-100">
								Position
							</TableHead>
							<TableHead className="max-w-[250px] font-semibold text-zinc-900 dark:text-zinc-100">
								Company
							</TableHead>
							<TableHead className="w-[120px] font-semibold text-zinc-900 dark:text-zinc-100" />
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell colSpan={5} className="py-16 text-center">
								<Loader2 className="text-muted-foreground mx-auto h-6 w-6 animate-spin" />
								<p className="text-muted-foreground mt-2 text-sm italic">
									Cargando leads...
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
			<div className="rounded-xl border border-dashed border-zinc-200 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-900/50">
				<div className="flex min-h-[400px] items-center justify-center">
					<div className="text-center">
						<h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
							No se encontraron leads
						</h3>
						<p className="text-muted-foreground mt-2 text-sm">
							Esta ejecución no produjo ningún lead de persona.
						</p>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className="space-y-4">
			{/* Table */}
			<div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
				<Table>
					<TableHeader className="bg-zinc-50/50 dark:bg-zinc-900/50">
						<TableRow className="border-zinc-200 hover:bg-transparent dark:border-zinc-800">
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
							<TableHead className="max-w-[200px] font-semibold text-zinc-900 dark:text-zinc-100">
								Full Name
							</TableHead>
							<TableHead className="max-w-[300px] font-semibold text-zinc-900 dark:text-zinc-100">
								Position
							</TableHead>
							<TableHead className="max-w-[250px] font-semibold text-zinc-900 dark:text-zinc-100">
								Company
							</TableHead>
							<TableHead className="w-[120px] font-semibold text-zinc-900 dark:text-zinc-100" />
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
									<TableCell className="max-w-[200px] font-medium">
										<div className="truncate" title={getLeadDisplayName(lead)}>
											{getLeadDisplayName(lead)}
										</div>
									</TableCell>
									<TableCell className="max-w-[300px]">
										{lead.headline ? (
											<Tooltip>
												<TooltipTrigger asChild>
													<div className="truncate cursor-default">
														{lead.headline}
													</div>
												</TooltipTrigger>
												<TooltipContent side="top" className="max-w-80">
													{lead.headline}
												</TooltipContent>
											</Tooltip>
										) : (
											<span className="text-muted-foreground text-sm">—</span>
										)}
									</TableCell>
									<TableCell className="max-w-[250px]">
										{lead.title ? (
											<Tooltip>
												<TooltipTrigger asChild>
													<div className="truncate cursor-default">
														{lead.title}
													</div>
												</TooltipTrigger>
												<TooltipContent side="top" className="max-w-80">
													{lead.title}
												</TooltipContent>
											</Tooltip>
										) : (
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
				<div className="flex items-center justify-between border-t border-zinc-100 px-2 py-4 dark:border-zinc-800">
					<div className="flex items-center gap-2">
						<span className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
							Resultados por página:
						</span>
						<Select
							value={pageInfo.pageSize.toString()}
							onValueChange={(value) => onPageSizeChange(Number(value))}
						>
							<SelectTrigger className="h-8 w-[70px] border-zinc-200 text-xs dark:border-zinc-800">
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
						<span className="text-muted-foreground text-xs">
							Página {pageInfo.currentPage} de {pageInfo.totalPages} (
							{pageInfo.totalCount} resultados totales)
						</span>

						<div className="flex items-center gap-2">
							<Button
								variant="outline"
								size="sm"
								onClick={() => onPageChange(pageInfo.currentPage - 1)}
								disabled={!pageInfo.hasPreviousPage || loading}
								className="h-8 border-zinc-200 px-3 text-xs hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
							>
								Anterior
							</Button>
							<Button
								variant="outline"
								size="sm"
								onClick={() => onPageChange(pageInfo.currentPage + 1)}
								disabled={!pageInfo.hasNextPage || loading}
								className="h-8 border-zinc-200 px-3 text-xs hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
							>
								Siguiente
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
