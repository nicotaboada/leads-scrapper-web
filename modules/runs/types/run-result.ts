/** Type for raw data from external APIs */
type RawData = Record<string, unknown>

/**
 * Google Maps scraping result
 */
export interface GoogleMapsResult {
	placeName: string
	website?: string | null
	city?: string | null
	instagram?: string | null
	facebook?: string | null
	linkedin?: string | null
	// Raw data contains all fields from Apify
	raw: RawData
}

/**
 * Generic run result (from database)
 */
export interface RunResult {
	id: string
	runId: string
	raw: RawData
	normalized?: RawData | null
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
 * Helper to get first item from array or null
 */
function getFirstOrNull(arr: unknown): string | null {
	if (Array.isArray(arr) && arr.length > 0 && typeof arr[0] === 'string') {
		return arr[0]
	}
	return null
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
		instagram: raw.instagram || getFirstOrNull(raw.instagrams),
		facebook: raw.facebook || getFirstOrNull(raw.facebooks),
		linkedin: raw.linkedin || getFirstOrNull(raw.linkedIns),
		raw,
	}
}
