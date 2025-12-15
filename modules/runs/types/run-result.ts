/**
 * Google Maps scraping result
 */
export interface GoogleMapsResult {
	placeName: string
	website?: string | null
	city?: string | null
	// Raw data contains all fields from Apify
	raw: Record<string, any>
}

/**
 * Generic run result (from database)
 */
export interface RunResult {
	id: string
	runId: string
	raw: Record<string, any>
	normalized?: Record<string, any> | null
	createdAt: string
}

/**
 * Pagination information
 */
export interface PageInfo {
	currentPage: number
	pageSize: number
	totalPages: number
	totalCount: number
	hasNextPage: boolean
	hasPreviousPage: boolean
}

/**
 * Paginated run results response
 */
export interface RunResultsPage {
	results: RunResult[]
	pageInfo: PageInfo
}

/**
 * GraphQL response for run results query
 */
export interface GetRunResultsResponse {
	getRunResults: RunResultsPage
}

/**
 * Helper to extract Google Maps data from raw result
 */
export function extractGoogleMapsResult(result: RunResult): GoogleMapsResult {
	const raw = result.raw
	return {
		placeName: raw.title || raw.name || raw.placeName || 'Unknown',
		website: raw.website || raw.url || null,
		city: raw.city || raw.addressCity || raw.location?.city || null,
		raw,
	}
}
