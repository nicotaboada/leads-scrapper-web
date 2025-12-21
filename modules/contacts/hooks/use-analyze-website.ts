/**
 * Hook for triggering website analysis mutation
 */

import { useMutation } from '@apollo/client/react'
import { toast } from 'sonner'
import { ANALYZE_CONTACT_WEBSITE } from '../graphql/website-analysis-mutations'
import { GET_WEBSITE_ANALYSIS } from '../graphql/website-analysis-queries'
import type { AnalyzeWebsiteMutationResponse } from '../types/website-analysis'

interface UseAnalyzeWebsiteOptions {
	contactId: string
	onSuccess?: () => void
}

export function useAnalyzeWebsite({ contactId, onSuccess }: UseAnalyzeWebsiteOptions) {
	const [analyzeWebsite, { loading }] = useMutation<AnalyzeWebsiteMutationResponse>(
		ANALYZE_CONTACT_WEBSITE,
		{
			variables: { contactId },
			refetchQueries: [
				{
					query: GET_WEBSITE_ANALYSIS,
					variables: { contactId },
				},
			],
			onCompleted: (data) => {
				const score = data.analyzeContactWebsite.overallScore
				toast.success(`Análisis completado`, {
					description: `Score general: ${score}/100`,
				})
				onSuccess?.()
			},
			onError: (error) => {
				toast.error('Error al analizar el sitio web', {
					description: error.message,
				})
			},
		}
	)

	const runAnalysis = () => {
		toast.info('Analizando sitio web...', {
			description: 'Esto puede tomar unos segundos',
		})
		analyzeWebsite()
	}

	return {
		runAnalysis,
		isAnalyzing: loading,
	}
}

