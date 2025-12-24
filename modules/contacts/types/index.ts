/**
 * Contacts Module Types
 *
 * Central export point for all contact-related types
 */

export type {
	PersonContact,
	CompanyContact,
	Contact,
	ContactTag,
	PaginatedContactsResponse,
	ContactResponse,
} from './contact'

export {
	ContactType,
	LeadStatus,
	ContactChannel,
	isPersonContact,
	isCompanyContact,
	getContactName,
	getContactEmail,
	getContactPhone,
	getPersonInitials,
	getAvailableChannels,
} from './contact'

export type {
	CreateContactFormInput,
	CreateCompanyInput,
	CreatePersonContactInput,
	CreateCompanyResponse,
	CreatePersonContactResponse,
} from './create-contact'

export { createContactSchema } from './create-contact'

export type {
	EditPersonContactFormInput,
	EditCompanyFormInput,
	UpdatePersonContactInput,
	UpdateCompanyInput,
	UpdatePersonContactResponse,
	UpdateCompanyResponse,
	DeleteContactResponse,
} from './edit-contact'

export { editPersonContactSchema, editCompanySchema } from './edit-contact'

export type {
	FollowUp,
	CreateFollowUpInput,
	UpdateFollowUpInput,
} from './follow-up'

export {
	isFollowUpOverdue,
	getFollowUpRelativeTime,
	formatFollowUpDate,
} from './follow-up'

export type { FollowUpFilterConfig } from './follow-up-filter'

export { FollowUpFilterValue, FOLLOW_UP_FILTER_CONFIG } from './follow-up-filter'
