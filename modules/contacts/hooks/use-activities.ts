/**
 * Hook for fetching contact activities with pagination and search
 */

import { useQuery } from '@apollo/client/react'
import { GET_ACTIVITIES } from '../graphql/activity-queries'
import type { ActivitiesResponse } from '../types/activity'

interface ActivitiesFilterInput {
	contactId: string
	page?: number
	limit?: number
	search?: string
}

interface UseActivitiesParams {
	contactId: string
	page?: number
	limit?: number
	search?: string
}

/**
 * Hook to fetch paginated activities of a contact
 *
 * @param params - Parameters including contactId, pagination, and search options
 * @returns Query result with activities data, loading state, and pagination meta
 */
export function useActivities({
	contactId,
	page = 1,
	limit = 25,
	search,
}: UseActivitiesParams) {
	const { data, loading, error, refetch } = useQuery<ActivitiesResponse>(
		GET_ACTIVITIES,
		{
			variables: {
				filter: {
					contactId,
					page,
					limit,
					search: search || undefined,
				} satisfies ActivitiesFilterInput,
			},
			skip: !contactId,
			fetchPolicy: 'cache-first',
		}
	)

	return {
		activities: data?.activities.data ?? [],
		meta: data?.activities.meta,
		loading,
		error,
		refetch,
	}
}
