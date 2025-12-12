'use client'

/**
 * Students Table Component
 *
 * Displays a paginated table of students with their information including
 * contact details, courses, status, and actions.
 */

import dayjs from 'dayjs'
import {
	BookOpen,
	Edit,
	GraduationCap,
	Mail,
	MoreHorizontal,
	Phone,
	Power,
	Trash2,
} from 'lucide-react'
import Link from 'next/link'
import { TableEmptyState } from 'components/common/table-empty-state'
import { TablePagination } from 'components/common/table-pagination'
import { TableSkeletonRows } from 'components/common/table-skeleton-rows'
import { Avatar, AvatarFallback, AvatarImage } from 'components/ui/avatar'
import { Badge } from 'components/ui/badge'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from 'components/ui/dropdown-menu'
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
import { getStudentFullName, getStudentInitials, StudentStatus } from '../types'
import type { Student } from '../types'

interface StudentsTableProps {
	students: Student[]
	paginationMeta?: PaginationMeta
	onCreateStudent?: () => void
	onNextPage?: () => void
	onPreviousPage?: () => void
	searchQuery?: string
	loading?: boolean
}

export function StudentsTable({
	students,
	paginationMeta,
	onCreateStudent,
	onNextPage,
	onPreviousPage,
	searchQuery,
	loading,
}: StudentsTableProps) {
	if (!loading && students.length === 0 && searchQuery) {
		return (
			<TableEmptyState
				icon={GraduationCap}
				title="No hay resultados para la búsqueda"
			/>
		)
	}
	if (!loading && students.length === 0) {
		return (
			<TableEmptyState
				icon={GraduationCap}
				title="No hay estudiantes registrados"
				description="Crea tu primer estudiante para comenzar a gestionar su información académica y realizar seguimiento de su progreso."
				action={{
					label: 'Crear estudiante',
					onClick: onCreateStudent ?? (() => {}),
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
			items: [
				{ width: '150px', height: 'h-3' },
				{ width: '120px', height: 'h-3' },
			],
		},
		{
			width: '200px',
			height: 'h-6',
		},
		{
			width: '70px',
			height: 'h-5',
			className: 'rounded-full',
		},
		{
			width: '100px',
			height: 'h-4',
		},
		{
			cellClassName: 'pr-6',
			width: '32px',
			height: 'h-8',
		},
	]

	return (
		<div className="w-full space-y-4">
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[280px] pl-6">Estudiante</TableHead>
							<TableHead className="w-[220px]">Datos de contacto</TableHead>
							<TableHead className="w-[280px]">Cursos</TableHead>
							<TableHead className="w-[120px]">Estado</TableHead>
							<TableHead className="w-[140px]">Fecha de creación</TableHead>
							<TableHead className="w-[70px] pr-6"></TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{loading ? (
							<TableSkeletonRows rows={5} columns={skeletonTableColumns} />
						) : (
							students.map((student) => (
								<TableRow
									key={student.id}
									className={
										student.status === StudentStatus.DISABLED
											? 'bg-muted/30'
											: ''
									}
								>
									<TableCell
										className={`max-w-0 pl-6 ${student.status === StudentStatus.DISABLED ? 'opacity-60' : ''}`}
									>
										<div className="flex items-center gap-3 overflow-hidden">
											<Avatar className="shrink-0">
												{student.avatar && (
													<AvatarImage
														src={student.avatar}
														alt={getStudentFullName(student)}
													/>
												)}
												<AvatarFallback>
													{getStudentInitials(student)}
												</AvatarFallback>
											</Avatar>
											<Link
												href={ROUTES.STUDENT_DETAIL(student.id)}
												className="cursor-pointer truncate font-medium hover:underline"
											>
												{getStudentFullName(student)}
											</Link>
										</div>
									</TableCell>
									<TableCell
										className={`max-w-0 ${student.status === StudentStatus.DISABLED ? 'opacity-60' : ''}`}
									>
										<div className="flex flex-col gap-1">
											<div className="flex items-center gap-2 overflow-hidden text-sm">
												<Mail className="text-muted-foreground h-4 w-4 shrink-0" />
												<span className="text-muted-foreground truncate">
													{student.email}
												</span>
											</div>
											{student.phoneNumber && (
												<div className="flex items-center gap-2 overflow-hidden text-sm">
													<Phone className="text-muted-foreground h-4 w-4 shrink-0" />
													<span className="text-muted-foreground truncate">
														{student.phoneNumber}
													</span>
												</div>
											)}
										</div>
									</TableCell>
									<TableCell
										className={`max-w-0 ${student.status === StudentStatus.DISABLED ? 'opacity-60' : ''}`}
									>
										<div className="flex flex-wrap gap-1.5">
											{student.courses?.map((course) => (
												<Badge
													key={course.id}
													variant="secondary"
													className="max-w-[160px]"
												>
													<BookOpen className="mr-1.5 h-3.5 w-3.5 shrink-0" />
													<span className="truncate">{course.name}</span>
												</Badge>
											))}
										</div>
									</TableCell>
									<TableCell>
										<Badge
											variant={
												student.status === StudentStatus.ENABLED
													? 'default'
													: 'outline'
											}
											className={
												student.status === StudentStatus.ENABLED
													? 'bg-green-100 text-green-800 hover:bg-green-100'
													: 'bg-gray-100 text-gray-800 hover:bg-gray-100'
											}
										>
											{student.status === StudentStatus.ENABLED
												? 'Activo'
												: 'Inactivo'}
										</Badge>
									</TableCell>
									<TableCell
										className={`text-muted-foreground ${student.status === StudentStatus.DISABLED ? 'opacity-60' : ''}`}
									>
										{dayjs(student.createdAt).format('DD/MM/YYYY')}
									</TableCell>
									<TableCell
										className={`pr-6 ${student.status === StudentStatus.DISABLED ? 'opacity-60' : ''}`}
									>
										<DropdownMenu>
											<DropdownMenuTrigger className="bg-background hover:bg-accent flex h-8 w-8 cursor-pointer items-center justify-center">
												<MoreHorizontal className="h-4 w-4" />
												<span className="sr-only">Abrir menú de acciones</span>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												<DropdownMenuItem>
													<Edit className="mr-2 h-4 w-4" />
													Editar
												</DropdownMenuItem>
												<DropdownMenuItem className="text-destructive">
													<Trash2 className="mr-2 h-4 w-4" />
													Eliminar
												</DropdownMenuItem>
												<DropdownMenuItem>
													<Power className="mr-2 h-4 w-4" />
													{student.status === StudentStatus.ENABLED
														? 'Desactivar'
														: 'Activar'}
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
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
		</div>
	)
}
