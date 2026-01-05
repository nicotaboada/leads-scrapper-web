'use client'

/**
 * Hook for fetching users list for filter dropdown
 */

import { useQuery } from '@apollo/client/react'
import { GET_USERS_LIST } from '../graphql/activity-queries'
import type { User } from '../types/activity'

interface UsersListResponse {
	users: User[]
}

interface UseUsersListReturn {
	users: User[]
	loading: boolean
	error: Error | undefined
}

/**
 * Hook to fetch users list for activity filters
 * @returns Users list, loading state, and error
 */
export function useUsersList(): UseUsersListReturn {
	const { data, loading, error } = useQuery<UsersListResponse>(GET_USERS_LIST, {
		fetchPolicy: 'cache-first',
	})

	return {
		users: data?.users ?? [],
		loading,
		error,
	}
}
