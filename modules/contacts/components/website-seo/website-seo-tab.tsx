'use client'

/**
 * Website & SEO Tab Component
 *
 * Main tab content for website analysis and SEO scoring.
 * Shows either the analysis results or an empty state with action button.
 */

import { Loader2, RefreshCw } from 'lucide-react'
import { motion } from 'motion/react'
import { Button } from 'components/ui/button'
import { Card, CardContent } from 'components/ui/card'
import { Skeleton } from 'components/ui/skeleton'
import { WebsiteSeoEmptyState } from './empty-state'
import { IssuesSection } from './issues-section'
import { MetricsSection } from './metrics-section'
import { ScoreCirclesSection } from './score-circles-section'
import { useAnalyzeWebsite } from '../../hooks/use-analyze-website'
import { useWebsiteAnalysis } from '../../hooks/use-website-analysis'
import type { CompanyContact } from '../../types'

interface WebsiteSeoTabProps {
	contact: CompanyContact
	onAnalysisCompleted?: () => void
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

export function WebsiteSeoTab({
	contact,
	onAnalysisCompleted,
}: WebsiteSeoTabProps) {
	const hasWebsite = Boolean(contact.website)

	const { analysis, isLoading, refetch } = useWebsiteAnalysis({
		contactId: contact.id,
		skip: !hasWebsite,
	})

	const { runAnalysis, isAnalyzing } = useAnalyzeWebsite({
		contactId: contact.id,
		onSuccess: () => {
			refetch()
			onAnalysisCompleted?.()
		},
	})

	// Loading state
	if (isLoading) {
		return <WebsiteSeoTabSkeleton />
	}

	// Empty state - no analysis yet
	if (!analysis) {
		return (
			<WebsiteSeoEmptyState
				hasWebsite={hasWebsite}
				onRunAnalysis={runAnalysis}
				isAnalyzing={isAnalyzing}
			/>
		)
	}

	return (
		<motion.div
			className="space-y-6"
			variants={containerVariants}
			initial="hidden"
			animate="visible"
		>
			{/* Header with website URL and re-analyze button */}
			<motion.div
				variants={itemVariants}
				className="flex items-center justify-between"
			>
				<div className="flex items-center gap-2"></div>
				<Button
					variant="outline"
					size="sm"
					onClick={runAnalysis}
					disabled={isAnalyzing}
					className="h-8 border-zinc-200 text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
				>
					{isAnalyzing ? (
						<>
							<Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
							Analizando...
						</>
					) : (
						<>
							<RefreshCw className="mr-2 h-3.5 w-3.5 text-zinc-400" />
							Re-analizar
						</>
					)}
				</Button>
			</motion.div>

			{/* Score Circles */}
			<motion.div variants={itemVariants}>
				<ScoreCirclesSection analysis={analysis} />
			</motion.div>

			{/* Primary Issues */}
			<motion.div variants={itemVariants}>
				<IssuesSection analysis={analysis} />
			</motion.div>

			<motion.div variants={itemVariants}>
				<MetricsSection analysis={analysis} />
			</motion.div>

			{/* Last analyzed timestamp */}
			<motion.p
				variants={itemVariants}
				className="pt-4 text-center text-[10px] font-bold text-zinc-400 uppercase"
			>
				Último análisis:{' '}
				<span className="text-zinc-500">
					{new Date(analysis.analyzedAt).toLocaleDateString('es-AR', {
						day: '2-digit',
						month: 'short',
						year: 'numeric',
						hour: '2-digit',
						minute: '2-digit',
					})}
				</span>
			</motion.p>
		</motion.div>
	)
}

function WebsiteSeoTabSkeleton() {
	return (
		<div className="space-y-6">
			{/* Header skeleton */}
			<div className="flex items-center justify-between">
				<Skeleton className="h-5 w-64" />
				<Skeleton className="h-9 w-28" />
			</div>

			{/* Score circles skeleton */}
			<Card>
				<CardContent className="py-8">
					<div className="flex items-center justify-around">
						<div className="flex flex-col items-center gap-2">
							<Skeleton className="h-[180px] w-[180px] rounded-full" />
							<Skeleton className="h-4 w-16" />
						</div>
						<div className="flex flex-col items-center gap-2">
							<Skeleton className="h-[140px] w-[140px] rounded-full" />
							<Skeleton className="h-4 w-16" />
						</div>
						<div className="flex flex-col items-center gap-2">
							<Skeleton className="h-[140px] w-[140px] rounded-full" />
							<Skeleton className="h-4 w-16" />
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Issues skeleton */}
			<Card>
				<CardContent className="py-6">
					<Skeleton className="mb-4 h-5 w-40" />
					<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
						<Skeleton className="h-16" />
						<Skeleton className="h-16" />
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
