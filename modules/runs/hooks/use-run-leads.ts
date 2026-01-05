import { useQuery } from '@apollo/client/react'
import { GET_RUN_LEADS } from '../graphql'
import type { GetRunLeadsInput, GetRunLeadsResponse } from '../types/lead'

interface UseRunLeadsOptions {
	runId: string | null | undefined
	page: number
	pageSize: number
	enabled?: boolean
}

/**
 * Hook to fetch paginated leads from a run
 *
 * @param runId - ID of the run to fetch leads for
 * @param page - Current page number
 * @param pageSize - Number of leads per page
 * @param enabled - Whether to enable the query
 */
export function useRunLeads({
	runId,
	page,
	pageSize,
	enabled = true,
}: UseRunLeadsOptions) {
	const { data, loading, error, refetch } = useQuery<
		GetRunLeadsResponse,
		{ input: GetRunLeadsInput }
	>(GET_RUN_LEADS, {
		variables: {
			input: {
				runId: runId!,
				page,
				pageSize,
			},
		},
		skip: !runId || !enabled,
		fetchPolicy: 'cache-first',
		nextFetchPolicy: 'cache-first',
	})

	return {
		leads: data?.getRunLeads.leads || [],
		pageInfo: data?.getRunLeads.pageInfo || null,
		// Only show loading if we don't have cached data
		loading: loading && !data,
		error,
		refetch,
	}
}
