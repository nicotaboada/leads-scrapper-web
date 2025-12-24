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
			<AlertDialogContent className="sm:max-w-md">
				<AlertDialogHeader>
					<AlertDialogTitle className="flex items-center gap-2">
						<Users className="size-5" />
						Editar Lead
					</AlertDialogTitle>
				</AlertDialogHeader>

				<div className="space-y-4 py-4">
					{/* Lead Status */}
					<div className="space-y-2">
						<Label>Estado</Label>
						<div className="flex">
							<LeadStatusFormField
								value={leadStatus}
								onChange={setLeadStatus}
								disabled={loading}
							/>
						</div>
					</div>

					{/* Contacted Channels */}
					<div className="space-y-2">
						<Label>Canales contactados</Label>
						<ContactChannelsFormField
							value={contactedChannels}
							onChange={setContactedChannels}
							disabled={loading}
						/>
					</div>
				</div>

				<AlertDialogFooter className="flex-col gap-2 sm:flex-row">
					<div className="flex flex-1 gap-2 sm:justify-end">
						<AlertDialogCancel disabled={loading} className="flex-1 sm:flex-none">
							Cancelar
						</AlertDialogCancel>
						<Button
							onClick={handleSubmit}
							disabled={loading}
							className="flex-1 sm:flex-none"
						>
							{loading ? 'Guardando...' : 'Guardar'}
						</Button>
					</div>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

