import { gql } from '@apollo/client'

/**
 * Mutation to create a new tag
 */
export const CREATE_TAG = gql`
	mutation CreateTag($input: CreateTagInput!) {
		createTag(input: $input) {
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
 * Mutation to update an existing tag
 */
export const UPDATE_TAG = gql`
	mutation UpdateTag($id: ID!, $input: UpdateTagInput!) {
		updateTag(id: $id, input: $input) {
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
 * Mutation to delete a tag
 */
export const DELETE_TAG = gql`
	mutation DeleteTag($id: ID!) {
		deleteTag(id: $id) {
			id
			name
		}
	}
`

