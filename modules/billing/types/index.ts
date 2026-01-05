/**
 * Service key enum matching backend ServiceKey
 */
export type ServiceKey = 'APIFY' | 'OPENAI' | 'SERPAPI' | 'SCREENSHOTONE'

/**
 * Service status enum matching backend ServiceStatus
 */
export type ServiceStatus = 'NORMAL' | 'WARNING' | 'CRITICAL' | 'DISABLED'

/**
 * Usage information for a service
 */
export interface UsageInfo {
	current: number
	limit: number
	unit: string
}

/**
 * Service usage data from the backend
 */
export interface ServiceUsage {
	serviceName: string
	serviceKey: ServiceKey
	isEnabled: boolean
	accountEmail?: string | null
	isFreeTier: boolean
	usage?: UsageInfo | null
	costUsd?: number | null
	status: ServiceStatus
}

/**
 * Billing usage response from GraphQL query
 */
export interface BillingUsageResponse {
	services: ServiceUsage[]
	lastUpdated: string
}

/**
 * GraphQL query response wrapper
 */
export interface BillingUsageQueryResponse {
	billingUsage: BillingUsageResponse
}
