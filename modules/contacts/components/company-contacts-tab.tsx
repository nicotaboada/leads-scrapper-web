'use client'

/**
 * Company Contacts Tab Component
 *
 * Tab content that displays a paginated table of employees
 * associated with a company. Wrapped in a Card for HubSpot-style layout.
 */

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from 'components/ui/button'
import { Card } from 'components/ui/card'
import { useCompanyEmployees } from '../hooks/use-company-employees'
import { CompanyContactsTable } from './company-contacts-table'

interface CompanyContactsTabProps {
	companyId: string
}

const PAGE_SIZE = 10

export function CompanyContactsTab({ companyId }: CompanyContactsTabProps) {
	const [page, setPage] = useState(1)
	const { employees, meta, loading, error } = useCompanyEmployees({
		companyId,
		page,
		limit: PAGE_SIZE,
	})

	if (error) {
		return (
			<Card className="border-red-200 bg-red-50 p-6 dark:border-red-800 dark:bg-red-950/30">
				<h3 className="text-lg font-semibold text-red-900 dark:text-red-100">
					Error al cargar los contactos
				</h3>
				<p className="mt-2 text-sm text-red-700 dark:text-red-300">
					{error.message ||
						'No se pudieron cargar los contactos. Intenta de nuevo.'}
				</p>
			</Card>
		)
	}

	const startIndex = meta ? (meta.page - 1) * meta.limit + 1 : 0
	const endIndex = meta ? Math.min(meta.page * meta.limit, meta.total) : 0

	return (
		<Card className="p-6">
			<div className="space-y-4">
				<CompanyContactsTable employees={employees} isLoading={loading} />

				{/* Pagination */}
				{meta && meta.total > 0 && (
					<div className="flex items-center justify-between">
						<p className="text-muted-foreground text-sm">
							Showing {startIndex}-{endIndex} of {meta.total} entries
						</p>
						<div className="flex items-center gap-2">
							<Button
								variant="outline"
								size="sm"
								onClick={() => setPage((p) => Math.max(1, p - 1))}
								disabled={!meta.hasPreviousPage || loading}
							>
								<ChevronLeft className="size-4" />
							</Button>
							<span className="text-muted-foreground text-sm">
								Page {meta.page} of {meta.totalPages}
							</span>
							<Button
								variant="outline"
								size="sm"
								onClick={() => setPage((p) => p + 1)}
								disabled={!meta.hasNextPage || loading}
							>
								<ChevronRight className="size-4" />
							</Button>
						</div>
					</div>
				)}
			</div>
		</Card>
	)
}

