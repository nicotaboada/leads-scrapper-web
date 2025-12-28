'use client'

/**
 * Empty States for AI Message Generator
 *
 * Different empty states based on contact/analysis status
 */

import { Globe, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react'
import { Button } from 'components/ui/button'
import { Card, CardContent } from 'components/ui/card'

interface NoWebsiteStateProps {
	onGenerate: () => void
	isGenerating?: boolean
}

/**
 * State when contact has no website
 */
export function NoWebsiteState({ onGenerate, isGenerating }: NoWebsiteStateProps) {
	return (
		<Card>
			<CardContent className="flex flex-col items-center py-12 text-center">
				<div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-950/30">
					<Globe className="h-8 w-8 text-amber-600 dark:text-amber-400" />
				</div>
				<h3 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
					Este lead no tiene sitio web
				</h3>
				<p className="mb-6 max-w-md text-sm text-zinc-500 dark:text-zinc-400">
					Puedes generar un mensaje ofreciendo la creación de un sitio web profesional para
					ayudarlos a tener presencia online.
				</p>
				<Button onClick={onGenerate} disabled={isGenerating}>
					{isGenerating ? 'Generando...' : 'Generar mensaje de oferta'}
				</Button>
			</CardContent>
		</Card>
	)
}

interface AnalysisPendingStateProps {
	onNavigateToAnalysis: () => void
}

/**
 * State when website exists but analysis hasn't run
 */
export function AnalysisPendingState({ onNavigateToAnalysis }: AnalysisPendingStateProps) {
	return (
		<Card>
			<CardContent className="flex flex-col items-center py-12 text-center">
				<div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950/30">
					<AlertCircle className="h-8 w-8 text-blue-600 dark:text-blue-400" />
				</div>
				<h3 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
					Análisis pendiente
				</h3>
				<p className="mb-6 max-w-md text-sm text-zinc-500 dark:text-zinc-400">
					Para generar mensajes personalizados, primero debes ejecutar el análisis del sitio
					web para detectar problemas y oportunidades.
				</p>
				<Button onClick={onNavigateToAnalysis} variant="outline" className="gap-2">
					Ir a Website & SEO
					<ArrowRight className="h-4 w-4" />
				</Button>
			</CardContent>
		</Card>
	)
}

interface AllOkStateProps {
	onGenerate: () => void
	isGenerating?: boolean
}

/**
 * State when website analysis found no problems
 */
export function AllOkState({ onGenerate, isGenerating }: AllOkStateProps) {
	return (
		<Card>
			<CardContent className="flex flex-col items-center py-12 text-center">
				<div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-950/30">
					<CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
				</div>
				<h3 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
					¡Excelente! Sin problemas detectados
				</h3>
				<p className="mb-6 max-w-md text-sm text-zinc-500 dark:text-zinc-400">
					El sitio web de este lead cumple con los estándares de calidad. Puedes generar un
					mensaje felicitándolos y ofreciendo servicios complementarios.
				</p>
				<Button onClick={onGenerate} disabled={isGenerating}>
					{isGenerating ? 'Generando...' : 'Generar mensaje de felicitación'}
				</Button>
			</CardContent>
		</Card>
	)
}

