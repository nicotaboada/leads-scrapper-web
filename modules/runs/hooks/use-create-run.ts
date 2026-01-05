import { useMutation } from '@apollo/client/react'
import { CREATE_RUN, GET_RUNS } from '../graphql'
import type {
	CreateRunInput,
	CreateRunResponse,
	Run,
	RunFiltersInput,
} from '../types/run'

/**
 * Hook to create a new run
 */
export function useCreateRun() {
	const [createRunMutation, { loading, error, data }] = useMutation<
		CreateRunResponse,
		{ input: CreateRunInput }
	>(CREATE_RUN, {
		// Refetch runs after creating a new one
		refetchQueries: [{ query: GET_RUNS, variables: { filters: {} } }],
		// Or update cache manually
		update(cache, { data }) {
			if (!data?.createRun) return

			// Update cache to include the new run
			const existingRuns = cache.readQuery<{
				runs: Run[]
				filters?: RunFiltersInput
			}>({
				query: GET_RUNS,
				variables: { filters: {} },
			})

			if (existingRuns) {
				cache.writeQuery({
					query: GET_RUNS,
					variables: { filters: {} },
					data: {
						runs: [data.createRun, ...existingRuns.runs],
					},
				})
			}
		},
	})

	const createRun = async (input: CreateRunInput) => {
		try {
			const result = await createRunMutation({ variables: { input } })
			return result.data?.createRun
		} catch (err) {
			console.error('Error creating run:', err)
			throw err
		}
	}

	return {
		createRun,
		loading,
		error,
		data: data?.createRun,
	}
}
