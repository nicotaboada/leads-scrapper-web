'use client'

import { cn } from 'lib/utils/merge'
import type { BreadcrumbItem } from 'types/breadcrumb'
import { Breadcrumb } from './breadcrumb'

interface DetailHeaderProps {
	/**
	 * Breadcrumb items to display
	 */
	breadcrumbItems: BreadcrumbItem[]
	/**
	 * Optional action buttons or components to render on the right side
	 */
	actions?: React.ReactNode
	/**
	 * Optional additional CSS classes
	 */
	className?: string
}

/**
 * DetailHeader component for detail/subpages with breadcrumb navigation and optional actions
 *
 * @example
 * ```tsx
 * <DetailHeader
 *   breadcrumbItems={[
 *     { icon: GraduationCap, label: 'Estudiantes', href: '/students' },
 *     { label: 'Juan Pérez' }
 *   ]}
 *   actions={
 *     <>
 *       <Button variant="outline">Editar</Button>
 *       <Button>Agregar Nota</Button>
 *     </>
 *   }
 * />
 * ```
 */
export function DetailHeader({
	breadcrumbItems,
	actions,
	className,
}: DetailHeaderProps) {
	return (
		<div
			className={cn(
				'flex flex-col items-start justify-between gap-4 md:flex-row md:items-center',
				className
			)}
		>
			<Breadcrumb items={breadcrumbItems} className="py-0" />
			{actions && (
				<div className="flex items-center gap-2 md:ml-auto">{actions}</div>
			)}
		</div>
	)
}
