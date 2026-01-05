import { CheckCircle2, Clock, Loader2, Pause, XCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils/merge'
import { RunStatus } from '../types/run'

interface RunStatusBadgeProps {
	status: RunStatus | string
	className?: string
}

/**
 * Badge component that displays the status of a run with appropriate icon and text
 */
export function RunStatusBadge({ status, className }: RunStatusBadgeProps) {
	const statusStr = typeof status === 'string' ? status : String(status)

	const getStatusConfig = (status: string) => {
		switch (status) {
			case RunStatus.PAUSED:
			case 'PAUSED':
				return {
					label: 'Pausado',
					icon: <Pause className="h-3 w-3" />,
					className:
						'bg-zinc-50 text-zinc-400 border-zinc-200 dark:bg-zinc-900/50 dark:text-zinc-500 dark:border-zinc-800',
				}
			case RunStatus.PENDING:
			case 'PENDING':
				return {
					label: 'Pendiente',
					icon: <Clock className="h-3 w-3" />,
					className:
						'bg-zinc-50 text-zinc-400 border-zinc-200 border-dashed dark:bg-zinc-900/50 dark:text-zinc-500 dark:border-zinc-800',
				}
			case RunStatus.RUNNING:
			case 'RUNNING':
				return {
					label: 'Ejecutando',
					icon: <Loader2 className="h-3 w-3 animate-spin" />,
					className:
						'bg-zinc-100 text-zinc-900 border-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700',
				}
			case RunStatus.SUCCEEDED:
			case 'SUCCEEDED':
				return {
					label: 'Completado',
					icon: <CheckCircle2 className="h-3 w-3" />,
					className:
						'bg-zinc-900 text-zinc-50 border-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:border-zinc-100',
				}
			case RunStatus.FAILED:
			case 'FAILED':
				return {
					label: 'Fallido',
					icon: <XCircle className="h-3 w-3" />,
					className:
						'bg-white text-zinc-900 border-zinc-800 dark:bg-transparent dark:text-zinc-100 dark:border-zinc-400',
				}
			default:
				return {
					label: status,
					icon: null,
					className:
						'bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700',
				}
		}
	}

	const config = getStatusConfig(statusStr)

	return (
		<Badge
			variant="outline"
			className={cn(
				'h-6 px-2 py-0.5 text-xs font-medium transition-all duration-200',
				config.className,
				className
			)}
		>
			<span className="flex items-center gap-1.5">
				{config.icon}
				{config.label}
			</span>
		</Badge>
	)
}
