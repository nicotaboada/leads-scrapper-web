'use client'

import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { Button } from 'components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from 'components/ui/dropdown-menu'
import type { Tag } from '../types'

interface TagActionsMenuProps {
	tag: Tag
	onEdit: (tag: Tag) => void
	onDelete: (tag: Tag) => void
}

/**
 * Dropdown menu with edit and delete actions for a tag
 */
export function TagActionsMenu({ tag, onEdit, onDelete }: TagActionsMenuProps) {
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
						onEdit(tag)
					}}
					className="cursor-pointer"
				>
					<Pencil className="mr-2 h-4 w-4" />
					Editar
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={(e) => {
						e.stopPropagation()
						onDelete(tag)
					}}
					className="text-destructive focus:text-destructive cursor-pointer"
				>
					<Trash2 className="mr-2 h-4 w-4" />
					Eliminar
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
