/**
 * Lead Type Definitions
 *
 * This file contains all TypeScript types and interfaces related to leads
 * extracted from business scraping runs (person-level contacts)
 */

import type { PageInfo } from './run-result'

/**
 * Lead entity from Apify leads enrichment
 * Represents a person contact extracted from a business
 */
export interface Lead {
	/**
	 * Unique identifier for the lead
	 */
	id: string
	/**
	 * Company/business name this lead belongs to
	 */
	title: string
	/**
	 * First name of the lead
	 */
	firstName: string
	/**
	 * Last name of the lead
	 */
	lastName: string
	/**
	 * Full name of the lead (firstName + lastName)
	 */
	fullName: string
	/**
	 * LinkedIn profile URL if available
	 */
	linkedinProfile: string | null
	/**
	 * Email address if available
	 */
	email: string | null
	/**
	 * Mobile/phone number if available
	 */
	mobileNumber: string | null
	/**
	 * Job title/position/headline
	 */
	headline: string | null
	/**
	 * ID of the run result this lead belongs to
	 */
	runResultId: string
}

/**
 * Paginated leads response
 */
export interface LeadsPage {
	leads: Lead[]
	pageInfo: PageInfo
}

/**
 * GraphQL response for run leads query
 */
export interface GetRunLeadsResponse {
	getRunLeads: LeadsPage
}

/**
 * Input for fetching run leads
 */
export interface GetRunLeadsInput {
	runId: string
	page?: number
	pageSize?: number
}

/**
 * Input for bulk creating person contacts from leads
 */
export interface BulkCreatePersonContactsInput {
	runId: string
	selectionMode: 'SELECTED' | 'ALL_EXCEPT'
	selectedIds: string[]
	deselectedIds: string[]
}

/**
 * Result of bulk creating person contacts
 */
export interface BulkCreatePersonContactsResult {
	createdCount: number
	createdWithoutCompanyCount: number
	errorCount: number
	errors: Array<{
		index: number
		message: string
	}>
}

/**
 * GraphQL response for bulk create person contacts mutation
 */
export interface BulkCreatePersonContactsResponse {
	bulkCreatePersonContactsFromLeads: BulkCreatePersonContactsResult
}

/**
 * Helper to get display name for a lead
 */
export function getLeadDisplayName(lead: Lead): string {
	if (lead.fullName) {
		return lead.fullName
	}
	if (lead.firstName || lead.lastName) {
		return `${lead.firstName || ''} ${lead.lastName || ''}`.trim()
	}
	return 'Unknown'
}

/**
 * Helper to format phone number for WhatsApp link
 * Removes non-numeric characters for wa.me URL
 */
export function formatPhoneForWhatsApp(phone: string | null): string | null {
	if (!phone) return null
	// Remove all non-numeric characters except leading +
	const cleaned = phone.replace(/[^\d+]/g, '')
	// Remove leading + if present (wa.me doesn't need it)
	return cleaned.startsWith('+') ? cleaned.slice(1) : cleaned
}
