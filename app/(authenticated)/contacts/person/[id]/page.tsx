'use client'

/**
 * Person Contact Detail Page
 *
 * HubSpot-style layout with:
 * - Left sidebar: Avatar, action buttons, contact info
 * - Right content area: Tabbed navigation (Overview, etc.)
 */

import { useQuery } from '@apollo/client/react'
import { User } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { HubSpotTabs } from '@/components/common/hubspot-tabs'
import { DetailHeader } from 'components/layouts/detail-header'
import { Skeleton } from 'components/ui/skeleton'
import { ROUTES } from 'lib/config/routes'
import { ActivitiesTab } from 'modules/contacts/components/activities-tab'
import {
	ContactSidebar,
	ContactSidebarSkeleton,
} from 'modules/contacts/components/contact-sidebar'
import { DeleteContactDialog } from 'modules/contacts/components/delete-contact-dialog'
import { EditContactSheet } from 'modules/contacts/components/edit-contact-sheet'
import { PersonOverviewTab } from 'modules/contacts/components/person-overview-tab'
import { GET_CONTACT } from 'modules/contacts/graphql/queries'
import {
	type ContactResponse,
	isPersonContact,
	type PersonContact,
} from 'modules/contacts/types'

/**
 * Person contact detail page with HubSpot-style layout
 */
export default function PersonDetailPage() {
	const params = useParams()
	const router = useRouter()
	const contactId = params.id as string

	// State for edit/delete dialogs
	const [isEditOpen, setIsEditOpen] = useState(false)
	const [isDeleteOpen, setIsDeleteOpen] = useState(false)

	const { data, loading, error, refetch } = useQuery<ContactResponse>(
		GET_CONTACT,
		{
			variables: { id: contactId },
		}
	)

	const contact = data?.contact

	// Handle successful contact update
	function handleContactUpdated() {
		refetch()
	}

	// Handle successful contact deletion
	function handleContactDeleted() {
		router.push(ROUTES.CONTACTS)
	}

	// Handle follow-up changes
	function handleFollowUpChanged() {
		refetch()
	}

	// Handle lead changes
	function handleLeadChanged() {
		refetch()
	}

	// Handle errors
	if (error) {
		return (
			<div className="space-y-6">
				<DetailHeader
					breadcrumbItems={[
						{
							label: 'Contactos',
							href: ROUTES.CONTACTS,
						},
						{
							icon: User,
							label: 'Error',
						},
					]}
				/>
				<div className="rounded-lg border border-red-200 bg-red-50 p-6 dark:border-red-800 dark:bg-red-950/30">
					<h2 className="text-lg font-semibold text-red-900 dark:text-red-100">
						Error al cargar el contacto
					</h2>
					<p className="mt-2 text-sm text-red-700 dark:text-red-300">
						{error.message ||
							'No se pudo cargar el contacto. Intenta de nuevo.'}
					</p>
				</div>
			</div>
		)
	}

	// Handle not found or wrong type
	if (!loading && (!contact || !isPersonContact(contact))) {
		return (
			<div className="space-y-6">
				<DetailHeader
					breadcrumbItems={[
						{
							label: 'Contactos',
							href: ROUTES.CONTACTS,
						},
						{
							icon: User,
							label: 'No encontrado',
						},
					]}
				/>
				<div className="rounded-lg border border-dashed p-12 text-center">
					<h2 className="text-lg font-semibold">Contacto no encontrado</h2>
					<p className="text-muted-foreground mt-2 text-sm">
						El contacto que buscas no existe o ha sido eliminado.
					</p>
				</div>
			</div>
		)
	}

	const personContact = contact as PersonContact | undefined
	const contactName = personContact
		? `${personContact.firstName} ${personContact.lastName}`
		: 'Cargando...'

	return (
		<div className="space-y-6">
			{/* Breadcrumb Header */}
			<DetailHeader
				breadcrumbItems={[
					{
						label: 'Contactos',
						href: ROUTES.CONTACTS,
					},
					{
						icon: User,
						label: loading ? 'Cargando...' : contactName,
					},
				]}
			/>

			{/* Main Content: Sidebar + Tabs */}
			<div className="flex flex-col gap-6 lg:flex-row">
				{/* Left Sidebar */}
				{loading ? (
					<ContactSidebarSkeleton />
				) : (
					personContact && (
						<ContactSidebar
							contact={personContact}
							onEdit={() => setIsEditOpen(true)}
							onDelete={() => setIsDeleteOpen(true)}
							onFollowUpChanged={handleFollowUpChanged}
							onLeadChanged={handleLeadChanged}
						/>
					)
				)}

				{/* Right Content Area with HubSpot-style Tabs */}
				<div className="flex-1">
					{loading ? (
						<div className="space-y-6">
							{/* Tab skeleton */}
							<div className="flex gap-4 border-b pb-3">
								<Skeleton className="h-6 w-20" />
								<Skeleton className="h-6 w-24" />
							</div>
							{/* Content skeleton */}
							<div className="bg-card rounded-lg border p-6">
								<div className="flex flex-col items-center py-12">
									<Skeleton className="mb-4 size-16 rounded-full" />
									<Skeleton className="mb-2 h-6 w-48" />
									<Skeleton className="h-4 w-64" />
								</div>
							</div>
						</div>
					) : (
						personContact && (
							<HubSpotTabs
								defaultValue="overview"
								tabs={[
									{
										value: 'overview',
										label: 'Overview',
										content: (
											<PersonOverviewTab
												contact={personContact}
												onFollowUpChanged={handleFollowUpChanged}
											/>
										),
									},
									{
										value: 'activities',
										label: 'Activities',
										content: (
											<ActivitiesTab
												contactId={personContact.id}
												contactName={contactName}
											/>
										),
									},
								]}
							/>
						)
					)}
				</div>
			</div>

			{/* Edit Contact Sheet */}
			{personContact && (
				<EditContactSheet
					open={isEditOpen}
					onOpenChange={setIsEditOpen}
					contact={personContact}
					onContactUpdated={handleContactUpdated}
				/>
			)}

			{/* Delete Contact Dialog */}
			{personContact && (
				<DeleteContactDialog
					open={isDeleteOpen}
					onOpenChange={setIsDeleteOpen}
					contact={personContact}
					onContactDeleted={handleContactDeleted}
				/>
			)}
		</div>
	)
}
