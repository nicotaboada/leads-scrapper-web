/**
 * Edit Contact Types and Validation Schemas
 */

import { z } from 'zod'
import { ContactChannel, LeadStatus } from './contact'

/**
 * Form input for editing a person contact
 */
export interface EditPersonContactFormInput {
	firstName: string
	lastName: string
	email?: string
	phone?: string
	linkedinUrl?: string
	jobTitle?: string
	companyId?: string | null
	companyName?: string // Display only
	leadStatus: LeadStatus
	contactedChannels: ContactChannel[]
	tagIds: string[]
}

/**
 * Form input for editing a company
 */
export interface EditCompanyFormInput {
	companyName: string
	companyEmails: string[]
	whatsapp?: string
	linkedinUrl?: string
	leadStatus: LeadStatus
	contactedChannels: ContactChannel[]
	tagIds: string[]
}

/**
 * Input for updatePersonContact mutation
 */
export interface UpdatePersonContactInput {
	firstName?: string
	lastName?: string
	email?: string
	celular?: string
	linkedinUrl?: string
	jobTitle?: string
	companyId?: string | null
	leadStatus?: LeadStatus
	contactedChannels?: ContactChannel[]
	tagIds?: string[]
}

/**
 * Input for updateCompany mutation
 */
export interface UpdateCompanyInput {
	companyName?: string
	companyEmails?: string[]
	whatsapp?: string
	linkedinUrl?: string
	leadStatus?: LeadStatus
	contactedChannels?: ContactChannel[]
	tagIds?: string[]
}

/**
 * Response from updatePersonContact mutation
 */
export interface UpdatePersonContactResponse {
	updatePersonContact: {
		id: string
		firstName: string
		lastName: string
		email?: string
		celular?: string
		jobTitle?: string
		linkedinUrl?: string
		company?: {
			id: string
			companyName: string
		}
	}
}

/**
 * Response from updateCompany mutation
 */
export interface UpdateCompanyResponse {
	updateCompany: {
		id: string
		companyName: string
		companyEmails: string[]
		whatsapp?: string
		linkedinUrl?: string
	}
}

/**
 * Response from deleteContact mutation
 */
export interface DeleteContactResponse {
	deleteContact: boolean
}

/**
 * Zod validation schema for edit person contact form
 */
export const editPersonContactSchema = z.object({
	firstName: z.string().min(1, 'El nombre es requerido'),
	lastName: z.string().min(1, 'El apellido es requerido'),
	email: z
		.string()
		.email('El email no es válido')
		.optional()
		.or(z.literal('')),
	phone: z.string().optional(),
	linkedinUrl: z
		.string()
		.url('La URL no es válida')
		.optional()
		.or(z.literal('')),
	jobTitle: z.string().optional(),
	companyId: z.string().nullable().optional(),
	companyName: z.string().optional(),
	leadStatus: z.nativeEnum(LeadStatus),
	contactedChannels: z.array(z.nativeEnum(ContactChannel)),
	tagIds: z.array(z.string()),
})

/**
 * Zod validation schema for edit company form
 */
export const editCompanySchema = z.object({
	companyName: z.string().min(1, 'El nombre de la empresa es requerido'),
	companyEmails: z.array(z.string().email('Email no válido')).default([]),
	whatsapp: z.string().optional(),
	linkedinUrl: z
		.string()
		.url('La URL no es válida')
		.optional()
		.or(z.literal('')),
	leadStatus: z.nativeEnum(LeadStatus),
	contactedChannels: z.array(z.nativeEnum(ContactChannel)),
	tagIds: z.array(z.string()),
})

