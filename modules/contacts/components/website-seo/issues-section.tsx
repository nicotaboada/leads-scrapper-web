'use client'

/**
 * Issues Section Component
 *
 * Displays primary issues detected in the website analysis
 * with rich cards showing title, description and impact badge
 */

import { XCircle, AlertCircle, CheckCircle2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from 'components/ui/card'
import { Badge } from 'components/ui/badge'
import type { WebsiteAnalysis } from '../../types/website-analysis'

interface IssuesSectionProps {
	analysis: WebsiteAnalysis
}

interface IssueDetail {
	title: string
	description: string
	impact: string
	severity: 'critical' | 'warning'
}

/**
 * Maps raw issue strings to rich issue details
 */
function parseIssueToDetail(issue: string, index: number): IssueDetail {
	const issueMap: Record<string, IssueDetail> = {
		'No clear value proposition above the fold': {
			title: 'Sin propuesta de valor clara',
			description: 'No hay una propuesta de valor visible en la parte superior de la página',
			impact: 'Reduce conversiones',
			severity: 'critical',
		},
		'Lack of visible call to action': {
			title: 'Sin llamada a la acción',
			description: 'No hay botones o CTAs visibles para guiar al usuario',
			impact: 'Reduce conversiones',
			severity: 'critical',
		},
		'Outdated visual appearance': {
			title: 'Diseño desactualizado',
			description: 'El sitio usa patrones de diseño de hace 5+ años',
			impact: 'Afecta credibilidad',
			severity: 'warning',
		},
		'Slow page load time': {
			title: 'Velocidad lenta',
			description: 'El tiempo de carga es mayor a 3 segundos',
			impact: 'Alto impacto en UX',
			severity: 'critical',
		},
		'Missing meta descriptions': {
			title: 'Sin meta descriptions',
			description: 'Faltan meta descriptions en las páginas principales',
			impact: 'Alto impacto en SEO',
			severity: 'critical',
		},
		'Poor mobile responsiveness': {
			title: 'Mala experiencia móvil',
			description: 'El sitio no está optimizado para dispositivos móviles',
			impact: 'Afecta SEO y UX',
			severity: 'critical',
		},
		'No SSL certificate': {
			title: 'Sin certificado SSL',
			description: 'El sitio no tiene conexión segura HTTPS',
			impact: 'Alto impacto en SEO',
			severity: 'critical',
		},
		'Unclear service offering': {
			title: 'Servicios poco claros',
			description: 'No hay una página clara de servicios o propuesta de valor',
			impact: 'Reduce conversiones',
			severity: 'warning',
		},
	}

	// Try to find an exact match first
	if (issueMap[issue]) {
		return issueMap[issue]
	}

	// Try partial matching
	const lowerIssue = issue.toLowerCase()
	for (const [key, value] of Object.entries(issueMap)) {
		if (lowerIssue.includes(key.toLowerCase().split(' ')[0])) {
			return value
		}
	}

	// Default fallback
	return {
		title: issue,
		description: 'Problema detectado durante el análisis',
		impact: index % 2 === 0 ? 'Alto impacto' : 'Impacto medio',
		severity: index % 2 === 0 ? 'critical' : 'warning',
	}
}

function IssueCard({ issue }: { issue: IssueDetail }) {
	const isCritical = issue.severity === 'critical'
	const IconComponent = isCritical ? XCircle : AlertCircle

	return (
		<div className="flex gap-4 rounded-xl border bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:bg-zinc-900">
			<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
				<IconComponent className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
			</div>
			<div className="flex flex-col gap-2">
				<h4 className="font-semibold text-zinc-900 dark:text-zinc-100">{issue.title}</h4>
				<p className="text-sm text-zinc-500 dark:text-zinc-400">{issue.description}</p>
				<Badge variant="outline" className="w-fit text-xs font-normal">
					{issue.impact}
				</Badge>
			</div>
		</div>
	)
}

export function IssuesSection({ analysis }: IssuesSectionProps) {
	const hasIssues = analysis.primaryIssues.length > 0
	const issueDetails = analysis.primaryIssues.map((issue, index) =>
		parseIssueToDetail(issue, index)
	)

	return (
		<Card>
			<CardHeader className="pb-4">
				<CardTitle className="text-base font-semibold">Problemas Detectados</CardTitle>
			</CardHeader>
			<CardContent>
				{hasIssues ? (
					<div className="grid gap-4 sm:grid-cols-2">
						{issueDetails.map((issue, index) => (
							<IssueCard key={index} issue={issue} />
						))}
					</div>
				) : (
					<div className="flex items-center gap-3 rounded-xl border bg-zinc-50 p-5 dark:bg-zinc-900">
						<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
							<CheckCircle2 className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
						</div>
						<div>
							<h4 className="font-semibold text-zinc-900 dark:text-zinc-100">
								Sin problemas detectados
							</h4>
							<p className="text-sm text-zinc-500 dark:text-zinc-400">
								El sitio web cumple con los estándares básicos de calidad
							</p>
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	)
}

