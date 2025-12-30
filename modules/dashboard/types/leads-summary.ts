/**
 * Types for dashboard leads status summary feature
 */

/**
 * Estados de lead disponibles
 */
export enum LeadStatus {
	NEW = 'NEW',
	CONTACTED = 'CONTACTED',
	IN_CONVERSATIONS = 'IN_CONVERSATIONS',
	CLOSED = 'CLOSED',
}

/**
 * Resumen de leads por estado para el dashboard
 */
export interface LeadsStatusSummary {
	total: number
	new: number
	contacted: number
	inConversations: number
	closed: number
}

/**
 * Configuración de colores por estado de lead
 */
export const LEAD_STATUS_COLORS: Record<LeadStatus, string> = {
	[LeadStatus.NEW]: '#09090b', // Zinc 950
	[LeadStatus.CONTACTED]: '#3f3f46', // Zinc 700
	[LeadStatus.IN_CONVERSATIONS]: '#71717a', // Zinc 500
	[LeadStatus.CLOSED]: '#d4d4d8', // Zinc 300
}

/**
 * Traducciones de estados de lead al español
 */
export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
	[LeadStatus.NEW]: 'Nuevos',
	[LeadStatus.CONTACTED]: 'Contactados',
	[LeadStatus.IN_CONVERSATIONS]: 'En conversación',
	[LeadStatus.CLOSED]: 'Cerrados',
}


