'use client'

/**
 * Hook for creating a follow-up for a contact
 */

import { useMutation } from '@apollo/client/react'
import { toast } from 'sonner'
import { CREATE_FOLLOW_UP } from '../graphql/follow-up-mutations'
import type { CreateFollowUpInput, FollowUp } from '../types'

interface CreateFollowUpResponse {
	createFollowUp: FollowUp
}

interface UseCreateFollowUpReturn {
	createFollowUp: (input: CreateFollowUpInput) => Promise<FollowUp | null>
	loading: boolean
}

/**
 * Hook to create a new follow-up for a contact
 * Returns the created follow-up on success, null on error
 */
export function useCreateFollowUp(): UseCreateFollowUpReturn {
	const [mutate, { loading }] = useMutation<CreateFollowUpResponse>(
		CREATE_FOLLOW_UP
	)

	const createFollowUp = async (
		input: CreateFollowUpInput
	): Promise<FollowUp | null> => {
		try {
			const result = await mutate({
				variables: { input },
			})
			toast.success('Follow-up creado correctamente')
			return result.data?.createFollowUp ?? null
		} catch (error) {
			console.error('Error creating follow-up:', error)
			const errorMessage =
				error instanceof Error ? error.message : 'Error al crear el follow-up'
			toast.error(errorMessage)
			return null
		}
	}

	return {
		createFollowUp,
		loading,
	}
}

