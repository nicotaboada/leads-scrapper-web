'use client'

/**
 * Score Circles Section Component
 *
 * Displays three score circles for overall, website, and SEO scores
 */

import { Card, CardContent, CardHeader, CardTitle } from 'components/ui/card'
import { ScoreCircle } from './score-circle'
import type { WebsiteAnalysis } from '../../types/website-analysis'

interface ScoreCirclesSectionProps {
	analysis: WebsiteAnalysis
}

export function ScoreCirclesSection({ analysis }: ScoreCirclesSectionProps) {
	return (
		<Card>
			<CardHeader className="pb-4">
				<CardTitle className="text-base font-semibold">
					Puntuación General
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex items-center justify-around">
					<ScoreCircle
						score={analysis.overallScore}
						label="Overall"
						size="lg"
					/>
					<ScoreCircle
						score={analysis.websiteScore}
						label="Website"
						size="md"
					/>
					<ScoreCircle score={analysis.seoScore} label="SEO" size="md" />
				</div>
			</CardContent>
		</Card>
	)
}
