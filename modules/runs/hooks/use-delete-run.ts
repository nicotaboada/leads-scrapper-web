import { useMutation } from '@apollo/client/react'
import { DELETE_RUN, GET_RUNS } from '../graphql'
import type { DeleteRunInput, DeleteRunResponse } from '../types/run'

/**
 * Hook to delete a run
 */
export function useDeleteRun() {
	const [deleteRunMutation, { loading, error, data }] = useMutation<
		DeleteRunResponse,
		{ input: DeleteRunInput }
	>(DELETE_RUN, {
		refetchQueries: [{ query: GET_RUNS, variables: { filters: {} } }],
	})

	const deleteRun = async (runId: string) => {
		try {
			const result = await deleteRunMutation({
				variables: { input: { runId } },
			})
			return result.data?.deleteRun
		} catch (err) {
			console.error('Error deleting run:', err)
			throw err
		}
	}

	return {
		deleteRun,
		loading,
		error,
		data: data?.deleteRun,
	}
}
