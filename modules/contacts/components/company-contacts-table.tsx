'use client'

/**
 * Company Contacts Table Component
 *
 * Displays a table of employees (Person contacts) associated with a company.
 * Shows Name, Job Title, Email Address, and Mobile columns.
 */

import Link from 'next/link'
import { Skeleton } from 'components/ui/skeleton'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from 'components/ui/table'
import { ROUTES } from 'lib/config/routes'
import type { PersonContact } from '../types'

interface CompanyContactsTableProps {
	employees: PersonContact[]
	isLoading?: boolean
}

export function CompanyContactsTable({
	employees,
	isLoading = false,
}: CompanyContactsTableProps) {
	if (isLoading) {
		return <CompanyContactsTableSkeleton />
	}

	if (employees.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center py-12 text-center">
				<p className="text-muted-foreground text-sm">
					No hay contactos asociados a esta empresa.
				</p>
			</div>
		)
	}

	return (
		<div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
			<Table>
				<TableHeader className="bg-zinc-50/50 dark:bg-zinc-900/50">
					<TableRow className="border-zinc-200 hover:bg-transparent dark:border-zinc-800">
						<TableHead className="pl-6 font-semibold text-zinc-900 dark:text-zinc-100">
							Nombre
						</TableHead>
						<TableHead className="font-semibold text-zinc-900 dark:text-zinc-100">
							Cargo
						</TableHead>
						<TableHead className="font-semibold text-zinc-900 dark:text-zinc-100">
							Email
						</TableHead>
						<TableHead className="pr-6 font-semibold text-zinc-900 dark:text-zinc-100">
							Móvil
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{employees.map((employee) => (
						<TableRow
							key={employee.id}
							className="group border-zinc-200 transition-colors dark:border-zinc-800"
						>
							<TableCell className="py-4 pl-6">
								<Link
									href={ROUTES.CONTACT_PERSON_DETAIL(employee.id)}
									className="font-medium text-zinc-900 decoration-zinc-400 underline-offset-4 transition-colors hover:underline dark:text-zinc-100"
								>
									{employee.firstName} {employee.lastName}
								</Link>
							</TableCell>
							<TableCell className="py-4 text-zinc-500 dark:text-zinc-400">
								{employee.jobTitle || '-'}
							</TableCell>
							<TableCell className="py-4 text-zinc-500 dark:text-zinc-400">
								{employee.email || '-'}
							</TableCell>
							<TableCell className="py-4 pr-6 text-zinc-500 dark:text-zinc-400">
								{employee.celular || '-'}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}

export function CompanyContactsTableSkeleton() {
	return (
		<div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
			<Table>
				<TableHeader className="bg-zinc-50/50 dark:bg-zinc-900/50">
					<TableRow className="border-zinc-200 hover:bg-transparent dark:border-zinc-800">
						<TableHead className="pl-6 font-semibold text-zinc-900 dark:text-zinc-100">
							Nombre
						</TableHead>
						<TableHead className="font-semibold text-zinc-900 dark:text-zinc-100">
							Cargo
						</TableHead>
						<TableHead className="font-semibold text-zinc-900 dark:text-zinc-100">
							Email
						</TableHead>
						<TableHead className="pr-6 font-semibold text-zinc-900 dark:text-zinc-100">
							Móvil
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{Array.from({ length: 5 }).map((_, index) => (
						<TableRow
							key={index}
							className="border-zinc-200 dark:border-zinc-800"
						>
							<TableCell className="py-4 pl-6">
								<Skeleton className="h-4 w-32" />
							</TableCell>
							<TableCell className="py-4">
								<Skeleton className="h-4 w-24" />
							</TableCell>
							<TableCell className="py-4">
								<Skeleton className="h-4 w-40" />
							</TableCell>
							<TableCell className="py-4 pr-6">
								<Skeleton className="h-4 w-28" />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}
