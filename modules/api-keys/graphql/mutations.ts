import { gql } from '@apollo/client'

/**
 * Mutation to create a new API key
 */
export const CREATE_API_KEY = gql`
	mutation CreateApiKey($input: CreateApiKeyInput!) {
		createApiKey(input: $input) {
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
 * Mutation to set an API key as active
 */
export const SET_ACTIVE_API_KEY = gql`
	mutation SetActiveApiKey($id: ID!) {
		setActiveApiKey(id: $id) {
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
 * Mutation to delete an API key
 */
export const DELETE_API_KEY = gql`
	mutation DeleteApiKey($id: ID!) {
		deleteApiKey(id: $id)
	}
`

