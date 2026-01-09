'use client'

import { Key, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { SectionHeader } from 'components/layouts/section-header'
import { Button } from 'components/ui/button'
import { BillingSkeleton } from './billing-skeleton'
import { ServiceUsageCard } from './service-usage-card'
import { useBillingUsage } from '../hooks/use-billing-usage'

/**
 * Main billing page component
 * Displays usage information for all external services
 */
export function BillingPage() {
	const { services, lastUpdated, loading, refetch } = useBillingUsage()
	const [isRefreshing, setIsRefreshing] = useState(false)

	// Reset refreshing state when loading completes
	useEffect(() => {
		if (!loading && isRefreshing) {
			setIsRefreshing(false)
		}
	}, [loading, isRefreshing])

	const handleRefresh = async () => {
		setIsRefreshing(true)
		await refetch()
	}

	const formatLastUpdated = (date: Date | null): string => {
		if (!date) return ''
		return date.toLocaleTimeString('es-AR', {
			hour: '2-digit',
			minute: '2-digit',
		})
	}

	return (
		<div className="space-y-6">
			<SectionHeader
				title="Billings & Usage"
				subtitle={
					lastUpdated
						? `Last updated: ${formatLastUpdated(lastUpdated)}`
						: undefined
				}
				actions={
					<Button
						variant="outline"
						size="sm"
						onClick={handleRefresh}
						disabled={isRefreshing}
						className="cursor-pointer"
					>
						<RefreshCw
							className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`}
						/>
						Refresh
					</Button>
				}
			/>

			{loading && services.length === 0 ? (
				<BillingSkeleton />
			) : (
				<div className="grid gap-6 md:grid-cols-2">
					{services.map((service) => (
						<ServiceUsageCard key={service.serviceKey} service={service} />
					))}
				</div>
			)}

			{!loading && services.length === 0 && (
				<div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed p-12 text-center">
					<div className="bg-muted flex h-12 w-12 items-center justify-center rounded-full">
						<Key className="text-muted-foreground h-6 w-6" />
					</div>
					<div className="space-y-1">
						<p className="font-medium">No API keys configured</p>
						<p className="text-muted-foreground text-sm">
							Add your API keys to start tracking usage
						</p>
					</div>
					<Button asChild>
						<Link href="/settings/api-keys">Configure API Keys</Link>
					</Button>
				</div>
			)}
		</div>
	)
}
