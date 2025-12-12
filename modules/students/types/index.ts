/**
 * Students Module Types
 *
 * Central export point for all student-related types
 */

export type { Class } from '../../classes/types/class'
export type { Student, StudentFullName } from './student'
export {
	StudentStatus,
	getStudentFullName,
	getStudentInitials,
} from './student'
