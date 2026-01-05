'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { settingsNavigationItems } from 'lib/config/settings-nav'
import { cn } from 'lib/utils/merge'

/**
 * Settings sidebar component for the configuration section.
 *
 * Provides secondary navigation within the Settings section.
 * This sidebar appears alongside the main app sidebar when
 * the user is in any /settings/* route.
 *
 * Features:
 * - Fixed width sidebar (240px)
 * - Header with "Configuración" title
 * - Navigation items with active state indicators
 * - Non-collapsible (always visible)
 *
 * @example
 * ```tsx
 * import { SettingsSidebar } from 'components/layouts/settings-sidebar'
 *
 * export default function SettingsLayout({ children }) {
 *   return (
 *     <div className="flex">
 *       <SettingsSidebar />
 *       <main>{children}</main>
 *     </div>
 *   )
 * }
 * ```
 */
export function SettingsSidebar() {
	const pathname = usePathname()

	return (
		<aside className="border-sidebar-border bg-sidebar/50 flex h-full w-64 flex-col border-r">
			<div className="border-sidebar-border/50 flex h-16 items-center border-b px-8">
				<h2 className="text-muted-foreground/70 text-xs font-semibold tracking-wider uppercase">
					Configuración
				</h2>
			</div>
			<nav className="flex-1 space-y-1 px-5 pt-6">
				{settingsNavigationItems.map((item) => {
					const Icon = item.icon
					const isActive = item.href ? pathname === item.href : false

					return (
						<Link
							key={item.id}
							href={item.href || '#'}
							className={cn(
								'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
								isActive
									? 'bg-accent text-accent-foreground'
									: 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
							)}
						>
							<Icon className="h-4 w-4" />
							<span>{item.label}</span>
						</Link>
					)
				})}
			</nav>
		</aside>
	)
}
