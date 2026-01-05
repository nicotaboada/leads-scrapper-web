'use client'

/**
 * Website SEO Empty State Component
 *
 * Displayed when no analysis has been performed yet
 */

import { Globe, Loader2 } from 'lucide-react'
import { Button } from 'components/ui/button'
import { Card, CardContent } from 'components/ui/card'

interface WebsiteSeoEmptyStateProps {
	hasWebsite: boolean
	onRunAnalysis: () => void
	isAnalyzing: boolean
}

export function WebsiteSeoEmptyState({
	hasWebsite,
	onRunAnalysis,
	isAnalyzing,
}: WebsiteSeoEmptyStateProps) {
	if (!hasWebsite) {
		return (
			<Card className="border-zinc-200 shadow-sm dark:border-zinc-800">
				<CardContent className="flex flex-col items-center justify-center py-12">
					<div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
						<Globe className="h-8 w-8 text-zinc-400 dark:text-zinc-500" />
					</div>
					<h3 className="mb-2 text-lg font-bold text-zinc-900 dark:text-zinc-100">
						Sin sitio web registrado
					</h3>
					<p className="max-w-xs text-center text-sm leading-relaxed font-medium text-zinc-500 dark:text-zinc-400">
						Esta empresa no tiene un sitio web registrado. Agrega uno en el
						perfil para poder realizar el análisis.
					</p>
				</CardContent>
			</Card>
		)
	}

	return (
		<Card className="border-zinc-200 shadow-sm dark:border-zinc-800">
			<CardContent className="flex flex-col items-center justify-center py-12">
				<div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
					<Globe className="h-8 w-8 text-zinc-400 dark:text-zinc-500" />
				</div>
				<h3 className="mb-2 text-lg font-bold text-zinc-900 dark:text-zinc-100">
					Sin análisis realizado
				</h3>
				<p className="mb-6 max-w-xs text-center text-sm leading-relaxed font-medium text-zinc-500 dark:text-zinc-400">
					Ejecuta un análisis estratégico para evaluar la calidad del sitio web
					y su posicionamiento en Google.
				</p>
				<Button
					onClick={onRunAnalysis}
					disabled={isAnalyzing}
					className="h-10 bg-zinc-900 px-6 font-bold text-zinc-50 shadow-sm hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
				>
					{isAnalyzing ? (
						<>
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							Analizando...
						</>
					) : (
						<>
							<Globe className="mr-2 h-4 w-4" />
							Ejecutar Análisis Estratégico
						</>
					)}
				</Button>
			</CardContent>
		</Card>
	)
}
