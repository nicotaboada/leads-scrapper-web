/**
 * Follow-up Filter Types
 *
 * Types for filtering contacts by follow-up status
 */

/**
 * Enum representing follow-up filter options
 */
export enum FollowUpFilterValue {
  /** Contactos con follow-up vencido (fecha pasada) */
  OVERDUE = 'OVERDUE',
  /** Contactos con follow-up para hoy */
  TODAY = 'TODAY',
  /** Contactos con follow-up en los próximos 3 días (sin incluir hoy) */
  NEXT_3_DAYS = 'NEXT_3_DAYS',
  /** Contactos sin follow-up programado */
  NO_FOLLOW_UP = 'NO_FOLLOW_UP',
}

/**
 * Configuration for follow-up filter display
 */
export interface FollowUpFilterConfig {
	label: string
	color: string
}

/**
 * Configuration map for all follow-up filter options
 */
export const FOLLOW_UP_FILTER_CONFIG: Record<
	FollowUpFilterValue,
	FollowUpFilterConfig
> = {
	[FollowUpFilterValue.OVERDUE]: {
		label: 'Vencido',
		color: 'bg-zinc-900 dark:bg-zinc-100',
	},
	[FollowUpFilterValue.TODAY]: {
		label: 'Hoy',
		color: 'bg-zinc-600 dark:bg-zinc-400',
	},
	[FollowUpFilterValue.NEXT_3_DAYS]: {
		label: 'Próximos 3 días',
		color: 'bg-zinc-300 dark:bg-zinc-600',
	},
	[FollowUpFilterValue.NO_FOLLOW_UP]: {
		label: 'Sin seguimiento',
		color: 'bg-zinc-100 dark:bg-zinc-800',
	},
}

