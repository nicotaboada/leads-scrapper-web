'use client'

/**
 * AI Message Card Component
 *
 * Simplified card for the Overview tab with quick message generation.
 * Randomly selects 1-3 problems and uses default tone (Amigable).
 */

import {
	AlertCircle,
	ArrowRight,
	Check,
	Copy,
	Globe,
	Loader2,
	Sparkles,
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { toast } from 'sonner'
import { Button } from 'components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from 'components/ui/card'
import { ChannelSelector } from './channel-selector'
import { useGenerateAIMessage } from '../../hooks/use-generate-ai-message'
import type { CompanyContact } from '../../types'
import {
	issueToProblem,
	MessageChannel,
	MessageTone,
	type ProblemForMessage,
} from '../../types/ai-message'

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

export function AiMessageCard({
	contact,
	onNavigateToTab,
}: AiMessageCardProps) {
	const [channel, setChannel] = useState<MessageChannel>(
		MessageChannel.WHATSAPP
	)
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

	// Randomly select problems on mount (only once when problems are available)
	const [selectedProblemIds, setSelectedProblemIds] = useState<string[]>([])
	const hasInitializedRef = useRef(false)
	useEffect(() => {
		if (problems.length > 0 && !hasInitializedRef.current) {
			hasInitializedRef.current = true
			setSelectedProblemIds(selectRandomProblems(problems))
		}
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
	}, [
		contact.id,
		channel,
		hasWebsite,
		hasAnalysis,
		hasProblems,
		selectedProblemIds,
		generateMessage,
	])

	// Navigate to AI Messages tab
	const handleNavigateToTab = useCallback(() => {
		onNavigateToTab?.('ai-messages')
	}, [onNavigateToTab])

	// Cannot generate if has website but no analysis
	const canGenerate = !hasWebsite || hasAnalysis
	const generateDisabled = !canGenerate || isGenerating

	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4 }}
		>
			<Card className="overflow-hidden border-zinc-200 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800">
				<CardHeader className="flex flex-row items-center justify-between border-b border-zinc-50 !pb-0 dark:border-zinc-900">
					<div className="flex items-center gap-4">
						<CardTitle className="flex items-center gap-2 text-base font-bold text-zinc-900 dark:text-zinc-100">
							<Sparkles className="h-4 w-4 text-zinc-400" />
							Generador de Mensajes
						</CardTitle>
						<button
							onClick={handleNavigateToTab}
							className="group flex items-center gap-1 text-xs font-medium text-zinc-400 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
						>
							Personalizar
							<ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
						</button>
					</div>
					<div className="flex items-center gap-2">
						{generatedMessage && (
							<Button
								variant="outline"
								size="sm"
								onClick={handleCopy}
								className="h-8 gap-1.5 border-zinc-200 text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
							>
								{isCopied ? (
									<>
										<Check className="h-3.5 w-3.5 text-zinc-900 dark:text-zinc-100" />
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
							className="h-8 gap-1.5 bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
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
				<CardContent className="space-y-4">
					{/* Channel Selector (compact mode) */}
					<ChannelSelector
						value={channel}
						onChange={setChannel}
						disabled={isGenerating}
						compact
					/>

					{/* Message Preview or Empty State - prioritize generated message */}
					<AnimatePresence mode="wait">
						{generatedMessage ? (
							// Generated message (takes priority)
							<motion.div
								key="generated"
								initial={{ opacity: 0, scale: 0.98 }}
								animate={{ opacity: 1, scale: 1 }}
								className="relative min-h-[100px] overflow-hidden rounded-lg border border-zinc-200 bg-white p-4 shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)] dark:border-zinc-800 dark:bg-zinc-950"
							>
								<div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-zinc-50/50 dark:to-zinc-900/10" />
								<p className="relative line-clamp-5 text-sm leading-relaxed whitespace-pre-wrap text-zinc-700 dark:text-zinc-300">
									{generatedMessage}
								</p>
							</motion.div>
						) : hasWebsite && !hasAnalysis ? (
							// Pending analysis state
							<motion.div
								key="pending"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								className="flex items-center gap-4 rounded-lg border border-zinc-200 bg-zinc-50/50 p-4 dark:border-zinc-800 dark:bg-zinc-900/30"
							>
								<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
									<AlertCircle className="h-5 w-5 text-zinc-400" />
								</div>
								<div className="flex-1">
									<p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
										Análisis pendiente
									</p>
									<p className="text-xs font-medium text-zinc-500">
										Ejecuta el análisis del sitio web primero para una
										personalización total.
									</p>
								</div>
							</motion.div>
						) : !hasWebsite ? (
							// No website state
							<motion.div
								key="no-website"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								className="flex items-center gap-4 rounded-lg border border-zinc-200 bg-zinc-50/50 p-4 dark:border-zinc-800 dark:bg-zinc-900/30"
							>
								<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
									<Globe className="h-5 w-5 text-zinc-400" />
								</div>
								<div className="flex-1">
									<p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
										Sin sitio web
									</p>
									<p className="text-xs font-medium text-zinc-500">
										Genera un mensaje estratégico ofreciendo servicios de
										creación web.
									</p>
								</div>
							</motion.div>
						) : (
							// Empty state (has analysis with problems)
							<motion.div
								key="empty"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								className="flex min-h-[100px] flex-col items-center justify-center rounded-lg border border-dashed border-zinc-200 bg-zinc-50/30 p-4 text-center dark:border-zinc-800 dark:bg-zinc-900/10"
							>
								<Sparkles className="mb-2 h-5 w-5 text-zinc-300 dark:text-zinc-700" />
								<p className="text-xs font-medium text-zinc-400">
									Haz clic en "Generar" para crear un mensaje personalizado
								</p>
							</motion.div>
						)}
					</AnimatePresence>
				</CardContent>
			</Card>
		</motion.div>
	)
}
