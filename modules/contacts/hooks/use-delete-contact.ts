'use client'

/**
 * Hook for deleting a contact
 */

import { useMutation } from '@apollo/client/react'
import { DELETE_CONTACT } from '../graphql/mutations'
import type { DeleteContactResponse } from '../types'

interface UseDeleteContactReturn {
	deleteContact: (id: string) => Promise<boolean>
	loading: boolean
	error: Error | undefined
}

export function useDeleteContact(): UseDeleteContactReturn {
	const [mutate, { loading, error }] =
		useMutation<DeleteContactResponse>(DELETE_CONTACT)

	async function deleteContact(id: string): Promise<boolean> {
		try {
			const result = await mutate({
				variables: { id },
			})
			return result.data?.deleteContact ?? false
		} catch (err) {
			console.error('Error deleting contact:', err)
			return false
		}
	}

	return {
		deleteContact,
		loading,
		error,
	}
}
