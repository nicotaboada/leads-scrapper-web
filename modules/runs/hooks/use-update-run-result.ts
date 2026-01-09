import { useMutation } from '@apollo/client/react'
import { UPDATE_RUN_RESULT } from '../graphql/mutations'
import type { RunResult } from '../types/run-result'

/**
 * Input for updating a run result
 */
export interface UpdateRunResultInput {
	name?: string
	city?: string
	website?: string
	phone?: string
	instagram?: string
	facebook?: string
	linkedin?: string
}

/**
 * Variables for the updateRunResult mutation
 */
interface UpdateRunResultVariables {
	id: string
	input: UpdateRunResultInput
}

/**
 * Response from the updateRunResult mutation
 */
interface UpdateRunResultResponse {
	updateRunResult: RunResult
}

/**
 * Hook to update a run result's data
 *
 * @returns Object containing updateRunResult function and loading state
 */
export function useUpdateRunResult() {
	const [updateRunResultMutation, { loading, error }] = useMutation<
		UpdateRunResultResponse,
		UpdateRunResultVariables
	>(UPDATE_RUN_RESULT)

	/**
	 * Update a run result
	 *
	 * @param id - The run result ID
	 * @param input - The data to update
	 * @returns The updated run result or null if error
	 */
	async function updateRunResult(
		id: string,
		input: UpdateRunResultInput
	): Promise<RunResult | null> {
		try {
			// Remove undefined fields to avoid GraphQL validation errors
			const cleanInput = Object.fromEntries(
				Object.entries(input).filter(([_, value]) => value !== undefined)
			) as UpdateRunResultInput

			const result = await updateRunResultMutation({
				variables: { id, input: cleanInput },
			})

			return result.data?.updateRunResult ?? null
		} catch (err) {
			console.error('Error updating run result:', err)
			return null
		}
	}

	return {
		updateRunResult,
		loading,
		error,
	}
}
