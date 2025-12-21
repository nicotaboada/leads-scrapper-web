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
		<div className="overflow-hidden rounded-md border">
			<Table>
				<TableHeader>
					<TableRow className="bg-slate-800 hover:bg-slate-800">
						<TableHead className="font-semibold text-white">NAME</TableHead>
						<TableHead className="font-semibold text-white">
							JOB TITLE
						</TableHead>
						<TableHead className="font-semibold text-white">
							EMAIL ADDRESS
						</TableHead>
						<TableHead className="font-semibold text-white">MOBILE</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{employees.map((employee) => (
						<TableRow key={employee.id} className="hover:bg-muted/50">
							<TableCell>
								<Link
									href={ROUTES.CONTACT_PERSON_DETAIL(employee.id)}
									className="font-medium text-blue-600 hover:underline"
								>
									{employee.firstName} {employee.lastName}
								</Link>
							</TableCell>
							<TableCell className="text-muted-foreground">
								{employee.jobTitle || '-'}
							</TableCell>
							<TableCell className="text-muted-foreground">
								{employee.email || '-'}
							</TableCell>
							<TableCell className="text-muted-foreground">
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
		<div className="overflow-hidden rounded-md border">
			<Table>
				<TableHeader>
					<TableRow className="bg-slate-800 hover:bg-slate-800">
						<TableHead className="font-semibold text-white">NAME</TableHead>
						<TableHead className="font-semibold text-white">
							JOB TITLE
						</TableHead>
						<TableHead className="font-semibold text-white">
							EMAIL ADDRESS
						</TableHead>
						<TableHead className="font-semibold text-white">MOBILE</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{Array.from({ length: 5 }).map((_, index) => (
						<TableRow key={index}>
							<TableCell>
								<Skeleton className="h-4 w-32" />
							</TableCell>
							<TableCell>
								<Skeleton className="h-4 w-24" />
							</TableCell>
							<TableCell>
								<Skeleton className="h-4 w-40" />
							</TableCell>
							<TableCell>
								<Skeleton className="h-4 w-28" />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}
