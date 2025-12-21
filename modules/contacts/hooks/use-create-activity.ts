'use client'

/**
 * Hook for creating a contact activity
 */

import { useMutation } from '@apollo/client/react'
import { CREATE_ACTIVITY } from '../graphql/activity-mutations'
import type {
	CreateActivityInput,
	CreateActivityResponse,
} from '../types/activity'

interface UseCreateActivityReturn {
	createActivity: (input: CreateActivityInput) => Promise<string | null>
	loading: boolean
}

/**
 * Hook to create a new activity for a contact
 * Returns the created activity ID on success, null on error
 */
export function useCreateActivity(): UseCreateActivityReturn {
	const [mutate, { loading }] = useMutation<CreateActivityResponse>(
		CREATE_ACTIVITY
	)

	const createActivity = async (
		input: CreateActivityInput
	): Promise<string | null> => {
		try {
			const result = await mutate({
				variables: { input },
			})
			return result.data?.createActivity.id ?? null
		} catch (error) {
			console.error('Error creating activity:', error)
			throw error
		}
	}

	return {
		createActivity,
		loading,
	}
}

