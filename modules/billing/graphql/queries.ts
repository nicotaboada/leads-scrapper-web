import { gql } from '@apollo/client'

/**
 * GraphQL query to fetch billing usage from all external services
 */
export const GET_BILLING_USAGE = gql`
	query GetBillingUsage {
		billingUsage {
			services {
				serviceName
				serviceKey
				isEnabled
				accountEmail
				isFreeTier
				usage {
					current
					limit
					unit
				}
				costUsd
				status
			}
			lastUpdated
		}
	}
`

