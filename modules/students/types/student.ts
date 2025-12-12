/**
 * Student Type Definitions
 *
 * This file contains all TypeScript types and interfaces related to students
 */

import { z } from 'zod'
import type { PaginatedResponse } from 'types/pagination'
import type { Course } from '../../classes/types/class'

// Re-export Course type for convenience
export type { Course } from '../../classes/types/class'

/**
 * Status of a student in the system
 */
export enum StudentStatus {
	ENABLED = 'ENABLED',
	DISABLED = 'DISABLED',
}

/**
 * Complete student information (matches backend schema)
 */
export interface Student {
	id: string
	firstName: string
	lastName: string
	email: string
	phoneNumber?: string
	status: StudentStatus
	createdAt: string
	updatedAt: string
	avatar?: string
	courses?: Course[]
}

/**
 * Paginated response for students query
 */
export interface PaginatedStudentsResponse {
	students: PaginatedResponse<Student>
}

/**
 * Student statistics
 */
export interface StudentStats {
	total: number
	active: number
	inactive: number
}

/**
 * Response for student stats query
 */
export interface StudentStatsResponse {
	studentStats: StudentStats
}

/**
 * Helper type for student full name
 */
export type StudentFullName = {
	firstName: string
	lastName: string
}

/**
 * Helper function to get full name from student
 */
export function getStudentFullName(student: StudentFullName): string {
	return `${student.firstName} ${student.lastName}`
}

/**
 * Helper function to get student initials for avatar
 */
export function getStudentInitials(student: StudentFullName): string {
	return `${student.firstName.charAt(0)}${student.lastName.charAt(0)}`.toUpperCase()
}

/**
 * Input type for creating a new student (Backend API)
 * This matches the GraphQL mutation schema
 */
export interface CreateStudentInput {
	firstName: string
	lastName: string
	email: string
	phoneNumber?: string
}

/**
 * Input type for the create student form (Frontend only)
 * Includes course field which is not sent to backend yet
 */
export interface CreateStudentFormInput {
	firstName: string
	lastName: string
	email: string
	course?: string
}

/**
 * Zod validation schema for creating a student form
 */
export const createStudentSchema = z.object({
	firstName: z.string().min(1, 'El nombre es requerido'),
	lastName: z.string().min(1, 'El apellido es requerido'),
	email: z
		.string()
		.min(1, 'El email es requerido')
		.email('Ingrese un email válido'),
	course: z.string().optional(),
})

/**
 * Mock courses data for the create student form
 * TODO: Replace with actual courses from API
 */
export const MOCK_COURSES = [
	{ id: '1', name: 'Curso 1' },
	{ id: '2', name: 'Curso 2' },
	{ id: '3', name: 'Curso 3' },
] as const
