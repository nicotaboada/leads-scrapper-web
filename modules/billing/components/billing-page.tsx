'use client'

import { RefreshCw } from 'lucide-react'
import { SectionHeader } from 'components/layouts/section-header'
import { Button } from 'components/ui/button'
import { useBillingUsage } from '../hooks/use-billing-usage'
import { BillingSkeleton } from './billing-skeleton'
import { ServiceUsageCard } from './service-usage-card'

/**
 * Main billing page component
 * Displays usage information for all external services
 */
export function BillingPage() {
	const { services, lastUpdated, loading, refetch } = useBillingUsage()

	const handleRefresh = () => {
		refetch()
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
				description={
					lastUpdated
						? `Last updated: ${formatLastUpdated(lastUpdated)}`
						: undefined
				}
				actions={
					<Button
						variant="outline"
						size="sm"
						onClick={handleRefresh}
						disabled={loading}
						className="cursor-pointer"
					>
						<RefreshCw
							className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`}
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
						<ServiceUsageCard
							key={service.serviceKey}
							service={service}
						/>
					))}
				</div>
			)}

			{!loading && services.length === 0 && (
				<div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
					<p className="text-muted-foreground">
						No services configured. Add your API keys in Settings to get started.
					</p>
				</div>
			)}
		</div>
	)
}

