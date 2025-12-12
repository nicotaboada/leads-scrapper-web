import { type User } from '@supabase/supabase-js'

/**
 * Re-export Supabase User type for convenience
 */
export type { User }

/**
 * Authentication state interface
 * Used to represent the current authentication status in the application
 */
export interface AuthState {
	/** The authenticated user, or null if not authenticated */
	user: User | null
	/** Loading state for authentication checks */
	isLoading: boolean
	/** Error message if authentication check failed */
	error: string | null
}

/**
 * Session data interface
 * Extends basic session information with user details
 */
export interface SessionData {
	/** The authenticated user */
	user: User
	/** Session access token */
	accessToken: string
	/** Session refresh token */
	refreshToken: string
	/** Session expiration timestamp */
	expiresAt: number
}
