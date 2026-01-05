import { gql } from '@apollo/client'

/**
 * GraphQL query to get activities for a contact with pagination and search
 */
export const GET_ACTIVITIES = gql`
	query GetActivities($filter: ActivitiesFilterInput!) {
		activities(filter: $filter) {
			data {
				id
				contactId
				activityType
				summary
				metadata
				authorId
				authorName
				createdAt
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
