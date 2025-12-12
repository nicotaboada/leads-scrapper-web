import { cn } from 'lib/utils/merge'

/**
 * Properties for the SectionHeader component.
 *
 * @property {string} title - The main heading text (required)
 * @property {string} [subtitle] - Optional subtitle text displayed below the title and actions
 * @property {React.ReactNode} [actions] - Optional action buttons or elements displayed on the right side of the title
 * @property {string} [className] - Optional custom classes for the container
 * @property {string} [titleClassName] - Optional custom classes for the title
 * @property {string} [subtitleClassName] - Optional custom classes for the subtitle
 */
export interface SectionHeaderProps {
	title: string
	subtitle?: string
	actions?: React.ReactNode
	className?: string
	titleClassName?: string
	subtitleClassName?: string
}

/**
 * SectionHeader component for consistent page headers across authenticated layouts.
 *
 * This component provides a reusable header with a title, optional subtitle,
 * and optional action buttons. The layout consists of two rows:
 * - Row 1: Title (left) + Action buttons (right)
 * - Row 2: Subtitle (left, below title)
 *
 * @example
 * ```tsx
 * // Simple header
 * <SectionHeader title="Dashboard" />
 *
 * // With subtitle
 * <SectionHeader
 *   title="Dashboard"
 *   subtitle="Welcome back, user@example.com"
 * />
 *
 * // With actions
 * <SectionHeader
 *   title="Ventas"
 *   actions={
 *     <>
 *       <Button variant="outline">Exportar</Button>
 *       <Button>Nueva Venta</Button>
 *     </>
 *   }
 * />
 * ```
 *
 * @param props - The component props
 * @returns A section header component
 */
export function SectionHeader({
	title,
	subtitle,
	actions,
	className,
	titleClassName,
	subtitleClassName,
}: SectionHeaderProps) {
	return (
		<div className={cn('mb-8', className)}>
			{/* Row 1: Title + Actions */}
			<div className="flex items-center justify-between gap-4">
				<h1
					className={cn(
						'text-3xl font-bold text-gray-900 dark:text-white',
						titleClassName
					)}
				>
					{title}
				</h1>
				{actions && <div className="flex gap-2">{actions}</div>}
			</div>

			{/* Row 2: Subtitle */}
			{subtitle && (
				<p
					className={cn(
						'mt-2 text-sm text-gray-600 dark:text-gray-400',
						subtitleClassName
					)}
				>
					{subtitle}
				</p>
			)}
		</div>
	)
}
