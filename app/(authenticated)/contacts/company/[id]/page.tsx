'use client'

/**
 * Company Contact Detail Page
 *
 * HubSpot-style layout with:
 * - Left sidebar: Avatar, action buttons, company info
 * - Right content area: Tabbed navigation (Overview, Contacts)
 */

import { useQuery } from '@apollo/client/react'
import { Building2, Sparkles } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useState, useCallback } from 'react'
import { DetailHeader } from 'components/layouts/detail-header'
import { HubSpotTabs } from '@/components/common/hubspot-tabs'
import { Skeleton } from 'components/ui/skeleton'
import { ROUTES } from 'lib/config/routes'
import { ActivitiesTab } from 'modules/contacts/components/activities-tab'
import { AiMessageGeneratorTab } from 'modules/contacts/components/ai-messages'
import { CompanyContactsTab } from 'modules/contacts/components/company-contacts-tab'
import { CompanyOverviewTab } from 'modules/contacts/components/company-overview-tab'
import { WebsiteSeoTab } from 'modules/contacts/components/website-seo'
import {
	CompanySidebar,
	CompanySidebarSkeleton,
} from 'modules/contacts/components/company-sidebar'
import { DeleteContactDialog } from 'modules/contacts/components/delete-contact-dialog'
import { EditCompanySheet } from 'modules/contacts/components/edit-company-sheet'
import { GET_CONTACT } from 'modules/contacts/graphql/queries'
import {
	type CompanyContact,
	type ContactResponse,
	isCompanyContact,
} from 'modules/contacts/types'

/**
 * Company contact detail page with HubSpot-style layout
 */
export default function CompanyDetailPage() {
	const params = useParams()
	const router = useRouter()
	const contactId = params.id as string

	// State for edit/delete dialogs
	const [isEditOpen, setIsEditOpen] = useState(false)
	const [isDeleteOpen, setIsDeleteOpen] = useState(false)
	const [activeTab, setActiveTab] = useState('overview')

	// Handle tab navigation from child components
	const handleNavigateToTab = useCallback((tabValue: string) => {
		setActiveTab(tabValue)
	}, [])

	const { data, loading, error, refetch } = useQuery<ContactResponse>(
		GET_CONTACT,
		{
			variables: { id: contactId },
		}
	)

	const contact = data?.contact

	// Handle successful company update
	function handleCompanyUpdated() {
		refetch()
	}

	// Handle successful company deletion
	function handleCompanyDeleted() {
		router.push(ROUTES.CONTACTS)
	}

	// Handle follow-up changes
	function handleFollowUpChanged() {
		refetch()
	}

	// Handle errors
	if (error) {
		return (
			<div className="space-y-6">
				<DetailHeader
					breadcrumbItems={[
						{
							icon: Building2,
							label: 'Contactos',
							href: ROUTES.CONTACTS,
						},
						{
							label: 'Error',
						},
					]}
				/>
				<div className="rounded-lg border border-red-200 bg-red-50 p-6 dark:border-red-800 dark:bg-red-950/30">
					<h2 className="text-lg font-semibold text-red-900 dark:text-red-100">
						Error al cargar la empresa
					</h2>
					<p className="mt-2 text-sm text-red-700 dark:text-red-300">
						{error.message || 'No se pudo cargar la empresa. Intenta de nuevo.'}
					</p>
				</div>
			</div>
		)
	}

	// Handle not found or wrong type
	if (!loading && (!contact || !isCompanyContact(contact))) {
		return (
			<div className="space-y-6">
				<DetailHeader
					breadcrumbItems={[
						{
							icon: Building2,
							label: 'Contactos',
							href: ROUTES.CONTACTS,
						},
						{
							label: 'No encontrado',
						},
					]}
				/>
				<div className="rounded-lg border border-dashed p-12 text-center">
					<h2 className="text-lg font-semibold">Empresa no encontrada</h2>
					<p className="text-muted-foreground mt-2 text-sm">
						La empresa que buscas no existe o ha sido eliminada.
					</p>
				</div>
			</div>
		)
	}

	const companyContact = contact as CompanyContact | undefined
	const companyName = companyContact?.companyName || 'Cargando...'

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
						icon: Building2,
						label: loading ? 'Cargando...' : companyName,
					},
				]}
			/>

			{/* Main Content: Sidebar + Tabs */}
			<div className="flex flex-col gap-6 lg:flex-row">
				{/* Left Sidebar */}
				{loading ? (
					<CompanySidebarSkeleton />
				) : (
					companyContact && (
						<CompanySidebar
							contact={companyContact}
							onEdit={() => setIsEditOpen(true)}
							onDelete={() => setIsDeleteOpen(true)}
							onFollowUpChanged={handleFollowUpChanged}
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
						companyContact && (
							<HubSpotTabs
								value={activeTab}
								onValueChange={setActiveTab}
								tabs={[
									{
										value: 'overview',
										label: 'Overview',
										content: (
											<CompanyOverviewTab
												contact={companyContact}
												onFollowUpChanged={handleFollowUpChanged}
												onNavigateToTab={handleNavigateToTab}
											/>
										),
									},
									{
										value: 'ai-messages',
										label: 'Mensajes IA',
										content: (
											<AiMessageGeneratorTab
												contact={companyContact}
												onNavigateToTab={handleNavigateToTab}
											/>
										),
									},
									{
										value: 'contacts',
										label: 'Contacts',
										content: (
											<CompanyContactsTab companyId={companyContact.id} />
										),
									},
									{
										value: 'activities',
										label: 'Activities',
										content: (
											<ActivitiesTab
												contactId={companyContact.id}
												contactName={companyName}
											/>
										),
									},
									{
										value: 'website-seo',
										label: 'Website & SEO',
										content: <WebsiteSeoTab contact={companyContact} />,
									},
								]}
							/>
						)
					)}
				</div>
			</div>

			{/* Edit Company Sheet */}
			{companyContact && (
				<EditCompanySheet
					open={isEditOpen}
					onOpenChange={setIsEditOpen}
					company={companyContact}
					onCompanyUpdated={handleCompanyUpdated}
				/>
			)}

			{/* Delete Company Dialog */}
			{companyContact && (
				<DeleteContactDialog
					open={isDeleteOpen}
					onOpenChange={setIsDeleteOpen}
					contact={companyContact}
					onContactDeleted={handleCompanyDeleted}
				/>
			)}
		</div>
	)
}
