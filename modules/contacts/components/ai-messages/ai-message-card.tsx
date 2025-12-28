'use client'

/**
 * AI Message Card Component
 *
 * Simplified card for the Overview tab with quick message generation.
 * Randomly selects 1-3 problems and uses default tone (Amigable).
 */

import { useState, useMemo, useCallback, useEffect } from 'react'
import { Sparkles, Loader2, Copy, Check, ArrowRight, Globe, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from 'components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from 'components/ui/card'
import { ChannelSelector } from './channel-selector'
import { useGenerateAIMessage } from '../../hooks/use-generate-ai-message'
import {
	MessageChannel,
	MessageTone,
	issueToProblem,
	type ProblemForMessage,
} from '../../types/ai-message'
import type { CompanyContact } from '../../types'

interface AiMessageCardProps {
	contact: CompanyContact
	onNavigateToTab?: (tabValue: string) => void
}

/**
 * Randomly selects 1-3 problems from the available problems
 */
function selectRandomProblems(problems: ProblemForMessage[]): string[] {
	if (problems.length === 0) return []
	const count = Math.min(problems.length, Math.floor(Math.random() * 3) + 1)
	const shuffled = [...problems].sort(() => Math.random() - 0.5)
	return shuffled.slice(0, count).map((p) => p.id)
}

export function AiMessageCard({ contact, onNavigateToTab }: AiMessageCardProps) {
	const [channel, setChannel] = useState<MessageChannel>(MessageChannel.WHATSAPP)
	const [generatedMessage, setGeneratedMessage] = useState<string | null>(null)
	const [isCopied, setIsCopied] = useState(false)

	const { generateMessage, isGenerating } = useGenerateAIMessage({
		onSuccess: (message) => setGeneratedMessage(message.content),
	})

	// Determine contact state
	const hasWebsite = Boolean(contact.website)
	const hasAnalysis = Boolean(contact.websiteAnalysis)
	const primaryIssues = contact.websiteAnalysis?.primaryIssues ?? []

	// Convert raw issues to problem objects
	const problems = useMemo<ProblemForMessage[]>(() => {
		if (!hasAnalysis) return []
		return primaryIssues
			.map((issue) => issueToProblem(issue))
			.filter((p): p is ProblemForMessage => p !== null)
	}, [hasAnalysis, primaryIssues])

	// Randomly select problems on mount
	const [selectedProblemIds, setSelectedProblemIds] = useState<string[]>([])
	useEffect(() => {
		setSelectedProblemIds(selectRandomProblems(problems))
	}, [problems])

	const hasProblems = problems.length > 0

	// Handle copy
	async function handleCopy() {
		if (!generatedMessage) return
		try {
			await navigator.clipboard.writeText(generatedMessage)
			setIsCopied(true)
			toast.success('¡Mensaje copiado!')
			setTimeout(() => setIsCopied(false), 2000)
		} catch {
			toast.error('Error al copiar')
		}
	}

	// Handle generation
	const handleGenerate = useCallback(async () => {
		// Special case: no website
		if (!hasWebsite) {
			await generateMessage({
				contactId: contact.id,
				channel,
				tone: MessageTone.FRIENDLY,
				problemIds: [],
				isNoWebsite: true,
			})
			return
		}
		// Special case: all OK
		if (hasAnalysis && !hasProblems) {
			await generateMessage({
				contactId: contact.id,
				channel,
				tone: MessageTone.FRIENDLY,
				problemIds: [],
				isAllOk: true,
			})
			return
		}
		// Normal case: has problems
		if (selectedProblemIds.length > 0) {
			await generateMessage({
				contactId: contact.id,
				channel,
				tone: MessageTone.FRIENDLY,
				problemIds: selectedProblemIds,
			})
		}
	}, [contact.id, channel, hasWebsite, hasAnalysis, hasProblems, selectedProblemIds, generateMessage])

	// Navigate to AI Messages tab
	const handleNavigateToTab = useCallback(() => {
		onNavigateToTab?.('ai-messages')
	}, [onNavigateToTab])

	// Cannot generate if has website but no analysis
	const canGenerate = !hasWebsite || hasAnalysis
	const generateDisabled = !canGenerate || isGenerating

	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between pb-3">
				<div className="flex items-center gap-4">
					<CardTitle className="flex items-center gap-2 text-base font-semibold">
						<Sparkles className="h-4 w-4" />
						Generador de Mensajes
					</CardTitle>
					<button
						onClick={handleNavigateToTab}
						className="flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
					>
						Personalizar
						<ArrowRight className="h-3 w-3" />
					</button>
				</div>
				<div className="flex items-center gap-2">
					{generatedMessage && (
						<Button variant="outline" size="sm" onClick={handleCopy} className="gap-1.5">
							{isCopied ? (
								<>
									<Check className="h-3.5 w-3.5" />
									Copiado
								</>
							) : (
								<>
									<Copy className="h-3.5 w-3.5" />
									Copiar
								</>
							)}
						</Button>
					)}
					<Button
						size="sm"
						onClick={handleGenerate}
						disabled={generateDisabled}
						className="gap-1.5"
					>
						{isGenerating ? (
							<>
								<Loader2 className="h-3.5 w-3.5 animate-spin" />
								Generando...
							</>
						) : (
							<>
								<Sparkles className="h-3.5 w-3.5" />
								Generar
							</>
						)}
					</Button>
				</div>
			</CardHeader>
			<CardContent className="space-y-3 pt-0">
				{/* Channel Selector (compact mode) */}
				<ChannelSelector value={channel} onChange={setChannel} disabled={isGenerating} compact />

				{/* Message Preview or Empty State - prioritize generated message */}
				{generatedMessage ? (
					// Generated message (takes priority)
					<div className="min-h-[80px] rounded-lg border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-900">
						<p className="line-clamp-4 whitespace-pre-wrap text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
							{generatedMessage}
						</p>
					</div>
				) : hasWebsite && !hasAnalysis ? (
					// Pending analysis state
					<div className="flex items-center gap-3 rounded-lg border border-dashed border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-900">
						<AlertCircle className="h-4 w-4 shrink-0 text-blue-500" />
						<div className="flex-1">
							<p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
								Análisis pendiente
							</p>
							<p className="text-xs text-zinc-500">
								Ejecuta el análisis del sitio web primero
							</p>
						</div>
					</div>
				) : !hasWebsite ? (
					// No website state
					<div className="flex items-center gap-3 rounded-lg border border-dashed border-amber-200 bg-amber-50 p-3 dark:border-amber-800 dark:bg-amber-950/20">
						<Globe className="h-4 w-4 shrink-0 text-amber-500" />
						<div className="flex-1">
							<p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
								Sin sitio web
							</p>
							<p className="text-xs text-zinc-500">
								Genera un mensaje ofreciendo creación de web
							</p>
						</div>
					</div>
				) : (
					// Empty state (has analysis with problems)
					<div className="flex min-h-[80px] items-center justify-center rounded-lg border border-dashed border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-900">
						<p className="text-sm text-zinc-500">
							Haz clic en "Generar" para crear un mensaje
						</p>
					</div>
				)}
			</CardContent>
		</Card>
	)
}

