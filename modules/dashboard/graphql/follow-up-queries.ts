import { gql } from '@apollo/client'

/**
 * Query para obtener el resumen de follow-ups para el dashboard
 */
export const GET_FOLLOW_UP_SUMMARY = gql`
	query GetFollowUpSummary {
		followUpSummary {
			overdueCount
			todayCount
			upcomingCount
		}
	}
`

/**
 * Query para obtener contactos con follow-up por categoría
 * Usa cursor-based pagination para infinite scroll
 */
export const GET_CONTACTS_WITH_FOLLOW_UP = gql`
	query GetContactsWithFollowUp(
		$category: FollowUpCategory!
		$first: Int
		$after: String
	) {
		contactsWithFollowUp(category: $category, first: $first, after: $after) {
			edges {
				node {
					id
					type
					displayName
					followUpDueDate
				}
				cursor
			}
			pageInfo {
				hasNextPage
				endCursor
			}
			totalCount
		}
	}
`
