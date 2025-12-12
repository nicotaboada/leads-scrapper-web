/**
 * Pagination Types
 *
 * Common pagination types used across the application
 */

/**
 * Pagination metadata from backend
 */
export interface PaginationMeta {
	total: number
	page: number
	limit: number
	totalPages: number
	hasNextPage: boolean
	hasPreviousPage: boolean
}

/**
 * Generic paginated response structure
 */
export interface PaginatedResponse<T> {
	data: T[]
	meta: PaginationMeta
}
