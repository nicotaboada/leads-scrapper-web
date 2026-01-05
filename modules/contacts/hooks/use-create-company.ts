'use client'

/**
 * Hook for creating a company
 */

import { useMutation } from '@apollo/client/react'
import { CREATE_COMPANY } from '../graphql/mutations'
import type { CreateCompanyInput, CreateCompanyResponse } from '../types'

interface UseCreateCompanyReturn {
	createCompany: (input: CreateCompanyInput) => Promise<string | null>
	loading: boolean
}

/**
 * Hook to create a new company
 * Returns the created company ID on success, null on error
 */
export function useCreateCompany(): UseCreateCompanyReturn {
	const [mutate, { loading }] =
		useMutation<CreateCompanyResponse>(CREATE_COMPANY)

	const createCompany = async (
		input: CreateCompanyInput
	): Promise<string | null> => {
		try {
			const result = await mutate({
				variables: { input },
			})
			return result.data?.createCompany.id ?? null
		} catch (error) {
			console.error('Error creating company:', error)
			throw error
		}
	}

	return {
		createCompany,
		loading,
	}
}
