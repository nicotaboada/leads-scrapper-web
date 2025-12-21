'use client'

/**
 * About Contact Section Component
 *
 * Displays contact information fields in a structured "About this contact" section.
 * Shows email, phone, LinkedIn, job title, and company information.
 */

import { Briefcase, Building2, Linkedin, Mail, Phone } from 'lucide-react'
import Link from 'next/link'
import { ROUTES } from 'lib/config/routes'
import type { PersonContact } from '../types'

interface AboutContactSectionProps {
	contact: PersonContact
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
	const content = (
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

	return content
}

export function AboutContactSection({ contact }: AboutContactSectionProps) {
	const hasAnyInfo =
		contact.email ||
		contact.celular ||
		contact.linkedinUrl ||
		contact.jobTitle ||
		contact.company

	if (!hasAnyInfo) {
		return (
			<div className="py-4">
				<h3 className="mb-3 text-sm font-semibold">About this contact</h3>
				<p className="text-muted-foreground text-sm">
					No hay información de contacto disponible.
				</p>
			</div>
		)
	}

	return (
		<div className="py-4">
			<h3 className="mb-2 text-sm font-semibold">About this contact</h3>
			<div className="divide-border divide-y">
				{contact.email && (
					<ContactField
						icon={<Mail className="size-4" />}
						label="Email"
						value={contact.email}
						href={`mailto:${contact.email}`}
					/>
				)}
				{contact.celular && (
					<ContactField
						icon={<Phone className="size-4" />}
						label="Teléfono"
						value={contact.celular}
						href={`tel:${contact.celular}`}
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
				{contact.jobTitle && (
					<ContactField
						icon={<Briefcase className="size-4" />}
						label="Cargo"
						value={contact.jobTitle}
					/>
				)}
				{contact.company && (
					<ContactField
						icon={<Building2 className="size-4" />}
						label="Empresa"
						value={contact.company.companyName}
						href={ROUTES.CONTACT_COMPANY_DETAIL(contact.company.id)}
					/>
				)}
			</div>
		</div>
	)
}
