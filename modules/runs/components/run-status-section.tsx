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
					iconClassName: 'animate-spin text-zinc-600 dark:text-zinc-400',
					bgClassName:
						'bg-zinc-50/50 dark:bg-zinc-900/30 border-zinc-200 dark:border-zinc-800',
					message: 'Ejecutando...',
					description: 'Esta ejecución está siendo procesada por Apify.',
				}
			case RunStatus.SUCCEEDED:
				return {
					icon: CheckCircle,
					iconClassName: 'text-zinc-900 dark:text-zinc-100',
					bgClassName:
						'bg-zinc-50 dark:bg-zinc-900/50 border-zinc-900/10 dark:border-zinc-100/10',
					message: 'Completado con éxito',
					description:
						'Esta ejecución ha finalizado y todos los resultados están disponibles.',
				}
			case RunStatus.FAILED:
				return {
					icon: XCircle,
					iconClassName: 'text-zinc-900 dark:text-zinc-100',
					bgClassName:
						'bg-zinc-50 dark:bg-zinc-900/50 border-zinc-900/20 dark:border-zinc-100/20 border-dashed',
					message: 'Error en la ejecución',
					description:
						'Esta ejecución encontró un error durante su procesamiento.',
				}
			case RunStatus.PAUSED:
			default:
				return {
					icon: CheckCircle,
					iconClassName: 'text-zinc-500 dark:text-zinc-400',
					bgClassName:
						'bg-zinc-50/30 dark:bg-zinc-950/30 border-zinc-200 dark:border-zinc-800',
					message: 'Pausado',
					description: 'Esta ejecución se encuentra pausada.',
				}
		}
	}

	const config = getStatusConfig()
	const StatusIcon = config.icon

	return (
		<div
			className={cn(
				'rounded-xl border p-5 transition-colors',
				config.bgClassName
			)}
		>
			<div className="flex items-start gap-3">
				<StatusIcon
					className={cn('mt-0.5 h-5 w-5 flex-shrink-0', config.iconClassName)}
				/>
				<div className="flex-1 space-y-3">
					<div>
						<h3 className="mb-1.5 text-base leading-none font-bold text-zinc-900 dark:text-zinc-100">
							{config.message}
						</h3>
						<p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
							{config.description}
						</p>
					</div>

					{apifyUrl && (
						<div className="flex items-center gap-2 pt-1">
							<span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
								Apify Console:
							</span>
							<a
								href={`https://console.apify.com/actors/runs/${apifyUrl}#output`}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-1 text-sm text-zinc-900 transition-colors hover:underline dark:text-zinc-100"
							>
								Ver en Apify
								<ExternalLink className="h-3 w-3" />
							</a>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
