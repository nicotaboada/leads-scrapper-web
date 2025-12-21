'use client'

import { PlusIcon } from 'lucide-react'
import { useState } from 'react'
import { SectionHeader } from 'components/layouts/section-header'
import { Button } from 'components/ui/button'
import { Input } from 'components/ui/input'
import { useBackendPagination } from 'hooks/use-backend-pagination'
import { useDebounce } from 'hooks/use-debounce'
import { ContactsTable } from 'modules/contacts/components/contacts-table'
import { CreateContactSheet } from 'modules/contacts/components/create-contact-sheet'
import { LeadStatusFilter } from 'modules/contacts/components/lead-status-filter'
import { TagsFilter } from 'modules/contacts/components/tags-filter'
import { GET_CONTACTS } from 'modules/contacts/graphql/queries'
import type {
	Contact,
	LeadStatus,
	PaginatedContactsResponse,
} from 'modules/contacts/types'

export default function ContactsPage() {
	const [searchQuery, setSearchQuery] = useState('')
	const [isCreateSheetOpen, setIsCreateSheetOpen] = useState(false)
	const [leadStatusFilter, setLeadStatusFilter] = useState<LeadStatus | null>(
		null
	)
	const [tagIdsFilter, setTagIdsFilter] = useState<string[]>([])

	// Debounce search query to avoid excessive API calls
	const debouncedSearch = useDebounce(searchQuery, 300)

	// Fetch contacts with pagination and search
	const {
		data: contacts,
		meta,
		loading,
		goToNextPage,
		goToPreviousPage,
		resetPage,
		refetch,
	} = useBackendPagination<PaginatedContactsResponse, Contact>({
		query: GET_CONTACTS,
		dataKey: 'contacts',
		pageSize: 25,
		queryVariables: {
			filter: {
				search: debouncedSearch.trim() || undefined,
				leadStatus: leadStatusFilter || undefined,
				tagIds: tagIdsFilter.length > 0 ? tagIdsFilter : undefined,
			},
		},
	})

	function handleCreateContact() {
		setIsCreateSheetOpen(true)
	}

	function handleContactCreated() {
		resetPage()
		refetch()
	}

	return (
		<div className="space-y-6">
			<SectionHeader
				title="Contactos"
				actions={
					<Button className="cursor-pointer" onClick={handleCreateContact}>
						<PlusIcon className="mr-2 h-4 w-4" />
						Crear Contacto
					</Button>
				}
			/>

			<div className="flex items-center gap-4">
				<Input
					placeholder="Buscar por nombre o email..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className="max-w-sm"
				/>
				<LeadStatusFilter
					value={leadStatusFilter}
					onApply={setLeadStatusFilter}
				/>
				<TagsFilter value={tagIdsFilter} onApply={setTagIdsFilter} />
			</div>

			<ContactsTable
				contacts={contacts}
				onCreateContact={handleCreateContact}
				paginationMeta={meta}
				onNextPage={goToNextPage}
				onPreviousPage={goToPreviousPage}
				searchQuery={searchQuery}
				loading={loading}
				onRefresh={refetch}
			/>

			<CreateContactSheet
				open={isCreateSheetOpen}
				onOpenChange={setIsCreateSheetOpen}
				onContactCreated={handleContactCreated}
			/>
		</div>
	)
}
