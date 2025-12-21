/**
 * Hook for fetching company employees with pagination
 */

import { useQuery } from '@apollo/client/react'
import type { PaginationMeta } from 'types/pagination'
import { GET_COMPANY_EMPLOYEES } from '../graphql/queries'
import type { PersonContact } from '../types'

interface CompanyEmployeesResponse {
	companyEmployees: {
		data: PersonContact[]
		meta: PaginationMeta
	}
}

interface CompanyEmployeesFilterInput {
	companyId: string
	page?: number
	limit?: number
}

interface UseCompanyEmployeesParams {
	companyId: string
	page?: number
	limit?: number
}

/**
 * Hook to fetch paginated employees of a company
 *
 * @param params - Parameters including companyId and pagination options
 * @returns Query result with employees data, loading state, and pagination meta
 */
export function useCompanyEmployees({
	companyId,
	page = 1,
	limit = 10,
}: UseCompanyEmployeesParams) {
	const { data, loading, error, refetch } = useQuery<CompanyEmployeesResponse>(
		GET_COMPANY_EMPLOYEES,
		{
			variables: {
				filter: {
					companyId,
					page,
					limit,
				} satisfies CompanyEmployeesFilterInput,
			},
			skip: !companyId,
		}
	)

	return {
		employees: data?.companyEmployees.data ?? [],
		meta: data?.companyEmployees.meta,
		loading,
		error,
		refetch,
	}
}
