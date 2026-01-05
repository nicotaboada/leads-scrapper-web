import { CreditCard, Key, Tag } from 'lucide-react'
import { type NavItem } from 'types/sidebar'

/**
 * Navigation items configuration for the settings sidebar.
 *
 * This configuration defines all navigation routes within the Settings section.
 * Each item represents a settings subsection with its own page.
 *
 * @example
 * ```tsx
 * import { settingsNavigationItems } from 'lib/config/settings-nav'
 *
 * export function SettingsSidebar() {
 *   return (
 *     <nav>
 *       {settingsNavigationItems.map((item) => (
 *         <NavItem key={item.id} item={item} />
 *       ))}
 *     </nav>
 *   )
 * }
 * ```
 */
export const settingsNavigationItems: NavItem[] = [
	{
		id: 'tags',
		label: 'Tags',
		href: '/settings/tags',
		icon: Tag,
	},
	{
		id: 'billing',
		label: 'Billings & Usage',
		href: '/settings/billing',
		icon: CreditCard,
	},
	{
		id: 'api-keys',
		label: 'API Keys',
		href: '/settings/api-keys',
		icon: Key,
	},
]
