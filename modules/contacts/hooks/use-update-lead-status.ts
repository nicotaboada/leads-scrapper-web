'use client'

/**
 * Hook for updating a contact's lead status
 */

import { useMutation } from '@apollo/client/react'
import { UPDATE_CONTACT_LEAD_STATUS } from '../graphql/mutations'
import { type LeadStatus } from '../types'

interface UpdateLeadStatusResponse {
	updateContactLeadStatus: {
		id: string
		leadStatus: LeadStatus
	}
}

interface UseUpdateLeadStatusReturn {
	updateLeadStatus: (id: string, leadStatus: LeadStatus) => Promise<boolean>
	loading: boolean
	error: Error | undefined
}

export function useUpdateLeadStatus(): UseUpdateLeadStatusReturn {
	const [mutate, { loading, error }] = useMutation<UpdateLeadStatusResponse>(
		UPDATE_CONTACT_LEAD_STATUS
	)

	async function updateLeadStatus(
		id: string,
		leadStatus: LeadStatus
	): Promise<boolean> {
		try {
			const result = await mutate({
				variables: { id, leadStatus },
			})
			return !!result.data?.updateContactLeadStatus.id
		} catch (err) {
			console.error('Error updating lead status:', err)
			return false
		}
	}

	return {
		updateLeadStatus,
		loading,
		error,
	}
}
