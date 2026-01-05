'use client'

import { Plus } from 'lucide-react'
import { useState } from 'react'
import { Button } from 'components/ui/button'
import { Skeleton } from 'components/ui/skeleton'
import { AddKeySheet } from './add-key-sheet'
import { ServiceCard } from './service-card'
import { useApiKeys } from '../hooks/use-api-keys'
import { SERVICE_CONFIGS } from '../types'

/**
 * Main page component for API Keys management
 */
export function ApiKeysPage() {
	const [isAddKeyOpen, setIsAddKeyOpen] = useState(false)
	const { loading, getActiveKey, getOtherKeys, getKeyCount } = useApiKeys()

	if (loading) {
		return <ApiKeysPageSkeleton />
	}

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex items-start justify-between">
				<div>
					<h1 className="text-2xl font-bold">API Keys</h1>
					<p className="text-muted-foreground mt-1">
						Manage your API keys for various services. Active keys will be used
						for billing and usage tracking.
					</p>
				</div>
				<Button onClick={() => setIsAddKeyOpen(true)}>
					<Plus className="mr-2 h-4 w-4" />
					Add Key
				</Button>
			</div>

			{/* Service Cards Grid */}
			<div className="grid gap-6 md:grid-cols-2">
				{SERVICE_CONFIGS.map((config) => (
					<ServiceCard
						key={config.key}
						service={config.key}
						serviceName={config.name}
						activeKey={getActiveKey(config.key)}
						otherKeys={getOtherKeys(config.key)}
					/>
				))}
			</div>

			{/* Add Key Sheet */}
			<AddKeySheet
				isOpen={isAddKeyOpen}
				onClose={() => setIsAddKeyOpen(false)}
				getKeyCount={getKeyCount}
			/>
		</div>
	)
}

function ApiKeysPageSkeleton() {
	return (
		<div className="space-y-6">
			{/* Header skeleton */}
			<div className="flex items-start justify-between">
				<div className="space-y-2">
					<Skeleton className="h-8 w-32" />
					<Skeleton className="h-4 w-96" />
				</div>
				<Skeleton className="h-10 w-28" />
			</div>

			{/* Cards skeleton */}
			<div className="grid gap-6 md:grid-cols-2">
				{[1, 2, 3, 4].map((i) => (
					<div key={i} className="rounded-lg border p-6">
						<div className="flex items-center gap-3">
							<Skeleton className="h-10 w-10 rounded-lg" />
							<div className="space-y-2">
								<Skeleton className="h-5 w-24" />
								<Skeleton className="h-3 w-32" />
							</div>
						</div>
						<Skeleton className="mt-4 h-20 w-full rounded-lg" />
					</div>
				))}
			</div>
		</div>
	)
}
