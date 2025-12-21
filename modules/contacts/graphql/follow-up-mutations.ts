import { gql } from '@apollo/client'

/**
 * GraphQL mutation to create a follow-up for a contact
 */
export const CREATE_FOLLOW_UP = gql`
	mutation CreateFollowUp($input: CreateFollowUpInput!) {
		createFollowUp(input: $input) {
			id
			contactId
			dueDate
			note
			createdAt
			updatedAt
		}
	}
`

/**
 * GraphQL mutation to update an existing follow-up
 */
export const UPDATE_FOLLOW_UP = gql`
	mutation UpdateFollowUp($id: String!, $input: UpdateFollowUpInput!) {
		updateFollowUp(id: $id, input: $input) {
			id
			contactId
			dueDate
			note
			createdAt
			updatedAt
		}
	}
`

/**
 * GraphQL mutation to complete (delete) a follow-up
 */
export const COMPLETE_FOLLOW_UP = gql`
	mutation CompleteFollowUp($id: String!) {
		completeFollowUp(id: $id)
	}
`

/**
 * GraphQL mutation to delete a follow-up
 */
export const DELETE_FOLLOW_UP = gql`
	mutation DeleteFollowUp($id: String!) {
		deleteFollowUp(id: $id)
	}
`

/**
 * GraphQL query to get a follow-up by contact ID
 */
export const GET_FOLLOW_UP = gql`
	query GetFollowUp($contactId: String!) {
		followUp(contactId: $contactId) {
			id
			contactId
			dueDate
			note
			createdAt
			updatedAt
		}
	}
`

