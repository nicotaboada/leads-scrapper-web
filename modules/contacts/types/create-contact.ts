/**
 * Create Contact Types and Validation Schema
 */

import { z } from 'zod'

/**
 * Form input for creating a contact
 */
export interface CreateContactFormInput {
	firstName: string
	lastName: string
	email?: string
	phone?: string
	linkedinUrl?: string
	jobTitle?: string
	// Company fields
	companyId?: string
	isCreatingNewCompany?: boolean
	newCompanyName?: string
	newCompanyEmail?: string
	newCompanyPhone?: string
}

/**
 * Input for createCompany mutation
 */
export interface CreateCompanyInput {
	companyName: string
	companyEmail?: string
	companyPhone?: string
}

/**
 * Input for createPersonContact mutation
 */
export interface CreatePersonContactInput {
	firstName: string
	lastName: string
	email?: string
	celular?: string
	linkedinUrl?: string
	jobTitle?: string
	companyId?: string
}

/**
 * Response from createCompany mutation
 */
export interface CreateCompanyResponse {
	createCompany: {
		id: string
		companyName: string
	}
}

/**
 * Response from createPersonContact mutation
 */
export interface CreatePersonContactResponse {
	createPersonContact: {
		id: string
		firstName: string
		lastName: string
	}
}

/**
 * Zod validation schema for create contact form
 */
export const createContactSchema = z
	.object({
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
		// Company fields
		companyId: z.string().optional(),
		isCreatingNewCompany: z.boolean().default(false),
		newCompanyName: z.string().optional(),
		newCompanyEmail: z
			.string()
			.email('El email no es válido')
			.optional()
			.or(z.literal('')),
		newCompanyPhone: z.string().optional(),
	})
	.refine(
		(data) => {
			// If creating new company, name is required
			if (data.isCreatingNewCompany && !data.newCompanyName) {
				return false
			}
			return true
		},
		{
			message: 'El nombre de la empresa es requerido',
			path: ['newCompanyName'],
		}
	)
