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
	[LeadStatus.NEW]: '#3B82F6', // Blue
	[LeadStatus.CONTACTED]: '#F59E0B', // Orange
	[LeadStatus.IN_CONVERSATIONS]: '#8B5CF6', // Purple
	[LeadStatus.CLOSED]: '#10B981', // Green
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


