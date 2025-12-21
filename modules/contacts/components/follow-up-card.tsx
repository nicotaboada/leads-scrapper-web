'use client'

/**
 * Follow-up Card Component
 *
 * Displays the follow-up information in a card format for the Overview tab.
 * Shows status badge, date, relative time, and actions.
 */

import { AlertCircle, CalendarDays, Check, Clock, Pencil } from 'lucide-react'
import { useState } from 'react'

import { cn } from '@/lib/utils/merge'
import { Badge } from 'components/ui/badge'
import { Button } from 'components/ui/button'
import { Card } from 'components/ui/card'
import { FollowUpModal } from './follow-up-modal'
import { useCompleteFollowUp } from '../hooks/use-complete-follow-up'
import {
	type FollowUp,
	formatFollowUpDate,
	getFollowUpRelativeTime,
	isFollowUpOverdue,
} from '../types'

interface FollowUpCardProps {
	contactId: string
	followUp?: FollowUp
	onFollowUpChanged?: () => void
}

export function FollowUpCard({
	contactId,
	followUp,
	onFollowUpChanged,
}: FollowUpCardProps) {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const { completeFollowUp, loading: completeLoading } = useCompleteFollowUp()

	const isOverdue = followUp ? isFollowUpOverdue(followUp.dueDate) : false

	async function handleComplete(): Promise<void> {
		if (!followUp) return
		const success = await completeFollowUp(followUp.id)
		if (success) {
			onFollowUpChanged?.()
		}
	}

	return (
		<Card className="p-6">
			{/* Header with pencil */}
			<div className="mb-4 flex items-center justify-between">
				<div className="flex items-center gap-2">
					<CalendarDays className="text-muted-foreground size-5" />
					<h3 className="text-base font-semibold">Follow-up</h3>
				</div>
				{followUp && (
					<Button
						variant="ghost"
						size="sm"
						className="h-8 w-8 p-0"
						onClick={() => setIsModalOpen(true)}
					>
						<Pencil className="size-4" />
					</Button>
				)}
			</div>

			{/* Content */}
			{!followUp ? (
				// No follow-up state
				<div className="space-y-3">
					<p className="text-muted-foreground text-sm">
						Sin follow-up pendiente
					</p>
					<Button
						variant="outline"
						size="sm"
						onClick={() => setIsModalOpen(true)}
					>
						<CalendarDays className="mr-2 size-4" />
						Agregar follow-up
					</Button>
				</div>
			) : (
				// Has follow-up state
				<div className="space-y-4">
					{/* Date row */}
					<div className="flex items-center gap-2">
						<span className="text-lg font-semibold">
							{formatFollowUpDate(followUp.dueDate)}
						</span>
						<span className="text-muted-foreground text-sm">
							({getFollowUpRelativeTime(followUp.dueDate)})
						</span>
					</div>

					{/* Note */}
					{followUp.note && (
						<p className="text-muted-foreground text-sm">
							<span className="font-medium">Nota:</span> {followUp.note}
						</p>
					)}

					{/* Status badge and action */}
					<div className="flex items-center gap-3">
						<Badge
							variant={isOverdue ? 'destructive' : 'secondary'}
							className={cn(
								'gap-1.5 rounded-[0.5rem] px-3 py-1.5 text-sm',
								!isOverdue && 'bg-green-100 text-green-700 hover:bg-green-100'
							)}
						>
							{isOverdue ? (
								<>
									<AlertCircle className="size-4" />
									Vencido
								</>
							) : (
								<>
									<Clock className="size-4" />
									Pendiente
								</>
							)}
						</Badge>
						<button
							type="button"
							onClick={handleComplete}
							disabled={completeLoading}
							className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 text-sm transition-colors disabled:opacity-50"
						>
							<Check className="size-4" />
							{completeLoading ? 'Guardando...' : 'Marcar como hecho'}
						</button>
					</div>
				</div>
			)}

			{/* Modal */}
			<FollowUpModal
				open={isModalOpen}
				onOpenChange={setIsModalOpen}
				contactId={contactId}
				existingFollowUp={followUp}
				onFollowUpChanged={onFollowUpChanged}
			/>
		</Card>
	)
}
