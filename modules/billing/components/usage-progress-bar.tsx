'use client'

import { Progress } from 'components/ui/progress'
import { cn } from 'lib/utils/merge'
import type { ServiceStatus } from '../types'

interface UsageProgressBarProps {
	current: number
	limit: number
	unit: string
	status: ServiceStatus
}

/**
 * Progress bar component that displays usage with color-coded status
 * Colors change based on usage thresholds:
 * - Normal (0-79%): neutral gray
 * - Warning (80-99%): amber
 * - Critical (100%+): red
 */
export function UsageProgressBar({
	current,
	limit,
	unit,
	status,
}: UsageProgressBarProps) {
	const percentage = limit > 0 ? Math.min((current / limit) * 100, 100) : 0

	const trackClassName = cn(
		'h-2',
		status === 'CRITICAL' && 'bg-red-500/20',
		status === 'WARNING' && 'bg-amber-500/20',
		status === 'NORMAL' && 'bg-zinc-700'
	)

	const indicatorClassName = cn(
		status === 'CRITICAL' && 'bg-red-500',
		status === 'WARNING' && 'bg-amber-500',
		status === 'NORMAL' && 'bg-zinc-400'
	)

	const formatValue = (value: number): string => {
		if (unit === 'USD') {
			return `$${value.toFixed(2)}`
		}
		return value.toLocaleString()
	}

	return (
		<div className="space-y-2">
			<Progress
				value={percentage}
				className={trackClassName}
				indicatorClassName={indicatorClassName}
			/>
			<div className="flex items-center justify-between text-sm text-muted-foreground">
				<span>
					{formatValue(current)} / {formatValue(limit)}{' '}
					{unit !== 'USD' && unit}
				</span>
				<span className="text-xs">{Math.round(percentage)}%</span>
			</div>
		</div>
	)
}

