import { useQuery } from '@apollo/client/react'
import { GET_API_KEYS } from '../graphql/queries'
import type { ApiKey, ApiKeysQueryResponse, ApiKeyService } from '../types'

/**
 * Hook to fetch all API keys for the current user
 */
export function useApiKeys() {
	const { data, loading, error, refetch } =
		useQuery<ApiKeysQueryResponse>(GET_API_KEYS, {
			fetchPolicy: 'cache-and-network',
		})

	const apiKeys: ApiKey[] = data?.apiKeys ?? []

	/**
	 * Get keys filtered by service
	 */
	function getKeysByService(service: ApiKeyService): ApiKey[] {
		return apiKeys.filter((key) => key.service === service)
	}

	/**
	 * Get the active key for a service
	 */
	function getActiveKey(service: ApiKeyService): ApiKey | undefined {
		return apiKeys.find((key) => key.service === service && key.isActive)
	}

	/**
	 * Get non-active keys for a service
	 */
	function getOtherKeys(service: ApiKeyService): ApiKey[] {
		return apiKeys.filter((key) => key.service === service && !key.isActive)
	}

	/**
	 * Get count of keys for a service
	 */
	function getKeyCount(service: ApiKeyService): number {
		return apiKeys.filter((key) => key.service === service).length
	}

	/**
	 * Check if a service has an active key
	 */
	function hasActiveKey(service: ApiKeyService): boolean {
		return apiKeys.some((key) => key.service === service && key.isActive)
	}

	return {
		apiKeys,
		loading,
		error,
		refetch,
		getKeysByService,
		getActiveKey,
		getOtherKeys,
		getKeyCount,
		hasActiveKey,
	}
}

