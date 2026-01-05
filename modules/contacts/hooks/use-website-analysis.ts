/**
 * Hook for fetching website analysis data
 */

import { useQuery } from '@apollo/client/react'
import { GET_WEBSITE_ANALYSIS } from '../graphql/website-analysis-queries'
import type { WebsiteAnalysisResponse } from '../types/website-analysis'

interface UseWebsiteAnalysisOptions {
	contactId: string
	skip?: boolean
}

export function useWebsiteAnalysis({
	contactId,
	skip,
}: UseWebsiteAnalysisOptions) {
	const { data, loading, error, refetch } = useQuery<WebsiteAnalysisResponse>(
		GET_WEBSITE_ANALYSIS,
		{
			variables: { contactId },
			skip: skip || !contactId,
			fetchPolicy: 'cache-first',
		}
	)

	return {
		analysis: data?.contactAnalysis ?? null,
		isLoading: loading,
		error,
		refetch,
	}
}
