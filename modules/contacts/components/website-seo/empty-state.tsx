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
			<Card>
				<CardContent className="flex flex-col items-center justify-center py-12">
					<div className="bg-muted mb-4 rounded-full p-4">
						<Globe className="text-muted-foreground h-8 w-8" />
					</div>
					<h3 className="mb-2 text-lg font-semibold">Sin sitio web registrado</h3>
					<p className="text-muted-foreground max-w-sm text-center text-sm">
						Esta empresa no tiene un sitio web registrado. Agrega uno para poder
						realizar el análisis.
					</p>
				</CardContent>
			</Card>
		)
	}

	return (
		<Card>
			<CardContent className="flex flex-col items-center justify-center py-12">
				<div className="bg-muted mb-4 rounded-full p-4">
					<Globe className="text-muted-foreground h-8 w-8" />
				</div>
				<h3 className="mb-2 text-lg font-semibold">Sin análisis realizado</h3>
				<p className="text-muted-foreground mb-6 max-w-sm text-center text-sm">
					Ejecuta un análisis para evaluar la calidad del sitio web y su
					posicionamiento SEO.
				</p>
				<Button onClick={onRunAnalysis} disabled={isAnalyzing}>
					{isAnalyzing ? (
						<>
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							Analizando...
						</>
					) : (
						<>
							<Globe className="mr-2 h-4 w-4" />
							Ejecutar Análisis
						</>
					)}
				</Button>
			</CardContent>
		</Card>
	)
}

