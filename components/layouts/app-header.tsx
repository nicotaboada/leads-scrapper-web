'use client'

import { usePathname } from 'next/navigation'
import { SidebarTrigger } from 'components/ui/sidebar'
import { UserAvatarMenu } from 'modules/auth/components/user-avatar-menu'
import { Breadcrumb } from './breadcrumb'
import { navigationItems } from 'lib/config/sidebar-nav'
import { settingsNavigationItems } from 'lib/config/settings-nav'

/**
 * Main application header that appears at the top of all pages.
 * Contains the sidebar toggle button and will contain additional elements in the future.
 *
 * This header uses Shadcn UI's SidebarTrigger component to control the sidebar state.
 * It's sticky at the top and adapts to the theme colors.
 *
 * @example
 * ```tsx
 * // app/layout.tsx
 * import { SidebarProvider } from 'components/ui/sidebar'
 * import { AppHeader } from 'components/layouts/app-header'
 * import { AppSidebar } from 'components/layouts/app-sidebar'
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <SidebarProvider>
 *       <AppSidebar />
 *       <main>
 *         <AppHeader />
 *         {children}
 *       </main>
 *     </SidebarProvider>
 *   )
 * }
 * ```
 */
export function AppHeader() {
	const pathname = usePathname()

	// Generate breadcrumbs based on the current path
	const generateBreadcrumbs = () => {
		const items = []
		const paths = pathname.split('/').filter(Boolean)

		// Find the main navigation item
		const mainItem = navigationItems.find(
			(item) => item.href && pathname.startsWith(item.href)
		)

		if (mainItem) {
			items.push({
				label: mainItem.label,
				href: mainItem.href,
				icon: mainItem.icon,
			})
		}

		// If in settings, find the sub-item
		if (pathname.startsWith('/settings')) {
			const subItem = settingsNavigationItems.find(
				(item) => item.href === pathname
			)
			if (subItem && subItem.label !== mainItem?.label) {
				items.push({
					label: subItem.label,
					href: subItem.href,
					icon: subItem.icon,
				})
			}
		}

		return items
	}

	const breadcrumbItems = generateBreadcrumbs()

	return (
		<header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-4 border-b border-sidebar-border bg-background px-6">
			<div className="flex items-center gap-2">
				<SidebarTrigger className="-ml-1 cursor-pointer" />
				<div className="h-4 w-px bg-border/60 mx-1" />
				<Breadcrumb items={breadcrumbItems} />
			</div>

			<div className="ml-auto flex items-center gap-4">
				<UserAvatarMenu />
			</div>
		</header>
	)
}
