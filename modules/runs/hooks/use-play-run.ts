import { useMutation } from '@apollo/client/react'
import { GET_RUN, PLAY_RUN } from '../graphql'
import type { PlayRunInput, PlayRunResponse } from '../types/run'

/**
 * Hook to play (start) a paused run
 */
export function usePlayRun() {
	const [playRunMutation, { loading, error, data }] = useMutation<
		PlayRunResponse,
		{ input: PlayRunInput }
	>(PLAY_RUN, {
		// Refetch the specific run after playing it
		refetchQueries: (result) => {
			if (result.data?.playRun?.id) {
				return [
					{
						query: GET_RUN,
						variables: { id: result.data.playRun.id },
					},
				]
			}
			return []
		},
	})

	const playRun = async (runId: string) => {
		try {
			const result = await playRunMutation({
				variables: { input: { runId } },
			})
			return result.data?.playRun
		} catch (err) {
			console.error('Error playing run:', err)
			throw err
		}
	}

	return {
		playRun,
		loading,
		error,
		data: data?.playRun,
	}
}
