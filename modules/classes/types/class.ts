/**
 * Course Type Definitions
 *
 * This file contains all TypeScript types and interfaces related to courses
 */

/**
 * Course information
 */
export interface Course {
	id: string
	name: string
}

/**
 * Class information
 * @deprecated Use Course instead
 */
export interface Class {
	id: string
	name: string
}
