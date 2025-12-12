import { gql } from '@apollo/client'

/**
 * GraphQL query to get students with pagination and search
 */
export const GET_STUDENTS = gql`
	query GetStudents(
		$page: Int
		$limit: Int
		$search: String
		$status: StudentStatus
	) {
		students(page: $page, limit: $limit, search: $search, status: $status) {
			data {
				id
				firstName
				lastName
				email
				phoneNumber
				status
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
 * GraphQL query to get student statistics
 */
export const GET_STUDENT_STATS = gql`
	query GetStudentStats {
		studentStats {
			total
			active
			inactive
		}
	}
`
