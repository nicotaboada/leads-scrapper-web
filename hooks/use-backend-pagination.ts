/**
 * Backend Pagination Hook with GraphQL Query
 *
 * Reusable hook for managing backend pagination with integrated GraphQL query
 */

import type { DocumentNode } from '@apollo/client'
import { useQuery } from '@apollo/client/react'
import { useEffect, useRef, useState } from 'react'
import type { PaginationMeta } from 'types/pagination'

interface UseBackendPaginationProps {
	query: DocumentNode
	dataKey: string
	initialPage?: number
	pageSize?: number
	queryVariables?: Record<string, unknown>
	skip?: boolean
	fetchPolicy?: 'cache-first' | 'cache-and-network' | 'network-only'
}

interface UseBackendPaginationReturn<TData, TItem> {
	data: TItem[]
	meta: PaginationMeta | undefined
	loading: boolean
	currentPage: number
	pageSize: number
	goToNextPage: () => void
	goToPreviousPage: () => void
	resetPage: () => void
	refetch: () => void
	originalData: TData | undefined
}

/**
 * Hook for managing backend pagination with GraphQL
 *
 * @param query - GraphQL query document
 * @param dataKey - Key to access paginated data in response (e.g., 'students')
 * @param initialPage - Starting page (default: 1)
 * @param pageSize - Items per page (default: 25)
 * @param queryVariables - Additional query variables
 * @param skip - Skip query execution
 */
export function useBackendPagination<TData, TItem>({
	query,
	dataKey,
	initialPage = 1,
	pageSize = 25,
	queryVariables = {},
	skip = false,
	fetchPolicy = 'cache-first',
}: UseBackendPaginationProps): UseBackendPaginationReturn<TData, TItem> {
	const [currentPage, setCurrentPage] = useState(initialPage)
	const prevQueryVariablesRef = useRef(queryVariables)

	// Reset to first page when query variables change (e.g., search query)
	useEffect(() => {
		const prevVars = prevQueryVariablesRef.current
		const hasChanged =
			JSON.stringify(prevVars) !== JSON.stringify(queryVariables)

		if (hasChanged && currentPage !== initialPage) {
			setCurrentPage(initialPage)
		}

		prevQueryVariablesRef.current = queryVariables
	}, [queryVariables, currentPage, initialPage])

	// Execute GraphQL query with pagination variables
	const {
		data: originalData,
		loading,
		refetch,
	} = useQuery<TData>(query, {
		variables: {
			...queryVariables,
			page: currentPage,
			limit: pageSize,
		},
		fetchPolicy,
		skip,
	})

	// Extract data and meta from response
	const paginatedData = (originalData as Record<string, unknown>)?.[dataKey] as
		| {
				data: TItem[]
				meta: PaginationMeta
		  }
		| undefined
	const data: TItem[] = paginatedData?.data || []
	const meta: PaginationMeta | undefined = paginatedData?.meta

	const goToNextPage = () => {
		if (meta?.hasNextPage) {
			setCurrentPage((prev) => prev + 1)
		}
	}

	const goToPreviousPage = () => {
		if (meta?.hasPreviousPage) {
			setCurrentPage((prev) => Math.max(1, prev - 1))
		}
	}

	const resetPage = () => {
		setCurrentPage(initialPage)
	}

	return {
		data,
		meta,
		loading,
		currentPage,
		pageSize,
		goToNextPage,
		goToPreviousPage,
		resetPage,
		refetch,
		originalData,
	}
}
