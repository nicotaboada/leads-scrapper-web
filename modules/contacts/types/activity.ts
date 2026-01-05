/**
 * Activity Type Definitions
 *
 * This file contains all TypeScript types and interfaces related to contact activities
 */

import type { PaginationMeta } from 'types/pagination'

/**
 * Type of activity in the system
 */
export enum ActivityType {
	WHATSAPP_SENT = 'WHATSAPP_SENT',
	EMAIL_SENT = 'EMAIL_SENT',
	LINKEDIN_MESSAGE_SENT = 'LINKEDIN_MESSAGE_SENT',
	LEAD_REPLIED = 'LEAD_REPLIED',
	NOTE = 'NOTE',
	STATUS_CHANGED = 'STATUS_CHANGED',
}

/**
 * Activity information
 */
export interface Activity {
	id: string
	contactId: string
	activityType: ActivityType
	summary?: string
	metadata?: Record<string, unknown>
	authorId?: number
	authorName: string
	createdAt: string
}

/**
 * Response for activities query
 */
export interface ActivitiesResponse {
	activities: {
		data: Activity[]
		meta: PaginationMeta
	}
}

/**
 * Input for creating an activity
 */
export interface CreateActivityInput {
	contactId: string
	activityType: ActivityType
	summary?: string
	authorName: string
}

/**
 * Response for create activity mutation
 */
export interface CreateActivityResponse {
	createActivity: Activity
}

/**
 * Activity type display configuration
 */
export interface ActivityTypeConfig {
	label: string
	icon: string
	bgColor: string
	textColor: string
}

/**
 * Get display configuration for activity type
 */
export function getActivityTypeConfig(type: ActivityType): ActivityTypeConfig {
	const configs: Record<ActivityType, ActivityTypeConfig> = {
		[ActivityType.WHATSAPP_SENT]: {
			label: 'WhatsApp Sent',
			icon: 'MessageCircle',
			bgColor: 'bg-green-100',
			textColor: 'text-green-600',
		},
		[ActivityType.EMAIL_SENT]: {
			label: 'Email Sent',
			icon: 'Mail',
			bgColor: 'bg-blue-100',
			textColor: 'text-blue-600',
		},
		[ActivityType.LINKEDIN_MESSAGE_SENT]: {
			label: 'LinkedIn Message',
			icon: 'Linkedin',
			bgColor: 'bg-sky-100',
			textColor: 'text-sky-600',
		},
		[ActivityType.LEAD_REPLIED]: {
			label: 'Lead Replied',
			icon: 'MessageSquare',
			bgColor: 'bg-purple-100',
			textColor: 'text-purple-600',
		},
		[ActivityType.NOTE]: {
			label: 'Note',
			icon: 'FileText',
			bgColor: 'bg-gray-100',
			textColor: 'text-gray-600',
		},
		[ActivityType.STATUS_CHANGED]: {
			label: 'Status Changed',
			icon: 'RefreshCw',
			bgColor: 'bg-amber-100',
			textColor: 'text-amber-600',
		},
	}
	return configs[type]
}

/**
 * Get selectable activity types (excludes STATUS_CHANGED which is automatic)
 */
export function getSelectableActivityTypes(): ActivityType[] {
	return [
		ActivityType.WHATSAPP_SENT,
		ActivityType.EMAIL_SENT,
		ActivityType.LINKEDIN_MESSAGE_SENT,
		ActivityType.LEAD_REPLIED,
		ActivityType.NOTE,
	]
}

/**
 * Group activities by relative date
 */
export interface ActivityGroup {
	label: string
	activities: Activity[]
}

/**
 * Get relative date label for an activity
 */
export function getRelativeDateLabel(dateString: string): string {
	const date = new Date(dateString)
	const today = new Date()
	const yesterday = new Date(today)
	yesterday.setDate(yesterday.getDate() - 1)
	const isToday = date.toDateString() === today.toDateString()
	const isYesterday = date.toDateString() === yesterday.toDateString()
	if (isToday) {
		return 'Today'
	}
	if (isYesterday) {
		return 'Yesterday'
	}
	return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

/**
 * Group activities by date
 */
export function groupActivitiesByDate(activities: Activity[]): ActivityGroup[] {
	const groups: Map<string, Activity[]> = new Map()
	for (const activity of activities) {
		const label = getRelativeDateLabel(activity.createdAt)
		const existing = groups.get(label) ?? []
		existing.push(activity)
		groups.set(label, existing)
	}
	return Array.from(groups.entries()).map(([label, items]) => ({
		label,
		activities: items,
	}))
}
