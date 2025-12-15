import { useQuery } from '@apollo/client/react'
import { GET_RUN } from '../graphql'
import type { GetRunResponse } from '../types/run'

/**
 * Hook to fetch run details for the detail page
 */
export function useRunDetail(runId: string | null | undefined) {
	const { data, loading, error, refetch } = useQuery<
		GetRunResponse,
		{ id: string }
	>(GET_RUN, {
		variables: { id: runId! },
		skip: !runId,
		fetchPolicy: 'cache-and-network',
	})

	return {
		run: data?.run || null,
		loading,
		error,
		refetch,
	}
}
