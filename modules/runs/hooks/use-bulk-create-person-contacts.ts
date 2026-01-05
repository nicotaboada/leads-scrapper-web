'use client'

import { useMutation } from '@apollo/client/react'
import { BULK_CREATE_PERSON_CONTACTS_FROM_LEADS } from '../graphql/mutations'
import type {
	BulkCreatePersonContactsInput,
	BulkCreatePersonContactsResponse,
	BulkCreatePersonContactsResult,
} from '../types/lead'

interface UseBulkCreatePersonContactsReturn {
	bulkCreate: (
		input: BulkCreatePersonContactsInput
	) => Promise<BulkCreatePersonContactsResult>
	loading: boolean
	error: Error | null
}

/**
 * Hook for bulk creating person contacts from leads
 */
export function useBulkCreatePersonContacts(): UseBulkCreatePersonContactsReturn {
	const [mutate, { loading, error }] =
		useMutation<BulkCreatePersonContactsResponse>(
			BULK_CREATE_PERSON_CONTACTS_FROM_LEADS
		)

	const bulkCreate = async (
		input: BulkCreatePersonContactsInput
	): Promise<BulkCreatePersonContactsResult> => {
		const result = await mutate({
			variables: { input },
		})

		const response = result.data?.bulkCreatePersonContactsFromLeads

		if (!response) {
			throw new Error('Failed to create contacts')
		}

		return {
			createdCount: response.createdCount,
			createdWithoutCompanyCount: response.createdWithoutCompanyCount,
			errorCount: response.errorCount,
			errors: response.errors,
		}
	}

	return {
		bulkCreate,
		loading,
		error: error ?? null,
	}
}
