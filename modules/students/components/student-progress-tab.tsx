'use client'

import { Award, BookOpen, TrendingUp } from 'lucide-react'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from 'components/ui/card'

type StudentProgressTabProps = {
	student: {
		course: string
		progress: number
	}
}

/**
 * Student progress tab component.
 * Displays academic progress and grades of a student.
 *
 * @param props - The component props
 * @returns The student progress tab content
 */
export function StudentProgressTab({ student }: StudentProgressTabProps) {
	// Mock data for modules/subjects
	const modules = [
		{ name: 'HTML & CSS', progress: 100, grade: 9.5 },
		{ name: 'JavaScript', progress: 85, grade: 8.7 },
		{ name: 'React', progress: 60, grade: null },
		{ name: 'Node.js', progress: 30, grade: null },
	]

	return (
		<div className="grid gap-6 md:grid-cols-2">
			{/* Course Progress Card */}
			<Card>
				<CardHeader>
					<CardTitle>Progreso del Curso</CardTitle>
					<CardDescription>Avance general en {student.course}</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div>
						<div className="mb-2 flex items-center justify-between">
							<p className="text-sm font-medium">Progreso Total</p>
							<span className="text-lg font-bold">{student.progress}%</span>
						</div>
						<div className="h-3 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
							<div
								className="h-full bg-blue-600 transition-all dark:bg-blue-500"
								style={{
									width: `${student.progress}%`,
								}}
							/>
						</div>
					</div>

					<div className="grid grid-cols-3 gap-4 border-t pt-4">
						<div className="text-center">
							<TrendingUp className="text-muted-foreground mx-auto mb-1 h-5 w-5" />
							<p className="text-2xl font-bold">8.9</p>
							<p className="text-muted-foreground text-xs">Promedio</p>
						</div>
						<div className="text-center">
							<BookOpen className="text-muted-foreground mx-auto mb-1 h-5 w-5" />
							<p className="text-2xl font-bold">4</p>
							<p className="text-muted-foreground text-xs">Módulos</p>
						</div>
						<div className="text-center">
							<Award className="text-muted-foreground mx-auto mb-1 h-5 w-5" />
							<p className="text-2xl font-bold">2</p>
							<p className="text-muted-foreground text-xs">Aprobados</p>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Modules Progress Card */}
			<Card>
				<CardHeader>
					<CardTitle>Módulos del Curso</CardTitle>
					<CardDescription>Detalle por módulo</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{modules.map((module, index) => (
							<div key={index} className="space-y-2">
								<div className="flex items-center justify-between">
									<span className="text-sm font-medium">{module.name}</span>
									<div className="flex items-center gap-2">
										{module.grade !== null && (
											<span className="text-sm font-semibold text-green-600 dark:text-green-400">
												{module.grade}
											</span>
										)}
										<span className="text-muted-foreground text-xs">
											{module.progress}%
										</span>
									</div>
								</div>
								<div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
									<div
										className={`h-full transition-all ${
											module.progress === 100
												? 'bg-green-600 dark:bg-green-500'
												: 'bg-blue-600 dark:bg-blue-500'
										}`}
										style={{
											width: `${module.progress}%`,
										}}
									/>
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
