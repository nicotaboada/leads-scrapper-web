'use client'

/**
 * Delete Contact Dialog Component
 *
 * A confirmation dialog for deleting a contact.
 * Shows the contact name and warns about the irreversible action.
 */

import { toast } from 'sonner'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from 'components/ui/alert-dialog'
import { useDeleteContact } from '../hooks/use-delete-contact'
import { type Contact, getContactName } from '../types'

interface DeleteContactDialogProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	contact: Contact
	onContactDeleted?: () => void
}

export function DeleteContactDialog({
	open,
	onOpenChange,
	contact,
	onContactDeleted,
}: DeleteContactDialogProps) {
	const { deleteContact, loading } = useDeleteContact()

	const contactName = getContactName(contact)

	async function handleDelete() {
		try {
			const success = await deleteContact(contact.id)

			if (success) {
				toast.success('Contacto eliminado exitosamente')
				onContactDeleted?.()
				onOpenChange(false)
			} else {
				toast.error('Error al eliminar el contacto')
			}
		} catch (error) {
			toast.error('Error al eliminar el contacto')
			console.error('Error deleting contact:', error)
		}
	}

	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>¿Eliminar contacto?</AlertDialogTitle>
					<AlertDialogDescription>
						Esta acción no se puede deshacer. ¿Estás seguro de que deseas
						eliminar a <span className="font-semibold">{contactName}</span>?
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={loading}>Cancelar</AlertDialogCancel>
					<AlertDialogAction
						onClick={handleDelete}
						disabled={loading}
						className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
					>
						{loading ? 'Eliminando...' : 'Eliminar'}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

