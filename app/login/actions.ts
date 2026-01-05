'use server'

import { redirect } from 'next/navigation'
import { z } from 'zod'
import { createClient } from 'lib/supabase/server'

/**
 * Login form schema for validation
 * Validates email format and password minimum length
 */
const loginSchema = z.object({
	email: z.string().email('Please enter a valid email address'),
	password: z.string().min(6, 'Password must be at least 6 characters'),
})

/**
 * Return type for login action
 */
export interface LoginActionResult {
	error?: string
	success?: boolean
}

/**
 * Server Action to authenticate a user with email and password.
 * This action runs on the server and handles the authentication flow with Supabase.
 *
 * Flow:
 * 1. Extract email and password from FormData
 * 2. Validate data with Zod schema
 * 3. Authenticate with Supabase
 * 4. If successful, redirect to /dashboard
 * 5. If error, return error message
 *
 * @param formData - FormData containing email and password
 * @returns LoginActionResult with error message if authentication fails
 *
 * @example
 * ```tsx
 * 'use client'
 * import { loginAction } from 'modules/auth/actions'
 *
 * async function handleSubmit(formData: FormData) {
 *   const result = await loginAction(formData)
 *   if (result?.error) {
 *     toast.error(result.error)
 *   }
 * }
 * ```
 */
export async function loginAction(
	formData: FormData
): Promise<LoginActionResult | void> {
	// Extract data from FormData
	const email = formData.get('email') as string
	const password = formData.get('password') as string

	// Validate input data
	const validationResult = loginSchema.safeParse({ email, password })

	if (!validationResult.success) {
		const firstIssue = validationResult.error.issues[0]
		return {
			error: firstIssue?.message || 'Validation error',
		}
	}

	// Create Supabase client
	const supabase = await createClient()

	// Attempt to sign in with Supabase
	const { error } = await supabase.auth.signInWithPassword({
		email: validationResult.data.email,
		password: validationResult.data.password,
	})

	// Handle authentication errors
	if (error) {
		// Map Supabase errors to user-friendly messages
		const errorMessages: Record<string, string> = {
			'Invalid login credentials': 'Email or password is incorrect',
			'Email not confirmed': 'Please confirm your email before logging in',
			'User not found': 'No account found with this email',
		}

		const userFriendlyMessage =
			errorMessages[error.message] || 'An error occurred during login'

		return {
			error: userFriendlyMessage,
		}
	}

	// Successful login - redirect to dashboard
	redirect('/dashboard')
}

/**
 * Server Action to log out the current user.
 * This action runs on the server and handles the sign out flow with Supabase.
 *
 * Flow:
 * 1. Create Supabase client
 * 2. Sign out the user
 * 3. Redirect to login page
 *
 * @example
 * ```tsx
 * 'use client'
 * import { logoutAction } from 'app/login/actions'
 *
 * function LogoutButton() {
 *   const handleLogout = async () => {
 *     await logoutAction()
 *   }
 *
 *   return <button onClick={handleLogout}>Log out</button>
 * }
 * ```
 */
export async function logoutAction(): Promise<void> {
	const supabase = await createClient()

	// Sign out the user
	await supabase.auth.signOut()

	// Redirect to login page
	redirect('/login')
}
