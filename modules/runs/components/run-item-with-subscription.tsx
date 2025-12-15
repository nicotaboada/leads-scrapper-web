'use client'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { usePlayRun } from '../hooks/use-play-run'
import { useRunSubscription } from '../hooks/use-run-subscription'
import type { Run, RunStatus } from '../types/run'

interface RunItemWithSubscriptionProps {
	run: Run
	onRunUpdate?: (run: Run) => void
}

/**
 * Example component showing how to use playRun and subscription together
 */
export function RunItemWithSubscription({
	run: initialRun,
	onRunUpdate,
}: RunItemWithSubscriptionProps) {
	const [run, setRun] = useState(initialRun)
	const [isSubscribed, setIsSubscribed] = useState(false)

	const { playRun, loading: playLoading } = usePlayRun()

	// Subscribe to run status changes
	const { run: subscribedRun } = useRunSubscription({
		runId: run.id,
		enabled: isSubscribed,
		onStatusChange: (updatedRun) => {
			console.log('Run status changed:', updatedRun.status)
			toast.info(`Run status: ${updatedRun.status}`)
			onRunUpdate?.(updatedRun)

			// Stop subscription when run is finished
			if (updatedRun.status === 'SUCCEEDED' || updatedRun.status === 'FAILED') {
				setIsSubscribed(false)
			}
		},
	})

	// Update local run state when subscription receives updates
	useEffect(() => {
		if (subscribedRun) {
			setRun(subscribedRun)
		}
	}, [subscribedRun])

	const handlePlay = async () => {
		try {
			// Start the run
			const updatedRun = await playRun(run.id)
			if (updatedRun) {
				setRun(updatedRun)
				// Start subscription after playing
				setIsSubscribed(true)
				toast.success('Run started successfully!')
			}
		} catch (error) {
			toast.error('Failed to start run')
			console.error(error)
		}
	}

	const getStatusColor = (status: RunStatus) => {
		switch (status) {
			case 'PAUSED':
				return 'text-gray-500'
			case 'PENDING':
				return 'text-yellow-500'
			case 'RUNNING':
				return 'text-blue-500 animate-pulse'
			case 'SUCCEEDED':
				return 'text-green-500'
			case 'FAILED':
				return 'text-red-500'
			default:
				return 'text-gray-500'
		}
	}

	return (
		<div className="space-y-2 rounded-lg border p-4">
			<div className="flex items-center justify-between">
				<div>
					<h3 className="font-semibold">{run.name}</h3>
					<p className="text-muted-foreground text-sm">{run.actorName}</p>
				</div>
				<div className="flex items-center gap-2">
					<span className={`text-sm font-medium ${getStatusColor(run.status)}`}>
						{run.status}
					</span>
					{run.status === 'PAUSED' && (
						<Button onClick={handlePlay} disabled={playLoading} size="sm">
							{playLoading ? 'Starting...' : 'Play'}
						</Button>
					)}
				</div>
			</div>

			<div className="text-muted-foreground text-sm">
				<p>Results: {run.resultCount}</p>
				{run.runId && <p className="text-xs">Apify Run: {run.runId}</p>}
				{isSubscribed && (
					<p className="text-xs text-blue-500">🔴 Live updates active</p>
				)}
			</div>
		</div>
	)
}
