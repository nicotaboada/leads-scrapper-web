'use client'

/**
 * Lead Edit Modal Component
 *
 * Modal for editing lead status and contacted channels for a contact.
 * Includes status selector and channel toggles.
 */

import { Users } from 'lucide-react'
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
import { Label } from 'components/ui/label'
import { ContactChannelsFormField } from './contact-channels-form-field'
import { LeadStatusFormField } from './lead-status-form-field'
import { useUpdateCompany } from '../hooks/use-update-company'
import { type ContactChannel, LeadStatus } from '../types'

interface LeadEditModalProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	contactId: string
	currentStatus: LeadStatus
	currentChannels: ContactChannel[]
	onLeadChanged?: () => void
}

export function LeadEditModal({
	open,
	onOpenChange,
	contactId,
	currentStatus,
	currentChannels,
	onLeadChanged,
}: LeadEditModalProps) {
	const [leadStatus, setLeadStatus] = useState<LeadStatus>(currentStatus)
	const [contactedChannels, setContactedChannels] =
		useState<ContactChannel[]>(currentChannels)

	const { updateCompany, loading } = useUpdateCompany()

	// Reset form when modal opens or when current values change
	useEffect(() => {
		if (open) {
			setLeadStatus(currentStatus)
			setContactedChannels(currentChannels)
		}
	}, [open, currentStatus, currentChannels])

	async function handleSubmit(): Promise<void> {
		const result = await updateCompany(contactId, {
			leadStatus,
			contactedChannels,
		})
		if (result) {
			onOpenChange(false)
			onLeadChanged?.()
		}
	}

	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent className="max-w-[400px] border-none shadow-lg">
				<AlertDialogHeader className="pb-2">
					<AlertDialogTitle className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
						<Users className="size-6" />
						Editar Lead
					</AlertDialogTitle>
				</AlertDialogHeader>

				<div className="space-y-6 py-2">
					{/* Lead Status */}
					<div className="space-y-2.5">
						<Label className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Estado</Label>
						<div className="flex">
							<LeadStatusFormField
								value={leadStatus}
								onChange={setLeadStatus}
								disabled={loading}
							/>
						</div>
					</div>

					{/* Contacted Channels */}
					<div className="space-y-2.5">
						<Label className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Canales contactados</Label>
						<ContactChannelsFormField
							value={contactedChannels}
							onChange={setContactedChannels}
							disabled={loading}
						/>
					</div>
				</div>

				<AlertDialogFooter className="mt-4 gap-3 sm:flex-row">
					<AlertDialogCancel
						disabled={loading}
						className="flex-1 rounded-xl border-zinc-200 font-semibold text-zinc-900 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-100 sm:flex-none"
					>
						Cancelar
					</AlertDialogCancel>
					<Button
						onClick={handleSubmit}
						disabled={loading}
						className="flex-1 rounded-xl bg-zinc-900 font-semibold text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 sm:flex-none"
					>
						{loading ? 'Guardando...' : 'Guardar'}
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

