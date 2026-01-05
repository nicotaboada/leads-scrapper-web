'use client'

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
import type { Tag } from '../types'

interface DeleteTagDialogProps {
	tag: Tag | null
	open: boolean
	onOpenChange: (open: boolean) => void
	onConfirm: () => void
	loading?: boolean
}

/**
 * Confirmation dialog for deleting a tag
 */
export function DeleteTagDialog({
	tag,
	open,
	onOpenChange,
	onConfirm,
	loading,
}: DeleteTagDialogProps) {
	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>¿Eliminar tag?</AlertDialogTitle>
					<AlertDialogDescription>
						¿Estás seguro de que quieres eliminar el tag{' '}
						<strong>&quot;{tag?.name}&quot;</strong>? Esta acción no se puede
						deshacer.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={loading}>Cancelar</AlertDialogCancel>
					<AlertDialogAction
						onClick={onConfirm}
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
