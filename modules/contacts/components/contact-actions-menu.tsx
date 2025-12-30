'use client'

/**
 * Contact Actions Menu Component
 *
 * Dropdown menu with Edit and Delete actions for a contact
 */

import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { Button } from 'components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from 'components/ui/dropdown-menu'
import type { Contact } from '../types'

interface ContactActionsMenuProps {
	contact: Contact
	onEdit: (contact: Contact) => void
	onDelete: (contact: Contact) => void
}

export function ContactActionsMenu({
	contact,
	onEdit,
	onDelete,
}: ContactActionsMenuProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="h-8 w-8 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
					onClick={(e) => e.stopPropagation()}
				>
					<MoreHorizontal className="h-4 w-4" />
					<span className="sr-only">Abrir menú</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem
					onClick={(e) => {
						e.stopPropagation()
						onEdit(contact)
					}}
					className="cursor-pointer"
				>
					<Pencil className="mr-2 h-4 w-4" />
					Editar
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={(e) => {
						e.stopPropagation()
						onDelete(contact)
					}}
					className="cursor-pointer text-destructive focus:text-destructive"
				>
					<Trash2 className="mr-2 h-4 w-4" />
					Eliminar
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

