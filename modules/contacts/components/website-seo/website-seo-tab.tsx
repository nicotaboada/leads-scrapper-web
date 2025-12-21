'use client'

/**
 * Website & SEO Tab Component
 *
 * Main tab content for website analysis and SEO scoring.
 * Shows either the analysis results or an empty state with action button.
 */

import { ExternalLink, Loader2, RefreshCw } from 'lucide-react'
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
}

export function WebsiteSeoTab({ contact }: WebsiteSeoTabProps) {
	const hasWebsite = Boolean(contact.website)

	const { analysis, isLoading, refetch } = useWebsiteAnalysis({
		contactId: contact.id,
		skip: !hasWebsite,
	})

	const { runAnalysis, isAnalyzing } = useAnalyzeWebsite({
		contactId: contact.id,
		onSuccess: () => refetch(),
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
		<div className="space-y-6">
			{/* Header with website URL and re-analyze button */}
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<span className="text-muted-foreground text-sm">Sitio web:</span>
					<a
						href={analysis.websiteUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
					>
						{analysis.websiteUrl}
						<ExternalLink className="h-3 w-3" />
					</a>
				</div>
				<Button
					variant="outline"
					size="sm"
					onClick={runAnalysis}
					disabled={isAnalyzing}
				>
					{isAnalyzing ? (
						<>
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							Analizando...
						</>
					) : (
						<>
							<RefreshCw className="mr-2 h-4 w-4" />
							Re-analizar
						</>
					)}
				</Button>
			</div>

			{/* Score Circles */}
			<ScoreCirclesSection analysis={analysis} />

			{/* Primary Issues */}
			<IssuesSection analysis={analysis} />

			<MetricsSection analysis={analysis} />

			{/* Last analyzed timestamp */}
			<p className="text-muted-foreground text-center text-xs">
				Último análisis:{' '}
				{new Date(analysis.analyzedAt).toLocaleDateString('es-AR', {
					day: '2-digit',
					month: 'short',
					year: 'numeric',
					hour: '2-digit',
					minute: '2-digit',
				})}
			</p>
		</div>
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
