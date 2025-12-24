'use client'

/**
 * Follow-up Card Component
 *
 * Displays the follow-up information in a card format for the Overview tab.
 * Shows status badge, date, relative time, and actions.
 */

import { AlertCircle, Check, Clock, Pencil } from 'lucide-react'
import { useState } from 'react'

import { cn } from '@/lib/utils/merge'
import { Badge } from 'components/ui/badge'
import { Button } from 'components/ui/button'
import { Card } from 'components/ui/card'
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
		<Card className="p-6">
			{/* Content */}
			{!followUp ? (
				// No follow-up state
				<>
					{/* Header row with button */}
					<div className="flex items-center justify-between gap-2">
						<h3 className="text-base font-semibold">Follow-up</h3>
						<Button
							variant="outline"
							size="sm"
							onClick={() => setIsModalOpen(true)}
						>
							Agregar follow-up
						</Button>
					</div>
					{/* Empty state message */}
					<p className="text-muted-foreground text-sm">
						Sin follow-ups pendientes
					</p>
				</>
			) : (
				// Has follow-up state
				<>
					{/* Header row: Title + Badge + Actions */}
					<div className="flex items-center justify-between gap-2">
						<div className="flex items-center gap-2">
							<h3 className="text-base font-semibold">Follow-up</h3>
							<Badge
								variant={isOverdue ? 'destructive' : 'secondary'}
								className={cn(
									'gap-1 px-1.5 py-0.5 text-[11px] font-medium',
									!isOverdue && 'bg-green-100 text-green-700 hover:bg-green-100'
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
								className="size-8 p-0"
								onClick={handleComplete}
								disabled={completeLoading}
								title="Marcar como hecho"
							>
								<Check className="size-4" />
							</Button>
							<Button
								variant="ghost"
								size="sm"
								className="size-8 p-0"
								onClick={() => setIsModalOpen(true)}
								title="Editar follow-up"
							>
								<Pencil className="size-4" />
							</Button>
						</div>
					</div>

					{/* Date row */}
					<p className="text-sm font-medium">
						{formatFollowUpDate(followUp.dueDate)}
					</p>

					{/* Note */}
					{followUp.note && (
						<p className="text-muted-foreground text-sm">
							<span className="font-medium">Nota:</span> {followUp.note}
						</p>
					)}
				</>
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
