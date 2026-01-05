'use client'

/**
 * Company Action Buttons Component
 *
 * A row of action buttons for quick company interactions:
 * WhatsApp, Email, LinkedIn, and a More menu with Delete option.
 */

import {
	Linkedin,
	Mail,
	MessageCircle,
	MoreHorizontal,
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
import type { CompanyContact } from '../types'
import { buildWhatsAppUrl, isValidPhoneForWhatsApp } from '../utils/phone'

interface CompanyActionButtonsProps {
	contact: CompanyContact
	onDelete: () => void
}

export function CompanyActionButtons({
	contact,
	onDelete,
}: CompanyActionButtonsProps) {
	const hasWhatsApp = isValidPhoneForWhatsApp(contact.whatsapp)
	const hasEmail = contact.companyEmails.length > 0
	const hasLinkedIn = Boolean(contact.linkedinUrl)
	const primaryEmail = contact.companyEmails[0]

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
								href={buildWhatsAppUrl(contact.whatsapp!)}
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
							<a href={`mailto:${primaryEmail}`}>
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
					<DropdownMenuItem variant="destructive" onClick={onDelete}>
						<Trash2 className="size-4" />
						Eliminar empresa
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}
