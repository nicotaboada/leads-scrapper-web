/**
 * Dashboard module barrel exports
 */

// Components
export { FollowUpCard } from './components/follow-up-card'
export { FollowUpCards } from './components/follow-up-cards'
export { LeadsStatusCard } from './components/leads-status-card'

// Hooks
export { useFollowUpSummary } from './hooks/use-follow-up-summary'
export { useContactsWithFollowUp } from './hooks/use-contacts-with-follow-up'
export { useLeadsStatusSummary } from './hooks/use-leads-status-summary'

// Types - Follow-up
export type {
	FollowUpSummary,
	ContactWithFollowUp,
	ContactWithFollowUpEdge,
	PageInfo,
	ContactsWithFollowUpConnection,
} from './types/follow-up'
export { FollowUpCategory, ContactType } from './types/follow-up'

// Types - Leads Summary
export type { LeadsStatusSummary } from './types/leads-summary'
export {
	LeadStatus,
	LEAD_STATUS_COLORS,
	LEAD_STATUS_LABELS,
} from './types/leads-summary'

