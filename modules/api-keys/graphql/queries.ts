import { gql } from '@apollo/client'

/**
 * GraphQL query to fetch all API keys for the current user
 */
export const GET_API_KEYS = gql`
	query GetApiKeys {
		apiKeys {
			id
			service
			label
			keyLastFour
			isActive
			createdAt
		}
	}
`

/**
 * GraphQL query to fetch API keys for a specific service
 */
export const GET_API_KEYS_BY_SERVICE = gql`
	query GetApiKeysByService($service: ApiKeyService!) {
		apiKeysByService(service: $service) {
			id
			service
			label
			keyLastFour
			isActive
			createdAt
		}
	}
`
