/**
 * Website Analysis Type Definitions
 *
 * Types for website and SEO analysis results
 */

/**
 * Professionalism level of the website design
 */
export enum ProfessionalismLevel {
	AMATEUR = 'AMATEUR',
	BASIC = 'BASIC',
	PROFESSIONAL = 'PROFESSIONAL',
	ENTERPRISE = 'ENTERPRISE',
}

/**
 * Freshness level of the website content
 */
export enum FreshnessLevel {
	OUTDATED = 'OUTDATED',
	DATED = 'DATED',
	CURRENT = 'CURRENT',
	MODERN = 'MODERN',
}

/**
 * Load time category for website performance
 */
export enum LoadTimeCategory {
	SLOW = 'SLOW',
	MODERATE = 'MODERATE',
	FAST = 'FAST',
}

/**
 * Complete website analysis result
 */
export interface WebsiteAnalysis {
	id: string
	contactId: string
	websiteUrl: string
	websiteScore: number
	seoScore: number
	overallScore: number
	professionalismLevel: ProfessionalismLevel
	professionalismScore: number
	freshnessLevel: FreshnessLevel
	freshnessScore: number
	loadTimeMs?: number
	loadTimeScore: number
	loadTimeCategory: LoadTimeCategory
	clarityPassed: boolean
	commercialIntentPassed: boolean
	primaryIssues: string[]
	screenshotUrl?: string
	lastError?: string
	analyzedAt: string
	createdAt: string
	updatedAt: string
}

/**
 * Response type for contact analysis query
 */
export interface WebsiteAnalysisResponse {
	contactAnalysis: WebsiteAnalysis | null
}

/**
 * Response type for analyze website mutation
 */
export interface AnalyzeWebsiteMutationResponse {
	analyzeContactWebsite: WebsiteAnalysis
}

/**
 * Get score color based on value
 * 0-40: Red (poor)
 * 41-70: Yellow/Gold (moderate)
 * 71-100: Green (good)
 */
export function getScoreColor(score: number): string {
	if (score <= 40) return 'text-red-500'
	if (score <= 70) return 'text-yellow-500'
	return 'text-green-500'
}

/**
 * Get score background color based on value
 */
export function getScoreBackgroundColor(score: number): string {
	if (score <= 40) return 'bg-red-500'
	if (score <= 70) return 'bg-yellow-500'
	return 'bg-green-500'
}

/**
 * Get score fill color for charts
 */
export function getScoreFillColor(score: number): string {
	if (score <= 40) return '#ef4444' // red-500
	if (score <= 70) return '#eab308' // yellow-500
	return '#22c55e' // green-500
}

/**
 * Get score track color for charts (lighter version)
 */
export function getScoreTrackColor(score: number): string {
	if (score <= 40) return '#fee2e2' // red-100
	if (score <= 70) return '#fef9c3' // yellow-100
	return '#dcfce7' // green-100
}

