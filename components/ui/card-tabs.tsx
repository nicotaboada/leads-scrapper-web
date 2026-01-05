'use client'

import * as TabsPrimitive from '@radix-ui/react-tabs'
import { motion } from 'motion/react'
import * as React from 'react'

import { Card } from 'components/ui/card'
import { cn } from 'lib/utils/merge'

/**
 * Tab item interface for CardTabs component.
 *
 * @property value - Unique identifier for the tab
 * @property label - Display text for the tab trigger
 * @property content - React node to render when tab is active
 */
interface TabItem {
	value: string
	label: string
	content: React.ReactNode
}

/**
 * Props for the CardTabs component.
 *
 * @property tabs - Array of tab items to render
 * @property defaultValue - Initial active tab value (uncontrolled mode)
 * @property value - Active tab value (controlled mode)
 * @property onValueChange - Callback when tab changes (controlled mode)
 * @property className - Additional CSS classes for the card container
 */
interface CardTabsProps {
	tabs: TabItem[]
	defaultValue?: string
	value?: string
	onValueChange?: (value: string) => void
	className?: string
}

/**
 * CardTabs component - A reusable card container with integrated tab navigation.
 *
 * Combines a card wrapper with tab navigation, featuring a full-width border separator
 * and an animated underline indicator for the active tab. Ideal for detail pages with
 * multiple content sections.
 *
 * @example
 * ```tsx
 * <CardTabs
 *   defaultValue="info"
 *   tabs={[
 *     {
 *       value: 'info',
 *       label: 'Información',
 *       content: <ContactInfoTab contact={contact} />
 *     },
 *     {
 *       value: 'activities',
 *       label: 'Actividades',
 *       content: <ContactActivitiesTab contact={contact} />
 *     }
 *   ]}
 * />
 * ```
 */
function CardTabs({
	tabs,
	defaultValue,
	value,
	onValueChange,
	className,
}: CardTabsProps) {
	const [activeTab, setActiveTab] = React.useState<string>(
		defaultValue || tabs[0]?.value || ''
	)
	const tabRefs = React.useRef<Map<string, HTMLButtonElement>>(new Map())
	const [underlineStyle, setUnderlineStyle] = React.useState({
		left: 0,
		width: 0,
	})

	const isControlled = value !== undefined
	const currentValue = isControlled ? value : activeTab

	React.useLayoutEffect(() => {
		const activeTabElement = tabRefs.current.get(currentValue)

		if (activeTabElement) {
			const { offsetLeft, offsetWidth } = activeTabElement

			setUnderlineStyle({
				left: offsetLeft,
				width: offsetWidth,
			})
		}
	}, [currentValue])

	const handleValueChange = (newValue: string) => {
		if (!isControlled) {
			setActiveTab(newValue)
		}
		onValueChange?.(newValue)
	}

	return (
		<Card className={cn('gap-0 p-0', className)}>
			<TabsPrimitive.Root
				value={currentValue}
				onValueChange={handleValueChange}
				className="flex flex-col"
			>
				<div className="relative border-b">
					<TabsPrimitive.List className="flex items-center">
						{tabs.map((tab) => (
							<TabsPrimitive.Trigger
								key={tab.value}
								value={tab.value}
								ref={(el) => {
									if (el) {
										tabRefs.current.set(tab.value, el)
									} else {
										tabRefs.current.delete(tab.value)
									}
								}}
								className={cn(
									'text-muted-foreground relative z-10 px-6 py-4 text-sm font-medium transition-colors',
									'hover:text-foreground focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
									'disabled:pointer-events-none disabled:opacity-50',
									'data-[state=active]:text-foreground'
								)}
							>
								{tab.label}
							</TabsPrimitive.Trigger>
						))}
					</TabsPrimitive.List>

					<motion.div
						className="bg-primary absolute bottom-0 z-20 h-0.5"
						layoutId="card-tabs-underline"
						style={{
							left: underlineStyle.left,
							width: underlineStyle.width,
						}}
						transition={{
							type: 'spring',
							stiffness: 400,
							damping: 40,
						}}
					/>
				</div>

				<div className="p-6">
					{tabs.map((tab) => (
						<TabsPrimitive.Content
							key={tab.value}
							value={tab.value}
							className="focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
						>
							{tab.content}
						</TabsPrimitive.Content>
					))}
				</div>
			</TabsPrimitive.Root>
		</Card>
	)
}

export { CardTabs, type CardTabsProps, type TabItem }
