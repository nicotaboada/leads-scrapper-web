import { CheckCircle2, Loader2, Pause, XCircle, Clock, Square } from 'lucide-react'
import { cn } from '@/lib/utils/merge'
import { RunStatus } from '../types/run'

interface RunStatusBadgeProps {
	status: RunStatus | string
	className?: string
}

/**
 * Badge component that displays the status of a run with appropriate icon
 */
export function RunStatusBadge({ status, className }: RunStatusBadgeProps) {
	const statusStr = typeof status === 'string' ? status : String(status)

	const getStatusConfig = (status: string) => {
		switch (status) {
			case RunStatus.PAUSED:
			case 'PAUSED':
				return {
					icon: <Square className="h-5 w-5" />,
					className: 'text-gray-500 dark:text-gray-400',
				}
			case RunStatus.PENDING:
			case 'PENDING':
				return {
					icon: <Clock className="h-5 w-5" />,
					className: 'text-yellow-600 dark:text-yellow-400',
				}
			case RunStatus.RUNNING:
			case 'RUNNING':
				return {
					icon: <Loader2 className="h-5 w-5 animate-spin" />,
					className: 'text-blue-600 dark:text-blue-400',
				}
			case RunStatus.SUCCEEDED:
			case 'SUCCEEDED':
				return {
					icon: <CheckCircle2 className="h-5 w-5" />,
					className: 'text-green-600 dark:text-green-400',
				}
			case RunStatus.FAILED:
			case 'FAILED':
				return {
					icon: <XCircle className="h-5 w-5" />,
					className: 'text-red-600 dark:text-red-400',
				}
			default:
				return {
					icon: null,
					className: 'text-gray-500 dark:text-gray-400',
				}
		}
	}

	const config = getStatusConfig(statusStr)

	return (
		<div className={cn('flex items-center justify-center', config.className, className)}>
			{config.icon}
		</div>
	)
}
