/**
 * Create Run Type Definitions
 *
 * This file contains all TypeScript types and interfaces related to creating runs
 */

import { z } from 'zod'

/**
 * Available actor types for scraping runs
 */
export type ActorType = 'google-maps'

/**
 * Configuration for Google Maps scraper
 */
export interface GoogleMapsConfig {
	/**
	 * List of search terms to scrape
	 */
	searchTerms: string[]
	/**
	 * Location to search in
	 */
	location: string
	/**
	 * Optional number of places to scrape
	 */
	numberOfPlaces?: number
	/**
	 * Enable Company Contacts Enrichment add-on
	 * Extracts emails and social profiles from business websites
	 */
	scrapeContacts?: boolean
}

/**
 * Input type for creating a new run
 */
export interface CreateRunInput {
	/**
	 * Display name for the run
	 */
	runName: string
	/**
	 * Type of actor/scraper to use
	 */
	actorType: ActorType
	/**
	 * Configuration specific to the selected actor
	 */
	config: GoogleMapsConfig
}

/**
 * Form input type for the create run form
 * Flattened structure for easier form handling
 */
export interface CreateRunFormInput {
	runName: string
	actorType: ActorType
	searchTerms: string[]
	location: string
	numberOfPlaces?: number
	scrapeContacts?: boolean
}

/**
 * Zod validation schema for creating a run
 */
export const createRunSchema = z.object({
	runName: z
		.string()
		.min(1, 'Run name is required')
		.max(100, 'Run name must be less than 100 characters'),
	actorType: z.literal('google-maps'),
	searchTerms: z
		.array(z.string())
		.min(1, 'At least one search term is required'),
	location: z.string().min(1, 'Location is required'),
	numberOfPlaces: z
		.union([
			z.number().positive('Number of places must be greater than 0'),
			z.undefined(),
		])
		.optional(),
	scrapeContacts: z.boolean().optional().default(false),
})

/**
 * Type inference from the Zod schema
 */
export type CreateRunSchemaType = z.infer<typeof createRunSchema>

/**
 * Actor type display names
 */
export const ACTOR_TYPE_LABELS: Record<ActorType, string> = {
	'google-maps': 'Google Maps Scraper',
}

/**
 * Helper function to transform form input to API input
 */
export function transformFormToInput(
	formData: CreateRunFormInput
): CreateRunInput {
	return {
		runName: formData.runName,
		actorType: formData.actorType,
		config: {
			searchTerms: formData.searchTerms,
			location: formData.location,
			numberOfPlaces: formData.numberOfPlaces,
			scrapeContacts: formData.scrapeContacts,
		},
	}
}
