import { useQuery } from '@apollo/client/react'
import { GET_ALL_TAGS } from '../graphql/queries'
import type { Tag } from '../types'

interface AllTagsResponse {
	tags: {
		data: Tag[]
	}
}

/**
 * Hook to fetch all tags for multiselect component
 */
export function useAllTags() {
	const { data, loading, error, refetch } = useQuery<AllTagsResponse>(
		GET_ALL_TAGS,
		{
			fetchPolicy: 'cache-and-network',
		}
	)

	const tags = data?.tags.data ?? []

	// Sort alphabetically by name
	const sortedTags = [...tags].sort((a, b) =>
		a.name.localeCompare(b.name, 'es', { sensitivity: 'base' })
	)

	return {
		tags: sortedTags,
		loading,
		error,
		refetch,
	}
}

