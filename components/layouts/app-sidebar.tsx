'use client'

import { ChevronDown, Hexagon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as React from 'react'
import { ROUTES } from '@/lib/config/routes'
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	useSidebar,
} from 'components/ui/sidebar'
import { navigationItems } from 'lib/config/sidebar-nav'

/**
 * Main application sidebar component using Shadcn UI.
 *
 * Provides the primary navigation for the application with support for:
 * - Expandable/collapsible state
 * - Nested sub-menus (accordion)
 * - Active route indicators
 * - Mobile responsive (sheet overlay)
 * - Dark mode support
 * - Tooltips when collapsed
 *
 * @example
 * ```tsx
 * import { SidebarProvider } from 'components/ui/sidebar'
 * import { AppSidebar } from 'components/layouts/app-sidebar'
 *
 * export default function Layout({ children }) {
 *   return (
 *     <SidebarProvider>
 *       <AppSidebar />
 *       <main>{children}</main>
 *     </SidebarProvider>
 *   )
 * }
 * ```
 */
export function AppSidebar() {
	const pathname = usePathname()
	const { state } = useSidebar()
	const [openMenus, setOpenMenus] = React.useState<Set<string>>(new Set())

	const isCollapsed = state === 'collapsed'

	// Toggle sub-menu open/closed
	const toggleMenu = (itemId: string) => {
		setOpenMenus((prev) => {
			const newSet = new Set(prev)
			if (newSet.has(itemId)) {
				newSet.delete(itemId)
			} else {
				newSet.add(itemId)
			}
			return newSet
		})
	}

	// Auto-open menu if child is active, close all others
	React.useEffect(() => {
		const newOpenMenus = new Set<string>()

		navigationItems.forEach((item) => {
			if (item.children) {
				const hasActiveChild = item.children.some(
					(child) => child.href && pathname === child.href
				)
				if (hasActiveChild) {
					newOpenMenus.add(item.id)
				}
			}
		})

		setOpenMenus(newOpenMenus)
	}, [pathname])

	return (
		<Sidebar collapsible="icon">
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size={isCollapsed ? 'default' : 'lg'} asChild>
							<Link href={ROUTES.DASHBOARD}>
								<div
									className={`bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square ${isCollapsed ? 'size-4' : 'size-8'} items-center justify-center rounded-lg`}
								>
									<Hexagon className="size-4" />
								</div>
								{!isCollapsed && (
									<div className="grid flex-1 text-left text-sm leading-tight">
										<span className="truncate font-semibold">La Pyme</span>
										<span className="text-muted-foreground truncate text-xs">
											Sistema de gestión
										</span>
									</div>
								)}
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>

			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							{navigationItems.map((item) => {
								const Icon = item.icon
								const isActive = item.href ? pathname === item.href : false
								const hasChildren = item.children && item.children.length > 0
								const isOpen = openMenus.has(item.id)

								// Item without children (simple nav item)
								if (!hasChildren) {
									return (
										<SidebarMenuItem key={item.id}>
											<SidebarMenuButton
												asChild
												isActive={isActive}
												tooltip={item.label}
												size={'default'}
											>
												<Link href={item.href || '#'}>
													<Icon />
													<span>{item.label}</span>
												</Link>
											</SidebarMenuButton>
										</SidebarMenuItem>
									)
								}

								// Item with children (accordion)
								return (
									<SidebarMenuItem key={item.id}>
										<SidebarMenuButton
											onClick={() => toggleMenu(item.id)}
											tooltip={item.label}
										>
											<Icon />
											<span>{item.label}</span>
											<ChevronDown
												className={`ml-auto transition-transform ${
													isOpen ? 'rotate-180' : ''
												}`}
											/>
										</SidebarMenuButton>

										{isOpen && (
											<SidebarMenuSub>
												{item.children?.map((child) => {
													const ChildIcon = child.icon
													const isChildActive = child.href
														? pathname === child.href
														: false

													return (
														<SidebarMenuSubItem key={child.id}>
															<SidebarMenuSubButton
																asChild
																isActive={isChildActive}
															>
																<Link href={child.href || '#'}>
																	<ChildIcon />
																	<span>{child.label}</span>
																</Link>
															</SidebarMenuSubButton>
														</SidebarMenuSubItem>
													)
												})}
											</SidebarMenuSub>
										)}
									</SidebarMenuItem>
								)
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	)
}
