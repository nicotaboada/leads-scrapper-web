'use client'

import { Tag as TagIcon } from 'lucide-react'
import { TableEmptyState } from 'components/common/table-empty-state'
import { TablePagination } from 'components/common/table-pagination'
import { TableSkeletonRows } from 'components/common/table-skeleton-rows'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from 'components/ui/table'
import { TagActionsMenu } from './tag-actions-menu'
import { TagColorBadge } from './tag-color-badge'
import type { Tag, TagsPaginationMeta } from '../types'

interface TagsTableProps {
	tags: Tag[]
	loading: boolean
	paginationMeta?: TagsPaginationMeta | null
	onNextPage: () => void
	onPreviousPage: () => void
	onEdit: (tag: Tag) => void
	onDelete: (tag: Tag) => void
	onCreateTag: () => void
}

function formatDate(dateString: string): string {
	return new Intl.DateTimeFormat('es-AR', {
		day: 'numeric',
		month: 'numeric',
		year: 'numeric',
	}).format(new Date(dateString))
}

/**
 * Table component displaying tags with pagination
 */
export function TagsTable({
	tags,
	loading,
	paginationMeta,
	onNextPage,
	onPreviousPage,
	onEdit,
	onDelete,
	onCreateTag,
}: TagsTableProps) {
	const isEmpty = !loading && tags.length === 0

	return (
		<div className="w-full space-y-4">
			<div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
				<Table>
					<TableHeader className="bg-zinc-50/50 dark:bg-zinc-900/50">
						<TableRow className="border-zinc-200 hover:bg-transparent dark:border-zinc-800">
							<TableHead className="pl-6 font-semibold text-zinc-900 dark:text-zinc-100">
								Nombre
							</TableHead>
							<TableHead className="font-semibold text-zinc-900 dark:text-zinc-100">
								Color
							</TableHead>
							<TableHead className="max-w-[300px] font-semibold text-zinc-900 dark:text-zinc-100">
								Descripción
							</TableHead>
							<TableHead className="font-semibold text-zinc-900 dark:text-zinc-100">
								Creado
							</TableHead>
							<TableHead className="w-[70px] pr-6 font-semibold text-zinc-900 dark:text-zinc-100"></TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{loading ? (
							<TableSkeletonRows
								rows={5}
								columns={[
									{ cellClassName: 'pl-6', width: '150px' },
									{ width: '40px' },
									{ width: '200px' },
									{ width: '100px' },
									{ cellClassName: 'pr-6', width: '40px' },
								]}
							/>
						) : isEmpty ? (
							<TableRow>
								<TableCell colSpan={5} className="py-12">
									<TableEmptyState
										icon={TagIcon}
										title="No hay tags"
										description="Crea tu primer tag para organizar tus contactos"
										action={{
											label: 'Crear Tag',
											onClick: onCreateTag,
										}}
									/>
								</TableCell>
							</TableRow>
						) : (
							tags.map((tag) => (
								<TableRow key={tag.id} className="group transition-colors">
									<TableCell className="pl-6 font-medium text-zinc-900 dark:text-zinc-100">
										{tag.name}
									</TableCell>
									<TableCell>
										<TagColorBadge color={tag.color} />
									</TableCell>
									<TableCell className="max-w-[300px] truncate text-zinc-500">
										{tag.description || '—'}
									</TableCell>
									<TableCell className="text-zinc-500">
										{formatDate(tag.createdAt)}
									</TableCell>
									<TableCell className="pr-6 text-right">
										<TagActionsMenu
											tag={tag}
											onEdit={onEdit}
											onDelete={onDelete}
										/>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>
			{paginationMeta && paginationMeta.totalPages > 1 && (
				<TablePagination
					currentPage={paginationMeta.page}
					totalPages={paginationMeta.totalPages}
					totalItems={paginationMeta.total}
					startIndex={(paginationMeta.page - 1) * paginationMeta.limit + 1}
					hasNextPage={paginationMeta.hasNextPage}
					hasPreviousPage={paginationMeta.hasPreviousPage}
					onNextPage={onNextPage}
					onPreviousPage={onPreviousPage}
				/>
			)}
		</div>
	)
}
