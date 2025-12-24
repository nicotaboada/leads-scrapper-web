'use client'

/**
 * About Company Section Component
 *
 * Displays company information fields in a structured "About this company" section.
 * Shows emails, WhatsApp, and LinkedIn information.
 */

import {
	Globe,
	Linkedin,
	Mail,
	MapPin,
	MessageCircle,
	Pencil,
	Tag,
} from 'lucide-react'
import Link from 'next/link'
import { Button } from 'components/ui/button'
import { TagChip } from 'modules/tags/components/tag-chip'
import type { CompanyContact } from '../types'
import { buildWhatsAppUrl } from '../utils/phone'

interface AboutCompanySectionProps {
	contact: CompanyContact
	onEdit?: () => void
}

interface ContactFieldProps {
	icon: React.ReactNode
	label: string
	value: string
	href?: string
	isExternal?: boolean
}

function ContactField({
	icon,
	label,
	value,
	href,
	isExternal,
}: ContactFieldProps) {
	return (
		<div className="flex items-start gap-3 py-2">
			<div className="text-muted-foreground mt-0.5 shrink-0">{icon}</div>
			<div className="min-w-0 flex-1">
				<p className="text-muted-foreground text-xs">{label}</p>
				{href ? (
					<Link
						href={href}
						target={isExternal ? '_blank' : undefined}
						rel={isExternal ? 'noopener noreferrer' : undefined}
						className="text-foreground text-sm break-all hover:underline"
					>
						{value}
					</Link>
				) : (
					<p className="text-sm break-all">{value}</p>
				)}
			</div>
		</div>
	)
}

export function AboutCompanySection({
	contact,
	onEdit,
}: AboutCompanySectionProps) {
	const hasAnyInfo =
		contact.companyEmails.length > 0 ||
		contact.whatsapp ||
		contact.website ||
		contact.city ||
		contact.linkedinUrl

	if (!hasAnyInfo) {
		return (
			<div className="py-4">
				<div className="mb-3 flex items-center justify-between gap-2">
					<h3 className="text-sm font-semibold">About this company</h3>
					{onEdit && (
						<Button
							variant="ghost"
							size="sm"
							className="h-7 w-7 p-0"
							onClick={onEdit}
						>
							<Pencil className="size-3.5" />
						</Button>
					)}
				</div>
				<p className="text-muted-foreground text-sm">
					No hay información de la empresa disponible.
				</p>
			</div>
		)
	}

	return (
		<div className="py-4">
			<div className="mb-2 flex items-center justify-between gap-2">
				<h3 className="text-sm font-semibold">About this company</h3>
				{onEdit && (
					<Button
						variant="ghost"
						size="sm"
						className="h-7 w-7 p-0"
						onClick={onEdit}
					>
						<Pencil className="size-3.5" />
					</Button>
				)}
			</div>
			<div className="divide-border divide-y">
				{/* Show all company emails */}
				{contact.companyEmails.map((email, index) => (
					<ContactField
						key={email}
						icon={<Mail className="size-4" />}
						label={index === 0 ? 'Email principal' : `Email ${index + 1}`}
						value={email}
						href={`mailto:${email}`}
					/>
				))}
				{contact.whatsapp && (
					<ContactField
						icon={<MessageCircle className="size-4" />}
						label="WhatsApp"
						value={contact.whatsapp}
						href={buildWhatsAppUrl(contact.whatsapp)}
						isExternal
					/>
				)}
				{contact.website && (
					<ContactField
						icon={<Globe className="size-4" />}
						label="Sitio web"
						value={contact.website.replace(/^https?:\/\//, '')}
						href={
							contact.website.startsWith('http')
								? contact.website
								: `https://${contact.website}`
						}
						isExternal
					/>
				)}
				{(contact.city || contact.countryCode) && (
					<ContactField
						icon={<MapPin className="size-4" />}
						label="Ubicación"
						value={[contact.city, contact.countryCode]
							.filter(Boolean)
							.join(', ')}
					/>
				)}
				{/* Tags Field */}
				<div className="flex items-start gap-3 py-2">
					<div className="text-muted-foreground mt-0.5 shrink-0">
						<Tag className="size-4" />
					</div>
					<div className="min-w-0 flex-1">
						<p className="text-muted-foreground text-xs">Tags</p>
						<div className="mt-1 flex flex-wrap gap-1.5">
							{!contact.tags || contact.tags.length === 0 ? (
								<span className="text-muted-foreground text-sm">-</span>
							) : (
								contact.tags.map((tag) => (
									<TagChip
										key={tag.id}
										tag={{
											id: tag.id,
											name: tag.name,
											color: tag.color ?? undefined,
										}}
										size="sm"
									/>
								))
							)}
						</div>
					</div>
				</div>
				{contact.linkedinUrl && (
					<ContactField
						icon={<Linkedin className="size-4" />}
						label="LinkedIn"
						value="Ver perfil"
						href={contact.linkedinUrl}
						isExternal
					/>
				)}
			</div>
		</div>
	)
}
