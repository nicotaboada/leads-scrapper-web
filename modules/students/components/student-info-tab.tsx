'use client'

import { CalendarIcon, MailIcon, PhoneIcon } from 'lucide-react'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from 'components/ui/card'

type StudentInfoTabProps = {
	student: {
		email: string
		phone: string
		enrollmentDate: string
		status: string
		course: string
	}
}

/**
 * Student information tab component.
 * Displays personal and academic information of a student.
 *
 * @param props - The component props
 * @returns The student info tab content
 */
export function StudentInfoTab({ student }: StudentInfoTabProps) {
	return (
		<div className="grid gap-6 md:grid-cols-2">
			{/* Personal Information Card */}
			<Card>
				<CardHeader>
					<CardTitle>Información Personal</CardTitle>
					<CardDescription>Datos básicos del estudiante</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center gap-3">
						<MailIcon className="text-muted-foreground h-5 w-5" />
						<div>
							<p className="text-sm font-medium">Email</p>
							<p className="text-muted-foreground text-sm">{student.email}</p>
						</div>
					</div>

					<div className="flex items-center gap-3">
						<PhoneIcon className="text-muted-foreground h-5 w-5" />
						<div>
							<p className="text-sm font-medium">Teléfono</p>
							<p className="text-muted-foreground text-sm">{student.phone}</p>
						</div>
					</div>

					<div className="flex items-center gap-3">
						<CalendarIcon className="text-muted-foreground h-5 w-5" />
						<div>
							<p className="text-sm font-medium">Fecha de Inscripción</p>
							<p className="text-muted-foreground text-sm">
								{new Date(student.enrollmentDate).toLocaleDateString('es-AR', {
									year: 'numeric',
									month: 'long',
									day: 'numeric',
								})}
							</p>
						</div>
					</div>

					<div>
						<p className="text-sm font-medium">Estado</p>
						<span className="mt-1 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
							{student.status}
						</span>
					</div>
				</CardContent>
			</Card>

			{/* Academic Information Card */}
			<Card>
				<CardHeader>
					<CardTitle>Información Académica</CardTitle>
					<CardDescription>Curso actual y detalles</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div>
						<p className="text-sm font-medium">Curso Actual</p>
						<p className="text-muted-foreground mt-1 text-sm">
							{student.course}
						</p>
					</div>

					<div className="border-t pt-4">
						<p className="mb-2 text-sm font-medium">Información Adicional</p>
						<div className="space-y-2">
							<div className="flex justify-between text-sm">
								<span className="text-muted-foreground">Modalidad</span>
								<span className="font-medium">Presencial</span>
							</div>
							<div className="flex justify-between text-sm">
								<span className="text-muted-foreground">Horario</span>
								<span className="font-medium">
									Lunes y Miércoles 18:00-21:00
								</span>
							</div>
							<div className="flex justify-between text-sm">
								<span className="text-muted-foreground">Sede</span>
								<span className="font-medium">Campus Central</span>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
