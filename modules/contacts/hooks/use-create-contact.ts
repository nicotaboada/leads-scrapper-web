'use client'

/**
 * Hook for creating a person contact
 */

import { useMutation } from '@apollo/client/react'
import { CREATE_PERSON_CONTACT } from '../graphql/mutations'
import type {
	CreatePersonContactInput,
	CreatePersonContactResponse,
} from '../types'

interface UseCreateContactReturn {
	createContact: (input: CreatePersonContactInput) => Promise<string | null>
	loading: boolean
}

/**
 * Hook to create a new person contact
 * Returns the created contact ID on success, null on error
 */
export function useCreateContact(): UseCreateContactReturn {
	const [mutate, { loading }] = useMutation<CreatePersonContactResponse>(
		CREATE_PERSON_CONTACT
	)

	const createContact = async (
		input: CreatePersonContactInput
	): Promise<string | null> => {
		try {
			const result = await mutate({
				variables: { input },
			})
			return result.data?.createPersonContact.id ?? null
		} catch (error) {
			console.error('Error creating contact:', error)
			throw error
		}
	}

	return {
		createContact,
		loading,
	}
}
