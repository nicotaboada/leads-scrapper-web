'use client'

/**
 * About Company Section Component
 *
 * Displays company information fields in a structured "About this company" section.
 * Shows emails, WhatsApp, and LinkedIn information.
 */

import { Globe, Linkedin, Mail, MapPin, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import type { CompanyContact } from '../types'
import { buildWhatsAppUrl } from '../utils/phone'

interface AboutCompanySectionProps {
	contact: CompanyContact
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
						className="text-sm break-all text-blue-600 hover:underline"
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

export function AboutCompanySection({ contact }: AboutCompanySectionProps) {
	const hasAnyInfo =
		contact.companyEmails.length > 0 ||
		contact.whatsapp ||
		contact.website ||
		contact.city ||
		contact.linkedinUrl

	if (!hasAnyInfo) {
		return (
			<div className="py-4">
				<h3 className="mb-3 text-sm font-semibold">About this company</h3>
				<p className="text-muted-foreground text-sm">
					No hay información de la empresa disponible.
				</p>
			</div>
		)
	}

	return (
		<div className="py-4">
			<h3 className="mb-2 text-sm font-semibold">About this company</h3>
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
