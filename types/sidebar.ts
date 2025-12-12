import { type LucideIcon } from 'lucide-react'

/**
 * Represents a navigation item in the sidebar.
 * Can be a simple link or a parent item with children (accordion).
 *
 * @example
 * ```ts
 * const navItem: NavItem = {
 *   id: 'dashboard',
 *   label: 'Dashboard',
 *   href: '/dashboard',
 *   icon: LayoutDashboard,
 * }
 *
 * const navItemWithChildren: NavItem = {
 *   id: 'finanzas',
 *   label: 'Finanzas',
 *   icon: DollarSign,
 *   children: [
 *     {
 *       id: 'facturacion',
 *       label: 'Facturación',
 *       href: '/finanzas/facturacion',
 *       icon: FileText,
 *     },
 *   ],
 * }
 * ```
 */
export interface NavItem {
	/**
	 * Unique identifier for the navigation item
	 */
	id: string

	/**
	 * Display label for the navigation item (in Spanish)
	 */
	label: string

	/**
	 * Optional URL path for navigation
	 * If not provided, the item acts as an accordion parent
	 */
	href?: string

	/**
	 * Lucide React icon component
	 */
	icon: LucideIcon

	/**
	 * Optional array of child navigation items
	 * Used for accordion/sub-menu functionality
	 */
	children?: NavItem[]

	/**
	 * Optional array of roles allowed to view this item
	 * Prepared for future role-based access control
	 */
	roles?: string[]

	/**
	 * Optional array of permissions required to view this item
	 * Prepared for future permission-based access control
	 */
	permissions?: string[]
}

/**
 * Represents the state of the sidebar managed by Zustand.
 * Handles the expanded/collapsed state and provides actions to toggle it.
 *
 * @example
 * ```tsx
 * const { isExpanded, toggle } = useSidebarStore()
 *
 * return (
 *   <button onClick={toggle}>
 *     {isExpanded ? 'Collapse' : 'Expand'}
 *   </button>
 * )
 * ```
 */
export interface SidebarState {
	/**
	 * Whether the sidebar is currently expanded
	 * Default: true
	 */
	isExpanded: boolean

	/**
	 * Toggles the sidebar between expanded and collapsed states
	 */
	toggle: () => void

	/**
	 * Expands the sidebar
	 */
	expand: () => void

	/**
	 * Collapses the sidebar
	 */
	collapse: () => void
}

/**
 * Re-export LucideIcon type for convenience
 */
export type { LucideIcon }
