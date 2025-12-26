'use client'

/**
 * Hook for fetching follow-up summary counts for dashboard
 */

import { useQuery } from '@apollo/client/react'
import { GET_FOLLOW_UP_SUMMARY } from '../graphql/follow-up-queries'
import type { FollowUpSummary } from '../types/follow-up'

interface FollowUpSummaryResponse {
	followUpSummary: FollowUpSummary
}

interface UseFollowUpSummaryReturn {
	summary: FollowUpSummary | null
	loading: boolean
	error: Error | undefined
	refetch: () => void
}

/**
 * Hook to fetch follow-up summary counts (overdue, today, upcoming)
 * @returns Summary counts, loading state, and error
 */
export function useFollowUpSummary(): UseFollowUpSummaryReturn {
	const { data, loading, error, refetch } = useQuery<FollowUpSummaryResponse>(
		GET_FOLLOW_UP_SUMMARY,
		{
			fetchPolicy: 'cache-and-network',
		}
	)

	return {
		summary: data?.followUpSummary ?? null,
		loading,
		error,
		refetch,
	}
}

