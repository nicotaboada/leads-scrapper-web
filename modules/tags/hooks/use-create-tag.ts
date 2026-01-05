import { useMutation } from '@apollo/client/react'
import { CREATE_TAG } from '../graphql/mutations'
import type { Tag, TagColor } from '../types'

interface CreateTagInput {
	name: string
	color?: TagColor | null
	description?: string | null
}

interface CreateTagResponse {
	createTag: Tag
}

/**
 * Hook for creating a new tag
 */
export function useCreateTag() {
	const [createTagMutation, { loading, error }] = useMutation<
		CreateTagResponse,
		{ input: CreateTagInput }
	>(CREATE_TAG)

	async function createTag(input: CreateTagInput): Promise<Tag> {
		const { data } = await createTagMutation({
			variables: { input },
		})
		if (!data) {
			throw new Error('Failed to create tag')
		}
		return data.createTag
	}

	return {
		createTag,
		loading,
		error,
	}
}
