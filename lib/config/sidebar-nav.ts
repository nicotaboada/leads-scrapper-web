import {
	Activity,
	GraduationCap,
	LayoutDashboard,
	Settings,
} from 'lucide-react'
import { type NavItem } from 'types/sidebar'
import { ROUTES } from './routes'

/**
 * Navigation items configuration for the sidebar.
 *
 * This centralized configuration defines all navigation routes,
 * their labels (in Spanish), icons, and hierarchy.
 *
 * Items with `children` will render as accordions.
 * Items without `href` are parent-only (not directly navigable).
 *
 * Future: Add `roles` and `permissions` arrays to items for
 * role-based access control.
 *
 * @example
 * ```tsx
 * import { navigationItems } from 'lib/config/sidebar-nav'
 *
 * export function SidebarNav() {
 *   return (
 *     <nav>
 *       {navigationItems.map((item) => (
 *         <NavItem key={item.id} item={item} />
 *       ))}
 *     </nav>
 *   )
 * }
 * ```
 */
export const navigationItems: NavItem[] = [
	{
		id: 'dashboard',
		label: 'Dashboard',
		href: ROUTES.DASHBOARD,
		icon: LayoutDashboard,
	},
	{
		id: 'students',
		label: 'Estudiantes',
		href: ROUTES.STUDENTS,
		icon: GraduationCap,
	},
	{
		id: 'runs',
		label: 'Runs',
		href: ROUTES.RUNS,
		icon: Activity,
	},
	{
		id: 'settings',
		label: 'Configuración',
		href: ROUTES.SETTINGS,
		icon: Settings,
	},
]
