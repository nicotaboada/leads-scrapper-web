'use client'

/**
 * Contacts Table Component
 *
 * Displays a paginated table of contacts (both Person and Company types)
 * with different avatars and navigation based on contact type.
 */

import { Building2, MapPin, Users } from 'lucide-react'
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

	function handleEdit(contact: Contact) {
		if (isPersonContact(contact)) {
			setEditingPerson(contact as PersonContact)
		} else if (isCompanyContact(contact)) {
			setEditingCompany(contact as CompanyContact)
		}
	}

	function handleDelete(contact: Contact) {
		setDeletingContact(contact)
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
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[280px] pl-6">Contacto</TableHead>
							<TableHead className="w-[200px]">Ciudad</TableHead>
							<TableHead className="w-[160px]">Estado</TableHead>
							<TableHead className="w-[70px] pr-6"></TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{loading ? (
							<TableSkeletonRows rows={5} columns={skeletonTableColumns} />
						) : (
							contacts.map((contact) => (
								<TableRow key={contact.id}>
									<TableCell className="max-w-0 pl-6">
										<div className="flex items-center gap-3 overflow-hidden">
											<Avatar className="shrink-0">
												<AvatarFallback
													className={
														contact.type === ContactType.COMPANY
															? 'bg-blue-100 text-blue-700'
															: 'bg-gray-100 text-gray-700'
													}
												>
													{isPersonContact(contact) ? (
														getPersonInitials(contact)
													) : (
														<Building2 className="h-5 w-5" />
													)}
												</AvatarFallback>
											</Avatar>
											<Link
												href={getDetailRoute(contact)}
												className="cursor-pointer truncate font-medium hover:underline"
											>
												{getContactName(contact)}
											</Link>
											<FollowUpBadge followUp={contact.followUp} />
										</div>
									</TableCell>
									<TableCell className="max-w-0">
										<div className="flex items-center gap-2 overflow-hidden text-sm">
											<span className="text-muted-foreground truncate">
												{isCompanyContact(contact) ? contact.city || '-' : '-'}
											</span>
										</div>
									</TableCell>
									<TableCell>
										<LeadStatusBadge status={contact.leadStatus} />
									</TableCell>
									<TableCell className="pr-6">
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

			{/* Delete Contact Dialog */}
			{deletingContact && (
				<DeleteContactDialog
					open={!!deletingContact}
					onOpenChange={(open) => !open && setDeletingContact(null)}
					contact={deletingContact}
					onContactDeleted={handleContactDeleted}
				/>
			)}
		</div>
	)
}
