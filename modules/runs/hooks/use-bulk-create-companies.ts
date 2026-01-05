'use client'

import { useMutation } from '@apollo/client/react'
import { BULK_CREATE_COMPANIES_FROM_RUN } from '../graphql/mutations'
import type {
	BulkCreateCompaniesFromRunResponse,
	BulkCreateCompaniesInput,
} from '../types/bulk-actions'

interface UseBulkCreateCompaniesReturn {
	bulkCreate: (input: BulkCreateCompaniesInput) => Promise<{
		createdCount: number
		errorCount: number
	}>
	loading: boolean
	error: Error | null
}

/**
 * Hook for bulk creating companies from run results
 */
export function useBulkCreateCompanies(): UseBulkCreateCompaniesReturn {
	const [mutate, { loading, error }] =
		useMutation<BulkCreateCompaniesFromRunResponse>(
			BULK_CREATE_COMPANIES_FROM_RUN
		)

	const bulkCreate = async (
		input: BulkCreateCompaniesInput
	): Promise<{ createdCount: number; errorCount: number }> => {
		const result = await mutate({
			variables: { input },
		})

		const response = result.data?.bulkCreateCompaniesFromRun

		if (!response) {
			throw new Error('Failed to create companies')
		}

		return {
			createdCount: response.createdCount,
			errorCount: response.errorCount,
		}
	}

	return {
		bulkCreate,
		loading,
		error: error ?? null,
	}
}
