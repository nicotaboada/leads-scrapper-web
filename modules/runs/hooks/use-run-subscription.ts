import { useSubscription } from '@apollo/client/react'
import { useEffect, useState } from 'react'
import { RUN_STATUS_CHANGED } from '../graphql'
import type { Run, RunStatusChangedResponse } from '../types/run'

interface UseRunSubscriptionOptions {
	runId: string
	onStatusChange?: (run: Run) => void
	enabled?: boolean
}

/**
 * Hook to subscribe to run status changes
 */
export function useRunSubscription({
	runId,
	onStatusChange,
	enabled = true,
}: UseRunSubscriptionOptions) {
	const [currentRun, setCurrentRun] = useState<Run | null>(null)

	useEffect(() => {
		console.log('Subscription state:', { runId, enabled })
	}, [runId, enabled])

	const { data, loading, error } = useSubscription<
		RunStatusChangedResponse,
		{ runId: string }
	>(RUN_STATUS_CHANGED, {
		variables: { runId },
		skip: !enabled || !runId,
		onData: ({ data }) => {
			console.log('onData called:', data)
			if (data?.data?.runStatusChanged) {
				const updatedRun = data.data.runStatusChanged
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
		if (data?.runStatusChanged) {
			setCurrentRun(data.runStatusChanged)
		}
	}, [data])

	return {
		run: currentRun,
		loading,
		error,
	}
}
