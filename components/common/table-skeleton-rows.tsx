/**
 * Table Skeleton Rows Component
 *
 * Reusable skeleton loading state for tables.
 * Renders multiple skeleton rows based on column configuration.
 */

import { Skeleton } from 'components/ui/skeleton'
import { TableCell, TableRow } from 'components/ui/table'

interface ColumnSkeleton {
	/**
	 * Width of the skeleton (e.g., "180px", "full")
	 */
	width?: string
	/**
	 * Height of the skeleton (e.g., "h-4", "h-10")
	 */
	height?: string
	/**
	 * Additional className for the skeleton
	 */
	className?: string
	/**
	 * Multiple skeletons in the same cell
	 */
	items?: Array<{ width?: string; height?: string; className?: string }>
	/**
	 * Additional className for the TableCell
	 */
	cellClassName?: string
}

interface TableSkeletonRowsProps {
	/**
	 * Number of skeleton rows to render
	 */
	rows?: number
	/**
	 * Configuration for each column's skeleton
	 */
	columns: ColumnSkeleton[]
}

/**
 * Renders skeleton rows for table loading states
 *
 * @example
 * ```tsx
 * <TableSkeletonRows
 *   rows={5}
 *   columns={[
 *     { width: '180px', height: 'h-4' },
 *     { width: '150px', height: 'h-3' },
 *   ]}
 * />
 * ```
 */
export function TableSkeletonRows({
	rows = 5,
	columns,
}: TableSkeletonRowsProps) {
	return (
		<>
			{Array.from({ length: rows }).map((_, rowIndex) => (
				<TableRow key={`skeleton-row-${rowIndex}`}>
					{columns.map((column, colIndex) => (
						<TableCell
							key={`skeleton-cell-${rowIndex}-${colIndex}`}
							className={column.cellClassName}
						>
							{column.items ? (
								// Multiple skeletons in the same cell
								<div className="space-y-2">
									{column.items.map((item, itemIndex) => (
										<Skeleton
											key={`skeleton-item-${itemIndex}`}
											className={`${item.height || 'h-3'} ${item.className || ''}`}
											style={{ width: item.width }}
										/>
									))}
								</div>
							) : (
								// Single skeleton
								<Skeleton
									className={`${column.height || 'h-4'} ${column.className || ''}`}
									style={{ width: column.width }}
								/>
							)}
						</TableCell>
					))}
				</TableRow>
			))}
		</>
	)
}





