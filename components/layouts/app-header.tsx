'use client'

import { SidebarTrigger } from 'components/ui/sidebar'
import { UserAvatarMenu } from 'modules/auth/components/user-avatar-menu'

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
	return (
		<header className="border-sidebar-border bg-background sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 px-8">
			<SidebarTrigger className="-ml-1 cursor-pointer" />

			<div className="ml-auto flex items-center gap-4">
				<UserAvatarMenu />
			</div>
		</header>
	)
}
