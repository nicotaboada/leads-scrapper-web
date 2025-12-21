'use client'

/**
 * Person Detail Component
 *
 * Displays detailed information for a Person contact type
 */

import { Linkedin, Mail, Phone, User } from 'lucide-react'
import { Avatar, AvatarFallback } from 'components/ui/avatar'
import { Card, CardContent, CardHeader } from 'components/ui/card'
import { Skeleton } from 'components/ui/skeleton'
import { getPersonInitials, type PersonContact } from '../types'

interface PersonDetailProps {
	contact: PersonContact
}

export function PersonDetail({ contact }: PersonDetailProps) {
	const fullName = `${contact.firstName} ${contact.lastName}`

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center gap-4">
					<Avatar className="h-16 w-16">
						<AvatarFallback className="bg-gray-100 text-lg text-gray-700">
							{getPersonInitials(contact)}
						</AvatarFallback>
					</Avatar>
					<div>
						<h2 className="text-2xl font-bold">{fullName}</h2>
						{contact.jobTitle && (
							<p className="text-muted-foreground">{contact.jobTitle}</p>
						)}
					</div>
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				{contact.email && (
					<div className="flex items-center gap-3">
						<Mail className="text-muted-foreground h-5 w-5" />
						<a
							href={`mailto:${contact.email}`}
							className="text-blue-600 hover:underline"
						>
							{contact.email}
						</a>
					</div>
				)}

				{contact.celular && (
					<div className="flex items-center gap-3">
						<Phone className="text-muted-foreground h-5 w-5" />
						<a
							href={`tel:${contact.celular}`}
							className="text-blue-600 hover:underline"
						>
							{contact.celular}
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

				{!contact.email && !contact.celular && !contact.linkedinUrl && (
					<p className="text-muted-foreground">
						No hay información de contacto disponible.
					</p>
				)}
			</CardContent>
		</Card>
	)
}

export function PersonDetailSkeleton() {
	return (
		<Card>
			<CardHeader>
				<div className="flex items-center gap-4">
					<Skeleton className="h-16 w-16 rounded-full" />
					<div className="space-y-2">
						<Skeleton className="h-8 w-48" />
						<Skeleton className="h-4 w-32" />
					</div>
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex items-center gap-3">
					<Skeleton className="h-5 w-5" />
					<Skeleton className="h-4 w-48" />
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
