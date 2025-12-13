import { useMutation } from '@apollo/client/react'
import { GET_RUN, PAUSE_RUN } from '../graphql'
import type { PauseRunInput, PauseRunResponse } from '../types/run'

/**
 * Hook to pause (stop) a running run
 */
export function usePauseRun() {
	const [pauseRunMutation, { loading, error, data }] = useMutation<
		PauseRunResponse,
		{ input: PauseRunInput }
	>(PAUSE_RUN, {
		// Refetch the specific run after pausing it
		refetchQueries: (result) => {
			if (result.data?.pauseRun?.id) {
				return [
					{
						query: GET_RUN,
						variables: { id: result.data.pauseRun.id },
					},
				]
			}
			return []
		},
	})

	const pauseRun = async (runId: string) => {
		try {
			const result = await pauseRunMutation({
				variables: { input: { runId } },
			})
			return result.data?.pauseRun
		} catch (err) {
			console.error('Error pausing run:', err)
			throw err
		}
	}

	return {
		pauseRun,
		loading,
		error,
		data: data?.pauseRun,
	}
}

