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
		<div className="flex items-start gap-3 py-3 transition-colors hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50">
			<div className="text-zinc-400 mt-0.5 shrink-0 dark:text-zinc-500">{icon}</div>
			<div className="min-w-0 flex-1">
				<p className="text-zinc-500 text-[10px] font-medium uppercase dark:text-zinc-400">{label}</p>
				{href ? (
					<Link
						href={href}
						target={isExternal ? '_blank' : undefined}
						rel={isExternal ? 'noopener noreferrer' : undefined}
						className="text-zinc-900 text-sm break-all font-medium hover:underline dark:text-zinc-100"
					>
						{value}
					</Link>
				) : (
					<p className="text-zinc-900 text-sm break-all font-medium dark:text-zinc-100">{value}</p>
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
					<h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">About this company</h3>
					{onEdit && (
						<Button
							variant="ghost"
							size="sm"
							className="h-7 w-7 p-0 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
							onClick={onEdit}
						>
							<Pencil className="size-3.5" />
						</Button>
					)}
				</div>
				<p className="text-zinc-500 text-sm italic">
					No hay información de la empresa disponible.
				</p>
			</div>
		)
	}

	return (
		<div className="py-4">
			<div className="mb-4 flex items-center justify-between gap-2">
				<h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">About this company</h3>
				{onEdit && (
					<Button
						variant="ghost"
						size="sm"
						className="h-7 w-7 p-0 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
						onClick={onEdit}
					>
						<Pencil className="size-3.5" />
					</Button>
				)}
			</div>
			<div className="divide-zinc-100 space-y-0.5 divide-y dark:divide-zinc-800">
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
				<div className="flex items-start gap-3 py-3 transition-colors hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50">
					<div className="text-zinc-400 mt-0.5 shrink-0 dark:text-zinc-500">
						<Tag className="size-4" />
					</div>
					<div className="min-w-0 flex-1">
						<p className="text-zinc-500 text-[10px] font-medium uppercase dark:text-zinc-400">Tags</p>
						<div className="mt-1.5 flex flex-wrap gap-1.5">
							{!contact.tags || contact.tags.length === 0 ? (
								<span className="text-zinc-400 text-sm italic">-</span>
							) : (
								contact.tags.map((tag) => (
									<TagChip
										key={tag.id}
										tag={{
											id: tag.id,
											name: tag.name,
											color: null, // Removing the invalid "zinc" value
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
