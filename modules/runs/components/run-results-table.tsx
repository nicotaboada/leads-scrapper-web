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
import { SocialIconsCell } from './social-icons-cell'

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
							<TableHead>City</TableHead>
							<TableHead className="w-[140px]" />
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell colSpan={4} className="py-16 text-center">
								<Loader2 className="text-muted-foreground mx-auto h-6 w-6 animate-spin" />
								<p className="text-muted-foreground mt-2 text-sm italic">
									Cargando resultados...
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
						<Loader2 className="text-zinc-400 mx-auto h-8 w-8 animate-spin" />
						<div>
							<h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Procesando ejecución...</h3>
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
						<h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">No se encontraron resultados</h3>
						<p className="text-muted-foreground mt-2 text-sm">
							{runStatus === RunStatus.FAILED
								? 'Esta ejecución falló y no produjo ningún resultado.'
								: 'Esta ejecución finalizó pero no produjo ningún resultado.'}
						</p>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className="space-y-4">
			{/* Table */}
			<div className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 overflow-hidden shadow-sm">
				<Table>
					<TableHeader className="bg-zinc-50/50 dark:bg-zinc-900/50">
						<TableRow className="hover:bg-transparent border-zinc-200 dark:border-zinc-800">
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
							<TableHead className="font-semibold text-zinc-900 dark:text-zinc-100">Nombre del Lugar</TableHead>
							<TableHead className="font-semibold text-zinc-900 dark:text-zinc-100">Ciudad</TableHead>
							<TableHead className="w-[140px] font-semibold text-zinc-900 dark:text-zinc-100" />
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
										{googleResult.city || (
											<span className="text-muted-foreground text-sm">—</span>
										)}
									</TableCell>
									<TableCell>
										<SocialIconsCell
											website={googleResult.website}
											instagram={googleResult.instagram}
											facebook={googleResult.facebook}
											linkedin={googleResult.linkedin}
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
				<div className="flex items-center justify-between px-2 py-4 border-t border-zinc-100 dark:border-zinc-800">
					<div className="flex items-center gap-2">
						<span className="text-muted-foreground text-xs uppercase tracking-wider font-medium">
							Resultados por página:
						</span>
						<Select
							value={pageInfo.pageSize.toString()}
							onValueChange={(value) => onPageSizeChange(Number(value))}
						>
							<SelectTrigger className="w-[70px] h-8 text-xs border-zinc-200 dark:border-zinc-800">
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
							Página {pageInfo.currentPage} de {pageInfo.totalPages} ({pageInfo.totalCount} resultados totales)
						</span>

						<div className="flex items-center gap-2">
							<Button
								variant="outline"
								size="sm"
								onClick={() => onPageChange(pageInfo.currentPage - 1)}
								disabled={!pageInfo.hasPreviousPage || loading}
								className="h-8 px-3 text-xs border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900"
							>
								Anterior
							</Button>
							<Button
								variant="outline"
								size="sm"
								onClick={() => onPageChange(pageInfo.currentPage + 1)}
								disabled={!pageInfo.hasNextPage || loading}
								className="h-8 px-3 text-xs border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900"
							>
								Siguiente
							</Button>
						</div>
					</div>
				</div>
			)}

			{/* Subscription indicator */}
			{subscriptionActive && (
				<div className="flex items-center justify-center gap-2 py-2 text-[10px] text-zinc-500 uppercase font-medium">
					<span className="relative flex h-1.5 w-1.5">
						<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-400 opacity-75"></span>
						<span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-zinc-500"></span>
					</span>
					Actualizaciones en vivo activas
				</div>
			)}
		</div>
	)
}
