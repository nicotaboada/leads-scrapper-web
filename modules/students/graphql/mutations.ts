import { gql } from '@apollo/client'

/**
 * GraphQL mutation to create a new student
 */
export const CREATE_STUDENT = gql`
	mutation CreateStudent($input: CreateStudentInput!) {
		createStudent(createStudentInput: $input) {
			id
			firstName
			lastName
			email
			phoneNumber
			status
			createdAt
			updatedAt
		}
	}
`
