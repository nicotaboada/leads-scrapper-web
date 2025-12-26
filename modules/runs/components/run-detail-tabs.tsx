'use client'

/**
 * Run Detail Tabs Component
 *
 * Tab navigation for the run detail page with Overview and Leads Enrichment tabs.
 * Follows Apify's horizontal tab design pattern.
 */

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

/**
 * Available tabs for run details
 */
export type RunDetailTab = 'overview' | 'leads'

interface RunDetailTabsProps {
	/**
	 * Currently active tab
	 */
	activeTab: RunDetailTab
	/**
	 * Callback when tab changes
	 */
	onTabChange: (tab: RunDetailTab) => void
	/**
	 * Optional count of leads to show as badge
	 */
	leadsCount?: number
}

/**
 * RunDetailTabs component
 *
 * Horizontal tab navigation for switching between Overview and Leads Enrichment views
 *
 * @param activeTab - Currently active tab
 * @param onTabChange - Callback when tab changes
 * @param leadsCount - Optional count of leads to display
 */
export function RunDetailTabs({
	activeTab,
	onTabChange,
	leadsCount,
}: RunDetailTabsProps) {
	return (
		<Tabs
			value={activeTab}
			onValueChange={(value) => onTabChange(value as RunDetailTab)}
			className="w-full"
		>
			<TabsList>
				<TabsTrigger value="overview">Overview</TabsTrigger>
				<TabsTrigger value="leads" className="gap-2">
					Leads Enrichment
					{leadsCount !== undefined && leadsCount > 0 && (
						<span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs font-medium">
							{leadsCount}
						</span>
					)}
				</TabsTrigger>
			</TabsList>
		</Tabs>
	)
}

