/**
 * Table Pagination Component
 *
 * Reusable pagination controls for tables with page navigation and result count
 * Supports sequential navigation only (previous/next)
 */

import { ChevronLeft, ChevronRight } from 'lucide-react'

interface TablePaginationProps {
	currentPage: number
	totalPages: number
	totalItems: number
	startIndex: number
	onPreviousPage: () => void
	onNextPage: () => void
	hasNextPage?: boolean
	hasPreviousPage?: boolean
}

export function TablePagination({
	currentPage,
	totalPages,
	totalItems,
	startIndex,
	onPreviousPage,
	onNextPage,
	hasNextPage,
	hasPreviousPage,
}: TablePaginationProps) {
	// For backend pagination, use hasNextPage/hasPreviousPage if provided
	const canGoPrevious =
		hasPreviousPage !== undefined ? hasPreviousPage : currentPage > 1
	const canGoNext =
		hasNextPage !== undefined ? hasNextPage : currentPage < totalPages

	return (
		<div className="flex items-center justify-between px-2">
			<div className="text-muted-foreground text-sm">
				Mostrando {startIndex} de {totalItems} resultados
			</div>
			<div className="flex items-center space-x-6 lg:space-x-8">
				<div className="flex items-center space-x-2">
					<p className="text-sm font-medium">
						Página {currentPage} de {totalPages}
					</p>
				</div>
				<div className="flex items-center space-x-2">
					<button
						onClick={onPreviousPage}
						disabled={!canGoPrevious}
						className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border p-0 disabled:cursor-not-allowed disabled:opacity-50"
						aria-label="Ir a la página anterior"
					>
						<ChevronLeft className="h-4 w-4" />
					</button>
					<button
						onClick={onNextPage}
						disabled={!canGoNext}
						className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border p-0 disabled:cursor-not-allowed disabled:opacity-50"
						aria-label="Ir a la página siguiente"
					>
						<ChevronRight className="h-4 w-4" />
					</button>
				</div>
			</div>
		</div>
	)
}
