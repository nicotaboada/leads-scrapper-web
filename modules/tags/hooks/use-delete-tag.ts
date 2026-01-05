import { useMutation } from '@apollo/client/react'
import { DELETE_TAG } from '../graphql/mutations'
import type { Tag } from '../types'

interface DeleteTagResponse {
	deleteTag: Tag
}

/**
 * Hook for deleting a tag
 */
export function useDeleteTag() {
	const [deleteTagMutation, { loading, error }] = useMutation<
		DeleteTagResponse,
		{ id: string }
	>(DELETE_TAG)

	async function deleteTag(id: string): Promise<Tag> {
		const { data } = await deleteTagMutation({
			variables: { id },
		})
		if (!data) {
			throw new Error('Failed to delete tag')
		}
		return data.deleteTag
	}

	return {
		deleteTag,
		loading,
		error,
	}
}
