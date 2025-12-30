'use client'

/**
 * Contacts Table Component
 *
 * Displays a paginated table of contacts (both Person and Company types)
 * with different avatars and navigation based on contact type.
 */

import { Building2, MapPin, Users } from 'lucide-react'
import { cn } from 'lib/utils/merge'
import Link from 'next/link'
import { useState } from 'react'
import { TableEmptyState } from 'components/common/table-empty-state'
import { TablePagination } from 'components/common/table-pagination'
import { TableSkeletonRows } from 'components/common/table-skeleton-rows'
import { Avatar, AvatarFallback } from 'components/ui/avatar'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from 'components/ui/table'
import { ROUTES } from 'lib/config/routes'
import type { PaginationMeta } from 'types/pagination'
import { ContactActionsMenu } from './contact-actions-menu'
import { DeleteContactDialog } from './delete-contact-dialog'
import { EditCompanySheet } from './edit-company-sheet'
import { EditContactSheet } from './edit-contact-sheet'
import { FollowUpBadge } from './follow-up-badge'
import { LeadStatusBadge } from './lead-status-badge'
import {
	type CompanyContact,
	type Contact,
	ContactType,
	getContactName,
	getPersonInitials,
	isCompanyContact,
	isPersonContact,
	type PersonContact,
} from '../types'

interface ContactsTableProps {
	contacts: Contact[]
	paginationMeta?: PaginationMeta
	onCreateContact?: () => void
	onNextPage?: () => void
	onPreviousPage?: () => void
	searchQuery?: string
	loading?: boolean
	onRefresh?: () => void
}

export function ContactsTable({
	contacts,
	paginationMeta,
	onCreateContact,
	onNextPage,
	onPreviousPage,
	searchQuery,
	loading,
	onRefresh,
}: ContactsTableProps) {
	// State for edit/delete modals
	const [editingPerson, setEditingPerson] = useState<PersonContact | null>(null)
	const [editingCompany, setEditingCompany] = useState<CompanyContact | null>(
		null
	)
	const [deletingContact, setDeletingContact] = useState<Contact | null>(null)
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

	function handleEdit(contact: Contact) {
		if (isPersonContact(contact)) {
			setEditingPerson(contact as PersonContact)
		} else if (isCompanyContact(contact)) {
			setEditingCompany(contact as CompanyContact)
		}
	}

	function handleDelete(contact: Contact) {
		setDeletingContact(contact)
		setIsDeleteDialogOpen(true)
	}

	function handleDeleteDialogOpenChange(open: boolean) {
		setIsDeleteDialogOpen(open)
		if (!open) {
			setTimeout(() => setDeletingContact(null), 150)
		}
	}

	function handleContactUpdated() {
		onRefresh?.()
	}

	function handleContactDeleted() {
		onRefresh?.()
	}

	if (!loading && contacts.length === 0 && searchQuery) {
		return (
			<TableEmptyState
				icon={Users}
				title="No hay resultados para la búsqueda"
			/>
		)
	}

	if (!loading && contacts.length === 0) {
		return (
			<TableEmptyState
				icon={Users}
				title="No hay contactos registrados"
				description="Crea tu primer contacto para comenzar a gestionar tu información de clientes y empresas."
				action={{
					label: 'Crear contacto',
					onClick: onCreateContact ?? (() => {}),
				}}
			/>
		)
	}

	const skeletonTableColumns = [
		{
			cellClassName: 'pl-6',
			items: [
				{
					width: '40px',
					height: 'h-10',
					className: 'rounded-full',
				},
				{ width: '180px', height: 'h-4' },
			],
		},
		{
			items: [{ width: '120px', height: 'h-4' }],
		},
		{
			items: [
				{
					width: '80px',
					height: 'h-6',
					className: 'rounded-md',
				},
			],
		},
		{
			cellClassName: 'pr-6',
			width: '32px',
			height: 'h-8',
		},
	]

	function getDetailRoute(contact: Contact): string {
		if (isPersonContact(contact)) {
			return ROUTES.CONTACT_PERSON_DETAIL(contact.id)
		}
		return ROUTES.CONTACT_COMPANY_DETAIL(contact.id)
	}

	return (
		<div className="w-full space-y-4">
			<div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
				<Table>
					<TableHeader className="bg-zinc-50/50 dark:bg-zinc-900/50">
						<TableRow className="border-zinc-200 hover:bg-transparent dark:border-zinc-800">
							<TableHead className="w-[280px] pl-6 font-semibold text-zinc-900 dark:text-zinc-100">
								Contacto
							</TableHead>
							<TableHead className="w-[200px] font-semibold text-zinc-900 dark:text-zinc-100">
								Ciudad
							</TableHead>
							<TableHead className="w-[160px] font-semibold text-zinc-900 dark:text-zinc-100">
								Estado
							</TableHead>
							<TableHead className="w-[70px] pr-6 font-semibold text-zinc-900 dark:text-zinc-100"></TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{loading ? (
							<TableSkeletonRows rows={5} columns={skeletonTableColumns} />
						) : (
							contacts.map((contact) => (
								<TableRow key={contact.id} className="group transition-colors">
									<TableCell className="max-w-0 pl-6">
										<div className="flex items-center gap-3 overflow-hidden">
											<Avatar className="h-9 w-9 shrink-0 border border-zinc-100 dark:border-zinc-800">
												<AvatarFallback
													className={cn(
														'text-[10px] font-bold',
														contact.type === ContactType.COMPANY
															? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'
															: 'bg-zinc-50 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400'
													)}
												>
													{isPersonContact(contact) ? (
														getPersonInitials(contact)
													) : (
														<Building2 className="h-4 w-4" />
													)}
												</AvatarFallback>
											</Avatar>
											<div className="flex min-w-0 items-center gap-2">
												<Link
													href={getDetailRoute(contact)}
													className="cursor-pointer truncate font-medium text-zinc-900 decoration-zinc-400 underline-offset-4 transition-colors hover:underline dark:text-zinc-100"
												>
													{getContactName(contact)}
												</Link>
												<FollowUpBadge followUp={contact.followUp} />
											</div>
										</div>
									</TableCell>
									<TableCell className="max-w-0">
										<div className="flex items-center gap-2 overflow-hidden">
											<span className="truncate text-sm text-zinc-500">
												{isCompanyContact(contact) ? contact.city || '-' : '-'}
											</span>
										</div>
									</TableCell>
									<TableCell>
										<LeadStatusBadge status={contact.leadStatus} />
									</TableCell>
									<TableCell className="pr-6 text-right">
										<ContactActionsMenu
											contact={contact}
											onEdit={handleEdit}
											onDelete={handleDelete}
										/>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>

			{/* Pagination Controls */}
			{paginationMeta && (
				<TablePagination
					currentPage={paginationMeta.page}
					totalPages={paginationMeta.totalPages}
					totalItems={paginationMeta.total}
					startIndex={(paginationMeta.page - 1) * paginationMeta.limit + 1}
					onPreviousPage={onPreviousPage || (() => {})}
					onNextPage={onNextPage || (() => {})}
					hasNextPage={paginationMeta.hasNextPage}
					hasPreviousPage={paginationMeta.hasPreviousPage}
				/>
			)}

			{/* Edit Person Sheet */}
			{editingPerson && (
				<EditContactSheet
					open={!!editingPerson}
					onOpenChange={(open) => !open && setEditingPerson(null)}
					contact={editingPerson}
					onContactUpdated={handleContactUpdated}
				/>
			)}

			{/* Edit Company Sheet */}
			{editingCompany && (
				<EditCompanySheet
					open={!!editingCompany}
					onOpenChange={(open) => !open && setEditingCompany(null)}
					company={editingCompany}
					onCompanyUpdated={handleContactUpdated}
				/>
			)}

			{/* Delete Contact Dialog - Always rendered to prevent portal cleanup issues */}
			<DeleteContactDialog
				open={isDeleteDialogOpen}
				onOpenChange={handleDeleteDialogOpenChange}
				contact={deletingContact}
				onContactDeleted={handleContactDeleted}
			/>
		</div>
	)
}
