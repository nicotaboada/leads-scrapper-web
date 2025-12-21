'use client'

import { PlusIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { SectionHeader } from 'components/layouts/section-header'
import { Button } from 'components/ui/button'
import { useBackendPagination } from 'hooks/use-backend-pagination'
import { DeleteTagDialog } from 'modules/tags/components/delete-tag-dialog'
import { TagSheet } from 'modules/tags/components/tag-sheet'
import { TagsTable } from 'modules/tags/components/tags-table'
import { GET_TAGS } from 'modules/tags/graphql/queries'
import { useDeleteTag } from 'modules/tags/hooks/use-delete-tag'
import type { PaginatedTagsResponse, Tag } from 'modules/tags/types'

/**
 * Tags management page within the Settings section.
 *
 * Provides full CRUD functionality for managing tags:
 * - View all tags in a paginated table
 * - Create new tags via a slide-out sheet
 * - Edit existing tags
 * - Delete tags with confirmation dialog
 *
 * @route /settings/tags
 */
export default function SettingsTagsPage() {
	const [isSheetOpen, setIsSheetOpen] = useState(false)
	const [editingTag, setEditingTag] = useState<Tag | null>(null)
	const [deletingTag, setDeletingTag] = useState<Tag | null>(null)
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

	const { deleteTag, loading: deleteLoading } = useDeleteTag()

	const {
		data: tags,
		meta,
		loading,
		goToNextPage,
		goToPreviousPage,
		resetPage,
		refetch,
	} = useBackendPagination<PaginatedTagsResponse, Tag>({
		query: GET_TAGS,
		dataKey: 'tags',
		pageSize: 10,
	})

	function handleCreateTag() {
		setEditingTag(null)
		setIsSheetOpen(true)
	}

	function handleEditTag(tag: Tag) {
		setEditingTag(tag)
		setIsSheetOpen(true)
	}

	function handleDeleteTag(tag: Tag) {
		setDeletingTag(tag)
		setIsDeleteDialogOpen(true)
	}

	async function handleConfirmDelete() {
		if (!deletingTag) return
		try {
			await deleteTag(deletingTag.id)
			toast.success('Tag eliminado correctamente')
			setIsDeleteDialogOpen(false)
			setDeletingTag(null)
			refetch()
		} catch (error) {
			console.error('Error deleting tag:', error)
			toast.error('Error al eliminar el tag')
		}
	}

	function handleTagSaved() {
		resetPage()
		refetch()
		toast.success(editingTag ? 'Tag actualizado' : 'Tag creado correctamente')
	}

	return (
		<div className="space-y-6">
			<SectionHeader
				title="Tags"
				actions={
					<Button className="cursor-pointer" onClick={handleCreateTag}>
						<PlusIcon className="mr-2 h-4 w-4" />
						Crear Tag
					</Button>
				}
			/>

			<TagsTable
				tags={tags}
				loading={loading}
				paginationMeta={meta}
				onNextPage={goToNextPage}
				onPreviousPage={goToPreviousPage}
				onEdit={handleEditTag}
				onDelete={handleDeleteTag}
				onCreateTag={handleCreateTag}
			/>

			<TagSheet
				open={isSheetOpen}
				onOpenChange={setIsSheetOpen}
				tag={editingTag}
				onSuccess={handleTagSaved}
			/>

			<DeleteTagDialog
				tag={deletingTag}
				open={isDeleteDialogOpen}
				onOpenChange={setIsDeleteDialogOpen}
				onConfirm={handleConfirmDelete}
				loading={deleteLoading}
			/>
		</div>
	)
}

