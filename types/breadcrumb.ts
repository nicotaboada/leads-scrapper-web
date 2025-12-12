import type { LucideIcon } from 'lucide-react'

/**
 * Represents a single item in the breadcrumb navigation
 */
export interface BreadcrumbItem {
	/**
	 * Optional icon to display (typically only for the first element)
	 */
	icon?: LucideIcon
	/**
	 * Text label to display for this breadcrumb item
	 */
	label: string
	/**
	 * Optional href for navigation. If provided, the item becomes clickeable
	 */
	href?: string
}
