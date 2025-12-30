'use client'

/**
 * Company Contacts Tab Component
 *
 * Tab content that displays a paginated table of employees
 * associated with a company. Wrapped in a Card for HubSpot-style layout.
 */

import { motion } from 'motion/react'
import { useState } from 'react'
import { Card } from 'components/ui/card'
import { TablePagination } from 'components/common/table-pagination'
import { useCompanyEmployees } from '../hooks/use-company-employees'
import { CompanyContactsTable } from './company-contacts-table'

interface CompanyContactsTabProps {
	companyId: string
}

const PAGE_SIZE = 10

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
}

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.4,
		},
	},
}

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

	return (
		<motion.div
			variants={containerVariants}
			initial="hidden"
			animate="visible"
		>
			<Card className="p-6 border-zinc-200 shadow-sm dark:border-zinc-800">
				<div className="space-y-6">
					<motion.div variants={itemVariants}>
						<CompanyContactsTable employees={employees} isLoading={loading} />
					</motion.div>

					{/* Pagination */}
					{meta && meta.total > 0 && (
						<motion.div variants={itemVariants}>
							<TablePagination
								currentPage={meta.page}
								totalPages={meta.totalPages}
								totalItems={meta.total}
								startIndex={(meta.page - 1) * meta.limit + 1}
								onPreviousPage={() => setPage((p) => Math.max(1, p - 1))}
								onNextPage={() => setPage((p) => p + 1)}
								hasNextPage={meta.hasNextPage}
								hasPreviousPage={meta.hasPreviousPage}
							/>
						</motion.div>
					)}
				</div>
			</Card>
		</motion.div>
	)
}

