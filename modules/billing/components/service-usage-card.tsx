'use client'

import {
	AlertCircle,
	ArrowRight,
	Bot,
	Camera,
	Search,
	Sparkles,
} from 'lucide-react'
import Link from 'next/link'
import { Badge } from 'components/ui/badge'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from 'components/ui/card'
import { cn } from 'lib/utils/merge'
import { UsageProgressBar } from './usage-progress-bar'
import type { ServiceKey, ServiceUsage } from '../types'

interface ServiceUsageCardProps {
	service: ServiceUsage
}

const SERVICE_ICONS: Record<ServiceKey, React.ElementType> = {
	APIFY: Bot,
	OPENAI: Sparkles,
	SERPAPI: Search,
	SCREENSHOTONE: Camera,
}

/**
 * Card component displaying usage information for a single service
 * Shows enabled state with usage data or disabled state with configuration message
 */
export function ServiceUsageCard({ service }: ServiceUsageCardProps) {
	const Icon = SERVICE_ICONS[service.serviceKey]
	const isDisabled = !service.isEnabled

	return (
		<Card
			className={cn('transition-all', isDisabled && 'bg-muted/30 opacity-50')}
		>
			<CardHeader className="pb-2">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div
							className={cn(
								'flex h-10 w-10 items-center justify-center rounded-lg',
								isDisabled ? 'bg-muted' : 'bg-primary/10'
							)}
						>
							<Icon
								className={cn(
									'h-5 w-5',
									isDisabled ? 'text-muted-foreground' : 'text-primary'
								)}
							/>
						</div>
						<CardTitle className="text-lg">{service.serviceName}</CardTitle>
					</div>
					{service.isFreeTier && service.isEnabled && (
						<Badge
							variant="secondary"
							className="border-emerald-500/20 bg-emerald-500/10 text-emerald-500"
						>
							FREE
						</Badge>
					)}
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				{isDisabled ? <DisabledState /> : <EnabledState service={service} />}
			</CardContent>
		</Card>
	)
}

function DisabledState() {
	return (
		<div className="space-y-3 py-2">
			<div className="text-muted-foreground flex items-center gap-2">
				<AlertCircle className="h-4 w-4" />
				<span className="text-sm font-medium">No active key configured</span>
			</div>
			<Link
				href="/settings/api-keys"
				className="text-primary inline-flex items-center gap-1 text-sm font-medium hover:underline"
			>
				Configure API Key
				<ArrowRight className="h-3 w-3" />
			</Link>
		</div>
	)
}

interface EnabledStateProps {
	service: ServiceUsage
}

function EnabledState({ service }: EnabledStateProps) {
	return (
		<>
			{service.accountEmail && (
				<CardDescription className="truncate">
					{service.accountEmail}
				</CardDescription>
			)}
			{service.usage && (
				<UsageProgressBar
					current={service.usage.current}
					limit={service.usage.limit}
					unit={service.usage.unit}
					status={service.status}
				/>
			)}
			{service.costUsd !== null && service.costUsd !== undefined && (
				<div className="flex items-baseline gap-1">
					<span className="text-2xl font-semibold">
						${service.costUsd.toFixed(2)}
					</span>
					<span className="text-muted-foreground text-sm">USD</span>
				</div>
			)}
		</>
	)
}
