'use client'

/**
 * Hook for toggling a contact's channel (add or remove)
 */

import { useMutation } from '@apollo/client/react'
import { TOGGLE_CONTACT_CHANNEL } from '../graphql/mutations'
import { type ContactChannel } from '../types'

interface ToggleContactChannelResponse {
	toggleContactChannel: {
		id: string
		contactedChannels: ContactChannel[]
	}
}

interface UseToggleContactChannelReturn {
	toggleChannel: (id: string, channel: ContactChannel) => Promise<boolean>
	loading: boolean
	error: Error | undefined
}

export function useToggleContactChannel(): UseToggleContactChannelReturn {
	const [mutate, { loading, error }] =
		useMutation<ToggleContactChannelResponse>(TOGGLE_CONTACT_CHANNEL)

	async function toggleChannel(
		id: string,
		channel: ContactChannel
	): Promise<boolean> {
		try {
			const result = await mutate({
				variables: { id, channel },
			})
			return !!result.data?.toggleContactChannel.id
		} catch (err) {
			console.error('Error toggling contact channel:', err)
			return false
		}
	}

	return {
		toggleChannel,
		loading,
		error,
	}
}
