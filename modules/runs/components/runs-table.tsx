'use client'

import {
	ExternalLink,
	MoreHorizontal,
	Pause,
	Play,
	Trash2,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { RunStatusBadge } from './run-status-badge'
import { useDeleteRun } from '../hooks/use-delete-run'
import { usePauseRun } from '../hooks/use-pause-run'
import { usePlayRun } from '../hooks/use-play-run'
import { useRunSubscription } from '../hooks/use-run-subscription'
import { Run, RunStatus } from '../types/run'
import { Badge } from '@/components/ui/badge'

/**
 * Get initials from user name or email
 */
function getInitials(name?: string | null, email?: string): string {
	if (name) {
		const parts = name.trim().split(' ').filter(Boolean)
		if (parts.length >= 2) {
			return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
		}
		return name.slice(0, 2).toUpperCase()
	}
	if (email) {
		return email.slice(0, 2).toUpperCase()
	}
	return '??'
}

interface RunsTableProps {
	runs: Run[]
}

/**
 * Individual row component with subscription support
 */
function RunTableRow({ run: initialRun }: { run: Run }) {
	const [run, setRun] = useState(initialRun)
	const [isSubscribed, setIsSubscribed] = useState(false)
	const { playRun, loading: playLoading } = usePlayRun()
	const { pauseRun, loading: pauseLoading } = usePauseRun()
	const { deleteRun, loading: deleteLoading } = useDeleteRun()

	// Subscribe to run status changes when it's running
	const { run: subscribedRun } = useRunSubscription({
		runId: run.id,
		enabled: isSubscribed,
		onStatusChange: (updatedRun) => {
			console.log('Subscription received update:', updatedRun.status)
			// Update state immediately
			setRun(updatedRun)

			// Check if run is finished
			if (
				updatedRun.status === RunStatus.SUCCEEDED ||
				updatedRun.status === RunStatus.FAILED
			) {
				// Disconnect subscription after state update
				setIsSubscribed(false)
				toast.success(`Ejecución completada: ${updatedRun.name}`, {
					description: `Estado: ${updatedRun.status} | Resultados: ${updatedRun.resultCount}`,
				})
			}
		},
	})

	// Update local state when subscription receives updates
	useEffect(() => {
		if (subscribedRun) {
			setRun(subscribedRun)
		}
	}, [subscribedRun])

	// Update run when prop changes (for initial load or refetch)
	useEffect(() => {
		setRun(initialRun)
	}, [initialRun])

	const handlePlay = async () => {
		try {
			// Immediately show PENDING state for better UX
			setRun({ ...run, status: RunStatus.PENDING })

			// Activate subscription BEFORE calling mutation
			// This ensures we don't miss any status updates
			setIsSubscribed(true)

			const updatedRun = await playRun(run.id)
			if (updatedRun) {
				setRun(updatedRun)
				toast.success(`${updatedRun.name} iniciada correctamente`)
			}
		} catch {
			// Revert to original status if failed
			setRun(initialRun)
			setIsSubscribed(false)
			toast.error('Error al iniciar la ejecución')
		}
	}

	const handlePause = async () => {
		try {
			const updatedRun = await pauseRun(run.id)
			console.log('UPDATED RUN', updatedRun)
			if (updatedRun) {
				setRun(updatedRun)
				setIsSubscribed(false)
				toast.success(`${updatedRun.name} pausada correctamente`)
			}
		} catch {
			toast.error('Error al pausar la ejecución')
		}
	}

	const handleDelete = async () => {
		try {
			await deleteRun(run.id)
			toast.success(`${run.name} eliminada correctamente`)
		} catch {
			toast.error('Error al eliminar la ejecución')
		}
	}

	// Determine which button to show based on status
	const showPlayButton =
		run.status === RunStatus.PAUSED || run.status === RunStatus.FAILED
	const showPauseButton =
		run.status === RunStatus.RUNNING || run.status === RunStatus.PENDING
	const isLoading = playLoading || pauseLoading || deleteLoading

	return (
		<TableRow key={run.id} className="group transition-colors">
			<TableCell className="max-w-[300px]">
				<div className="flex flex-col gap-1">
					<Link
						href={`/runs/${run.id}`}
						className="flex items-center gap-2 font-medium hover:underline transition-colors decoration-zinc-400"
					>
						<span className="truncate">{run.name}</span>
						{isSubscribed && (
							<span className="relative flex h-2 w-2">
								<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
								<span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
							</span>
						)}
					</Link>
					<div className="flex items-center gap-2">
						<Badge
							variant="secondary"
							className="h-5 px-1.5 text-[10px] bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400 font-normal"
						>
							{run.actorName}
						</Badge>
					</div>
				</div>
			</TableCell>
			<TableCell>
				<RunStatusBadge status={run.status} />
			</TableCell>
			<TableCell className="hidden md:table-cell">
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<a
								href={`https://console.apify.com/actors/runs/${run.runId}#output`}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-zinc-200 bg-zinc-50 text-zinc-600 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800"
							>
								<ExternalLink className="h-4 w-4" />
							</a>
						</TooltipTrigger>
						<TooltipContent>
							<p>Ver en Apify</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</TableCell>
			<TableCell className="text-right tabular-nums">
				<div className="flex flex-col">
					<span className="font-semibold text-zinc-900 dark:text-zinc-100">
						{run.resultCount.toLocaleString()}
					</span>
					<span className="text-[10px] font-medium text-zinc-500 uppercase">
						leads
					</span>
				</div>
			</TableCell>
			<TableCell className="hidden lg:table-cell">
				<div className="flex flex-col text-xs text-zinc-500">
					<span>
						{formatDistanceToNow(new Date(run.createdAt), {
							addSuffix: true,
							locale: es,
						})}
					</span>
				</div>
			</TableCell>
			<TableCell className="hidden md:table-cell">
				{run.user ? (
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<div className="flex items-center gap-2">
									<Avatar className="h-7 w-7">
										<AvatarFallback className="bg-zinc-200 text-zinc-700 text-xs font-medium dark:bg-zinc-700 dark:text-zinc-300">
											{getInitials(run.user.name, run.user.email)}
										</AvatarFallback>
									</Avatar>
								</div>
							</TooltipTrigger>
							<TooltipContent>
								<p>{run.user.name || run.user.email}</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				) : (
					<span className="text-xs text-zinc-400">—</span>
				)}
			</TableCell>
			<TableCell className="text-right">
				<div className="flex items-center justify-end gap-1">
					{showPlayButton && (
						<Button
							size="icon"
							variant="ghost"
							onClick={handlePlay}
							disabled={isLoading}
							className="h-8 w-8 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
							title={
								run.status === RunStatus.FAILED
									? 'Reiniciar ejecución'
									: 'Iniciar ejecución'
							}
						>
							<Play className="h-4 w-4 fill-current" />
						</Button>
					)}
					{showPauseButton && (
						<Button
							size="icon"
							variant="ghost"
							onClick={handlePause}
							disabled={isLoading}
							className="h-8 w-8 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
							title="Pausar ejecución"
						>
							<Pause className="h-4 w-4 fill-current" />
						</Button>
					)}

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								size="icon"
								variant="ghost"
								disabled={isLoading}
								className="h-8 w-8 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
							>
								<MoreHorizontal className="h-4 w-4" />
								<span className="sr-only">Menú</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-40">
							<DropdownMenuItem asChild>
								<Link href={`/runs/${run.id}`}>Ver detalles</Link>
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								onClick={handleDelete}
								className="text-red-600 focus:text-red-600 dark:text-red-400"
							>
								<Trash2 className="mr-2 h-4 w-4" />
								Eliminar
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</TableCell>
		</TableRow>
	)
}

/**
 * Table component that displays a list of runs
 * Shows RunName, Status, Apify, Results, and Date columns
 */
export function RunsTable({ runs }: RunsTableProps) {
	if (runs.length === 0) {
		return (
			<div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-dashed border-zinc-200 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-900/50">
				<div className="rounded-full bg-zinc-100 p-4 dark:bg-zinc-800">
					<Play className="h-8 w-8 text-zinc-400" />
				</div>
				<h3 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
					No se encontraron ejecuciones
				</h3>
				<p className="mt-2 text-center text-sm text-zinc-500 max-w-xs">
					Parece que aún no has creado ninguna ejecución. Comienza creando una
					nueva para verla aquí.
				</p>
			</div>
		)
	}

	return (
		<div className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 overflow-hidden shadow-sm">
			<Table>
				<TableHeader className="bg-zinc-50/50 dark:bg-zinc-900/50">
					<TableRow className="hover:bg-transparent border-zinc-200 dark:border-zinc-800">
						<TableHead className="font-semibold text-zinc-900 dark:text-zinc-100">
							Nombre de Ejecución
						</TableHead>
						<TableHead className="font-semibold text-zinc-900 dark:text-zinc-100">
							Estado
						</TableHead>
						<TableHead className="hidden md:table-cell font-semibold text-zinc-900 dark:text-zinc-100">
							Apify
						</TableHead>
						<TableHead className="text-right font-semibold text-zinc-900 dark:text-zinc-100">
							Resultados
						</TableHead>
						<TableHead className="hidden lg:table-cell font-semibold text-zinc-900 dark:text-zinc-100">
							Fecha
						</TableHead>
						<TableHead className="hidden md:table-cell font-semibold text-zinc-900 dark:text-zinc-100">
							Autor
						</TableHead>
						<TableHead className="text-right font-semibold text-zinc-900 dark:text-zinc-100">
							Acciones
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{runs.map((run) => (
						<RunTableRow key={run.id} run={run} />
					))}
				</TableBody>
			</Table>
		</div>
	)
}
