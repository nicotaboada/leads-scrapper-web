import { AppHeader } from 'components/layouts/app-header'
import { AppLayout } from 'components/layouts/app-layout'
import { AppSidebar } from 'components/layouts/app-sidebar'
import { SidebarInset, SidebarProvider } from 'components/ui/sidebar'

/**
 * Layout for authenticated routes.
 * This layout wraps all routes inside the (authenticated) route group.
 *
 * Features:
 * - Application sidebar with navigation
 * - Application header with user menu
 * - Main content area with proper spacing
 *
 * Protected routes:
 * - /dashboard
 * - /runs
 * - /contacts
 * - /tags
 * - /settings
 */
export default function AuthenticatedLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<AppHeader />
				<AppLayout>{children}</AppLayout>
			</SidebarInset>
		</SidebarProvider>
	)
}
