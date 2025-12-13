import { useEffect, useRef, useState } from 'react'
import { useDebounce } from '@/hooks/use-debounce'
import { getPaginatedRuns } from '../data/mock-runs'
import { Run } from '../types/run'

interface UseRunsParams {
	pageSize?: number
	searchQuery?: string
	refreshTrigger?: number
}

interface UseRunsReturn {
	runs: Run[]
	total: number
	currentPage: number
	totalPages: number
	hasNextPage: boolean
	hasPreviousPage: boolean
	goToNextPage: () => void
	goToPreviousPage: () => void
	goToPage: (page: number) => void
	isLoading: boolean
}

/**
 * Custom hook for managing runs data with pagination and search
 * Uses mock data for initial implementation, designed to be easily replaced with GraphQL
 */
export function useRuns({
	pageSize = 10,
	searchQuery = '',
	refreshTrigger = 0,
}: UseRunsParams = {}): UseRunsReturn {
	const [currentPage, setCurrentPage] = useState(1)
	const [isLoading, setIsLoading] = useState(false)
	const prevSearchQueryRef = useRef(searchQuery)
	const [dataVersion, setDataVersion] = useState(0)

	// Debounce search query to avoid excessive filtering
	const debouncedSearch = useDebounce(searchQuery, 300)

	// Reset to first page when search query changes
	useEffect(() => {
		if (prevSearchQueryRef.current !== debouncedSearch && currentPage !== 1) {
			setCurrentPage(1)
		}
		prevSearchQueryRef.current = debouncedSearch
	}, [debouncedSearch, currentPage])

	// Trigger data refresh when refreshTrigger changes
	useEffect(() => {
		if (refreshTrigger > 0) {
			setDataVersion((prev) => prev + 1)
			setCurrentPage(1) // Reset to first page on refresh
		}
	}, [refreshTrigger])

	// Simulate loading state (remove when integrating with real API)
	useEffect(() => {
		setIsLoading(true)
		const timer = setTimeout(() => {
			setIsLoading(false)
		}, 200)
		return () => clearTimeout(timer)
	}, [currentPage, debouncedSearch, dataVersion])

	// Get paginated data
	const { runs, total } = getPaginatedRuns({
		page: currentPage,
		pageSize,
		searchQuery: debouncedSearch,
	})

	const totalPages = Math.ceil(total / pageSize)
	const hasNextPage = currentPage < totalPages
	const hasPreviousPage = currentPage > 1

	const goToNextPage = () => {
		if (hasNextPage) {
			setCurrentPage((prev) => prev + 1)
		}
	}

	const goToPreviousPage = () => {
		if (hasPreviousPage) {
			setCurrentPage((prev) => Math.max(1, prev - 1))
		}
	}

	const goToPage = (page: number) => {
		const validPage = Math.max(1, Math.min(page, totalPages))
		setCurrentPage(validPage)
	}

	return {
		runs,
		total,
		currentPage,
		totalPages,
		hasNextPage,
		hasPreviousPage,
		goToNextPage,
		goToPreviousPage,
		goToPage,
		isLoading,
	}
}
