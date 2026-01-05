/**
 * API Key service types matching backend ApiKeyService enum
 */
export type ApiKeyService = 'APIFY' | 'OPENAI' | 'SERPAPI' | 'SCREENSHOTONE'

/**
 * API Key entity from the backend
 */
export interface ApiKey {
	id: string
	service: ApiKeyService
	label: string | null
	keyLastFour: string
	isActive: boolean
	createdAt: string
}

/**
 * Input for creating a new API key
 */
export interface CreateApiKeyInput {
	service: ApiKeyService
	key: string
	label?: string | null
}

/**
 * Configuration for each service (icons, names, descriptions)
 */
export interface ServiceConfig {
	key: ApiKeyService
	name: string
	description: string
}

/**
 * Service configurations for display
 */
export const SERVICE_CONFIGS: ServiceConfig[] = [
	{
		key: 'APIFY',
		name: 'Apify',
		description: 'Web scraping and automation platform',
	},
	{
		key: 'OPENAI',
		name: 'OpenAI',
		description: 'AI models for text generation',
	},
	{
		key: 'SERPAPI',
		name: 'SerpAPI',
		description: 'Search engine results API',
	},
	{
		key: 'SCREENSHOTONE',
		name: 'ScreenshotOne',
		description: 'Website screenshot service',
	},
]

/**
 * GraphQL query response for apiKeys
 */
export interface ApiKeysQueryResponse {
	apiKeys: ApiKey[]
}

/**
 * GraphQL mutation response for createApiKey
 */
export interface CreateApiKeyResponse {
	createApiKey: ApiKey
}

/**
 * GraphQL mutation response for setActiveApiKey
 */
export interface SetActiveApiKeyResponse {
	setActiveApiKey: ApiKey
}

/**
 * GraphQL mutation response for deleteApiKey
 */
export interface DeleteApiKeyResponse {
	deleteApiKey: boolean
}
