'use client'

/**
 * Hook for fetching contacts with follow-up by category with infinite scroll
 */

import { useQuery } from '@apollo/client/react'
import { useCallback, useMemo } from 'react'
import { GET_CONTACTS_WITH_FOLLOW_UP } from '../graphql/follow-up-queries'
import type {
	ContactWithFollowUp,
	ContactsWithFollowUpConnection,
	FollowUpCategory,
} from '../types/follow-up'

interface ContactsWithFollowUpResponse {
	contactsWithFollowUp: ContactsWithFollowUpConnection
}

interface ContactsWithFollowUpVariables {
	category: FollowUpCategory
	first?: number
	after?: string
}

interface UseContactsWithFollowUpReturn {
	contacts: ContactWithFollowUp[]
	loading: boolean
	error: Error | undefined
	hasNextPage: boolean
	totalCount: number
	loadMore: () => void
	refetch: () => void
}

const DEFAULT_PAGE_SIZE = 20

/**
 * Hook to fetch contacts with follow-up by category with infinite scroll support
 * @param category - The follow-up category to filter by
 * @returns Contacts list, pagination info, and load more function
 */
export function useContactsWithFollowUp(
	category: FollowUpCategory
): UseContactsWithFollowUpReturn {
	const { data, loading, error, fetchMore, refetch } = useQuery<
		ContactsWithFollowUpResponse,
		ContactsWithFollowUpVariables
	>(GET_CONTACTS_WITH_FOLLOW_UP, {
		variables: {
			category,
			first: DEFAULT_PAGE_SIZE,
		},
		fetchPolicy: 'cache-and-network',
		notifyOnNetworkStatusChange: true,
	})

	const contacts = useMemo(() => {
		return data?.contactsWithFollowUp.edges.map((edge) => edge.node) ?? []
	}, [data])

	const hasNextPage = data?.contactsWithFollowUp.pageInfo.hasNextPage ?? false
	const endCursor = data?.contactsWithFollowUp.pageInfo.endCursor
	const totalCount = data?.contactsWithFollowUp.totalCount ?? 0

	const loadMore = useCallback(() => {
		if (!hasNextPage || loading || !endCursor) return

		fetchMore({
			variables: {
				category,
				first: DEFAULT_PAGE_SIZE,
				after: endCursor,
			},
			updateQuery: (prev, { fetchMoreResult }) => {
				if (!fetchMoreResult) return prev

				return {
					contactsWithFollowUp: {
						...fetchMoreResult.contactsWithFollowUp,
						edges: [
							...prev.contactsWithFollowUp.edges,
							...fetchMoreResult.contactsWithFollowUp.edges,
						],
					},
				}
			},
		})
	}, [hasNextPage, loading, endCursor, fetchMore, category])

	const handleRefetch = useCallback(() => {
		refetch({ category, first: DEFAULT_PAGE_SIZE })
	}, [refetch, category])

	return {
		contacts,
		loading,
		error,
		hasNextPage,
		totalCount,
		loadMore,
		refetch: handleRefetch,
	}
}

