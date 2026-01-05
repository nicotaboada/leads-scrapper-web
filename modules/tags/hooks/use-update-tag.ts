import { useMutation } from '@apollo/client/react'
import { UPDATE_TAG } from '../graphql/mutations'
import type { Tag, TagColor } from '../types'

interface UpdateTagInput {
	name?: string
	color?: TagColor | null
	description?: string | null
}

interface UpdateTagResponse {
	updateTag: Tag
}

/**
 * Hook for updating an existing tag
 */
export function useUpdateTag() {
	const [updateTagMutation, { loading, error }] = useMutation<
		UpdateTagResponse,
		{ id: string; input: UpdateTagInput }
	>(UPDATE_TAG)

	async function updateTag(id: string, input: UpdateTagInput): Promise<Tag> {
		const { data } = await updateTagMutation({
			variables: { id, input },
		})
		if (!data) {
			throw new Error('Failed to update tag')
		}
		return data.updateTag
	}

	return {
		updateTag,
		loading,
		error,
	}
}
