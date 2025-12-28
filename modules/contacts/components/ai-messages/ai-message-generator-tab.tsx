'use client'

/**
 * AI Message Generator Tab Component
 *
 * Full tab for generating AI-powered outreach messages
 * with channel, tone, and problem selection controls.
 */

import { useState, useMemo, useCallback } from 'react'
import { Sparkles, Loader2 } from 'lucide-react'
import { Button } from 'components/ui/button'
import { Card, CardContent } from 'components/ui/card'
import { ChannelSelector } from './channel-selector'
import { ToneSelector } from './tone-selector'
import { ProblemSelector } from './problem-selector'
import { MessagePreview } from './message-preview'
import { NoWebsiteState, AnalysisPendingState, AllOkState } from './empty-states'
import { useGenerateAIMessage } from '../../hooks/use-generate-ai-message'
import {
	MessageChannel,
	MessageTone,
	issueToProblem,
	NO_WEBSITE_PROBLEM,
	type ProblemForMessage,
} from '../../types/ai-message'
import type { CompanyContact } from '../../types'

interface AiMessageGeneratorTabProps {
	contact: CompanyContact
	onNavigateToTab?: (tabValue: string) => void
}

export function AiMessageGeneratorTab({ contact, onNavigateToTab }: AiMessageGeneratorTabProps) {
	const [channel, setChannel] = useState<MessageChannel>(MessageChannel.WHATSAPP)
	const [tone, setTone] = useState<MessageTone>(MessageTone.FRIENDLY)
	const [selectedProblemIds, setSelectedProblemIds] = useState<string[]>([])
	const [generatedMessage, setGeneratedMessage] = useState<string | null>(null)

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

	const hasProblems = problems.length > 0
	const hasSelectedProblems = selectedProblemIds.length > 0

	// Handle special scenario generation
	const handleGenerateNoWebsite = useCallback(async () => {
		await generateMessage({
			contactId: contact.id,
			channel,
			tone,
			problemIds: [],
			isNoWebsite: true,
		})
	}, [contact.id, channel, tone, generateMessage])

	const handleGenerateAllOk = useCallback(async () => {
		await generateMessage({
			contactId: contact.id,
			channel,
			tone,
			problemIds: [],
			isAllOk: true,
		})
	}, [contact.id, channel, tone, generateMessage])

	// Handle normal generation with selected problems
	const handleGenerate = useCallback(async () => {
		if (!hasSelectedProblems) return
		await generateMessage({
			contactId: contact.id,
			channel,
			tone,
			problemIds: selectedProblemIds,
		})
	}, [contact.id, channel, tone, selectedProblemIds, hasSelectedProblems, generateMessage])

	// Navigate to Website & SEO tab
	const handleNavigateToAnalysis = useCallback(() => {
		onNavigateToTab?.('website-seo')
	}, [onNavigateToTab])

	// Scenario: No website
	if (!hasWebsite) {
		return (
			<div className="space-y-6">
				<Header />
				<div className="grid gap-6 lg:grid-cols-2">
					<Card>
						<CardContent className="space-y-6 py-6">
							<ChannelSelector value={channel} onChange={setChannel} />
							<ToneSelector value={tone} onChange={setTone} />
						</CardContent>
					</Card>
					<NoWebsiteState onGenerate={handleGenerateNoWebsite} isGenerating={isGenerating} />
				</div>
				{generatedMessage && (
					<MessagePreview message={generatedMessage} className="mt-6" />
				)}
			</div>
		)
	}

	// Scenario: Has website but no analysis
	if (!hasAnalysis) {
		return (
			<div className="space-y-6">
				<Header />
				<AnalysisPendingState onNavigateToAnalysis={handleNavigateToAnalysis} />
			</div>
		)
	}

	// Scenario: Has analysis but no problems
	if (!hasProblems) {
		return (
			<div className="space-y-6">
				<Header />
				<div className="grid gap-6 lg:grid-cols-2">
					<Card>
						<CardContent className="space-y-6 py-6">
							<ChannelSelector value={channel} onChange={setChannel} />
							<ToneSelector value={tone} onChange={setTone} />
						</CardContent>
					</Card>
					<AllOkState onGenerate={handleGenerateAllOk} isGenerating={isGenerating} />
				</div>
				{generatedMessage && (
					<MessagePreview message={generatedMessage} className="mt-6" />
				)}
			</div>
		)
	}

	// Normal scenario: Has problems to select
	return (
		<div className="space-y-6">
			<Header />
			<div className="grid gap-6 lg:grid-cols-2">
				{/* Left Column: Controls */}
				<Card>
					<CardContent className="space-y-6 py-6">
						<ChannelSelector value={channel} onChange={setChannel} disabled={isGenerating} />
						<ToneSelector value={tone} onChange={setTone} disabled={isGenerating} />
						<ProblemSelector
							problems={problems}
							selectedIds={selectedProblemIds}
							onSelectionChange={setSelectedProblemIds}
							disabled={isGenerating}
						/>
					</CardContent>
				</Card>

				{/* Right Column: Preview and Generate */}
				<div className="flex flex-col gap-4">
					<MessagePreview
						message={generatedMessage}
						isLoading={isGenerating}
						className="flex-1"
					/>
					<Button
						size="lg"
						onClick={handleGenerate}
						disabled={!hasSelectedProblems || isGenerating}
						className="w-full gap-2"
					>
						{isGenerating ? (
							<>
								<Loader2 className="h-4 w-4 animate-spin" />
								Generando mensaje...
							</>
						) : (
							<>
								<Sparkles className="h-4 w-4" />
								Generar Mensaje con IA
							</>
						)}
					</Button>
				</div>
			</div>
		</div>
	)
}

function Header() {
	return (
		<div>
			<h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
				Generador de Mensajes IA
			</h2>
			<p className="text-sm text-zinc-500 dark:text-zinc-400">
				Selecciona los problemas, elige el tono y genera mensajes personalizados al instante
			</p>
		</div>
	)
}

