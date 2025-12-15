'use client'

import { CheckCircle, ExternalLink, Loader2, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils/merge'
import { RunStatus } from '../types/run'

interface RunStatusSectionProps {
	status: RunStatus
	runName: string
	apifyUrl?: string | null
	loading?: boolean
}

/**
 * Status section component showing run execution status with visual indicators
 */
export function RunStatusSection({
	status,
	apifyUrl,
	loading = false,
}: RunStatusSectionProps) {
	if (loading) {
		return (
			<div className="bg-muted/50 rounded-lg border p-6">
				<div className="flex items-center gap-3">
					<Loader2 className="text-muted-foreground h-5 w-5 animate-spin" />
					<span className="muted-foreground text-sm">
						Loading run details...
					</span>
				</div>
			</div>
		)
	}

	const getStatusConfig = () => {
		switch (status) {
			case RunStatus.PENDING:
			case RunStatus.RUNNING:
				return {
					icon: Loader2,
					iconClassName: 'animate-spin text-blue-600 dark:text-blue-400',
					bgClassName:
						'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800',
					message: 'Processing...',
					description: 'This run is currently being executed by Apify.',
				}
			case RunStatus.SUCCEEDED:
				return {
					icon: CheckCircle,
					iconClassName: 'text-green-600 dark:text-green-400',
					bgClassName:
						'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800',
					message: 'Completed successfully',
					description: 'This run has finished and all results are available.',
				}
			case RunStatus.FAILED:
				return {
					icon: XCircle,
					iconClassName: 'text-red-600 dark:text-red-400',
					bgClassName:
						'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800',
					message: 'Run failed',
					description: 'This run encountered an error during execution.',
				}
			case RunStatus.PAUSED:
			default:
				return {
					icon: CheckCircle,
					iconClassName: 'text-gray-600 dark:text-gray-400',
					bgClassName:
						'bg-gray-50 dark:bg-gray-950/30 border-gray-200 dark:border-gray-800',
					message: 'Paused',
					description: 'This run is currently paused.',
				}
		}
	}

	const config = getStatusConfig()
	const StatusIcon = config.icon

	return (
		<div
			className={cn(
				'rounded-lg border p-6 transition-colors',
				config.bgClassName
			)}
		>
			<div className="flex items-start gap-4">
				<StatusIcon
					className={cn('h-6 w-6 flex-shrink-0', config.iconClassName)}
				/>
				<div className="flex-1 space-y-2">
					<div>
						<h3 className="text-lg font-semibold">{config.message}</h3>
						<p className="muted-foreground text-sm">{config.description}</p>
					</div>

					{apifyUrl && (
						<div className="flex items-center gap-2 pt-2">
							<span className="text-sm font-medium">Apify Console:</span>
							<a
								href={`https://console.apify.com/actors/runs/${apifyUrl}#output`}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
							>
								View in Apify
								<ExternalLink className="h-3 w-3" />
							</a>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
