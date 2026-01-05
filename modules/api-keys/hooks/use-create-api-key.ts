import { useMutation } from '@apollo/client/react'
import { CREATE_API_KEY } from '../graphql/mutations'
import { GET_API_KEYS } from '../graphql/queries'
import type { ApiKey, CreateApiKeyInput, CreateApiKeyResponse } from '../types'

/**
 * Hook for creating a new API key with validation
 */
export function useCreateApiKey() {
	const [createApiKeyMutation, { loading, error }] = useMutation<
		CreateApiKeyResponse,
		{ input: CreateApiKeyInput }
	>(CREATE_API_KEY, {
		refetchQueries: [{ query: GET_API_KEYS }],
	})

	async function createApiKey(input: CreateApiKeyInput): Promise<ApiKey> {
		const { data } = await createApiKeyMutation({
			variables: { input },
		})
		if (!data) {
			throw new Error('Failed to create API key')
		}
		return data.createApiKey
	}

	return {
		createApiKey,
		loading,
		error,
	}
}
