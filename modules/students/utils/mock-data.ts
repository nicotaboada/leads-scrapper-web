/**
 * Mock Data for Students
 *
 * This file contains mock/test data for development and testing purposes
 */

import type { Student } from '../types'

/**
 * Mock students data with varied test cases:
 * - Students with/without email
 * - Students with/without phone
 * - Students with single/multiple courses
 * - Active and inactive students
 */
export const mockStudents: Student[] = [
	// Edge case: Nombre muy largo
	{
		id: 'edge-1',
		firstName: 'María Alejandra',
		lastName: 'Rodríguez Fernández',
		email: 'maria.alejandra.rodriguez.fernandez@institutodeingles.com.ar',
		phone: '+54 11 1234-5678',
		courses: [
			{ id: 'c1', name: 'Inglés Básico' },
			{ id: 'c2', name: 'Conversación Avanzada' },
		],
		status: 'active',
		createdAt: '2024-01-15',
	},
	// Edge case: Cursos con nombres largos
	{
		id: 'edge-2',
		firstName: 'Christopher',
		lastName: 'Montgomery',
		email: 'christopher.montgomery@verylongdomainname.com',
		phone: '+54 11 9876-5432',
		courses: [
			{
				id: 'c-long-1',
				name: 'Business English Professional Certification',
			},
			{
				id: 'c-long-2',
				name: 'Advanced Grammar and Writing Workshop',
			},
			{ id: 'c-long-3', name: 'TOEFL Preparation Course' },
		],
		status: 'active',
		createdAt: '2024-02-20',
	},
	// Edge case: Email extremadamente largo
	{
		id: 'edge-3',
		firstName: 'Anastasia',
		lastName: 'Dimitropoulos',
		email:
			'anastasia.dimitropoulos.estudiante.internacional@universidadnacional.edu.ar',
		phone: '+54 11 2345-6789',
		courses: [
			{ id: 'c3', name: 'Inglés Avanzado' },
			{ id: 'c4', name: 'Conversación' },
		],
		status: 'active',
		createdAt: '2024-03-05',
	},
	// Edge case: Todo largo
	{
		id: 'edge-4',
		firstName: 'Maximiliano Alexander',
		lastName: 'Williamson Henderson',
		email:
			'maximiliano.alexander.williamson.henderson@corporacioninternacional.com.ar',
		phone: '+54 11 3456-7890',
		courses: [
			{
				id: 'c-long-4',
				name: 'International English Language Testing System Preparation',
			},
			{
				id: 'c-long-5',
				name: 'Professional Communication Skills Development',
			},
		],
		status: 'inactive',
		createdAt: '2023-12-10',
	},
	{
		id: '1',
		firstName: 'Juan',
		lastName: 'Pérez',
		email: 'juan.perez@email.com',
		phone: '+54 11 1234-5678',
		courses: [
			{ id: 'c1', name: 'Inglés Básico' },
			{ id: 'c2', name: 'Conversación' },
		],
		status: 'active',
		createdAt: '2024-01-15',
	},
	{
		id: '2',
		firstName: 'María',
		lastName: 'González',
		email: 'maria.gonzalez@email.com',
		courses: [{ id: 'c3', name: 'Inglés Avanzado' }],
		status: 'active',
		createdAt: '2024-02-20',
	},
	{
		id: '3',
		firstName: 'Carlos',
		lastName: 'Rodríguez',
		phone: '+54 11 9876-5432',
		courses: [
			{ id: 'c4', name: 'Inglés Intermedio' },
			{ id: 'c5', name: 'Business English' },
			{ id: 'c6', name: 'TOEFL Prep' },
		],
		status: 'inactive',
		createdAt: '2023-12-10',
	},
	{
		id: '4',
		firstName: 'Ana',
		lastName: 'Martínez',
		email: 'ana.martinez@email.com',
		phone: '+54 11 2345-6789',
		courses: [{ id: 'c1', name: 'Inglés Básico' }],
		status: 'active',
		createdAt: '2024-03-05',
	},
	{
		id: '5',
		firstName: 'Luis',
		lastName: 'García',
		courses: [
			{ id: 'c2', name: 'Conversación' },
			{ id: 'c3', name: 'Inglés Avanzado' },
		],
		status: 'inactive',
		createdAt: '2023-11-20',
	},
	{
		id: '6',
		firstName: 'Laura',
		lastName: 'Fernández',
		email: 'laura.fernandez@email.com',
		phone: '+54 11 3456-7890',
		courses: [
			{ id: 'c7', name: 'Grammar Intensive' },
			{ id: 'c8', name: 'Writing Workshop' },
		],
		status: 'active',
		createdAt: '2024-01-28',
	},
	{
		id: '7',
		firstName: 'Diego',
		lastName: 'López',
		email: 'diego.lopez@email.com',
		courses: [{ id: 'c4', name: 'Inglés Intermedio' }],
		status: 'active',
		createdAt: '2024-02-14',
	},
	{
		id: '8',
		firstName: 'Sofía',
		lastName: 'Romero',
		phone: '+54 11 4567-8901',
		courses: [
			{ id: 'c1', name: 'Inglés Básico' },
			{ id: 'c2', name: 'Conversación' },
			{ id: 'c7', name: 'Grammar Intensive' },
		],
		status: 'active',
		createdAt: '2024-03-10',
	},
	{
		id: '9',
		firstName: 'Miguel',
		lastName: 'Torres',
		email: 'miguel.torres@email.com',
		phone: '+54 11 5678-9012',
		courses: [{ id: 'c5', name: 'Business English' }],
		status: 'inactive',
		createdAt: '2023-10-15',
	},
	{
		id: '10',
		firstName: 'Valentina',
		lastName: 'Sánchez',
		email: 'valentina.sanchez@email.com',
		courses: [
			{ id: 'c3', name: 'Inglés Avanzado' },
			{ id: 'c6', name: 'TOEFL Prep' },
		],
		status: 'active',
		createdAt: '2024-01-08',
	},
	{
		id: '11',
		firstName: 'Javier',
		lastName: 'Morales',
		phone: '+54 11 6789-0123',
		courses: [{ id: 'c4', name: 'Inglés Intermedio' }],
		status: 'active',
		createdAt: '2024-02-25',
	},
	{
		id: '12',
		firstName: 'Camila',
		lastName: 'Ruiz',
		email: 'camila.ruiz@email.com',
		phone: '+54 11 7890-1234',
		courses: [
			{ id: 'c8', name: 'Writing Workshop' },
			{ id: 'c5', name: 'Business English' },
		],
		status: 'active',
		createdAt: '2024-03-15',
	},
	{
		id: '13',
		firstName: 'Mateo',
		lastName: 'Díaz',
		courses: [{ id: 'c1', name: 'Inglés Básico' }],
		status: 'inactive',
		createdAt: '2023-09-20',
	},
	{
		id: '14',
		firstName: 'Isabella',
		lastName: 'Castro',
		email: 'isabella.castro@email.com',
		phone: '+54 11 8901-2345',
		courses: [
			{ id: 'c3', name: 'Inglés Avanzado' },
			{ id: 'c7', name: 'Grammar Intensive' },
			{ id: 'c8', name: 'Writing Workshop' },
		],
		status: 'active',
		createdAt: '2024-01-22',
	},
	{
		id: '15',
		firstName: 'Santiago',
		lastName: 'Vargas',
		email: 'santiago.vargas@email.com',
		courses: [{ id: 'c2', name: 'Conversación' }],
		status: 'active',
		createdAt: '2024-02-18',
	},
	{
		id: '16',
		firstName: 'Martina',
		lastName: 'Herrera',
		phone: '+54 11 9012-3456',
		courses: [
			{ id: 'c4', name: 'Inglés Intermedio' },
			{ id: 'c5', name: 'Business English' },
		],
		status: 'active',
		createdAt: '2024-03-08',
	},
	{
		id: '17',
		firstName: 'Nicolás',
		lastName: 'Méndez',
		email: 'nicolas.mendez@email.com',
		phone: '+54 11 0123-4567',
		courses: [{ id: 'c6', name: 'TOEFL Prep' }],
		status: 'inactive',
		createdAt: '2023-11-05',
	},
	{
		id: '18',
		firstName: 'Lucía',
		lastName: 'Ortiz',
		email: 'lucia.ortiz@email.com',
		courses: [
			{ id: 'c1', name: 'Inglés Básico' },
			{ id: 'c7', name: 'Grammar Intensive' },
		],
		status: 'active',
		createdAt: '2024-02-08',
	},
	{
		id: '19',
		firstName: 'Facundo',
		lastName: 'Silva',
		phone: '+54 11 1357-2468',
		courses: [{ id: 'c3', name: 'Inglés Avanzado' }],
		status: 'active',
		createdAt: '2024-03-12',
	},
	{
		id: '20',
		firstName: 'Emma',
		lastName: 'Acosta',
		courses: [
			{ id: 'c2', name: 'Conversación' },
			{ id: 'c4', name: 'Inglés Intermedio' },
		],
		status: 'inactive',
		createdAt: '2023-10-28',
	},
	{
		id: '21',
		firstName: 'Tomás',
		lastName: 'Ramírez',
		email: 'tomas.ramirez@email.com',
		phone: '+54 11 2468-1357',
		courses: [
			{ id: 'c5', name: 'Business English' },
			{ id: 'c8', name: 'Writing Workshop' },
		],
		status: 'active',
		createdAt: '2024-01-30',
	},
	{
		id: '22',
		firstName: 'Catalina',
		lastName: 'Molina',
		email: 'catalina.molina@email.com',
		courses: [{ id: 'c1', name: 'Inglés Básico' }],
		status: 'active',
		createdAt: '2024-02-22',
	},
	{
		id: '23',
		firstName: 'Bautista',
		lastName: 'Vega',
		phone: '+54 11 3579-2468',
		courses: [
			{ id: 'c3', name: 'Inglés Avanzado' },
			{ id: 'c6', name: 'TOEFL Prep' },
			{ id: 'c7', name: 'Grammar Intensive' },
		],
		status: 'active',
		createdAt: '2024-03-18',
	},
	{
		id: '24',
		firstName: 'Julieta',
		lastName: 'Navarro',
		email: 'julieta.navarro@email.com',
		phone: '+54 11 4680-1357',
		courses: [{ id: 'c4', name: 'Inglés Intermedio' }],
		status: 'inactive',
		createdAt: '2023-12-15',
	},
	{
		id: '25',
		firstName: 'Agustín',
		lastName: 'Ríos',
		courses: [{ id: 'c2', name: 'Conversación' }],
		status: 'active',
		createdAt: '2024-02-05',
	},
	{
		id: '26',
		firstName: 'Delfina',
		lastName: 'Flores',
		email: 'delfina.flores@email.com',
		phone: '+54 11 5791-2468',
		courses: [
			{ id: 'c5', name: 'Business English' },
			{ id: 'c8', name: 'Writing Workshop' },
		],
		status: 'active',
		createdAt: '2024-03-20',
	},
	{
		id: '27',
		firstName: 'Benjamín',
		lastName: 'Parra',
		email: 'benjamin.parra@email.com',
		courses: [{ id: 'c1', name: 'Inglés Básico' }],
		status: 'active',
		createdAt: '2024-01-18',
	},
	{
		id: '28',
		firstName: 'Milagros',
		lastName: 'Ramos',
		phone: '+54 11 6802-3579',
		courses: [
			{ id: 'c3', name: 'Inglés Avanzado' },
			{ id: 'c7', name: 'Grammar Intensive' },
		],
		status: 'inactive',
		createdAt: '2023-11-12',
	},
	{
		id: '29',
		firstName: 'Joaquín',
		lastName: 'Reyes',
		email: 'joaquin.reyes@email.com',
		phone: '+54 11 7913-4680',
		courses: [{ id: 'c4', name: 'Inglés Intermedio' }],
		status: 'active',
		createdAt: '2024-02-28',
	},
	{
		id: '30',
		firstName: 'Renata',
		lastName: 'Campos',
		email: 'renata.campos@email.com',
		courses: [
			{ id: 'c6', name: 'TOEFL Prep' },
			{ id: 'c5', name: 'Business English' },
			{ id: 'c8', name: 'Writing Workshop' },
		],
		status: 'active',
		createdAt: '2024-03-22',
	},
	{
		id: '31',
		firstName: 'Thiago',
		lastName: 'Cortez',
		phone: '+54 11 8024-5791',
		courses: [{ id: 'c2', name: 'Conversación' }],
		status: 'active',
		createdAt: '2024-03-25',
	},
	{
		id: '32',
		firstName: 'Francesca',
		lastName: 'Benítez',
		courses: [
			{ id: 'c1', name: 'Inglés Básico' },
			{ id: 'c7', name: 'Grammar Intensive' },
		],
		status: 'inactive',
		createdAt: '2023-10-08',
	},
]

/**
 * Get total count of students
 */
export function getTotalStudents(): number {
	return mockStudents.length
}

/**
 * Get paginated students
 * @param page - Page number (1-based)
 * @param pageSize - Number of students per page
 */
export function getPaginatedStudents(
	page: number = 1,
	pageSize: number = 25
): Student[] {
	const startIndex = (page - 1) * pageSize
	const endIndex = startIndex + pageSize
	return mockStudents.slice(startIndex, endIndex)
}

/**
 * Get total number of pages
 * @param pageSize - Number of students per page
 */
export function getTotalPages(pageSize: number = 25): number {
	return Math.ceil(mockStudents.length / pageSize)
}
