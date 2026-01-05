'use client'

import * as TabsPrimitive from '@radix-ui/react-tabs'
import { motion } from 'motion/react'
import * as React from 'react'

import { cn } from 'lib/utils/merge'

/**
 * Tab item interface for HubSpotTabs component.
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
 * Props for the HubSpotTabs component.
 *
 * @property tabs - Array of tab items to render
 * @property defaultValue - Initial active tab value (uncontrolled mode)
 * @property value - Active tab value (controlled mode)
 * @property onValueChange - Callback when tab changes (controlled mode)
 * @property className - Additional CSS classes for the container
 */
interface HubSpotTabsProps {
	tabs: TabItem[]
	defaultValue?: string
	value?: string
	onValueChange?: (value: string) => void
	className?: string
}

/**
 * HubSpotTabs component - A HubSpot-style tab navigation.
 *
 * Features flat tabs with an animated underline indicator.
 * Content is rendered directly without a card wrapper,
 * allowing each tab content to have its own card structure.
 *
 * @example
 * ```tsx
 * <HubSpotTabs
 *   defaultValue="overview"
 *   tabs={[
 *     {
 *       value: 'overview',
 *       label: 'Overview',
 *       content: <OverviewContent />
 *     },
 *     {
 *       value: 'activities',
 *       label: 'Activities',
 *       content: <ActivitiesContent />
 *     }
 *   ]}
 * />
 * ```
 */
function HubSpotTabs({
	tabs,
	defaultValue,
	value,
	onValueChange,
	className,
}: HubSpotTabsProps) {
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
		<TabsPrimitive.Root
			value={currentValue}
			onValueChange={handleValueChange}
			className={cn('flex flex-col', className)}
		>
			{/* Tab Navigation - Outside of card, HubSpot style */}
			<div className="border-border relative mb-6 border-b">
				<TabsPrimitive.List className="flex items-center gap-1">
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
								'relative z-10 px-4 py-3 text-sm font-medium transition-colors',
								'text-muted-foreground hover:text-foreground',
								'focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
								'disabled:pointer-events-none disabled:opacity-50',
								'data-[state=active]:text-foreground'
							)}
						>
							{tab.label}
						</TabsPrimitive.Trigger>
					))}
				</TabsPrimitive.List>

				{/* Animated underline indicator */}
				<motion.div
					className="bg-foreground absolute bottom-0 z-20 h-0.5"
					layoutId="hubspot-tabs-underline"
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

			{/* Tab Content - No wrapper, content provides its own cards */}
			{tabs.map((tab) => (
				<TabsPrimitive.Content
					key={tab.value}
					value={tab.value}
					className="focus-visible:ring-ring focus-visible:outline-none"
				>
					{tab.content}
				</TabsPrimitive.Content>
			))}
		</TabsPrimitive.Root>
	)
}

export { HubSpotTabs, type HubSpotTabsProps, type TabItem }
