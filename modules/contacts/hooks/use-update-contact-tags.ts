import { useMutation } from '@apollo/client/react'
import { toast } from 'sonner'
import { UPDATE_CONTACT_TAGS } from '../graphql/mutations'
import type { Contact } from '../types'

interface UpdateContactTagsInput {
	contactId: string
	tagIds: string[]
}

interface UpdateContactTagsResponse {
	updateContactTags: Contact
}

/**
 * Hook for updating contact tags with auto-save behavior
 */
export function useUpdateContactTags() {
	const [updateTagsMutation, { loading, error }] = useMutation<
		UpdateContactTagsResponse,
		{ input: UpdateContactTagsInput }
	>(UPDATE_CONTACT_TAGS)

	async function updateContactTags(
		contactId: string,
		tagIds: string[]
	): Promise<void> {
		try {
			await updateTagsMutation({
				variables: {
					input: { contactId, tagIds },
				},
			})
			toast.success('Tags actualizados')
		} catch (err) {
			console.error('Error updating contact tags:', err)
			toast.error('Error al actualizar tags')
			throw err
		}
	}

	return {
		updateContactTags,
		loading,
		error,
	}
}
