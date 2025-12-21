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
		<div className="space-y-4">
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Nombre</TableHead>
							<TableHead>Color</TableHead>
							<TableHead className="max-w-[300px]">Descripción</TableHead>
							<TableHead>Creado</TableHead>
							<TableHead className="w-[70px]"></TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{loading ? (
							<TableSkeletonRows
								rows={5}
								columns={[
									{ width: '150px' },
									{ width: '40px' },
									{ width: '200px' },
									{ width: '100px' },
									{ width: '40px' },
								]}
							/>
						) : isEmpty ? (
							<TableRow>
								<TableCell colSpan={5}>
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
								<TableRow key={tag.id}>
									<TableCell className="font-medium">{tag.name}</TableCell>
									<TableCell>
										<TagColorBadge color={tag.color} />
									</TableCell>
									<TableCell className="text-muted-foreground max-w-[300px] truncate">
										{tag.description || '—'}
									</TableCell>
									<TableCell className="text-muted-foreground">
										{formatDate(tag.createdAt)}
									</TableCell>
									<TableCell>
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
