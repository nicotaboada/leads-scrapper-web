'use client'

/**
 * Follow-up Card Component
 *
 * Displays the follow-up information in a card format for the Overview tab.
 * Shows status badge, date, relative time, and actions.
 */

import { AlertCircle, Calendar, Check, Clock, Pencil } from 'lucide-react'
import { useState } from 'react'

import { cn } from '@/lib/utils/merge'
import { Badge } from 'components/ui/badge'
import { Button } from 'components/ui/button'
import { Card } from 'components/ui/card'
import { EmptyState } from 'components/common/empty-state'
import { FollowUpModal } from './follow-up-modal'
import { useCompleteFollowUp } from '../hooks/use-complete-follow-up'
import { type FollowUp, formatFollowUpDate, isFollowUpOverdue } from '../types'

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
		<Card className="p-6 border-zinc-200 shadow-sm dark:border-zinc-800">
			{/* Content */}
			{!followUp ? (
				// No follow-up state
				<div className="space-y-4">
					{/* Header row with title */}
					<div className="flex items-center justify-between gap-2">
						<h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Follow-up</h3>
						<Button
							variant="outline"
							size="sm"
							onClick={() => setIsModalOpen(true)}
							className="h-8 border-zinc-200 text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
						>
							Agregar follow-up
						</Button>
					</div>
					<EmptyState
						icon={Calendar}
						title="Sin follow-ups pendientes"
						description="Agrega un recordatorio para volver a contactar a este cliente."
						className="py-6"
					/>
				</div>
			) : (
				// Has follow-up state
				<div className="space-y-4">
					{/* Header row: Title + Badge + Actions */}
					<div className="flex items-center justify-between gap-2">
						<div className="flex items-center gap-2">
							<h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Follow-up</h3>
							<Badge
								variant={isOverdue ? 'destructive' : 'secondary'}
								className={cn(
									'gap-1 px-1.5 py-0.5 text-[10px] font-bold uppercase',
									!isOverdue && 'bg-zinc-100 text-zinc-600 hover:bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-400'
								)}
							>
								{isOverdue ? (
									<>
										<AlertCircle className="size-3" />
										Vencido
									</>
								) : (
									<>
										<Clock className="size-3" />
										Pendiente
									</>
								)}
							</Badge>
						</div>
						<div className="flex items-center gap-1">
							<Button
								variant="ghost"
								size="sm"
								className="size-8 p-0 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
								onClick={handleComplete}
								disabled={completeLoading}
								title="Marcar como hecho"
							>
								<Check className="size-4" />
							</Button>
							<Button
								variant="ghost"
								size="sm"
								className="size-8 p-0 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
								onClick={() => setIsModalOpen(true)}
								title="Editar follow-up"
							>
								<Pencil className="size-4" />
							</Button>
						</div>
					</div>

					{/* Date and Note container */}
					<div className="rounded-lg border border-zinc-100 bg-zinc-50/50 p-3 dark:border-zinc-800 dark:bg-zinc-900/30">
						{/* Date row */}
						<p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
							{formatFollowUpDate(followUp.dueDate)}
						</p>

						{/* Note */}
						{followUp.note && (
							<p className="mt-1 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
								<span className="font-semibold text-zinc-400 dark:text-zinc-500">Nota:</span> {followUp.note}
							</p>
						)}
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
