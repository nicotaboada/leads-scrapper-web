'use client'

/**
 * Hook for completing (marking as done) a follow-up
 */

import { useMutation } from '@apollo/client/react'
import { toast } from 'sonner'
import { COMPLETE_FOLLOW_UP } from '../graphql/follow-up-mutations'

interface CompleteFollowUpResponse {
	completeFollowUp: boolean
}

interface UseCompleteFollowUpReturn {
	completeFollowUp: (id: string) => Promise<boolean>
	loading: boolean
}

/**
 * Hook to complete (mark as done) a follow-up
 * This deletes the follow-up from the database
 * Returns true on success, false on error
 */
export function useCompleteFollowUp(): UseCompleteFollowUpReturn {
	const [mutate, { loading }] = useMutation<CompleteFollowUpResponse>(
		COMPLETE_FOLLOW_UP
	)

	const completeFollowUp = async (id: string): Promise<boolean> => {
		try {
			const result = await mutate({
				variables: { id },
			})
			toast.success('Follow-up marcado como completado')
			return result.data?.completeFollowUp ?? false
		} catch (error) {
			console.error('Error completing follow-up:', error)
			const errorMessage =
				error instanceof Error
					? error.message
					: 'Error al completar el follow-up'
			toast.error(errorMessage)
			return false
		}
	}

	return {
		completeFollowUp,
		loading,
	}
}

