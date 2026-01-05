import { useQuery } from '@apollo/client/react'
import { GET_RUN } from '../graphql'
import type { GetRunResponse } from '../types/run'

/**
 * Hook to fetch run details for the detail page
 * Uses cache-first to avoid loading state when data is already cached
 */
export function useRunDetail(runId: string | null | undefined) {
	const { data, loading, error, refetch } = useQuery<
		GetRunResponse,
		{ id: string }
	>(GET_RUN, {
		variables: { id: runId! },
		skip: !runId,
		fetchPolicy: 'cache-first',
		nextFetchPolicy: 'cache-first',
	})

	return {
		run: data?.run || null,
		// Only show loading if we don't have cached data
		loading: loading && !data,
		error,
		refetch,
	}
}
