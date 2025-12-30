import { useMutation } from '@apollo/client/react'
import { DELETE_API_KEY } from '../graphql/mutations'
import { GET_API_KEYS } from '../graphql/queries'
import type { DeleteApiKeyResponse } from '../types'

/**
 * Hook for deleting an API key
 */
export function useDeleteApiKey() {
	const [deleteApiKeyMutation, { loading, error }] = useMutation<
		DeleteApiKeyResponse,
		{ id: string }
	>(DELETE_API_KEY, {
		refetchQueries: [{ query: GET_API_KEYS }],
	})

	async function deleteApiKey(id: string): Promise<boolean> {
		const { data } = await deleteApiKeyMutation({
			variables: { id },
		})
		if (!data) {
			throw new Error('Failed to delete API key')
		}
		return data.deleteApiKey
	}

	return {
		deleteApiKey,
		loading,
		error,
	}
}

