/**
 * Contact Type Definitions
 *
 * This file contains all TypeScript types and interfaces related to contacts
 * (both Person and Company types)
 */

import type { TagColor } from 'modules/tags/types'
import type { PaginatedResponse } from 'types/pagination'
import type { FollowUp } from './follow-up'
import type { WebsiteAnalysis } from './website-analysis'

/**
 * Tag reference for contacts
 */
export interface ContactTag {
	id: string
	name: string
	color?: TagColor | null
}

/**
 * Type of contact in the system
 */
export enum ContactType {
	PERSON = 'PERSON',
	COMPANY = 'COMPANY',
}

/**
 * Lead status in the sales pipeline
 */
export enum LeadStatus {
	NEW = 'NEW',
	CONTACTED = 'CONTACTED',
	IN_CONVERSATIONS = 'IN_CONVERSATIONS',
	CLOSED = 'CLOSED',
}

/**
 * Contact channels for lead communication
 */
export enum ContactChannel {
	LINKEDIN = 'LINKEDIN',
	WHATSAPP = 'WHATSAPP',
	EMAIL = 'EMAIL',
}

/**
 * Person contact information
 */
export interface PersonContact {
	id: string
	type: ContactType.PERSON
	firstName: string
	lastName: string
	jobTitle?: string
	celular?: string
	email?: string
	linkedinUrl?: string
	leadStatus: LeadStatus
	contactedChannels: ContactChannel[]
	tags?: ContactTag[]
	followUp?: FollowUp
	createdAt: string
	updatedAt: string
	company?: {
		id: string
		companyName: string
	}
}

/**
 * Company contact information
 */
export interface CompanyContact {
	id: string
	type: ContactType.COMPANY
	companyName: string
	companyEmails: string[]
	whatsapp?: string
	website?: string
	city?: string
	countryCode?: string
	linkedinUrl?: string
	leadStatus: LeadStatus
	contactedChannels: ContactChannel[]
	tags?: ContactTag[]
	followUp?: FollowUp
	websiteAnalysis?: WebsiteAnalysis
	createdAt: string
	updatedAt: string
}

/**
 * Union type for any contact (Person or Company)
 */
export type Contact = PersonContact | CompanyContact

/**
 * Type guard to check if contact is a Person
 */
export function isPersonContact(contact: Contact): contact is PersonContact {
	return contact.type === ContactType.PERSON
}

/**
 * Type guard to check if contact is a Company
 */
export function isCompanyContact(contact: Contact): contact is CompanyContact {
	return contact.type === ContactType.COMPANY
}

/**
 * Get display name for any contact type
 */
export function getContactName(contact: Contact): string {
	if (isPersonContact(contact)) {
		return `${contact.firstName} ${contact.lastName}`
	}
	return contact.companyName
}

/**
 * Get primary email for any contact type
 */
export function getContactEmail(contact: Contact): string | undefined {
	if (isPersonContact(contact)) {
		return contact.email
	}
	return contact.companyEmails[0]
}

/**
 * Get phone number for any contact type
 */
export function getContactPhone(contact: Contact): string | undefined {
	if (isPersonContact(contact)) {
		return contact.celular
	}
	return contact.whatsapp
}

/**
 * Get initials for Person contact avatar
 */
export function getPersonInitials(contact: PersonContact): string {
	return `${contact.firstName.charAt(0)}${contact.lastName.charAt(0)}`.toUpperCase()
}

/**
 * Get available contact channels based on contact data
 * Only returns channels for which we have contact information
 */
export function getAvailableChannels(contact: Contact): ContactChannel[] {
	const channels: ContactChannel[] = []
	// LinkedIn - available if linkedinUrl exists
	if (contact.linkedinUrl) {
		channels.push(ContactChannel.LINKEDIN)
	}
	// WhatsApp - available if whatsapp (Company) or celular (Person) exists
	if (isPersonContact(contact)) {
		if (contact.celular) {
			channels.push(ContactChannel.WHATSAPP)
		}
	} else if (contact.whatsapp) {
		channels.push(ContactChannel.WHATSAPP)
	}
	// Email - available if email (Person) or companyEmails (Company) exists
	if (isPersonContact(contact)) {
		if (contact.email) {
			channels.push(ContactChannel.EMAIL)
		}
	} else if (contact.companyEmails.length > 0) {
		channels.push(ContactChannel.EMAIL)
	}
	return channels
}

/**
 * Paginated response for contacts query
 */
export interface PaginatedContactsResponse {
	contacts: PaginatedResponse<Contact>
}

/**
 * Response for single contact query
 */
export interface ContactResponse {
	contact: Contact
}
