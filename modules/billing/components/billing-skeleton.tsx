'use client'

import { Card, CardContent, CardHeader } from 'components/ui/card'
import { Skeleton } from 'components/ui/skeleton'

/**
 * Skeleton loading state for a single service usage card
 */
function ServiceUsageCardSkeleton() {
	return (
		<Card>
			<CardHeader className="pb-2">
				<div className="flex items-center gap-3">
					<Skeleton className="h-10 w-10 rounded-lg" />
					<Skeleton className="h-5 w-24" />
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				<Skeleton className="h-4 w-40" />
				<div className="space-y-2">
					<Skeleton className="h-2 w-full rounded-full" />
					<div className="flex justify-between">
						<Skeleton className="h-3 w-20" />
						<Skeleton className="h-3 w-8" />
					</div>
				</div>
				<Skeleton className="h-8 w-24" />
			</CardContent>
		</Card>
	)
}

/**
 * Skeleton loading state for the billing page
 * Displays 4 skeleton cards in a grid layout
 */
export function BillingSkeleton() {
	return (
		<div className="grid gap-6 md:grid-cols-2">
			<ServiceUsageCardSkeleton />
			<ServiceUsageCardSkeleton />
			<ServiceUsageCardSkeleton />
			<ServiceUsageCardSkeleton />
		</div>
	)
}
