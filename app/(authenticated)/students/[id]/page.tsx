'use client'

import { GraduationCap } from 'lucide-react'

import { DetailHeader } from 'components/layouts/detail-header'
import { Button } from 'components/ui/button'
import { CardTabs } from 'components/ui/card-tabs'
import { StudentInfoTab } from 'modules/students/components/student-info-tab'
import { StudentPaymentsTab } from 'modules/students/components/student-payments-tab'
import { StudentProgressTab } from 'modules/students/components/student-progress-tab'

/**
 * Student detail page component.
 * Displays detailed information about a specific student.
 *
 * @param props - The page props containing the student ID
 * @returns The student detail page
 */
export default function StudentDetailPage({
	params: _params,
}: {
	params: { id: string }
}) {
	// TODO: Fetch student data from API/database using the id
	// This is placeholder data for demonstration
	const student = {
		id: '1',
		name: 'Juan Pérez',
		email: 'juan.perez@example.com',
		phone: '+54 11 1234-5678',
		enrollmentDate: '2024-01-15',
		status: 'Activo',
		course: 'Desarrollo Web Full Stack',
		progress: 75,
	}

	return (
		<div className="space-y-6">
			<DetailHeader
				breadcrumbItems={[
					{
						icon: GraduationCap,
						label: 'Estudiantes',
						href: '/students',
					},
					{
						label: student.name,
					},
				]}
				actions={
					<>
						<Button variant="outline">Editar</Button>
						<Button>Agregar Nota</Button>
					</>
				}
			/>
			<CardTabs
				defaultValue="info"
				tabs={[
					{
						value: 'info',
						label: 'Información',
						content: <StudentInfoTab student={student} />,
					},
					{
						value: 'progress',
						label: 'Progreso',
						content: <StudentProgressTab student={student} />,
					},
					{
						value: 'payments',
						label: 'Pagos',
						content: <StudentPaymentsTab />,
					},
				]}
			/>
		</div>
	)
}
