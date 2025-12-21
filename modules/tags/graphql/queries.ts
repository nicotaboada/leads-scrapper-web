import { gql } from '@apollo/client'

/**
 * GraphQL query to get tags with pagination
 */
export const GET_TAGS = gql`
	query GetTags($filter: TagsFilterInput) {
		tags(filter: $filter) {
			data {
				id
				name
				color
				description
				createdAt
				updatedAt
			}
			meta {
				total
				page
				limit
				totalPages
				hasNextPage
				hasPreviousPage
			}
		}
	}
`

/**
 * GraphQL query to get a single tag by ID
 */
export const GET_TAG = gql`
	query GetTag($id: ID!) {
		tag(id: $id) {
			id
			name
			color
			description
			createdAt
			updatedAt
		}
	}
`

/**
 * GraphQL query to get all tags without pagination (for multiselect)
 */
export const GET_ALL_TAGS = gql`
	query GetAllTags {
		tags(filter: { limit: 100 }) {
			data {
				id
				name
				color
			}
		}
	}
`

