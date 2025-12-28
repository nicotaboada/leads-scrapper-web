/**
 * AI Message Types
 *
 * Types for the AI message generation feature
 */

/**
 * Channel for AI-generated messages
 */
export enum MessageChannel {
	WHATSAPP = 'WHATSAPP',
	EMAIL = 'EMAIL',
}

/**
 * Tone for AI-generated messages
 */
export enum MessageTone {
	FORMAL = 'FORMAL',
	FRIENDLY = 'FRIENDLY',
	PERSUASIVE = 'PERSUASIVE',
}

/**
 * Problem severity levels
 */
export type ProblemSeverity = 'critical' | 'warning'

/**
 * Problem to be mentioned in the AI-generated message
 */
export interface ProblemForMessage {
	id: string
	title: string
	description: string
	severity: ProblemSeverity
}

/**
 * Result of AI message generation
 */
export interface GeneratedMessage {
	content: string
	channel: MessageChannel
	tone: MessageTone
	generatedAt: string
}

/**
 * Input for generating an AI message
 */
export interface GenerateAIMessageInput {
	contactId: string
	channel: MessageChannel
	tone: MessageTone
	problemIds: string[]
	isNoWebsite?: boolean
	isAllOk?: boolean
}

/**
 * GraphQL response for generate message mutation
 */
export interface GenerateAIMessageResponse {
	generateAIMessage: GeneratedMessage
}

/**
 * Mapping of raw issue strings to problem details
 */
export const ISSUE_TO_PROBLEM: Record<
	string,
	{ id: string; title: string; description: string; severity: ProblemSeverity }
> = {
	'No clear value proposition above the fold': {
		id: 'no-value-proposition',
		title: 'Sin propuesta de valor clara',
		description:
			'No hay una propuesta de valor visible en la parte superior de la página. Los usuarios no entienden qué hace la empresa en los primeros 5 segundos.',
		severity: 'critical',
	},
	'Lack of visible call to action': {
		id: 'no-cta',
		title: 'Sin llamada a la acción',
		description:
			'No hay botones o CTAs visibles para guiar al usuario hacia el siguiente paso (contacto, registro, etc).',
		severity: 'critical',
	},
	'Slow page load time': {
		id: 'slow-load',
		title: 'Velocidad de carga lenta',
		description: 'El sitio tarda más de 3 segundos en cargar, lo que aumenta la tasa de rebote.',
		severity: 'critical',
	},
	'Poor mobile responsiveness': {
		id: 'no-mobile',
		title: 'Sin optimización móvil',
		description: 'El diseño no se adapta correctamente a dispositivos móviles.',
		severity: 'critical',
	},
	'Missing meta descriptions': {
		id: 'no-meta-description',
		title: 'Meta descripción faltante',
		description:
			'La página principal no tiene meta descripción, lo que afecta el CTR en resultados de búsqueda.',
		severity: 'warning',
	},
	'Outdated visual appearance': {
		id: 'outdated-design',
		title: 'Diseño desactualizado',
		description: 'El sitio usa patrones de diseño de hace 5+ años, lo que afecta la credibilidad.',
		severity: 'warning',
	},
	'No SSL certificate': {
		id: 'no-ssl',
		title: 'Sin certificado SSL',
		description: 'El sitio no tiene conexión segura HTTPS, lo que afecta la confianza y el SEO.',
		severity: 'critical',
	},
	'Unclear service offering': {
		id: 'unclear-services',
		title: 'Servicios poco claros',
		description: 'No queda claro qué servicios ofrece la empresa o cuál es su propuesta de valor.',
		severity: 'warning',
	},
	'Not appearing in Google top 10 results': {
		id: 'no-google-ranking',
		title: 'Sin posicionamiento en Google',
		description:
			'El negocio no aparece en los primeros 10 resultados de Google, perdiendo clientes potenciales que buscan sus servicios.',
		severity: 'critical',
	},
}

/**
 * Converts a raw issue string to a ProblemForMessage object
 */
export function issueToProblem(issue: string): ProblemForMessage | null {
	// Try direct match first
	const direct = ISSUE_TO_PROBLEM[issue]
	if (direct) {
		return direct
	}
	// Try partial matching
	const lowerIssue = issue.toLowerCase()
	for (const [key, value] of Object.entries(ISSUE_TO_PROBLEM)) {
		if (lowerIssue.includes(key.toLowerCase().split(' ')[0])) {
			return value
		}
	}
	return null
}

/**
 * Default problem for contacts without a website
 */
export const NO_WEBSITE_PROBLEM: ProblemForMessage = {
	id: 'no-website',
	title: 'Sin sitio web',
	description: 'La empresa no tiene presencia online, perdiendo oportunidades de negocio.',
	severity: 'critical',
}

