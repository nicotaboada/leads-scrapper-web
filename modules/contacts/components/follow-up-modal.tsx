'use client'

/**
 * Follow-up Modal Component
 *
 * Modal for creating or editing a follow-up for a contact.
 * Includes date picker, note textarea, and quick date shortcuts.
 */

import { CalendarDays } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from 'components/ui/alert-dialog'
import { Button } from 'components/ui/button'
import { DatePicker } from 'components/ui/date-picker'
import { Label } from 'components/ui/label'
import { Textarea } from 'components/ui/textarea'
import { useCreateFollowUp } from '../hooks/use-create-follow-up'
import { useDeleteFollowUp } from '../hooks/use-delete-follow-up'
import { useUpdateFollowUp } from '../hooks/use-update-follow-up'
import type { FollowUp } from '../types'

interface FollowUpModalProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	contactId: string
	existingFollowUp?: FollowUp
	onFollowUpChanged?: () => void
}

/**
 * Get tomorrow's date
 */
function getTomorrowDate(): Date {
	const tomorrow = new Date()
	tomorrow.setDate(tomorrow.getDate() + 1)
	tomorrow.setHours(0, 0, 0, 0)
	return tomorrow
}

/**
 * Get a date X days from now
 */
function getDateFromNow(days: number): Date {
	const date = new Date()
	date.setDate(date.getDate() + days)
	date.setHours(0, 0, 0, 0)
	return date
}

export function FollowUpModal({
	open,
	onOpenChange,
	contactId,
	existingFollowUp,
	onFollowUpChanged,
}: FollowUpModalProps) {
	const [dueDate, setDueDate] = useState<Date | undefined>(getTomorrowDate())
	const [note, setNote] = useState('')

	const { createFollowUp, loading: createLoading } = useCreateFollowUp()
	const { updateFollowUp, loading: updateLoading } = useUpdateFollowUp()
	const { deleteFollowUp, loading: deleteLoading } = useDeleteFollowUp()

	const isEditMode = !!existingFollowUp
	const loading = createLoading || updateLoading || deleteLoading

	// Reset form when modal opens/closes or when editing different follow-up
	useEffect(() => {
		if (open) {
			if (existingFollowUp) {
				setDueDate(new Date(existingFollowUp.dueDate))
				setNote(existingFollowUp.note ?? '')
			} else {
				setDueDate(getTomorrowDate())
				setNote('')
			}
		}
	}, [open, existingFollowUp])

	async function handleSubmit(): Promise<void> {
		if (!dueDate) return

		if (isEditMode && existingFollowUp) {
			const result = await updateFollowUp(existingFollowUp.id, {
				dueDate: dueDate.toISOString(),
				note: note.trim() || undefined,
			})
			if (result) {
				onOpenChange(false)
				onFollowUpChanged?.()
			}
		} else {
			const result = await createFollowUp({
				contactId,
				dueDate: dueDate.toISOString(),
				note: note.trim() || undefined,
			})
			if (result) {
				onOpenChange(false)
				onFollowUpChanged?.()
			}
		}
	}

	async function handleDelete(): Promise<void> {
		if (!existingFollowUp) return
		const success = await deleteFollowUp(existingFollowUp.id)
		if (success) {
			onOpenChange(false)
			onFollowUpChanged?.()
		}
	}

	function handleDateShortcut(days: number): void {
		setDueDate(getDateFromNow(days))
	}

	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent className="sm:max-w-md">
				<AlertDialogHeader>
					<AlertDialogTitle className="flex items-center gap-2">
						<CalendarDays className="size-5" />
						{isEditMode ? 'Editar Follow-up' : 'Agregar Follow-up'}
					</AlertDialogTitle>
				</AlertDialogHeader>

				<div className="space-y-4 py-4">
					{/* Date Picker */}
					<div className="space-y-2">
						<Label>Fecha de vencimiento</Label>
						<DatePicker
							date={dueDate}
							onDateChange={setDueDate}
							placeholder="Seleccionar fecha"
							minDate={getTomorrowDate()}
						/>
					</div>

					{/* Date Shortcuts */}
					<div className="flex flex-wrap gap-2">
						<Button
							type="button"
							variant="outline"
							size="sm"
							onClick={() => handleDateShortcut(1)}
						>
							Mañana
						</Button>
						<Button
							type="button"
							variant="outline"
							size="sm"
							onClick={() => handleDateShortcut(7)}
						>
							En 1 semana
						</Button>
						<Button
							type="button"
							variant="outline"
							size="sm"
							onClick={() => handleDateShortcut(30)}
						>
							En 1 mes
						</Button>
					</div>

					{/* Note Input */}
					<div className="space-y-2">
						<Label htmlFor="note">Nota (opcional)</Label>
						<Textarea
							id="note"
							placeholder="Ej: Llamar para confirmar reunión..."
							value={note}
							onChange={(e) => setNote(e.target.value)}
							rows={3}
							maxLength={500}
							className="resize-none"
						/>
						<p className="text-muted-foreground text-right text-xs">
							{note.length}/500
						</p>
					</div>
				</div>

				<AlertDialogFooter className="flex-col gap-2 sm:flex-row">
					{isEditMode && (
						<Button
							type="button"
							variant="destructive"
							onClick={handleDelete}
							disabled={loading}
							className="w-full sm:w-auto"
						>
							Eliminar
						</Button>
					)}
					<div className="flex flex-1 gap-2 sm:justify-end">
						<AlertDialogCancel
							disabled={loading}
							className="flex-1 sm:flex-none"
						>
							Cancelar
						</AlertDialogCancel>
						<Button
							onClick={handleSubmit}
							disabled={!dueDate || loading}
							className="flex-1 sm:flex-none"
						>
							{loading ? 'Guardando...' : isEditMode ? 'Guardar' : 'Crear'}
						</Button>
					</div>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
