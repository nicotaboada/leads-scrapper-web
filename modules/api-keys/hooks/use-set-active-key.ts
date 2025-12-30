import { useMutation } from '@apollo/client/react'
import { SET_ACTIVE_API_KEY } from '../graphql/mutations'
import { GET_API_KEYS } from '../graphql/queries'
import type { ApiKey, SetActiveApiKeyResponse } from '../types'

/**
 * Hook for setting an API key as active
 */
export function useSetActiveKey() {
	const [setActiveKeyMutation, { loading, error }] = useMutation<
		SetActiveApiKeyResponse,
		{ id: string }
	>(SET_ACTIVE_API_KEY, {
		refetchQueries: [{ query: GET_API_KEYS }],
	})

	async function setActiveKey(id: string): Promise<ApiKey> {
		const { data } = await setActiveKeyMutation({
			variables: { id },
		})
		if (!data) {
			throw new Error('Failed to set active API key')
		}
		return data.setActiveApiKey
	}

	return {
		setActiveKey,
		loading,
		error,
	}
}

