'use client'

/**
 * Contact Action Buttons Component
 *
 * A row of action buttons for quick contact interactions:
 * WhatsApp, Email, LinkedIn, and a More menu with Edit/Delete options.
 */

import {
	Linkedin,
	Mail,
	MessageCircle,
	MoreHorizontal,
	Pencil,
	Trash2,
} from 'lucide-react'
import { Button } from 'components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from 'components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipTrigger } from 'components/ui/tooltip'
import type { PersonContact } from '../types'
import { buildWhatsAppUrl, isValidPhoneForWhatsApp } from '../utils/phone'

interface ContactActionButtonsProps {
	contact: PersonContact
	onEdit: () => void
	onDelete: () => void
}

export function ContactActionButtons({
	contact,
	onEdit,
	onDelete,
}: ContactActionButtonsProps) {
	const hasWhatsApp = isValidPhoneForWhatsApp(contact.celular)
	const hasEmail = Boolean(contact.email)
	const hasLinkedIn = Boolean(contact.linkedinUrl)

	return (
		<div className="flex items-center gap-1">
			{/* WhatsApp Button */}
			{hasWhatsApp && (
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							className="text-muted-foreground hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-950/30"
							asChild
						>
							<a
								href={buildWhatsAppUrl(contact.celular!)}
								target="_blank"
								rel="noopener noreferrer"
							>
								<MessageCircle className="size-5" />
							</a>
						</Button>
					</TooltipTrigger>
					<TooltipContent>Enviar WhatsApp</TooltipContent>
				</Tooltip>
			)}

			{/* Email Button */}
			{hasEmail && (
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							className="text-muted-foreground hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/30"
							asChild
						>
							<a href={`mailto:${contact.email}`}>
								<Mail className="size-5" />
							</a>
						</Button>
					</TooltipTrigger>
					<TooltipContent>Enviar email</TooltipContent>
				</Tooltip>
			)}

			{/* LinkedIn Button */}
			{hasLinkedIn && (
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							className="text-muted-foreground hover:bg-blue-50 hover:text-[#0A66C2] dark:hover:bg-blue-950/30"
							asChild
						>
							<a
								href={contact.linkedinUrl!}
								target="_blank"
								rel="noopener noreferrer"
							>
								<Linkedin className="size-5" />
							</a>
						</Button>
					</TooltipTrigger>
					<TooltipContent>Ver LinkedIn</TooltipContent>
				</Tooltip>
			)}

			{/* More Menu */}
			<DropdownMenu>
				<Tooltip>
					<TooltipTrigger asChild>
						<DropdownMenuTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="text-muted-foreground"
							>
								<MoreHorizontal className="size-5" />
							</Button>
						</DropdownMenuTrigger>
					</TooltipTrigger>
					<TooltipContent>Más opciones</TooltipContent>
				</Tooltip>
				<DropdownMenuContent align="end">
					<DropdownMenuItem onClick={onEdit}>
						<Pencil className="size-4" />
						Editar contacto
					</DropdownMenuItem>
					<DropdownMenuItem variant="destructive" onClick={onDelete}>
						<Trash2 className="size-4" />
						Eliminar contacto
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}
