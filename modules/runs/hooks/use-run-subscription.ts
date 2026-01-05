import type { DocumentNode } from '@apollo/client'
import { useSubscription } from '@apollo/client/react'
import { useEffect, useState } from 'react'
import { RUN_RESULTS_UPDATED, RUN_STATUS_CHANGED } from '../graphql'
import type {
	Run,
	RunResultsUpdatedResponse,
	RunStatusChangedResponse,
} from '../types/run'

interface UseRunSubscriptionOptions {
	runId: string
	onStatusChange?: (run: Run) => void
	enabled?: boolean
	subscriptionType?: 'status' | 'results'
}

/**
 * Hook to subscribe to run changes (status or results)
 * @param subscriptionType - Type of subscription: 'status' for status changes only, 'results' for results + status updates
 */
export function useRunSubscription({
	runId,
	onStatusChange,
	enabled = true,
	subscriptionType = 'status',
}: UseRunSubscriptionOptions) {
	const [currentRun, setCurrentRun] = useState<Run | null>(null)

	// Choose subscription based on type
	const subscription: DocumentNode =
		subscriptionType === 'results' ? RUN_RESULTS_UPDATED : RUN_STATUS_CHANGED

	useEffect(() => {
		console.log('Subscription state:', { runId, enabled, subscriptionType })
	}, [runId, enabled, subscriptionType])

	const { data, loading, error } = useSubscription<
		RunResultsUpdatedResponse | RunStatusChangedResponse,
		{ runId: string }
	>(subscription, {
		variables: { runId },
		skip: !enabled || !runId,
		onData: ({ data }) => {
			console.log('onData called:', data)
			let updatedRun: Run | undefined

			if (subscriptionType === 'results') {
				updatedRun = (data?.data as RunResultsUpdatedResponse | undefined)
					?.runResultsUpdated
			} else {
				updatedRun = (data?.data as RunStatusChangedResponse | undefined)
					?.runStatusChanged
			}

			if (updatedRun) {
				console.log('Subscription received update:', updatedRun)
				setCurrentRun(updatedRun)
				onStatusChange?.(updatedRun)
			}
		},
	})

	useEffect(() => {
		if (error) {
			console.error('Subscription error:', error)
		}
	}, [error])

	useEffect(() => {
		let updatedRun: Run | undefined

		if (subscriptionType === 'results') {
			updatedRun = (data as RunResultsUpdatedResponse | undefined)
				?.runResultsUpdated
		} else {
			updatedRun = (data as RunStatusChangedResponse | undefined)
				?.runStatusChanged
		}

		if (updatedRun) {
			setCurrentRun(updatedRun)
		}
	}, [data, subscriptionType])

	return {
		run: currentRun,
		loading,
		error,
	}
}
