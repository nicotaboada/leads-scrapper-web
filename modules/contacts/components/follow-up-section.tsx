'use client'

/**
 * Follow-up Section Component
 *
 * Displays the follow-up information in the contact sidebar.
 * Shows either an "Add follow-up" button or the existing follow-up details.
 */

import { useState } from 'react'
import { AlertCircle, Check, Clock, Pencil } from 'lucide-react'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import { Badge } from 'components/ui/badge'
import { Button } from 'components/ui/button'
import { cn } from '@/lib/utils/merge'
import { useCompleteFollowUp } from '../hooks/use-complete-follow-up'
import { FollowUpModal } from './follow-up-modal'
import { type FollowUp, isFollowUpOverdue } from '../types'

dayjs.locale('es')

interface FollowUpSectionProps {
	contactId: string
	followUp?: FollowUp
	onFollowUpChanged?: () => void
}

/**
 * Format date as DD/MM/YYYY
 */
function formatDate(dueDate: string): string {
	return dayjs(dueDate).format('DD/MM/YYYY')
}

export function FollowUpSection({
	contactId,
	followUp,
	onFollowUpChanged,
}: FollowUpSectionProps) {
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
		<div className="py-2">
			{!followUp ? (
				// No follow-up state
				<>
					{/* Header row with button */}
					<div className="flex items-center justify-between gap-2 mb-2">
						<h3 className="text-sm font-semibold">Follow-up</h3>
						<Button
							variant="outline"
							size="sm"
							className="h-7 text-xs px-2"
							onClick={() => setIsModalOpen(true)}
						>
							Agregar follow-up
						</Button>
					</div>
					{/* Empty state message */}
					<p className="text-sm text-muted-foreground">
						Sin follow-ups pendientes
					</p>
				</>
			) : (
				// Has follow-up state
				<>
					{/* Header row: Title + Badge + Actions */}
					<div className="mb-2 flex items-center justify-between gap-2">
						<div className="flex items-center gap-2">
							<h3 className="text-sm font-semibold">Follow-up</h3>
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
						<div className="flex items-center gap-0.5">
							<Button
								variant="ghost"
								size="sm"
								className="size-7 p-0"
								onClick={handleComplete}
								disabled={completeLoading}
								title="Marcar como hecho"
							>
								<Check className="size-3.5" />
							</Button>
							<Button
								variant="ghost"
								size="sm"
								className="size-7 p-0"
								onClick={() => setIsModalOpen(true)}
								title="Editar follow-up"
							>
								<Pencil className="size-3.5" />
							</Button>
						</div>
					</div>

					{/* Date row */}
					<p className="text-sm font-medium">
						{formatDate(followUp.dueDate)}
					</p>

					{/* Note row */}
					{followUp.note && (
						<p className="text-muted-foreground mt-1 text-sm">
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
		</div>
	)
}
