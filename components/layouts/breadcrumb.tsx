'use client'

import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { cn } from 'lib/utils/merge'
import type { BreadcrumbItem } from 'types/breadcrumb'

interface BreadcrumbProps {
	items: BreadcrumbItem[]
	className?: string
}

/**
 * Breadcrumb component that renders navigation items with separators
 *
 * @example
 * ```tsx
 * <Breadcrumb
 *   items={[
 *     { icon: Users, label: 'Contactos', href: '/contacts' },
 *     { label: 'Juan Pérez' }
 *   ]}
 * />
 * ```
 */
export function Breadcrumb({ items, className }: BreadcrumbProps) {
	return (
		<nav
			aria-label="Breadcrumb"
			className={cn('flex items-center gap-2', className)}
		>
			{items.map((item, index) => {
				const isLast = index === items.length - 1
				const _isFirst = index === 0
				const Icon = item.icon

				return (
					<div key={index} className="flex items-center gap-2">
						{item.href ? (
							<Link
								href={item.href}
								className={cn(
									'hover:text-foreground flex items-center gap-2 text-sm transition-colors',
									isLast
										? 'text-foreground font-semibold'
										: 'text-muted-foreground',
									'focus-visible:ring-ring rounded-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none'
								)}
							>
								{Icon && <Icon className="h-4 w-4" />}
								<span>{item.label}</span>
							</Link>
						) : (
							<span
								className={cn(
									'flex items-center gap-2 text-sm',
									isLast
										? 'text-foreground font-semibold'
										: 'text-muted-foreground'
								)}
							>
								{Icon && <Icon className="h-4 w-4" />}
								<span>{item.label}</span>
							</span>
						)}

						{!isLast && (
							<ChevronRight
								className="text-muted-foreground h-4 w-4"
								aria-hidden="true"
							/>
						)}
					</div>
				)
			})}
		</nav>
	)
}
