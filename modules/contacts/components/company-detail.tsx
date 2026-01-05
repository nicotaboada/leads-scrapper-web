'use client'

/**
 * Company Detail Component
 *
 * Displays detailed information for a Company contact type
 */

import { Building2, Linkedin, Mail, Phone } from 'lucide-react'
import { Avatar, AvatarFallback } from 'components/ui/avatar'
import { Card, CardContent, CardHeader } from 'components/ui/card'
import { Skeleton } from 'components/ui/skeleton'
import type { CompanyContact } from '../types'

interface CompanyDetailProps {
	contact: CompanyContact
}

export function CompanyDetail({ contact }: CompanyDetailProps) {
	return (
		<Card>
			<CardHeader>
				<div className="flex items-center gap-4">
					<Avatar className="h-16 w-16">
						<AvatarFallback className="bg-blue-100 text-blue-700">
							<Building2 className="h-8 w-8" />
						</AvatarFallback>
					</Avatar>
					<div>
						<h2 className="text-2xl font-bold">{contact.companyName}</h2>
						<p className="text-muted-foreground">Empresa</p>
					</div>
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				{contact.companyEmails.length > 0 && (
					<div className="space-y-2">
						<div className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
							<Mail className="h-4 w-4" />
							Emails
						</div>
						<div className="ml-6 space-y-1">
							{contact.companyEmails.map((email, index) => (
								<a
									key={index}
									href={`mailto:${email}`}
									className="block text-blue-600 hover:underline"
								>
									{email}
								</a>
							))}
						</div>
					</div>
				)}

				{contact.whatsapp && (
					<div className="flex items-center gap-3">
						<Phone className="text-muted-foreground h-5 w-5" />
						<a
							href={`https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`}
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-600 hover:underline"
						>
							{contact.whatsapp}
						</a>
					</div>
				)}

				{contact.linkedinUrl && (
					<div className="flex items-center gap-3">
						<Linkedin className="text-muted-foreground h-5 w-5" />
						<a
							href={contact.linkedinUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-600 hover:underline"
						>
							Ver perfil de LinkedIn
						</a>
					</div>
				)}

				{contact.companyEmails.length === 0 &&
					!contact.whatsapp &&
					!contact.linkedinUrl && (
						<p className="text-muted-foreground">
							No hay información de contacto disponible.
						</p>
					)}
			</CardContent>
		</Card>
	)
}

export function CompanyDetailSkeleton() {
	return (
		<Card>
			<CardHeader>
				<div className="flex items-center gap-4">
					<Skeleton className="h-16 w-16 rounded-full" />
					<div className="space-y-2">
						<Skeleton className="h-8 w-48" />
						<Skeleton className="h-4 w-24" />
					</div>
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-2">
					<Skeleton className="h-4 w-16" />
					<Skeleton className="ml-6 h-4 w-48" />
					<Skeleton className="ml-6 h-4 w-44" />
				</div>
				<div className="flex items-center gap-3">
					<Skeleton className="h-5 w-5" />
					<Skeleton className="h-4 w-36" />
				</div>
				<div className="flex items-center gap-3">
					<Skeleton className="h-5 w-5" />
					<Skeleton className="h-4 w-40" />
				</div>
			</CardContent>
		</Card>
	)
}
