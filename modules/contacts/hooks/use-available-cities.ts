import { useQuery } from '@apollo/client/react'
import { GET_AVAILABLE_CITIES } from '../graphql/queries'

interface AvailableCitiesResponse {
	availableCities: string[]
}

/**
 * Hook to fetch all available cities for filter component
 * Uses cache-first policy to avoid repeated server calls
 */
export function useAvailableCities() {
	const { data, loading, error, refetch } = useQuery<AvailableCitiesResponse>(
		GET_AVAILABLE_CITIES,
		{
			fetchPolicy: 'cache-first',
		}
	)

	const cities = data?.availableCities ?? []

	return {
		cities,
		loading,
		error,
		refetch,
	}
}

