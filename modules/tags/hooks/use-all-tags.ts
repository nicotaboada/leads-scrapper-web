import { useQuery } from '@apollo/client/react'
import { GET_ALL_TAGS } from '../graphql/queries'
import type { Tag } from '../types'

interface AllTagsResponse {
	tags: {
		data: Tag[]
	}
}

interface UseAllTagsOptions {
	/**
	 * Skip the query execution (useful when tags are provided externally)
	 */
	skip?: boolean
}

/**
 * Hook to fetch all tags for multiselect component
 */
export function useAllTags(options: UseAllTagsOptions = {}) {
	const { skip = false } = options
	const { data, loading, error, refetch } = useQuery<AllTagsResponse>(
		GET_ALL_TAGS,
		{
			fetchPolicy: 'cache-and-network',
			skip,
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
