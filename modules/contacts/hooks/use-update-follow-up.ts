'use client'

/**
 * Hook for updating a follow-up
 */

import { useMutation } from '@apollo/client/react'
import { toast } from 'sonner'
import { UPDATE_FOLLOW_UP } from '../graphql/follow-up-mutations'
import type { FollowUp, UpdateFollowUpInput } from '../types'

interface UpdateFollowUpResponse {
	updateFollowUp: FollowUp
}

interface UseUpdateFollowUpReturn {
	updateFollowUp: (
		id: string,
		input: UpdateFollowUpInput
	) => Promise<FollowUp | null>
	loading: boolean
}

/**
 * Hook to update an existing follow-up
 * Returns the updated follow-up on success, null on error
 */
export function useUpdateFollowUp(): UseUpdateFollowUpReturn {
	const [mutate, { loading }] =
		useMutation<UpdateFollowUpResponse>(UPDATE_FOLLOW_UP)

	const updateFollowUp = async (
		id: string,
		input: UpdateFollowUpInput
	): Promise<FollowUp | null> => {
		try {
			const result = await mutate({
				variables: { id, input },
			})
			toast.success('Follow-up actualizado correctamente')
			return result.data?.updateFollowUp ?? null
		} catch (error) {
			console.error('Error updating follow-up:', error)
			const errorMessage =
				error instanceof Error
					? error.message
					: 'Error al actualizar el follow-up'
			toast.error(errorMessage)
			return null
		}
	}

	return {
		updateFollowUp,
		loading,
	}
}
