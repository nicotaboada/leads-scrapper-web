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
import { useUpdatePersonContact } from '../hooks/use-update-person-contact'
import { type ContactChannel, ContactType, LeadStatus } from '../types'

interface LeadEditModalProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	contactId: string
	contactType: ContactType
	currentStatus: LeadStatus
	currentChannels: ContactChannel[]
	onLeadChanged?: () => void
}

export function LeadEditModal({
	open,
	onOpenChange,
	contactId,
	contactType,
	currentStatus,
	currentChannels,
	onLeadChanged,
}: LeadEditModalProps) {
	const [leadStatus, setLeadStatus] = useState<LeadStatus>(currentStatus)
	const [contactedChannels, setContactedChannels] =
		useState<ContactChannel[]>(currentChannels)

	const { updateCompany, loading: companyLoading } = useUpdateCompany()
	const { updatePersonContact, loading: personLoading } =
		useUpdatePersonContact()

	const loading = companyLoading || personLoading

	// Reset form when modal opens or when current values change
	useEffect(() => {
		if (open) {
			setLeadStatus(currentStatus)
			setContactedChannels(currentChannels)
		}
	}, [open, currentStatus, currentChannels])

	async function handleSubmit(): Promise<void> {
		let result: boolean | string | null = null
		if (contactType === ContactType.COMPANY) {
			result = await updateCompany(contactId, {
				leadStatus,
				contactedChannels,
			})
		} else {
			result = await updatePersonContact(contactId, {
				leadStatus,
				contactedChannels,
			})
		}
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
						<Label className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
							Estado
						</Label>
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
						<Label className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
							Canales contactados
						</Label>
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
						className="flex-1 rounded-xl border-zinc-200 font-semibold text-zinc-900 hover:bg-zinc-50 sm:flex-none dark:border-zinc-800 dark:text-zinc-100"
					>
						Cancelar
					</AlertDialogCancel>
					<Button
						onClick={handleSubmit}
						disabled={loading}
						className="flex-1 rounded-xl bg-zinc-900 font-semibold text-zinc-50 hover:bg-zinc-800 sm:flex-none dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
					>
						{loading ? 'Guardando...' : 'Guardar'}
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
