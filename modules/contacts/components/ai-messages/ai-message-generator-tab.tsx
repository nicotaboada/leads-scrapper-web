'use client'

/**
 * AI Message Generator Tab Component
 *
 * Full tab for generating AI-powered outreach messages
 * with channel, tone, and problem selection controls.
 */

import { Loader2, Sparkles } from 'lucide-react'
import { motion } from 'motion/react'
import { useCallback, useMemo, useState } from 'react'
import { Button } from 'components/ui/button'
import { Card, CardContent } from 'components/ui/card'
import { ChannelSelector } from './channel-selector'
import {
	AllOkState,
	AnalysisPendingState,
	NoWebsiteState,
} from './empty-states'
import { MessagePreview } from './message-preview'
import { ProblemSelector } from './problem-selector'
import { ToneSelector } from './tone-selector'
import { useGenerateAIMessage } from '../../hooks/use-generate-ai-message'
import type { CompanyContact } from '../../types'
import {
	issueToProblem,
	MessageChannel,
	MessageTone,
	type ProblemForMessage,
} from '../../types/ai-message'

interface AiMessageGeneratorTabProps {
	contact: CompanyContact
	onNavigateToTab?: (tabValue: string) => void
}

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
}

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.4,
		},
	},
}

export function AiMessageGeneratorTab({
	contact,
	onNavigateToTab,
}: AiMessageGeneratorTabProps) {
	const [channel, setChannel] = useState<MessageChannel>(
		MessageChannel.WHATSAPP
	)
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
	}, [
		contact.id,
		channel,
		tone,
		selectedProblemIds,
		hasSelectedProblems,
		generateMessage,
	])

	// Navigate to Website & SEO tab
	const handleNavigateToAnalysis = useCallback(() => {
		onNavigateToTab?.('website-seo')
	}, [onNavigateToTab])

	// Scenario: No website
	if (!hasWebsite) {
		return (
			<motion.div
				className="space-y-6"
				variants={containerVariants}
				initial="hidden"
				animate="visible"
			>
				<motion.div variants={itemVariants}>
					<Header />
				</motion.div>
				<div className="grid gap-6 lg:grid-cols-2">
					<motion.div variants={itemVariants}>
						<Card className="border-zinc-200 shadow-sm dark:border-zinc-800">
							<CardContent className="space-y-6 py-6">
								<ChannelSelector value={channel} onChange={setChannel} />
								<ToneSelector value={tone} onChange={setTone} />
							</CardContent>
						</Card>
					</motion.div>
					{generatedMessage ? (
						<motion.div variants={itemVariants}>
							<MessagePreview
								message={generatedMessage}
								isLoading={isGenerating}
								className="h-full"
							/>
						</motion.div>
					) : (
						<motion.div variants={itemVariants}>
							<NoWebsiteState
								onGenerate={handleGenerateNoWebsite}
								isGenerating={isGenerating}
							/>
						</motion.div>
					)}
				</div>
			</motion.div>
		)
	}

	// Scenario: Has website but no analysis
	if (!hasAnalysis) {
		return (
			<motion.div
				className="space-y-6"
				variants={containerVariants}
				initial="hidden"
				animate="visible"
			>
				<motion.div variants={itemVariants}>
					<Header />
				</motion.div>
				<motion.div variants={itemVariants}>
					<AnalysisPendingState
						onNavigateToAnalysis={handleNavigateToAnalysis}
					/>
				</motion.div>
			</motion.div>
		)
	}

	// Scenario: Has analysis but no problems
	if (!hasProblems) {
		return (
			<motion.div
				className="space-y-6"
				variants={containerVariants}
				initial="hidden"
				animate="visible"
			>
				<motion.div variants={itemVariants}>
					<Header />
				</motion.div>
				<div className="grid gap-6 lg:grid-cols-2">
					<motion.div variants={itemVariants}>
						<Card className="border-zinc-200 shadow-sm dark:border-zinc-800">
							<CardContent className="space-y-6 py-6">
								<ChannelSelector value={channel} onChange={setChannel} />
								<ToneSelector value={tone} onChange={setTone} />
							</CardContent>
						</Card>
					</motion.div>
					{generatedMessage ? (
						<motion.div variants={itemVariants}>
							<MessagePreview
								message={generatedMessage}
								isLoading={isGenerating}
								className="h-full"
							/>
						</motion.div>
					) : (
						<motion.div variants={itemVariants}>
							<AllOkState
								onGenerate={handleGenerateAllOk}
								isGenerating={isGenerating}
							/>
						</motion.div>
					)}
				</div>
			</motion.div>
		)
	}

	// Normal scenario: Has problems to select
	return (
		<motion.div
			className="space-y-6"
			variants={containerVariants}
			initial="hidden"
			animate="visible"
		>
			<motion.div variants={itemVariants}>
				<Header />
			</motion.div>
			<div className="grid gap-6 lg:grid-cols-2">
				{/* Left Column: Controls */}
				<motion.div variants={itemVariants}>
					<Card className="border-zinc-200 shadow-sm dark:border-zinc-800">
						<CardContent className="space-y-6 py-6">
							<ChannelSelector
								value={channel}
								onChange={setChannel}
								disabled={isGenerating}
							/>
							<ToneSelector
								value={tone}
								onChange={setTone}
								disabled={isGenerating}
							/>
							<ProblemSelector
								problems={problems}
								selectedIds={selectedProblemIds}
								onSelectionChange={setSelectedProblemIds}
								disabled={isGenerating}
							/>
						</CardContent>
					</Card>
				</motion.div>

				{/* Right Column: Preview and Generate */}
				<div className="flex flex-col gap-4">
					<motion.div variants={itemVariants} className="flex-1">
						<MessagePreview
							message={generatedMessage}
							isLoading={isGenerating}
							className="h-full"
						/>
					</motion.div>
					<motion.div variants={itemVariants}>
						<Button
							size="lg"
							onClick={handleGenerate}
							disabled={!hasSelectedProblems || isGenerating}
							className="w-full gap-2 bg-zinc-900 font-bold text-zinc-50 shadow-sm hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
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
					</motion.div>
				</div>
			</div>
		</motion.div>
	)
}

function Header() {
	return (
		<div>
			<h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
				Generador de Mensajes IA
			</h2>
			<p className="text-sm text-zinc-500 dark:text-zinc-400">
				Selecciona los problemas, elige el tono y genera mensajes personalizados
				al instante
			</p>
		</div>
	)
}
