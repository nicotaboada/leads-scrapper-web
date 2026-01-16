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
	LINKEDIN = 'LINKEDIN',
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
 * Using everyday language without technical jargon (matches backend)
 */
export const ISSUE_TO_PROBLEM: Record<
	string,
	{ id: string; title: string; description: string; severity: ProblemSeverity }
> = {
	'No clear value proposition above the fold': {
		id: 'no-value-proposition',
		title: 'No se entiende qué ofrecen',
		description:
			'Quien visita la web no entiende rápido qué hace la empresa ni qué problema resuelve.',
		severity: 'critical',
	},
	'Lack of visible call to action': {
		id: 'no-cta',
		title: 'No hay un siguiente paso claro',
		description:
			'No queda claro qué debe hacer el visitante después de ver la página.',
		severity: 'critical',
	},
	'Slow page load time': {
		id: 'slow-load',
		title: 'La web tarda en cargar',
		description:
			'La página tarda demasiado en mostrarse, lo que hace que muchos se vayan antes de verla.',
		severity: 'critical',
	},
	'Poor mobile responsiveness': {
		id: 'no-mobile',
		title: 'No se ve bien en el celular',
		description:
			'La web no se adapta correctamente a celulares, dificultando la navegación.',
		severity: 'critical',
	},
	'Missing meta descriptions': {
		id: 'no-meta-description',
		title: 'Falta de visibilidad en buscadores',
		description:
			'Cuando alguien busca en Google, no aparece una descripción clara que invite a hacer clic.',
		severity: 'warning',
	},
	'Outdated visual appearance': {
		id: 'outdated-design',
		title: 'Aspecto desactualizado',
		description:
			'El diseño da la sensación de ser de hace varios años, lo que puede afectar la confianza.',
		severity: 'warning',
	},
	'No SSL certificate': {
		id: 'no-ssl',
		title: 'Conexión no segura',
		description:
			'Los navegadores muestran advertencias de seguridad, lo que genera desconfianza.',
		severity: 'critical',
	},
	'Unclear service offering': {
		id: 'unclear-services',
		title: 'Web confusa',
		description:
			'No queda claro qué servicios ofrece la empresa o cómo pueden ayudar.',
		severity: 'warning',
	},
	'Not appearing in Google top 10 results': {
		id: 'no-google-ranking',
		title: 'Falta de autoridad online',
		description:
			'El negocio no aparece cuando la gente busca servicios similares en Google.',
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
		const firstWord = key.toLowerCase().split(' ')[0] ?? ''
		if (lowerIssue.includes(firstWord)) {
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
	title: 'Sin presencia online',
	description:
		'La empresa no tiene un lugar donde la gente pueda conocerlos y contactarlos fácilmente.',
	severity: 'critical',
}
