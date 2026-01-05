/**
 * Follow-up Type Definitions
 *
 * This file contains all TypeScript types and interfaces related to follow-ups
 */

import dayjs from 'dayjs'
import 'dayjs/locale/es'

dayjs.locale('es')

/**
 * Follow-up (reminder) for a contact
 */
export interface FollowUp {
	id: string
	contactId: string
	dueDate: string
	note?: string
	createdAt: string
	updatedAt: string
}

/**
 * Input for creating a follow-up
 */
export interface CreateFollowUpInput {
	contactId: string
	dueDate: string
	note?: string
}

/**
 * Input for updating a follow-up
 */
export interface UpdateFollowUpInput {
	dueDate?: string
	note?: string
}

/**
 * Check if a follow-up is overdue
 */
export function isFollowUpOverdue(dueDate: string): boolean {
	const today = dayjs().startOf('day')
	const due = dayjs(dueDate).startOf('day')
	return due.isBefore(today)
}

/**
 * Get the relative time string for a follow-up due date
 * Returns "En X días", "Mañana", "Hoy", "Hace X días", etc.
 */
export function getFollowUpRelativeTime(dueDate: string): string {
	const today = dayjs().startOf('day')
	const due = dayjs(dueDate).startOf('day')
	const diffDays = due.diff(today, 'day')
	if (diffDays === 0) {
		return 'Hoy'
	}
	if (diffDays === 1) {
		return 'Mañana'
	}
	if (diffDays === -1) {
		return 'Ayer'
	}
	if (diffDays > 1) {
		return `${diffDays} días`
	}
	return `Hace ${Math.abs(diffDays)} días`
}

/**
 * Format a date for display (e.g., "07/02/2026")
 */
export function formatFollowUpDate(dueDate: string): string {
	return dayjs(dueDate).format('DD/MM/YYYY')
}
