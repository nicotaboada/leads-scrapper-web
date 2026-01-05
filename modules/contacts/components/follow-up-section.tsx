'use client'

/**
 * Follow-up Section Component
 *
 * Displays the follow-up information in the contact sidebar.
 * Shows either an "Add follow-up" button or the existing follow-up details.
 */

import dayjs from 'dayjs'
import { AlertCircle, Check, Clock, Pencil } from 'lucide-react'
import { useState } from 'react'
import 'dayjs/locale/es'
import { cn } from '@/lib/utils/merge'
import { Badge } from 'components/ui/badge'
import { Button } from 'components/ui/button'
import { FollowUpModal } from './follow-up-modal'
import { useCompleteFollowUp } from '../hooks/use-complete-follow-up'
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
		<div className="py-4">
			{!followUp ? (
				// No follow-up state
				<>
					{/* Header row with button */}
					<div className="mb-4 flex items-center justify-between gap-2">
						<h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
							Follow-up
						</h3>
						<Button
							variant="outline"
							size="sm"
							className="h-7 rounded-lg border-zinc-200 px-2 text-[11px] font-semibold text-zinc-900 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-900"
							onClick={() => setIsModalOpen(true)}
						>
							Agregar follow-up
						</Button>
					</div>
					{/* Empty state message */}
					<p className="text-sm text-zinc-400 italic">
						Sin follow-ups pendientes
					</p>
				</>
			) : (
				// Has follow-up state
				<>
					{/* Header row: Title + Badge + Actions */}
					<div className="mb-4 flex items-center justify-between gap-2">
						<div className="flex items-center gap-2">
							<h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
								Follow-up
							</h3>
							<Badge
								variant={isOverdue ? 'destructive' : 'secondary'}
								className={cn(
									'gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-bold tracking-wider uppercase',
									!isOverdue &&
										'bg-zinc-100 text-zinc-600 hover:bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-400'
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
								className="size-7 p-0 text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400"
								onClick={handleComplete}
								disabled={completeLoading}
								title="Marcar como hecho"
							>
								<Check className="size-3.5" />
							</Button>
							<Button
								variant="ghost"
								size="sm"
								className="size-7 p-0 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
								onClick={() => setIsModalOpen(true)}
								title="Editar follow-up"
							>
								<Pencil className="size-3.5" />
							</Button>
						</div>
					</div>

					<div className="space-y-0.5 divide-y divide-zinc-100 dark:divide-zinc-800">
						{/* Date Row */}
						<div className="flex items-start gap-3 py-3 transition-colors hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50">
							<div className="mt-0.5 shrink-0 text-zinc-400 dark:text-zinc-500">
								<Clock className="size-4" />
							</div>
							<div className="min-w-0 flex-1">
								<p className="text-[10px] font-medium text-zinc-500 uppercase dark:text-zinc-400">
									Fecha de vencimiento
								</p>
								<p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
									{formatDate(followUp.dueDate)}
								</p>
							</div>
						</div>

						{/* Note Row */}
						{followUp.note && (
							<div className="flex items-start gap-3 py-3 transition-colors hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50">
								<div className="mt-0.5 shrink-0 text-zinc-400 dark:text-zinc-500">
									<AlertCircle className="size-4" />
								</div>
								<div className="min-w-0 flex-1">
									<p className="text-[10px] font-medium text-zinc-500 uppercase dark:text-zinc-400">
										Nota
									</p>
									<p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
										{followUp.note}
									</p>
								</div>
							</div>
						)}
					</div>
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
