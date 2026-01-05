'use client'

/**
 * Empty States for AI Message Generator
 *
 * Different empty states based on contact/analysis status
 */

import { AlertCircle, ArrowRight, CheckCircle2, Globe } from 'lucide-react'
import { Button } from 'components/ui/button'
import { Card, CardContent } from 'components/ui/card'

interface NoWebsiteStateProps {
	onGenerate: () => void
	isGenerating?: boolean
}

/**
 * State when contact has no website
 */
export function NoWebsiteState({
	onGenerate,
	isGenerating,
}: NoWebsiteStateProps) {
	return (
		<Card className="border-zinc-200 shadow-sm dark:border-zinc-800">
			<CardContent className="flex flex-col items-center py-12 text-center">
				<div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
					<Globe className="h-8 w-8 text-zinc-400 dark:text-zinc-500" />
				</div>
				<h3 className="mb-2 text-lg font-bold text-zinc-900 dark:text-zinc-100">
					Este lead no tiene sitio web
				</h3>
				<p className="mb-6 max-w-xs text-sm font-medium text-zinc-500 dark:text-zinc-400">
					Puedes generar un mensaje estratégico ofreciendo la creación de un
					sitio web profesional.
				</p>
				<Button
					onClick={onGenerate}
					disabled={isGenerating}
					className="bg-zinc-900 font-bold text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
				>
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
export function AnalysisPendingState({
	onNavigateToAnalysis,
}: AnalysisPendingStateProps) {
	return (
		<Card className="border-zinc-200 shadow-sm dark:border-zinc-800">
			<CardContent className="flex flex-col items-center py-12 text-center">
				<div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
					<AlertCircle className="h-8 w-8 text-zinc-400 dark:text-zinc-500" />
				</div>
				<h3 className="mb-2 text-lg font-bold text-zinc-900 dark:text-zinc-100">
					Análisis pendiente
				</h3>
				<p className="mb-6 max-w-xs text-sm font-medium text-zinc-500 dark:text-zinc-400">
					Primero debes ejecutar el análisis del sitio web para detectar
					problemas y oportunidades.
				</p>
				<Button
					onClick={onNavigateToAnalysis}
					variant="outline"
					className="gap-2 border-zinc-200 font-bold text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
				>
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
		<Card className="border-zinc-200 shadow-sm dark:border-zinc-800">
			<CardContent className="flex flex-col items-center py-12 text-center">
				<div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
					<CheckCircle2 className="h-8 w-8 text-zinc-400 dark:text-zinc-500" />
				</div>
				<h3 className="mb-2 text-lg font-bold text-zinc-900 dark:text-zinc-100">
					¡Excelente! Sin problemas detectados
				</h3>
				<p className="mb-6 max-w-xs text-sm font-medium text-zinc-500 dark:text-zinc-400">
					El sitio web cumple con los estándares. Genera un mensaje de
					felicitación y servicios adicionales.
				</p>
				<Button
					onClick={onGenerate}
					disabled={isGenerating}
					className="bg-zinc-900 font-bold text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
				>
					{isGenerating ? 'Generando...' : 'Generar mensaje de felicitación'}
				</Button>
			</CardContent>
		</Card>
	)
}
