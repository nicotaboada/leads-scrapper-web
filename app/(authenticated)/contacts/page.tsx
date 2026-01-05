'use client'

import { PlusIcon } from 'lucide-react'
import { useState } from 'react'
import { SectionHeader } from 'components/layouts/section-header'
import { Button } from 'components/ui/button'
import { Input } from 'components/ui/input'
import { useBackendPagination } from 'hooks/use-backend-pagination'
import { useDebounce } from 'hooks/use-debounce'
import { CityFilter } from 'modules/contacts/components/city-filter'
import { ContactsTable } from 'modules/contacts/components/contacts-table'
import { CreateContactSheet } from 'modules/contacts/components/create-contact-sheet'
import { FollowUpFilter } from 'modules/contacts/components/follow-up-filter'
import { LeadStatusFilter } from 'modules/contacts/components/lead-status-filter'
import { TagsFilter } from 'modules/contacts/components/tags-filter'
import { GET_CONTACTS } from 'modules/contacts/graphql/queries'
import { useAvailableCities } from 'modules/contacts/hooks/use-available-cities'
import type {
	Contact,
	type FollowUpFilterValue,
	LeadStatus,
	PaginatedContactsResponse,
} from 'modules/contacts/types'
import { useAllTags } from 'modules/tags/hooks/use-all-tags'

export default function ContactsPage() {
	const [searchQuery, setSearchQuery] = useState('')
	const [isCreateSheetOpen, setIsCreateSheetOpen] = useState(false)
	const [leadStatusFilter, setLeadStatusFilter] = useState<LeadStatus | null>(
		null
	)
	const [tagIdsFilter, setTagIdsFilter] = useState<string[]>([])
	const [cityFilter, setCityFilter] = useState<string[]>([])
	const [followUpFilter, setFollowUpFilter] =
		useState<FollowUpFilterValue | null>(null)

	// Debounce search query to avoid excessive API calls
	const debouncedSearch = useDebounce(searchQuery, 300)

	// Pre-fetch filter options in parallel with contacts for better UX
	const { tags: availableTags } = useAllTags()
	const { cities: availableCities } = useAvailableCities()

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
				cities: cityFilter.length > 0 ? cityFilter : undefined,
				followUpFilter: followUpFilter || undefined,
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
				<TagsFilter
					value={tagIdsFilter}
					onApply={setTagIdsFilter}
					availableTags={availableTags}
				/>
				<CityFilter
					value={cityFilter}
					onApply={setCityFilter}
					availableCities={availableCities}
				/>
				<FollowUpFilter value={followUpFilter} onApply={setFollowUpFilter} />
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
