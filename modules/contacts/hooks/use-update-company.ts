'use client'

/**
 * Hook for updating a company
 */

import { useMutation } from '@apollo/client/react'
import { UPDATE_COMPANY } from '../graphql/mutations'
import type { UpdateCompanyInput, UpdateCompanyResponse } from '../types'

interface UseUpdateCompanyReturn {
	updateCompany: (
		id: string,
		input: UpdateCompanyInput
	) => Promise<string | null>
	loading: boolean
	error: Error | undefined
}

export function useUpdateCompany(): UseUpdateCompanyReturn {
	const [mutate, { loading, error }] =
		useMutation<UpdateCompanyResponse>(UPDATE_COMPANY)

	async function updateCompany(
		id: string,
		input: UpdateCompanyInput
	): Promise<string | null> {
		try {
			const result = await mutate({
				variables: { id, input },
			})
			return result.data?.updateCompany.id ?? null
		} catch (err) {
			console.error('Error updating company:', err)
			return null
		}
	}

	return {
		updateCompany,
		loading,
		error,
	}
}
