'use client'

/**
 * Hook for fetching recent activities for dashboard card
 */

import { useQuery } from '@apollo/client/react'
import { GET_USER_ACTIVITIES } from '../graphql/activity-queries'
import type { UserActivity, UserActivityConnection } from '../types/activity'

interface ActivitiesResponse {
	userActivities: UserActivityConnection
}

interface UseActivitiesReturn {
	activities: UserActivity[]
	totalCount: number
	loading: boolean
	error: Error | undefined
	refetch: () => void
}

const DEFAULT_CARD_LIMIT = 10

/**
 * Hook to fetch recent activities for dashboard card
 * @param limit Number of activities to fetch (default: 10)
 * @returns Activities list, loading state, and error
 */
export function useActivities(
	limit: number = DEFAULT_CARD_LIMIT
): UseActivitiesReturn {
	const { data, loading, error, refetch } = useQuery<ActivitiesResponse>(
		GET_USER_ACTIVITIES,
		{
			variables: {
				filters: {
					first: limit,
				},
			},
			fetchPolicy: 'cache-and-network',
		}
	)

	const activities = data?.userActivities.edges.map((edge) => edge.node) ?? []

	return {
		activities,
		totalCount: data?.userActivities.totalCount ?? 0,
		loading,
		error,
		refetch,
	}
}
