'use client'

import { usePathname } from 'next/navigation'
import { type ReactNode } from 'react'
import { cn } from 'lib/utils/merge'

interface AppLayoutProps {
	children: ReactNode
	className?: string
}

/**
 * Layout wrapper for application pages.
 *
 * Provides consistent spacing and flex layout for all app sections.
 * This component wraps the main content area inside the SidebarInset.
 *
 * @example
 * ```tsx
 * import { AppLayout } from 'components/layouts/app-layout'
 *
 * export default function DashboardPage() {
 *   return (
 *     <AppLayout>
 *       <h1>Dashboard</h1>
 *       <p>Content here...</p>
 *     </AppLayout>
 *   )
 * }
 * ```
 */
export function AppLayout({ children, className }: AppLayoutProps) {
	const pathname = usePathname()
	const isSettings = pathname.startsWith('/settings')

	return (
		<div
			className={cn(
				'flex flex-1 flex-col overflow-hidden',
				!isSettings && 'px-8',
				className
			)}
		>
			<main
				className={cn(
					'flex flex-1 flex-col bg-background dark:bg-gray-900',
					!isSettings && 'overflow-y-auto'
				)}
			>
				<div
					className={cn(
						'flex w-full flex-1 flex-col',
						!isSettings && 'py-8'
					)}
				>
					{children}
				</div>
			</main>
		</div>
	)
}
