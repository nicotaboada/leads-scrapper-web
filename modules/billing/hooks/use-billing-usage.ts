import { useQuery } from '@apollo/client/react'
import { GET_BILLING_USAGE } from '../graphql/queries'
import type { BillingUsageQueryResponse, ServiceUsage } from '../types'

/**
 * Hook to fetch billing usage data from all external services
 */
export function useBillingUsage() {
	const { data, loading, error, refetch } = useQuery<BillingUsageQueryResponse>(
		GET_BILLING_USAGE,
		{
			fetchPolicy: 'network-only',
		}
	)

	const services: ServiceUsage[] = data?.billingUsage?.services ?? []
	const lastUpdated = data?.billingUsage?.lastUpdated
		? new Date(data.billingUsage.lastUpdated)
		: null

	return {
		services,
		lastUpdated,
		loading,
		error,
		refetch,
	}
}
