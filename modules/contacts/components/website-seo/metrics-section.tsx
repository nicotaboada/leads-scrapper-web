'use client'

/**
 * Metrics Section Component
 *
 * Displays progress bars for professionalism, freshness, load time, and SEO scores
 */

import { Card, CardContent, CardHeader, CardTitle } from 'components/ui/card'
import { Progress } from 'components/ui/progress'
import type { WebsiteAnalysis } from '../../types/website-analysis'

interface MetricsSectionProps {
	analysis: WebsiteAnalysis
}

interface MetricBarProps {
	label: string
	score: number
	description?: string
}

function MetricBar({ label, score, description }: MetricBarProps) {
	return (
		<div className="space-y-3">
			<div className="flex items-end justify-between">
				<div className="flex flex-col gap-0.5">
					<span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
						{label}
					</span>
					{description && (
						<span className="text-[11px] font-medium text-zinc-500 uppercase dark:text-zinc-400">
							{description}
						</span>
					)}
				</div>
				<span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
					{score}/100
				</span>
			</div>
			<div className="relative h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
				<Progress
					value={score}
					indicatorClassName="bg-zinc-900 dark:bg-zinc-100"
					className="h-full w-full"
				/>
			</div>
		</div>
	)
}

function getLoadTimeDescription(loadTimeMs?: number): string {
	if (!loadTimeMs) return 'No medido'
	if (loadTimeMs < 1000) return `${loadTimeMs}ms - Excelente`
	if (loadTimeMs < 3000) return `${(loadTimeMs / 1000).toFixed(1)}s - Aceptable`
	return `${(loadTimeMs / 1000).toFixed(1)}s - Lento`
}

function getProfessionalismDescription(level: string): string {
	const descriptions: Record<string, string> = {
		AMATEUR: 'Diseño amateur',
		BASIC: 'Diseño básico',
		PROFESSIONAL: 'Diseño profesional',
		ENTERPRISE: 'Diseño enterprise',
	}
	return descriptions[level] || level
}

function getFreshnessDescription(level: string): string {
	const descriptions: Record<string, string> = {
		OUTDATED: 'Contenido desactualizado',
		DATED: 'Contenido algo antiguo',
		CURRENT: 'Contenido actual',
		MODERN: 'Contenido moderno',
	}
	return descriptions[level] || level
}

function getSeoDescription(score: number): string {
	if (score >= 80) return 'Top 3 en Google'
	if (score >= 60) return 'Top 10 en Google'
	if (score >= 40) return 'Top 20 en Google'
	return 'No aparece en resultados'
}

export function MetricsSection({ analysis }: MetricsSectionProps) {
	return (
		<Card>
			<CardHeader className="pb-4">
				<CardTitle className="text-base font-semibold">
					Métricas Detalladas
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-5">
				<MetricBar
					label="Profesionalismo"
					score={analysis.professionalismScore}
					description={getProfessionalismDescription(
						analysis.professionalismLevel
					)}
				/>
				<MetricBar
					label="Actualización"
					score={analysis.freshnessScore}
					description={getFreshnessDescription(analysis.freshnessLevel)}
				/>
				<MetricBar
					label="Velocidad de Carga"
					score={analysis.loadTimeScore}
					description={getLoadTimeDescription(analysis.loadTimeMs)}
				/>
				<MetricBar
					label="SEO"
					score={analysis.seoScore}
					description={getSeoDescription(analysis.seoScore)}
				/>
			</CardContent>
		</Card>
	)
}
