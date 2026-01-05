/**
 * Types for user activity tracking
 */

export enum UserActivityType {
	CONTACT_CREATED = 'CONTACT_CREATED',
	RUN_CREATED = 'RUN_CREATED',
	BULK_CONTACTS_CREATED = 'BULK_CONTACTS_CREATED',
	LEAD_STATUS_CHANGED = 'LEAD_STATUS_CHANGED',
	FOLLOWUP_ADDED = 'FOLLOWUP_ADDED',
	FOLLOWUP_COMPLETED = 'FOLLOWUP_COMPLETED',
	WEBSITE_ANALYZED = 'WEBSITE_ANALYZED',
}

export enum DateRangeFilter {
	LAST_24_HOURS = 'LAST_24_HOURS',
	LAST_7_DAYS = 'LAST_7_DAYS',
	LAST_30_DAYS = 'LAST_30_DAYS',
}

/**
 * User activity entity
 */
export interface UserActivity {
	id: string
	type: UserActivityType
	userId?: number
	userName: string
	metadata: ActivityMetadata
	createdAt: string
}

/**
 * Activity metadata based on type
 */
export interface ActivityMetadata {
	// For CONTACT_CREATED
	contactId?: string
	contactName?: string
	contactType?: string

	// For RUN_CREATED
	runId?: string
	runName?: string

	// For BULK_CONTACTS_CREATED
	contactsCount?: number

	// For LEAD_STATUS_CHANGED
	previousStatus?: string
	newStatus?: string

	// For FOLLOWUP_ADDED / FOLLOWUP_COMPLETED
	followupId?: string
	dueDate?: string

	// For WEBSITE_ANALYZED
	websiteUrl?: string
	overallScore?: number
}

/**
 * Edge for cursor-based pagination
 */
export interface UserActivityEdge {
	node: UserActivity
	cursor: string
}

/**
 * Page info for cursor-based pagination
 */
export interface UserActivityPageInfo {
	hasNextPage: boolean
	endCursor?: string
}

/**
 * Connection type for paginated activities
 */
export interface UserActivityConnection {
	edges: UserActivityEdge[]
	pageInfo: UserActivityPageInfo
	totalCount: number
}

/**
 * Filter options for activities query
 */
export interface UserActivitiesFilter {
	userId?: number
	dateRange?: DateRangeFilter
	first?: number
	after?: string
}

/**
 * User type for filter dropdown
 */
export interface User {
	id: number
	email: string
	name?: string
}
