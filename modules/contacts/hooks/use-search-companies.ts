'use client'

/**
 * Hook for searching companies
 */

import { useQuery } from '@apollo/client/react'
import { useMemo } from 'react'
import { useDebounce } from 'hooks/use-debounce'
import { GET_CONTACTS } from '../graphql/queries'
import { type CompanyContact, ContactType } from '../types'

interface UseSearchCompaniesProps {
	search: string
	enabled?: boolean
}

interface UseSearchCompaniesReturn {
	companies: CompanyContact[]
	loading: boolean
}

/**
 * Hook to search for companies with debounce
 */
export function useSearchCompanies({
	search,
	enabled = true,
}: UseSearchCompaniesProps): UseSearchCompaniesReturn {
	const debouncedSearch = useDebounce(search, 10)

	const { data, loading } = useQuery(GET_CONTACTS, {
		variables: {
			filter: {
				type: ContactType.COMPANY,
				search: debouncedSearch || undefined,
				limit: 10,
			},
		},
		skip: !enabled,
		fetchPolicy: 'cache-and-network',
	})

	const companies = useMemo(() => {
		if (!data?.contacts?.data) return []
		return data.contacts.data as CompanyContact[]
	}, [data])

	return {
		companies,
		loading,
	}
}

