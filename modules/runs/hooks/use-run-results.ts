import { useQuery } from '@apollo/client/react'
import { useEffect, useState } from 'react'
import { useRunSubscription } from './use-run-subscription'
import { GET_RUN_RESULTS } from '../graphql'
import { RunStatus } from '../types/run'
import type { Run } from '../types/run'
import type { GetRunResultsResponse } from '../types/run-result'

interface UseRunResultsOptions {
	runId: string | null | undefined
	page: number
	pageSize: number
	enabled?: boolean
	initialRun?: Run | null
}

/**
 * Hook to fetch paginated run results with real-time subscription support
 * Automatically subscribes to result updates when run is active (PENDING/RUNNING)
 */
export function useRunResults({
	runId,
	page,
	pageSize,
	enabled = true,
	initialRun = null,
}: UseRunResultsOptions) {
	const [currentRun, setCurrentRun] = useState<Run | null>(initialRun)

	// Update current run when initial run changes
	useEffect(() => {
		if (initialRun) {
			setCurrentRun(initialRun)
		}
	}, [initialRun])

	// Determine if subscription should be active based on run status
	const shouldSubscribe =
		enabled &&
		!!runId &&
		currentRun !== null &&
		(currentRun.status === RunStatus.PENDING ||
			currentRun.status === RunStatus.RUNNING)

	// Query for paginated results
	const {
		data,
		loading: queryLoading,
		error: queryError,
		refetch,
	} = useQuery<
		GetRunResultsResponse,
		{ input: { runId: string; page: number; pageSize: number } }
	>(GET_RUN_RESULTS, {
		variables: {
			input: {
				runId: runId!,
				page,
				pageSize,
			},
		},
		skip: !runId || !enabled,
		fetchPolicy: 'cache-and-network',
	})

	// Subscribe to result updates using reusable hook
	const { run: subscribedRun, loading: subscriptionLoading } =
		useRunSubscription({
			runId: runId!,
			subscriptionType: 'results',
			enabled: shouldSubscribe,
			onStatusChange: (updatedRun) => {
				setCurrentRun(updatedRun)

				// Refetch results when new results arrive
				if (
					updatedRun.status === RunStatus.RUNNING ||
					updatedRun.status === RunStatus.SUCCEEDED
				) {
					void refetch()
				}
			},
		})

	// Update current run from subscription
	useEffect(() => {
		if (subscribedRun) {
			setCurrentRun(subscribedRun)
		}
	}, [subscribedRun])

	return {
		results: data?.getRunResults.results || [],
		pageInfo: data?.getRunResults.pageInfo || null,
		currentRun,
		loading: queryLoading,
		subscriptionActive: shouldSubscribe && !subscriptionLoading,
		error: queryError,
		refetch,
	}
}
