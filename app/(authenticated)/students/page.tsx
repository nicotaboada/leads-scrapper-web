'use client'

import { useQuery } from '@apollo/client/react'
import { CheckCircle2, PlusIcon, Users, XCircle } from 'lucide-react'
import { useState } from 'react'
import { StatsBar } from 'components/common/stats-bar'
import { SectionHeader } from 'components/layouts/section-header'
import { Button } from 'components/ui/button'
import { Skeleton } from 'components/ui/skeleton'
import { useBackendPagination } from 'hooks/use-backend-pagination'
import { useDebounce } from 'hooks/use-debounce'
import { useTableFilters } from 'hooks/use-table-filters'
import { CreateStudentSheet } from 'modules/students/components/create-student-sheet'
import { SearchFiltersRow } from 'modules/students/components/search-filters-row'
import { StudentsTable } from 'modules/students/components/students-table'
import {
	GET_STUDENT_STATS,
	GET_STUDENTS,
} from 'modules/students/graphql/queries'
import {
	type PaginatedStudentsResponse,
	type Student,
	type StudentStatsResponse,
} from 'modules/students/types/student'

export default function StudentsPage() {
	const [isCreateSheetOpen, setIsCreateSheetOpen] = useState(false)
	const [searchQuery, setSearchQuery] = useState('')

	// Debounce search query to avoid excessive API calls
	const debouncedSearch = useDebounce(searchQuery, 200)

	// Table filters
	const { filters, setFilter, clearFilter, activeFiltersCount, queryFilters } =
		useTableFilters({
			initialFilters: {
				status: null,
			},
			onChange: (filters) => {
				console.log('Filters changed:', filters)
				// Reset to first page when filters change
				resetPage()
			},
		})

	// Fetch student statistics
	const {
		data: statsData,
		loading: statsLoading,
		refetch: refetchStats,
	} = useQuery<StudentStatsResponse>(GET_STUDENT_STATS, {
		fetchPolicy: 'cache-first',
	})

	// Fetch students with pagination and search
	const {
		data: students,
		meta,
		loading,
		goToNextPage,
		goToPreviousPage,
		resetPage,
		refetch,
	} = useBackendPagination<PaginatedStudentsResponse, Student>({
		query: GET_STUDENTS,
		dataKey: 'students',
		pageSize: 25,
		queryVariables: {
			search: debouncedSearch.trim() || undefined,
			...queryFilters,
		},
	})

	const handleCreateStudent = () => {
		setIsCreateSheetOpen(true)
	}

	const handleStudentCreated = () => {
		// Reset to first page and refetch students list and stats
		resetPage()
		refetch()
		refetchStats()
	}

	// Get stats from dedicated query
	const stats = statsData?.studentStats || { total: 0, active: 0, inactive: 0 }

	return (
		<div className="space-y-6">
			<SectionHeader
				title="Estudiantes"
				actions={
					<Button className="cursor-pointer" onClick={handleCreateStudent}>
						<PlusIcon className="mr-2 h-4 w-4" />
						Nuevo Estudiante
					</Button>
				}
			/>

			{statsLoading ? (
				<div className="grid grid-cols-3 gap-4">
					<Skeleton className="h-24" />
					<Skeleton className="h-24" />
					<Skeleton className="h-24" />
				</div>
			) : (
				<StatsBar
					stats={[
						{
							value: stats.total,
							label: 'Total de estudiantes',
							icon: Users,
							color: 'blue',
						},
						{
							value: stats.active,
							label: 'Estudiantes activos',
							icon: CheckCircle2,
							color: 'green',
						},
						{
							value: stats.inactive,
							label: 'Estudiantes inactivos',
							icon: XCircle,
							color: 'orange',
						},
					]}
				/>
			)}

			<div className="pt-6">
				<SearchFiltersRow
					searchValue={searchQuery}
					onSearchChange={setSearchQuery}
					filters={filters}
					onFilterApply={setFilter}
					onFilterClear={clearFilter}
				/>
			</div>

			<StudentsTable
				students={students}
				onCreateStudent={handleCreateStudent}
				paginationMeta={meta}
				onNextPage={goToNextPage}
				onPreviousPage={goToPreviousPage}
				searchQuery={searchQuery}
				loading={loading}
			/>

			<CreateStudentSheet
				open={isCreateSheetOpen}
				onOpenChange={setIsCreateSheetOpen}
				onStudentCreated={handleStudentCreated}
			/>
		</div>
	)
}
