'use client'

import { MoreHorizontal, Pause, Play, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
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
import { RunStatusBadge } from './run-status-badge'
import { useDeleteRun } from '../hooks/use-delete-run'
import { usePauseRun } from '../hooks/use-pause-run'
import { usePlayRun } from '../hooks/use-play-run'
import { useRunSubscription } from '../hooks/use-run-subscription'
import { Run, RunStatus } from '../types/run'

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
				toast.success(`Run completed: ${updatedRun.name}`, {
					description: `Status: ${updatedRun.status} | Results: ${updatedRun.resultCount}`,
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
				toast.success(`${updatedRun.name} started successfully`)
			}
		} catch {
			// Revert to original status if failed
			setRun(initialRun)
			setIsSubscribed(false)
			toast.error('Failed to start run')
		}
	}

	const handlePause = async () => {
		try {
			const updatedRun = await pauseRun(run.id)
			console.log('UPDATED RUN', updatedRun)
			if (updatedRun) {
				setRun(updatedRun)
				setIsSubscribed(false)
				toast.success(`${updatedRun.name} paused successfully`)
			}
		} catch {
			toast.error('Failed to pause run')
		}
	}

	const handleDelete = async () => {
		try {
			await deleteRun(run.id)
			toast.success(`${run.name} deleted successfully`)
		} catch {
			toast.error('Failed to delete run')
		}
	}

	// Determine which button to show based on status
	const showPlayButton =
		run.status === RunStatus.PAUSED || run.status === RunStatus.FAILED
	const showPauseButton =
		run.status === RunStatus.RUNNING || run.status === RunStatus.PENDING
	const isLoading = playLoading || pauseLoading || deleteLoading

	return (
		<TableRow key={run.id}>
			<TableCell className="font-medium">
				<Link
					href={`/runs/${run.id}`}
					className="flex items-center gap-2 hover:underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
				>
					{run.name}
					{isSubscribed && (
						<span className="text-xs text-blue-500" title="Live updates active">
							🔴
						</span>
					)}
				</Link>
			</TableCell>
			<TableCell>
				<RunStatusBadge status={run.status} />
			</TableCell>
			<TableCell>
				<a
					href={`https://console.apify.com/actors/runs/${run.runId}#output`}
					target="_blank"
					rel="noopener noreferrer"
					className="text-blue-600 hover:text-blue-800 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
				>
					{run.runId}
				</a>
			</TableCell>
			<TableCell className="text-muted-foreground text-sm">
				{run.actorName}
			</TableCell>
			<TableCell className="text-right">
				{run.resultCount.toLocaleString()}
			</TableCell>
			<TableCell className="text-center">
				<div className="flex items-center justify-center gap-2">
					{showPlayButton && (
						<Button
							size="sm"
							variant="ghost"
							onClick={handlePlay}
							disabled={isLoading}
							className="h-8 w-8 p-0"
							title={
								run.status === RunStatus.FAILED ? 'Restart run' : 'Start run'
							}
						>
							<Play className="h-4 w-4" />
						</Button>
					)}
					{showPauseButton && (
						<Button
							size="sm"
							variant="ghost"
							onClick={handlePause}
							disabled={isLoading}
							className="h-8 w-8 p-0"
							title="Pause run"
						>
							<Pause className="h-4 w-4" />
						</Button>
					)}
				</div>
			</TableCell>
			<TableCell className="text-center">
				<DropdownMenu>
					<DropdownMenuTrigger
						disabled={isLoading}
						className="bg-background hover:bg-accent mx-auto flex h-8 w-8 cursor-pointer items-center justify-center"
					>
						<MoreHorizontal className="h-4 w-4" />
						<span className="sr-only">Abrir menú de acciones</span>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem
							onClick={handleDelete}
							className="text-destructive"
						>
							<Trash2 className="mr-2 h-4 w-4" />
							Eliminar
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</TableCell>
		</TableRow>
	)
}

/**
 * Table component that displays a list of runs
 * Shows RunName, RunId (as link), Actor, Results, and Status columns
 */
export function RunsTable({ runs }: RunsTableProps) {
	if (runs.length === 0) {
		return (
			<div className="flex min-h-[400px] items-center justify-center rounded-lg border border-dashed">
				<div className="text-center">
					<h3 className="text-lg font-semibold">No runs found</h3>
					<p className="text-muted-foreground mt-2 text-sm">
						Try adjusting your search to find what you&apos;re looking for.
					</p>
				</div>
			</div>
		)
	}

	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Run Name</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Apify URL</TableHead>
						<TableHead>Actor</TableHead>
						<TableHead className="text-right">Results</TableHead>
						<TableHead className="text-center">Actions</TableHead>
						<TableHead className="w-[50px]"></TableHead>
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
