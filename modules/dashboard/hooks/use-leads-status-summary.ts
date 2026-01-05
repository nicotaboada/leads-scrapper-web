'use client'

/**
 * Hook for fetching leads status summary for dashboard
 */

import { useQuery } from '@apollo/client/react'
import { GET_LEADS_STATUS_SUMMARY } from '../graphql/leads-summary-queries'
import type { LeadsStatusSummary } from '../types/leads-summary'

interface LeadsStatusSummaryResponse {
	leadsStatusSummary: LeadsStatusSummary
}

interface UseLeadsStatusSummaryReturn {
	summary: LeadsStatusSummary | null
	isLoading: boolean
	error: Error | undefined
	refetch: () => void
}

/**
 * Hook to fetch leads status summary counts
 * @returns Summary counts by lead status, loading state, and error
 */
export function useLeadsStatusSummary(): UseLeadsStatusSummaryReturn {
	const { data, loading, error, refetch } =
		useQuery<LeadsStatusSummaryResponse>(GET_LEADS_STATUS_SUMMARY, {
			fetchPolicy: 'cache-and-network',
		})

	return {
		summary: data?.leadsStatusSummary ?? null,
		isLoading: loading,
		error,
		refetch,
	}
}
