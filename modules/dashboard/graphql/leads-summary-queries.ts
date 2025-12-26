import { gql } from '@apollo/client'

/**
 * Query para obtener el resumen de leads por estado para el dashboard
 */
export const GET_LEADS_STATUS_SUMMARY = gql`
	query GetLeadsStatusSummary {
		leadsStatusSummary {
			total
			new
			contacted
			inConversations
			closed
		}
	}
`

