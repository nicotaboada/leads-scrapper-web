import { useQuery } from '@apollo/client/react'
import { GET_RUNS } from '../graphql'
import type { GetRunsResponse, RunFiltersInput } from '../types/run'

interface UseRunsGraphQLOptions {
	filters?: RunFiltersInput
	pollInterval?: number
}

/**
 * Hook to fetch runs using GraphQL
 */
export function useRunsGraphQL(options: UseRunsGraphQLOptions = {}) {
	const { filters = {}, pollInterval } = options

	const { data, loading, error, refetch } = useQuery<
		GetRunsResponse,
		{ filters: RunFiltersInput }
	>(GET_RUNS, {
		variables: { filters },
		pollInterval,
		fetchPolicy: 'cache-first',
	})

	return {
		runs: data?.runs || [],
		loading,
		error,
		refetch,
	}
}

