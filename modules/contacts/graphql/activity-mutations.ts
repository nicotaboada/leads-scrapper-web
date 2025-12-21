import { gql } from '@apollo/client'

/**
 * Mutation to create a new activity
 */
export const CREATE_ACTIVITY = gql`
	mutation CreateActivity($input: CreateActivityInput!) {
		createActivity(input: $input) {
			id
			contactId
			activityType
			summary
			metadata
			authorId
			authorName
			createdAt
		}
	}
`

