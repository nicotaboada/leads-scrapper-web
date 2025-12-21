'use client'

/**
 * Hook for deleting a follow-up
 */

import { useMutation } from '@apollo/client/react'
import { toast } from 'sonner'
import { DELETE_FOLLOW_UP } from '../graphql/follow-up-mutations'

interface DeleteFollowUpResponse {
	deleteFollowUp: boolean
}

interface UseDeleteFollowUpReturn {
	deleteFollowUp: (id: string) => Promise<boolean>
	loading: boolean
}

/**
 * Hook to delete a follow-up without completing it
 * Returns true on success, false on error
 */
export function useDeleteFollowUp(): UseDeleteFollowUpReturn {
	const [mutate, { loading }] = useMutation<DeleteFollowUpResponse>(
		DELETE_FOLLOW_UP
	)

	const deleteFollowUp = async (id: string): Promise<boolean> => {
		try {
			const result = await mutate({
				variables: { id },
			})
			toast.success('Follow-up eliminado')
			return result.data?.deleteFollowUp ?? false
		} catch (error) {
			console.error('Error deleting follow-up:', error)
			const errorMessage =
				error instanceof Error
					? error.message
					: 'Error al eliminar el follow-up'
			toast.error(errorMessage)
			return false
		}
	}

	return {
		deleteFollowUp,
		loading,
	}
}

