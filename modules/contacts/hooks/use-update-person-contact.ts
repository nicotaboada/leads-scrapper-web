'use client'

/**
 * Hook for updating a person contact
 */

import { useMutation } from '@apollo/client/react'
import { UPDATE_PERSON_CONTACT } from '../graphql/mutations'
import type {
	UpdatePersonContactInput,
	UpdatePersonContactResponse,
} from '../types'

interface UseUpdatePersonContactReturn {
	updatePersonContact: (
		id: string,
		input: UpdatePersonContactInput
	) => Promise<string | null>
	loading: boolean
	error: Error | undefined
}

export function useUpdatePersonContact(): UseUpdatePersonContactReturn {
	const [mutate, { loading, error }] = useMutation<UpdatePersonContactResponse>(
		UPDATE_PERSON_CONTACT
	)

	async function updatePersonContact(
		id: string,
		input: UpdatePersonContactInput
	): Promise<string | null> {
		try {
			const result = await mutate({
				variables: { id, input },
			})
			return result.data?.updatePersonContact.id ?? null
		} catch (err) {
			console.error('Error updating person contact:', err)
			return null
		}
	}

	return {
		updatePersonContact,
		loading,
		error,
	}
}
