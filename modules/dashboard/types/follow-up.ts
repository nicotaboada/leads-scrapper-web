/**
 * Types for dashboard follow-up feature
 */

/**
 * Categorías de follow-up para filtrado
 */
export enum FollowUpCategory {
	OVERDUE = 'OVERDUE',
	TODAY = 'TODAY',
	UPCOMING = 'UPCOMING',
}

/**
 * Tipo de contacto
 */
export enum ContactType {
	PERSON = 'PERSON',
	COMPANY = 'COMPANY',
}

/**
 * Resumen de follow-ups para el dashboard
 */
export interface FollowUpSummary {
	overdueCount: number
	todayCount: number
	upcomingCount: number
}

/**
 * Contacto con información de follow-up
 */
export interface ContactWithFollowUp {
	id: string
	type: ContactType
	displayName: string
	followUpDueDate: string
}

/**
 * Edge para cursor-based pagination
 */
export interface ContactWithFollowUpEdge {
	node: ContactWithFollowUp
	cursor: string
}

/**
 * Información de paginación
 */
export interface PageInfo {
	hasNextPage: boolean
	endCursor?: string
}

/**
 * Respuesta de contactos con follow-up
 */
export interface ContactsWithFollowUpConnection {
	edges: ContactWithFollowUpEdge[]
	pageInfo: PageInfo
	totalCount: number
}
