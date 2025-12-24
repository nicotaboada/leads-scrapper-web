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
  emoji: string
}

/**
 * Configuration map for all follow-up filter options
 */
export const FOLLOW_UP_FILTER_CONFIG: Record<FollowUpFilterValue, FollowUpFilterConfig> = {
  [FollowUpFilterValue.OVERDUE]: {
    label: 'Vencido',
    emoji: '🔴',
  },
  [FollowUpFilterValue.TODAY]: {
    label: 'Hoy',
    emoji: '🟡',
  },
  [FollowUpFilterValue.NEXT_3_DAYS]: {
    label: 'Próximos 3 días',
    emoji: '🟢',
  },
  [FollowUpFilterValue.NO_FOLLOW_UP]: {
    label: 'Sin seguimiento',
    emoji: '⚪',
  },
}

